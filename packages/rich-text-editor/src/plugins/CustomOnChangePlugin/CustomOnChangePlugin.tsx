import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect, useLayoutEffect } from "react";

import useCustomEditorState from "@/hooks/useCustomEditorState";
import { CustomOnChangePluginProps } from "./CustomOnChangePlugin.types";

const CAN_USE_DOM =
  typeof window !== "undefined" &&
  typeof window.document !== "undefined" &&
  typeof window.document.createElement !== "undefined";

// This workaround is no longer necessary in React 19,
// but we currently support React >=17.x
// https://github.com/facebook/react/pull/26395
const useLayoutEffectImpl = CAN_USE_DOM ? useLayoutEffect : useEffect;

/**
 * Custom plugin for registering callbacks to be called on editor
 * change.
 */
export default function CustomOnChangePlugin({
  onChange,
  ignoreHistoryMergeTagChange,
  ignoreSelectionChange,
}: CustomOnChangePluginProps) {
  const [editor] = useLexicalComposerContext();

  useLayoutEffectImpl(() => {
    if (onChange) {
      return editor.registerUpdateListener(
        ({
          editorState,
          dirtyElements,
          dirtyLeaves,
          prevEditorState,
          tags,
        }) => {
          if (
            (ignoreSelectionChange &&
              dirtyElements.size === 0 &&
              dirtyLeaves.size === 0) ||
            (ignoreHistoryMergeTagChange && tags.has("history-merge")) ||
            prevEditorState.isEmpty()
          ) {
            return;
          }
          const customEditorState = useCustomEditorState(editor, editorState);

          onChange(customEditorState, tags);
        },
      );
    }
  }, [editor, ignoreHistoryMergeTagChange, ignoreSelectionChange, onChange]);

  return null;
}

import { EditorState, LexicalEditor } from "lexical";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";

import useCustomEditorState from "@/composables/useCustomEditorState";
import { CustomOnChangePluginProps } from "./CustomOnChangePlugin.types";

/**
 * Custom plugin for registering callbacks to be called on editor
 * change.
 */
export default function CustomOnChangePlugin({
  onChange,
  ignoreHistoryMergeTagChange,
  ignoreSelectionChange,
}: CustomOnChangePluginProps) {
  function onChangeFn(
    editorState: EditorState,
    editor: LexicalEditor,
    tags: Set<string>,
  ) {
    const customEditorState = useCustomEditorState(editor, editorState);

    onChange(editorState, editor, tags, customEditorState);
  }

  return (
    <OnChangePlugin
      onChange={onChangeFn}
      ignoreHistoryMergeTagChange={ignoreHistoryMergeTagChange}
      ignoreSelectionChange={ignoreSelectionChange}
    />
  );
}

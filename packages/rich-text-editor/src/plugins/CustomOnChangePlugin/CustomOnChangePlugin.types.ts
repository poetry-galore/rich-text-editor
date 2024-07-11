import { EditorState, LexicalEditor } from "lexical";
import { CustomEditorState } from "@/RichTextEditor.types";

export interface CustomOnChangePluginProps {
  /**
   * Callback triggered when the editor undergoes an update.
   *
   * @param customEditorState Custom Editor state
   * @param editorState Current state of the editor
   * @param editor The lexical editor
   * @param tags
   */
  onChange: (
    editorState: EditorState,
    editor: LexicalEditor,
    tags: Set<string>,
    customEditorState?: CustomEditorState,
  ) => void;

  /**
   * Whether to ignore the selection change
   */
  ignoreSelectionChange?: boolean;

  /**
   * Whether to ignore the history merge change
   */
  ignoreHistoryMergeTagChange?: boolean;
}

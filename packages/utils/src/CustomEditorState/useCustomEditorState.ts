import { LexicalEditor, EditorState } from "lexical";
import CustomEditorState from "./CustomEditorState";

/**
 * Return new new instance of the CustomEditorState.
 *
 * @param editor LexicalEditor
 * @param editorState EditorState
 */
export default function useCustomEditorState(
  editor: LexicalEditor,
  editorState: EditorState,
) {
  return new CustomEditorState(editor, editorState);
}

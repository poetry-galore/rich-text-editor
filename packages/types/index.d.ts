import * as react_jsx_runtime from "react/jsx-runtime";
import { InitialEditorStateType } from "@lexical/react/LexicalComposer";
import * as lexical from "lexical";
import { LexicalEditor, EditorState } from "lexical";

export declare class CustomEditorState {
  #private;
  constructor(editor: LexicalEditor, editorState: EditorState);
  /**
   * Get the JSON value of the editor
   *
   * @returns JSON value of the editor state.
   */
  toJSON(): lexical.SerializedEditorState<lexical.SerializedLexicalNode>;
  /**
   * Get the HTML value of the editor
   *
   * @returns HTML string of the editor state.
   */
  toHTML(): string;
  /**
   * Check if the editor is empty. An editor with whitespace only
   * is taken to be empty.
   *
   * @returns boolean
   */
  isEmpty(): boolean;
}

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

interface Props {
  /**
   * Text to display before user inputs
   */
  placeholderText?: string;
  /**
   * Is the editor content editable?
   */
  editable?: boolean;
  /**
   * Initial state of the editor
   */
  initialEditorState?: InitialEditorStateType;
  /**
   * List of callbacks triggered when the editor undergoes an update.
   *
   * If you want to get the json value of the editor contents,
   * use `setEditorState` prop instead of this.
   *
   * @param customEditorState Custom Editor state
   * @param editorState Current state of the editor
   * @param editor The lexical editor
   * @param tags
   */
  onEditorChange?: CustomOnChangePluginProps[];
}
export type RichTextEditorProps = React.PropsWithChildren<Props> &
  React.AllHTMLAttributes<HTMLDivElement>;

/**
 * Rich text editor built using Lexical.
 */
export declare function RichTextEditor({
  placeholderText,
  editable,
  initialEditorState,
  onEditorChange,
  children,
  ...rest
}: RichTextEditorProps): react_jsx_runtime.JSX.Element;

import { InitialEditorStateType } from "@lexical/react/LexicalComposer";
import { EditorState, LexicalEditor } from "lexical";

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
   * @param editorState Current state of the editor
   * @param editor The lexical editor
   * @param tags
   */
  onEditorChange?: ((
    editorState: EditorState,
    editor: LexicalEditor,
    tags: Set<string>,
  ) => void)[];
  /**
   * React state update function for setting the editor state.
   * Updates the state value to the json string of the contents.
   *
   * @example
   * const [editorState, setEditorState] = useState<string>()
   *
   * <RichTextEditor setEditorState={setEditorState} />
   */
  setEditorState?: React.Dispatch<React.SetStateAction<string>>;
}

export type RichTextEditorProps = React.PropsWithChildren<Props> &
  React.AllHTMLAttributes<HTMLDivElement>;

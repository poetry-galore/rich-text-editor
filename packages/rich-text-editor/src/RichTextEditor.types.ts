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
  onEditorChange?: {
    onChange: (
      editorState: EditorState,
      editor: LexicalEditor,
      tags: Set<string>,
    ) => void;
    ignoreSelectionChange?: boolean;
    ignoreHistoryMergeTagChange?: boolean;
  }[];
  /**
   * React state update function for setting the editor state.
   * Updates the state value to the json string of the contents.
   *
   * @example
   * const [editorState, setEditorState] = useState<string>()
   *
   * <RichTextEditor setEditorState={setEditorState} />
   */
  setEditorStateJSON?: React.Dispatch<React.SetStateAction<string>>;
  /**
   * React state update function for setting the editor state.
   * Updates the state value to the html string of the contents.
   *
   * @example
   * const [editorStateHTML, setEditorStateHTML] = useState<string>()
   *
   * <RichTextEditor setEditorStateHTML={setEditorStateHTML} />
   */
  setEditorStateHTML?: React.Dispatch<React.SetStateAction<string>>;

  /**
   * React state update function for setting whether the is empty.
   * Updates the state value to whether the editor is empty.
   *
   * @example
   * const [isEmpty, setIsEmpty] = useState<boolean>()
   *
   * <RichTextEditor setIsEmpty={setIsEmpty} />
   */
  setIsEmpty?: React.Dispatch<React.SetStateAction<boolean>>;
}

export type RichTextEditorProps = React.PropsWithChildren<Props> &
  React.AllHTMLAttributes<HTMLDivElement>;

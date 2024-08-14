import * as react_jsx_runtime from "react/jsx-runtime";
import { InitialEditorStateType } from "@lexical/react/LexicalComposer";
import * as lexical from "lexical";
import { LexicalEditor, EditorState } from "lexical";

export declare class CustomEditorState {
  /** The lexical editor */
  editor: LexicalEditor;
  /** Editor State */
  editorState: EditorState;
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
   * @param tags
   */
  onChange: (customEditorState: CustomEditorState, tags?: Set<string>) => void;
  /**
   * Whether to ignore the selection change
   */
  ignoreSelectionChange?: boolean;
  /**
   * Whether to ignore the history merge change
   */
  ignoreHistoryMergeTagChange?: boolean;
}

export interface Props {
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
   * Array of objects with callbacks to be triggered when the editor updates.
   *
   * Access the editor and editorState from the customEditorState argument
   * passed to the onChange function.
   *
   * @example
   * // How to get the contents of the editor as JSON
   * function Editor(){
   *    // State variable to store the JSON value of the editor contents
   *    const [editorStateJSON, setEditorStateJSON] = useState<any>("")
   *
   *    // Function to call when editor updates
   *    function onChange(customEditorState: CustomEditorState, tags:Set<string>){
   *      // Set the editorStateJSON to the JSON value
   *      setEditorStateJSON(customEditorState.toJSON());
   *
   *      console.log(customEditorState.toHTML()) // Editor contents as a HTML string
   *    }
   *
   *    useEffect(()=>{
   *      console.log(editorStateJSON)
   *    }, [editorStateJSON]);
   *
   *    return (
   *      <RichTextEditor onEditorChange={[{onChange, ignoreSelectionChange: true}]} />
   *    );
   * }
   */
  onEditorChange?: CustomOnChangePluginProps[];
  /**
   * Set to `true` to show the floating menu on selection.
   *
   * @default false
   */
  showFloatingMenu?: boolean;
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
  showFloatingMenu,
  children,
  ...rest
}: RichTextEditorProps): react_jsx_runtime.JSX.Element;

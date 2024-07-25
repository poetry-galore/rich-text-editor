import { InitialEditorStateType } from "@lexical/react/LexicalComposer";
import { CustomOnChangePluginProps } from "./plugins/CustomOnChangePlugin/CustomOnChangePlugin.types";

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
}

export type RichTextEditorProps = React.PropsWithChildren<Props> &
  React.AllHTMLAttributes<HTMLDivElement>;

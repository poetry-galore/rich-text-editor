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

export declare const TEXT_ACTIONS: readonly [
  "bold",
  "italic",
  "underline",
  "strikethrough",
  "code",
  "highlight",
  "superscript",
  "subscript",
];

export declare const HISTORY_ACTIONS: readonly ["undo", "redo"];

export declare const BLOCK_TYPES: readonly [
  "paragraph",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "quote",
  "bullet",
  "number",
];

export type TextActionsConfig = readonly (typeof TEXT_ACTIONS)[number][];
export type HistoryActionsConfig = readonly (typeof HISTORY_ACTIONS)[number][];
export type BlockTypesConfig = readonly (typeof BLOCK_TYPES)[number][];

/**
 * Configuration for the toolbar plugin
 */
export type ToolbarPluginConfig = {
  /**
   * Whether to register the Toolbar plugin
   */
  register: boolean;
  /**
   * Text actions to register
   */
  textActions?: TextActionsConfig;
  /**
   * History actions to register
   */
  historyActions?: HistoryActionsConfig;
  /**
   * Block types to register
   */
  blockTypes?: BlockTypesConfig;
};

/**
 * Configuration for the floating menu plugin
 */
export type FloatingMenuPluginConfig = {
  /**
   * Whether to resister the Floating Menu plugin
   */
  register: boolean;
  /**
   * Text actions to register
   */
  textActions?: TextActionsConfig;
  /**
   * History actions to register
   */
  historyActions?: HistoryActionsConfig;
  /**
   * Block types to register
   */
  blockTypes?: BlockTypesConfig;
};

/**
 * Configuration for the HTML plugin
 */
export type HTMLPluginConfig = {
  /**
   * Whether to register the HTML plugin in the editor
   */
  register: boolean;
};

/**
 * Represent the plugins configuration.
 * All custom plugins available.
 */
export type PluginsConfig = {
  toolbar?: ToolbarPluginConfig | boolean;
  floatingMenu?: FloatingMenuPluginConfig | boolean;
  html?: HTMLPluginConfig | boolean;
};

/**
 * Complete schema of the editor configuration.
 */
export type EditorConfigSchema = {
  plugins?: PluginsConfig;
};

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
   * Configuration of the editor.
   */
  editorConfig?: EditorConfigSchema;
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
  editorConfig,
  children,
  ...rest
}: RichTextEditorProps): react_jsx_runtime.JSX.Element;

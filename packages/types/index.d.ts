import { InitialEditorStateType } from "@lexical/react/LexicalComposer";
import * as lexical from "lexical";
import { EditorState, LexicalEditor } from "lexical";
import * as react_jsx_runtime from "react/jsx-runtime";

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
 * Keys in the PluginsConfig type.
 * Represents the available plugins.
 */
export type PluginsConfigKeys = keyof PluginsConfig;

/**
 * Complete schema of the editor configuration.
 */
export type EditorConfigSchema = {
  plugins?: PluginsConfig;
};

/**
 * Types of configs used.
 */
export type AvailableConfigs = "default" | "user" | "merged";

/**
 * Paths to different parts of the configuration
 */
export type ConfigPaths =
  | ""
  | "plugins"
  | "plugins.html"
  | "plugins.html.register"
  | "plugins.toolbar"
  | "plugins.toolbar.blockTypes"
  | "plugins.toolbar.historyActions"
  | "plugins.toolbar.register"
  | "plugins.toolbar.textActions"
  | "plugins.floatingMenu"
  | "plugins.floatingMenu.blockTypes"
  | "plugins.floatingMenu.historyActions"
  | "plugins.floatingMenu.register"
  | "plugins.floatingMenu.textActions";
/**
 * Config with a name to be mapped to.
 */
export type NamedConfig = {
  /**
   * Name to map the config to.
   * Cannot be an empty string.
   */
  name: string;
  /**
   * Configuration to apply to the editor.
   * Will be mapped to name given.
   */
  config: EditorConfigSchema;
};

export declare class UserConfigMap extends Map<string, EditorConfigSchema> {}
export declare class MergedConfigMap extends Map<string, EditorConfigSchema> {}

/**
 * Class for handling editor configuration
 */
export declare class Config {
  /**
   * Default configuration
   *
   * @private
   */
  _defaultConfig: EditorConfigSchema;
  /**
   * Mapping of the configurations provided by the user
   *
   * @private
   */
  _userConfigs: UserConfigMap;
  /**
   * Mapping of the userConfig merged with the defaultConfig.
   * Configs are assigned same name as in userConfig.
   *
   * @see Config1.mergeConfigs
   *
   * @private
   */
  _mergedConfigs: MergedConfigMap;

  constructor(config?: NamedConfig | NamedConfig[]);

  get defaultConfig(): EditorConfigSchema;

  /**
   * @returns a clone of the _userConfigs
   */
  get userConfigs(): UserConfigMap;

  /**
   * @returns a clone of the _mergedConfigs
   */
  get mergedConfigs(): MergedConfigMap;

  /**
   * Gets the userConfig with the given name.
   *
   * @param name Name of the userConfig to get
   *
   * @returns userConfig with the given name if found, else undefined.
   */
  getUserConfigByName(name: string): EditorConfigSchema | undefined;

  /**
   * Gets the mergedConfig with the given name.
   * Names for the mergedConfigs are same as those for the userConfigs.
   *
   * If the mergedConfig is not found, and userConfig with same name is found,
   * the {@link Config1.mergeConfigs} method is called and the resulting mergedConfig
   * is returned.
   *
   * @param name Name of the mergedConfig to get
   *
   * @returns mergedConfig with the given name if found, else undefined.
   */
  getMergedConfigByName(name: string): EditorConfigSchema | undefined;

  /**
   * Sets the userConfig with the given name to the given config.
   * If a userConfig with the given name is not found, it is created.
   * Also the mergedConfig is generated from the new userConfig.
   *
   * @param name Name to map to the config
   * @param config Configuration passed to be mapped to the given name
   */
  setUserConfig(name: string, config: EditorConfigSchema): void;

  /**
   * Merges the `defaultConfig` and the `userConfig` into `mergedConfig`.
   *
   * @param name Name of the config to merge
   *
   * @see mergeConfigs
   */
  mergeConfigs(name: string): void;

  /**
   * Gets the configuration of the provided configType.
   * Defaults to getting the `merged` configuration if the configType
   * is not given.
   *
   * @param name Name mapped to the config to get. Must be provided for user and merged
   * configTypes.
   * @param configType The configuration to use. Either `user` or `merged`.
   * Defaults to `merged`
   *
   * @returns Configuration of the type provided with the given name.
   *
   * @throws If the name is not a string.
   * @throws If the configType is not either `merged` or `user`.
   */
  getConfigByName(
    name: string,
    configType?: Exclude<AvailableConfigs, "default">,
  ): EditorConfigSchema | undefined;

  /**
   * Gets the configuration for a given configPath.
   *
   * @see ConfigPaths
   *
   * @param configPath The path of the configuration to get. eg `plugins.toolbar`.
   * Defaults to "".
   * @param name Name mapped to the config to use. This is required if the configType is
   * `merged` or `user`.
   * @param configType The configuration to use. Either `default`, `user` or `merged`.
   * Defaults to `default`
   *
   * @returns Configuration matching the path, else undefined.
   */
  getConfigForPath(
    configPath?: ConfigPaths,
    name?: string,
    configType?: AvailableConfigs,
  ): any;

  /**
   * Checks whether a given plugin is registered.
   *
   * @param plugin Plugin to check if it's registered
   * @param name Name mapped to the config to use. If given, then configType will be
   * `merged` or `user`. `default` is not used when name is given.
   * @param configType The configuration to use. Either `default`, `user` or `merged`.
   * Defaults to `default`
   *
   * @returns If plugin is not configured, `false` is returned else the value of `register`
   * for the given plugin is returned.
   */
  pluginIsRegistered(
    plugin: PluginsConfigKeys,
    name?: string,
    configType?: AvailableConfigs,
  ): any;
}

/**
 * Define configuration to be used by the editor.
 *
 * @param editorConfig A single or array of configs that are going to be applied
 * to the editor.
 * @param configInstance Instance of the Config on which to define the configuration
 * in. {@link EditorConfig} will be used if this param is not provided.
 *
 * @see {@link NamedConfig}
 */
export declare function defineConfig(
  editorConfig: NamedConfig | NamedConfig[],
  configInstance?: Config,
): void;

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
   * An instance of {@link Config} used in defineConfig.
   * Set this to the configInstance passed in defineConfig if a custom one
   * was used.
   */
  configInstance?: Config;
  /**
   * Name of the configuraion to use.
   * Should be one of the names of configurations provided in the defineConfig function
   * if provided.
   *
   * If not given, then the default configuration is used.
   */
  configName?: string;
}

export type RichTextEditorProps = React.PropsWithChildren<Props> &
  React.AllHTMLAttributes<HTMLDivElement>;

/**
 * {@link RTE} wrapped in the {@link ConfigContextProvider}.
 *
 * Can be configured as needed using `defineConfig` function.
 */
export declare function RichTextEditor(
  props: RichTextEditorProps,
): react_jsx_runtime.JSX.Element;

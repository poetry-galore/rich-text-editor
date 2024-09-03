export const TEXT_ACTIONS = [
  "bold",
  "italic",
  "underline",
  "strikethrough",
  "code",
  "highlight",
  "superscript",
  "subscript",
] as const;

export const HISTORY_ACTIONS = ["undo", "redo"] as const;

export const BLOCK_TYPES = [
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
] as const;

export type TextActionsConfig = readonly (typeof TEXT_ACTIONS)[number][];
export type HistoryActionsConfig = readonly (typeof HISTORY_ACTIONS)[number][];
export type BlockTypesConfig = readonly (typeof BLOCK_TYPES)[number][];

/**
 * Make sure all types in a field are required.
 * Also recurses into nested object types.
 *
 * @example
 * type Test = {
 *   one: string;
 *   two?: string;
 *   three: string | undefined;
 *   four: string | null;
 *   five: {
 *     six?: number;
 *     seven: number | null;
 *   };
 * }
 *
 * type TestWithAllFieldsRequired = RequireAllFields<Test>
 *
 * // TestWithALlFieldsRequired type will be equal to
 * type TestWithAllFieldsRequired = {
 *   one: string;
 *   two: string;
 *   three: string;
 *   four: string;
 *   five: {
 *     six: number;
 *     seven: number;
 *   };
 * }
 */
type RequireAllFields<T> = {
  [P in keyof T]-?: RequireAllFields<NonNullable<T[P]>>;
};

/**
 * Configuration for the toolbar plugin
 */
type ToolbarPluginConfig = {
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
type FloatingMenuPluginConfig = {
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
type HTMLPluginConfig = {
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
 * Type of the default editor config.
 *
 * Ensures the default config sets all fields that can be used as a
 * fallback if the user does not provide that configuration.
 */
export type DefaultEditorConfigSchema = RequireAllFields<EditorConfigSchema>;

/**
 * Keys in the EditorConfigSchema type.
 * Represents the available toplevel keys in the configuration.
 */
export type ConfigSchemaKeys = keyof EditorConfigSchema;

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
 * Keys that are allowed to be of type boolean in the default config.
 */
export const BooleanKeysInDefaultConfig: string[] = ["register"] as const;

/**
 * Keys found in the NamedConfig type
 */
export const NamedConfigKeys = {
  required: ["name", "config"],
  optional: [],
};

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

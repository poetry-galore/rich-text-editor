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
type blockTypesType = readonly (typeof BLOCK_TYPES)[number][];

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
  blockTypes?: blockTypesType;
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
  blockTypes?: blockTypesType;
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

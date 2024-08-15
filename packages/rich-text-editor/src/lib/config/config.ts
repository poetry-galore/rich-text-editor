import { DEFAULT_EDITOR_CONFIG } from "./default";
import type {
  AvailableConfigs,
  ConfigPaths,
  EditorConfigSchema,
  PluginsConfigKeys,
} from "./config.types";

/**
 * Class for handling configuration of the editor
 */
class Config {
  /**
   * Default configuration
   *
   * @private
   */
  private _defaultConfig: EditorConfigSchema = DEFAULT_EDITOR_CONFIG;
  /**
   * Configuration provided by the user
   *
   * @private
   */
  private _userConfig?: EditorConfigSchema;
  /**
   * defaultConfig and userConfig merged
   *
   * @see _mergeConfigs
   *
   * @private
   */
  private _mergedConfig: EditorConfigSchema = {};

  constructor(config?: EditorConfigSchema) {
    if (config) {
      this._userConfig = config;
      this._mergeConfigs();
    }
  }

  get userConfigIsSet() {
    return this._userConfig !== undefined;
  }

  set userConfig(config: EditorConfigSchema | undefined) {
    if (!this.userConfigIsSet) {
      this._userConfig = config;
      this._mergeConfigs();
    }
  }

  get userConfig() {
    return this._userConfig;
  }

  get defaultConfig() {
    return this._defaultConfig;
  }

  get mergedConfig() {
    return this._mergedConfig;
  }

  /**
   * Merges the `defaultConfig` and the `userConfig` into `mergedConfig`.
   *
   * @see mergeConfigs
   */
  _mergeConfigs() {
    this._mergedConfig = mergeConfigs(this._defaultConfig, this._userConfig);
  }

  /**
   * Gets the configuration of the provided configType.
   * Defaults to getting the `merged` configuration if the configType
   * is not given.
   *
   * @param configType The configuration to use. Either `default`, `user` or `merged`.
   * Defaults to `merged`
   *
   * @returns Configuration of the type provided.
   */
  getConfig(configType: AvailableConfigs = "merged") {
    switch (configType) {
      case "default":
        return this._defaultConfig;
      case "user":
        return this._userConfig;
      case "merged":
        return this._mergedConfig;
    }
  }

  /**
   * Gets the configuration for a given configPath.
   *
   * @see ConfigPaths
   *
   * @param configPath The path of the configuration to get. eg `plugins.toolbar`.
   * Defaults to "".
   * @param configType The configuration to use. Either `default`, `user` or `merged`.
   * Defaults to `merged`
   *
   * @returns Configuration matching the path, else undefined.
   */
  getConfigForPath(
    configPath: ConfigPaths = "",
    configType?: AvailableConfigs,
  ) {
    if (configPath === "") return this.getConfig(configType);

    const [parent, ...children] = configPath.split(".");

    let currentConfig: any =
      this.getConfig(configType)?.[parent as keyof EditorConfigSchema];

    let i = 0;
    while (currentConfig && i < children.length) {
      currentConfig = currentConfig?.[children[i]];
      i++;
    }

    return currentConfig;
  }

  /**
   * Checks whether a given plugin is registered.
   *
   * @param plugin Plugin to check if it's registered
   * @param configType The configuration to use. Either `default`, `user` or `merged`.
   * Defaults to `merged`
   *
   * @returns If plugin is not configured, `false` is returned else the value of `register`
   * for the given plugin is returned.
   */
  pluginIsRegistered(plugin: PluginsConfigKeys, configType?: AvailableConfigs) {
    const pluginConfig = this.getConfigForPath(`plugins.${plugin}`, configType);

    return (
      pluginConfig !== undefined &&
      (typeof pluginConfig === "boolean" ? pluginConfig : pluginConfig.register)
    );
  }
}

const EditorConfig = new Config();

export default EditorConfig;

/**
 * Recursively merges the default and custom user configurations.
 *
 * The user configuration takes precedence over the default one.
 *
 * @param defaultConfig Config to use as the default
 * @param userConfig Custom config passed by the user
 * @returns merged configuration
 */
export function mergeConfigs(defaultConfig: any, userConfig: any) {
  const mergedConfig: Record<any, any> = {};

  for (const _key in defaultConfig) {
    const userValue = userConfig[_key];

    if (userValue !== undefined) {
      switch (typeof userValue) {
        case "object":
          if (Array.isArray(userValue)) {
            mergedConfig[_key] = userValue;
          } else {
            mergedConfig[_key] = mergeConfigs(defaultConfig[_key], userValue);
          }
          break;
        case "boolean":
          if (userValue === true) {
            mergedConfig[_key] = defaultConfig[_key];

            // Set register property to true if the default was false
            mergedConfig[_key]?.register === false &&
              (mergedConfig[_key].register = true);
          } else if (_key === "register" && userValue === false) {
            // Stop processing current object if register key is false
            return { register: false };
          }
          break;
        default:
          mergedConfig[_key] = userValue;
      }
    } else {
      if (
        typeof defaultConfig[_key] === "object" &&
        defaultConfig[_key]?.register === false
      )
        mergedConfig[_key] = { register: false };
      else {
        mergedConfig[_key] = defaultConfig[_key];
      }
    }
  }

  return mergedConfig;
}

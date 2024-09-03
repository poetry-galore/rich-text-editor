import { deepFreeze } from "../lib/utils";
import {
  BooleanKeysInDefaultConfig,
  NamedConfig,
  NamedConfigKeys,
  type AvailableConfigs,
  type ConfigPaths,
  type EditorConfigSchema,
  type PluginsConfigKeys,
} from "./config.types";
import { DEFAULT_EDITOR_CONFIG } from "./defaultConfig";

export class UserConfigMap extends Map<string, EditorConfigSchema> {}
export class MergedConfigMap extends Map<string, EditorConfigSchema> {}

/**
 * Class for handling editor configuration
 */
export class Config {
  /**
   * Default configuration
   *
   * @private
   */
  private _defaultConfig: EditorConfigSchema = deepFreeze(
    structuredClone(DEFAULT_EDITOR_CONFIG),
  );

  /**
   * Mapping of the configurations provided by the user
   *
   * @private
   */
  private _userConfigs: UserConfigMap;

  /**
   * Mapping of the userConfig merged with the defaultConfig.
   * Configs are assigned same name as in userConfig.
   *
   * @see Config1.mergeConfigs
   *
   * @private
   */
  private _mergedConfigs: MergedConfigMap;

  constructor(config?: NamedConfig | NamedConfig[]) {
    this._userConfigs = new UserConfigMap();
    this._mergedConfigs = new MergedConfigMap();

    config && defineConfig(config, this);
  }

  get defaultConfig() {
    return this._defaultConfig;
  }

  /**
   * @returns a clone of the _userConfigs
   */
  get userConfigs() {
    return structuredClone(this._userConfigs);
  }

  /**
   * @returns a clone of the _mergedConfigs
   */
  get mergedConfigs() {
    return structuredClone(this._mergedConfigs);
  }

  /**
   * Gets the userConfig with the given name.
   *
   * @param name Name of the userConfig to get
   *
   * @returns userConfig with the given name if found, else undefined.
   */
  getUserConfigByName(name: string): EditorConfigSchema | undefined {
    return this._userConfigs.get(name);
  }

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
  getMergedConfigByName(name: string): EditorConfigSchema | undefined {
    if (!this._mergedConfigs.get(name) && this._userConfigs.get(name))
      this.mergeConfigs(name);

    return this._mergedConfigs.get(name);
  }

  /**
   * Sets the userConfig with the given name to the given config.
   * If a userConfig with the given name is not found, it is created.
   * Also the mergedConfig is generated from the new userConfig.
   *
   * @param name Name to map to the config
   * @param config Configuration passed to be mapped to the given name
   */
  setUserConfig(name: string, config: EditorConfigSchema) {
    if (typeof name !== "string") throw new Error("'name' must be a string");

    if (name === "") throw new Error("'name' cannot be an empty string");

    this._userConfigs.set(name, config);
    this.mergeConfigs(name);
  }

  /**
   * Merges the `defaultConfig` and the `userConfig` into `mergedConfig`.
   *
   * @param name Name of the config to merge
   *
   * @see mergeConfigs
   */
  mergeConfigs(name: string) {
    const userConfig = this._userConfigs.get(name);

    if (userConfig) {
      this._mergedConfigs.set(
        name,
        mergeConfigs(this._defaultConfig, userConfig),
      );
    }
  }

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
    configType: Exclude<AvailableConfigs, "default"> = "merged",
  ) {
    if (typeof name !== "string") {
      const keys = [];
      for (const key of this._userConfigs.keys()) keys.push(`'${key}'`);

      throw new Error(
        `'name' must be a string. Options are: ${keys.join(", ")}`,
      );
    }

    if (configType !== "merged" && configType !== "user")
      throw new Error("'configType' must be 'merged' or 'user'");

    const userConfig = this._userConfigs.get(name);

    if (configType === "user") {
      return this.getUserConfigByName(name);
    } else {
      return this.getMergedConfigByName(name);
    }
  }

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
    configPath: ConfigPaths = "",
    name: string = "",
    configType: AvailableConfigs = "default",
  ) {
    if (
      configType !== "merged" &&
      configType !== "user" &&
      configType !== "default"
    )
      throw new Error("'configType' must be 'default', 'merged' or 'user'");

    /**
     * If name is given, use the merged or user configType even if default is specified.
     */
    const _configType = name
      ? configType !== "default"
        ? configType
        : "merged"
      : "default";

    const _config =
      _configType === "default"
        ? this._defaultConfig
        : this.getConfigByName(name, _configType);

    if (configPath === "") return _config;

    const [parent, ...children] = configPath.split(".");

    let currentConfig: any = _config?.[parent as keyof EditorConfigSchema];

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
  ) {
    const pluginConfig = this.getConfigForPath(
      `plugins.${plugin}`,
      name,
      configType,
    );

    return (
      pluginConfig !== undefined &&
      (typeof pluginConfig === "boolean" ? pluginConfig : pluginConfig.register)
    );
  }
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
export function defineConfig(
  editorConfig: NamedConfig | NamedConfig[],
  configInstance?: Config,
) {
  if (!isValidNamedConfig(editorConfig)) {
    throw new Error("Invalid configuration passed to defineConfig");
  }

  const _configInstance =
    configInstance && configInstance instanceof Config
      ? configInstance
      : EditorConfig;

  if (Array.isArray(editorConfig)) {
    for (const { name, config } of editorConfig) {
      _configInstance.setUserConfig(name, config);
    }
  } else if (typeof editorConfig === "object") {
    const { name, config } = editorConfig;
    _configInstance.setUserConfig(name, config);
  }
}

function isValidNamedConfig(config: any) {
  if (typeof config !== "object") return false;

  if (Array.isArray(config) && config.length === 0) return false;

  const checkRequiredKeys = (configKeys: any) => {
    if (NamedConfigKeys.required.some((key) => !configKeys.includes(key)))
      return false;
    return true;
  };

  if (Array.isArray(config)) {
    for (const _config of config) {
      const configKeys = Object.keys(_config);

      if (!checkRequiredKeys(configKeys)) return false;
    }
  } else {
    const configKeys = Object.keys(config);

    return checkRequiredKeys(configKeys);
  }

  return true;
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
 *
 * @throws If a key not expected to be Boolean in the defaultConfig is found
 */
export function mergeConfigs(defaultConfig: any, userConfig: any) {
  const mergedConfig: Record<any, any> = {};

  for (const _key in defaultConfig) {
    const userValue = userConfig[_key];

    if (
      typeof defaultConfig[_key] === "boolean" &&
      !BooleanKeysInDefaultConfig.includes(_key)
    ) {
      throw Error(`${_key} cannot be a Boolean in defaultConfig`);
    }

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
            if (_key === "register") {
              mergedConfig[_key] = userValue;
            } else {
              mergedConfig[_key] = structuredClone(defaultConfig[_key]);

              // Set register property to true if the default was false
              mergedConfig[_key]?.register === false &&
                (mergedConfig[_key].register = true);
            }
          } else if (userValue === false && _key === "register") {
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
        mergedConfig[_key] = structuredClone(defaultConfig[_key]);
      }
    }
  }

  return mergedConfig;
}

import EditorConfig, { AvailableConfigs } from "@/lib/config";
import type { ConfigPaths } from "@/lib/config";

/**
 * Gets the configuration for a given configPath.
 *
 * Check {@link ConfigPaths} to see allowed paths
 *
 * @param configPath The path of the configuration to get. eg `plugins.toolbar`.
 * @param configType The configuration to use. Either `default`, `user` or `merged`.
 * Defaults to `merged`
 *
 * @returns Configuration matching the path, else undefined.
 *
 * @example
 * // Returns the whole editor config.
 * const editorConfig = useConfig("")
 *
 * // toolbar plugin config.
 * const toolbarConfig = useConfig("plugins.toolbar")
 *
 * // html plugin config as set by the user
 * const htmlUserConfig = useConfig("plugins.html", "user")
 *
 * // default floating menu configuration
 * const floatingMenuDefaultConfig = useConfig("plugins.floatingMenu", "default")
 *
 * // register property of html config
 * const htmlIsRegistered = useConfig("plugins.html.register")
 */
export function useConfig(
  configPath: ConfigPaths,
  configType?: AvailableConfigs,
) {
  return EditorConfig.getConfigForPath(configPath, configType);
}

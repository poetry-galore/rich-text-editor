import type { ConfigPaths } from "@/lib/config";
import { useConfigContext } from "../contexts/ConfigContext";

/**
 * Gets the configuration for a given configPath.
 *
 * Check {@link ConfigPaths} to see allowed paths
 *
 * @param configPath The path of the configuration to get. eg `plugins.toolbar`.
 *
 * @returns Configuration matching the path, else undefined.
 *
 * @example
 * // Returns the whole editor config.
 * const editorConfig = useConfig("")
 *
 * // toolbar plugin config.
 * const toolbarConfig = useConfig("plugins.toolbar")
 */
export function useConfig(configPath: ConfigPaths) {
  const { configInst, configName, configType } = useConfigContext();

  return configInst.getConfigForPath(configPath, configName, configType);
}

import { createContext, ReactNode, useContext, useState } from "react";
import EditorConfig, { AvailableConfigs } from "../lib/config";
import { Config } from "../lib/config/config";

export type ConfigContextType = {
  configName: string;
  setConfigName: React.Dispatch<React.SetStateAction<string>>;
  configType: AvailableConfigs;
  setConfigType: React.Dispatch<React.SetStateAction<AvailableConfigs>>;
  configInst: Config;
  setConfigInst: React.Dispatch<React.SetStateAction<Config>>;
};

/**
 * Default value for the ConfigContext.
 *
 * Returned when the `useConfigContext` hook is called outside the
 * `ConfigContextProvider`
 */
const DEFAULT_CONFIG_CONTEXT_VALUE: ConfigContextType = {
  configName: "",
  setConfigName: () => {},
  configType: "default",
  setConfigType: () => {},
  configInst: EditorConfig,
  setConfigInst: () => {},
};

export const ConfigContext = createContext<ConfigContextType>(
  DEFAULT_CONFIG_CONTEXT_VALUE,
);

type ConfigContextProviderProps = {
  children: ReactNode;
};

/**
 * Provides the ConfigContext to its children
 */
export function ConfigContextProvider({
  children,
}: ConfigContextProviderProps) {
  const [configName, setConfigName] = useState<string>("");
  const [configType, setConfigType] = useState<AvailableConfigs>("default");
  const [configInst, setConfigInst] = useState<Config>(EditorConfig);

  return (
    <ConfigContext.Provider
      value={{
        configName,
        setConfigName,
        configType,
        setConfigType,
        configInst,
        setConfigInst,
      }}
    >
      {children}
    </ConfigContext.Provider>
  );
}

/**
 * If called outside the `ConfigContextProvider`, it returns
 * {@link DEFAULT_CONFIG_CONTEXT_VALUE}
 *
 * @returns ConfigContex value
 */
export function useConfigContext() {
  return useContext(ConfigContext);
}

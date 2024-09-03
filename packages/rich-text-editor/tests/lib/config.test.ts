import {
  Config,
  DEFAULT_EDITOR_CONFIG,
  EditorConfig,
  EditorConfigSchema,
  defineConfig,
  mergeConfigs,
} from "../../src/config";

const mockUserConfig: EditorConfigSchema = {
  plugins: {
    floatingMenu: true,
    toolbar: {
      register: true,
      textActions: ["bold", "italic", "underline"],
      blockTypes: ["paragraph", "h1", "h2", "quote"],
    },
    html: false,
  },
};

const mockMergedConfig: EditorConfigSchema = {
  plugins: {
    floatingMenu: {
      register: true,
      textActions: [
        "bold",
        "italic",
        "underline",
        "strikethrough",
        "highlight",
      ],
      historyActions: [],
      blockTypes: [],
    },
    toolbar: {
      register: true,
      textActions: ["bold", "italic", "underline"],
      blockTypes: ["paragraph", "h1", "h2", "quote"],
      historyActions: ["undo", "redo"],
    },
  },
};

const INVALID_CONFIG_TYPE = "_invalid_config_type_";
const INVALID_CONFIG_PATH = "_invalid_config_path_";
const INVALID_PLUGIN = "_invalid_plugin_";
const TEST_CONFIG_NAME = "__test_user_config__";

const configWithParam = (userConfig: EditorConfigSchema = mockUserConfig) =>
  new Config({ name: TEST_CONFIG_NAME, config: userConfig });
const configWithoutParam = () => new Config();

type ConfigWithParamType = ReturnType<typeof configWithParam>;
type ConfigWithoutParamType = ReturnType<typeof configWithoutParam>;

describe("Config", () => {
  describe("When initialized with the config parameter", () => {
    const testConfigWithParam: ConfigWithParamType = configWithParam();

    it("Expect the config to be set in the userConfigs map with the given name", () => {
      expect(testConfigWithParam.userConfigs.get(TEST_CONFIG_NAME)).toEqual(
        mockUserConfig,
      );
    });

    it("Expect the defaultConfig to be set to DEFAULT_EDITOR_CONFIG", () => {
      expect(testConfigWithParam.defaultConfig).toEqual(DEFAULT_EDITOR_CONFIG);
    });

    it("Expect a mergedConfig to be set in the mergedConfigs map with the same name as userCOnfig", () => {
      expect(testConfigWithParam.mergedConfigs.get(TEST_CONFIG_NAME)).toEqual(
        mockMergedConfig,
      );
    });
  });

  describe("When initialized without the config parameter", () => {
    const testConfigWithoutParam: ConfigWithoutParamType = configWithoutParam();

    it("Expect the userConfigs to be an empty map", () => {
      expect(testConfigWithoutParam.userConfigs).toEqual(new Map());
    });

    it("Expect the defaultConfig to be set to DEFAULT_EDITOR_CONFIG", () => {
      expect(testConfigWithoutParam.defaultConfig).toEqual(
        DEFAULT_EDITOR_CONFIG,
      );
    });

    it("Expect the mergedConfigs to be an empty map", () => {
      expect(testConfigWithoutParam.mergedConfigs).toEqual(new Map());
    });
  });

  describe("When setUserConfig method is called", () => {
    const newUserConfig: EditorConfigSchema = {
      plugins: {
        toolbar: false,
        floatingMenu: {
          register: true,
          textActions: ["bold"],
        },
      },
    };

    const configName = "__test_setUserConfig_name__";

    let testConfigWithParam: ConfigWithParamType;

    beforeEach(() => {
      testConfigWithParam = configWithParam();
    });

    afterEach(() => {
      vi.restoreAllMocks();
    });

    it("With a none-existing name, Expect the config to be added to the userConfigs", () => {
      expect(testConfigWithParam.userConfigs.get(configName)).toBeUndefined();
      testConfigWithParam.setUserConfig(configName, newUserConfig);

      expect(testConfigWithParam.userConfigs.get(configName)).toEqual(
        newUserConfig,
      );
    });

    it("With an existing name, Expect the userConfig mapped to name to be updated to the passed config", () => {
      expect(testConfigWithParam.userConfigs.get(TEST_CONFIG_NAME)).toEqual(
        mockUserConfig,
      );
      testConfigWithParam.setUserConfig(TEST_CONFIG_NAME, newUserConfig);

      expect(testConfigWithParam.userConfigs.get(TEST_CONFIG_NAME)).toEqual(
        newUserConfig,
      );
    });

    it("With a name that is not string, Expect the method to throw an error", () => {
      expect(() =>
        // @ts-expect-error
        testConfigWithParam.setUserConfig(["invalid_name"], newUserConfig),
      ).toThrow("'name' must be a string");
    });

    it("With a name as an empty string, Expect the method to throw an error", () => {
      expect(() =>
        testConfigWithParam.setUserConfig("", newUserConfig),
      ).toThrow("'name' cannot be an empty string");
    });

    it("Expect the mergeConfigs method to be called once", () => {
      const spy = vi
        .spyOn(testConfigWithParam, "mergeConfigs")
        .mockImplementationOnce(() => {});

      testConfigWithParam.setUserConfig(configName, newUserConfig);
      expect(spy).toHaveBeenCalledOnce();
    });
  });

  describe("When getUserConfigByName method is called", () => {
    let testConfigWithParam: ConfigWithParamType;

    beforeEach(() => {
      testConfigWithParam = configWithParam();
    });

    it("With a none-existing name, Expect the return to be undefined", () => {
      expect(
        testConfigWithParam.getUserConfigByName(
          "__test_getUserConfigByName_invalid_name__",
        ),
      ).toBeUndefined();
    });

    it("With an existing name, Expect the return to be the userConfig mapped to the name", () => {
      expect(testConfigWithParam.getUserConfigByName(TEST_CONFIG_NAME)).toEqual(
        mockUserConfig,
      );
    });
  });

  describe("When getMergedConfigByName method is called", () => {
    let testConfigWithParam: ConfigWithParamType;

    beforeEach(() => {
      testConfigWithParam = configWithParam();
    });

    it("With a none-existing name, Expect the return to be undefined", () => {
      expect(
        testConfigWithParam.getMergedConfigByName(
          "__test_getMergedConfigByName_invalid_name__",
        ),
      ).toBeUndefined();
    });

    it("With an existing name, Expect the return to be the mergedConfig mapped to the name", () => {
      expect(
        testConfigWithParam.getMergedConfigByName(TEST_CONFIG_NAME),
      ).toEqual(mockMergedConfig);
    });

    describe("With an existing name that is not mapped in the mergedConfigs but is mapped in userConfigs", () => {
      const configName = "__test_getMergedConfigs__";

      it("Expect the method to create a mergedConfig mapped to the given name and return the config", () => {
        vi.spyOn(testConfigWithParam, "mergeConfigs").mockImplementationOnce(
          () => {},
        );

        testConfigWithParam.setUserConfig(configName, mockUserConfig);
        expect(
          testConfigWithParam.mergedConfigs.get(configName),
        ).toBeUndefined();

        vi.restoreAllMocks();

        const spy = vi.spyOn(testConfigWithParam, "mergeConfigs");

        expect(testConfigWithParam.getMergedConfigByName(configName)).toEqual(
          mockMergedConfig,
        );

        expect(spy).toHaveBeenCalledOnce();
        spy.mockRestore();
      });
    });
  });

  describe("When getConfigByName method is called", () => {
    let testConfigWithParam: ConfigWithParamType;

    const invalidName = "__test_getConfigByName_invalid_name__";

    beforeEach(() => {
      testConfigWithParam = configWithParam();
    });

    it("With a none-existing name and no configType, Expect the return to be undefined", () => {
      expect(testConfigWithParam.getConfigByName(invalidName)).toBeUndefined();
    });

    it("With an existing name and no configType, Expect the return to be the mergedConfig mapped to the name", () => {
      expect(testConfigWithParam.getConfigByName(TEST_CONFIG_NAME)).toEqual(
        mockMergedConfig,
      );
    });

    it("With an existing name and configType = 'user', Expect the return to be the userConfig mapped to the name", () => {
      expect(
        testConfigWithParam.getConfigByName(TEST_CONFIG_NAME, "user"),
      ).toEqual(mockUserConfig);
    });

    it("With a name that is not a string, Expect an error to be thrown", () => {
      // @ts-expect-error
      expect(() => testConfigWithParam.getConfigByName([], "user")).toThrow(
        `'name' must be a string. Options are: '${TEST_CONFIG_NAME}`,
      );
    });

    it("With a configType that is not 'user' or 'merged', Expect an error to be thrown", () => {
      expect(() =>
        testConfigWithParam.getConfigByName(
          TEST_CONFIG_NAME,
          // @ts-expect-error
          "invalid_config_type",
        ),
      ).toThrow(`'configType' must be 'merged' or 'user'`);
    });
  });

  describe("When the getConfigForPath method is called", () => {
    const testConfigWithParam: ConfigWithParamType = configWithParam();

    it("Without any parameters. Expect the defaultConfig to be returned.", () => {
      expect(testConfigWithParam.getConfigForPath()).toEqual(
        testConfigWithParam.defaultConfig,
      );
    });

    it("With configPath = '', no name and no configType. Expect the defaultConfig to be returned", () => {
      expect(testConfigWithParam.getConfigForPath("")).toEqual(
        testConfigWithParam.defaultConfig,
      );
    });

    it("With configPath = '', a valid name and configType = 'user'. Expect userConfig mapped to the name to be returned", () => {
      expect(
        testConfigWithParam.getConfigForPath("", TEST_CONFIG_NAME, "user"),
      ).toEqual(testConfigWithParam.userConfigs.get(TEST_CONFIG_NAME));
    });

    it("With configPath = 'plugins.toolbar', name = '' and configType ='default'. Expect return to be plugins.toolbar from the defaultConfig", () => {
      expect(
        testConfigWithParam.getConfigForPath("plugins.toolbar", "", "default"),
      ).toEqual(testConfigWithParam.defaultConfig.plugins?.toolbar);
    });

    it("With configPath = 'plugins.toolbar', a valid name and configType ='default'. Expect return to be plugins.toolbar from the mergedConfig", () => {
      expect(
        testConfigWithParam.getConfigForPath(
          "plugins.toolbar",
          TEST_CONFIG_NAME,
          "default",
        ),
      ).toEqual(
        testConfigWithParam.mergedConfigs.get(TEST_CONFIG_NAME)?.plugins
          ?.toolbar,
      );
    });

    it(`With configPath = '${INVALID_CONFIG_PATH}', valid name and no configType. Expect return to be undefined`, () => {
      expect(
        testConfigWithParam.getConfigForPath(
          // @ts-expect-error
          `${INVALID_CONFIG_PATH}`,
          TEST_CONFIG_NAME,
        ),
      ).toBeUndefined();
    });

    it(`With configPath = '', valid name and configType = '${INVALID_CONFIG_TYPE}'. Expect return to be undefined`, () => {
      expect(() =>
        testConfigWithParam.getConfigForPath(
          "",
          TEST_CONFIG_NAME,
          // @ts-expect-error
          `${INVALID_CONFIG_TYPE}`,
        ),
      ).toThrow("'configType' must be 'default', 'merged' or 'user'");
    });

    it(`With configPath = '', invalid name and configType = 'merged'. Expect return to be undefined`, () => {
      expect(
        testConfigWithParam.getConfigForPath(
          "",
          "__test_getConfigForPath_invalid_name__",
          "merged",
        ),
      ).toBeUndefined();
    });

    it("With configPath = 'plugins.notFound', no name and no configType. Expect return to be undefined", () => {
      expect(
        // @ts-expect-error
        testConfigWithParam.getConfigForPath("plugins.notFound"),
      ).toBeUndefined();
    });

    it("With configPath = 'plugins-toolbar', no name and no configType. Expect return to be undefined", () => {
      expect(
        // @ts-expect-error
        testConfigWithParam.getConfigForPath("plugins-toolbar"),
      ).toBeUndefined();
    });
  });

  describe("When the pluginIsRegistered method is called", () => {
    describe("With plugin = 'toolbar', no name and no configType parameters", () => {
      let testConfigWithParam: ConfigWithParamType;

      beforeEach(() => {
        testConfigWithParam = configWithParam();
      });

      it("Expect the defaultConfig to be used", () => {
        expect(testConfigWithParam.pluginIsRegistered("toolbar")).toEqual(
          // @ts-expect-error
          testConfigWithParam.defaultConfig.plugins?.toolbar?.register,
        );
      });
    });

    describe("With plugin = 'toolbar', valid name and configType = 'user' parameters", () => {
      function generateUserConfig(
        toolbar: "object" | "boolean" | "undefined",
        plugins: "object" | "undefined" = "object",
      ) {
        const userConfig: EditorConfigSchema = {
          plugins: undefined,
        };

        if (plugins === "object") {
          switch (toolbar) {
            case "object":
              userConfig.plugins = { toolbar: { register: true } };
              break;
            case "boolean":
              userConfig.plugins = { toolbar: true };
              break;
            case "undefined":
              userConfig.plugins = { toolbar: undefined };
              break;
          }
        }

        return userConfig;
      }

      it("Expect return to be equal to the plugins.toolbar if plugins.toolbar is boolean", () => {
        const testConfigWithParam = configWithParam(
          generateUserConfig("boolean"),
        );

        expect(
          testConfigWithParam.pluginIsRegistered(
            "toolbar",
            TEST_CONFIG_NAME,
            "user",
          ),
        ).toEqual(
          testConfigWithParam.userConfigs.get(TEST_CONFIG_NAME)?.plugins
            ?.toolbar,
        );
      });

      it("Expect return to be equal to the plugins.toolbar.register if plugins.toolbar is object", () => {
        const testConfigWithParam = configWithParam(
          generateUserConfig("object"),
        );

        expect(
          testConfigWithParam.pluginIsRegistered(
            "toolbar",
            TEST_CONFIG_NAME,
            "user",
          ),
        ).toEqual(
          //@ts-expect-error
          testConfigWithParam.userConfigs.get(TEST_CONFIG_NAME)?.plugins
            ?.toolbar.register,
        );
      });

      it("Expect return to be false if plugins.toolbar is undefined", () => {
        const testConfigWithParam = configWithParam(
          generateUserConfig("undefined"),
        );

        expect(
          testConfigWithParam.pluginIsRegistered(
            "toolbar",
            TEST_CONFIG_NAME,
            "user",
          ),
        ).toBeFalsy();
      });

      it("Expect return to be false if plugins is undefined", () => {
        const testConfigWithParam = configWithParam(
          generateUserConfig("undefined", "undefined"),
        );

        expect(
          testConfigWithParam.pluginIsRegistered(
            "toolbar",
            TEST_CONFIG_NAME,
            "user",
          ),
        ).toBeFalsy();
      });
    });

    describe(`With plugin = '${INVALID_PLUGIN}'`, () => {
      let testConfigWithParam: ConfigWithParamType;

      beforeEach(() => {
        testConfigWithParam = configWithParam();
      });

      it("Expect return to be false", () => {
        expect(
          // @ts-expect-error
          testConfigWithParam.pluginIsRegistered(`${INVALID_PLUGIN}`),
        ).toBeFalsy();
      });
    });

    describe(`With plugin = 'toolbar', name = '', and configType = '${INVALID_CONFIG_TYPE}' parameters`, () => {
      let testConfigWithParam: ConfigWithParamType;

      beforeEach(() => {
        testConfigWithParam = configWithParam();
      });

      it("Expect an error to be thrown", () => {
        expect(() =>
          testConfigWithParam.pluginIsRegistered(
            "toolbar",
            TEST_CONFIG_NAME,
            // @ts-expect-error
            `${INVALID_CONFIG_TYPE}`,
          ),
        ).toThrow(`'configType' must be 'default', 'merged' or 'user'`);
      });
    });

    describe(`With plugin = 'toolbar', invalid name and configType = 'merged' parameters`, () => {
      let testConfigWithParam: ConfigWithParamType;

      beforeEach(() => {
        testConfigWithParam = configWithParam();
      });

      it("Expect return to be false", () => {
        expect(
          testConfigWithParam.pluginIsRegistered(
            "toolbar",
            "__invalid__name__for_plugin",
            "merged",
          ),
        ).toBeFalsy();
      });
    });
  });
});

describe("defineConfig1", () => {
  const config: EditorConfigSchema = {
    plugins: {
      toolbar: true,
      html: true,
      floatingMenu: {
        register: true,
        historyActions: ["undo"],
      },
    },
  };

  const configName = "__test_defineConfig_name__";

  describe("When called with editorConfig and no configInstance", () => {
    it("With a single editorConfig, Expect the config to be set appropriately", () => {
      defineConfig({
        name: configName,
        config,
      });

      expect(EditorConfig.getUserConfigByName(configName)).toEqual(config);
    });

    it("With an array of editorConfigs, Expect all configs to be set appropriately", () => {
      defineConfig([
        {
          name: `${configName}-1`,
          config,
        },
        {
          name: `${configName}-2`,
          config,
        },
      ]);

      expect(EditorConfig.getUserConfigByName(`${configName}-1`)).toEqual(
        config,
      );
      expect(EditorConfig.getUserConfigByName(`${configName}-2`)).toEqual(
        config,
      );
    });

    it("With a name that is not a string, Expect error to be thrown", () => {
      // @ts-expect-error
      expect(() => defineConfig({ name: [], config })).toThrow(
        "'name' must be a string",
      );
    });

    it("With an editorConfig that's not an object, Expect error to be thrown", () => {
      expect(() =>
        // @ts-expect-error
        defineConfig(""),
      ).toThrow("Invalid configuration passed to defineConfig");
    });

    it("With an empty array for editorConfig, Expect error to be thrown", () => {
      expect(() => defineConfig([])).toThrow(
        "Invalid configuration passed to defineConfig",
      );
    });

    it("With an editorConfig missing required keys, Expect error to be thrown", () => {
      expect(() =>
        // @ts-expect-error
        defineConfig({ name: configName }),
      ).toThrow("Invalid configuration passed to defineConfig");
    });

    it("With an array having an editorConfig missing required keys, Expect error to be thrown", () => {
      expect(() =>
        // @ts-expect-error
        defineConfig([{ name: configName }]),
      ).toThrow("Invalid configuration passed to defineConfig");
    });
  });

  describe("When called with editorConfig and a configInstance", () => {
    it("Expect editorConfig to be set in the configInstance", () => {
      const testConfigInstance = new Config();

      defineConfig(
        {
          name: configName,
          config,
        },
        testConfigInstance,
      );

      expect(testConfigInstance.getUserConfigByName(configName)).toEqual(
        config,
      );
    });

    it("With a configInstance not instanceof Config, Expect the default config instance to be used", () => {
      const testConfigInstance = new Map();
      const _configName = defineConfig(
        {
          name: `${configName}-00`,
          config,
        },
        //@ts-expect-error
        testConfigInstance,
      );

      expect(EditorConfig.getUserConfigByName(`${configName}-00`)).toEqual(
        config,
      );
    });
  });
});

describe("mergeConfigs", () => {
  it("Throws if a key that is not supposed to be boolean is boolean", () => {
    const testDefaultConfig = {
      plugins: {
        toolbar: true,
      },
    };

    expect(() => mergeConfigs(testDefaultConfig, mockUserConfig)).throws(
      "toolbar cannot be a Boolean in defaultConfig",
    );
  });

  it("A userValue that is not of type of object or boolean is assigned as is in the userConfig", () => {
    const testDefaultConfig = {
      plugins: {
        toolbar: { register: false },
      },
    };

    const testUserConfig = {
      plugins: {
        toolbar: 1,
      },
    };

    const expectedMergedConfig = {
      plugins: {
        toolbar: 1,
      },
    };

    const mergedConfig = mergeConfigs(testDefaultConfig, testUserConfig);

    expect(mergedConfig).toEqual(expectedMergedConfig);
  });
});

import EditorConfig, {
  Config,
  defineConfig,
  mergeConfigs,
} from "../../src/lib/config/config";
import {
  DEFAULT_EDITOR_CONFIG,
  EditorConfigSchema,
} from "../../src/lib/config";

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

const configWithParam = (userConfig: EditorConfigSchema = mockUserConfig) =>
  new Config(userConfig);
const configWithoutParam = () => new Config();

type ConfigWithParamType = ReturnType<typeof configWithParam>;
type ConfigWithoutParamType = ReturnType<typeof configWithoutParam>;

describe("Config", () => {
  describe("When initialized with the config parameter", () => {
    const testConfigWithParam: ConfigWithParamType = configWithParam();

    it("Expect the userConfig to be set to the passed config", () => {
      expect(testConfigWithParam.userConfig).toEqual(mockUserConfig);
    });

    it("Expect the defaultConfig to be set to DEFAULT_EDITOR_CONFIG", () => {
      expect(testConfigWithParam.defaultConfig).toEqual(DEFAULT_EDITOR_CONFIG);
    });

    it("Expect the mergedConfig to be a merge of defaultConfig and userConfig", () => {
      expect(testConfigWithParam.mergedConfig).toEqual(mockMergedConfig);
    });

    it("Expect userConfigIsSet getter to return true", () => {
      expect(testConfigWithParam.userConfigIsSet).toBeTruthy();
    });
  });

  describe("When initialized without the config parameter", () => {
    const testConfigWithoutParam: ConfigWithoutParamType = configWithoutParam();

    it("Expect the userConfig to be undefined", () => {
      expect(testConfigWithoutParam.userConfig).toBeUndefined();
    });

    it("Expect the defaultConfig to be set to DEFAULT_EDITOR_CONFIG", () => {
      expect(testConfigWithoutParam.defaultConfig).toEqual(
        DEFAULT_EDITOR_CONFIG,
      );
    });

    it("Expect the mergedConfig to be an empty object", () => {
      expect(testConfigWithoutParam.mergedConfig).toEqual({});
    });

    it("Expect userConfigIsSet getter to return false", () => {
      expect(testConfigWithoutParam.userConfigIsSet).toBeFalsy();
    });
  });

  describe("When userConfig setter is called", () => {
    const newUserConfig: EditorConfigSchema = {
      plugins: {
        toolbar: false,
        floatingMenu: {
          register: true,
          textActions: ["bold"],
        },
      },
    };

    let testConfigWithParam: ConfigWithParamType,
      testConfigWithoutParam: ConfigWithoutParamType;

    beforeEach(() => {
      testConfigWithParam = configWithParam();
      testConfigWithoutParam = configWithoutParam();
    });

    afterEach(() => {
      vi.restoreAllMocks();
    });

    it("With the _userConfig already set, Expect the setter not to change _userConfig", () => {
      const prevUserConfig = testConfigWithParam.userConfig;
      testConfigWithParam.userConfig = newUserConfig;

      expect(testConfigWithParam.userConfig).toEqual(prevUserConfig);
    });

    it("With the _userConfig being undefined, Expect the setter to set _userConfig to the new value", () => {
      expect(testConfigWithoutParam.userConfig).toBeUndefined();

      testConfigWithoutParam.userConfig = newUserConfig;
      expect(testConfigWithoutParam.userConfig).toEqual(newUserConfig);
    });

    it("With the _userConfig being undefined, Expect the _mergeConfigs function to be called once", () => {
      expect(testConfigWithoutParam.userConfig).toBeUndefined();

      const spy = vi
        .spyOn(testConfigWithoutParam, "_mergeConfigs")
        .mockImplementationOnce(() => {});
      testConfigWithoutParam.userConfig = newUserConfig;

      expect(spy).toHaveBeenCalledOnce();
    });
  });

  describe("When the getConfig method is called", () => {
    const testConfigWithParam: ConfigWithParamType = configWithParam();

    it("Without a parameter. Expect the method to return the mergedConfig", () => {
      expect(testConfigWithParam.getConfig()).toEqual(
        testConfigWithParam.mergedConfig,
      );
    });

    it("With configType = 'default'. Expect the method to return the defaultConfig", () => {
      expect(testConfigWithParam.getConfig("default")).toEqual(
        testConfigWithParam.defaultConfig,
      );
    });

    it("With configType = 'user'. Expect the method to return the userConfig", () => {
      expect(testConfigWithParam.getConfig("user")).toEqual(
        testConfigWithParam.userConfig,
      );
    });

    it("With configType = 'merged'. Expect the method to return the mergedConfig", () => {
      expect(testConfigWithParam.getConfig("merged")).toEqual(
        testConfigWithParam.mergedConfig,
      );
    });

    it("With configType = ${INVALID_CONFIG_TYPE}. Expect the method to return undefined", () => {
      expect(
        // @ts-expect-error
        testConfigWithParam.getConfig(`${INVALID_CONFIG_TYPE}`),
      ).toBeTypeOf("undefined");
    });
  });

  describe("When the getConfigForPath method is called", () => {
    const testConfigWithParam: ConfigWithParamType = configWithParam();

    it("Without any parameters. Expect return to be the whole config using the mergedConfig", () => {
      expect(testConfigWithParam.getConfigForPath()).toEqual(
        testConfigWithParam.mergedConfig,
      );
    });

    it("With configPath = '' and no configType. Expect return to be the whole config using the mergedConfig", () => {
      expect(testConfigWithParam.getConfigForPath("")).toEqual(
        testConfigWithParam.mergedConfig,
      );
    });

    it("With configPath = '' and configType = 'user'. Expect return to be the whole config using the userConfig", () => {
      expect(testConfigWithParam.getConfigForPath("", "user")).toEqual(
        testConfigWithParam.userConfig,
      );
    });

    it("With configPath = 'plugins.toolbar' and configType ='default'. Expect return to be plugins.toolbar from the defaultConfig", () => {
      expect(
        testConfigWithParam.getConfigForPath("plugins.toolbar", "default"),
      ).toEqual(testConfigWithParam.defaultConfig.plugins?.toolbar);
    });

    it(`With configPath = '${INVALID_CONFIG_PATH}' and no configType. Expect return to be undefined`, () => {
      expect(
        // @ts-expect-error
        testConfigWithParam.getConfigForPath(`${INVALID_CONFIG_PATH}`),
      ).toBeUndefined();
    });

    it(`With configPath = '' and configType = '${INVALID_CONFIG_TYPE}'. Expect return to be undefined`, () => {
      expect(
        // @ts-expect-error
        testConfigWithParam.getConfigForPath("", `${INVALID_CONFIG_TYPE}`),
      ).toBeUndefined();
    });

    it(`With configPath = '${INVALID_CONFIG_PATH}' and configType = '${INVALID_CONFIG_TYPE}'. Expect return to be undefined`, () => {
      expect(
        testConfigWithParam.getConfigForPath(
          // @ts-expect-error
          `${INVALID_CONFIG_PATH}`,
          `${INVALID_CONFIG_TYPE}`,
        ),
      ).toBeUndefined();
    });

    it("With configPath = 'plugins.notFound' and no configType. Expect return to be undefined", () => {
      expect(
        // @ts-expect-error
        testConfigWithParam.getConfigForPath("plugins.notFound"),
      ).toBeUndefined();
    });

    it("With configPath = 'plugins-toolbar' and no configType. Expect return to be undefined", () => {
      expect(
        // @ts-expect-error
        testConfigWithParam.getConfigForPath("plugins-toolbar"),
      ).toBeUndefined();
    });
  });

  describe("When the pluginIsRegistered method is called", () => {
    describe("With plugin = 'toolbar' and no configType parameters", () => {
      let testConfigWithParam: ConfigWithParamType,
        testConfigWithoutParam: ConfigWithoutParamType;

      beforeEach(() => {
        testConfigWithParam = configWithParam();
        testConfigWithoutParam = configWithoutParam();
      });

      it("Expect the _mergedConfig to be used", () => {
        expect(testConfigWithParam.pluginIsRegistered("toolbar")).toEqual(
          // @ts-expect-error
          testConfigWithParam.mergedConfig.plugins?.toolbar?.register,
        );
      });

      it("Expect return to be false if the mergedConfig is {}", () => {
        expect(testConfigWithoutParam.mergedConfig).toEqual({});
        expect(
          testConfigWithoutParam.pluginIsRegistered("toolbar"),
        ).toBeFalsy();
      });
    });

    describe("With plugin = 'toolbar' and configType = 'user' parameters", () => {
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
              userConfig.plugins = { toolbar: { register: false } };
              break;
            case "boolean":
              userConfig.plugins = { toolbar: false };
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
          testConfigWithParam.pluginIsRegistered("toolbar", "user"),
        ).toEqual(testConfigWithParam.userConfig?.plugins?.toolbar);
      });

      it("Expect return to be equal to the plugins.toolbar.register if plugins.toolbar is object", () => {
        const testConfigWithParam = configWithParam(
          generateUserConfig("object"),
        );

        expect(
          testConfigWithParam.pluginIsRegistered("toolbar", "user"),
        ).toEqual(
          // @ts-expect-error
          testConfigWithParam.userConfig?.plugins?.toolbar.register,
        );
      });

      it("Expect return to be false if plugins.toolbar is undefined", () => {
        const testConfigWithParam = configWithParam(
          generateUserConfig("undefined"),
        );

        expect(
          testConfigWithParam.pluginIsRegistered("toolbar", "user"),
        ).toBeFalsy();
      });

      it("Expect return to be false if plugins is undefined", () => {
        const testConfigWithParam = configWithParam(
          generateUserConfig("undefined", "undefined"),
        );

        expect(
          testConfigWithParam.pluginIsRegistered("toolbar", "user"),
        ).toBeFalsy();
      });
    });

    describe("With plugin = 'toolbar' and configType = 'default' parameters", () => {
      let testConfigWithParam: ConfigWithParamType;

      beforeEach(() => {
        testConfigWithParam = configWithParam();
      });

      it("Expect return to be equal to the plugins.toolbar.register from the defaultConfig if plugins.toolbar", () => {
        const toolbarPluginConfig =
          testConfigWithParam.defaultConfig.plugins?.toolbar;

        expect(
          testConfigWithParam.pluginIsRegistered("toolbar", "default"),
          // @ts-expect-error
        ).toEqual(toolbarPluginConfig.register);
      });
    });

    describe(`With plugin = '${INVALID_PLUGIN}' and no configType parameters`, () => {
      let testConfigWithParam: ConfigWithParamType;

      beforeEach(() => {
        testConfigWithParam = configWithParam();
      });

      it("Expect return to be false", () => {
        expect(
          // @ts-expect-error
          testConfigWithParam.pluginIsRegistered("invalidPlugin"),
        ).toBeFalsy();
      });
    });

    describe(`With plugin = 'toolbar' and configType = '${INVALID_CONFIG_TYPE}' parameters`, () => {
      let testConfigWithParam: ConfigWithParamType;

      beforeEach(() => {
        testConfigWithParam = configWithParam();
      });

      it("Expect return to be false", () => {
        expect(
          testConfigWithParam.pluginIsRegistered(
            "toolbar",
            // @ts-expect-error
            `${INVALID_CONFIG_TYPE}`,
          ),
        ).toBeFalsy();
      });
    });

    describe(`With plugin = '${INVALID_PLUGIN}' and configType = '${INVALID_CONFIG_TYPE}' parameters`, () => {
      let testConfigWithParam: ConfigWithParamType;

      beforeEach(() => {
        testConfigWithParam = configWithParam();
      });

      it("Expect return to be false", () => {
        expect(
          testConfigWithParam.pluginIsRegistered(
            // @ts-expect-error
            "invalidPlugin",
            `${INVALID_CONFIG_TYPE}`,
          ),
        ).toBeFalsy();
      });
    });
  });
});

describe("defineConfig", () => {
  it("Expect userConfig to be set when the defineConfig function is called with a valid config", () => {
    expect(EditorConfig.userConfigIsSet).toBeFalsy();

    defineConfig({
      plugins: {
        toolbar: true,
        html: true,
        floatingMenu: {
          register: true,
          historyActions: ["undo"],
        },
      },
    });

    expect(EditorConfig.userConfigIsSet).toBeTruthy();
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

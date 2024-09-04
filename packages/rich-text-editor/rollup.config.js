import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import postcss from "rollup-plugin-postcss";
import _visualizer from "rollup-plugin-visualizer";

import { getFiles } from "./scripts/buildUtils";

const visualizer = _visualizer.default ?? _visualizer;

const extensions = [".js", ".ts", ".jsx", ".tsx"];
const excludeExtensions = [".stories.tsx", ".stories.jsx"];

const isProduction = process.env.NODE_ENV === "production";

const intro = `
/**
 * Copyright (c) Poetry Galore
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
`;

const outputs = [
  {
    dir: "dist",
    format: "cjs",
    preserveModules: true,
    preserveModulesRoot: "src",
    entryFileNames: `${isProduction ? `[name].js` : `[name].dev.js`}`,
    exports: "named",
    minify: isProduction,
  },
  {
    dir: "dist",
    format: "esm",
    preserveModules: true,
    preserveModulesRoot: "src",
    entryFileNames: `${isProduction ? `[name].mjs` : `[name].dev.mjs`}`,
    exports: "named",
    minify: isProduction,
  },
];

export default [
  ...outputs.map(
    ({
      dir,
      format,
      preserveModules,
      preserveModulesRoot,
      entryFileNames,
      minify,
    }) => ({
      input: [
        "src/index.ts",
        ...getFiles("./src/plugins", extensions, excludeExtensions),
        ...getFiles("./src/components", extensions, excludeExtensions),
        ...getFiles("./src/hooks", extensions, excludeExtensions),
        ...getFiles("./src/config", extensions, excludeExtensions),
        ...getFiles("./src/contexts", extensions, excludeExtensions),
        ...getFiles("./src/lib", extensions, excludeExtensions),
      ],
      output: {
        dir,
        format,
        preserveModules,
        preserveModulesRoot,
        entryFileNames,
        intro,
      },
      plugins: [
        peerDepsExternal(),
        resolve(),
        commonjs(),
        replace({
          "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
          preventAssignment: true,
        }),
        postcss(),
        typescript({ tsconfig: "./tsconfig.rollup.json" }),
        minify &&
          terser({
            compress: {
              drop_debugger: true,
            },
            mangle: true,
            format: {
              comments: false,
            },
          }),
        visualizer({
          filename: `bundle-analysis-${isProduction ? "prod" : "dev"}.html`,
          // open: true,
        }),
      ].filter(Boolean),
      external: ["react", "react-dom"],
    }),
  ),
  {
    input: "src/index.ts",
    output: [{ file: "dist/index.d.ts", format: "esm" }],
    plugins: [dts.default()],
    external: [/\.css$/],
  },
];

const { rollup } = require("rollup");
const fs = require("fs");

const intro = `
/**
 * Copyright (c) Poetry Galore
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
`;

const cjsContent = (filename) => `${intro}

'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./${filename}.prod.js');
} else {
  module.exports = require('./${filename}.dev.js');
}
`;

const esmContent = (filename, modExports = [], parent = "") => `${intro}

import * as modProd from './${filename}.prod.mjs';
import * as modDev from './${filename}.dev.mjs';

const mod = process.env.NODE_ENV === "production" ? modProd : modDev;
${modExports.map((e) => `export const ${e === "default" ? (parent && parent !== "dist" ? parent : filename) : e} = mod.${e};`).join("\n")}
`;

const excludeDirs = ["node_modules", "_virtual"];
const excludeExtensions = [
  ".prod.js",
  ".prod.mjs",
  ".dev.js",
  ".d.ts",
  ".types.js",
  ".types.prod.js",
  ".types.dev.js",
  ".types.prod.mjs",
  ".types.dev.mjs",
  ".css.prod.js",
  ".css.dev.js",
  ".css.prod.mjs",
  ".css.dev.mjs",
];

const _entry = process.argv.length > 2 ? process.argv[2] : "./dist";

/**
 * Get paths to all required entry files
 *
 * @param {string} entry
 */
const getEntryFiles = (entry = _entry) => {
  let indexFiles = [];

  const dirs = fs
    .readdirSync(entry)
    .filter((dir) => !excludeDirs.includes(dir));

  dirs.forEach((dir) => {
    path = `${entry}/${dir}`;

    if (fs.lstatSync(path).isDirectory()) {
      indexFiles = [...indexFiles, ...getEntryFiles(path)];
      return;
    }

    if (
      !excludeExtensions.some((exclude) => dir.endsWith(exclude)) &&
      dir.endsWith(".mjs")
    ) {
      indexFiles.push(path);
    }
  });

  return indexFiles;
};

/**
 * Get exports in a given file.
 *
 * @param {string} filePath 
 */
async function analyzeExports(filePath) {
  const bundle = await rollup({
    input: filePath,
    logLevel: "silent",
  });

  const { output } = await bundle.generate({
    format: "esm",
  });

  const exports = output[0].exports;
  return exports;
}

/**
 * Write entry files with the needed content depending on format.
 *
 * @param { string[] } indexFiles 
 */
const writeEntryFiles = async (indexFiles = [""]) => {
  console.log("\nCreating entry files");

  indexFiles.forEach(async (path) => {
    const filename = path.split("/").pop().split(".")[0];
    const cjsPath = path.replace(/[.]?(dev|prod)?[.](js|mjs)$/, ".js");

    fs.writeFileSync(cjsPath, cjsContent(filename).trim());

    const esmPath = path.replace(/[.]?(dev|prod)?[.](js|mjs)$/, ".mjs");
    const esmDevPath = path.endsWith(".dev.mjs")
      ? path
      : path.replace(/[.]?(prod)?[.](js|mjs)$/, ".dev.mjs");
    const parent = path.split("/").slice(-2, -1)[0];

    const modExports = await analyzeExports(esmDevPath);

    fs.writeFileSync(esmPath, esmContent(filename, modExports, parent).trim());
  });

  console.log("\nCreated entry files")
};

writeEntryFiles(getEntryFiles());

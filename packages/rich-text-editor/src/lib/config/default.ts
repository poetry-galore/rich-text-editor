import {
  type EditorConfigSchema,
  BLOCK_TYPES,
  HISTORY_ACTIONS,
  TEXT_ACTIONS,
} from "./config.types";

/**
 * Default configuration
 */
export const DEFAULT_EDITOR_CONFIG: EditorConfigSchema = {
  plugins: {
    toolbar: {
      register: true,
      textActions: TEXT_ACTIONS,
      historyActions: HISTORY_ACTIONS,
      blockTypes: BLOCK_TYPES,
    },
    floatingMenu: {
      register: false,
      textActions: [
        "bold",
        "italic",
        "underline",
        "strikethrough",
        "highlight",
      ],
    },
    html: {
      register: true,
    },
  },
};

import { CustomEditorState } from "../../hooks/useCustomEditorState";

export interface CustomOnChangePluginProps {
  /**
   * Callback triggered when the editor undergoes an update.
   *
   * @param customEditorState Custom Editor state
   * @param tags
   */
  onChange: (customEditorState: CustomEditorState, tags?: Set<string>) => void;

  /**
   * Whether to ignore the selection change
   */
  ignoreSelectionChange?: boolean;

  /**
   * Whether to ignore the history merge change
   */
  ignoreHistoryMergeTagChange?: boolean;
}

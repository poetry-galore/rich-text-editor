import { HistoryActionsConfig } from "../../config";

export type HistoryActionsProps = React.AllHTMLAttributes<HTMLDivElement> & {
  /**
   * Configuration
   */
  config?: HistoryActionsConfig;
  /**
   * Whether to add a separator at the end
   */
  separator?: boolean;
};

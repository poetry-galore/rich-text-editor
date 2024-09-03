import type { BlockTypesConfig } from "@/config";

export const blockTypeToBlockName: Record<string, string> = {
  paragraph: "Normal",
  h1: "Heading 1",
  h2: "Heading 2",
  h3: "Heading 3",
  h4: "Heading 4",
  h5: "Heading 5",
  h6: "Heading 6",
  quote: "Quote",
  bullet: "Bulleted List",
  number: "Numbered List",
};

export type BlockTypeDropdownProps = React.AllHTMLAttributes<HTMLDivElement> & {
  /**
   * Configuration
   */
  config?: BlockTypesConfig;
  /**
   * Whether to add a separator at the end
   */
  separator?: boolean;
};

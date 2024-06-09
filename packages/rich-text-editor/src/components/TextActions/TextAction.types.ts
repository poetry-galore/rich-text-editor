import { TextFormatType } from "lexical";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

export type TextActionType = {
  /**
   * The type of the text format. eg bold or italic
   */
  type: TextFormatType;
  /**
   * The fontawesome icon to use
   */
  icon: IconDefinition;
  /**
   * Function used for setting the state of the format in the selection
   */
  setter: React.Dispatch<React.SetStateAction<boolean>>;
  /**
   * Whether the format is set for the given selection
   */
  isSet: boolean;
};

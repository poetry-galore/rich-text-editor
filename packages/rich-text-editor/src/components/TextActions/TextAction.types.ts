import { TextFormatType } from "lexical";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import React from "react";

export type TextActionType = {
  /**
   * The type of the text format. eg bold or italic
   */
  type: TextFormatType;
  /**
   * Icon to use in the toggle of the action.
   *
   * Can be Fontawesome icon or a function that returns a JSX.Element
   */
  icon: IconDefinition | (() => React.JSX.Element);
  /**
   * Function used for setting the state of the format in the selection
   */
  setter: React.Dispatch<React.SetStateAction<boolean>>;
  /**
   * Whether the format is set for the given selection
   */
  isSet: boolean;
};

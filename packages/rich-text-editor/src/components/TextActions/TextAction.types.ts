import { type TextActionsConfig, TEXT_ACTIONS } from "@/config";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { TextFormatType } from "lexical";
import React from "react";

/**
 * TextActions props
 */
export type TextActionsProps = React.AllHTMLAttributes<HTMLDivElement> & {
  config?: TextActionsConfig;
};

/**
 * Type of a text action
 */
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

export type TextActionsMapping = Record<
  (typeof TEXT_ACTIONS)[number],
  TextActionType
>;

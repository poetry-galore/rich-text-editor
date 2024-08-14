import { useCallback, useEffect, useState } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { mergeRegister } from "@lexical/utils";
import {
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_CRITICAL,
  FORMAT_TEXT_COMMAND,
  SELECTION_CHANGE_COMMAND,
} from "lexical";

import {
  faHighlighter,
  faSubscript,
  faSuperscript,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  FontBoldIcon,
  FontItalicIcon,
  UnderlineIcon,
  StrikethroughIcon,
  CodeIcon,
} from "@radix-ui/react-icons";

import { Toggle } from "@/components/ui/toggle";

import { TextActionType } from "./TextAction.types";

/**
 * Bold, italic, underline, code, highlight, strikethrough, subscript and superscript actions
 */
export default function TextActions() {
  const [editor] = useLexicalComposerContext();

  const [isBold, setIsBold] = useState<boolean>(false);
  const [isItalic, setIsItalic] = useState<boolean>(false);
  const [isUnderline, setIsUnderline] = useState<boolean>(false);
  const [isStrikethrough, setIsStrikethrough] = useState<boolean>(false);
  const [isCode, setIsCode] = useState<boolean>(false);
  const [isHighlight, setIsHighlight] = useState<boolean>(false);
  const [isSubscript, setIsSubscript] = useState<boolean>(false);
  const [isSuperscript, setIsSuperscript] = useState<boolean>(false);

  // Updates the different toggles depending on the selection's formatting
  const $updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      setIsBold(selection.hasFormat("bold"));
      setIsItalic(selection.hasFormat("italic"));
      setIsUnderline(selection.hasFormat("underline"));
      setIsStrikethrough(selection.hasFormat("strikethrough"));
      setIsCode(selection.hasFormat("code"));
      setIsHighlight(selection.hasFormat("highlight"));
      setIsSubscript(selection.hasFormat("subscript"));
      setIsSuperscript(selection.hasFormat("superscript"));
    }
  }, []);

  useEffect(() => {
    return mergeRegister(
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        () => {
          $updateToolbar();
          return false;
        },
        COMMAND_PRIORITY_CRITICAL,
      ),
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          $updateToolbar();
        });
      }),
    );
  }, [editor, $updateToolbar]);

  const textFormats: TextActionType[] = [
    {
      type: "bold",
      icon: () => <FontBoldIcon />,
      setter: setIsBold,
      isSet: isBold,
    },
    {
      type: "italic",
      icon: () => <FontItalicIcon />,
      setter: setIsItalic,
      isSet: isItalic,
    },
    {
      type: "underline",
      icon: () => <UnderlineIcon />,
      setter: setIsUnderline,
      isSet: isUnderline,
    },
    {
      type: "strikethrough",
      icon: () => <StrikethroughIcon />,
      setter: setIsStrikethrough,
      isSet: isStrikethrough,
    },
    {
      type: "code",
      icon: () => <CodeIcon />,
      setter: setIsCode,
      isSet: isCode,
    },
    {
      type: "highlight",
      icon: faHighlighter,
      setter: setIsHighlight,
      isSet: isHighlight,
    },
    {
      type: "subscript",
      icon: faSubscript,
      setter: setIsSubscript,
      isSet: isSubscript,
    },
    {
      type: "superscript",
      icon: faSuperscript,
      setter: setIsSuperscript,
      isSet: isSuperscript,
    },
  ];

  return (
    <div className="flex items-center space-x-1 text-black dark:text-slate-100">
      {textFormats.map((format) => {
        return (
          <Toggle
            key={format.type}
            aria-label={format.type}
            size={"sm"}
            pressed={format.isSet}
            onPressedChange={(
              pressed: boolean | ((prevState: boolean) => boolean),
            ) => {
              editor.dispatchCommand(FORMAT_TEXT_COMMAND, format.type);
              format.setter(pressed);
            }}
            disabled={!editor.isEditable()}
            className="rounded-lg"
          >
            {format.icon instanceof Function ? (
              format.icon()
            ) : (
              <FontAwesomeIcon icon={format.icon} size={"sm"} />
            )}
          </Toggle>
        );
      })}
    </div>
  );
}

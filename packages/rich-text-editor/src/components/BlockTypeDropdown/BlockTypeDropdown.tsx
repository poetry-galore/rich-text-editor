import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  INSERT_ORDERED_LIST_COMMAND,
  REMOVE_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  $isListNode,
  ListNode,
} from "@lexical/list";
import {
  $createHeadingNode,
  $createQuoteNode,
  HeadingTagType,
  $isHeadingNode,
} from "@lexical/rich-text";
import { $setBlocksType } from "@lexical/selection";
import {
  $getSelection,
  $createParagraphNode,
  $isRangeSelection,
  $isRootOrShadowRoot,
  COMMAND_PRIORITY_CRITICAL,
  SELECTION_CHANGE_COMMAND,
} from "lexical";

import {
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  Heading4Icon,
  Heading5Icon,
  Heading6Icon,
  ListIcon,
  ListOrderedIcon,
  TextIcon,
  TextQuoteIcon,
} from "lucide-react";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
} from "@/components/ui/select";

import { blockTypeToBlockName } from "./BlockTypeDropdown.types";
import { $getNearestNodeOfType, mergeRegister } from "@lexical/utils";
import { $findMatchingParent } from "@lexical/utils";
import { useState, useCallback, useEffect } from "react";

/**
 * Toggle block types between headings, lists, quote and normal paragraph.
 */
export default function BlockTypeDropdown() {
  const [editor] = useLexicalComposerContext();

  const [blockType, setBlockType] =
    useState<keyof typeof blockTypeToBlockName>("paragraph");

  const $updateBlockType = useCallback(() => {
    const selection = $getSelection();

    if ($isRangeSelection(selection)) {
      const anchorNode = selection.anchor.getNode();

      let element =
        anchorNode.getKey() === "root"
          ? anchorNode
          : $findMatchingParent(anchorNode, (e) => {
              const parent = e.getParent();
              return parent !== null && $isRootOrShadowRoot(parent);
            });

      if (element === null) {
        element = anchorNode.getTopLevelElementOrThrow();
      }

      const elementDOM = editor.getElementByKey(element.getKey());

      if (elementDOM !== null) {
        if ($isListNode(element)) {
          const parentList = $getNearestNodeOfType<ListNode>(
            anchorNode,
            ListNode,
          );
          const type = parentList
            ? parentList.getListType()
            : element.getListType();
          setBlockType(type);
        } else {
          const type = $isHeadingNode(element)
            ? element.getTag()
            : element.getType();
          if (type in blockTypeToBlockName) {
            setBlockType(type as keyof typeof blockTypeToBlockName);
          }
        }
      }
    }
  }, [editor]);

  useEffect(() => {
    return mergeRegister(
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        () => {
          $updateBlockType();
          return false;
        },
        COMMAND_PRIORITY_CRITICAL,
      ),
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          $updateBlockType();
        });
      }),
    );
  }, [editor, $updateBlockType]);

  const formatHeading = (headingLevel: HeadingTagType) => {
    editor.update(() => {
      const selection = $getSelection();
      $setBlocksType(selection, () => $createHeadingNode(headingLevel));
    });
  };

  const formatParagraph = () => {
    editor.update(() => {
      const selection = $getSelection();
      $setBlocksType(selection, () => $createParagraphNode());
    });
  };

  const formatOrderedList = () => {
    if (blockType !== "number") {
      editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
    } else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
    }
  };

  const formatUnorderedList = () => {
    if (blockType !== "bullet") {
      editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
    } else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
    }
  };

  const formatQuote = () => {
    editor.update(() => {
      const selection = $getSelection();
      $setBlocksType(selection, () => $createQuoteNode());
    });
  };

  const iconClass = "h-4 w-4";

  const icons: Record<keyof typeof blockTypeToBlockName, () => JSX.Element> = {
    h1: () => <Heading1Icon className={iconClass} />,
    h2: () => <Heading2Icon className={iconClass} />,
    h3: () => <Heading3Icon className={iconClass} />,
    h4: () => <Heading4Icon className={iconClass} />,
    h5: () => <Heading5Icon className={iconClass} />,
    h6: () => <Heading6Icon className={iconClass} />,
    paragraph: () => <TextIcon className={iconClass} />,
    number: () => <ListOrderedIcon className={iconClass} />,
    bullet: () => <ListIcon className={iconClass} />,
    quote: () => <TextQuoteIcon className={iconClass} />,
  };

  return (
    <Select
      value={blockType}
      disabled={!editor.isEditable()}
      onValueChange={(value) => {
        switch (value) {
          case "h1":
            formatHeading("h1");
            break;
          case "h2":
            formatHeading("h2");
            break;
          case "h3":
            formatHeading("h3");
            break;
          case "h4":
            formatHeading("h4");
            break;
          case "h5":
            formatHeading("h5");
            break;
          case "h6":
            formatHeading("h6");
            break;
          case "paragraph":
            formatParagraph();
            break;
          case "number":
            formatOrderedList();
            break;
          case "bullet":
            formatUnorderedList();
            break;
          case "quote":
            formatQuote();
            break;
        }
      }}
    >
      <SelectTrigger className="w-40 select-none">
        <SelectValue placeholder="Block Type" />
      </SelectTrigger>

      <SelectContent>
        <SelectGroup>
          {Object.keys(blockTypeToBlockName).map((blockType) => {
            const icon = icons[blockType];
            return (
              <SelectItem key={blockType} value={blockType}>
                <div className="flex items-center space-x-2">
                  {icon()}
                  <p>{blockTypeToBlockName[blockType]}</p>
                </div>
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

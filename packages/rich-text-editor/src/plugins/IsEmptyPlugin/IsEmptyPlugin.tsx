import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import {
  ElementNode,
  $isElementNode,
  $isTextNode,
  $isDecoratorNode,
  EditorState,
  $getRoot,
} from "lexical";
import { IsEmptyPluginProps } from "./IsEmptyPlugin.types";

export default function IsEmptyPlugin({ setIsEmpty }: IsEmptyPluginProps) {
  /** Check if the node has whitespace only */
  function $isWhitespace(node: ElementNode): boolean {
    for (const child of node.getChildren()) {
      if (
        ($isElementNode(child) && !$isWhitespace(child)) ||
        ($isTextNode(child) && child.getTextContent().trim() !== "") ||
        $isDecoratorNode(child) // decorator nodes are arbitrary
      ) {
        return false;
      }
    }
    return true;
  }

  function $isEmpty(editorState: EditorState) {
    return editorState.read(() => {
      const root = $getRoot();
      const child = root.getFirstChild();

      if (
        child == null ||
        ($isElementNode(child) &&
          child.isEmpty() &&
          root.getChildrenSize() === 1)
      ) {
        return true;
      }

      return $isWhitespace(root);
    });
  }

  function onChange(editorState: EditorState) {
    setIsEmpty($isEmpty(editorState));
  }

  return (
    <OnChangePlugin
      onChange={onChange}
      ignoreHistoryMergeTagChange={true}
      ignoreSelectionChange={true}
    />
  );
}

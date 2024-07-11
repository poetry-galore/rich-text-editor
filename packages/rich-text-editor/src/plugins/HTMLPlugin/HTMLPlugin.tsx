import { $getRoot, $insertNodes } from "lexical";
import { $generateNodesFromDOM } from "@lexical/html";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

import { HTMLPluginProps } from "./HTMLPlugin.types";

/**
 * Add ability to load editor state from an html string.
 */
export default function HTMLPlugin({
  initialEditorState,
}: HTMLPluginProps): null {
  const [editor] = useLexicalComposerContext();

  if (initialEditorState?.toString().startsWith("<")) {
    editor.update(() => {
      // In the browser you can use the native DOMParser API to parse the HTML string.
      const parser = new DOMParser();
      const dom = parser.parseFromString(
        initialEditorState.toString(),
        "text/html",
      );

      // Once you have the DOM instance it's easy to generate LexicalNodes.
      const nodes = $generateNodesFromDOM(editor, dom);

      // Select the root
      $getRoot().select();

      // Insert them at a selection.
      $insertNodes(nodes);
    });
  }

  return null;
}

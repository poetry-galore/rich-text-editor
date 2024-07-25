import { ElementNode, RootNode } from "lexical";
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
      const nodes = $generateNodesFromDOM(editor, dom) as ElementNode[];

      // RootNode to build the new EditorState from
      const root = new RootNode();
      const rootJSON = root.exportJSON();

      // Get JSON of each node and their children and build the
      // JSON of the EditorState to load from.
      nodes.forEach((node: ElementNode) => {
        const nodeJSON = node.exportJSON();

        node.getChildren().forEach((child) => {
          const childJSON = child.exportJSON();
          nodeJSON.children.push(childJSON);
        });

        rootJSON.children.push(nodeJSON);
      });

      // Create new EditorState and set it in the Editor
      const _rootJSON = { root: rootJSON };
      const parsedEditorState = editor.parseEditorState(
        JSON.stringify(_rootJSON),
      );
      editor.setEditorState(parsedEditorState, { tag: "history-merge" });
    });
  }

  return null;
}

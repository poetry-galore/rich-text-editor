import { $generateHtmlFromNodes } from "@lexical/html";
import {
  $getRoot,
  $isDecoratorNode,
  $isElementNode,
  $isTextNode,
  EditorState,
  ElementNode,
  LexicalEditor,
} from "lexical";

/**
 * Class for utility functions on the editor state.
 *
 * Must be used within the context of a lexical editor
 */
export default class CustomEditorState {
  /** The lexical editor */
  #editor: LexicalEditor;

  /** Editor State */
  #editorState: EditorState;

  constructor(editor: LexicalEditor, editorState: EditorState) {
    this.#editor = editor;
    this.#editorState = editorState;
  }

  /**
   * Get the JSON value of the editor
   *
   * @returns JSON value of the editor state.
   */
  toJSON() {
    return this.#editorState.toJSON();
  }

  /**
   * Get the HTML value of the editor
   *
   * @returns HTML string of the editor state.
   */
  toHTML() {
    let htmlString: string = "";

    this.#editorState.read(() => {
      htmlString = $generateHtmlFromNodes(this.#editor, null);
    });

    return htmlString;
  }

  /**
   * Check if the editor is empty. An editor with whitespace only
   * is taken to be empty.
   *
   * @returns boolean
   */
  isEmpty(): boolean {
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

    function $isEmpty(editorState: EditorState): boolean {
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

    return $isEmpty(this.#editorState);
  }
}

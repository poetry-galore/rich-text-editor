import { LexicalEditor } from "lexical";

export type FloatingMenuCoords = { x: number; y: number } | undefined;

export type FloatingMenuProps = {
  editor: LexicalEditor;
  coords: FloatingMenuCoords;
};

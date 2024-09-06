import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect } from "react";
import { useEditableContext } from "../../contexts/EditableContext";

/**
 * Updates whether the editor is editable depending on the EditableContext value
 */
export default function EditablePlugin() {
  const [editor] = useLexicalComposerContext();

  const { editable } = useEditableContext();

  useEffect(() => {
    editor.update(() => editor.setEditable(editable));
  }, [editable, editor]);

  return null;
}

import { InitialEditorStateType } from "@lexical/react/LexicalComposer";
import { CustomOnChangePluginProps } from "./plugins/CustomOnChangePlugin/CustomOnChangePlugin.types";

interface Props {
  /**
   * Text to display before user inputs
   */
  placeholderText?: string;
  /**
   * Is the editor content editable?
   */
  editable?: boolean;
  /**
   * Initial state of the editor
   */
  initialEditorState?: InitialEditorStateType;
  /**
   * List of callbacks triggered when the editor undergoes an update.
   *
   * If you want to get the json value of the editor contents,
   * use `setEditorState` prop instead of this.
   *
   * @param customEditorState Custom Editor state
   * @param editorState Current state of the editor
   * @param editor The lexical editor
   * @param tags
   */
  onEditorChange?: CustomOnChangePluginProps[];
}

export type RichTextEditorProps = React.PropsWithChildren<Props> &
  React.AllHTMLAttributes<HTMLDivElement>;

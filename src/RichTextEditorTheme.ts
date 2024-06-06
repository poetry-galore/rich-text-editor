import { EditorThemeClasses } from "lexical";

const RichTextEditorTheme: EditorThemeClasses = {
  text: {
    italic: "italic",
    bold: "font-bold",
    underline: "underline",
    strikethrough: "line-through",
    code: "bg-slate-200 py-1 px-0.5 font-mono text-[90%] rounded-md",
    highlight: "rounded-md p-0.5",
    subscript: "",
    superscript: "",
  },
};

export default RichTextEditorTheme;

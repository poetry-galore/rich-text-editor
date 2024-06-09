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
  heading: {
    h1: "text-4xl",
    h2: "text-3xl",
    h3: "text-2xl",
    h4: "text-xl",
    h5: "text-lg",
    h6: "text-lg",
  },
  list: {
    ul: "list-disc list-inside leading-relaxed",
    ol: "list-decimal list-inside leading-relaxed",
  },
  quote: "ms-8 my-2 p-2 border-l-4 border-slate-200 text-slate-600",
};

export default RichTextEditorTheme;

import { useMemo } from "react";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { ListItemNode, ListNode } from "@lexical/list";
import { EditorState } from "lexical";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";

import { RichTextEditorProps } from "./RichTextEditor.types";
import RichTextEditorTheme from "./RichTextEditorTheme";
import "./RichTextEditor.css";

// Custom plugins
import ToolbarPlugin from "./plugins/ToolbarPlugin";

// Catch any errors that occur during Lexical updates and log them
// or throw them as needed. If you don't throw them, Lexical will
// try to recover gracefully without losing user data.
function onError(error: Error) {
  console.error(error);
}

/**
 * Rich text editor built using Lexical.
 */
function RichTextEditor({
  placeholderText = "Start your poem...",
  editable = true,
  initialEditorState,
  onEditorChange,
  setEditorState,
  children,
  ...rest
}: RichTextEditorProps) {
  /**
   * Updates the editor state value mapped to the setEditorState function
   * in the parent to the json string of the contents.
   */
  function onChange(editorState: EditorState) {
    const editorStateJSON = editorState.toJSON();
    setEditorState && setEditorState(JSON.stringify(editorStateJSON));
  }

  const customContentEditable = useMemo(() => {
    return (
      <ContentEditable className="w-full min-h-full p-2 focus:outline-none" />
    );
  }, []);

  const customPlaceholder = useMemo(() => {
    return (
      <div className="absolute top-2 left-2 text-slate-500 text-muted-foreground pointer-events-none">
        {placeholderText}
      </div>
    );
  }, [placeholderText]);

  const initialConfig = {
    namespace: "RichTextEditor",
    theme: RichTextEditorTheme,
    onError,
    editable,
    initialEditorState,
    nodes: [HeadingNode, QuoteNode, ListNode, ListItemNode],
  };

  rest.className = rest.className
    ? rest.className
    : "w-full h-full text-black dark:text-slate-100";

  return (
    <div {...rest}>
      <LexicalComposer initialConfig={initialConfig}>
        <div className="relative w-full min-h-full flex flex-col mt-10 border rounded-lg border-slate-400 bg-white dark:bg-slate-900 dark:border-slate-700">
          {/* Toolbar Here */}
          <ToolbarPlugin />
          <div className="relative w-full h-full">
            <RichTextPlugin
              contentEditable={customContentEditable}
              placeholder={customPlaceholder}
              ErrorBoundary={LexicalErrorBoundary}
            />
            <HistoryPlugin />
            <AutoFocusPlugin />
          </div>
        </div>
        {/** Other plugins */}
        <ListPlugin />
        {setEditorState && (
          <OnChangePlugin ignoreSelectionChange={true} onChange={onChange} />
        )}
        {onEditorChange &&
          onEditorChange.map((item, index) => (
            <OnChangePlugin
              key={index}
              onChange={item.onChange}
              ignoreSelectionChange={item.ignoreSelectionChange}
              ignoreHistoryMergeTagChange={item.ignoreHistoryMergeTagChange}
            />
          ))}
        {children}
      </LexicalComposer>
    </div>
  );
}

export default RichTextEditor;

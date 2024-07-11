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

import { RichTextEditorProps } from "./RichTextEditor.types";
import RichTextEditorTheme from "./RichTextEditorTheme";
import "./RichTextEditor.css";

import { cn } from "./lib/utils";

// Custom plugins
import CustomOnChangePlugin from "./plugins/CustomOnChangePlugin";
import ToolbarPlugin from "./plugins/ToolbarPlugin";
import HTMLPlugin from "./plugins/HTMLPlugin";

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
  children,
  ...rest
}: RichTextEditorProps) {
  const customContentEditable = useMemo(() => {
    return (
      <ContentEditable className="w-full min-h-[200px] p-2 focus:outline-none" />
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

  rest.className = cn(
    "max-w-4xl h-full text-black dark:text-slate-100 rounded-xl bg-inherit dark:bg-inherit",
    rest.className,
  );

  return (
    <div {...rest}>
      <LexicalComposer initialConfig={initialConfig}>
        <div className="relative w-full min-h-full flex flex-col font-normal leading-5 rounded-xl bg-inherit dark:bg-inherit">
          {/* Toolbar Here */}
          <ToolbarPlugin />
          <div className="relative w-full">
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
        {onEditorChange &&
          onEditorChange.map((item, index) => (
            <CustomOnChangePlugin
              key={index}
              onChange={item.onChange}
              ignoreSelectionChange={item.ignoreSelectionChange}
              ignoreHistoryMergeTagChange={item.ignoreHistoryMergeTagChange}
            />
          ))}
        {initialEditorState && (
          <HTMLPlugin initialEditorState={initialEditorState} />
        )}
        {children}
      </LexicalComposer>
    </div>
  );
}

export default RichTextEditor;

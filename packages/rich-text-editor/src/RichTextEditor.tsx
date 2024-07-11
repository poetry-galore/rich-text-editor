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
import { EditorState, LexicalEditor } from "lexical";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { $generateHtmlFromNodes } from "@lexical/html";

import { RichTextEditorProps } from "./RichTextEditor.types";
import RichTextEditorTheme from "./RichTextEditorTheme";
import "./RichTextEditor.css";

import { cn } from "./lib/utils";

// Custom plugins
import ToolbarPlugin from "./plugins/ToolbarPlugin";
import HTMLPlugin from "./plugins/HTMLPlugin";
import IsEmptyPlugin from "./plugins/IsEmptyPlugin";

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
  setEditorStateJSON,
  setEditorStateHTML,
  setIsEmpty,
  children,
  ...rest
}: RichTextEditorProps) {
  /**
   * Updates the editor state values mapped to the setEditorStateJSON and
   * setEditorStateHTML functions in the parent to the json and html
   * string of the contents respectively.
   */
  function onChange(editorState: EditorState, editor: LexicalEditor) {
    const editorStateJSON = editorState.toJSON();

    // Set the JSON string
    setEditorStateJSON && setEditorStateJSON(JSON.stringify(editorStateJSON));

    // Set the HTML string
    if (setEditorStateHTML) {
      editorState.read(() => {
        const htmlString = $generateHtmlFromNodes(editor, null);
        setEditorStateHTML(htmlString);
      });
    }
  }

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
        {(setEditorStateJSON || setEditorStateHTML) && (
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
        {initialEditorState && (
          <HTMLPlugin initialEditorState={initialEditorState} />
        )}
        {setIsEmpty && <IsEmptyPlugin setIsEmpty={setIsEmpty} />}
        {children}
      </LexicalComposer>
    </div>
  );
}

export default RichTextEditor;

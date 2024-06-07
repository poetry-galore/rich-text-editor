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
    editorState,
    children,
    ...rest
}: RichTextEditorProps) {
    const customContentEditable = useMemo(() => {
        return (
            <ContentEditable className="relative min-h-full p-2 text-slate-800 focus:outline-none" />
        );
    }, []);

    const customPlaceholder = useMemo(() => {
        return (
            <div className="absolute top-2 left-2 text-slate-600 text-muted-foreground pointer-events-none">
                {placeholderText}
            </div>
        );
    }, [placeholderText]);

    const initialConfig = {
        namespace: "RichTextEditor",
        theme: RichTextEditorTheme,
        onError,
        editable,
        editorState,
        nodes: [HeadingNode, QuoteNode, ListNode, ListItemNode],
    };

    rest.className = rest.className ? rest.className : "w-full h-full";

    return (
        <div {...rest}>
            <LexicalComposer initialConfig={initialConfig}>
                <div className="mx-auto relative bg-slate-50  flex flex-col mt-10 shadow-sm border rounded-lg w-full min-h-full">
                    {/* Toolbar Here */}
                    <ToolbarPlugin />
                    <div className="relative min-h-full min-w-full">
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
                {children}
            </LexicalComposer>
        </div>
    );
}

export default RichTextEditor;

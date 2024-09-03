import { ListItemNode, ListNode } from "@lexical/list";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import {
  InitialConfigType,
  LexicalComposer,
} from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { useEffect, useMemo } from "react";

import "./RichTextEditor.css";
import { RichTextEditorProps } from "./RichTextEditor.types";
import RichTextEditorTheme from "./RichTextEditorTheme";

import { cn } from "./lib/utils";

// Custom plugins
import { Config } from "@/config";
import CustomOnChangePlugin from "./plugins/CustomOnChangePlugin";
import FloatingMenuPlugin from "./plugins/FloatingMenuPlugin";
import HTMLPlugin from "./plugins/HTMLPlugin";
import ToolbarPlugin from "./plugins/ToolbarPlugin";

// Contexts
import {
  ConfigContextProvider,
  useConfigContext,
} from "./contexts/ConfigContext";

// Catch any errors that occur during Lexical updates and log them
// or throw them as needed. If you don't throw them, Lexical will
// try to recover gracefully without losing user data.
function onError(error: Error) {
  console.error(error);
}

/**
 * Rich text editor built using Lexical.
 */
export function RichTextEditor({
  placeholderText = "Start your poem...",
  editable = true,
  initialEditorState,
  onEditorChange,
  configInstance,
  configName,
  children,
  ...rest
}: RichTextEditorProps) {
  const {
    configName: _configName,
    setConfigName,
    configType,
    setConfigType,
    configInst,
    setConfigInst,
  } = useConfigContext();

  useEffect(() => {
    if (configInstance && configInstance instanceof Config)
      setConfigInst(configInstance);

    typeof configName === "string" && setConfigName(configName);

    if (configName && configType === "default") setConfigType("merged");
    else if (!configName) {
      setConfigType("default");
    }
  }, [configName, configType, configInstance]);

  const showToolbar = configInst.pluginIsRegistered(
    "toolbar",
    _configName,
    configType,
  );

  const showFloatingMenu = configInst.pluginIsRegistered(
    "floatingMenu",
    _configName,
    configType,
  );

  const customContentEditable = useMemo(() => {
    return (
      <ContentEditable
        className={cn(
          "w-full min-h-[200px] p-2 focus:outline-none",
          !showToolbar && "min-h-full",
        )}
      />
    );
  }, []);

  const customPlaceholder = useMemo(() => {
    return (
      <div className="absolute top-2 left-2 text-slate-500 text-muted-foreground pointer-events-none">
        {placeholderText}
      </div>
    );
  }, [placeholderText]);

  /**
   * Check if the initialEditorState is valid HTML so as to use the {@link HTMLPlugin}
   * and avoid setting editorState in the {@link initialConfig}
   */
  const initialEditorStateIsHTML =
    typeof initialEditorState === "string" &&
    /(?:<[/][^<]+>)|(?:<[^<]+[/]>)/.test(initialEditorState);

  if (!initialEditorStateIsHTML) {
    // Check if the initialEditorState is valid JSON
    initialEditorState &&
      typeof initialEditorState === "string" &&
      JSON.parse(initialEditorState);
  }

  const initialConfig: InitialConfigType = {
    namespace: "RichTextEditor",
    theme: RichTextEditorTheme,
    onError,
    editable,
    editorState: initialEditorStateIsHTML ? null : initialEditorState,
    nodes: [HeadingNode, QuoteNode, ListNode, ListItemNode],
  };

  rest.className = cn(
    "max-w-4xl h-full text-black dark:text-slate-100 rounded-xl bg-inherit dark:bg-inherit",
    rest.className,
  );

  return (
    <div {...rest}>
      <LexicalComposer initialConfig={initialConfig}>
        <div
          className={cn(
            "relative w-full min-h-full flex flex-col font-normal leading-5 rounded-xl bg-inherit dark:bg-inherit",
            !showToolbar && "h-full",
          )}
        >
          {/* Toolbar Here */}
          {showToolbar && <ToolbarPlugin />}
          <div className="relative w-full min-h-full">
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
        {initialEditorStateIsHTML && initialEditorState && (
          <HTMLPlugin initialEditorState={initialEditorState} />
        )}
        {showFloatingMenu && <FloatingMenuPlugin />}
        {children}
      </LexicalComposer>
    </div>
  );
}

/**
 * RichTextEditor with ConfigProvider
 */
export function RTE(props: RichTextEditorProps) {
  return (
    <ConfigContextProvider>
      <RichTextEditor {...props} />
    </ConfigContextProvider>
  );
}

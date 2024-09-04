import BlockTypeDropdown from "@/components/BlockTypeDropdown";
import HistoryActions from "@/components/HistoryActions";
import TextActions from "@/components/TextActions";

import { useConfig } from "@/hooks/useConfig";

/**
 * Contains all actions that can be done on the editor.
 */
function ToolbarPlugin() {
  const textActionsConfig = useConfig("plugins.toolbar.textActions");
  const historyActionsConfig = useConfig("plugins.toolbar.historyActions");
  const blockTypesConfig = useConfig("plugins.toolbar.blockTypes");

  return (
    <>
      <div className="sticky top-1 z-10 flex justify-center space-x-2 m-1 mx-auto py-1 px-2 text-black rounded-xl bg-white/60 shadow-sm backdrop-blur-sm shadow-slate-500 dark:text-slate-100 dark:bg-slate-900/60">
        <HistoryActions config={historyActionsConfig} separator={true} />
        <BlockTypeDropdown config={blockTypesConfig} separator={true} />
        <TextActions config={textActionsConfig} />
      </div>
    </>
  );
}

export default ToolbarPlugin;

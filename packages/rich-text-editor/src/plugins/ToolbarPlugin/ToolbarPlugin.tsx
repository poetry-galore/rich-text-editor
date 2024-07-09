import HistoryActions from "@/components/HistoryActions";
import TextActions from "@/components/TextActions";
import BlockTypeDropdown from "@/components/BlockTypeDropdown";

import { Separator } from "@/components/ui/separator";

/**
 * Contains all actions that can be done on the editor.
 */
function ToolbarPlugin() {
  return (
    <>
      <div className="sticky top-1 z-10 flex justify-center space-x-2 m-1 mx-auto py-1 px-2 text-black rounded-xl bg-white/60 shadow-sm backdrop-blur-sm shadow-slate-500 dark:text-slate-100 dark:bg-slate-900/60">
        <HistoryActions />
        <Separator
          orientation="vertical"
          className="h-auto my-1 bg-slate-300"
        />
        <BlockTypeDropdown />
        <Separator
          orientation="vertical"
          className="h-auto my-1 bg-slate-300"
        />
        <TextActions />
      </div>
    </>
  );
}

export default ToolbarPlugin;

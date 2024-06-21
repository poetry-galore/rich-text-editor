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
      <div className="sticky top-1 z-10 flex justify-center space-x-2 w-full mx-auto py-1 px-2 text-black bg-white border-b border-slate-400 rounded-lg rounded-b-none dark:text-slate-100 dark:bg-slate-900 dark:border-slate-700">
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

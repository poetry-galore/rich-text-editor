import HistoryActions from "@/components/HistoryActions";
import TextActions from "@/components/TextActions";

import { Separator } from "@/components/ui/separator";

/**
 * Contains all actions that can be done on the editor.
 */
function ToolbarPlugin() {
    return <>
        <div className="sticky top-0 z-10 flex justify-center space-x-2 border-b w-full py-1 bg-white dark:bg-slate-500 rounded-lg">
            <HistoryActions />
            <Separator orientation="vertical" className="h-auto my-1 bg-slate-300" />
            <TextActions />
        </div>
    </>
}

export default ToolbarPlugin;
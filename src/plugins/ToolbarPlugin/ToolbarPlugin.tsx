import HistoryActions from "@/components/HistoryActions";

/**
 * Contains all actions that can be done on the editor.
 */
function ToolbarPlugin() {
    return <>
        <div className="sticky top-0 z-10 flex justify-center space-x-2 border-b w-full">
            <HistoryActions />
        </div>
    </>
}

export default ToolbarPlugin;
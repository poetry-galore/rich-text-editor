import { useEffect, useMemo, useState } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { mergeRegister } from "@lexical/utils";
import {
  UNDO_COMMAND,
  REDO_COMMAND,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  COMMAND_PRIORITY_CRITICAL,
} from "lexical";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUndoAlt, faRedoAlt } from "@fortawesome/free-solid-svg-icons";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { HistoryActionsProps } from "./HistoryActions.types";

/**
 * Undo and Redo actions.
 */
export const HistoryActions = ({ config, separator }: HistoryActionsProps) => {
  const memoizedConfig: typeof config = useMemo(() => {
    return config ? config : ["undo", "redo"];
  }, [config]);

  const [editor] = useLexicalComposerContext();

  const [canUndo, setCanUndo] = useState<boolean>(false);
  const [canRedo, setCanRedo] = useState<boolean>(false);

  useEffect(() => {
    return mergeRegister(
      editor.registerCommand(
        CAN_UNDO_COMMAND,
        (payload) => {
          setCanUndo(payload);
          return false;
        },
        COMMAND_PRIORITY_CRITICAL,
      ),
      editor.registerCommand(
        CAN_REDO_COMMAND,
        (payload) => {
          setCanRedo(payload);
          return false;
        },
        COMMAND_PRIORITY_CRITICAL,
      ),
    );
  }, [editor]);

  return (
    <>
      <div>
        {memoizedConfig.includes("undo") && (
          <Button
            onClick={() => editor.dispatchCommand(UNDO_COMMAND, undefined)}
            size={"sm"}
            className="size-8"
            disabled={!canUndo}
            variant="ghost"
          >
            <FontAwesomeIcon icon={faUndoAlt} />
          </Button>
        )}
        {memoizedConfig.includes("redo") && (
          <Button
            onClick={() => editor.dispatchCommand(REDO_COMMAND, undefined)}
            size={"sm"}
            className="size-8"
            disabled={!canRedo}
            variant="ghost"
          >
            <FontAwesomeIcon icon={faRedoAlt} />
          </Button>
        )}
      </div>

      {separator && memoizedConfig.length > 0 && (
        <Separator
          orientation="vertical"
          className="h-auto my-1 bg-slate-300"
        />
      )}
    </>
  );
};

export default HistoryActions;

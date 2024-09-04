import { forwardRef } from "react";

import { useConfig } from "@/hooks/useConfig";
import TextActions from "../TextActions";
import { FloatingMenuProps } from "./FloatingMenu.types";

export const FloatingMenu = forwardRef<HTMLDivElement, FloatingMenuProps>(
  function FloatingMenu(props, ref) {
    const { coords } = props;

    const textActionsConfig = useConfig("plugins.floatingMenu.textActions");
    const shouldShow = coords !== undefined;

    return (
      <div
        ref={ref}
        aria-hidden={!shouldShow}
        className="absolute flex items-center justify-between py-1 px-2 text-black rounded-xl bg-white/60 shadow-sm backdrop-blur-sm shadow-slate-500 dark:text-slate-100 dark:bg-slate-900/60"
        style={{
          top: coords?.y,
          left: coords?.x,
          visibility: shouldShow ? "visible" : "hidden",
          opacity: shouldShow ? 1 : 0,
        }}
      >
        <TextActions config={textActionsConfig} />
      </div>
    );
  },
);

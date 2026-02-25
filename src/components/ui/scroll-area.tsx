import * as React from "react";
import { ScrollArea as ScrollAreaPrimitive } from "@base-ui/react/scroll-area";
import { cn } from "@/lib/utils";

interface ScrollAreaProps extends ScrollAreaPrimitive.Root.Props {
    onScroll?: React.UIEventHandler<HTMLDivElement>;
    scrollAreaPrimitiveClass?: string; // custom class for viewport
    scrollBarClass?: string; // custom class for scrollbar
}

function ScrollArea({
    className,
    children,
    onScroll,
    scrollAreaPrimitiveClass,
    scrollBarClass,
    ...props
}: ScrollAreaProps) {
    return (
        <ScrollAreaPrimitive.Root
            data-slot="scroll-area"
            className={cn("relative", className)}
            {...props}
        >
            <ScrollAreaPrimitive.Viewport
                data-slot="scroll-area-viewport"
                className={cn(
                    "focus-visible:ring-ring/50 size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:outline-1",
                    scrollAreaPrimitiveClass
                )}
                onScroll={onScroll}
            >
                {children}
            </ScrollAreaPrimitive.Viewport>

            <ScrollBar className={scrollBarClass} />
            <ScrollAreaPrimitive.Corner />
        </ScrollAreaPrimitive.Root>
    );
}

interface ScrollBarProps extends ScrollAreaPrimitive.Scrollbar.Props {
    className?: string;
    orientation?: "vertical" | "horizontal";
}

function ScrollBar({ className, orientation = "vertical", ...props }: ScrollBarProps) {
    return (
        <ScrollAreaPrimitive.Scrollbar
            data-slot="scroll-area-scrollbar"
            data-orientation={orientation}
            orientation={orientation}
            className={cn(
                "data-horizontal:h-2.5 data-horizontal:flex-col data-horizontal:border-t data-horizontal:border-t-transparent " +
                    "data-vertical:h-full data-vertical:w-2.5 data-vertical:border-l data-vertical:border-l-transparent " +
                    "flex touch-none p-px transition-colors select-none",
                className
            )}
            {...props}
        >
            <ScrollAreaPrimitive.Thumb
                data-slot="scroll-area-thumb"
                className="rounded-none bg-border relative flex-1"
            />
        </ScrollAreaPrimitive.Scrollbar>
    );
}

export { ScrollArea, ScrollBar };

import { LucideIcon } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const iconWrapperVariants = cva(
    "inline-flex items-center justify-center rounded-md shrink-0 transition-all cursor-default",
    {
        variants: {
            variant: {
                default: "text-muted-foreground",
                active: "bg-primary text-white shadow-sm",
                primary: "bg-primary/10 text-primary hover:bg-primary/20",
                secondary: "text-secondary-foreground",
                outline:
                    "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
                ghost: "hover:bg-accent hover:text-accent-foreground",
                destructive: "bg-destructive/10 text-destructive hover:bg-destructive/20",
                // 1. ADD THIS INHERIT VARIANT
                inherit: "text-inherit"
            },
            size: {
                xs: "p-0.5",
                sm: "p-1",
                md: "p-1.5",
                lg: "p-2"
            }
        },
        defaultVariants: {
            variant: "default",
            size: "sm"
        }
    }
);

type IconSize = "xs" | "sm" | "md" | "lg";

interface IconWrapperProps extends VariantProps<typeof iconWrapperVariants> {
    icon: LucideIcon;
    className?: string;
    iconClassName?: string;
    strokeWidth?: number;
    size?: IconSize;
}

const IconWrapper = ({
    icon: Icon,
    variant,
    size = "sm",
    className,
    iconClassName,
    strokeWidth = 2,
    ...props
}: IconWrapperProps) => {
    const iconSizes: Record<IconSize, number> = {
        xs: 12,
        sm: 16,
        md: 18,
        lg: 22
    };

    const iconSize = iconSizes[size];

    return (
        <div className={cn(iconWrapperVariants({ variant, size, className }))} {...props}>
            <Icon
                size={iconSize}
                strokeWidth={strokeWidth}
                className={cn("shrink-0", iconClassName)}
            />
        </div>
    );
};

export { IconWrapper };

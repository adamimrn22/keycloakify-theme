import { CheckCircle2Icon, AlertTriangleIcon, XCircleIcon, InfoIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";
import { cn } from "@/lib/utils";

export type AlertType = "success" | "error" | "warning" | "info";

interface AlertMessageProps {
    type: AlertType;
    title?: string;
    message: string;
    className?: string;
}

const alertConfig = {
    success: {
        icon: CheckCircle2Icon,
        classes:
            "border-green-500/50 text-green-700 dark:border-green-500/30 dark:text-green-400",
        defaultTitle: "Success"
    },
    error: {
        icon: XCircleIcon,
        classes: "border-destructive/50 text-destructive dark:border-destructive",
        defaultTitle: "Error"
    },
    warning: {
        icon: AlertTriangleIcon,
        classes:
            "border-amber-500/50 text-amber-700 dark:border-amber-500/30 dark:text-amber-400",
        defaultTitle: "Warning"
    },
    info: {
        icon: InfoIcon,
        classes:
            "border-blue-500/50 text-blue-700 dark:border-blue-500/30 dark:text-blue-400",
        defaultTitle: "Information"
    }
};

export function AlertMessage({ type, title, message, className }: AlertMessageProps) {
    const { icon: Icon, classes, defaultTitle } = alertConfig[type];

    return (
        <Alert className={cn(classes, className)}>
            <Icon className="h-4 w-4" />
            <AlertTitle>{title || defaultTitle}</AlertTitle>
            <AlertDescription>{message}</AlertDescription>
        </Alert>
    );
}

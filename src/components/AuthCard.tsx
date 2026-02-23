import React from "react";
import { FieldGroup } from "../components/ui/field";

interface AuthCardProps extends React.ComponentProps<"div"> {}

export const AuthCard: React.FC<AuthCardProps> = ({ children, className, ...props }) => {
    return (
        <FieldGroup
            className={`w-full max-w-md p-8 border border-border bg-card text-card-foreground shadow-sm ${className}`}
            {...props}
        >
            {children}
        </FieldGroup>
    );
};

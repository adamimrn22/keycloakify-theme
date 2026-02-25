import React from "react";
import { FieldGroup } from "../components/ui/field";

interface AuthCardProps extends React.ComponentProps<"div"> {}

export const AuthCard: React.FC<AuthCardProps> = ({ children, className, ...props }) => {
    return (
        <FieldGroup
            className={`
          w-full
          max-w-md 
          p-6 sm:p-8  
          backdrop-blur
          shadow-xl
          border border-border  
          ${className}
        `}
            {...props}
        >
            {children}
        </FieldGroup>
    );
};

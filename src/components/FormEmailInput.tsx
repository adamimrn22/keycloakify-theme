import React from "react";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput
} from "@/components/ui/input-group";

import { IconWrapper } from "./ui/icon-wrapper";
import { MailIcon } from "lucide-react";

interface FormTextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    name: string;
    error?: string;
}

export function FormEmailInput({ label, name, error, ...props }: FormTextInputProps) {
    return (
        <Field className="mb-4">
            <FieldGroup className="gap-2">
                <FieldLabel htmlFor={name}>{label}</FieldLabel>
                <InputGroup className="mb-0">
                    <InputGroupAddon>
                        <IconWrapper icon={MailIcon} size="md" strokeWidth={2.5} />
                    </InputGroupAddon>
                    <InputGroupInput
                        id={name}
                        type="email"
                        name={name}
                        {...props}
                        className={`  ${error ? "border-destructive" : "border-border"}`}
                    />
                </InputGroup>
                {error && (
                    <FieldError className="text-xs text-destructive">{error}</FieldError>
                )}
            </FieldGroup>
        </Field>
    );
}

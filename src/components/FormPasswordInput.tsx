import React, { useState } from "react";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput
} from "@/components/ui/input-group";
import { IconWrapper } from "./ui/icon-wrapper";

import { LockIcon, EyeIcon, EyeClosedIcon } from "lucide-react";

interface FormPasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    name: string;
    error?: string;
}

export function FormPasswordInput({
    label,
    name,
    error,
    ...props
}: FormPasswordInputProps) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <Field className="mb-4">
            <FieldGroup className="gap-2">
                <FieldLabel htmlFor={name}>{label}</FieldLabel>
                <InputGroup>
                    <InputGroupAddon>
                        <IconWrapper icon={LockIcon} size="md" strokeWidth={2.5} />
                    </InputGroupAddon>

                    <InputGroupInput
                        id={name}
                        name={name}
                        autoComplete="off"
                        type={showPassword ? "text" : "password"}
                        className={`${error ? "border-destructive" : "border-border"}`}
                        {...props}
                    />

                    <InputGroupAddon align="inline-end">
                        <button
                            type="button"
                            className="rounded-md p-1 text-muted-foreground transition hover:text-foreground"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            <IconWrapper
                                icon={showPassword ? EyeIcon : EyeClosedIcon}
                                size="md"
                                strokeWidth={2.5}
                            />
                        </button>
                    </InputGroupAddon>
                </InputGroup>
                {error && (
                    <FieldError className="text-xs text-destructive">{error}</FieldError>
                )}
            </FieldGroup>
        </Field>
    );
}

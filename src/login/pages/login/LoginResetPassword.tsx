import React, { useState } from "react";
import { PageProps } from "../../types";
import { AlertMessage } from "@/components/AlertMessage";
import { FormEmailInput } from "@/components/FormEmailInput";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const ResetPassword = (props: PageProps<"login-reset-password.ftl">) => {
    const { i18n, Template, kcContext } = props;

    const { url, messagesPerField, message } = kcContext;

    const [email, setEmail] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const isDisabled = email.trim().length === 0 || isSubmitting;

    const { msg, msgStr } = i18n;
    return (
        <Template i18n={i18n} kcContext={kcContext} displayMessage={false}>
            <h1 className="text-2xl font-semibold text-foreground">Forgot Password</h1>

            {message && message.type === "success" && (
                <AlertMessage
                    type="success"
                    title="Success"
                    message={kcContext.message.summary}
                    className="my-2"
                />
            )}

            <p className="text-sm text-muted-foreground">
                Enter your email address and we'll send you a link to reset your password.
            </p>

            <form
                id="kc-reset-password-form"
                action={url.loginAction}
                method="post"
                onSubmit={() => {
                    setIsSubmitting(true);
                    return true;
                }}
            >
                <FormEmailInput
                    name="username"
                    label="Email Address"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setEmail(e.target.value)
                    }
                    error={messagesPerField.getFirstError("username")}
                />

                <Button
                    type="submit"
                    disabled={isDisabled}
                    className="w-full bg-primary text-white hover:bg-primary/90 p-1 text-sm mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? "Submitting..." : "Reset Password"}
                </Button>
            </form>

            <a
                className="hover:cursor-pointer hover:text-primary hover:underline transition-colors w-full text-xs text-end "
                href={url.loginUrl}
            >
                Back To Login
            </a>
        </Template>
    );
};

export default ResetPassword;

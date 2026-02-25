import React, { useState } from "react";
import { PageProps } from "../../types";
import { AlertMessage } from "@/components/AlertMessage";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FormPasswordInput } from "@/components/FormPasswordInput";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const LoginUpdatePassword = (props: PageProps<"login-update-password.ftl">) => {
    const { i18n, Template, kcContext } = props;
    const { url, messagesPerField, message, isAppInitiatedAction } = kcContext;

    const [loading, setLoading] = useState(false);
    const { msg } = i18n;

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const passwordsMatch = password === confirmPassword;
    const isDisabled = !password || !confirmPassword || !passwordsMatch || isSubmitting;

    return (
        <Template i18n={i18n} kcContext={kcContext} displayMessage={false}>
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">
                {msg("updatePasswordTitle")}
            </h1>
            <p className="text-sm text-muted-foreground">
                {msg("updatePasswordMessage")}
            </p>

            {message && message.type === "success" && (
                <AlertMessage
                    type="success"
                    title="Success"
                    message={message.summary}
                    className="my-2"
                />
            )}

            <form
                id="kc-passwd-update-form"
                action={url.loginAction}
                method="post"
                onSubmit={() => {
                    setIsSubmitting(true);
                    return true;
                }}
            >
                {/* New Password */}
                <FormPasswordInput
                    name="password-new"
                    label="New Password"
                    placeholder="Enter your new password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    error={messagesPerField.get("password-new")}
                />

                {/* Confirm Password */}
                <FormPasswordInput
                    name="password-confirm"
                    label="Confirm New Password"
                    placeholder="Confirm your new password"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    error={messagesPerField.get("password-confirm")}
                />

                {/* Logout sessions */}
                <div className="my-3 flex items-center space-x-2">
                    <Checkbox
                        id="logout-sessions"
                        name="logout-sessions"
                        value="on"
                        defaultChecked
                    />

                    <Label
                        htmlFor="logout-sessions"
                        className="text-xs text-muted-foreground cursor-pointer"
                    >
                        {msg("logoutOtherSessions")}
                    </Label>
                </div>

                <Button
                    type="submit"
                    disabled={isDisabled}
                    className="w-full bg-primary text-white hover:bg-primary/90 p-1 text-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:cursor-wait"
                >
                    {isSubmitting ? "Resetting Password..." : "Update Password"}
                </Button>
            </form>

            {isAppInitiatedAction && (
                <form action={url.loginAction} method="post">
                    <Button
                        variant="ghost"
                        type="submit"
                        name="cancel-aia"
                        value="true"
                        className="w-full  text-muted-foreground"
                    >
                        {msg("doCancel")}
                    </Button>
                </form>
            )}
        </Template>
    );
};

export default LoginUpdatePassword;

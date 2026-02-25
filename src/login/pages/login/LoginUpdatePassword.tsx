import React, { useState } from "react";
import { PageProps } from "../../types";
import { AlertMessage } from "@/components/AlertMessage";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FormPasswordInput } from "@/components/FormPasswordInput";

const LoginUpdatePassword = (props: PageProps<"login-update-password.ftl">) => {
    const { i18n, Template, kcContext } = props;
    const { url, messagesPerField, message, isAppInitiatedAction } = kcContext;

    const [loading, setLoading] = useState(false);
    const { msg } = i18n;

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
                onSubmit={() => setLoading(true)}
            >
                {/* New Password */}
                <FormPasswordInput
                    name="password-new"
                    label={"New Password"}
                    placeholder={"Enter your new password"}
                    error={messagesPerField.get("password-new")}
                />

                {/* Confirm Password */}
                <FormPasswordInput
                    name="password-confirm"
                    label="Confirm New Password"
                    placeholder="Confirm your new password"
                    error={messagesPerField.get("password-confirm")}
                />

                {/* Logout sessions */}
                <div className="my-3">
                    <label className="flex items-center space-x-2 text-xs text-muted-foreground">
                        <input
                            type="checkbox"
                            id="logout-sessions"
                            name="logout-sessions"
                            value="on"
                            defaultChecked
                        />
                        <span>{msg("logoutOtherSessions")}</span>
                    </label>
                </div>

                <Button
                    type="submit"
                    disabled={loading}
                    className={cn(
                        "w-full bg-primary text-white hover:bg-primary/90 p-1 text-sm",
                        loading && "cursor-wait"
                    )}
                >
                    {loading ? "Resetting Password..." : msg("doSubmit")}
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

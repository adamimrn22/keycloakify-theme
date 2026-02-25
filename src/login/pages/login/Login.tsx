import { useState } from "react";
import { FormEmailInput } from "@/components/FormEmailInput";
import { PageProps } from "../../types";
import { FormPasswordInput } from "@/components/FormPasswordInput";

import { AlertMessage } from "@/components/AlertMessage";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const Login = (props: PageProps<"login.ftl">) => {
    const { i18n, Template, kcContext } = props;
    const [loading, setLoading] = useState(false);

    const { url, login, realm, usernameHidden, messagesPerField, message } = kcContext;
    const { loginWithEmailAllowed, resetPasswordAllowed, rememberMe } = realm;
    const { msg, msgStr } = i18n;

    const [username, setUsername] = useState(login?.username ?? "");
    const [password, setPassword] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const isDisabled = !username.trim() || !password.trim() || isSubmitting;

    return (
        <Template i18n={i18n} kcContext={kcContext} displayMessage={false}>
            <h1 className="text-2xl font-semibold text-foreground">
                Sign in to your account
            </h1>

            <p className="text-sm text-muted-foreground mt-1  ">
                Enter your credentials to access your test projects and reports.
            </p>

            {message && message.type === "success" && (
                <AlertMessage
                    type="success"
                    title="Login Successful"
                    message={message.summary.replace(/<br\s*\/?>/gi, "\n")}
                    className="my-1"
                />
            )}

            {message && message.type === "error" && (
                <AlertMessage
                    type="error"
                    title="Login Failed"
                    message={message.summary.replace(/<br\s*\/?>/gi, "\n")}
                    className="my-1"
                />
            )}

            <form
                id="kc-form-login"
                action={url.loginAction}
                method="post"
                onSubmit={() => {
                    setIsSubmitting(true);
                    return true;
                }}
            >
                <FormEmailInput
                    name="username"
                    label={
                        loginWithEmailAllowed
                            ? msgStr("usernameOrEmail")
                            : "Email Address"
                    }
                    placeholder="name@example.com"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    error={messagesPerField.getFirstError("username")}
                />

                <FormPasswordInput
                    name="password"
                    label="Password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    error={messagesPerField.getFirstError("password")}
                />

                <div className="flex items-center justify-between gap-4 mb-3">
                    <div id="kc-form-options">
                        {realm.rememberMe && !usernameHidden && (
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="rememberMe"
                                    name="rememberMe"
                                    tabIndex={5}
                                    defaultChecked={!!login.rememberMe}
                                />

                                <Label
                                    htmlFor="rememberMe"
                                    className="text-xs font-medium leading-none text-muted-foreground cursor-pointer"
                                >
                                    {msg("rememberMe")}
                                </Label>
                            </div>
                        )}
                    </div>

                    {resetPasswordAllowed && (
                        <a
                            href={url.loginResetCredentialsUrl}
                            className="text-sm text-primary hover:underline transition-colors"
                        >
                            Forgot password?
                        </a>
                    )}
                </div>

                <Button
                    type="submit"
                    variant="default"
                    disabled={isDisabled}
                    className="w-full bg-primary text-white hover:bg-primary/90 p-1 text-sm mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? "Logging in..." : "Sign In"}
                </Button>
            </form>
        </Template>
    );
};

export default Login;

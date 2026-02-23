import React, { useState } from "react";
import { FormEmailInput } from "@/components/FormEmailInput";
import { PageProps } from "../../types";
import { FormPasswordInput } from "@/components/FormPasswordInput";
import { Button } from "@base-ui/react";
import { cn } from "@/lib/utils";
import { AlertMessage } from "@/components/AlertMessage";

const Login = (props: PageProps<"login.ftl">) => {
    const { i18n, Template, kcContext } = props;
    const [loading, setLoading] = useState(false);

    // Destructure necessary objects from kcContext
    const { url, login, realm, messagesPerField, message } = kcContext;
    const { loginWithEmailAllowed, resetPasswordAllowed, registrationAllowed } = realm;
    const { msgStr } = i18n;

    return (
        <Template i18n={i18n} kcContext={kcContext} displayMessage={false}>
            <h1 className="text-2xl font-semibold">Sign in to your account</h1>

            <p className="text-sm text-muted-foreground mt-1  ">
                Enter your credentials to access your test projects and reports.
            </p>

            {message?.type === "success" && (
                <AlertMessage
                    type="success"
                    title="Login Successful"
                    message={message.summary.replace(/<br\s*\/?>/gi, "\n")}
                    className="my-1"
                />
            )}

            {message?.type === "error" && (
                <AlertMessage
                    type="error"
                    title="Login Failed"
                    message={message.summary.replace(/<br\s*\/?>/gi, "\n")}
                    className="my-1"
                />
            )}

            <form
                onSubmit={() => setLoading(true)}
                id="kc-form-login"
                action={url.loginAction}
                method="post"
            >
                <FormEmailInput
                    name="username"
                    label={
                        loginWithEmailAllowed
                            ? msgStr("usernameOrEmail")
                            : msgStr("email")
                    }
                    placeholder="name@example.com"
                    defaultValue={login?.username ?? ""}
                    error={messagesPerField.getFirstError("username")}
                />

                <FormPasswordInput
                    name="password"
                    label="Password"
                    placeholder="Enter your password"
                    // Display the actual Keycloak error text (e.g., "Invalid username or password.")
                    error={messagesPerField.getFirstError("password")}
                />

                {resetPasswordAllowed && (
                    <a
                        href={url.loginResetCredentialsUrl}
                        className="text-sm text-primary hover:underline mb-4 block text-end"
                    >
                        Forgot password?
                    </a>
                )}

                <Button
                    type="submit"
                    className={cn(
                        "w-full cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed bg-primary text-white hover:bg-primary/90 p-1 text-sm",
                        loading && "disabled:cursor-wait"
                    )}
                >
                    {loading ? "Logging in..." : "Sign In"}
                </Button>
            </form>
        </Template>
    );
};

export default Login;

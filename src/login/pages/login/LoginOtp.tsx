import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { PageProps } from "@/login/types";

import { kcSanitize } from "keycloakify/lib/kcSanitize";
import { Fragment, useState } from "react";

const LoginOtp = (props: PageProps<"login-otp.ftl">) => {
    const { i18n, Template, kcContext } = props;
    const { otpLogin, url, messagesPerField } = kcContext;
    const { msg, msgStr } = i18n;

    const [otpValue, setOtpValue] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const isDisabled = otpValue.trim().length === 0 || isSubmitting;
    return (
        <Template i18n={i18n} kcContext={kcContext} displayMessage={false}>
            <h1 className="text-2xl font-semibold text-foreground">
                Sign in to your account
            </h1>

            <p className="text-sm text-muted-foreground mt-1  ">
                Enter your code from your authentication app to access your test projects
                and reports.
            </p>
            <form
                id="kc-otp-login-form"
                action={url.loginAction}
                onSubmit={() => {
                    setIsSubmitting(true);
                    return true;
                }}
                method="post"
            >
                {otpLogin.userOtpCredentials.length > 1 && (
                    <div className="mb-3">
                        <div className="text-sm font-medium text-foreground">
                            Select Authentication Method
                        </div>

                        <ScrollArea className="" scrollAreaPrimitiveClass="py-2">
                            <div className="flex gap-4 pb-4">
                                {otpLogin.userOtpCredentials.map(
                                    (otpCredential, index) => (
                                        <label
                                            key={index}
                                            htmlFor={`kc-otp-credential-${index}`}
                                            className="  relative flex min-w-60 cursor-pointer items-center gap-4  rounded-xl border border-border bg-card  p-4 transition-all duration-200  hover:border-primary/50 hover:bg-accent/10  has-checked:border-primary  has-checked:ring-2 has-checked:ring-primary/20 "
                                        >
                                            <input
                                                id={`kc-otp-credential-${index}`}
                                                type="radio"
                                                name="selectedCredentialId"
                                                value={otpCredential.id}
                                                defaultChecked={
                                                    otpCredential.id ===
                                                    otpLogin.selectedCredentialId
                                                }
                                                className="peer sr-only"
                                            />

                                            {/* Selection Circle */}
                                            <div className="   flex h-5 w-5 shrink-0 items-center justify-center  rounded-full border border-border  peer-checked:border-primary  peer-checked:bg-primary ">
                                                <div className="   h-2 w-2 rounded-full bg-background   opacity-0 peer-checked:opacity-100 " />
                                            </div>

                                            <div className="flex flex-col truncate">
                                                <span className="text-sm font-semibold text-foreground truncate">
                                                    {otpCredential.userLabel}
                                                </span>

                                                <span className="text-xs text-muted-foreground truncate">
                                                    {otpCredential.id}
                                                </span>
                                            </div>
                                        </label>
                                    )
                                )}
                            </div>

                            <ScrollBar orientation="horizontal" />
                        </ScrollArea>
                    </div>
                )}

                <div className="space-y-2 ">
                    <Label htmlFor="totp" className="text-foreground">
                        One-Time Code <span className="text-destructive">*</span>
                    </Label>

                    <Input
                        type="text"
                        id="totp"
                        name="totp"
                        autoComplete="off"
                        placeholder="EBC2131"
                        maxLength={6}
                        className="text-center text-lg tracking-[0.3em] font-medium"
                        aria-invalid={messagesPerField.existsError("totp")}
                        value={otpValue}
                        onChange={e => {
                            const value = e.target.value.replace(/\D/g, "");
                            setOtpValue(value);
                        }}
                    />

                    {messagesPerField.existsError("totp") && (
                        <p
                            id="input-error-otp-code"
                            className="text-sm text-destructive"
                            aria-live="polite"
                            dangerouslySetInnerHTML={{
                                __html: kcSanitize(messagesPerField.get("totp"))
                            }}
                        />
                    )}
                </div>

                <div className="mt-2">
                    <div id="kc-form-options">
                        <div></div>
                    </div>
                    <div id="kc-form-buttons">
                        <Button
                            name="login"
                            id="kc-login"
                            type="submit"
                            value={msgStr("doLogIn")}
                            disabled={isDisabled}
                            className={cn(
                                "w-full text-sm font-medium flex items-center justify-center gap-2",
                                isDisabled && "opacity-50 cursor-not-allowed"
                            )}
                        >
                            Sign In
                        </Button>
                    </div>
                </div>
            </form>
        </Template>
    );
};

export default LoginOtp;

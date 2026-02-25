import { useState } from "react";
import { PageProps } from "../../types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { kcSanitize } from "keycloakify/lib/kcSanitize";

const LoginConfigTotp = (props: PageProps<"login-config-totp.ftl">) => {
    const { Template, kcContext, i18n } = props;

    const { url, isAppInitiatedAction, totp, messagesPerField } = kcContext;

    const { msg } = i18n;

    const [otpValue, setOtpValue] = useState("");
    const isDisabled = otpValue.trim().length !== 6;

    return (
        <Template i18n={i18n} kcContext={kcContext} displayMessage={false}>
            <div className="space-y-4 text-foreground">
                <div className="space-y-2 text-center">
                    <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
                        Secure Your Account
                    </h1>

                    <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                        Add an extra layer of security using an authenticator app.
                    </p>
                </div>

                <div className="space-y-6">
                    <div className="space-y-1">
                        <h2 className="text-base font-medium text-foreground">
                            Scan QR Code
                        </h2>

                        <p className="text-sm text-muted-foreground">
                            Use Google Authenticator or Microsoft Authenticator
                        </p>
                    </div>

                    <div className="flex flex-col lg:flex-row items-center gap-8">
                        {/* QR */}
                        <div className="flex justify-center">
                            <div className="p-5 rounded-2xl bg-muted/40 backdrop-blur-sm">
                                <img
                                    id="kc-totp-secret-qr-code"
                                    src={`data:image/png;base64, ${totp.totpSecretQrCode}`}
                                    alt="QR Code"
                                    className="w-44 sm:w-52 lg:w-60 rounded-xl"
                                />
                            </div>
                        </div>

                        <div className="flex-1 space-y-4 text-sm">
                            <div className="space-y-1">
                                <p className="font-medium text-foreground">
                                    Manual Setup
                                </p>

                                <p className="text-muted-foreground">
                                    If you cannot scan the QR code, use this key.
                                </p>
                            </div>

                            <div className="rounded-xl bg-muted/50 px-4 py-3 font-mono text-xs break-all text-muted-foreground">
                                {totp.totpSecretEncoded}
                            </div>

                            <span className="text-xs text-muted-foreground">
                                Use the following configuration values if the application
                                allows setting them:
                            </span>
                            <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-xs pt-3 text-muted-foreground">
                                <span>{msg("loginTotpType")}</span>
                                <span className="text-foreground">
                                    {msg(`loginTotp.${totp.policy.type}`)}
                                </span>

                                <span>{msg("loginTotpAlgorithm")}</span>
                                <span className="text-foreground">
                                    {totp.policy.getAlgorithmKey()}
                                </span>

                                <span>{msg("loginTotpDigits")}</span>
                                <span className="text-foreground">
                                    {totp.policy.digits}
                                </span>

                                {totp.policy.type === "totp" ? (
                                    <>
                                        <span>{msg("loginTotpInterval")}</span>
                                        <span className="text-foreground">
                                            {totp.policy.period}
                                        </span>
                                    </>
                                ) : (
                                    <>
                                        <span>{msg("loginTotpCounter")}</span>
                                        <span className="text-foreground">
                                            {totp.policy.initialCounter}
                                        </span>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="space-y-1">
                        <h2 className="text-base font-medium text-foreground">
                            Verify Code
                        </h2>

                        <p className="text-sm text-muted-foreground">
                            Enter the 6-digit code generated by your app.
                        </p>
                    </div>

                    <form
                        action={url.loginAction}
                        id="kc-totp-settings-form"
                        method="post"
                    >
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="totp" className="text-foreground">
                                    One-Time Code{" "}
                                    <span className="text-destructive">*</span>
                                </Label>

                                <Input
                                    type="text"
                                    id="totp"
                                    name="totp"
                                    autoComplete="off"
                                    placeholder="123456"
                                    maxLength={6}
                                    value={otpValue}
                                    onChange={e => {
                                        const value = e.target.value.replace(/\D/g, "");
                                        setOtpValue(value);
                                    }}
                                    className="text-center text-lg tracking-[0.3em] font-medium"
                                    aria-invalid={messagesPerField.existsError("totp")}
                                />
                                {messagesPerField.existsError("totp") && (
                                    <span
                                        id="input-error-otp-code"
                                        className="text-destructive text-xs"
                                        aria-live="polite"
                                        dangerouslySetInnerHTML={{
                                            __html: kcSanitize(
                                                messagesPerField.get("totp")
                                            )
                                        }}
                                    />
                                )}

                                <input
                                    type="hidden"
                                    id="totpSecret"
                                    name="totpSecret"
                                    value={totp.totpSecret}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="userLabel" className="text-foreground">
                                    Device Name
                                </Label>

                                <Input
                                    id="userLabel"
                                    name="userLabel"
                                    type="text"
                                    placeholder="e.g. MacBook Pro"
                                />
                            </div>

                            {isAppInitiatedAction ? (
                                <>
                                    <Button
                                        type="submit"
                                        id="saveTOTPBtn"
                                        disabled={isDisabled}
                                        className="w-full text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Confirm & Enable
                                    </Button>
                                    <Button
                                        type="submit"
                                        variant="ghost"
                                        name="cancel-aia"
                                        value="true"
                                        id="cancelTOTPBtn"
                                        className="w-full  text-sm font-medium"
                                    >
                                        Cancel
                                    </Button>
                                </>
                            ) : (
                                <Button
                                    type="submit"
                                    id="saveTOTPBtn"
                                    disabled={isDisabled}
                                    className="w-full text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Confirm & Enable
                                </Button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </Template>
    );
};

export default LoginConfigTotp;

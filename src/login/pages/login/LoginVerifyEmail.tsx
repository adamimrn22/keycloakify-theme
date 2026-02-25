import { PageProps } from "../../types";
import { AlertMessage } from "@/components/AlertMessage";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const LoginVerifyEmail = (props: PageProps<"login-verify-email.ftl">) => {
    const { Template, i18n, kcContext } = props;
    const { message, user } = kcContext;

    const getAlertType = (type?: string) => {
        switch (type) {
            case "success":
                return "success";
            case "error":
                return "error";
            case "warning":
            case "info":
                return "info";
            default:
                return "info";
        }
    };

    return (
        <Template i18n={i18n} kcContext={kcContext} displayMessage={false}>
            <h1 className="text-2xl font-bold text-center mb-6 text-foreground">
                Verify Your Email
            </h1>

            {message && (
                <AlertMessage
                    type={getAlertType(message.type)}
                    title={
                        message.type === "success"
                            ? "Email Verified"
                            : message.type === "error"
                              ? "Verification Failed"
                              : "Notice"
                    }
                    message={message.summary}
                    className="mb-4"
                />
            )}

            {message?.type === "success" ? (
                <div className="text-center mb-4">
                    <p className="text-sm mb-4 text-muted-foreground">
                        Your email has been successfully verified.
                    </p>
                    <a href="/login" className="text-primary hover:underline">
                        Go to Login
                    </a>
                    <p className="text-xs text-gray-500 mt-2">
                        Or you may close this page if you prefer.
                    </p>
                </div>
            ) : (
                <p className="text-center text-sm mb-4 text-muted-foreground">
                    {message?.type === "error" ? (
                        "We couldn't send the verification email. Please try again or contact support if the issue persists."
                    ) : (
                        <p>
                            A verification email has been sent to{" "}
                            <strong>{user.email}</strong>. Please follow the instructions
                            to confirm your email and activate your account.
                        </p>
                    )}
                </p>
            )}

            {(!message || message.type !== "success") && (
                <>
                    <Separator />
                    <p className="text-center text-sm text-gray-500 mt-4">
                        Didn't receive the verification email?{" "}
                        <a
                            href="/resend-verification"
                            className="text-primary hover:underline"
                        >
                            Click here
                        </a>{" "}
                        to request a new one.
                    </p>
                </>
            )}
        </Template>
    );
};

export default LoginVerifyEmail;

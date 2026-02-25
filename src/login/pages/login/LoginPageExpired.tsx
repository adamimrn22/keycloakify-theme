import { PageProps } from "../../types";
import { AlertMessage } from "@/components/AlertMessage";
import { Button } from "@/components/ui/button";

const LoginPageExpired = (props: PageProps<"login-page-expired.ftl">) => {
    const { i18n, Template, kcContext } = props;

    const { url, message } = kcContext;

    return (
        <Template i18n={i18n} kcContext={kcContext} displayMessage={false}>
            <div className="flex flex-col items-center justify-center space-y-6 py-10">
                <div className="space-y-2">
                    <h1 className="text-2xl font-semibold text-foreground">
                        We couldn’t complete your request
                    </h1>
                    <p className="text-sm text-muted-foreground max-w-md">
                        An issue occurred while processing your request. Please try again
                        or restart the process if the problem persists.
                    </p>
                </div>

                {message && (
                    <AlertMessage
                        type={message.type}
                        title="Session Expired"
                        message={message.summary}
                        className="w-full max-w-md"
                    />
                )}

                <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm">
                    <a href={url.loginRestartFlowUrl} className="w-full">
                        <Button className="w-full bg-primary text-white hover:bg-primary/90">
                            Restart
                        </Button>
                    </a>

                    <a href={url.loginAction} className="w-full">
                        <Button
                            variant="outline"
                            className="w-full text-muted-foreground"
                        >
                            Try Again
                        </Button>
                    </a>
                </div>
            </div>
        </Template>
    );
};

export default LoginPageExpired;

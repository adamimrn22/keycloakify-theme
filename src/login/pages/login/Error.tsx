import { kcSanitize } from "keycloakify/lib/kcSanitize";
import { PageProps } from "../../types";
import { AlertMessage } from "@/components/AlertMessage";

const Error = (props: PageProps<"error.ftl">) => {
    const { kcContext, i18n, Template } = props;
    const { message, client, skipLink } = kcContext;
    const { msg } = i18n;

    return (
        <Template i18n={i18n} kcContext={kcContext} displayMessage={false}>
            <h1 className="text-2xl font-bold text-center text-foreground my-2">
                {msg("errorTitle")}
            </h1>

            <div id="kc-error-message" className="flex flex-col gap-4">
                {/* Error alert */}
                {message?.summary && (
                    <AlertMessage type="error">
                        <div
                            className="text-muted-foreground"
                            dangerouslySetInnerHTML={{
                                __html: kcSanitize(message.summary)
                            }}
                        />
                    </AlertMessage>
                )}

                {/* Back to application button */}
                {!skipLink && client?.baseUrl && (
                    <div className="mt-4 flex justify-center">
                        <a
                            id="backToApplication"
                            href={client.baseUrl}
                            className="w-full bg-primary text-white hover:bg-primary/90 p-1 text-sm text-center transition-colors duration-300"
                        >
                            {msg("backToApplication")}
                        </a>
                    </div>
                )}
            </div>
        </Template>
    );
};

export default Error;

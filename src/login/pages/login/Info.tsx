import { kcSanitize } from "keycloakify/lib/kcSanitize";
import { PageProps } from "../../types";
import { AlertMessage } from "@/components/AlertMessage";

const Info = (props: PageProps<"info.ftl">) => {
    const { kcContext, i18n, Template } = props;
    const { advancedMsgStr, msg } = i18n;

    const {
        messageHeader,
        message,
        requiredActions,
        skipLink,
        pageRedirectUri,
        actionUri,
        client
    } = kcContext;

    return (
        <Template i18n={i18n} kcContext={kcContext} displayMessage={false}>
            <div id="kc-info-message" className="flex flex-col gap-4">
                {/* Message Header */}
                {messageHeader && (
                    <h1 className="text-2xl md:text-3xl font-bold text-center text-foreground">
                        {messageHeader}
                    </h1>
                )}

                {/* Body Message inside Alert */}
                {message.summary && (
                    <AlertMessage
                        type="info"
                        message={
                            requiredActions && requiredActions.length > 0
                                ? `${message.summary.trim()} Required actions: ${requiredActions
                                      .map(action =>
                                          advancedMsgStr(`requiredAction.${action}`)
                                      )
                                      .join(", ")}`
                                : message.summary.trim()
                        }
                        className="w-full font-black"
                    />
                )}

                {/* Action Button */}
                {!skipLink &&
                    (() => {
                        const url = pageRedirectUri || actionUri || client.baseUrl;
                        if (!url) return null;

                        const label =
                            pageRedirectUri || client.baseUrl
                                ? msg("backToApplication")
                                : msg("proceedWithAction");

                        return (
                            <div className=" flex justify-center">
                                <a
                                    href={url}
                                    className="w-full bg-primary text-white hover:bg-primary/90 p-1 text-sm text-center transition-colors duration-300"
                                >
                                    {label}
                                </a>
                            </div>
                        );
                    })()}
            </div>
        </Template>
    );
};

export default Info;

import { useState } from "react";
import type { JSX } from "keycloakify/tools/JSX";
import type { LazyOrNot } from "keycloakify/tools/LazyOrNot";
import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import type { UserProfileFormFieldsProps } from "keycloakify/login/UserProfileFormFieldsProps";
import type { PageProps } from "keycloakify/login/pages/PageProps"; // <-- Use Keycloakify's default PageProps
import type { KcContext } from "../../KcContext";
import type { I18n } from "../../i18n";
import { Button } from "@/components/ui/button";

// The exact props Keycloakify expects for this page
type LoginUpdateProfileProps = PageProps<
    Extract<KcContext, { pageId: "login-update-profile.ftl" }>,
    I18n
> & {
    UserProfileFormFields: LazyOrNot<(props: UserProfileFormFieldsProps) => JSX.Element>;
    doMakeUserConfirmPassword: boolean;
};

export default function LoginUpdateProfile(props: LoginUpdateProfileProps) {
    const {
        kcContext,
        i18n,
        doUseDefaultCss,
        Template,
        classes,
        UserProfileFormFields,
        doMakeUserConfirmPassword
    } = props;

    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });

    const { messagesPerField, url, isAppInitiatedAction } = kcContext;
    const { msg, msgStr } = i18n;

    const [isFormSubmittable, setIsFormSubmittable] = useState(false);

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayRequiredFields
            headerNode={msg("loginProfileTitle")}
            displayMessage={messagesPerField.exists("global")}
        >
            {/* Your Custom UI Headers */}
            <div className="">
                <h1 className="text-2xl font-semibold text-foreground">
                    Update your profile information
                </h1>
                <p className="text-sm text-muted-foreground mt-1">
                    Please update your profile information to continue accessing your
                    account.
                </p>
            </div>

            {/* The Functional Form */}
            <form
                id="kc-update-profile-form"
                className={kcClsx("kcFormClass")}
                action={url.loginAction}
                method="post"
            >
                <UserProfileFormFields
                    kcContext={kcContext}
                    i18n={i18n}
                    kcClsx={kcClsx}
                    onIsFormSubmittableValueChange={setIsFormSubmittable}
                    doMakeUserConfirmPassword={doMakeUserConfirmPassword}
                />

                <div className={kcClsx("kcFormGroupClass")}>
                    <div id="kc-form-options" className={kcClsx("kcFormOptionsClass")}>
                        <div className={kcClsx("kcFormOptionsWrapperClass")} />
                    </div>

                    <div
                        id="kc-form-buttons"
                        className={kcClsx("kcFormButtonsClass") + " mt-4 flex gap-2"}
                    >
                        {/* Your shadcn Button */}
                        <Button
                            disabled={!isFormSubmittable}
                            type="submit"
                            className="w-full"
                        >
                            {msgStr("doSubmit")}
                        </Button>

                        {isAppInitiatedAction && (
                            <Button
                                variant="outline"
                                className="w-full"
                                type="submit"
                                name="cancel-aia"
                                value="true"
                                formNoValidate
                            >
                                {msg("doCancel")}
                            </Button>
                        )}
                    </div>
                </div>
            </form>
        </Template>
    );
}

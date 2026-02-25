import { Suspense, lazy } from "react";
import type { ClassKey } from "keycloakify/login";
import type { KcContext } from "./KcContext";
import { useI18n } from "./i18n";
import DefaultPage from "keycloakify/login/DefaultPage";
import { Template as CustomTemplate } from "./Template";
const UserProfileFormFields = lazy(() => import("./UserProfileFormFields"));

import "../index.css";

const doMakeUserConfirmPassword = true;

export default function KcPage(props: { kcContext: KcContext }) {
    const { kcContext } = props;

    const { i18n } = useI18n({ kcContext });

    const PageComponent = {
        "login.ftl": lazy(() => import("./pages/login/Login")),
        "terms.ftl": lazy(() => import("./pages/login/Terms")),
        "login-page-expired.ftl": lazy(() => import("./pages/login/LoginPageExpired")),
        "login-reset-password.ftl": lazy(
            () => import("./pages/login/LoginResetPassword")
        ),
        "login-update-password.ftl": lazy(
            () => import("./pages/login/LoginUpdatePassword")
        ),
        "login-verify-email.ftl": lazy(() => import("./pages/login/LoginVerifyEmail")),
        "login-config-totp.ftl": lazy(() => import("./pages/login/LoginConfigTotp")),
        "login-otp.ftl": lazy(() => import("./pages/login/LoginOtp")),
        "login-update-profile.ftl": lazy(
            () => import("./pages/login/LoginUpdateProfile")
        ),
        "info.ftl": lazy(() => import("./pages/login/Info")),
        "error.ftl": lazy(() => import("./pages/login/Error"))
    }[kcContext.pageId];

    return (
        <Suspense>
            {PageComponent ? (
                <PageComponent
                    Template={CustomTemplate}
                    i18n={i18n}
                    kcContext={kcContext}
                    doUseDefaultCss={false}
                    UserProfileFormFields={UserProfileFormFields}
                    doMakeUserConfirmPassword={doMakeUserConfirmPassword}
                />
            ) : (
                <DefaultPage
                    kcContext={kcContext}
                    i18n={i18n}
                    Template={CustomTemplate}
                    doUseDefaultCss={false}
                    UserProfileFormFields={UserProfileFormFields}
                    doMakeUserConfirmPassword={doMakeUserConfirmPassword}
                />
            )}
        </Suspense>
    );
}

const classes = {} satisfies { [key in ClassKey]?: string };

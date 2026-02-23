import { Suspense, lazy } from "react";
import type { ClassKey } from "keycloakify/login";
import type { KcContext } from "./KcContext";
import { useI18n } from "./i18n";
import Template from "keycloakify/login/Template";
import DefaultPage from "keycloakify/login/DefaultPage";
import { Template as CustomTemplate } from "./Template";
const UserProfileFormFields = lazy(
    () => import("keycloakify/login/UserProfileFormFields")
);

import "../index.css";
import Login from "./pages/login/Login";
import ResetPassword from "./pages/login/ResetPassword";
import Terms from "./pages/login/Terms";

const doMakeUserConfirmPassword = true;

export default function KcPage(props: { kcContext: KcContext }) {
    const { kcContext } = props;

    const { i18n } = useI18n({ kcContext });

    const PageComponent = {
        "login.ftl": Login,
        // "login-reset-password.ftl": ResetPassword,
        "terms.ftl": Terms
    }[kcContext.pageId];

    return (
        <Suspense>
            {PageComponent ? (
                <PageComponent
                    Template={CustomTemplate}
                    i18n={i18n}
                    kcContext={kcContext}
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

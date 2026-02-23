import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../../KcContext";
import type { I18n } from "../../i18n";
import { Button } from "@/components/ui/button";
import TermsAndCondition from "@/components/terms/TermsAndCondition";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils"; // shadcn cn utility
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Terms(
    props: PageProps<Extract<KcContext, { pageId: "terms.ftl" }>, I18n>
) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;
    const { msg, msgStr } = i18n;

    const [scrolledToBottom, setScrolledToBottom] = useState(false);
    const [checked, setChecked] = useState(false);
    const [showWarning, setShowWarning] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        if (scrolledToBottom) setShowWarning(false);
    }, [scrolledToBottom]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!checked || !scrolledToBottom) return;

        if (kcContext.user?.id) {
            await fetch("/api/consent", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userId: kcContext.user.id,
                    termsVersion: "v1.0"
                })
            });
        }

        e.currentTarget.submit();
    };

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const el = e.currentTarget;
        const progress = (el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100;
        setScrollProgress(progress);

        if (el.scrollTop + el.clientHeight >= el.scrollHeight - 5) {
            setScrolledToBottom(true);
        }
    };

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={false}
            headerNode={msg("termsTitle")}
        >
            {/* Scrollable Terms */}
            <div className="relative w-full max-w-3xl mx-auto">
                <ScrollArea className="h-96 w-full  " onScroll={handleScroll}>
                    <TermsAndCondition id="kc-terms-text" />
                </ScrollArea>

                {/* Scroll Progress Bar */}
                <div className="h-1 w-full bg-gray-200 rounded mt-3">
                    <div
                        className="h-1 bg-primary rounded transition-all"
                        style={{ width: `${Math.min(scrollProgress, 100)}%` }}
                    />
                </div>
            </div>

            {/* Checkbox + Accept */}
            <form
                onSubmit={handleSubmit}
                action={kcContext.url.loginAction}
                method="post"
                className="space-y-4 mt-3 max-w-3xl mx-auto"
            >
                <label className="flex flex-col items-start space-y-1">
                    <div className="flex items-center space-x-3">
                        <input
                            type="checkbox"
                            checked={checked}
                            onChange={e => {
                                setChecked(e.target.checked);
                                if (!scrolledToBottom && e.target.checked) {
                                    setShowWarning(true);
                                } else {
                                    setShowWarning(false);
                                }
                            }}
                            className="h-5 w-5"
                        />
                        <span className="text-xs">
                            I confirm that I have thoroughly reviewed the Enterprise Terms
                            & Conditions and Privacy Policy, and agree to abide by them.
                        </span>
                    </div>

                    {showWarning && (
                        <div className="text-red-500 text-xs mt-1">
                            Please review the full document before accepting.
                        </div>
                    )}
                </label>

                <Button
                    type="submit"
                    className={cn(
                        "w-full",
                        (!checked || !scrolledToBottom) && "opacity-50 cursor-not-allowed"
                    )}
                    disabled={!checked || !scrolledToBottom}
                >
                    {msgStr("doAccept")}
                </Button>
            </form>

            {/* Footer Links */}
            <div className="text-sm flex justify-center text-gray-500 space-x-4 mt-4 text-center">
                <a
                    href="/cookies"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                >
                    Cookie Policy
                </a>
                <a
                    href="/security"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                >
                    Security Policy
                </a>
                <a
                    href="/dpa"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                >
                    Data Processing Agreement
                </a>
            </div>
        </Template>
    );
}

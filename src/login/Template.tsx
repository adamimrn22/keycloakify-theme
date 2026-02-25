import { CustomTemplateProps } from "./types";
import "../index.css";
import { AuthCard } from "../components/AuthCard";

import DarkModeToggle from "@/shared/DarkModeToggle";
import { cn } from "@/lib/utils";

const Template = (props: CustomTemplateProps<any>) => {
    const { children, kcContext, i18n } = props;

    const isTotp = kcContext.pageId === "login-config-totp.ftl";

    return (
        <div className="relative min-h-dvh w-full bg-background overflow-hidden">
            {/* Dark Mode Toggle positioned on top-right */}
            <div className="absolute top-4 right-4 z-20">
                <DarkModeToggle />
            </div>

            {/* Background SVG */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <svg className="absolute inset-0 w-full h-full text-primary opacity-[0.12] dark:opacity-[0.2]" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="isometric-cubes" width="51" height="88" patternUnits="userSpaceOnUse">
                            {/* Center Cube */}
                            <path d="M25.5 0 L51 14.6 L51 44 L25.5 58.6 L0 44 L0 14.6 Z" fill="none" stroke="currentColor" strokeWidth="1" />
                            <path
                                d="M25.5 29.3 L51 14.6 M25.5 29.3 L0 14.6 M25.5 29.3 L25.5 58.6"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1"
                            />
                            {/* Right Cube */}
                            <path d="M51 44 L76.5 58.6 L76.5 88 L51 102.6 L25.5 88 L25.5 58.6 Z" fill="none" stroke="currentColor" strokeWidth="1" />
                            <path d="M51 73.3 L76.5 58.6 M51 73.3 L25.5 58.6 M51 73.3 L51 102.6" fill="none" stroke="currentColor" strokeWidth="1" />
                            {/* Left Cube */}
                            <path d="M0 44 L25.5 58.6 L25.5 88 L0 102.6 L-25.5 88 L-25.5 58.6 Z" fill="none" stroke="currentColor" strokeWidth="1" />
                            <path d="M0 73.3 L25.5 58.6 M0 73.3 L-25.5 58.6 M0 73.3 L0 102.6" fill="none" stroke="currentColor" strokeWidth="1" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#isometric-cubes)" />
                </svg>

                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,hsl(var(--background))_100%)] opacity-60" />
            </div>

            {/* Main AuthCard content */}
            <div className="relative z-10 flex min-h-dvh items-center justify-center px-4 py-10">
                <AuthCard className={cn("gap-3 bg-card/90 backdrop-blur-sm shadow-xl border border-gray-300 ", isTotp ? "max-w-2xl" : "max-w-md")}>
                    {children}
                </AuthCard>
            </div>
        </div>
    );
};

export { Template };

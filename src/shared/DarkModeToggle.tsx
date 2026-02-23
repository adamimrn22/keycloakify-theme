import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react"; // import the icons

const SESSION_STORAGE_KEY = "isDark";

export default function DarkModeToggle() {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const stored = sessionStorage.getItem(SESSION_STORAGE_KEY);
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        const initial = stored ? stored === "true" : prefersDark;

        setIsDark(initial);
        document.documentElement.classList.toggle("dark", initial);
    }, []);

    const toggleDark = () => {
        const newValue = !isDark;
        setIsDark(newValue);
        sessionStorage.setItem(SESSION_STORAGE_KEY, `${newValue}`);
        document.documentElement.classList.toggle("dark", newValue);
    };

    return (
        <div className="w-full flex justify-end p-4">
            <Button
                onClick={toggleDark}
                style={{
                    backgroundColor: isDark ? "var(--primary)" : "var(--secondary)",
                    color: isDark
                        ? "var(--primary-foreground)"
                        : "var(--secondary-foreground)"
                }}
                className="hover:opacity-90 transition-colors flex items-center gap-2 cursor-pointer rounded-md"
            >
                {isDark ? <Moon size={18} /> : <Sun size={18} />}
            </Button>
        </div>
    );
}

import React from "react";
import { Separator } from "../ui/separator";

interface TermsAndConditionProps {
    id: string;
}

const TermsAndCondition: React.FC<TermsAndConditionProps> = ({ id }) => {
    return (
        <div id={id} className="space-y-6">
            <h1 className="text-3xl font-bold text-foreground">Terms & Conditions</h1>
            <Separator className="my-4" />

            <p className="text-muted-foreground leading-relaxed px-4">
                Welcome to <strong>Hyper Agile Collaboration Platform</strong>. By
                accessing or using this Platform, you acknowledge that you have carefully
                reviewed these Terms & Conditions and our Privacy Policy, and you agree to
                comply with all applicable terms, conditions, and policies. These Terms
                govern your access and use of the Platform, including all features,
                services, and content provided. You further acknowledge that failure to
                comply with these Terms may result in suspension or termination of access
                and may carry other legal consequences.
            </p>

            <Separator className="my-4" />

            <div className="space-y-4 px-4">
                <h2 className="text-xl font-semibold text-foreground">
                    Privacy Policy Summary
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                    The Platform collects personal data including, but not limited to,
                    your name, email address, phone number, IP address, and usage logs.
                    This data is processed for operational, security, and compliance
                    purposes. Data may be shared with trusted third-party service
                    providers strictly for service provision and operational efficiency.
                    Users retain rights under GDPR, PDPA, CCPA, and PIPL depending on
                    their jurisdiction. Personal data will be retained only as long as
                    necessary for legitimate operational purposes and regulatory
                    compliance. For the full Privacy Policy, please visit{" "}
                    <a
                        href="/privacy"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                    >
                        here
                    </a>
                    .
                </p>

                <p className="text-muted-foreground leading-relaxed">
                    By continuing to use the Platform, you explicitly consent to these
                    Terms and the processing of your personal data in accordance with the
                    Privacy Policy.
                </p>
            </div>

            <Separator className="my-4" />

            <div className="text-muted-foreground px-4 leading-relaxed">
                For the complete Terms & Conditions, please visit{" "}
                <a
                    href="/terms"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                >
                    this page
                </a>
                .
            </div>

            <Separator className="mt-4" />
        </div>
    );
};

export default TermsAndCondition;

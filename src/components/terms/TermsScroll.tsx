// import { useState } from "react";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import TermsAndCondition from "./TermsAndCondition";

// export default function TermsScroll() {
//     const [scrollProgress, setScrollProgress] = useState(0);

//     const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
//         const el = e.currentTarget;
//         const progress = (el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100;
//         setScrollProgress(progress);
//     };

//     return (
//         <div className="w-full max-w-2xl mx-auto">
//             <ScrollArea className="h-96 w-full border rounded-md" onScroll={handleScroll}>
//                 <TermsAndCondition id="kc-terms-text" />
//             </ScrollArea>

//             <div className="h-1 w-full bg-gray-200 rounded mt-2">
//                 <div
//                     className="h-1 bg-primary rounded transition-all"
//                     style={{ width: `${Math.min(scrollProgress, 100)}%` }}
//                 />
//             </div>
//         </div>
//     );
// }

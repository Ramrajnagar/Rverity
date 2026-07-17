"use client";

import { useState, useEffect } from "react";
import { Check, Copy } from "lucide-react";

const codeLines = [
    { type: "comment", text: "// Install the SDK" },
    { type: "command", text: "$ npm install @rverity/sdk" },
    { type: "blank", text: "" },
    { type: "comment", text: "// Capture context from your workflow" },
    { type: "keyword", text: "import", suffix: " { RverityClient } ", after: "from", string: " '@rverity/sdk'" },
    { type: "blank", text: "" },
    { type: "keyword", text: "const", suffix: "client", after: "=", keyword2: "new", class: " RverityClient", after2: "({" },
    { type: "prop", indent: 1, key: "apiKey", value: "'rv_live_...'" },
    { type: "prop", indent: 1, key: "endpoint", value: "'https://api.rverity.ai'" },
    { type: "plain", text: "})" },
    { type: "blank", text: "" },
    { type: "keyword", text: "await", suffix: "client.", method: "capture", after: "({" },
    { type: "prop", indent: 1, key: "content", value: "'Refactored auth module'" },
    { type: "prop", indent: 1, key: "source", value: "'vscode'" },
    { type: "prop", indent: 1, key: "tags", value: "['auth', 'refactor']", last: true },
    { type: "plain", text: "})" },
    { type: "blank", text: "" },
    { type: "comment", text: "// Search your knowledge graph" },
    { type: "keyword", text: "const", suffix: "results", after: "=", keyword2: "await", after2: " client.", method: "search", after3: "(", string2: "'auth patterns'", after4: ")" },
];

export default function LiveCodeTerminal() {
    const [copied, setCopied] = useState(false);
    const [visibleLines, setVisibleLines] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setVisibleLines(prev => {
                if (prev >= codeLines.length) {
                    clearInterval(timer);
                    return prev;
                }
                return prev + 1;
            });
        }, 120);
        return () => clearInterval(timer);
    }, []);

    const fullCode = `$ npm install @rverity/sdk

import { RverityClient } from '@rverity/sdk'

const client = new RverityClient({
  apiKey: 'rv_live_...',
  endpoint: 'https://api.rverity.ai'
})

await client.capture({
  content: 'Refactored auth module',
  source: 'vscode',
  tags: ['auth', 'refactor']
})

// Search your knowledge graph
const results = await client.search('auth patterns')`;

    const handleCopy = () => {
        navigator.clipboard.writeText(fullCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="rounded-xl bg-[#0a0a0a] border border-white/[0.06] overflow-hidden font-mono text-[13px] leading-relaxed">
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.06]">
                <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-neutral-700" />
                        <div className="w-2.5 h-2.5 rounded-full bg-neutral-700" />
                        <div className="w-2.5 h-2.5 rounded-full bg-neutral-700" />
                    </div>
                    <span className="text-[11px] text-neutral-600 ml-2">quickstart.ts</span>
                </div>
                <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 text-[11px] text-neutral-500 hover:text-white transition-colors duration-150"
                >
                    {copied ? (
                        <>
                            <Check className="h-3 w-3 text-[#44FFA4]" />
                            <span className="text-[#44FFA4]">Copied</span>
                        </>
                    ) : (
                        <>
                            <Copy className="h-3 w-3" />
                            Copy
                        </>
                    )}
                </button>
            </div>
            <div className="p-4 overflow-x-auto">
                {codeLines.slice(0, visibleLines).map((line, i) => (
                    <div key={i} className="whitespace-pre">
                        {renderLine(line)}
                    </div>
                ))}
                {visibleLines < codeLines.length && (
                    <div className="inline-block w-2 h-4 bg-[#00A3FF] animate-pulse ml-0.5" />
                )}
            </div>
        </div>
    );
}

function renderLine(line: any) {
    const indent = line.indent ? "  ".repeat(line.indent) : "";

    if (line.type === "blank") return <div className="h-4" />;
    if (line.type === "command") return <span className="text-[#44FFA4]">{line.text}</span>;
    if (line.type === "comment") return <span className="text-neutral-600">{line.text}</span>;
    if (line.type === "prop") {
        return (
            <span>
                {indent}
                <span className="text-neutral-300">{line.key}</span>
                <span className="text-neutral-500">: </span>
                <span className="text-[#44FFA4]">{line.value}</span>
                <span className="text-neutral-500">{line.last ? "" : ","}</span>
            </span>
        );
    }
    if (line.type === "keyword") {
        return (
            <span>
                {indent}
                <span className="text-[#00A3FF]">{line.text}</span>
                {line.suffix && <span className="text-neutral-300">{line.suffix}</span>}
                {line.after && <span className="text-[#00A3FF]">{line.after}</span>}
                {line.string && <span className="text-[#44FFA4]">{line.string}</span>}
                {line.keyword2 && <span className="text-[#00A3FF]"> {line.keyword2}</span>}
                {line.class && <span className="text-[#FFCA16]">{line.class}</span>}
                {line.after2 && <span className="text-neutral-300">{line.after2}</span>}
                {line.method && <span className="text-[#FFCA16]">{line.method}</span>}
                {line.after3 && <span className="text-neutral-300">{line.after3}</span>}
                {line.string2 && <span className="text-[#44FFA4]">{line.string2}</span>}
                {line.after4 && <span className="text-neutral-300">{line.after4}</span>}
            </span>
        );
    }
    return <span className="text-neutral-300">{indent}{line.text}</span>;
}

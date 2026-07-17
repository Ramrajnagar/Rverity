"use client";

import { useState, useEffect } from "react";
import { Check, Copy, Terminal, Sparkles } from "lucide-react";

const codeLines = [
    { type: "blank" },
    { type: "comment", text: "// 1. Install the extension" },
    { type: "command", text: "npm install @rverity/sdk" },
    { type: "blank" },
    { type: "comment", text: "// 2. Initialize with your API key" },
    { type: "keyword", text: "import", suffix: " { Rverity } ", after: "from", string: " '@rverity/sdk'" },
    { type: "blank" },
    { type: "keyword", text: "const", suffix: "rv", after: "=", keyword2: "new", class: " Rverity", after2: "()" },
    { type: "plain", text: "({" },
    { type: "prop", indent: 1, key: "apiKey", value: "process.env.RVERITY_KEY" },
    { type: "plain", text: "})" },
    { type: "blank" },
    { type: "comment", text: "// 3. Capture context automatically" },
    { type: "keyword", text: "await", suffix: "rv.", method: "capture", after: "({" },
    { type: "prop", indent: 1, key: "content", value: "'Refactored auth module'", last: false },
    { type: "prop", indent: 1, key: "source", value: "'vscode'", last: false },
    { type: "prop", indent: 1, key: "tags", value: "['auth', 'refactor']", last: true },
    { type: "plain", text: "})" },
    { type: "blank" },
    { type: "comment", text: "// 4. Query your knowledge graph" },
    { type: "keyword", text: "const", suffix: "results", after: "=", keyword2: "await", after2: " rv.", method: "search", after3: "({", string2: "", after4: "" },
    { type: "prop", indent: 1, key: "query", value: "'how does auth work?'" },
    { type: "prop", indent: 1, key: "limit", value: "5", last: true },
    { type: "plain", text: "})" },
    { type: "blank" },
    { type: "comment", text: "// → Returns related code, docs, commits" },
    { type: "comment", text: "//   scored by semantic similarity" },
];

const fullCode = `npm install @rverity/sdk

import { Rverity } from '@rverity/sdk'

const rv = new Rverity({
  apiKey: process.env.RVERITY_KEY
})

await rv.capture({
  content: 'Refactored auth module',
  source: 'vscode',
  tags: ['auth', 'refactor']
})

const results = await rv.search({
  query: 'how does auth work?',
  limit: 5
})`;

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
        }, 100);
        return () => clearInterval(timer);
    }, []);

    const handleCopy = () => {
        navigator.clipboard.writeText(fullCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="rounded-xl bg-[#0a0a0a] border border-white/[0.06] overflow-hidden font-mono text-[13px] leading-relaxed shadow-2xl shadow-black/50">
            {/* Title bar */}
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.06] bg-white/[0.02]">
                <div className="flex items-center gap-3">
                    <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-neutral-700 hover:bg-red-500/80 transition-colors" />
                        <div className="w-2.5 h-2.5 rounded-full bg-neutral-700 hover:bg-yellow-500/80 transition-colors" />
                        <div className="w-2.5 h-2.5 rounded-full bg-neutral-700 hover:bg-green-500/80 transition-colors" />
                    </div>
                    <div className="flex items-center gap-1.5 ml-2">
                        <Terminal className="h-3 w-3 text-neutral-600" />
                        <span className="text-[11px] text-neutral-600">quickstart.ts</span>
                    </div>
                </div>
                <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 text-[11px] text-neutral-600 hover:text-white transition-colors duration-150 px-2 py-1 rounded-md hover:bg-white/[0.05]"
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

            {/* Code area */}
            <div className="p-4 overflow-x-auto min-h-[420px]">
                {codeLines.slice(0, visibleLines).map((line, i) => (
                    <div key={i} className="whitespace-pre flex">
                        <span className="text-neutral-700 w-8 text-right mr-4 select-none text-[11px] leading-relaxed shrink-0">
                            {line.type !== "blank" ? i + 1 : ""}
                        </span>
                        <span className="flex-1">{renderLine(line)}</span>
                    </div>
                ))}
                {visibleLines < codeLines.length && (
                    <div className="flex">
                        <span className="text-neutral-700 w-8 text-right mr-4 select-none text-[11px] leading-relaxed shrink-0">
                            {visibleLines + 1}
                        </span>
                        <div className="inline-block w-2 h-[18px] bg-[#00A3FF] animate-pulse rounded-sm" />
                    </div>
                )}
                {visibleLines >= codeLines.length && (
                    <motion.div
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="mt-3 flex items-center gap-2 text-[11px] text-neutral-600"
                    >
                        <Sparkles className="h-3 w-3 text-[#00A3FF]" />
                        <span>Ready to capture your first memory</span>
                    </motion.div>
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

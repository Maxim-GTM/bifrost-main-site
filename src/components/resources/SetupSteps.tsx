'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

type SetupStep = {
    step: string;
    title: string;
    description: string;
    code: string;
};

type SetupStepsProps = {
    steps: SetupStep[];
};

export default function SetupSteps({ steps }: SetupStepsProps) {
    const [copiedStep, setCopiedStep] = useState<string | null>(null);

    const handleCopyStep = (stepId: string, code: string) => {
        const commandsOnly = code
            .split('\n')
            .filter((line) => line.trim() && !line.trim().startsWith('#'))
            .join('\n');

        navigator.clipboard.writeText(commandsOnly);
        setCopiedStep(stepId);
        setTimeout(() => setCopiedStep(null), 2000);
    };

    return (
        <div className="grid md:grid-cols-3 gap-6 items-stretch">
            {steps.map((step) => (
                <div key={step.step} className="border border-gray-200 bg-white flex flex-col">
                    <div className="p-6 flex-1">
                        <span className="text-xs font-mono text-[var(--accent-text)] uppercase tracking-wider">
                            Step {step.step}
                        </span>
                        <h3 className="font-semibold text-gray-900 mt-2 mb-2">{step.title}</h3>
                        <p className="text-sm text-gray-600 leading-relaxed">{step.description}</p>
                    </div>
                    <div className="bg-gray-900 border-t border-gray-800 min-h-[120px]">
                        <div className="flex items-center justify-between px-4 py-2 border-b border-gray-800 bg-gray-900/80">
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-gray-600" />
                                <span className="w-2 h-2 rounded-full bg-gray-600" />
                                <span className="w-2 h-2 rounded-full bg-gray-600" />
                                <span className="text-[10px] font-mono uppercase tracking-wider text-gray-400 ml-2">
                                    Terminal
                                </span>
                            </div>
                            <button
                                type="button"
                                onClick={() => handleCopyStep(step.step, step.code)}
                                className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold uppercase text-gray-300 hover:text-white transition-colors"
                            >
                                {copiedStep === step.step ? (
                                    <>
                                        <Check className="w-3.5 h-3.5 text-[var(--accent-text)]" />
                                        Copied
                                    </>
                                ) : (
                                    <>
                                        <Copy className="w-3.5 h-3.5" />
                                        Copy
                                    </>
                                )}
                            </button>
                        </div>
                        <div className="px-4 py-3 text-xs font-mono text-gray-200 space-y-1 overflow-x-auto">
                            {step.code.split('\n').map((line, index) => {
                                const isComment = line.trim().startsWith('#');
                                return (
                                    <div
                                        key={`${step.step}-${index}`}
                                        className="grid grid-cols-[24px_12px_1fr] items-start gap-3 leading-5"
                                    >
                                        <span className="text-gray-500 text-right tabular-nums">{index + 1}</span>
                                        <span className="text-gray-500">$</span>
                                        <span
                                            className={`whitespace-pre-wrap break-all ${isComment ? 'text-gray-400 italic' : 'text-gray-100'}`}
                                        >
                                            {line}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Props {
  content: string;
}

export function MarkdownRenderer({ content }: Props) {
  return (
    <div className="markdown-content">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // Paragraphs
          p: ({ children }) => (
            <p className="mb-2 last:mb-0 leading-relaxed">{children}</p>
          ),

          // Bold
          strong: ({ children }) => (
            <strong className="font-semibold text-paper">{children}</strong>
          ),

          // Italic
          em: ({ children }) => (
            <em className="italic text-paper-dim">{children}</em>
          ),

          // Links
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber underline decoration-amber/40 hover:decoration-amber transition-colors"
            >
              {children}
            </a>
          ),

          // Inline code
          code: ({ className, children, ...props }) => {
            const isInline = !className;
            
            if (isInline) {
              return (
                <code
                  className="bg-ink-3 text-amber px-1.5 py-0.5 rounded text-[0.85em] font-mono border border-line"
                  {...props}
                >
                  {children}
                </code>
              );
            }
            
            return (
              <code className="block font-mono text-[0.85em]" {...props}>
                {children}
              </code>
            );
          },

          // Code blocks
          pre: ({ children }) => (
            <pre className="bg-ink-3 border border-line-strong rounded-lg p-3 my-2 overflow-x-auto">
              {children}
            </pre>
          ),

          // Unordered lists
          ul: ({ children }) => (
            <ul className="list-disc list-inside space-y-1 my-2 ml-2">
              {children}
            </ul>
          ),

          // Ordered lists
          ol: ({ children }) => (
            <ol className="list-decimal list-inside space-y-1 my-2 ml-2">
              {children}
            </ol>
          ),

          // List items
          li: ({ children }) => (
            <li className="text-paper leading-relaxed">{children}</li>
          ),

          // Headings
          h1: ({ children }) => (
            <h1 className="text-lg font-semibold text-paper mt-3 mb-2">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-base font-semibold text-paper mt-3 mb-2">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-[0.95rem] font-semibold text-paper mt-2 mb-1">
              {children}
            </h3>
          ),

          // Blockquote
          blockquote: ({ children }) => (
            <blockquote className="border-l-2 border-amber/50 pl-3 my-2 italic text-paper-dim">
              {children}
            </blockquote>
          ),

          // Horizontal rule
          hr: () => <hr className="border-line my-3" />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
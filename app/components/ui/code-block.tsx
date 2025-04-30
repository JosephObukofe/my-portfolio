import { cn } from "@/lib/utils"
import React, { useState, useEffect } from "react"
import { codeToHtml } from "shiki"
import { Copy, Check } from 'lucide-react';

export type CodeBlockProps = {
  children?: React.ReactNode
  className?: string
  code?: string
} & React.HTMLProps<HTMLDivElement>

function CodeBlock({ children, className, code = '', ...props }: CodeBlockProps) {
  return (
    <div
      className={cn(
        "not-prose group flex w-full flex-col overflow-clip border relative",
        "border-border bg-card text-card-foreground rounded-xl shadow-sm",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export type CodeBlockCodeProps = {
  code: string
  language?: string
  theme?: string
  className?: string
} & React.HTMLProps<HTMLDivElement>

function CodeBlockCode({
  code,
  language = "tsx",
  theme = "light",
  className,
  ...props
}: CodeBlockCodeProps) {
  const [highlightedHtml, setHighlightedHtml] = useState<string | null>(null)

  useEffect(() => {
    async function highlight() {
      if (!code) {
        setHighlightedHtml("<pre><code></code></pre>")
        return
      }

      const html = await codeToHtml(code, { 
        lang: language, 
        theme: theme === 'dark' ? 'github-dark' : 'github-light'
      })
      setHighlightedHtml(html)
    }
    highlight()
  }, [code, language, theme])

  const classNames = cn(
    "w-full overflow-x-auto text-[13px] [&>pre]:px-4 [&>pre]:py-4 bg-transparent",
    className
  )

  // SSR fallback: render plain code if not hydrated yet
  return highlightedHtml ? (
    <div
      className={classNames}
      dangerouslySetInnerHTML={{ __html: highlightedHtml }}
      {...props}
    />
  ) : (
    <div className={classNames} {...props}>
      <pre>
        <code>{code}</code>
      </pre>
    </div>
  )
}

export type CodeBlockGroupProps = React.HTMLAttributes<HTMLDivElement>

function CodeBlockGroup({
  children,
  className,
  ...props
}: CodeBlockGroupProps) {
  return (
    <div
      className={cn("flex items-center justify-between", className)}
      {...props}
    >
      {children}
    </div>
  )
}

export { CodeBlockGroup, CodeBlockCode, CodeBlock }

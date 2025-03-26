import type React from "react"
import { Avatar } from "@/components/ui/avatar"
import { User, Bot } from "lucide-react"
import { cn } from "@/lib/utils"
import { TaxTable } from "@/components/tax-table"
import { TaxChart } from "@/components/tax-chart"

interface ChatMessageProps {
  message: {
    id: string
    role: "user" | "assistant" | "system"
    content: string
    display?: React.ReactNode
  }
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user"

  const renderMessageContent = () => {
    if (message.display) {
      return message.display
    }

    const content = message.content

    if (content.includes("{{TAX_TABLE}}")) {
      const taxScenario = {
        income: Math.floor(Math.random() * 100000) + 50000,
        deductions: Math.floor(Math.random() * 20000) + 5000,
        get taxableIncome() {
          return this.income - this.deductions
        },
        taxRate: 0.22,
        get totalTax() {
          return Math.floor(this.taxableIncome * this.taxRate)
        },
      }

      return (
        <div className="space-y-4">
          <div
            dangerouslySetInnerHTML={{
              __html: content.replace("{{TAX_TABLE}}", ""),
            }}
          />
          <TaxTable
            income={taxScenario.income}
            deductions={taxScenario.deductions}
            taxableIncome={taxScenario.taxableIncome}
            taxRate={taxScenario.taxRate}
            totalTax={taxScenario.totalTax}
          />
        </div>
      )
    }

    if (content.includes("{{TAX_CHART}}")) {
      const taxScenario = {
        income: Math.floor(Math.random() * 100000) + 50000,
        deductions: Math.floor(Math.random() * 20000) + 5000,
        get taxableIncome() {
          return this.income - this.deductions
        },
        taxRate: 0.22,
        get totalTax() {
          return Math.floor(this.taxableIncome * this.taxRate)
        },
      }

      return (
        <div className="space-y-4">
          <div
            dangerouslySetInnerHTML={{
              __html: content.replace("{{TAX_CHART}}", ""),
            }}
          />
          <TaxChart
            income={taxScenario.income}
            deductions={taxScenario.deductions}
            taxableIncome={taxScenario.taxableIncome}
            totalTax={taxScenario.totalTax}
          />
        </div>
      )
    }

    return <div dangerouslySetInnerHTML={{ __html: content }} />
  }

  return (
    <div className={cn("flex items-start gap-3 group", isUser && "justify-end")}>
      {!isUser && (
        <Avatar>
          <div className="bg-primary/20 dark:bg-primary/40 flex items-center justify-center h-full">
            <Bot className="h-4 w-4 text-primary dark:text-primary-foreground" />
          </div>
        </Avatar>
      )}

      <div
        className={cn(
          "rounded-lg px-4 py-3 max-w-[85%] shadow-sm",
          isUser
            ? "bg-primary/10 dark:bg-primary/20 text-foreground dark:text-primary-foreground"
            : "bg-card dark:bg-card border border-border",
        )}
      >
        {renderMessageContent()}
      </div>

      {isUser && (
        <Avatar>
          <div className="bg-accent/10 dark:bg-accent/20 flex items-center justify-center h-full">
            <User className="h-4 w-4 text-accent-foreground" />
          </div>
        </Avatar>
      )}
    </div>
  )
}


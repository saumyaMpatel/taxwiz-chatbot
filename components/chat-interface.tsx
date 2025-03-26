"use client"
import React, { useState, useEffect, useRef } from "react"
import { useChat } from "@ai-sdk/react"
import FileUpload from "./file-upload"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { ArrowUp, Sparkles, Bot, User, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"

const getSuggestedQuestions = (context = "default"): string[] => {
  const questionMappings: { [key: string]: string[] } = {
    default: [
      "What is a standard deduction?",
      "How do tax brackets work?",
      "Tell me about W-2 forms",
      "What deductions can I claim?",
    ],
    "1099": [
      "How do I report 1099 income?",
      "What taxes do I owe on 1099 income?",
      "Do I need to make estimated tax payments?",
    ],
    "w-2": [
      "How do I report income from my W-2?",
      "What tax credits might I qualify for?",
      "How do withholdings work?",
    ],
    "tax brackets": [
      "How are marginal tax rates calculated?",
      "What is my effective tax rate?",
      "How can I lower my tax bracket?",
    ],
    deductions: [
      "What reduces my taxable income?",
      "Should I itemize or take the standard deduction?",
      "What tax credits are available?",
    ],
    "file upload": [
      "Can you analyze this tax document?",
      "What deductions might I qualify for based on this file?",
      "What should I know about this document?",
    ],
  }

  
  const matchedCategory = Object.keys(questionMappings).find((category) => context.toLowerCase().includes(category))

  return matchedCategory ? questionMappings[matchedCategory] : questionMappings["default"]
}

const sampleTaxBreakdownData = [
  { category: "Gross Income", amount: 75000 },
  { category: "Standard Deduction", amount: -12950 },
  { category: "Taxable Income", amount: 62050 },
  { category: "Federal Tax", amount: -8700 },
  { category: "State Tax", amount: -3500 },
]


const getFileType = (filename: string): string => {
  const lowerFilename = filename.toLowerCase()

  if (lowerFilename.includes("w-2") || lowerFilename.includes("w2")) return "W-2"
  if (lowerFilename.includes("1099")) return "1099"
  if (lowerFilename.includes("1040")) return "Form 1040"
  if (lowerFilename.includes("schedule")) return "Schedule"
  if (lowerFilename.includes("receipt") || lowerFilename.includes("expense")) return "expense"
  if (lowerFilename.endsWith(".pdf")) return "PDF document"
  if (lowerFilename.endsWith(".jpg") || lowerFilename.endsWith(".jpeg") || lowerFilename.endsWith(".png"))
    return "image"
  if (lowerFilename.endsWith(".doc") || lowerFilename.endsWith(".docx")) return "Word document"
  if (lowerFilename.endsWith(".xls") || lowerFilename.endsWith(".xlsx")) return "Excel spreadsheet"

  return "tax document"
}

const containsFileKeywords = (message: string): boolean => {
  const fileKeywords = [
    "file",
    "document",
    "uploaded",
    "analyze",
    "look at",
    "check",
    "review",
    "read",
    "see",
    "open",
    "view",
    "examine",
    "scan",
    "inspect",
  ]

  return fileKeywords.some((keyword) => message.toLowerCase().includes(keyword))
}


const generateFileAnalysisResponse = (filename: string): string => {
  const fileType = getFileType(filename)
  const currentYear = new Date().getFullYear()

  const commonInsights = [
    `I've reviewed your file "${filename}".`,
    `Based on my analysis of "${filename}", here are some key observations:`,
    `After examining "${filename}", I can provide the following insights:`,
  ]

  const randomInsight = commonInsights[Math.floor(Math.random() * commonInsights.length)]

  switch (fileType) {
    case "W-2":
      return `${randomInsight}

1. From "${filename}", I can see your reported wages appear to be in the middle tax bracket range
2. The withholding information in "${filename}" suggests you may have sufficient tax payments
3. There may be opportunities for additional retirement contributions to reduce your taxable income

Would you like me to explain any specific aspects of "${filename}" in more detail?`

    case "1099":
      return `${randomInsight}

1. Based on "${filename}", you'll need to pay self-employment tax (15.3%) on this income
2. The information in "${filename}" suggests you should consider quarterly estimated tax payments
3. You may be eligible for business expense deductions that could reduce your taxable income

Would you like information about specific deductions related to the income shown in "${filename}"?`

    case "Form 1040":
      return `${randomInsight}

1. Your filing status in "${filename}" affects your tax brackets and standard deduction amount
2. Based on the income level shown in "${filename}", you may qualify for certain tax credits
3. I notice potential opportunities in "${filename}" to reduce your tax liability

Is there a specific section of "${filename}" you'd like me to focus on?`

    case "Schedule":
      return `${randomInsight}

1. "${filename}" contains important details about specific income or deductions
2. The information in "${filename}" will affect your overall tax calculation
3. There may be additional documentation requirements related to items in "${filename}"

Would you like me to explain how "${filename}" impacts your overall tax situation?`

    case "expense":
      return `${randomInsight}

1. "${filename}" could be useful for tax deduction purposes
2. Make sure to categorize the expense shown in "${filename}" correctly on your tax return
3. Keep "${filename}" as supporting documentation in case of an audit

Would you like more information about how to properly claim the expense shown in "${filename}"?`

    case "PDF document":
      return `${randomInsight}

1. "${filename}" contains tax-relevant information that may impact your filing
2. I've identified potential tax implications based on the content of "${filename}"
3. Consider consulting with a tax professional for a detailed analysis of "${filename}"

What specific questions do you have about "${filename}"?`

    case "image":
      return `${randomInsight}

1. "${filename}" appears to contain tax-relevant information
2. The visual documentation in "${filename}" could be useful for substantiating tax claims
3. I recommend keeping "${filename}" as part of your tax records

Is there something specific about "${filename}" you'd like me to address?`

    case "Word document":
    case "Excel spreadsheet":
      return `${randomInsight}

1. "${filename}" contains financial or tax information that may be relevant for your ${currentYear} taxes
2. The data structure in "${filename}" suggests it may be related to income or expense tracking
3. "${filename}" could be valuable supporting documentation for your tax filing

Would you like suggestions on how to best use the information in "${filename}" for tax purposes?`

    default:
      return `${randomInsight}

1. "${filename}" appears to contain information relevant to your tax situation
2. There may be potential tax implications based on the content of "${filename}"
3. I recommend reviewing "${filename}" with specific tax questions in mind

What aspects of "${filename}" would you like me to help you understand?`
  }
}

export default function ChatInterface() {
  const { messages, input, handleInputChange, handleSubmit, append, error, isLoading } = useChat({
    api: "/api/chat",
    onError: (err) => {
      console.error("Chat Error:", err)
      alert(`Error in chat: ${err.message}`)
    },
  })

  const [isClient, setIsClient] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [lastUserQuestion, setLastUserQuestion] = useState("")
  const [suggestedQuestionsContext, setSuggestedQuestionsContext] = useState("default")
  const [showMultimediaContent, setShowMultimediaContent] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleQuickReply = (question: string) => {
    setShowMultimediaContent(false)

    append({
      role: "user",
      content: question,
    })

    setSuggestedQuestionsContext("default")
  }

  const handleFileUpload = (file: File) => {
    setIsUploading(true)
    setSuggestedQuestionsContext("file upload")
    setUploadedFile(file)

    setTimeout(() => {
      setIsUploading(false)

      append({
        role: "system",
        content: `File uploaded: ${file.name}`,
      })

      setSuggestedQuestionsContext("file upload")

      if (inputRef.current) {
        inputRef.current.focus()
        inputRef.current.placeholder = `Ask about ${file.name}...`
      }
    }, 500)
  }

  const customHandleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setLastUserQuestion(input)
    setSuggestedQuestionsContext(input)

    if (
      input.toLowerCase().includes("breakdown") ||
      input.toLowerCase().includes("tax calculation") ||
      input.toLowerCase().includes("income details")
    ) {
      setShowMultimediaContent(true)
    }

    if (uploadedFile) {
      append({
        role: "user",
        content: input,
      })

      handleInputChange({ target: { value: "" } } as React.ChangeEvent<HTMLInputElement>)

      if (containsFileKeywords(input)) {
        setIsAnalyzing(true)

        setTimeout(() => {
          setIsAnalyzing(false)

          const analysisResponse = generateFileAnalysisResponse(uploadedFile.name)
          append({
            role: "assistant",
            content: analysisResponse,
          })
        }, 1500)
      } else {
        handleSubmit(e)
      }

      return
    }

    handleSubmit(e)
  }

  const renderTaxBreakdownTable = () => (
    <div className="w-full overflow-x-auto mt-4 rounded-lg border border-border">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-secondary/50 dark:bg-secondary/20">
            <th className="border-b border-border p-2 text-left">Category</th>
            <th className="border-b border-border p-2 text-right">Amount ($)</th>
          </tr>
        </thead>
        <tbody>
          {sampleTaxBreakdownData.map((item) => (
            <tr key={item.category} className="border-b border-border last:border-0">
              <td className="p-2">{item.category}</td>
              <td
                className={`p-2 text-right ${
                  item.amount < 0 ? "text-destructive dark:text-destructive" : "text-green-600 dark:text-green-500"
                }`}
              >
                {item.amount.toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )

  const renderTaxBreakdownChart = () => (
    <div className="w-full h-[300px] mt-4 p-4 bg-card/50 dark:bg-card/30 rounded-lg border border-border">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={sampleTaxBreakdownData}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis dataKey="category" tick={{ fill: "var(--foreground)" }} axisLine={{ stroke: "var(--border)" }} />
          <YAxis tick={{ fill: "var(--foreground)" }} axisLine={{ stroke: "var(--border)" }} />
          <Tooltip
            contentStyle={{
              backgroundColor: "var(--card)",
              borderColor: "var(--border)",
              color: "var(--card-foreground)",
            }}
          />
          <Legend wrapperStyle={{ color: "var(--foreground)" }} />
          <Bar dataKey="amount" fill="var(--primary)" stroke="var(--primary)" fillOpacity={0.8} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )

  if (!isClient) {
    return null
  }

  const suggestedQuestions = getSuggestedQuestions(suggestedQuestionsContext)

  return (
    <div className="flex flex-col h-[70vh] md:h-[600px]">
      {error && (
        <div className="bg-destructive/10 text-destructive p-4 rounded-lg m-4">
          <p className="font-medium">Error</p>
          <p>{error.message}</p>
        </div>
      )}

      {messages.length === 0 && (
        <div className="flex-grow flex flex-col items-center justify-center p-6 text-center">
          <div className="bg-primary/10 dark:bg-primary/20 p-4 rounded-full mb-4">
            <Sparkles className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Welcome to TaxWiz!</h3>
          <p className="text-muted-foreground max-w-md mb-6">
            I'm your AI tax assistant. Ask me anything about taxes, upload documents, or try one of the suggested
            questions below.
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            {suggestedQuestions.map((question) => (
              <button
                key={question}
                onClick={() => handleQuickReply(question)}
                className="bg-secondary hover:bg-secondary/80 text-secondary-foreground px-4 py-2 rounded-full text-sm transition-colors"
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      )}

      {messages.length > 0 && (
        <div className="flex-grow overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-primary/10 scrollbar-track-transparent">
          {messages.map((m) => {
            if (m.role === "system") {
              return (
                <div key={m.id} className="flex justify-center">
                  <div className="bg-secondary/20 dark:bg-secondary/10 text-secondary-foreground dark:text-secondary-foreground px-4 py-2 rounded-full text-sm flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    {m.content}
                  </div>
                </div>
              )
            }

            return (
              <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`relative p-4 rounded-xl max-w-[85%] ${
                    m.role === "user"
                      ? "bg-primary/10 dark:bg-primary/20 text-foreground"
                      : "bg-card text-card-foreground border border-border shadow-sm"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {m.role === "assistant" && (
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <Bot className="h-5 w-5 text-primary" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="prose prose-sm dark:prose-invert max-w-none">
                        {m.content.split("\n").map((line, i) => (
                          <React.Fragment key={i}>
                            {line}
                            {i < m.content.split("\n").length - 1 && <br />}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                    {m.role === "user" && (
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                        <User className="h-5 w-5 text-accent-foreground" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
          {isAnalyzing && (
            <div className="flex justify-start">
              <div className="bg-card text-card-foreground border border-border shadow-sm p-4 rounded-xl max-w-[85%]">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Bot className="h-5 w-5 text-primary animate-pulse" />
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary animate-bounce"></div>
                    <div
                      className="h-2 w-2 rounded-full bg-primary animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                    <div
                      className="h-2 w-2 rounded-full bg-primary animate-bounce"
                      style={{ animationDelay: "0.4s" }}
                    ></div>
                    <span className="text-muted-foreground text-sm ml-2">Analyzing {uploadedFile?.name}...</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {showMultimediaContent && (
            <div className="bg-card dark:bg-card/90 shadow-md rounded-lg p-4 space-y-4 border border-border">
              <h3 className="text-lg font-semibold">Tax Breakdown</h3>
              {renderTaxBreakdownTable()}
              {renderTaxBreakdownChart()}
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      )}

      {uploadedFile && (
        <div className="p-3 bg-primary/10 dark:bg-primary/20 border-t border-border">
          <div className="flex items-center">
            <FileText className="h-5 w-5 text-primary mr-2" />
            <span className="text-sm font-medium">File uploaded: {uploadedFile.name}</span>
          </div>
        </div>
      )}

      {messages.length > 0 && messages[messages.length - 1].role === "assistant" && (
        <div className="flex flex-wrap gap-2 p-4 border-t border-border bg-secondary/10">
          {suggestedQuestions.map((question) => (
            <button
              key={question}
              onClick={() => handleQuickReply(question)}
              className="bg-secondary/50 hover:bg-secondary/80 text-secondary-foreground px-3 py-1.5 rounded-full text-sm transition-colors"
            >
              {question}
            </button>
          ))}
        </div>
      )}

      <form onSubmit={customHandleSubmit} className="p-4 border-t border-border bg-card/50 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <input
            ref={inputRef}
            value={input}
            onChange={handleInputChange}
            placeholder={uploadedFile ? `Ask about ${uploadedFile.name}...` : "Ask a tax question..."}
            className="flex-grow p-3 bg-background border border-input rounded-lg focus:ring-2 focus:ring-primary/30 focus:outline-none transition-all"
            disabled={isLoading || isAnalyzing}
          />
          <FileUpload onFileUpload={handleFileUpload} isUploading={isUploading} />
          <Button
            type="submit"
            className="bg-primary hover:bg-primary/90 text-primary-foreground p-3 h-auto rounded-lg transition-colors"
            disabled={isLoading || isUploading || isAnalyzing || !input.trim()}
          >
            <ArrowUp className="h-5 w-5" />
            <span className="sr-only">Send</span>
          </Button>
        </div>
      </form>
    </div>
  )
}


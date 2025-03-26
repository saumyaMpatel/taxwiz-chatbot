import ChatInterface from "@/components/chat-interface"
import ThemeToggle from "@/components/theme-toggle"
import { CalculatorIcon as Abacus, Calculator, FileText, PiggyBank, Receipt, Wallet } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 dark:from-background dark:to-primary/5 transition-colors duration-500">
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-10 -left-10 text-primary/10 dark:text-primary/5 animate-float-slow">
          <Calculator size={120} />
        </div>
        <div className="absolute top-1/4 -right-10 text-primary/10 dark:text-primary/5 animate-float">
          <Receipt size={100} />
        </div>
        <div className="absolute bottom-1/4 -left-10 text-primary/10 dark:text-primary/5 animate-float-medium">
          <FileText size={80} />
        </div>
        <div className="absolute -bottom-10 right-1/3 text-primary/10 dark:text-primary/5 animate-float-slow">
          <PiggyBank size={110} />
        </div>
        <div className="absolute top-1/3 left-1/4 text-primary/10 dark:text-primary/5 animate-float-medium">
          <Wallet size={90} />
        </div>
        <div className="absolute bottom-1/3 right-1/4 text-primary/10 dark:text-primary/5 animate-float">
          <Abacus size={70} />
        </div>
      </div>

      <header className="relative z-10 pt-6 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-primary text-primary-foreground p-2 rounded-lg">
              <Calculator className="h-6 w-6" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent-foreground bg-clip-text text-transparent">
              TaxWiz
            </h1>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <main className="relative z-10 flex flex-col items-center justify-between p-4 md:p-12 pt-6">
        <div className="w-full max-w-4xl">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold mb-3 animate-fade-in">Your AI Tax Assistant</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto animate-fade-in-delay">
              Ask questions about your taxes, upload documents, and get expert assistance
            </p>
          </div>

          <div className="bg-card/80 backdrop-blur-sm border border-border rounded-xl shadow-lg overflow-hidden animate-slide-up">
            <ChatInterface />
          </div>

          <div className="mt-8 text-center text-sm text-muted-foreground animate-fade-in-delay-2">
            <p>Imagine talking to your mom or dad about taxes… but without the part where you zone out or fake a bathroom break to escape. I keep it short and actually helpful. No lectures, just answers. Try me!</p>
          </div>
        </div>
      </main>
    </div>
  )
}


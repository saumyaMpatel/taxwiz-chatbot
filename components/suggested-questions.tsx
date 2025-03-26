import { Button } from '@/components/ui/button'

interface SuggestedQuestionsProps {
  onQuestionClick: (question: string) => void
}

export default function SuggestedQuestions({ onQuestionClick }: SuggestedQuestionsProps) {
  const questions = [
    "How do tax brackets work?",
    "What is the standard deduction for 2024?",
    "Can I deduct my home office expenses?",
    "What forms do I need for self-employment income?",
    "How do I report stock market gains?"
  ]
  
  return (
    <div className="flex flex-wrap gap-2 mt-4">
      {questions.map((question, index) => (
        <Button 
          key={index} 
          variant="outline" 
          size="sm" 
          onClick={() => onQuestionClick(question)}
          className="text-sm"
        >
          {question}
        </Button>
      ))}
    </div>
  )
}

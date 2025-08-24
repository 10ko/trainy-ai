import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { ChevronLeft, ChevronRight, CheckCircle, XCircle } from 'lucide-react'
import { CourseContent } from '../services/courseGeneration'
import { CourseProgress } from './CourseProgress'

interface CourseQuizProps {
  courseContent: CourseContent
  currentQuestionIndex: number
  isFirstQuestion: boolean
  isLastQuestion: boolean
  onPreviousQuestion: () => void
  onNextQuestion: () => void
  onGoHome: () => void
  onQuizComplete: () => void
}

export function CourseQuiz({
  courseContent,
  currentQuestionIndex,
  isFirstQuestion,
  isLastQuestion,
  onPreviousQuestion,
  onNextQuestion,
  onGoHome,
  onQuizComplete,
}: CourseQuizProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [hasAnswered, setHasAnswered] = useState(false)

  const currentQuestion = courseContent.quiz[currentQuestionIndex]
  const totalQuestions = courseContent.quiz.length
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100

  const handleAnswerSelect = (answerIndex: number) => {
    if (!hasAnswered) {
      setSelectedAnswer(answerIndex)
    }
  }

  const handleCheckAnswer = () => {
    if (selectedAnswer !== null) {
      setShowResult(true)
      setHasAnswered(true)
    }
  }

  const handleNext = () => {
    if (isLastQuestion) {
      onQuizComplete()
    } else {
      onNextQuestion()
      // Reset state for next question
      setSelectedAnswer(null)
      setShowResult(false)
      setHasAnswered(false)
    }
  }

  const handlePrevious = () => {
    onPreviousQuestion()
    // Reset state for previous question
    setSelectedAnswer(null)
    setShowResult(false)
    setHasAnswered(false)
  }

  const isCorrect = selectedAnswer === currentQuestion.correctAnswer

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Progress bar */}
      <CourseProgress
        progress={progress}
        currentStep={`Quiz ${currentQuestionIndex + 1}`}
        totalSteps={totalQuestions}
        onGoHome={onGoHome}
      />

      {/* Quiz content */}
      <div className="pt-20 px-4 pb-24">
        <div className="max-w-2xl mx-auto">
          <Card className="border-0 shadow-none bg-transparent">
            <CardHeader className="text-center pb-6">
              <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                Q{currentQuestionIndex + 1}
              </div>
              <CardTitle className="text-3xl font-bold break-words leading-tight px-4">
                Quiz Time!
              </CardTitle>
              <p className="text-lg text-muted-foreground mt-2 break-words px-4">
                Test your knowledge of {courseContent.title}
              </p>
            </CardHeader>
            <CardContent className="text-left">
              <div className="max-w-lg mx-auto">
                {/* Question */}
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-4 leading-relaxed">
                    {currentQuestion.question}
                  </h3>
                </div>

                {/* Answer Options */}
                <div className="space-y-3 mb-6">
                  {currentQuestion.options.map((option, index) => {
                    const isSelected = selectedAnswer === index
                    const isCorrectOption =
                      index === currentQuestion.correctAnswer

                    let buttonClass =
                      'w-full p-4 text-left border rounded-lg transition-all duration-200 '

                    if (!showResult) {
                      // Before checking answer
                      buttonClass += isSelected
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-muted-foreground/20 hover:border-primary/50 hover:bg-muted/50'
                    } else {
                      // After checking answer
                      if (isCorrectOption) {
                        buttonClass +=
                          'border-green-500 bg-green-50 text-green-700'
                      } else if (isSelected && !isCorrectOption) {
                        buttonClass += 'border-red-500 bg-red-50 text-red-700'
                      } else {
                        buttonClass +=
                          'border-muted-foreground/20 text-muted-foreground'
                      }
                    }

                    return (
                      <button
                        key={index}
                        onClick={() => handleAnswerSelect(index)}
                        disabled={hasAnswered}
                        className={buttonClass}
                      >
                        <div className="flex items-center justify-between">
                          <span className="flex-1">
                            <strong>{String.fromCharCode(65 + index)}.</strong>{' '}
                            {option}
                          </span>
                          {showResult && isCorrectOption && (
                            <CheckCircle className="h-5 w-5 text-green-600" />
                          )}
                          {showResult && isSelected && !isCorrectOption && (
                            <XCircle className="h-5 w-5 text-red-600" />
                          )}
                        </div>
                      </button>
                    )
                  })}
                </div>

                {/* Check Answer Button */}
                {!showResult && (
                  <div className="mb-6">
                    <Button
                      onClick={handleCheckAnswer}
                      disabled={selectedAnswer === null}
                      className="w-full h-12"
                    >
                      Check Answer
                    </Button>
                  </div>
                )}

                {/* Result and Explanation */}
                {showResult && (
                  <div className="mb-6">
                    <div
                      className={`p-4 rounded-lg mb-4 ${
                        isCorrect
                          ? 'bg-green-50 border border-green-200'
                          : 'bg-red-50 border border-red-200'
                      }`}
                    >
                      <div className="flex items-center mb-2">
                        {isCorrect ? (
                          <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-600 mr-2" />
                        )}
                        <span
                          className={`font-semibold ${
                            isCorrect ? 'text-green-700' : 'text-red-700'
                          }`}
                        >
                          {isCorrect ? 'Correct!' : 'Incorrect'}
                        </span>
                      </div>
                      <p
                        className={`text-sm ${
                          isCorrect ? 'text-green-700' : 'text-red-700'
                        }`}
                      >
                        {currentQuestion.explanation}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Navigation buttons */}
      {showResult && (
        <div className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-sm border-t p-4">
          <div className="max-w-2xl mx-auto flex items-center justify-between gap-4">
            <Button
              onClick={handlePrevious}
              disabled={isFirstQuestion}
              variant="outline"
              size="icon"
              className="w-12 h-12"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <div className="text-center flex-1 min-w-0">
              <p className="text-sm text-muted-foreground break-words leading-tight">
                Question {currentQuestionIndex + 1} of {totalQuestions}
              </p>
            </div>

            <Button
              onClick={handleNext}
              className="flex items-center gap-2 w-32 h-12"
            >
              {isLastQuestion ? 'Complete' : 'Next'}
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

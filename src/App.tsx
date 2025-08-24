import React, { useState, useEffect } from 'react'
import { isApiKeyConfigured } from './lib/openrouter'
import {
  generateStructuredCourseContent,
  CourseContent,
} from './services/courseGeneration'
import {
  CourseIntro,
  CourseStep,
  CourseQuiz,
  CourseSuccess,
  CourseInput,
  ConfigurationError,
} from './components'

function App() {
  const [courseContent, setCourseContent] = useState<CourseContent | null>(null)
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [apiKeyConfigured, setApiKeyConfigured] = useState(false)
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0)
  const [isInQuiz, setIsInQuiz] = useState(false)

  useEffect(() => {
    const configured = isApiKeyConfigured()
    setApiKeyConfigured(configured)
  }, [])

  const generateCourse = async () => {
    if (!input.trim() || isLoading || !apiKeyConfigured) return

    setInput('')
    setIsLoading(true)

    try {
      const response = await generateStructuredCourseContent(input)

      if (response.success && response.courseContent) {
        setCourseContent(response.courseContent)
        setCurrentStepIndex(-1) // Start at intro page
      } else {
        console.error('Error generating course:', response.error)
      }
    } catch (error) {
      console.error('Error generating course:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      generateCourse()
    }
  }

  const goToNextStep = () => {
    if (courseContent && currentStepIndex < courseContent.content.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1)
    } else if (
      courseContent &&
      currentStepIndex === courseContent.content.length - 1
    ) {
      // After last step, go to quiz
      setIsInQuiz(true)
      setCurrentQuizIndex(0)
    }
  }

  const goToPreviousStep = () => {
    if (currentStepIndex > -1) {
      setCurrentStepIndex(currentStepIndex - 1)
    }
  }

  const goToNextQuestion = () => {
    if (courseContent && currentQuizIndex < courseContent.quiz.length - 1) {
      setCurrentQuizIndex(currentQuizIndex + 1)
    }
  }

  const goToPreviousQuestion = () => {
    if (currentQuizIndex > 0) {
      setCurrentQuizIndex(currentQuizIndex - 1)
    } else {
      // Go back to last course step
      setIsInQuiz(false)
      setCurrentStepIndex(courseContent!.content.length - 1)
    }
  }

  const handleQuizComplete = () => {
    setIsInQuiz(false)
    setCurrentStepIndex(courseContent!.content.length) // Go to success page
  }

  const goToHome = () => {
    setCourseContent(null)
    setCurrentStepIndex(0)
    setCurrentQuizIndex(0)
    setIsInQuiz(false)
  }

  // Show configuration error if API key is not configured
  if (!apiKeyConfigured) {
    return <ConfigurationError />
  }

  // Show course content if available
  if (courseContent && courseContent.content.length > 0) {
    // Intro page (step -1)
    if (currentStepIndex === -1) {
      return (
        <CourseIntro
          courseContent={courseContent}
          onStartCourse={() => setCurrentStepIndex(0)}
          onGoHome={goToHome}
        />
      )
    }

    // Quiz section
    if (isInQuiz && courseContent.quiz && courseContent.quiz.length > 0) {
      const isFirstQuestion = currentQuizIndex === 0
      const isLastQuestion = currentQuizIndex === courseContent.quiz.length - 1

      return (
        <CourseQuiz
          courseContent={courseContent}
          currentQuestionIndex={currentQuizIndex}
          isFirstQuestion={isFirstQuestion}
          isLastQuestion={isLastQuestion}
          onPreviousQuestion={goToPreviousQuestion}
          onNextQuestion={goToNextQuestion}
          onGoHome={goToHome}
          onQuizComplete={handleQuizComplete}
        />
      )
    }

    // Success page (step after quiz completion)
    if (currentStepIndex === courseContent.content.length) {
      return (
        <CourseSuccess courseContent={courseContent} onBackToHome={goToHome} />
      )
    }

    // Regular course step
    const currentStep = courseContent.content[currentStepIndex]
    const isFirstStep = currentStepIndex === 0
    const isLastStep = currentStepIndex === courseContent.content.length - 1

    return (
      <CourseStep
        courseContent={courseContent}
        currentStep={currentStep}
        currentStepIndex={currentStepIndex}
        isFirstStep={isFirstStep}
        isLastStep={isLastStep}
        onPreviousStep={goToPreviousStep}
        onNextStep={goToNextStep}
        onGoHome={goToHome}
      />
    )
  }

  // Show course generation interface
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="py-6">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-foreground">Trainy AI</h1>
        </div>
      </div>

      <CourseInput
        input={input}
        isLoading={isLoading}
        courseContent={courseContent}
        onInputChange={setInput}
        onGenerateCourse={generateCourse}
        onKeyPress={handleKeyPress}
      />
    </div>
  )
}

export default App

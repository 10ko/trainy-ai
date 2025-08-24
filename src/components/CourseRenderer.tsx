import { CourseIntro, CourseStep, CourseQuiz, CourseSuccess } from './index'
import { CourseContent } from '../services/courseGeneration'

interface CourseRendererProps {
  courseContent: CourseContent
  currentStepIndex: number
  currentQuizIndex: number
  isInQuiz: boolean
  onStartCourse: () => void
  onPreviousStep: () => void
  onNextStep: () => void
  onPreviousQuestion: () => void
  onNextQuestion: () => void
  onQuizComplete: () => void
  onGoHome: () => void
}

export function CourseRenderer({
  courseContent,
  currentStepIndex,
  currentQuizIndex,
  isInQuiz,
  onStartCourse,
  onPreviousStep,
  onNextStep,
  onPreviousQuestion,
  onNextQuestion,
  onQuizComplete,
  onGoHome,
}: CourseRendererProps) {
  // Intro page (step -1)
  if (currentStepIndex === -1) {
    return (
      <CourseIntro
        courseContent={courseContent}
        onStartCourse={onStartCourse}
        onGoHome={onGoHome}
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
        onPreviousQuestion={onPreviousQuestion}
        onNextQuestion={onNextQuestion}
        onGoHome={onGoHome}
        onQuizComplete={onQuizComplete}
      />
    )
  }

  // Success page (step after quiz completion)
  if (currentStepIndex === courseContent.content.length) {
    return (
      <CourseSuccess courseContent={courseContent} onBackToHome={onGoHome} />
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
      onPreviousStep={onPreviousStep}
      onNextStep={onNextStep}
      onGoHome={onGoHome}
    />
  )
}

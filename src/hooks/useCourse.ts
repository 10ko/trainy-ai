import { useState } from 'react'
import { CourseContent } from '../services/courseGeneration'

export function useCourse() {
  const [courseContent, setCourseContent] = useState<CourseContent | null>(null)
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0)
  const [isInQuiz, setIsInQuiz] = useState(false)

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

  const resetCourse = () => {
    setCourseContent(null)
    setCurrentStepIndex(0)
    setCurrentQuizIndex(0)
    setIsInQuiz(false)
  }

  const startCourse = (content: CourseContent) => {
    setCourseContent(content)
    setCurrentStepIndex(-1) // Start at intro page
    setIsInQuiz(false)
    setCurrentQuizIndex(0)
  }

  return {
    courseContent,
    currentStepIndex,
    currentQuizIndex,
    isInQuiz,
    goToNextStep,
    goToPreviousStep,
    goToNextQuestion,
    goToPreviousQuestion,
    handleQuizComplete,
    resetCourse,
    startCourse,
    setCurrentStepIndex,
  }
}

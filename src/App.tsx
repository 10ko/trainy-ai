import { useState, useEffect } from 'react'
import { isApiKeyConfigured } from './lib/openrouter'
import { useCourse } from './hooks/useCourse'
import { ConfigurationError, HomePage, CourseRenderer } from './components'

function App() {
  const [apiKeyConfigured, setApiKeyConfigured] = useState(false)
  const course = useCourse()

  useEffect(() => {
    const configured = isApiKeyConfigured()
    setApiKeyConfigured(configured)
  }, [])

  const handleCourseGenerated = (courseContent: any) => {
    course.startCourse(courseContent)
  }

  // Show configuration error if API key is not configured
  if (!apiKeyConfigured) {
    return <ConfigurationError />
  }

  // Show course content if available
  if (course.courseContent && course.courseContent.content.length > 0) {
    return (
      <CourseRenderer
        courseContent={course.courseContent}
        currentStepIndex={course.currentStepIndex}
        currentQuizIndex={course.currentQuizIndex}
        isInQuiz={course.isInQuiz}
        onStartCourse={() => course.setCurrentStepIndex(0)}
        onPreviousStep={course.goToPreviousStep}
        onNextStep={course.goToNextStep}
        onPreviousQuestion={course.goToPreviousQuestion}
        onNextQuestion={course.goToNextQuestion}
        onQuizComplete={course.handleQuizComplete}
        onGoHome={course.resetCourse}
      />
    )
  }

  // Show course generation interface
  return <HomePage onCourseGenerated={handleCourseGenerated} />
}

export default App

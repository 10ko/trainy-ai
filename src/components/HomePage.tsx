import { useState } from 'react'
import { generateStructuredCourseContent } from '../services/courseGeneration'
import { CourseInput } from './CourseInput'

interface HomePageProps {
  onCourseGenerated: (courseContent: any) => void
}

export function HomePage({ onCourseGenerated }: HomePageProps) {
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const generateCourse = async () => {
    if (!input.trim() || isLoading) return

    setInput('')
    setIsLoading(true)

    try {
      const response = await generateStructuredCourseContent(input)

      if (response.success && response.courseContent) {
        onCourseGenerated(response.courseContent)
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
        courseContent={null}
        onInputChange={setInput}
        onGenerateCourse={generateCourse}
        onKeyPress={handleKeyPress}
      />
    </div>
  )
}

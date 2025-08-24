import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { BookOpen } from 'lucide-react'
import { CourseContent } from '../services/courseGeneration'
import { CourseProgress } from './CourseProgress'

interface CourseIntroProps {
  courseContent: CourseContent
  onStartCourse: () => void
  onGoHome: () => void
}

export function CourseIntro({
  courseContent,
  onStartCourse,
  onGoHome,
}: CourseIntroProps) {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Progress bar */}
      <CourseProgress progress={0} currentStep="Intro" onGoHome={onGoHome} />

      {/* Intro content */}
      <div className="pt-20 px-4 pb-24">
        <div className="max-w-2xl mx-auto">
          <Card className="border-0 shadow-none bg-transparent">
            <CardHeader className="pb-6">
              <div className="text-center mb-6">
                <BookOpen className="h-16 w-16 text-primary mx-auto" />
              </div>
              <div className="text-center">
                <CardTitle className="text-4xl font-bold break-words leading-tight mb-4">
                  {courseContent.title}
                </CardTitle>
                <p className="text-xl text-muted-foreground break-words leading-relaxed">
                  {courseContent.description}
                </p>
              </div>
            </CardHeader>
            <CardContent className="text-center">
              <Button
                onClick={onStartCourse}
                className="w-48 h-14 text-lg font-semibold"
              >
                Start Course
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

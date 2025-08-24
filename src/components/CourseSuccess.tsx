
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { CheckCircle } from 'lucide-react';
import { CourseContent } from '../services/courseGeneration';
import { CourseProgress } from './CourseProgress';

interface CourseSuccessProps {
  courseContent: CourseContent;
  onBackToHome: () => void;
}

export function CourseSuccess({ courseContent, onBackToHome }: CourseSuccessProps) {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Progress bar */}
      <CourseProgress
        progress={100}
        currentStep="Complete!"
        onGoHome={onBackToHome}
      />

      {/* Success content */}
      <div className="pt-20 px-4 pb-24">
        <div className="max-w-2xl mx-auto">
          <Card className="border-0 shadow-none bg-transparent">
            <CardHeader className="text-center pb-6">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
              <CardTitle className="text-4xl font-bold break-words leading-tight px-4 mb-4">
                Congratulations!
              </CardTitle>
              <p className="text-xl text-muted-foreground break-words px-4 leading-relaxed">
                You have successfully completed the course: <strong>{courseContent.title}</strong>
              </p>
            </CardHeader>
            <CardContent className="text-center">
              <Button
                onClick={onBackToHome}
                className="w-48 h-14 text-lg font-semibold"
              >
                Back to Home
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

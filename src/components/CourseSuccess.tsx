
import { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { CheckCircle } from 'lucide-react';
import { CourseContent } from '../services/courseGeneration';
import { CourseProgress } from './CourseProgress';
import confetti from 'canvas-confetti';

interface CourseSuccessProps {
  courseContent: CourseContent;
  onBackToHome: () => void;
}

export function CourseSuccess({ courseContent, onBackToHome }: CourseSuccessProps) {
  useEffect(() => {
    // Trigger confetti animation when component mounts
    const triggerConfetti = () => {
      // Create a burst of confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#3b82f6', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444']
      });

      // Add some delayed confetti for a more dynamic effect
      setTimeout(() => {
        confetti({
          particleCount: 50,
          spread: 50,
          origin: { y: 0.7, x: 0.3 },
          colors: ['#ec4899', '#8b5cf6', '#06b6d4', '#f59e0b']
        });
      }, 200);

      setTimeout(() => {
        confetti({
          particleCount: 50,
          spread: 50,
          origin: { y: 0.7, x: 0.7 },
          colors: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444']
        });
      }, 400);
    };

    triggerConfetti();
  }, []);

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
            <CardHeader className="text-center pb-16">
              <CheckCircle className="h-16 w-16 text-primary mx-auto mb-6 animate-bounce" style={{ animationDuration: '2s', animationIterationCount: 'infinite' }} />
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


import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { CourseContent, CourseStep as CourseStepType } from '../services/courseGeneration';
import { CourseProgress } from './CourseProgress';

interface CourseStepProps {
  courseContent: CourseContent;
  currentStep: CourseStepType;
  currentStepIndex: number;
  isFirstStep: boolean;
  isLastStep: boolean;
  onPreviousStep: () => void;
  onNextStep: () => void;
  onGoHome: () => void;
}

export function CourseStep({
  courseContent,
  currentStep,
  currentStepIndex,
  isFirstStep,
  isLastStep,
  onPreviousStep,
  onNextStep,
  onGoHome
}: CourseStepProps) {
  const progress = ((currentStepIndex + 1) / courseContent.content.length) * 100;
  
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Progress bar */}
      <CourseProgress
        progress={progress}
        currentStep={currentStepIndex + 1}
        totalSteps={courseContent.content.length}
        onGoHome={onGoHome}
      />

      {/* Step content */}
      <div className="pt-20 px-4 pb-24">
        <div className="max-w-2xl mx-auto">
          <Card className="border-0 shadow-none bg-transparent">
            <CardHeader className="text-center pb-6">
              <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                {currentStep.step}
              </div>
              <CardTitle className="text-3xl font-bold break-words leading-tight px-4">
                {currentStep.title}
              </CardTitle>
              <p className="text-lg text-muted-foreground mt-2 break-words px-4">
                {courseContent.title}
              </p>
            </CardHeader>
            <CardContent className="text-left">
              <div className="text-lg leading-relaxed max-w-lg mx-auto">
                {currentStep.content}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Navigation buttons */}
      <div className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-sm border-t p-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between gap-4">
          <Button
            onClick={onPreviousStep}
            disabled={isFirstStep}
            variant="outline"
            size="icon"
            className="w-12 h-12"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <div className="text-center flex-1 min-w-0">
            <p className="text-sm text-muted-foreground break-words leading-tight">
              {currentStep.title}
            </p>
          </div>

          <Button
            onClick={onNextStep}
            className="flex items-center gap-2 w-32 h-12"
          >
            {isLastStep ? 'Complete' : 'Next'}
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

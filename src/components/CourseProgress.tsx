
import { Button } from './ui/button';
import { Home } from 'lucide-react';

interface CourseProgressProps {
  progress: number;
  currentStep: string | number;
  totalSteps?: number;
  onGoHome: () => void;
}

export function CourseProgress({ progress, currentStep, totalSteps, onGoHome }: CourseProgressProps) {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm">
      <div className="flex items-center justify-between p-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onGoHome}
          className="h-8 w-8"
        >
          <Home className="h-4 w-4" />
        </Button>
        <div className="flex-1 mx-4">
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        <span className="text-sm text-muted-foreground">
          {totalSteps ? `${currentStep} / ${totalSteps}` : currentStep}
        </span>
      </div>
    </div>
  );
}

import React from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { BookOpen, Send } from 'lucide-react';

interface CourseInputProps {
  input: string;
  isLoading: boolean;
  courseContent: any;
  onInputChange: (value: string) => void;
  onGenerateCourse: () => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
}

export function CourseInput({
  input,
  isLoading,
  courseContent,
  onInputChange,
  onGenerateCourse,
  onKeyPress
}: CourseInputProps) {
  return (
    <>
      {/* Course Content */}
      <div className="container mx-auto px-4 py-4 max-w-4xl">
        {!courseContent && !isLoading && (
          <Card className="text-center py-8">
            <CardContent>
              <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">
                Describe the course you want to generate below.
              </p>
            </CardContent>
          </Card>
        )}
        
        {isLoading && (
          <Card className="text-center py-8">
            <CardContent>
              <div className="flex items-center justify-center space-x-2 mb-4">
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
              <p className="text-muted-foreground">Generating your course content...</p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Input */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex gap-2">
            <Textarea
              value={input}
              onChange={(e) => onInputChange(e.target.value)}
              onKeyPress={onKeyPress}
              placeholder="Describe the course you want to generate (e.g., 'Create a 3-step course on React basics')..."
              className="min-h-[44px] max-h-32 resize-none"
              disabled={isLoading}
            />
            <Button
              onClick={onGenerateCourse}
              disabled={!input.trim() || isLoading}
              size="icon"
              className="h-[44px] w-[44px] flex-shrink-0"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { BookOpen, Sparkles } from 'lucide-react';

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
      {/* Course Content - Using same style as CourseIntro */}
      <div className="pt-20 px-4 pb-24">
        <div className="max-w-4xl mx-auto">
          {!courseContent && !isLoading && (
            <Card className="border-0 shadow-none bg-transparent">
              <CardHeader className="text-center pb-6">
                <BookOpen className="h-16 w-16 text-primary mx-auto mb-6" />
                <CardTitle className="text-4xl font-bold break-words leading-tight px-4 mb-4">
                  What would you like to learn today?
                </CardTitle>
                <p className="text-xl text-muted-foreground break-words px-4 leading-relaxed">
                  Describe the course you want to generate below.
                </p>
              </CardHeader>
              <CardContent className="text-center">
                <div className="w-full max-w-3xl mx-auto">
                  <div className="w-full mb-4">
                    <Textarea
                      value={input}
                      onChange={(e) => onInputChange(e.target.value)}
                      onKeyPress={onKeyPress}
                      placeholder="e.g., 'Create a 3-step course on React basics'"
                      className="w-full min-h-[90px] max-h-[90px] resize-none bg-muted/30 rounded-lg px-3 py-2 text-base placeholder:text-muted-foreground/60 border border-muted-foreground/20 focus:border-primary/60"
                      disabled={isLoading}
                      rows={3}
                    />
                  </div>
                  <Button
                    onClick={onGenerateCourse}
                    disabled={!input.trim() || isLoading}
                    className="w-full h-14 rounded-lg bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-lg font-semibold"
                  >
                    <Sparkles className="h-5 w-5 mr-2" />
                    Generate Course
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
          
          {isLoading && (
            <Card className="border-0 shadow-none bg-transparent">
              <CardHeader className="text-center pb-6">
                <BookOpen className="h-16 w-16 text-primary mx-auto mb-6" />
                <CardTitle className="text-4xl font-bold break-words leading-tight px-4 mb-4">
                  Creating your course...
                </CardTitle>
                <p className="text-xl text-muted-foreground break-words px-4 leading-relaxed">
                  This will just take a moment
                </p>
              </CardHeader>
              <CardContent className="text-center">
                <div className="flex items-center justify-center space-x-2 mb-4">
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </>
  );
}

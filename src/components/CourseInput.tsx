import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
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
      {/* Course Content - Using same style as CourseIntro */}
      <div className="pt-20 px-4 pb-24">
        <div className="max-w-2xl mx-auto">
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
                <div className="max-w-lg mx-auto">
                  <div className="flex gap-3 items-end mb-6">
                    <div className="flex-1">
                      <Textarea
                        value={input}
                        onChange={(e) => onInputChange(e.target.value)}
                        onKeyPress={onKeyPress}
                        placeholder="e.g., 'Create a 3-step course on React basics'"
                        className="min-h-[60px] max-h-40 resize-none border-0 shadow-none bg-muted/30 rounded-2xl px-6 py-4 text-base placeholder:text-muted-foreground/60 focus:bg-muted/50 focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                        disabled={isLoading}
                      />
                    </div>
                    <Button
                      onClick={onGenerateCourse}
                      disabled={!input.trim() || isLoading}
                      size="icon"
                      className="h-[60px] w-[60px] rounded-2xl bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send className="h-5 w-5" />
                    </Button>
                  </div>
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

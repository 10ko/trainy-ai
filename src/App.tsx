import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Button } from './components/ui/button';
import { Textarea } from './components/ui/textarea';
import { isApiKeyConfigured } from './lib/openrouter';
import { CourseGenerationService, CourseContent, CourseStep } from './services/courseGeneration';
import { Send, AlertCircle, BookOpen, CheckCircle } from 'lucide-react';

function App() {
  const [courseContent, setCourseContent] = useState<CourseContent | null>(null);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiKeyConfigured, setApiKeyConfigured] = useState(false);

  useEffect(() => {
    setApiKeyConfigured(isApiKeyConfigured());
  }, []);

  const generateCourse = async () => {
    if (!input.trim() || isLoading || !apiKeyConfigured) return;

    setInput('');
    setIsLoading(true);

    try {
      const response = await CourseGenerationService.generateStructuredCourseContent(input);
      
      if (response.success && response.courseContent) {
        setCourseContent(response.courseContent);
      } else {
        console.error('Error generating course:', response.error);
      }
    } catch (error) {
      console.error('Error generating course:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      generateCourse();
    }
  };

  if (!apiKeyConfigured) {
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="max-w-md mx-auto mt-20">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-destructive">
                <AlertCircle className="h-5 w-5" />
                Configuration Required
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Please set the <code className="bg-muted px-1 py-0.5 rounded">VITE_OPENROUTER_API_KEY</code> environment variable to use this app.
              </p>
              <p className="text-xs text-muted-foreground">
                Create a <code className="bg-muted px-1 py-0.5 rounded">.env.local</code> file in your project root with:
              </p>
              <pre className="bg-muted p-2 rounded mt-2 text-xs overflow-x-auto">
                VITE_OPENROUTER_API_KEY=your_api_key_here
              </pre>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-xl font-semibold text-center">Course Content Generator</h1>
        </div>
      </div>

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
        
        {courseContent && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">{courseContent.title}</CardTitle>
                <p className="text-muted-foreground">{courseContent.description}</p>
              </CardHeader>
            </Card>
            
            <div className="space-y-4">
              {courseContent.content.map((step: CourseStep) => (
                <Card key={step.step}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold">
                        {step.step}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                        <p className="text-muted-foreground">{step.content}</p>
                      </div>
                      <CheckCircle className="h-5 w-5 text-green-500 mt-1" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
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
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Describe the course you want to generate (e.g., 'Create a 3-step course on React basics')..."
              className="min-h-[44px] max-h-32 resize-none"
              disabled={isLoading}
            />
            <Button
              onClick={generateCourse}
              disabled={!input.trim() || isLoading}
              size="icon"
              className="h-[44px] w-[44px] flex-shrink-0"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

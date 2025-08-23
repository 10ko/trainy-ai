import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Button } from './components/ui/button';
import { Textarea } from './components/ui/textarea';
import { isApiKeyConfigured } from './lib/openrouter';
import { CourseGenerationService, CourseContent, CourseStep } from './services/courseGeneration';
import { Send, AlertCircle, BookOpen, CheckCircle, ChevronLeft, ChevronRight, Home } from 'lucide-react';

function App() {
  const [courseContent, setCourseContent] = useState<CourseContent | null>(null);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiKeyConfigured, setApiKeyConfigured] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

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
        setCurrentStepIndex(-1); // Start at intro page
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

  const goToNextStep = () => {
    if (courseContent && currentStepIndex < courseContent.content.length) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  const goToPreviousStep = () => {
    if (currentStepIndex > -1) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const goToHome = () => {
    setCourseContent(null);
    setCurrentStepIndex(0);
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

  // Show course step in full screen
  if (courseContent && courseContent.content.length > 0) {
    const currentStep = courseContent.content[currentStepIndex];
    const isFirstStep = currentStepIndex === -1;
    const isLastStep = currentStepIndex === courseContent.content.length;
    
    // Intro page (step -1)
    if (currentStepIndex === -1) {
      return (
        <div className="min-h-screen bg-background relative overflow-hidden">
          {/* Progress bar */}
          <div className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm">
            <div className="flex items-center justify-between p-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={goToHome}
                className="h-8 w-8"
              >
                <Home className="h-4 w-4" />
              </Button>
              <div className="flex-1 mx-4">
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${0}%` }}
                  />
                </div>
              </div>
              <span className="text-sm text-muted-foreground">
                Intro
              </span>
            </div>
          </div>

          {/* Intro content */}
          <div className="pt-20 px-4 pb-24">
            <div className="max-w-2xl mx-auto">
              <Card className="border-0 shadow-none bg-transparent">
                <CardHeader className="text-center pb-6">
                  <BookOpen className="h-16 w-16 text-primary mx-auto mb-6" />
                  <CardTitle className="text-4xl font-bold break-words leading-tight px-4 mb-4">
                    {courseContent.title}
                  </CardTitle>
                  <p className="text-xl text-muted-foreground break-words px-4 leading-relaxed">
                    {courseContent.description}
                  </p>
                </CardHeader>
                <CardContent className="text-center">
                  <Button
                    onClick={() => setCurrentStepIndex(0)}
                    className="w-48 h-14 text-lg font-semibold"
                  >
                    Start Course
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      );
    }
    
    // Success page (step after last)
    if (currentStepIndex === courseContent.content.length) {
      return (
        <div className="min-h-screen bg-background relative overflow-hidden">
          {/* Progress bar */}
          <div className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm">
            <div className="flex items-center justify-between p-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={goToHome}
                className="h-8 w-8"
              >
                <Home className="h-4 w-4" />
              </Button>
              <div className="flex-1 mx-4">
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${100}%` }}
                  />
                </div>
              </div>
              <span className="text-sm text-muted-foreground">
                Complete!
              </span>
            </div>
          </div>

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
                    onClick={goToHome}
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

    return (
      <div 
        className="min-h-screen bg-background relative overflow-hidden"
      >
        {/* Progress bar */}
        <div className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm">
          <div className="flex items-center justify-between p-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={goToHome}
              className="h-8 w-8"
            >
              <Home className="h-4 w-4" />
            </Button>
            <div className="flex-1 mx-4">
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentStepIndex + 1) / courseContent.content.length) * 100}%` }}
                />
              </div>
            </div>
            <span className="text-sm text-muted-foreground">
              {currentStepIndex + 1} / {courseContent.content.length}
            </span>
          </div>
        </div>

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
              onClick={goToPreviousStep}
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
              onClick={goToNextStep}
              disabled={isLastStep}
              className="flex items-center gap-2 w-32 h-12"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>


      </div>
    );
  }

  // Show course generation interface
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

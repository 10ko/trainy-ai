
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { AlertCircle } from 'lucide-react';

export function ConfigurationError() {
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

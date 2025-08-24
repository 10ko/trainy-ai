
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { AlertCircle } from 'lucide-react';

export function ConfigurationError() {
  console.log('ConfigurationError component rendered');
  
  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-md mx-auto mt-20">
        <Card className="border-2 border-red-300 bg-red-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-700 text-lg">
              <AlertCircle className="h-6 w-6" />
              Configuration Required
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-700 mb-4">
              Please set the <code className="bg-red-100 px-2 py-1 rounded border border-red-200">VITE_OPENROUTER_API_KEY</code> environment variable to use this app.
            </p>
            <p className="text-xs text-gray-600 mb-2">
              Create a <code className="bg-red-100 px-2 py-1 rounded border border-red-200">.env.local</code> file in your project root with:
            </p>
            <pre className="bg-red-100 p-3 rounded mt-2 text-xs overflow-x-auto border border-red-200">
              VITE_OPENROUTER_API_KEY=your_api_key_here
            </pre>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

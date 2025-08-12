import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Home, Search, ArrowLeft, Stethoscope } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="container mx-auto p-6 min-h-[70vh] flex items-center justify-center">
      <Card className="max-w-2xl w-full text-center">
        <CardHeader>
          <div className="mx-auto mb-6">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 rounded-full flex items-center justify-center">
              <span className="text-4xl font-bold text-blue-600 dark:text-blue-400">404</span>
            </div>
          </div>
          <CardTitle className="text-2xl mb-2">Page Not Found</CardTitle>
          <CardDescription className="text-lg">
            Sorry, we couldn't find the page you're looking for. It might have been moved, 
            deleted, or you may have typed the wrong URL.
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/">
              <Button className="w-full h-16 flex flex-col space-y-2">
                <Home className="h-6 w-6" />
                <span>Go Home</span>
              </Button>
            </Link>
            
            <Link href="/medicines">
              <Button variant="outline" className="w-full h-16 flex flex-col space-y-2">
                <Search className="h-6 w-6" />
                <span>Search Medicines</span>
              </Button>
            </Link>
          </div>

          <div className="text-center">
            <p className="text-muted-foreground mb-4">
              Or try one of these popular features:
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <Link href="/consultation">
                <Button variant="ghost" size="sm">
                  <Stethoscope className="h-4 w-4 mr-2" />
                  AI Consultation
                </Button>
              </Link>
              <Link href="/symptom-checker">
                <Button variant="ghost" size="sm">
                  Symptom Checker
                </Button>
              </Link>
              <Link href="/prescription-analysis">
                <Button variant="ghost" size="sm">
                  Prescription Analysis
                </Button>
              </Link>
              <Link href="/help-center">
                <Button variant="ghost" size="sm">
                  Help Center
                </Button>
              </Link>
            </div>
          </div>

          <div className="pt-4 border-t">
            <Button variant="ghost" onClick={() => window.history.back()}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Go Back
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
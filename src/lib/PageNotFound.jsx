import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function PageNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="text-center max-w-md">
        <h1 className="text-7xl font-heading font-bold text-accent">404</h1>
        <h2 className="text-2xl font-heading font-semibold mt-4">Page Not Found</h2>
        <p className="text-muted-foreground mt-2">The page you're looking for doesn't exist or has been moved.</p>
        <Button asChild className="mt-6 rounded-full">
          <Link to="/">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
          </Link>
        </Button>
      </div>
    </div>
  );
}
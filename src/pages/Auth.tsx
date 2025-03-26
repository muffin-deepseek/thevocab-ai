
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Auth: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">GRE Vocabulary Builder</CardTitle>
          <CardDescription>This page is under maintenance</CardDescription>
        </CardHeader>
        <CardContent className="text-center py-6">
          <p>The authentication functionality has been removed from this application.</p>
          <p className="mt-2 text-sm text-muted-foreground">Please navigate back to the main page.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;

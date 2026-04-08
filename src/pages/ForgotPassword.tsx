
import React, { useState } from 'react';
import PageTransition from '@/components/layout/PageTransition';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/context/AuthContext';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const { resetPassword, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await resetPassword(email);
      setIsSubmitted(true);
    } catch (error) {
      // Error is handled in the auth context
    }
  };

  return (
    <PageTransition>
      <div className="flex min-h-screen items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              <span className="text-primary">Med</span>Triage
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Your health is our priority
            </p>
          </div>
          
          <Card>
            <form onSubmit={handleSubmit}>
              <CardHeader>
                <CardTitle>Reset Password</CardTitle>
                <CardDescription>
                  {isSubmitted 
                    ? "Check your email for reset instructions" 
                    : "Enter your email address to receive a password reset link"}
                </CardDescription>
              </CardHeader>
              
              {!isSubmitted ? (
                <>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">
                          Email
                        </label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="you@example.com"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      type="submit" 
                      className="w-full" 
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
                          Sending...
                        </>
                      ) : (
                        'Send Reset Instructions'
                      )}
                    </Button>
                  </CardFooter>
                </>
              ) : (
                <CardContent className="text-center py-6">
                  <p className="mb-4">
                    We've sent password reset instructions to <strong>{email}</strong>. 
                  </p>
                  <p className="text-sm text-gray-500 mb-6">
                    If you don't see it in your inbox, please check your spam folder.
                  </p>
                  <Button variant="outline" asChild>
                    <Link to="/auth" className="flex items-center justify-center">
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back to Login
                    </Link>
                  </Button>
                </CardContent>
              )}
            </form>
          </Card>
          
          {!isSubmitted && (
            <div className="mt-6 text-center">
              <Link to="/auth" className="text-sm text-primary hover:underline">
                Back to Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
};

export default ForgotPassword;


import React, { useState } from 'react';
import PageTransition from '@/components/layout/PageTransition';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/context/AuthContext';
import { Eye, EyeOff, Loader2 } from 'lucide-react';

const ResetPassword = () => {
  const { updatePassword, loading } = useAuth();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    
    setError(null);
    
    try {
      await updatePassword(password);
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
              Create a new password
            </p>
          </div>
          
          <Card>
            <form onSubmit={handleSubmit}>
              <CardHeader>
                <CardTitle>Set New Password</CardTitle>
                <CardDescription>
                  Choose a strong, secure password for your account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {error && (
                    <div className="bg-red-50 text-red-600 px-4 py-2 rounded-md text-sm">
                      {error}
                    </div>
                  )}
                  
                  <div className="space-y-2">
                    <label htmlFor="password" className="text-sm font-medium">
                      New Password
                    </label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="confirmPassword" className="text-sm font-medium">
                      Confirm Password
                    </label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="••••••••"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
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
                      Updating Password...
                    </>
                  ) : (
                    'Update Password'
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </PageTransition>
  );
};

export default ResetPassword;

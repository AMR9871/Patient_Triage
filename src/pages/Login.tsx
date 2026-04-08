
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { cn } from "@/lib/utils";
import PageTransition from '@/components/layout/PageTransition';
import Navbar from '@/components/Navbar';
import { User, Key, Fingerprint, CreditCard, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';

const Login = () => {
  const [authMethod, setAuthMethod] = useState<'manual' | 'aadhaar' | 'abha' | 'cdsimer'>('manual');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [aadhaarNumber, setAadhaarNumber] = useState('');
  const [abhaId, setAbhaId] = useState('');
  const [cdsimerId, setCdsimerId] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate authentication process
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Successfully logged in');
      navigate('/dashboard');
    }, 1500);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <PageTransition>
      <Navbar />
      
      <main className="bg-gradient-to-br from-blue-50 to-white">
        <div className="page-container min-h-[calc(100vh-64px)] flex flex-col items-center justify-center py-12">
          <div className="w-full max-w-md p-8 glass-card rounded-2xl deep-shadow">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-semibold text-foreground">Welcome Back</h1>
              <p className="mt-2 text-muted-foreground">Log in to access your medical dashboard</p>
            </div>
            
            <div className="flex mb-6 border border-border rounded-lg">
              <button
                onClick={() => setAuthMethod('manual')}
                className={cn(
                  "flex-1 py-2 text-sm font-medium rounded-l-md transition-colors",
                  authMethod === 'manual'
                    ? "bg-primary text-primary-foreground"
                    : "bg-transparent text-muted-foreground hover:bg-secondary"
                )}
              >
                Manual
              </button>
              <button
                onClick={() => setAuthMethod('aadhaar')}
                className={cn(
                  "flex-1 py-2 text-sm font-medium transition-colors",
                  authMethod === 'aadhaar'
                    ? "bg-primary text-primary-foreground"
                    : "bg-transparent text-muted-foreground hover:bg-secondary"
                )}
              >
                Aadhaar
              </button>
              <button
                onClick={() => setAuthMethod('abha')}
                className={cn(
                  "flex-1 py-2 text-sm font-medium transition-colors",
                  authMethod === 'abha'
                    ? "bg-primary text-primary-foreground"
                    : "bg-transparent text-muted-foreground hover:bg-secondary"
                )}
              >
                ABHA
              </button>
              <button
                onClick={() => setAuthMethod('cdsimer')}
                className={cn(
                  "flex-1 py-2 text-sm font-medium rounded-r-md transition-colors",
                  authMethod === 'cdsimer'
                    ? "bg-primary text-primary-foreground"
                    : "bg-transparent text-muted-foreground hover:bg-secondary"
                )}
              >
                CDSIMER
              </button>
            </div>
            
            <form onSubmit={handleAuth}>
              {authMethod === 'manual' && (
                <>
                  <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium mb-1 text-foreground">
                      Email
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
                        <User size={16} />
                      </div>
                      <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="your.email@example.com"
                        className="w-full pl-10 pr-4 py-2.5 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="password" className="block text-sm font-medium mb-1 text-foreground">
                      Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
                        <Key size={16} />
                      </div>
                      <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="••••••••"
                        className="w-full pl-10 pr-10 py-2.5 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>
                </>
              )}
              
              {authMethod === 'aadhaar' && (
                <div className="mb-6">
                  <label htmlFor="aadhaar" className="block text-sm font-medium mb-1 text-foreground">
                    Aadhaar Number
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
                      <CreditCard size={16} />
                    </div>
                    <input
                      id="aadhaar"
                      type="text"
                      value={aadhaarNumber}
                      onChange={(e) => setAadhaarNumber(e.target.value.replace(/\D/g, '').substring(0, 12))}
                      required
                      placeholder="XXXX XXXX XXXX"
                      className="w-full pl-10 pr-4 py-2.5 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <p className="text-sm text-muted-foreground">Verify with biometrics</p>
                    <button
                      type="button"
                      className="p-2 bg-secondary rounded-lg text-foreground hover:bg-secondary/80 transition-colors"
                    >
                      <Fingerprint size={20} />
                    </button>
                  </div>
                </div>
              )}
              
              {authMethod === 'abha' && (
                <div className="mb-6">
                  <label htmlFor="abha" className="block text-sm font-medium mb-1 text-foreground">
                    ABHA ID
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
                      <CreditCard size={16} />
                    </div>
                    <input
                      id="abha"
                      type="text"
                      value={abhaId}
                      onChange={(e) => setAbhaId(e.target.value)}
                      required
                      placeholder="Enter your ABHA ID"
                      className="w-full pl-10 pr-4 py-2.5 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                </div>
              )}
              
              {authMethod === 'cdsimer' && (
                <div className="mb-6">
                  <label htmlFor="cdsimer" className="block text-sm font-medium mb-1 text-foreground">
                    CDSIMER ID
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
                      <CreditCard size={16} />
                    </div>
                    <input
                      id="cdsimer"
                      type="text"
                      value={cdsimerId}
                      onChange={(e) => setCdsimerId(e.target.value)}
                      required
                      placeholder="Enter your CDSIMER ID"
                      className="w-full pl-10 pr-4 py-2.5 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                </div>
              )}
              
              <button
                type="submit"
                disabled={isLoading}
                className={cn(
                  "w-full py-3 rounded-lg bg-primary text-primary-foreground font-medium transition-colors interactive-button",
                  isLoading ? "opacity-70 cursor-not-allowed" : "hover:bg-primary/90"
                )}
              >
                {isLoading ? "Authenticating..." : "Login"}
              </button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Don't have an account?{' '}
                <Link to="/registration" className="text-primary hover:underline">
                  Register
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </PageTransition>
  );
};

export default Login;

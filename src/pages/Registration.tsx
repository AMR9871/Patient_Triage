
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { cn } from "@/lib/utils";
import PageTransition from '@/components/layout/PageTransition';
import Navbar from '@/components/Navbar';
import { User, Calendar, MapPin, Phone, Mail, Eye, EyeOff, ArrowRight, ArrowLeft, Check } from 'lucide-react';
import { toast } from 'sonner';

interface RegistrationData {
  firstName: string;
  lastName: string;
  dob: string;
  gender: 'male' | 'female' | 'other';
  address: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Registration = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState<RegistrationData>({
    firstName: '',
    lastName: '',
    dob: '',
    gender: 'male',
    address: '',
    city: '',
    state: '',
    pincode: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNext = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate registration process
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Registration successful!');
      navigate('/login');
    }, 1500);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <PageTransition>
      <Navbar />
      
      <main className="bg-gradient-to-br from-blue-50 to-white">
        <div className="page-container min-h-[calc(100vh-64px)] flex flex-col items-center justify-center py-12">
          <div className="w-full max-w-2xl glass-card rounded-2xl p-8 deep-shadow">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-semibold text-foreground">Create Your Account</h1>
              <p className="mt-2 text-muted-foreground">Register to access our patient triage system</p>
            </div>
            
            {/* Progress Steps */}
            <div className="flex items-center justify-between mb-8 px-8">
              <div className="relative w-full flex items-center">
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium z-10",
                  currentStep >= 1 
                    ? "bg-primary text-white" 
                    : "bg-secondary text-muted-foreground"
                )}>
                  {currentStep > 1 ? <Check size={16} /> : "1"}
                </div>
                <div className={cn(
                  "absolute h-0.5 w-full left-0 right-0 top-4 -z-0",
                  currentStep > 1 ? "bg-primary" : "bg-secondary"
                )} />
                <div className={cn(
                  "absolute w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium right-0 z-10",
                  currentStep >= 2 
                    ? "bg-primary text-white" 
                    : "bg-secondary text-muted-foreground"
                )}>
                  {currentStep > 2 ? <Check size={16} /> : "2"}
                </div>
                <div className={cn(
                  "absolute h-0.5 w-full left-0 right-0 top-4 -z-0",
                  currentStep > 2 ? "bg-primary" : "bg-secondary"
                )} />
                <div className={cn(
                  "absolute w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium right-0 z-10",
                  currentStep >= 3 
                    ? "bg-primary text-white" 
                    : "bg-secondary text-muted-foreground"
                )}>
                  3
                </div>
              </div>
            </div>
            
            <form onSubmit={handleSubmit}>
              {/* Step 1: Personal Information */}
              {currentStep === 1 && (
                <div className="space-y-4 animate-fade-in">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium mb-1 text-foreground">
                        First Name
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
                          <User size={16} />
                        </div>
                        <input
                          id="firstName"
                          name="firstName"
                          type="text"
                          required
                          value={formData.firstName}
                          onChange={handleInputChange}
                          placeholder="John"
                          className="w-full pl-10 pr-4 py-2.5 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium mb-1 text-foreground">
                        Last Name
                      </label>
                      <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        required
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="Doe"
                        className="w-full px-4 py-2.5 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="dob" className="block text-sm font-medium mb-1 text-foreground">
                      Date of Birth
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
                        <Calendar size={16} />
                      </div>
                      <input
                        id="dob"
                        name="dob"
                        type="date"
                        required
                        value={formData.dob}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-2.5 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="gender" className="block text-sm font-medium mb-1 text-foreground">
                      Gender
                    </label>
                    <select
                      id="gender"
                      name="gender"
                      required
                      value={formData.gender}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={handleNext}
                      className="flex items-center px-6 py-2.5 rounded-lg bg-primary text-white font-medium interactive-button"
                    >
                      Next
                      <ArrowRight size={16} className="ml-2" />
                    </button>
                  </div>
                </div>
              )}
              
              {/* Step 2: Contact Information */}
              {currentStep === 2 && (
                <div className="space-y-4 animate-fade-in">
                  <div>
                    <label htmlFor="address" className="block text-sm font-medium mb-1 text-foreground">
                      Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
                        <MapPin size={16} />
                      </div>
                      <textarea
                        id="address"
                        name="address"
                        required
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="Street address"
                        className="w-full pl-10 pr-4 py-2.5 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring min-h-[80px]"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="city" className="block text-sm font-medium mb-1 text-foreground">
                        City
                      </label>
                      <input
                        id="city"
                        name="city"
                        type="text"
                        required
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="City"
                        className="w-full px-4 py-2.5 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="state" className="block text-sm font-medium mb-1 text-foreground">
                        State
                      </label>
                      <input
                        id="state"
                        name="state"
                        type="text"
                        required
                        value={formData.state}
                        onChange={handleInputChange}
                        placeholder="State"
                        className="w-full px-4 py-2.5 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="pincode" className="block text-sm font-medium mb-1 text-foreground">
                      PIN Code
                    </label>
                    <input
                      id="pincode"
                      name="pincode"
                      type="text"
                      required
                      value={formData.pincode}
                      onChange={handleInputChange}
                      placeholder="PIN Code"
                      className="w-full px-4 py-2.5 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-1 text-foreground">
                      Phone Number
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
                        <Phone size={16} />
                      </div>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Phone number"
                        className="w-full pl-10 pr-4 py-2.5 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-between">
                    <button
                      type="button"
                      onClick={handlePrevious}
                      className="flex items-center px-4 py-2.5 rounded-lg bg-secondary text-foreground font-medium interactive-button"
                    >
                      <ArrowLeft size={16} className="mr-2" />
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={handleNext}
                      className="flex items-center px-6 py-2.5 rounded-lg bg-primary text-white font-medium interactive-button"
                    >
                      Next
                      <ArrowRight size={16} className="ml-2" />
                    </button>
                  </div>
                </div>
              )}
              
              {/* Step 3: Account Information */}
              {currentStep === 3 && (
                <div className="space-y-4 animate-fade-in">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1 text-foreground">
                      Email
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
                        <Mail size={16} />
                      </div>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your.email@example.com"
                        className="w-full pl-10 pr-4 py-2.5 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium mb-1 text-foreground">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        required
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="••••••••"
                        className="w-full px-4 pr-10 py-2.5 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Password must be at least 8 characters long with a mix of letters, numbers and symbols
                    </p>
                  </div>
                  
                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1 text-foreground">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        required
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        placeholder="••••••••"
                        className="w-full px-4 pr-10 py-2.5 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                      <button
                        type="button"
                        onClick={toggleConfirmPasswordVisibility}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground hover:text-foreground"
                      >
                        {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex items-center mt-4">
                    <input
                      id="terms"
                      type="checkbox"
                      required
                      className="h-4 w-4 border border-input rounded bg-background focus:outline-none focus:ring-2 focus:ring-ring text-primary"
                    />
                    <label htmlFor="terms" className="ml-2 text-sm text-muted-foreground">
                      I agree to the{' '}
                      <a href="#" className="text-primary hover:underline">
                        Terms of Service
                      </a>{' '}
                      and{' '}
                      <a href="#" className="text-primary hover:underline">
                        Privacy Policy
                      </a>
                    </label>
                  </div>
                  
                  <div className="flex justify-between mt-6">
                    <button
                      type="button"
                      onClick={handlePrevious}
                      className="flex items-center px-4 py-2.5 rounded-lg bg-secondary text-foreground font-medium interactive-button"
                    >
                      <ArrowLeft size={16} className="mr-2" />
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className={cn(
                        "px-6 py-2.5 rounded-lg bg-primary text-white font-medium interactive-button",
                        isLoading ? "opacity-70 cursor-not-allowed" : ""
                      )}
                    >
                      {isLoading ? "Creating Account..." : "Create Account"}
                    </button>
                  </div>
                </div>
              )}
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Already have an account?{' '}
                <Link to="/login" className="text-primary hover:underline">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </PageTransition>
  );
};

export default Registration;

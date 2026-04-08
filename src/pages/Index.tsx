
import React from 'react';
import { Link } from 'react-router-dom';
import PageTransition from '@/components/layout/PageTransition';
import Navbar from '@/components/Navbar';
import { ArrowRight, Users, UserCheck, Clock, Stethoscope, FileText, Shield, Star } from 'lucide-react';

const Index = () => {
  const features = [
    {
      icon: <Users size={28} />,
      title: 'Fast Patient Registration',
      description: 'Quick and secure patient registration with multiple ID options'
    },
    {
      icon: <Stethoscope size={28} />,
      title: 'Intelligent Triage',
      description: 'AI-powered symptom analysis for accurate patient prioritization'
    },
    {
      icon: <UserCheck size={28} />,
      title: 'Doctor Matching',
      description: 'Connect with the right specialist based on your medical needs'
    },
    {
      icon: <Clock size={28} />,
      title: 'Quick Appointments',
      description: 'Streamlined scheduling for faster medical attention'
    },
    {
      icon: <FileText size={28} />,
      title: 'Digital Medical Records',
      description: 'Secure access to your complete medical history'
    },
    {
      icon: <Shield size={28} />,
      title: 'Secured & Private',
      description: 'Your medical data is encrypted and protected at all times'
    }
  ];

  const testimonials = [
    {
      quote: "This system has completely transformed how our hospital manages patient intake. The AI triage is remarkably accurate.",
      author: "Dr. Sarah Johnson",
      role: "Chief Medical Officer",
      rating: 5
    },
    {
      quote: "As a patient, I appreciate how quickly I was connected with the right specialist. Saved me hours of waiting time.",
      author: "Michael Chen",
      role: "Patient",
      rating: 5
    },
    {
      quote: "The streamlined registration process has reduced our administrative workload by 40%. Highly recommended for any healthcare facility.",
      author: "Rebecca Martinez",
      role: "Hospital Administrator",
      rating: 4
    }
  ];

  return (
    <PageTransition>
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-blue-50 to-white py-20 sm:py-32">
          <div className="page-container">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-foreground animate-slide-up">
                Modern Patient Triage <span className="text-primary">Simplified</span>
              </h1>
              <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '100ms' }}>
                Streamline hospital patient flow with our intelligent triage system, connecting you with the right care at the right time.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: '200ms' }}>
                <Link
                  to="/registration"
                  className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium interactive-button deep-shadow"
                >
                  Register as Patient
                </Link>
                <Link
                  to="/auth"
                  className="px-6 py-3 rounded-xl bg-secondary text-foreground font-medium interactive-button subtle-shadow"
                >
                  Login to Account
                </Link>
              </div>
            </div>
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute top-1/3 left-10 w-16 h-16 rounded-full bg-blue-200/30 backdrop-blur-xl animate-pulse hidden md:block"></div>
          <div className="absolute bottom-1/4 right-10 w-20 h-20 rounded-full bg-primary/10 backdrop-blur-xl animate-pulse hidden md:block" style={{ animationDelay: '1s' }}></div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 sm:py-24 bg-white">
          <div className="page-container">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground">
                Designed for Modern Healthcare Needs
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Our platform streamlines the entire patient journey from registration to treatment
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  className="glass-card p-6 rounded-xl subtle-shadow hover:shadow-md transition-shadow duration-300"
                >
                  <div className="w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Testimonials Section */}
        <section className="py-16 sm:py-24 bg-gray-50">
          <div className="page-container">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground">
                Trusted by Healthcare Professionals
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                See what our users are saying about their experience
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="glass-card p-8 rounded-xl deep-shadow">
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i}
                        size={18} 
                        className={`${i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} mr-1`}
                      />
                    ))}
                  </div>
                  <p className="text-foreground italic mb-6">"{testimonial.quote}"</p>
                  <div>
                    <p className="font-medium">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 sm:py-24 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
          <div className="page-container">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-6">
                    Ready to experience better healthcare?
                  </h2>
                  <p className="text-lg text-blue-100 mb-8">
                    Join thousands of patients who trust our system for their medical needs. Our intelligent triage system ensures you get the right care at the right time.
                  </p>
                  <Link
                    to="/registration"
                    className="inline-flex items-center px-6 py-3 rounded-xl bg-white text-blue-700 font-medium hover:bg-blue-50 interactive-button deep-shadow"
                  >
                    Get Started
                    <ArrowRight size={18} className="ml-2" />
                  </Link>
                </div>
                <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-sm">
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 bg-blue-500 p-2 rounded-full mr-4">
                        <Clock className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-medium text-xl mb-1">Save Time</h3>
                        <p className="text-blue-100">Reduce wait times by up to 40% with intelligent prioritization</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 bg-blue-500 p-2 rounded-full mr-4">
                        <Stethoscope className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-medium text-xl mb-1">Better Care</h3>
                        <p className="text-blue-100">Connect with specialists matched to your specific medical needs</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 bg-blue-500 p-2 rounded-full mr-4">
                        <Shield className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-medium text-xl mb-1">100% Secure</h3>
                        <p className="text-blue-100">Your medical data is fully encrypted and protected</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Footer */}
        <footer className="bg-white py-12 border-t border-border">
          <div className="page-container">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-6 md:mb-0">
                <div className="font-medium text-xl text-foreground">
                  <span className="text-primary">Med</span>Triage
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  Modernizing the patient experience
                </p>
              </div>
              
              <div className="flex flex-col md:flex-row gap-6 md:gap-12">
                <div>
                  <h4 className="text-sm font-medium mb-3">Quick Links</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
                    <li><Link to="/dashboard" className="hover:text-primary transition-colors">Dashboard</Link></li>
                    <li><Link to="/triage" className="hover:text-primary transition-colors">Triage</Link></li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-3">Support</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li><Link to="/forgot-password" className="hover:text-primary transition-colors">Reset Password</Link></li>
                    <li><Link to="/auth" className="hover:text-primary transition-colors">Login Help</Link></li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-3">Legal</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
                    <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="mt-10 pt-6 border-t border-border text-center text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} MedTriage. All rights reserved.
            </div>
          </div>
        </footer>
      </main>
    </PageTransition>
  );
};

export default Index;

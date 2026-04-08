
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { Menu, X, User, Bell, LogOut, Shield, Stethoscope, Home, FileText } from "lucide-react";
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, profile, signOut } = useAuth();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  // Get navigation items based on user role
  const getNavigationItems = () => {
    const baseItems = [
      { title: 'Home', path: '/', icon: <Home size={18} /> },
    ];
    
    if (user) {
      // Common items for all authenticated users
      baseItems.push({ title: 'Dashboard', path: '/dashboard', icon: <FileText size={18} /> });
      
      // Role-specific items
      if (profile?.role === 'admin') {
        baseItems.push({ title: 'Admin Panel', path: '/admin', icon: <Shield size={18} /> });
      } else if (profile?.role === 'doctor') {
        baseItems.push({ title: 'Doctor Panel', path: '/doctor', icon: <Stethoscope size={18} /> });
      } else {
        // Patient-specific routes
        baseItems.push({ title: 'Triage', path: '/triage', icon: <FileText size={18} /> });
      }
    }
    
    return baseItems;
  };

  const navigationItems = getNavigationItems();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleSignOut = async () => {
    await signOut();
    closeMenu();
    navigate('/');
  };

  // Get user initials for avatar
  const getUserInitials = () => {
    if (profile?.first_name && profile?.last_name) {
      return `${profile.first_name[0]}${profile.last_name[0]}`.toUpperCase();
    }
    return user?.email?.substring(0, 2).toUpperCase() || 'U';
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-border subtle-shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-4">
            <Link to="/" className="font-medium text-xl text-foreground">
              <span className="text-primary">Med</span>Triage
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary flex items-center gap-2",
                  isActive(item.path) 
                    ? "text-primary" 
                    : "text-foreground/70"
                )}
              >
                {item.icon}
                {item.title}
              </Link>
            ))}
            
            {user ? (
              <div className="flex items-center space-x-4 border-l pl-4 border-border">
                <button className="text-foreground/70 hover:text-primary transition-colors">
                  <Bell size={18} />
                </button>
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8 bg-primary text-white">
                    <AvatarFallback>{getUserInitials()}</AvatarFallback>
                  </Avatar>
                  <div className="text-sm font-medium">
                    {profile?.first_name ? `${profile.first_name}` : user.email?.split('@')[0]}
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={handleSignOut}
                    className="ml-2"
                  >
                    <LogOut size={16} />
                  </Button>
                </div>
              </div>
            ) : (
              <Link to="/auth">
                <Button className="flex items-center gap-2">
                  <User size={16} />
                  Sign In
                </Button>
              </Link>
            )}
          </nav>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-foreground/70 hover:text-primary transition-colors"
            onClick={toggleMenu}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-border animate-slide-down">
          <div className="max-w-7xl mx-auto px-4 py-4 space-y-4">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "block text-sm font-medium py-2 transition-colors hover:text-primary flex items-center gap-2",
                  isActive(item.path) 
                    ? "text-primary" 
                    : "text-foreground/70"
                )}
                onClick={closeMenu}
              >
                {item.icon}
                {item.title}
              </Link>
            ))}
            
            {user ? (
              <div className="border-t border-border pt-4 mt-4">
                <div className="flex items-center mb-4">
                  <Avatar className="h-8 w-8 bg-primary text-white mr-2">
                    <AvatarFallback>{getUserInitials()}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="text-sm font-medium">
                      {profile?.first_name ? `${profile.first_name} ${profile.last_name}` : user.email}
                    </div>
                    <div className="text-xs text-muted-foreground">{profile?.role}</div>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  className="w-full flex items-center justify-center gap-2"
                  onClick={handleSignOut}
                >
                  <LogOut size={16} />
                  Sign Out
                </Button>
              </div>
            ) : (
              <Link 
                to="/auth" 
                className="block mt-4"
                onClick={closeMenu}
              >
                <Button className="w-full flex items-center justify-center gap-2">
                  <User size={16} />
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;

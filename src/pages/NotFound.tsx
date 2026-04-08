
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home, AlertTriangle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="bg-red-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="h-10 w-10 text-red-500" />
          </div>
          <h1 className="text-4xl font-bold mb-2">404</h1>
          <p className="text-xl text-gray-600 mb-6">Page not found</p>
          <p className="text-gray-500 mb-8">
            Sorry, we couldn't find the page you're looking for. The page might have been moved, deleted, or never existed.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 justify-center">
          <Button 
            variant="default" 
            className="flex items-center justify-center gap-2"
            onClick={() => navigate('/')}
          >
            <Home className="h-4 w-4" />
            Go to Home
          </Button>
          <Button 
            variant="outline" 
            className="flex items-center justify-center gap-2"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

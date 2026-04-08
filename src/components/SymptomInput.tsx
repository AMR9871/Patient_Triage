
import React, { useState } from 'react';
import { cn } from "@/lib/utils";
import { Mic, Image, Send, X, AlertCircle } from "lucide-react";

interface SymptomInputProps {
  onSubmit: (symptoms: string) => void;
  className?: string;
}

const SymptomInput: React.FC<SymptomInputProps> = ({ 
  onSubmit,
  className 
}) => {
  const [symptoms, setSymptoms] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Sample symptom suggestions
  const sampleSuggestions = [
    "Fever", "Headache", "Cough", "Sore throat", 
    "Chest pain", "Difficulty breathing", "Nausea", "Fatigue"
  ];

  const handleSymptomChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setSymptoms(value);
    
    // Show suggestions when typing
    if (value.length > 1) {
      const filteredSuggestions = sampleSuggestions.filter(
        suggestion => suggestion.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
      setShowSuggestions(filteredSuggestions.length > 0);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSubmit = () => {
    if (symptoms.trim()) {
      onSubmit(symptoms);
      setSymptoms("");
      setShowSuggestions(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // In a real implementation, this would start/stop speech recognition
    if (!isRecording) {
      // Simulate recording delay and results
      setTimeout(() => {
        setSymptoms(prev => prev + "I have a severe headache and fever for 2 days.");
        setIsRecording(false);
      }, 2000);
    }
  };

  const addSuggestion = (suggestion: string) => {
    setSymptoms(prev => {
      const newText = prev ? `${prev}, ${suggestion.toLowerCase()}` : suggestion;
      return newText;
    });
    setShowSuggestions(false);
  };

  return (
    <div className={cn("relative", className)}>
      <div className="mb-2 flex items-center">
        <AlertCircle size={16} className="mr-2 text-primary" />
        <p className="text-sm text-muted-foreground">
          Describe your symptoms in detail for better diagnosis
        </p>
      </div>
      
      <div className="relative">
        <textarea
          value={symptoms}
          onChange={handleSymptomChange}
          onKeyDown={handleKeyDown}
          placeholder="Describe your symptoms..."
          className="w-full min-h-[120px] p-4 pr-12 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring resize-none"
        />
        
        <div className="absolute right-2 bottom-2 flex items-center space-x-2">
          <button 
            type="button"
            onClick={toggleRecording}
            className={cn(
              "p-2 rounded-full transition-colors",
              isRecording 
                ? "bg-red-100 text-red-600" 
                : "bg-secondary text-muted-foreground hover:text-primary hover:bg-secondary/80"
            )}
          >
            <Mic size={18} className={cn(isRecording && "animate-pulse")} />
          </button>
          
          <button 
            type="button"
            className="p-2 rounded-full bg-secondary text-muted-foreground hover:text-primary hover:bg-secondary/80 transition-colors"
          >
            <Image size={18} />
          </button>
          
          <button 
            type="button"
            onClick={handleSubmit}
            className="p-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
      
      {showSuggestions && (
        <div className="absolute z-10 mt-1 w-full max-h-48 overflow-auto bg-white rounded-md subtle-shadow border border-border animate-fade-in">
          <div className="p-2 flex justify-between items-center border-b border-border">
            <span className="text-xs font-medium text-muted-foreground">Common symptoms</span>
            <button 
              onClick={() => setShowSuggestions(false)}
              className="text-muted-foreground hover:text-foreground"
            >
              <X size={14} />
            </button>
          </div>
          <ul>
            {suggestions.map((suggestion, index) => (
              <li key={index}>
                <button
                  onClick={() => addSuggestion(suggestion)}
                  className="w-full text-left px-3 py-2 text-sm hover:bg-secondary transition-colors"
                >
                  {suggestion}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SymptomInput;


import React from 'react';
import { cn } from "@/lib/utils";
import { User, Calendar, MapPin, Phone } from "lucide-react";

interface PatientCardProps {
  patient: {
    id: string;
    name: string;
    age: number;
    gender: string;
    address: string;
    phone: string;
    dob: string;
    photo?: string;
  };
  className?: string;
}

const PatientCard: React.FC<PatientCardProps> = ({ 
  patient, 
  className 
}) => {
  return (
    <div className={cn(
      "glass-card rounded-xl p-6 transition-all duration-300 hover:shadow-md", 
      className
    )}>
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="relative w-16 h-16 rounded-full overflow-hidden bg-secondary flex-shrink-0">
          {patient.photo ? (
            <img 
              src={patient.photo} 
              alt={patient.name} 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
              <User size={32} />
            </div>
          )}
        </div>
        
        <div className="flex-1">
          <h3 className="text-lg font-medium text-foreground">{patient.name}</h3>
          <div className="mt-1 flex flex-col sm:flex-row sm:items-center text-sm text-muted-foreground gap-y-1 sm:gap-x-4">
            <div className="flex items-center">
              <User size={14} className="mr-1" />
              <span>{patient.age} yrs, {patient.gender}</span>
            </div>
            <div className="flex items-center">
              <Calendar size={14} className="mr-1" />
              <span>{patient.dob}</span>
            </div>
          </div>
          <div className="mt-2 flex flex-col sm:flex-row sm:items-center text-sm text-muted-foreground gap-y-1 sm:gap-x-4">
            <div className="flex items-center">
              <MapPin size={14} className="mr-1" />
              <span className="truncate max-w-[200px]">{patient.address}</span>
            </div>
            <div className="flex items-center">
              <Phone size={14} className="mr-1" />
              <span>{patient.phone}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientCard;

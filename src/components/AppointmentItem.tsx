
import React from 'react';
import { cn } from "@/lib/utils";
import { Calendar, Clock, User, MapPin } from "lucide-react";

interface AppointmentItemProps {
  appointment: {
    id: string;
    doctorName: string;
    specialty: string;
    date: string;
    time: string;
    location: string;
    status: 'upcoming' | 'completed' | 'cancelled';
  };
  className?: string;
}

const AppointmentItem: React.FC<AppointmentItemProps> = ({ 
  appointment, 
  className 
}) => {
  const statusColors = {
    upcoming: 'bg-blue-50 text-blue-700 border-blue-200',
    completed: 'bg-green-50 text-green-700 border-green-200',
    cancelled: 'bg-red-50 text-red-700 border-red-200',
  };
  
  const statusLabels = {
    upcoming: 'Upcoming',
    completed: 'Completed',
    cancelled: 'Cancelled',
  };

  return (
    <div className={cn(
      "glass-card rounded-xl p-5 transition-all duration-300 hover:shadow-md", 
      className
    )}>
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center">
            <h3 className="text-base font-medium text-foreground">{appointment.doctorName}</h3>
            <span className={cn(
              "ml-3 text-xs px-2 py-1 rounded-full border",
              statusColors[appointment.status]
            )}>
              {statusLabels[appointment.status]}
            </span>
          </div>
          
          <p className="text-sm text-muted-foreground mt-1">{appointment.specialty}</p>
          
          <div className="mt-3 flex flex-col sm:flex-row gap-y-2 sm:gap-x-4 text-sm">
            <div className="flex items-center text-muted-foreground">
              <Calendar size={14} className="mr-1.5" />
              <span>{appointment.date}</span>
            </div>
            <div className="flex items-center text-muted-foreground">
              <Clock size={14} className="mr-1.5" />
              <span>{appointment.time}</span>
            </div>
            <div className="flex items-center text-muted-foreground">
              <MapPin size={14} className="mr-1.5" />
              <span>{appointment.location}</span>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col gap-2">
          {appointment.status === 'upcoming' && (
            <>
              <button className="text-xs px-3 py-1.5 rounded-md bg-primary text-primary-foreground interactive-button">
                Reschedule
              </button>
              <button className="text-xs px-3 py-1.5 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80 interactive-button">
                Cancel
              </button>
            </>
          )}
          {appointment.status === 'completed' && (
            <button className="text-xs px-3 py-1.5 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80 interactive-button">
              View Report
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppointmentItem;

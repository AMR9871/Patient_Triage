
import React from 'react';
import { cn } from "@/lib/utils";
import { User, Stethoscope, Clock, Calendar } from "lucide-react";

interface DoctorCardProps {
  doctor: {
    id: string;
    name: string;
    specialty: string;
    department: string;
    experience: string;
    photo?: string;
    availability?: {
      date: string;
      slots: string[];
    }[];
  };
  onSelect?: (id: string, slot?: { date: string, time: string }) => void;
  selected?: boolean;
  className?: string;
  showAvailability?: boolean;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ 
  doctor, 
  onSelect,
  selected = false,
  showAvailability = false,
  className 
}) => {
  const [selectedDate, setSelectedDate] = React.useState<string | null>(null);
  const [selectedTime, setSelectedTime] = React.useState<string | null>(null);

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setSelectedTime(null);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    if (selectedDate && onSelect) {
      onSelect(doctor.id, { date: selectedDate, time });
    }
  };

  return (
    <div className={cn(
      "glass-card rounded-xl p-6 transition-all duration-300",
      selected ? "ring-2 ring-primary shadow-md" : "hover:shadow-md",
      className
    )}>
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="relative w-16 h-16 rounded-full overflow-hidden bg-secondary flex-shrink-0">
          {doctor.photo ? (
            <img 
              src={doctor.photo} 
              alt={doctor.name} 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
              <User size={32} />
            </div>
          )}
        </div>
        
        <div className="flex-1">
          <h3 className="text-lg font-medium text-foreground">{doctor.name}</h3>
          <div className="mt-1 flex flex-col sm:flex-row sm:items-center text-sm text-muted-foreground gap-y-1 sm:gap-x-4">
            <div className="flex items-center">
              <Stethoscope size={14} className="mr-1" />
              <span>{doctor.specialty}</span>
            </div>
            <div className="flex items-center">
              <Clock size={14} className="mr-1" />
              <span>{doctor.experience}</span>
            </div>
          </div>
        </div>
        
        {!showAvailability && onSelect && (
          <button
            onClick={() => onSelect(doctor.id)}
            className={cn(
              "mt-4 sm:mt-0 px-4 py-2 text-sm font-medium rounded-lg transition-colors interactive-button",
              selected
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            )}
          >
            {selected ? "Selected" : "Select"}
          </button>
        )}
      </div>

      {showAvailability && doctor.availability && (
        <div className="mt-6 border-t border-border pt-4">
          <div className="flex items-center mb-3">
            <Calendar size={16} className="mr-2 text-primary" />
            <h4 className="text-sm font-medium">Available Dates</h4>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {doctor.availability.map((slot) => (
              <button
                key={slot.date}
                onClick={() => handleDateSelect(slot.date)}
                className={cn(
                  "px-3 py-1 text-xs rounded-md transition-colors",
                  selectedDate === slot.date
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                )}
              >
                {slot.date}
              </button>
            ))}
          </div>
          
          {selectedDate && (
            <>
              <div className="flex items-center mb-3">
                <Clock size={16} className="mr-2 text-primary" />
                <h4 className="text-sm font-medium">Available Times</h4>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {doctor.availability
                  .find(slot => slot.date === selectedDate)
                  ?.slots.map((time) => (
                    <button
                      key={time}
                      onClick={() => handleTimeSelect(time)}
                      className={cn(
                        "px-3 py-1 text-xs rounded-md transition-colors",
                        selectedTime === time
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground hover:bg-muted/80"
                      )}
                    >
                      {time}
                    </button>
                  ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default DoctorCard;

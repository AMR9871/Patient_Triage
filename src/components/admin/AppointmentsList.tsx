
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CalendarClock } from 'lucide-react';

interface Appointment {
  id: string;
  patient_id: string;
  doctor_id: string;
  appointment_date: string;
  status: 'confirmed' | 'pending' | 'cancelled' | 'completed';
  notes: string | null;
  patient: {
    first_name: string | null;
    last_name: string | null;
  };
  doctor: {
    first_name: string | null;
    last_name: string | null;
  };
}

interface AppointmentsListProps {
  appointments: Appointment[];
}

const AppointmentsList: React.FC<AppointmentsListProps> = ({ appointments }) => {
  if (appointments.length === 0) {
    return (
      <div className="text-center py-8">
        <CalendarClock className="h-12 w-12 mx-auto text-gray-300 mb-3" />
        <h3 className="text-lg font-medium text-gray-900">No appointments found</h3>
        <p className="text-gray-500">No appointments have been scheduled yet.</p>
      </div>
    );
  }

  return (
    <>
      {appointments.map((appointment) => (
        <Card key={appointment.id} className="mb-4">
          <CardHeader className="pb-2">
            <div className="flex justify-between">
              <div>
                <CardTitle>
                  {appointment.patient?.first_name} {appointment.patient?.last_name} → Dr. {appointment.doctor?.first_name} {appointment.doctor?.last_name}
                </CardTitle>
                <CardDescription>
                  {new Date(appointment.appointment_date).toLocaleDateString()} at {' '}
                  {new Date(appointment.appointment_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </CardDescription>
              </div>
              <div>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  appointment.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                  appointment.status === 'pending' ? 'bg-amber-100 text-amber-800' :
                  appointment.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                  'bg-blue-100 text-blue-800'
                }`}>
                  {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                </span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                View Details
              </Button>
              <Button variant="outline" size="sm">
                Edit Appointment
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
};

export default AppointmentsList;


import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Stethoscope, Users, CalendarClock } from 'lucide-react';

interface StatsProps {
  stats: {
    totalDoctors: number;
    totalPatients: number;
    totalAppointments: number;
    pendingAppointments: number;
  };
}

const DashboardStats: React.FC<StatsProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl font-medium">Doctors</CardTitle>
          <CardDescription>Total registered doctors</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <Stethoscope className="h-8 w-8 text-primary mr-3" />
            <span className="text-3xl font-bold">{stats.totalDoctors}</span>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl font-medium">Patients</CardTitle>
          <CardDescription>Total registered patients</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <Users className="h-8 w-8 text-indigo-500 mr-3" />
            <span className="text-3xl font-bold">{stats.totalPatients}</span>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl font-medium">Appointments</CardTitle>
          <CardDescription>Total scheduled appointments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <CalendarClock className="h-8 w-8 text-green-500 mr-3" />
            <span className="text-3xl font-bold">{stats.totalAppointments}</span>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl font-medium">Pending</CardTitle>
          <CardDescription>Appointments awaiting approval</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <CalendarClock className="h-8 w-8 text-amber-500 mr-3" />
            <span className="text-3xl font-bold">{stats.pendingAppointments}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardStats;

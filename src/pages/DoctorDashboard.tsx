
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import PageTransition from '@/components/layout/PageTransition';
import Navbar from '@/components/Navbar';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Loader2, CalendarIcon, Users, Clock, ClipboardList } from 'lucide-react';
import { toast } from 'sonner';

interface Patient {
  id: string;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
}

interface Appointment {
  id: string;
  patient_id: string;
  appointment_date: string;
  status: 'confirmed' | 'pending' | 'cancelled' | 'completed';
  notes: string | null;
  patient: Patient;
}

const DoctorDashboard = () => {
  const { user, profile } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalPatients: 0,
    pendingAppointments: 0,
    completedAppointments: 0,
  });

  useEffect(() => {
    const fetchAppointments = async () => {
      if (!user) return;
      
      try {
        setLoading(true);
        
        // Fetch appointments with patient details
        const { data, error } = await supabase
          .from('appointments')
          .select(`
            id,
            patient_id,
            appointment_date,
            status,
            notes,
            patient:profiles!patient_id(id, first_name, last_name, email)
          `)
          .eq('doctor_id', user.id)
          .order('appointment_date', { ascending: true });
          
        if (error) throw error;
        
        // Type cast the data to match our interface
        const typedAppointments = data?.map(app => ({
          ...app,
          status: app.status as 'confirmed' | 'pending' | 'cancelled' | 'completed'
        })) || [];
        
        setAppointments(typedAppointments);
        
        // Calculate stats
        const uniquePatients = new Set(typedAppointments.map(a => a.patient_id) || []);
        const pending = typedAppointments.filter(a => a.status === 'pending').length || 0;
        const completed = typedAppointments.filter(a => a.status === 'completed').length || 0;
        
        setStats({
          totalPatients: uniquePatients.size,
          pendingAppointments: pending,
          completedAppointments: completed,
        });
      } catch (error: any) {
        toast.error('Error fetching appointments: ' + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [user]);

  const getTodaysAppointments = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    return appointments.filter(appointment => {
      const appointmentDate = new Date(appointment.appointment_date);
      appointmentDate.setHours(0, 0, 0, 0);
      return appointmentDate.getTime() === today.getTime();
    });
  };

  const getAppointmentsByDate = (date: Date) => {
    return appointments.filter(appointment => {
      const appointmentDate = new Date(appointment.appointment_date);
      return (
        appointmentDate.getDate() === date.getDate() &&
        appointmentDate.getMonth() === date.getMonth() &&
        appointmentDate.getFullYear() === date.getFullYear()
      );
    });
  };

  const updateAppointmentStatus = async (id: string, status: 'confirmed' | 'pending' | 'cancelled' | 'completed') => {
    try {
      const { error } = await supabase
        .from('appointments')
        .update({ status })
        .eq('id', id);
        
      if (error) throw error;
      
      // Update local state
      setAppointments(appointments.map(appointment => 
        appointment.id === id ? { ...appointment, status } : appointment
      ));
      
      toast.success(`Appointment ${status} successfully`);
    } catch (error: any) {
      toast.error('Error updating appointment: ' + error.message);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <PageTransition>
      <Navbar />
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Doctor Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back, Dr. {profile?.first_name || 'Doctor'}
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button>
              <Clock className="mr-2 h-4 w-4" />
              Set Availability
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-medium">Total Patients</CardTitle>
              <CardDescription>Active patients under your care</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Users className="h-8 w-8 text-primary mr-3" />
                <span className="text-3xl font-bold">{stats.totalPatients}</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-medium">Pending Appointments</CardTitle>
              <CardDescription>Appointments awaiting confirmation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Clock className="h-8 w-8 text-amber-500 mr-3" />
                <span className="text-3xl font-bold">{stats.pendingAppointments}</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-medium">Completed</CardTitle>
              <CardDescription>Successfully completed visits</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <ClipboardList className="h-8 w-8 text-green-500 mr-3" />
                <span className="text-3xl font-bold">{stats.completedAppointments}</span>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="today" className="mb-8">
          <TabsList>
            <TabsTrigger value="today">Today's Appointments</TabsTrigger>
            <TabsTrigger value="all">All Appointments</TabsTrigger>
            <TabsTrigger value="calendar">Calendar View</TabsTrigger>
          </TabsList>
          
          <TabsContent value="today" className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Today's Schedule</h2>
            
            {getTodaysAppointments().length > 0 ? (
              getTodaysAppointments().map((appointment) => (
                <Card key={appointment.id} className="mb-4">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <div className="flex items-center">
                        <Avatar className="h-10 w-10 mr-3">
                          <AvatarFallback>{appointment.patient?.first_name?.[0] || '?'}{appointment.patient?.last_name?.[0] || '?'}</AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle>{appointment.patient?.first_name} {appointment.patient?.last_name}</CardTitle>
                          <CardDescription>{appointment.patient?.email}</CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm mr-2">
                          {new Date(appointment.appointment_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
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
                    <p className="text-sm text-gray-500 mb-4">
                      {appointment.notes || 'No notes available'}
                    </p>
                    <div className="flex space-x-2">
                      {appointment.status === 'pending' && (
                        <>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => updateAppointmentStatus(appointment.id, 'confirmed')}
                          >
                            Confirm
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-red-500 border-red-200 hover:bg-red-50"
                            onClick={() => updateAppointmentStatus(appointment.id, 'cancelled')}
                          >
                            Decline
                          </Button>
                        </>
                      )}
                      {appointment.status === 'confirmed' && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => updateAppointmentStatus(appointment.id, 'completed')}
                        >
                          Mark as Completed
                        </Button>
                      )}
                      <Button variant="outline" size="sm">
                        View Patient
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-8">
                <ClipboardList className="h-12 w-12 mx-auto text-gray-300 mb-3" />
                <h3 className="text-lg font-medium text-gray-900">No appointments scheduled for today</h3>
                <p className="text-gray-500">Enjoy your day off or check your calendar for upcoming appointments.</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="all" className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">All Appointments</h2>
            
            {appointments.length > 0 ? (
              appointments.map((appointment) => (
                <Card key={appointment.id} className="mb-4">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <div className="flex items-center">
                        <Avatar className="h-10 w-10 mr-3">
                          <AvatarFallback>{appointment.patient?.first_name?.[0] || '?'}{appointment.patient?.last_name?.[0] || '?'}</AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle>{appointment.patient?.first_name} {appointment.patient?.last_name}</CardTitle>
                          <CardDescription>{new Date(appointment.appointment_date).toLocaleDateString()}</CardDescription>
                        </div>
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
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-8">
                <ClipboardList className="h-12 w-12 mx-auto text-gray-300 mb-3" />
                <h3 className="text-lg font-medium text-gray-900">No appointments found</h3>
                <p className="text-gray-500">No appointments have been scheduled yet.</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="calendar">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-xl font-semibold mb-4">Select Date</h2>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => setSelectedDate(date || new Date())}
                  className="rounded-md border"
                />
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-4">
                  Appointments for {selectedDate.toLocaleDateString()}
                </h2>
                
                {getAppointmentsByDate(selectedDate).length > 0 ? (
                  getAppointmentsByDate(selectedDate).map((appointment) => (
                    <Card key={appointment.id} className="mb-4">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between">
                          <div className="flex items-center">
                            <Avatar className="h-10 w-10 mr-3">
                              <AvatarFallback>{appointment.patient?.first_name?.[0] || '?'}{appointment.patient?.last_name?.[0] || '?'}</AvatarFallback>
                            </Avatar>
                            <div>
                              <CardTitle>{appointment.patient?.first_name} {appointment.patient?.last_name}</CardTitle>
                              <CardDescription>
                                {new Date(appointment.appointment_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </CardDescription>
                            </div>
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
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-8 border rounded-md">
                    <CalendarIcon className="h-12 w-12 mx-auto text-gray-300 mb-3" />
                    <h3 className="text-lg font-medium text-gray-900">No appointments</h3>
                    <p className="text-gray-500">No appointments scheduled for this date.</p>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </PageTransition>
  );
};

export default DoctorDashboard;

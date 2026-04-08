
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import PageTransition from '@/components/layout/PageTransition';
import Navbar from '@/components/Navbar';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Loader2, CalendarIcon, Users, Clock, FileText, Search } from 'lucide-react';
import { toast } from 'sonner';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface Patient {
  id: string;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  phone: string | null;
}

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
    email: string | null;
  };
}

const MedicalStaffDashboard = () => {
  const { user, profile } = useAuth();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalPatients: 0,
    upcomingAppointments: 0,
    completedAppointments: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      
      try {
        setLoading(true);
        
        // Fetch patients
        const { data: patientsData, error: patientsError } = await supabase
          .from('profiles')
          .select('*')
          .eq('role', 'patient');
          
        if (patientsError) throw patientsError;
        
        // Fetch appointments for this medical staff
        const { data: appointmentsData, error: appointmentsError } = await supabase
          .from('appointments')
          .select(`
            id,
            patient_id,
            doctor_id,
            appointment_date,
            status,
            notes,
            patient:profiles!patient_id(first_name, last_name, email)
          `)
          .order('appointment_date', { ascending: true });
          
        if (appointmentsError) throw appointmentsError;
        
        setPatients(patientsData || []);
        
        // Type cast appointment status to ensure it matches the Appointment interface
        const typedAppointments = appointmentsData?.map(app => ({
          ...app,
          status: app.status as 'confirmed' | 'pending' | 'cancelled' | 'completed'
        })) || [];
        
        setAppointments(typedAppointments);
        
        // Calculate stats
        const totalPatients = patientsData?.length || 0;
        const upcoming = appointmentsData?.filter(a => 
          a.status === 'confirmed' && new Date(a.appointment_date) > new Date()
        ).length || 0;
        const completed = appointmentsData?.filter(a => a.status === 'completed').length || 0;
        
        setStats({
          totalPatients,
          upcomingAppointments: upcoming,
          completedAppointments: completed,
        });
      } catch (error: any) {
        toast.error('Error fetching data: ' + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

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

  const getTodaysAppointments = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    return appointments.filter(appointment => {
      const appointmentDate = new Date(appointment.appointment_date);
      appointmentDate.setHours(0, 0, 0, 0);
      return appointmentDate.getTime() === today.getTime();
    });
  };

  const filteredPatients = patients.filter(patient => {
    const fullName = `${patient.first_name || ''} ${patient.last_name || ''}`.toLowerCase();
    const email = (patient.email || '').toLowerCase();
    const phone = (patient.phone || '').toLowerCase();
    const term = searchTerm.toLowerCase();
    
    return fullName.includes(term) || email.includes(term) || phone.includes(term);
  });

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
            <h1 className="text-3xl font-bold">Medical Staff Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome, {profile?.first_name || 'Staff Member'}
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-medium">Total Patients</CardTitle>
              <CardDescription>Registered patients in the system</CardDescription>
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
              <CardTitle className="text-xl font-medium">Upcoming Appointments</CardTitle>
              <CardDescription>Scheduled appointments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Clock className="h-8 w-8 text-amber-500 mr-3" />
                <span className="text-3xl font-bold">{stats.upcomingAppointments}</span>
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
                <FileText className="h-8 w-8 text-green-500 mr-3" />
                <span className="text-3xl font-bold">{stats.completedAppointments}</span>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="appointments" className="mb-8">
          <TabsList>
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            <TabsTrigger value="patients">Patients</TabsTrigger>
            <TabsTrigger value="calendar">Calendar</TabsTrigger>
          </TabsList>
          
          <TabsContent value="appointments" className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Today's Appointments</h2>
            </div>
            
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
                      <Button variant="outline" size="sm">
                        View Patient
                      </Button>
                      <Button variant="outline" size="sm">
                        Update Status
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-8">
                <Clock className="h-12 w-12 mx-auto text-gray-300 mb-3" />
                <h3 className="text-lg font-medium text-gray-900">No appointments scheduled for today</h3>
                <p className="text-gray-500">Check the calendar for upcoming appointments.</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="patients" className="space-y-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
              <h2 className="text-xl font-semibold mb-2 md:mb-0">All Patients</h2>
              <div className="w-full md:w-64">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search patients..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>
            
            {filteredPatients.length > 0 ? (
              filteredPatients.map((patient) => (
                <Card key={patient.id} className="mb-4">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <div className="flex items-center">
                        <Avatar className="h-10 w-10 mr-3">
                          <AvatarFallback>{patient.first_name?.[0] || '?'}{patient.last_name?.[0] || '?'}</AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle>{patient.first_name} {patient.last_name}</CardTitle>
                          <CardDescription>{patient.email}</CardDescription>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                      <Button variant="outline" size="sm">
                        Schedule Appointment
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-8">
                <Users className="h-12 w-12 mx-auto text-gray-300 mb-3" />
                <h3 className="text-lg font-medium text-gray-900">No patients found</h3>
                <p className="text-gray-500">Try adjusting your search or add new patients to the system.</p>
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
                        <p className="text-sm text-gray-500 mb-4">
                          {appointment.notes || 'No notes available'}
                        </p>
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

export default MedicalStaffDashboard;

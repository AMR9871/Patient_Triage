
import React, { useEffect, useState } from 'react';
import PageTransition from '@/components/layout/PageTransition';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, User, Calendar as CalendarIcon, Activity, FileText, RefreshCw } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

interface AppointmentData {
  id: string;
  patient_id: string;
  doctor_id: string;
  appointment_date: string;
  status: 'confirmed' | 'pending' | 'cancelled' | 'completed';
  notes: string | null;
  created_at: string;
  doctor: {
    id: string;
    first_name: string | null;
    last_name: string | null;
  } | null;
}

interface MedicalRecordData {
  id: string;
  patient_id: string;
  medical_history: string | null;
  allergies: string | null;
  current_medications: string | null;
  created_at: string;
}

interface MedicalDocumentData {
  id: string;
  patient_id: string;
  doctor_id: string | null;
  file_path: string;
  document_type: string | null;
  upload_date: string;
  notes: string | null;
}

const Dashboard = () => {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState<AppointmentData[]>([]);
  const [medicalRecord, setMedicalRecord] = useState<MedicalRecordData | null>(null);
  const [documents, setDocuments] = useState<MedicalDocumentData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  const fetchDashboardData = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      // Fetch appointments
      const { data: appointmentsData, error: appointmentsError } = await supabase
        .from('appointments')
        .select(`
          *,
          doctor:doctor_id(id, first_name, last_name)
        `)
        .eq('patient_id', user.id)
        .order('appointment_date', { ascending: true });
      
      if (appointmentsError) throw appointmentsError;
      setAppointments(appointmentsData as unknown as AppointmentData[]);
      
      // Fetch medical record
      const { data: medicalRecordData, error: medicalRecordError } = await supabase
        .from('patient_records')
        .select('*')
        .eq('patient_id', user.id)
        .maybeSingle();
      
      if (medicalRecordError) throw medicalRecordError;
      setMedicalRecord(medicalRecordData as MedicalRecordData);
      
      // Fetch documents
      const { data: documentsData, error: documentsError } = await supabase
        .from('medical_documents')
        .select('*')
        .eq('patient_id', user.id)
        .order('upload_date', { ascending: false });
      
      if (documentsError) throw documentsError;
      setDocuments(documentsData as MedicalDocumentData[]);
      
    } catch (error: any) {
      toast.error(`Error loading dashboard data: ${error.message}`);
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Function to navigate to triage page
  const goToTriage = () => {
    navigate('/triage');
  };

  // Check if we need to redirect to a role-specific dashboard
  useEffect(() => {
    if (profile) {
      if (profile.role === 'admin') {
        navigate('/admin');
      } else if (profile.role === 'doctor') {
        navigate('/doctor');
      }
    }
  }, [profile, navigate]);

  return (
    <PageTransition>
      <Navbar />
      
      <main className="container max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold">Patient Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome, {profile?.first_name ? `${profile.first_name} ${profile.last_name}` : 'Patient'}
            </p>
          </div>
          <div className="flex gap-2">
            <Button onClick={fetchDashboardData} variant="outline" className="flex items-center gap-2">
              <RefreshCw size={16} />
              Refresh
            </Button>
            <Button onClick={goToTriage}>Report Symptoms</Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Upcoming Appointments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Calendar className="h-8 w-8 text-primary mr-3" />
                <div>
                  <p className="font-medium">
                    {appointments.filter(a => new Date(a.appointment_date) > new Date()).length}
                  </p>
                  <p className="text-sm text-muted-foreground">Scheduled</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Medical Records</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <FileText className="h-8 w-8 text-primary mr-3" />
                <div>
                  <p className="font-medium">{documents.length}</p>
                  <p className="text-sm text-muted-foreground">Documents</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Health Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Activity className="h-8 w-8 text-green-500 mr-3" />
                <div>
                  <p className="font-medium">Good</p>
                  <p className="text-sm text-muted-foreground">Overall condition</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="appointments" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            <TabsTrigger value="medications">Medications</TabsTrigger>
            <TabsTrigger value="records">Medical Records</TabsTrigger>
            <TabsTrigger value="doctors">My Doctors</TabsTrigger>
          </TabsList>
          
          <TabsContent value="appointments" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Your Appointments</CardTitle>
                <CardDescription>
                  View and manage your upcoming and past medical appointments.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="flex justify-center py-4">
                    <RefreshCw className="animate-spin h-6 w-6 text-primary" />
                  </div>
                ) : appointments.length > 0 ? (
                  <div className="space-y-4">
                    {appointments.map((appointment) => (
                      <div key={appointment.id} className="bg-slate-50 p-4 rounded-lg">
                        <div className="flex flex-col sm:flex-row justify-between mb-2">
                          <div className="font-medium">
                            Dr. {appointment.doctor?.first_name} {appointment.doctor?.last_name}
                          </div>
                          <div className="text-sm text-muted-foreground flex items-center">
                            <CalendarIcon className="h-3 w-3 mr-1" /> 
                            {new Date(appointment.appointment_date).toLocaleDateString()} at {' '}
                            {new Date(appointment.appointment_date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                          </div>
                        </div>
                        <div className="text-sm">
                          {appointment.notes ? appointment.notes : 'No additional details'}
                        </div>
                        <div className="mt-2 flex justify-between items-center">
                          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            appointment.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                            appointment.status === 'pending' ? 'bg-blue-100 text-blue-800' :
                            appointment.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                          </span>
                          <Button variant="outline" size="sm">
                            {appointment.status === 'pending' ? 'Confirm' : 'Reschedule'}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-muted-foreground mb-4">You don't have any appointments scheduled.</p>
                    <Button>Schedule New Appointment</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="medications" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Current Medications</CardTitle>
                <CardDescription>
                  Track your prescriptions and medication schedule.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="flex justify-center py-4">
                    <RefreshCw className="animate-spin h-6 w-6 text-primary" />
                  </div>
                ) : medicalRecord?.current_medications ? (
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <p>{medicalRecord.current_medications}</p>
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-sm text-muted-foreground mb-4">You don't have any active medications.</p>
                    <Button variant="outline">Add Medication</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="records" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Medical Records</CardTitle>
                <CardDescription>
                  Access your medical history, test results, and doctor's notes.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="flex justify-center py-4">
                    <RefreshCw className="animate-spin h-6 w-6 text-primary" />
                  </div>
                ) : documents.length > 0 ? (
                  <div className="space-y-4">
                    {documents.map((document) => (
                      <div key={document.id} className="flex items-center justify-between bg-slate-50 p-4 rounded-lg">
                        <div>
                          <h3 className="font-medium">
                            {document.document_type || 'Medical Document'}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Uploaded on {new Date(document.upload_date).toLocaleDateString()}
                          </p>
                        </div>
                        <Button variant="outline" size="sm">View</Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-sm text-muted-foreground mb-4">Your medical records will appear here.</p>
                    <Button variant="outline">Upload Medical Documents</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="doctors" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>My Doctors</CardTitle>
                <CardDescription>
                  View information about your healthcare providers.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="flex justify-center py-4">
                    <RefreshCw className="animate-spin h-6 w-6 text-primary" />
                  </div>
                ) : appointments.length > 0 ? (
                  <div className="space-y-4">
                    {/* Remove duplicates and show unique doctors */}
                    {Array.from(new Map(appointments.map(a => 
                      [a.doctor?.id, { 
                        id: a.doctor?.id, 
                        name: `${a.doctor?.first_name} ${a.doctor?.last_name}` 
                      }]
                    )).values()).map((doctor: any) => (
                      <div key={doctor.id} className="bg-slate-50 p-4 rounded-lg flex justify-between items-center">
                        <div>
                          <h3 className="font-medium">Dr. {doctor.name}</h3>
                          <p className="text-sm text-muted-foreground">Primary Care Physician</p>
                        </div>
                        <Button variant="outline" size="sm">View Profile</Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-sm text-muted-foreground mb-4">You have no doctors assigned yet.</p>
                    <Button variant="outline">Find a Doctor</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </PageTransition>
  );
};

export default Dashboard;

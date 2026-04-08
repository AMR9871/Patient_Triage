
import React, { useState } from 'react';
import PageTransition from '@/components/layout/PageTransition';
import Navbar from '@/components/Navbar';
import { useAuth } from '@/context/AuthContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2, UserPlus } from 'lucide-react';
import { useAdminData } from '@/hooks/useAdminData';
import DashboardStats from '@/components/admin/DashboardStats';
import DoctorsList from '@/components/admin/DoctorsList';
import PatientsList from '@/components/admin/PatientsList';
import AppointmentsList from '@/components/admin/AppointmentsList';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const { 
    doctors, 
    patients, 
    appointments, 
    loading, 
    stats, 
    updateUserRole 
  } = useAdminData(user?.id);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
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
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground">
              Manage users, doctors, and appointments
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button>
              <UserPlus className="mr-2 h-4 w-4" />
              Add New User
            </Button>
          </div>
        </div>
        
        <DashboardStats stats={stats} />
        
        <div className="mb-6">
          <Input
            placeholder="Search users by name or email..."
            value={searchTerm}
            onChange={handleSearch}
            className="max-w-xl"
          />
        </div>
        
        <Tabs defaultValue="doctors" className="mb-8">
          <TabsList>
            <TabsTrigger value="doctors">Doctors</TabsTrigger>
            <TabsTrigger value="patients">Patients</TabsTrigger>
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
          </TabsList>
          
          <TabsContent value="doctors" className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Manage Doctors</h2>
            <DoctorsList 
              doctors={doctors}
              searchTerm={searchTerm}
              onRoleChange={updateUserRole}
            />
          </TabsContent>
          
          <TabsContent value="patients" className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Manage Patients</h2>
            <PatientsList 
              patients={patients}
              searchTerm={searchTerm}
              onRoleChange={updateUserRole}
            />
          </TabsContent>
          
          <TabsContent value="appointments" className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">All Appointments</h2>
            <AppointmentsList appointments={appointments} />
          </TabsContent>
        </Tabs>
      </div>
    </PageTransition>
  );
};

export default AdminDashboard;

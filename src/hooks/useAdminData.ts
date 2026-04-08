
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface UserProfile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  role: 'admin' | 'doctor' | 'patient';
  created_at?: string;
  updated_at?: string;
  phone?: string | null;
}

export interface Appointment {
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

export interface DashboardStats {
  totalDoctors: number;
  totalPatients: number;
  totalAppointments: number;
  pendingAppointments: number;
}

export const useAdminData = (userId: string | undefined) => {
  const [doctors, setDoctors] = useState<UserProfile[]>([]);
  const [patients, setPatients] = useState<UserProfile[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats>({
    totalDoctors: 0,
    totalPatients: 0,
    totalAppointments: 0,
    pendingAppointments: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      if (!userId) return;
      
      try {
        setLoading(true);
        
        // Fetch doctors
        const { data: doctorsData, error: doctorsError } = await supabase
          .from('profiles')
          .select('*')
          .eq('role', 'doctor');
          
        if (doctorsError) throw doctorsError;
        
        // Fetch patients
        const { data: patientsData, error: patientsError } = await supabase
          .from('profiles')
          .select('*')
          .eq('role', 'patient');
          
        if (patientsError) throw patientsError;
        
        // Fetch appointments
        const { data: appointmentsData, error: appointmentsError } = await supabase
          .from('appointments')
          .select(`
            id,
            patient_id,
            doctor_id,
            appointment_date,
            status,
            notes,
            patient:profiles!patient_id(first_name, last_name),
            doctor:profiles!doctor_id(first_name, last_name)
          `)
          .order('appointment_date', { ascending: false });
          
        if (appointmentsError) throw appointmentsError;
        
        // Type cast the data to match our interfaces
        const typedDoctors = doctorsData?.map(doc => ({
          ...doc,
          role: doc.role as 'admin' | 'doctor' | 'patient'
        })) || [];
        
        const typedPatients = patientsData?.map(pat => ({
          ...pat,
          role: pat.role as 'admin' | 'doctor' | 'patient'
        })) || [];
        
        const typedAppointments = appointmentsData?.map(app => ({
          ...app,
          status: app.status as 'confirmed' | 'pending' | 'cancelled' | 'completed'
        })) || [];
        
        setDoctors(typedDoctors);
        setPatients(typedPatients);
        setAppointments(typedAppointments);
        
        // Calculate stats
        setStats({
          totalDoctors: typedDoctors.length || 0,
          totalPatients: typedPatients.length || 0,
          totalAppointments: typedAppointments.length || 0,
          pendingAppointments: typedAppointments.filter(a => a.status === 'pending').length || 0,
        });
      } catch (error: any) {
        toast.error('Error fetching data: ' + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  const updateUserRole = async (userId: string, role: 'admin' | 'doctor' | 'patient') => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ role })
        .eq('id', userId);
        
      if (error) throw error;
      
      // Update local state
      const updatedProfile = { role };
      
      if (role === 'doctor') {
        setDoctors(prev => [...prev.filter(d => d.id !== userId), { ...patients.find(p => p.id === userId)!, ...updatedProfile } as UserProfile]);
        setPatients(prev => prev.filter(p => p.id !== userId));
      } else if (role === 'patient') {
        setPatients(prev => [...prev.filter(p => p.id !== userId), { ...doctors.find(d => d.id === userId)!, ...updatedProfile } as UserProfile]);
        setDoctors(prev => prev.filter(d => d.id !== userId));
      }
      
      toast.success(`User role updated to ${role} successfully`);
    } catch (error: any) {
      toast.error('Error updating user role: ' + error.message);
    }
  };

  return {
    doctors,
    patients,
    appointments,
    loading,
    stats,
    updateUserRole
  };
};


import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Users } from 'lucide-react';

interface UserProfile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  role: 'admin' | 'doctor' | 'patient';
  created_at?: string;
  updated_at?: string;
  phone?: string | null;
}

interface PatientsListProps {
  patients: UserProfile[];
  searchTerm: string;
  onRoleChange: (userId: string, role: 'admin' | 'doctor' | 'patient') => void;
}

const PatientsList: React.FC<PatientsListProps> = ({ patients, searchTerm, onRoleChange }) => {
  const filteredPatients = patients.filter(patient => 
    patient.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.last_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (filteredPatients.length === 0) {
    return (
      <div className="text-center py-8">
        <Users className="h-12 w-12 mx-auto text-gray-300 mb-3" />
        <h3 className="text-lg font-medium text-gray-900">No patients found</h3>
        <p className="text-gray-500">No patients match your search criteria.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredPatients.map((patient) => (
        <Card key={patient.id}>
          <CardHeader className="pb-2">
            <div className="flex items-center">
              <Avatar className="h-10 w-10 mr-3">
                <AvatarFallback>{patient.first_name?.[0] || '?'}{patient.last_name?.[0] || '?'}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>{patient.first_name} {patient.last_name}</CardTitle>
                <CardDescription>{patient.email}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                View Profile
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => onRoleChange(patient.id, 'doctor')}
              >
                Promote to Doctor
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default PatientsList;

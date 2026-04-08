
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Stethoscope } from 'lucide-react';

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

interface DoctorsListProps {
  doctors: UserProfile[];
  searchTerm: string;
  onRoleChange: (userId: string, role: 'admin' | 'doctor' | 'patient') => void;
}

const DoctorsList: React.FC<DoctorsListProps> = ({ doctors, searchTerm, onRoleChange }) => {
  const filteredDoctors = doctors.filter(doctor => 
    doctor.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.last_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (filteredDoctors.length === 0) {
    return (
      <div className="text-center py-8">
        <Stethoscope className="h-12 w-12 mx-auto text-gray-300 mb-3" />
        <h3 className="text-lg font-medium text-gray-900">No doctors found</h3>
        <p className="text-gray-500">No doctors match your search criteria.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredDoctors.map((doctor) => (
        <Card key={doctor.id}>
          <CardHeader className="pb-2">
            <div className="flex items-center">
              <Avatar className="h-10 w-10 mr-3">
                <AvatarFallback>{doctor.first_name?.[0] || '?'}{doctor.last_name?.[0] || '?'}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>{doctor.first_name} {doctor.last_name}</CardTitle>
                <CardDescription>{doctor.email}</CardDescription>
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
                onClick={() => onRoleChange(doctor.id, 'patient')}
              >
                Change to Patient
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DoctorsList;

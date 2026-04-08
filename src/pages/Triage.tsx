
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageTransition from '@/components/layout/PageTransition';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileText, Mic, Upload, Send, Camera, Calendar } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const Triage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [symptomDescription, setSymptomDescription] = useState('');
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [severity, setSeverity] = useState<'mild' | 'moderate' | 'severe' | ''>('');
  const [onsetDate, setOnsetDate] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Medical history form state
  const [medicalHistory, setMedicalHistory] = useState('');
  const [allergies, setAllergies] = useState('');
  const [medications, setMedications] = useState('');
  
  // Function to handle symptom selection
  const toggleSymptom = (symptom: string) => {
    if (selectedSymptoms.includes(symptom)) {
      setSelectedSymptoms(selectedSymptoms.filter(s => s !== symptom));
    } else {
      setSelectedSymptoms([...selectedSymptoms, symptom]);
    }
  };

  // Submit symptom report
  const submitSymptomReport = async () => {
    if (!user) {
      toast.error('You must be logged in to submit a report');
      return;
    }

    const combinedSymptoms = [
      ...selectedSymptoms,
      symptomDescription ? `Description: ${symptomDescription}` : ''
    ].filter(Boolean).join('\n');
    
    if (!combinedSymptoms) {
      toast.error('Please describe your symptoms or select from the common symptoms');
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('symptom_reports')
        .insert([
          {
            patient_id: user.id,
            symptoms: combinedSymptoms,
            onset_date: onsetDate ? new Date(onsetDate).toISOString() : null,
            severity: severity || null
          }
        ]);
      
      if (error) throw error;
      
      toast.success('Symptom report submitted successfully');
      setSymptomDescription('');
      setSelectedSymptoms([]);
      setSeverity('');
      setOnsetDate('');
    } catch (error: any) {
      toast.error(`Error submitting report: ${error.message}`);
      console.error('Error submitting symptom report:', error);
    } finally {
      setLoading(false);
    }
  };

  // Save medical history
  const saveMedicalHistory = async () => {
    if (!user) {
      toast.error('You must be logged in to save your medical history');
      return;
    }

    setLoading(true);
    try {
      // Check if a record already exists
      const { data: existingRecord, error: fetchError } = await supabase
        .from('patient_records')
        .select('id')
        .eq('patient_id', user.id)
        .maybeSingle();
      
      if (fetchError) throw fetchError;
      
      if (existingRecord) {
        // Update existing record
        const { error: updateError } = await supabase
          .from('patient_records')
          .update({
            medical_history: medicalHistory,
            allergies: allergies,
            current_medications: medications,
            updated_at: new Date().toISOString()
          })
          .eq('id', existingRecord.id);
        
        if (updateError) throw updateError;
      } else {
        // Insert new record
        const { error: insertError } = await supabase
          .from('patient_records')
          .insert([
            {
              patient_id: user.id,
              medical_history: medicalHistory,
              allergies: allergies,
              current_medications: medications
            }
          ]);
        
        if (insertError) throw insertError;
      }
      
      toast.success('Medical history saved successfully');
    } catch (error: any) {
      toast.error(`Error saving medical history: ${error.message}`);
      console.error('Error saving medical history:', error);
    } finally {
      setLoading(false);
    }
  };

  // Upload document handler (mock function)
  const handleFileUpload = () => {
    toast.info('Document upload feature coming soon');
  };

  return (
    <PageTransition>
      <Navbar />
      
      <main className="container max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Patient Triage</h1>
        
        <Tabs defaultValue="symptoms" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="symptoms">Symptoms</TabsTrigger>
            <TabsTrigger value="history">Medical History</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
          </TabsList>
          
          <TabsContent value="symptoms" className="mt-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Describe Your Symptoms</CardTitle>
                <CardDescription>
                  Tell us what's bothering you today. Be as detailed as possible about your symptoms, 
                  when they started, and any relevant information.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="onset" className="text-sm font-medium">When did the symptoms start?</label>
                    <div className="flex items-center">
                      <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="onset"
                        type="date"
                        value={onsetDate}
                        onChange={(e) => setOnsetDate(e.target.value)}
                        className="max-w-xs"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="severity" className="text-sm font-medium">How severe are your symptoms?</label>
                    <Select value={severity} onValueChange={(value: any) => setSeverity(value)}>
                      <SelectTrigger className="max-w-xs">
                        <SelectValue placeholder="Select severity" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mild">Mild</SelectItem>
                        <SelectItem value="moderate">Moderate</SelectItem>
                        <SelectItem value="severe">Severe</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Textarea 
                    placeholder="Describe your symptoms in detail..."
                    className="min-h-32"
                    value={symptomDescription}
                    onChange={(e) => setSymptomDescription(e.target.value)}
                  />
                  
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" size="sm" className="flex items-center">
                      <Mic className="mr-2 h-4 w-4" />
                      Voice Input
                    </Button>
                    <Button variant="outline" size="sm" className="flex items-center">
                      <Camera className="mr-2 h-4 w-4" />
                      Take Photo
                    </Button>
                    <Button variant="outline" size="sm" className="flex items-center">
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Image
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="ml-auto flex items-center"
                  onClick={submitSymptomReport}
                  disabled={loading}
                >
                  <Send className="mr-2 h-4 w-4" />
                  {loading ? 'Submitting...' : 'Submit'}
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Common Symptoms</CardTitle>
                <CardDescription>
                  Select any of the common symptoms that apply to your condition.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {['Fever', 'Headache', 'Cough', 'Chest Pain', 'Shortness of Breath', 
                    'Nausea', 'Vomiting', 'Dizziness', 'Fatigue'].map((symptom) => (
                    <Button 
                      key={symptom} 
                      variant={selectedSymptoms.includes(symptom) ? "default" : "outline"} 
                      className="justify-start"
                      onClick={() => toggleSymptom(symptom)}
                    >
                      {symptom}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="history" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Medical History</CardTitle>
                <CardDescription>
                  Please provide information about your past medical conditions, allergies, and medications.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">Existing Conditions</h3>
                  <Textarea 
                    placeholder="List any existing medical conditions you have..." 
                    className="h-24"
                    value={medicalHistory}
                    onChange={(e) => setMedicalHistory(e.target.value)}
                  />
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Allergies</h3>
                  <Textarea 
                    placeholder="List any allergies you have..." 
                    className="h-24"
                    value={allergies}
                    onChange={(e) => setAllergies(e.target.value)}
                  />
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Current Medications</h3>
                  <Textarea 
                    placeholder="List medications you are currently taking..." 
                    className="h-24"
                    value={medications}
                    onChange={(e) => setMedications(e.target.value)}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="ml-auto"
                  onClick={saveMedicalHistory}
                  disabled={loading}
                >
                  {loading ? 'Saving...' : 'Save Medical History'}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="documents" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Upload Medical Documents</CardTitle>
                <CardDescription>
                  Upload any relevant medical reports, prescriptions, or test results.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <FileText className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                  <h3 className="font-medium mb-1">Drag and drop files here</h3>
                  <p className="text-sm text-gray-500 mb-4">or click to browse your files</p>
                  <Button variant="outline" onClick={handleFileUpload}>Upload Files</Button>
                </div>
                
                <div className="mt-6">
                  <h3 className="font-medium mb-3">Uploaded Documents</h3>
                  <p className="text-sm text-gray-500">No documents uploaded yet.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="mt-8 text-center">
          <Button size="lg" onClick={() => navigate('/dashboard')}>
            Return to Dashboard
          </Button>
          <p className="mt-2 text-sm text-gray-500">
            After submitting your information, we'll match you with the appropriate specialist.
          </p>
        </div>
      </main>
    </PageTransition>
  );
};

export default Triage;

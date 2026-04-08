# **Patient Triage System - Frontend Documentation**

## **Project Overview**
The **Patient Triage System** is a multi-page web application designed for **hospitals and healthcare facilities** to automate the patient triage process. The system enables **patients, doctors, and hospital administrators** to interact seamlessly through a responsive, user-friendly web interface.

This application supports **desktop and mobile platforms** and provides a complete front-end solution for the triage process, ensuring **efficient patient management, doctor consultations, and hospital administration.**

---

## **Features**

### **1. User Authentication and ID Handling**
- Patients can register and log in using **Aadhaar, CDSIMER ID, ABHA ID, or manually input details (Name, Age, Gender, Address).**
- **Facial recognition-based ID verification** is implemented using computer vision.
- Consent form for **ABHA database access**.
- **Fetch and update** patient history from CDSIMER and ABHA databases.

### **2. Patient Triage and Input Handling**
- **Chatbot/NLP-based input collection** for symptoms (supports **text, voice, and multiple languages**).
- Free-form or guided **structured questionnaire** for patients.
- **Speech-to-text and translation** support.
- **Image upload and analysis** for medical documents.

### **3. Doctor Mapping and Scheduling**
- **Doctor-patient matching system** based on symptoms and medical history.
- **Doctor availability check** and **appointment booking system**.
- **Doctors can view schedules, patient details, and update treatment plans.**

### **4. Medical Consultation and Follow-ups**
- Doctors can **review patient history, add findings, and prescribe treatments**.
- **Test scheduling and follow-up system** for additional reports and future appointments.
- **Medication tracking and reminders** for patients.

### **5. Admin and Dashboard Panel**
- **Role-based dashboards** for **patients, doctors, and admins**.
- **Admin panel** for managing doctors, patient records, triage analytics, and database maintenance.
- **Real-time patient status tracking and system load management.**

### **6. Database and Security Integration**
- **SQL-based database** for CDSIMER and ABHA integration.
- **Scalable to handle** an increase from **200 to 1200 patients per day**.
- **Aadhaar-based authentication and secure data storage with encryption**.

---

## **Technology Stack**
- **Frontend:** React.js / Next.js with TailwindCSS or Material UI, TypeScript.
- **Backend:** FastAPI / Django (Python) or Node.js with Express.
- **Database:** PostgreSQL or MySQL for structured data storage.
- **AI Modules:** NLP for chatbot, symptom extraction, speech-to-text, and translation.
- **Computer Vision:** OpenCV or TensorFlow for facial recognition.
- **Authentication:** OAuth or Aadhaar API for secure login.
- **Deployment:** Cloud-based hosting on AWS, Google Cloud, or Azure.

---



---

## **Setup and Deployment**

# **Patient Triage System - Frontend Documentation**

## **Project Overview**
The **Patient Triage System** is a multi-page web application designed for **hospitals and healthcare facilities** to automate the patient triage process. The system enables **patients, doctors, and hospital administrators** to interact seamlessly through a responsive, user-friendly web interface.

This application supports **desktop and mobile platforms** and provides a complete front-end solution for the triage process, ensuring **efficient patient management, doctor consultations, and hospital administration.**

---

## **Features**

### **1. User Authentication and ID Handling**
- Patients can register and log in using **Aadhaar, CDSIMER ID, ABHA ID, or manually input details (Name, Age, Gender, Address).**
- **Facial recognition-based ID verification** is implemented using computer vision.
- Consent form for **ABHA database access**.
- **Fetch and update** patient history from CDSIMER and ABHA databases.

### **2. Patient Triage and Input Handling**
- **Chatbot/NLP-based input collection** for symptoms (supports **text, voice, and multiple languages**).
- Free-form or guided **structured questionnaire** for patients.
- **Speech-to-text and translation** support.
- **Image upload and analysis** for medical documents.

### **3. Doctor Mapping and Scheduling**
- **Doctor-patient matching system** based on symptoms and medical history.
- **Doctor availability check** and **appointment booking system**.
- **Doctors can view schedules, patient details, and update treatment plans.**

### **4. Medical Consultation and Follow-ups**
- Doctors can **review patient history, add findings, and prescribe treatments**.
- **Test scheduling and follow-up system** for additional reports and future appointments.
- **Medication tracking and reminders** for patients.

### **5. Admin and Dashboard Panel**
- **Role-based dashboards** for **patients, doctors, and admins**.
- **Admin panel** for managing doctors, patient records, triage analytics, and database maintenance.
- **Real-time patient status tracking and system load management.**

### **6. Database and Security Integration**
- **SQL-based database** for CDSIMER and ABHA integration.
- **Scalable to handle** an increase from **200 to 1200 patients per day**.
- **Aadhaar-based authentication and secure data storage with encryption**.

---

## **Technology Stack**
- **Frontend:** React.js / Next.js with TailwindCSS or Material UI, TypeScript.
- **Backend:** FastAPI / Django (Python) or Node.js with Express.
- **Database:** PostgreSQL or MySQL for structured data storage.
- **AI Modules:** NLP for chatbot, symptom extraction, speech-to-text, and translation.
- **Computer Vision:** OpenCV or TensorFlow for facial recognition.
- **Authentication:** OAuth or Aadhaar API for secure login.
- **Deployment:** Cloud-based hosting on AWS, Google Cloud, or Azure.

---

## **Setup and Deployment**

### **Step 1: Clone the repository using the project's Git URL.**
```sh
git clone <YOUR_GIT_URL>
```

### **Step 2: Navigate to the project directory.**
```sh
cd <YOUR_PROJECT_NAME>
```

### **Step 3: Install the necessary dependencies.**
```sh
npm i
```

### **Step 4: Start the development server with auto-reloading and an instant preview.**
```sh
npm run dev
```

---

## **Future Enhancements**
- **Improved AI-driven chatbot** for automated triage.
- **Enhanced real-time doctor-patient communication via live chat/video integration.**
- **Integration with government health records for real-time updates.**

For further assistance, please contact the development team or refer to the project repository documentation.


## **Future Enhancements**
- **Improved AI-driven chatbot** for automated triage.
- **Enhanced real-time doctor-patient communication via live chat/video integration.**
- **Integration with government health records for real-time updates.**

For further assistance, please contact the development team or refer to the project repository documentation.


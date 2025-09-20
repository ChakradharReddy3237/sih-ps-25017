import React from 'react';
import { Routes, Route } from 'react-router-dom';
import StudentLayout from '../../components/layouts/StudentLayout';
import AlumniDirectory from './AlumniDirectory';
import AlumniProfileView from './AlumniProfileView';

const StudentPortal: React.FC = () => {
  return (
    <StudentLayout>
      <Routes>
        <Route path="/" element={<AlumniDirectory />} />
        <Route path="/directory" element={<AlumniDirectory />} />
        <Route path="/alumni/:id" element={<AlumniProfileView />} />
      </Routes>
    </StudentLayout>
  );
};

export default StudentPortal;
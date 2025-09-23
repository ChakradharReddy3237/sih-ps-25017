import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminLayout from '../../components/layouts/AdminLayout';
import AlumniManagement from './AlumniManagement';
import EventManagement from './EventManagement';
import AlumniProfile from './AumniProfile';

import Analytics from './Analytics';

const AdminPortal: React.FC = () => {
  return (
    <AdminLayout>
      <Routes>
        <Route path="/" element={<Analytics />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/alumni" element={<AlumniManagement />} />
        <Route path="/alumni-profile/:id" element={<AlumniProfile />} />

        <Route path="/events" element={<EventManagement />} />
      </Routes>
    </AdminLayout>
  );
};

export default AdminPortal;
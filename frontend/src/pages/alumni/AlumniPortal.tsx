import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AlumniLayout from '../../components/layouts/AlumniLayout';
import AlumniProfile from './AlumniProfile';
import AlumniContributions from './AlumniContributions';
import AlumniEvents from './AlumniEvents';

const AlumniPortal: React.FC = () => {
  return (
    <AlumniLayout>
      <Routes>
        <Route path="/" element={<AlumniProfile />} />
        <Route path="/profile" element={<AlumniProfile />} />
        <Route path="/contributions" element={<AlumniContributions />} />
        <Route path="/events" element={<AlumniEvents />} />
      </Routes>
    </AlumniLayout>
  );
};

export default AlumniPortal;
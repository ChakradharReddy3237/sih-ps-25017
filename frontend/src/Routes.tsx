import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/dashboard/page';
import AlumniDetail from './components/alumni-detail/page';

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={ <Dashboard />} />
        <Route path="/alumni/:id" element={<AlumniDetail />} />
      </Routes>
    </Router>
  );
}

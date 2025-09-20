import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { Search, Building, MapPin, Calendar } from 'lucide-react';

interface AlumniProfile {
  id: string;
  full_name: string;
  photo_url: string;
  current_company: string;
  current_role: string;
  graduation_year: number;
  department: {
    name: string;
  };
}

const AlumniDirectory: React.FC = () => {
  const [alumni, setAlumni] = useState<AlumniProfile[]>([]);
  const [filteredAlumni, setFilteredAlumni] = useState<AlumniProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchAlumni();
  }, []);

  useEffect(() => {
    const filtered = alumni.filter(person =>
      person.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      person.current_company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      person.department.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredAlumni(filtered);
  }, [searchTerm, alumni]);

  const fetchAlumni = async () => {
    const { data, error } = await supabase
      .from('alumni_profiles')
      .select(`
        id,
        full_name,
        photo_url,
        current_company,
        current_role,
        graduation_year,
        department:departments(name)
      `)
      .order('full_name');

    if (data) {
      setAlumni(data);
      setFilteredAlumni(data);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 font-['Poppins'] mb-2">Alumni Directory</h1>
          <p className="text-gray-600 font-['Inter']">
            Connect with alumni mentors and explore career opportunities
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, company, or department..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Alumni Grid */}
        {filteredAlumni.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No alumni found matching your search.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAlumni.map((person) => (
              <Link
                key={person.id}
                to={`/student/alumni/${person.id}`}
                className="group block"
              >
                <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-200 group-hover:scale-105">
                  <div className="p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center">
                        {person.photo_url ? (
                          <img
                            src={person.photo_url}
                            alt={person.full_name}
                            className="w-16 h-16 rounded-full object-cover"
                          />
                        ) : (
                          <span className="text-xl font-bold text-yellow-600">
                            {person.full_name.charAt(0)}
                          </span>
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-yellow-600 transition-colors">
                          {person.full_name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {person.department.name}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-gray-600">
                        <Building className="h-4 w-4 mr-2 text-gray-400" />
                        <span className="font-medium">{person.current_company || 'Not specified'}</span>
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-600">
                        <span className="w-4 h-4 mr-2 flex items-center justify-center">
                          💼
                        </span>
                        <span>{person.current_role || 'Not specified'}</span>
                      </div>

                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                        <span>Class of {person.graduation_year}</span>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <p className="text-xs text-gray-500 text-center">
                        Click to view profile and connect
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AlumniDirectory;
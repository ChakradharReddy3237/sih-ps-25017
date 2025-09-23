import React, { useState, useMemo, useEffect } from 'react';
import { Search, Filter, Eye, Edit, MoreVertical, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import CSVModal from '../../components/CSVModal';

const AlumniManagement: React.FC = () => {
  const navigate = useNavigate();
  // Search and filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [searchFilter, setSearchFilter] = useState<'all' | 'name' | 'email' | 'digitalId'>('all');
  const [departmentFilter, setDepartmentFilter] = useState<string>('');
  const [yearFilter, setYearFilter] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const [alumniPerPage] = useState(10);
  const [showFilters, setShowFilters] = useState(false);
  const [isCSVModalOpen, setIsCSVModalOpen] = useState(false);

  // Enhanced sample data with digital IDs
  const [alumni, setAlumni] = useState([
    {
      id: '1',
      digital_id: 'ALU2018CS001',
      full_name: 'Rajesh Kumar',
      email: 'rajesh.kumar@email.com',
      graduation_year: 2018,
      department: 'Computer Science Engineering',
      current_company: 'Microsoft',
      current_role: 'Senior Software Engineer',
      location: 'Bangalore, Karnataka',
      phone: '+91 9876543210',
      linkedin: 'https://linkedin.com/in/rajeshkumar',
      status: 'Active'
    },
    {
      id: '2',
      digital_id: 'ALU2019EC002',
      full_name: 'Priya Sharma',
      email: 'priya.sharma@email.com',
      graduation_year: 2019,
      department: 'Electronics Engineering',
      current_company: 'Intel',
      current_role: 'Hardware Engineer',
      location: 'Hyderabad, Telangana',
      phone: '+91 9876543211',
      linkedin: 'https://linkedin.com/in/priyasharma',
      status: 'Active'
    },
    {
      id: '3',
      digital_id: 'ALU2017ME003',
      full_name: 'Amit Singh',
      email: 'amit.singh@email.com',
      graduation_year: 2017,
      department: 'Mechanical Engineering',
      current_company: 'Tata Motors',
      current_role: 'Design Engineer',
      location: 'Pune, Maharashtra',
      phone: '+91 9876543212',
      linkedin: 'https://linkedin.com/in/amitsingh',
      status: 'Active'
    },
    {
      id: '4',
      digital_id: 'ALU2020IT004',
      full_name: 'Sneha Patel',
      email: 'sneha.patel@email.com',
      graduation_year: 2020,
      department: 'Information Technology',
      current_company: 'Google',
      current_role: 'Software Developer',
      location: 'Mumbai, Maharashtra',
      phone: '+91 9876543213',
      linkedin: 'https://linkedin.com/in/snehapatel',
      status: 'Active'
    },
    {
      id: '5',
      digital_id: 'ALU2016CE005',
      full_name: 'Arjun Reddy',
      email: 'arjun.reddy@email.com',
      graduation_year: 2016,
      department: 'Civil Engineering',
      current_company: 'L&T Construction',
      current_role: 'Project Manager',
      location: 'Chennai, Tamil Nadu',
      phone: '+91 9876543214',
      linkedin: 'https://linkedin.com/in/arjunreddy',
      status: 'Inactive'
    },
  ]);

  // Get unique departments and years for filter options
  const departments = useMemo(() => {
    const uniqueDepts = [...new Set(alumni.map(person => person.department))];
    return uniqueDepts.sort();
  }, [alumni]);

  const graduationYears = useMemo(() => {
    const uniqueYears = [...new Set(alumni.map(person => person.graduation_year))];
    return uniqueYears.sort((a, b) => b - a); // Latest first
  }, [alumni]);

  // Advanced search and filter logic
  const filteredAlumni = useMemo(() => {
    let filtered = alumni;

    // Apply search filter
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(person => {
        switch (searchFilter) {
          case 'name':
            return person.full_name.toLowerCase().includes(searchLower);
          case 'email':
            return person.email.toLowerCase().includes(searchLower);
          case 'digitalId':
            return person.digital_id.toLowerCase().includes(searchLower);
          case 'all':
          default:
            return (
              person.full_name.toLowerCase().includes(searchLower) ||
              person.email.toLowerCase().includes(searchLower) ||
              person.digital_id.toLowerCase().includes(searchLower) ||
              person.current_company.toLowerCase().includes(searchLower) ||
              person.current_role.toLowerCase().includes(searchLower)
            );
        }
      });
    }

    // Apply department filter
    if (departmentFilter) {
      filtered = filtered.filter(person => person.department === departmentFilter);
    }

    // Apply year filter
    if (yearFilter) {
      filtered = filtered.filter(person => person.graduation_year.toString() === yearFilter);
    }

    return filtered;
  }, [alumni, searchTerm, searchFilter, departmentFilter, yearFilter]);

  // Pagination logic
  const totalPages = Math.ceil(filteredAlumni.length / alumniPerPage);
  const startIndex = (currentPage - 1) * alumniPerPage;
  const endIndex = startIndex + alumniPerPage;
  const currentAlumni = filteredAlumni.slice(startIndex, endIndex);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, searchFilter, departmentFilter, yearFilter]);

  const clearFilters = () => {
    setSearchTerm('');
    setSearchFilter('all');
    setDepartmentFilter('');
    setYearFilter('');
  };

  const handleCSVImport = (importedData: any[]) => {
    // Merge imported data with existing alumni
    // In a real app, you'd want to handle duplicates more intelligently
    const newAlumni = [...alumni];
    
    importedData.forEach(importedAlumni => {
      const existingIndex = newAlumni.findIndex(a => 
        a.digital_id === importedAlumni.digital_id || a.email === importedAlumni.email
      );
      
      if (existingIndex !== -1) {
        // Update existing alumni
        newAlumni[existingIndex] = { ...newAlumni[existingIndex], ...importedAlumni };
      } else {
        // Add new alumni
        newAlumni.push(importedAlumni);
      }
    });
    
    setAlumni(newAlumni);
    setIsCSVModalOpen(false);
  };

  const handleViewProfile = (alumniId: string, openInNewTab: boolean = false) => {
    const profileUrl = `/admin/alumni-profile/${alumniId}`;
    if (openInNewTab) {
      window.open(profileUrl, '_blank');
    } else {
      navigate(profileUrl);
    }
  };

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 font-['Poppins'] mb-2">Alumni Management</h1>
          <p className="text-gray-600 font-['Inter']">
            Search, view, and manage alumni profiles and information
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-lg shadow p-6 mb-8 border border-gray-200">
          <div className="flex flex-col space-y-4">
            {/* Search Bar */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
              <div className="flex-1 max-w-lg">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder={`Search by ${searchFilter === 'all' ? 'name, email, digital ID, or company' : searchFilter}...`}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              {/* Search Filter Dropdown */}
              <div className="flex items-center space-x-3">
                <select
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value as 'all' | 'name' | 'email' | 'digitalId')}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                >
                  <option value="all">All Fields</option>
                  <option value="name">Name</option>
                  <option value="email">Email</option>
                  <option value="digitalId">Digital ID</option>
                </select>
                
                <button 
                  onClick={() => setShowFilters(!showFilters)}
                  className={`flex items-center space-x-2 px-4 py-2 border rounded-lg transition-colors ${
                    showFilters || departmentFilter || yearFilter
                      ? 'border-yellow-500 bg-yellow-50 text-yellow-700'
                      : 'border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <Filter className="h-4 w-4" />
                  <span>Filter</span>
                  {(departmentFilter || yearFilter) && (
                    <span className="bg-yellow-500 text-white text-xs rounded-full px-2 py-1">
                      {[departmentFilter, yearFilter].filter(Boolean).length}
                    </span>
                  )}
                </button>
                
                <button 
                  onClick={() => setIsCSVModalOpen(true)}
                  className="bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-600 transition-colors font-medium">
                  Export Data
                </button>
              </div>
            </div>

            {/* Advanced Filters */}
            {showFilters && (
              <div className="border-t pt-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                    <select
                      value={departmentFilter}
                      onChange={(e) => setDepartmentFilter(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    >
                      <option value="">All Departments</option>
                      {departments.map(dept => (
                        <option key={dept} value={dept}>{dept}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Graduation Year</label>
                    <select
                      value={yearFilter}
                      onChange={(e) => setYearFilter(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    >
                      <option value="">All Years</option>
                      {graduationYears.map(year => (
                        <option key={year} value={year.toString()}>{year}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="flex items-end">
                    <button
                      onClick={clearFilters}
                      className="flex items-center space-x-2 px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <X className="h-4 w-4" />
                      <span>Clear Filters</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Results Summary */}
            <div className="flex items-center justify-between text-sm text-gray-600 border-t pt-4">
              <div>
                Showing {currentAlumni.length} of {filteredAlumni.length} alumni
                {filteredAlumni.length !== alumni.length && ` (filtered from ${alumni.length} total)`}
              </div>
              <div className="flex items-center space-x-4">
                <span>Page {currentPage} of {totalPages}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Alumni Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Alumni Info
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Digital ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Graduation Year
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Department
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Current Position
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentAlumni.length > 0 ? (
                  currentAlumni.map((person) => (
                    <tr key={person.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center">
                              <span className="text-sm font-medium text-yellow-600">
                                {person.full_name.charAt(0)}
                              </span>
                            </div>
                          </div>
                          <div className="ml-4">
                            <button 
                              onClick={(e) => {
                                if (e.ctrlKey || e.metaKey) {
                                  handleViewProfile(person.id, true);
                                } else {
                                  handleViewProfile(person.id);
                                }
                              }}
                              className="text-sm font-medium text-gray-900 hover:text-blue-600 transition-colors cursor-pointer text-left"
                              title="Click to view profile (Ctrl+Click for new tab)"
                            >
                              {person.full_name}
                            </button>
                            <div className="text-sm text-gray-500">{person.location}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={(e) => {
                            if (e.ctrlKey || e.metaKey) {
                              handleViewProfile(person.id, true);
                            } else {
                              handleViewProfile(person.id);
                            }
                          }}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors cursor-pointer"
                          title="Click to view profile (Ctrl+Click for new tab)"
                        >
                          {person.digital_id}
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {person.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {person.graduation_year}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div className="max-w-[150px] truncate" title={person.department}>
                          {person.department}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 max-w-[150px] truncate" title={person.current_company}>
                          {person.current_company}
                        </div>
                        <div className="text-sm text-gray-500 max-w-[150px] truncate" title={person.current_role}>
                          {person.current_role}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          person.status === 'Active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {person.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button 
                            onClick={(e) => {
                              if (e.ctrlKey || e.metaKey) {
                                handleViewProfile(person.id, true);
                              } else {
                                handleViewProfile(person.id);
                              }
                            }}
                            className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50 transition-colors"
                            title="View Profile (Ctrl+Click for new tab)"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button 
                            className="text-gray-600 hover:text-gray-900 p-1 rounded hover:bg-gray-50 transition-colors"
                            title="Edit Profile"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button 
                            className="text-gray-600 hover:text-gray-900 p-1 rounded hover:bg-gray-50 transition-colors"
                            title="More Options"
                          >
                            <MoreVertical className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center justify-center text-gray-500">
                        <Search className="h-12 w-12 mb-4" />
                        <h3 className="text-lg font-medium mb-2">No alumni found</h3>
                        <p className="text-sm">
                          {searchTerm || departmentFilter || yearFilter
                            ? 'Try adjusting your search terms or filters'
                            : 'No alumni data available'}
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-6 flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
              <span className="font-medium">{Math.min(endIndex, filteredAlumni.length)}</span> of{' '}
              <span className="font-medium">{filteredAlumni.length}</span> results
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="flex items-center px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Previous
              </button>
              
              <div className="flex space-x-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      currentPage === page
                        ? 'bg-yellow-500 text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
              
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="flex items-center px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* CSV Import/Export Modal */}
      <CSVModal
        isOpen={isCSVModalOpen}
        onClose={() => setIsCSVModalOpen(false)}
        onImportComplete={handleCSVImport}
        currentData={alumni}
      />
    </div>
  );
};

export default AlumniManagement;
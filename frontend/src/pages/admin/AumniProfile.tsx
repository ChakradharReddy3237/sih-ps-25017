import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Edit, 
  Mail, 
  Phone, 
  MapPin, 
  Building, 
  Briefcase, 
  Calendar, 
  GraduationCap,
  Linkedin,
  ExternalLink,
  User,
  Save,
  X,
  MessageSquare,
  UserPlus,
  Download,
  DollarSign,
  Award,
  Clock,
  Users,
  TrendingUp,
  Activity,
  Upload
} from 'lucide-react';
import SendMessageModal from '../../components/SendMessageModal';
import AddToEventModal from '../../components/AddToEventModal';

interface AlumniData {
  id: string;
  digital_id: string;
  full_name: string;
  email: string;
  graduation_year: number;
  department: string;
  current_company: string;
  current_role: string;
  location: string;
  phone: string;
  linkedin: string;
  status: string;
  profile_image_url?: string;
  bio?: string;
  achievements?: string[];
  contributions?: {
    total_donated: number;
    events_participated: number;
    events_funded: number;
    mentorship_hours: number;
    students_recruited: number;
    job_postings_shared: number;
    referrals_provided: number;
  };
  recent_activities?: {
    events_participated: Array<{
      name: string;
      date: string;
      type: 'participated' | 'funded' | 'organized';
      amount?: number;
    }>;
    job_activities: Array<{
      type: 'posting' | 'referral' | 'recruitment';
      title: string;
      company: string;
      date: string;
      count?: number;
    }>;
  };
}

const AlumniProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState<AlumniData | null>(null);
  const [isSendMessageOpen, setIsSendMessageOpen] = useState(false);
  const [isAddToEventOpen, setIsAddToEventOpen] = useState(false);
  const [showAllActivities, setShowAllActivities] = useState(false);
  const [showAllAchievements, setShowAllAchievements] = useState(false);
  const [isQuickActionsOpen, setIsQuickActionsOpen] = useState(false);

  // Sample alumni data - in real app, fetch from API based on ID
  const sampleAlumniData: AlumniData[] = [
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
      status: 'Active',
      profile_image_url: 'https://via.placeholder.com/150x150/4F46E5/FFFFFF?text=RK',
      bio: 'Passionate software engineer with 6+ years of experience in full-stack development. Alumni mentor and active contributor to institutional events.',
      achievements: [
        'Microsoft MVP Award 2023',
        'Best Alumni Contributor 2022',
        'Tech Innovation Award 2021'
      ],
      contributions: {
        total_donated: 150000,
        events_participated: 8,
        events_funded: 3,
        mentorship_hours: 120,
        students_recruited: 5,
        job_postings_shared: 12,
        referrals_provided: 8
      },
      recent_activities: {
        events_participated: [
          { name: 'Annual Tech Symposium 2024', date: '2024-03-15', type: 'participated' },
          { name: 'Alumni Meet 2024', date: '2024-04-20', type: 'funded', amount: 50000 },
          { name: 'Career Guidance Workshop', date: '2024-05-10', type: 'organized' }
        ],
        job_activities: [
          { type: 'recruitment', title: 'Software Engineer', company: 'Microsoft', date: '2024-02-15', count: 2 },
          { type: 'posting', title: 'Frontend Developer', company: 'Microsoft', date: '2024-01-20', count: 1 },
          { type: 'referral', title: 'Full Stack Developer', company: 'Microsoft', date: '2024-03-05', count: 3 }
        ]
      }
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
      status: 'Active',
      profile_image_url: 'https://via.placeholder.com/150x150/E11D48/FFFFFF?text=PS',
      bio: 'Hardware engineering specialist with expertise in semiconductor design and IoT systems.',
      achievements: [
        'Intel Innovation Award 2023',
        'Women in Tech Excellence 2022'
      ],
      contributions: {
        total_donated: 85000,
        events_participated: 5,
        events_funded: 2,
        mentorship_hours: 60,
        students_recruited: 3,
        job_postings_shared: 8,
        referrals_provided: 4
      },
      recent_activities: {
        events_participated: [
          { name: 'Women in Engineering Summit', date: '2024-03-08', type: 'participated' },
          { name: 'Tech Career Fair', date: '2024-02-25', type: 'funded', amount: 35000 }
        ],
        job_activities: [
          { type: 'recruitment', title: 'Hardware Engineer', company: 'Intel', date: '2024-01-15', count: 1 },
          { type: 'referral', title: 'VLSI Engineer', company: 'Intel', date: '2024-02-10', count: 2 }
        ]
      }
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
      status: 'Active',
      profile_image_url: 'https://via.placeholder.com/150x150/059669/FFFFFF?text=AS',
      bio: 'Mechanical design engineer with focus on automotive systems and sustainable transportation.',
      achievements: [
        'Tata Excellence Award 2022',
        'Green Innovation Prize 2021'
      ],
      contributions: {
        total_donated: 120000,
        events_participated: 6,
        events_funded: 2,
        mentorship_hours: 90,
        students_recruited: 4,
        job_postings_shared: 6,
        referrals_provided: 5
      },
      recent_activities: {
        events_participated: [
          { name: 'Automotive Innovation Conference', date: '2024-01-20', type: 'participated' },
          { name: 'Engineering Excellence Awards', date: '2024-03-30', type: 'funded', amount: 60000 }
        ],
        job_activities: [
          { type: 'recruitment', title: 'Mechanical Engineer', company: 'Tata Motors', date: '2024-02-01', count: 2 },
          { type: 'posting', title: 'Design Engineer', company: 'Tata Motors', date: '2024-01-10', count: 1 }
        ]
      }
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
      status: 'Active',
      profile_image_url: 'https://via.placeholder.com/150x150/DC2626/FFFFFF?text=SP',
      bio: 'Full-stack developer passionate about AI/ML and building scalable web applications.',
      achievements: [
        'Google Code-in Mentor 2023',
        'Rising Star Award 2022'
      ],
      contributions: {
        total_donated: 45000,
        events_participated: 3,
        events_funded: 1,
        mentorship_hours: 40,
        students_recruited: 2,
        job_postings_shared: 4,
        referrals_provided: 3
      },
      recent_activities: {
        events_participated: [
          { name: 'Google Developer Day', date: '2024-02-15', type: 'participated' },
          { name: 'AI/ML Workshop', date: '2024-03-20', type: 'funded', amount: 25000 }
        ],
        job_activities: [
          { type: 'recruitment', title: 'Software Developer', company: 'Google', date: '2024-01-25', count: 1 },
          { type: 'referral', title: 'Frontend Developer', company: 'Google', date: '2024-02-20', count: 2 }
        ]
      }
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
      status: 'Inactive',
      profile_image_url: 'https://via.placeholder.com/150x150/7C3AED/FFFFFF?text=AR',
      bio: 'Civil engineering project manager specializing in large-scale infrastructure development.',
      achievements: [
        'Project Excellence Award 2021',
        'Infrastructure Innovation 2020'
      ],
      contributions: {
        total_donated: 200000,
        events_participated: 12,
        events_funded: 4,
        mentorship_hours: 150,
        students_recruited: 8,
        job_postings_shared: 15,
        referrals_provided: 10
      },
      recent_activities: {
        events_participated: [
          { name: 'Infrastructure Summit 2023', date: '2023-11-15', type: 'participated' },
          { name: 'Civil Engineering Excellence Awards', date: '2023-12-20', type: 'funded', amount: 75000 }
        ],
        job_activities: [
          { type: 'recruitment', title: 'Civil Engineer', company: 'L&T Construction', date: '2023-10-15', count: 3 },
          { type: 'posting', title: 'Project Manager', company: 'L&T Construction', date: '2023-11-01', count: 2 }
        ]
      }
    }
  ];

  // Find the alumni data based on ID - removing duplicate declaration
  const [alumniData, setAlumniData] = useState<AlumniData | null>(() => {
    return sampleAlumniData.find(alumni => alumni.id === id) || null;
  });

  const handleEdit = () => {
    if (alumniData) {
      setEditedData({ ...alumniData });
      setIsEditing(true);
    }
  };

  const handleSave = () => {
    if (editedData) {
      setAlumniData(editedData);
      setIsEditing(false);
      setEditedData(null);
      // In real app, make API call to update data
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedData(null);
  };

  const handleInputChange = (field: keyof AlumniData, value: any) => {
    if (editedData) {
      setEditedData({
        ...editedData,
        [field]: value
      });
    }
  };

  // Quick Actions handlers
  const handleSendMessage = async (message: { subject: string; body: string }) => {
    // In a real app, this would call an API to send email
    console.log('Sending message:', {
      from: 'admin@institution.edu',
      to: currentData?.email,
      subject: message.subject,
      body: message.body
    });
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    alert('Message sent successfully!');
  };

  const handleAddToEvent = async (eventId: string, role: string) => {
    // In a real app, this would call an API to add alumni to event
    console.log('Adding to event:', { alumniId: id, eventId, role });
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    alert(`${currentData?.full_name} has been added to the event as ${role}!`);
  };

  const handleViewDonations = () => {
    // Navigate to donations page or open modal
    alert('Viewing donation history...');
  };

  const handleExportProfile = () => {
    if (!currentData) return;
    
    // Create downloadable profile data
    const profileData = {
      ...currentData,
      exported_at: new Date().toISOString(),
    };
    
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(profileData, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `${currentData.full_name.replace(/\s+/g, '_')}_profile.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const currentData = isEditing ? editedData : alumniData;

  if (!currentData) {
    return (
      <div className="p-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900">Alumni Not Found</h2>
            <p className="text-gray-600 mt-2">The alumni profile you're looking for doesn't exist.</p>
            <button 
              onClick={() => navigate('/admin/alumni')}
              className="mt-4 bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-600 transition-colors"
            >
              Back to Alumni Management
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => navigate('/admin/alumni')}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Back to Alumni Management</span>
              </button>
            </div>
            
            <div className="flex items-center space-x-3">
              {isEditing ? (
                <>
                  <button 
                    onClick={handleCancel}
                    className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <X className="h-4 w-4" />
                    <span>Cancel</span>
                  </button>
                  <button 
                    onClick={handleSave}
                    className="flex items-center space-x-2 bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-600 transition-colors"
                  >
                    <Save className="h-4 w-4" />
                    <span>Save Changes</span>
                  </button>
                </>
              ) : (
                <button 
                  onClick={handleEdit}
                  className="flex items-center space-x-2 bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-600 transition-colors"
                >
                  <Edit className="h-4 w-4" />
                  <span>Edit Profile</span>
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Main Profile Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Info Card */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="relative">
                <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 h-40"></div>
                <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                <div className="absolute top-4 right-4">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    currentData.status === 'Active' 
                      ? 'bg-green-100 text-green-800 border border-green-200' 
                      : 'bg-gray-100 text-gray-800 border border-gray-200'
                  }`}>
                    <div className={`w-2 h-2 rounded-full mr-2 ${
                      currentData.status === 'Active' ? 'bg-green-500' : 'bg-gray-500'
                    }`}></div>
                    {currentData.status}
                  </span>
                </div>
              </div>
              <div className="px-8 pb-8">
                <div className="flex items-start space-x-6 -mt-20">
                  {/* Profile Picture with Drag & Drop Upload */}
                  <div className="flex-shrink-0">
                    <div className="relative group">
                      <div className="h-32 w-32 rounded-xl bg-white border-4 border-white shadow-xl overflow-hidden">
                        {currentData.profile_image_url ? (
                          <img 
                            src={currentData.profile_image_url} 
                            alt={currentData.full_name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-400 to-purple-500">
                            <span className="text-2xl font-bold text-white">
                              {currentData.full_name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                        )}
                      </div>
                      {isEditing && (
                        <div className="absolute inset-0 bg-black bg-opacity-60 rounded-xl flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer border-2 border-dashed border-white/50">
                          <div className="text-center text-white">
                            <Upload className="h-8 w-8 mx-auto mb-2" />
                            <div className="text-xs font-medium">Drag & Drop</div>
                            <div className="text-xs opacity-75">or Browse</div>
                          </div>
                          <input
                            type="file"
                            accept="image/*"
                            className="absolute inset-0 opacity-0 cursor-pointer"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                // In real app, upload to server and get URL
                                const reader = new FileReader();
                                reader.onload = (e) => {
                                  handleInputChange('profile_image_url', e.target?.result as string);
                                };
                                reader.readAsDataURL(file);
                              }
                            }}
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={(e) => {
                              e.preventDefault();
                              const file = e.dataTransfer.files?.[0];
                              if (file && file.type.startsWith('image/')) {
                                const reader = new FileReader();
                                reader.onload = (e) => {
                                  handleInputChange('profile_image_url', e.target?.result as string);
                                };
                                reader.readAsDataURL(file);
                              }
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex-1 mt-20">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        {isEditing ? (
                          <input
                            type="text"
                            value={currentData.full_name}
                            onChange={(e) => handleInputChange('full_name', e.target.value)}
                            className="text-3xl font-bold text-gray-900 border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none bg-transparent"
                          />
                        ) : (
                          <h1 className="text-3xl font-bold text-gray-900">{currentData.full_name}</h1>
                        )}
                        <p className="text-lg text-gray-600 mt-1">
                          {currentData.current_role} at {currentData.current_company}
                        </p>
                        <div className="flex items-center space-x-4 mt-3">
                          <span className="inline-flex items-center px-3 py-1 rounded-lg text-sm font-medium bg-blue-50 text-blue-700 border border-blue-200">
                            <GraduationCap className="w-4 h-4 mr-2" />
                            {currentData.digital_id}
                          </span>
                          <span className="inline-flex items-center px-3 py-1 rounded-lg text-sm font-medium bg-purple-50 text-purple-700 border border-purple-200">
                            <Calendar className="w-4 h-4 mr-2" />
                            Class of {currentData.graduation_year}
                          </span>
                          <span className="inline-flex items-center px-3 py-1 rounded-lg text-sm font-medium bg-green-50 text-green-700 border border-green-200">
                            <MapPin className="w-4 h-4 mr-2" />
                            {currentData.location}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Bio Section - Right below profile */}
                <div className="mt-6 px-8 pb-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">About</h3>
                    <User className="h-5 w-5 text-purple-500" />
                  </div>
                  {isEditing ? (
                    <textarea
                      value={currentData.bio || ''}
                      onChange={(e) => handleInputChange('bio', e.target.value)}
                      rows={3}
                      className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      placeholder="Add bio..."
                    />
                  ) : (
                    <p className="text-gray-600 leading-relaxed">
                      {currentData.bio || 'No bio available'}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Professional and Contact Information Side by Side */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Professional Information */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Professional Information</h2>
                  <Briefcase className="h-6 w-6 text-blue-500" />
                </div>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Building className="h-5 w-5 text-gray-400" />
                    <div className="flex-1">
                      <p className="text-sm text-gray-500">Current Company</p>
                      {isEditing ? (
                        <input
                          type="text"
                          value={currentData.current_company}
                          onChange={(e) => handleInputChange('current_company', e.target.value)}
                          className="w-full font-medium text-gray-900 border-b border-gray-300 focus:border-yellow-500 focus:outline-none bg-transparent"
                        />
                      ) : (
                        <p className="font-medium text-gray-900">{currentData.current_company}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Briefcase className="h-5 w-5 text-gray-400" />
                    <div className="flex-1">
                      <p className="text-sm text-gray-500">Current Role</p>
                      {isEditing ? (
                        <input
                          type="text"
                          value={currentData.current_role}
                          onChange={(e) => handleInputChange('current_role', e.target.value)}
                          className="w-full font-medium text-gray-900 border-b border-gray-300 focus:border-yellow-500 focus:outline-none bg-transparent"
                        />
                      ) : (
                        <p className="font-medium text-gray-900">{currentData.current_role}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <GraduationCap className="h-5 w-5 text-gray-400" />
                    <div className="flex-1">
                      <p className="text-sm text-gray-500">Department</p>
                      {isEditing ? (
                        <input
                          type="text"
                          value={currentData.department}
                          onChange={(e) => handleInputChange('department', e.target.value)}
                          className="w-full font-medium text-gray-900 border-b border-gray-300 focus:border-yellow-500 focus:outline-none bg-transparent"
                        />
                      ) : (
                        <p className="font-medium text-gray-900">{currentData.department}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-5 w-5 text-gray-400" />
                    <div className="flex-1">
                      <p className="text-sm text-gray-500">Graduation Year</p>
                      {isEditing ? (
                        <input
                          type="number"
                          value={currentData.graduation_year}
                          onChange={(e) => handleInputChange('graduation_year', parseInt(e.target.value))}
                          className="w-full font-medium text-gray-900 border-b border-gray-300 focus:border-yellow-500 focus:outline-none bg-transparent"
                        />
                      ) : (
                        <p className="font-medium text-gray-900">{currentData.graduation_year}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Contact Information</h2>
                  <Mail className="h-6 w-6 text-green-500" />
                </div>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-gray-400" />
                    <div className="flex-1">
                      <p className="text-sm text-gray-500">Email</p>
                      {isEditing ? (
                        <input
                          type="email"
                          value={currentData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className="w-full font-medium text-gray-900 border-b border-gray-300 focus:border-yellow-500 focus:outline-none bg-transparent"
                        />
                      ) : (
                        <p className="font-medium text-gray-900">{currentData.email}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-gray-400" />
                    <div className="flex-1">
                      <p className="text-sm text-gray-500">Phone</p>
                      {isEditing ? (
                        <input
                          type="tel"
                          value={currentData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className="w-full font-medium text-gray-900 border-b border-gray-300 focus:border-yellow-500 focus:outline-none bg-transparent"
                        />
                      ) : (
                        <p className="font-medium text-gray-900">{currentData.phone}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-5 w-5 text-gray-400" />
                    <div className="flex-1">
                      <p className="text-sm text-gray-500">Location</p>
                      {isEditing ? (
                        <input
                          type="text"
                          value={currentData.location}
                          onChange={(e) => handleInputChange('location', e.target.value)}
                          className="w-full font-medium text-gray-900 border-b border-gray-300 focus:border-yellow-500 focus:outline-none bg-transparent"
                        />
                      ) : (
                        <p className="font-medium text-gray-900">{currentData.location}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Linkedin className="h-5 w-5 text-gray-400" />
                    <div className="flex-1">
                      <p className="text-sm text-gray-500">LinkedIn</p>
                      {isEditing ? (
                        <input
                          type="url"
                          value={currentData.linkedin}
                          onChange={(e) => handleInputChange('linkedin', e.target.value)}
                          className="w-full font-medium text-gray-900 border-b border-gray-300 focus:border-yellow-500 focus:outline-none bg-transparent"
                        />
                      ) : (
                        <a 
                          href={currentData.linkedin} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="font-medium text-blue-600 hover:text-blue-700 flex items-center"
                        >
                          View Profile
                          <ExternalLink className="h-3 w-3 ml-1" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activities and Achievements Side by Side */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Recent Activities */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Recent Activities</h2>
                  <Activity className="h-6 w-6 text-blue-500" />
                </div>
                
                <div className="space-y-4">
                  {currentData.recent_activities?.events_participated?.slice(0, showAllActivities ? undefined : 2).map((activity, index) => (
                    <div key={`event-${index}`} className="group hover:bg-gray-50 rounded-lg p-3 border border-gray-100 transition-all duration-200">
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full flex items-center justify-center">
                          <Calendar className="w-4 h-4 text-blue-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                            {activity.type === 'funded' ? 'Funded Event' : 'Participated in Event'}
                          </h3>
                          <p className="text-xs text-gray-600 mt-1">{activity.name}</p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              {activity.type === 'funded' ? 'Sponsor' : 'Participant'}
                            </span>
                            <span className="text-xs text-gray-500">{activity.date}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {currentData.recent_activities?.job_activities?.slice(0, showAllActivities ? undefined : 1).map((activity, index) => (
                    <div key={`job-${index}`} className="group hover:bg-gray-50 rounded-lg p-3 border border-gray-100 transition-all duration-200">
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center">
                          <Briefcase className="w-4 h-4 text-green-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-semibold text-gray-900 group-hover:text-green-600 transition-colors">
                            {activity.type === 'recruitment' ? 'Recruitment' : 
                             activity.type === 'posting' ? 'Job Posting' : 'Referral'}
                          </h3>
                          <p className="text-xs text-gray-600 mt-1">
                            {activity.title} at {activity.company}
                          </p>
                          <div className="flex items-center justify-between mt-2">
                            <span className={`
                              inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium
                              ${activity.type === 'recruitment' ? 'bg-orange-100 text-orange-800' :
                                activity.type === 'posting' ? 'bg-green-100 text-green-800' :
                                'bg-purple-100 text-purple-800'}
                            `}>
                              {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}
                            </span>
                            <span className="text-xs text-gray-500">{activity.date}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {/* Show More/Less Button */}
                  {((currentData.recent_activities?.events_participated?.length || 0) + 
                    (currentData.recent_activities?.job_activities?.length || 0)) > 3 && (
                    <button
                      onClick={() => setShowAllActivities(!showAllActivities)}
                      className="w-full text-center py-2 text-sm text-blue-600 hover:text-blue-700 transition-colors"
                    >
                      {showAllActivities ? 'Show Less' : `Show More (${((currentData.recent_activities?.events_participated?.length || 0) + (currentData.recent_activities?.job_activities?.length || 0)) - 3} more)`}
                    </button>
                  )}
                  
                  {(!currentData.recent_activities?.events_participated?.length && 
                    !currentData.recent_activities?.job_activities?.length) && (
                    <div className="text-center py-8">
                      <Activity className="h-8 w-8 text-gray-300 mx-auto mb-2" />
                      <p className="text-sm text-gray-500">No recent activities</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Achievements */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Achievements</h2>
                  <Award className="h-6 w-6 text-yellow-500" />
                </div>
                
                <div className="space-y-4">
                  {currentData.achievements?.slice(0, showAllAchievements ? undefined : 2).map((achievement, index) => (
                    <div key={index} className="group hover:bg-gradient-to-r hover:from-yellow-50 hover:to-amber-50 rounded-lg p-3 border border-gray-100 transition-all duration-200">
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-yellow-100 to-amber-100 rounded-full flex items-center justify-center">
                          <Award className="w-4 h-4 text-yellow-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900 group-hover:text-yellow-700 transition-colors">
                            {achievement}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Show More/Less Button */}
                  {(currentData.achievements?.length || 0) > 2 && (
                    <button
                      onClick={() => setShowAllAchievements(!showAllAchievements)}
                      className="w-full text-center py-2 text-sm text-yellow-600 hover:text-yellow-700 transition-colors"
                    >
                      {showAllAchievements ? 'Show Less' : `Show More (${(currentData.achievements?.length || 0) - 2} more)`}
                    </button>
                  )}
                  
                  {(!currentData.achievements || currentData.achievements.length === 0) && (
                    <div className="text-center py-8">
                      <Award className="h-8 w-8 text-gray-300 mx-auto mb-2" />
                      <p className="text-sm text-gray-500">No achievements recorded</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Impact & Contributions + Quick Actions */}
          <div className="space-y-6">
            {/* Contribution Stats */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Impact & Contributions</h2>
                <TrendingUp className="h-6 w-6 text-green-500" />
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                {/* Total Donated */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center space-x-2">
                        <DollarSign className="h-5 w-5 text-green-600" />
                        <span className="text-sm font-medium text-green-800">Total Donated</span>
                      </div>
                      <div className="text-2xl font-bold text-green-900 mt-1">
                        ₹{currentData.contributions?.total_donated.toLocaleString('en-IN')}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">
                        Top Contributor
                      </div>
                    </div>
                  </div>
                </div>

                {/* Events & Activities Grid */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Calendar className="h-4 w-4 text-blue-600" />
                      <span className="text-xs font-medium text-blue-800">Events Participated</span>
                    </div>
                    <div className="text-xl font-bold text-blue-900">
                      {currentData.contributions?.events_participated}
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-purple-50 to-violet-50 border border-purple-200 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Award className="h-4 w-4 text-purple-600" />
                      <span className="text-xs font-medium text-purple-800">Events Funded</span>
                    </div>
                    <div className="text-xl font-bold text-purple-900">
                      {currentData.contributions?.events_funded}
                    </div>
                  </div>
                </div>

                {/* Mentorship & Job Activities Grid */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Clock className="h-4 w-4 text-orange-600" />
                      <span className="text-xs font-medium text-orange-800">Mentorship Hours</span>
                    </div>
                    <div className="text-xl font-bold text-orange-900">
                      {currentData.contributions?.mentorship_hours}
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-200 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Users className="h-4 w-4 text-indigo-600" />
                      <span className="text-xs font-medium text-indigo-800">Students Recruited</span>
                    </div>
                    <div className="text-xl font-bold text-indigo-900">
                      {currentData.contributions?.students_recruited}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions Dropdown */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 relative">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Quick Actions</h2>
                <MessageSquare className="h-6 w-6 text-blue-500" />
              </div>
              
              <div className="relative">
                <button 
                  onClick={() => setIsQuickActionsOpen(!isQuickActionsOpen)}
                  onMouseEnter={() => setIsQuickActionsOpen(true)}
                  className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg hover:from-blue-100 hover:to-purple-100 transition-all duration-200"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <MessageSquare className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="text-left">
                      <div className="text-sm font-semibold text-blue-900">Actions Menu</div>
                      <div className="text-xs text-blue-600">Click or hover to see options</div>
                    </div>
                  </div>
                  <div className={`transform transition-transform duration-200 ${isQuickActionsOpen ? 'rotate-180' : ''}`}>
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>

                {/* Dropdown Menu */}
                {isQuickActionsOpen && (
                  <div 
                    className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10"
                    onMouseLeave={() => setIsQuickActionsOpen(false)}
                  >
                    <div className="py-2">
                      <button 
                        onClick={() => {
                          setIsSendMessageOpen(true);
                          setIsQuickActionsOpen(false);
                        }}
                        className="w-full px-4 py-3 text-left hover:bg-blue-50 transition-colors flex items-center space-x-3"
                      >
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <MessageSquare className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">Send Message</div>
                          <div className="text-xs text-gray-500">Email communication</div>
                        </div>
                      </button>
                      
                      <button 
                        onClick={() => {
                          setIsAddToEventOpen(true);
                          setIsQuickActionsOpen(false);
                        }}
                        className="w-full px-4 py-3 text-left hover:bg-green-50 transition-colors flex items-center space-x-3"
                      >
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                          <UserPlus className="w-4 h-4 text-green-600" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">Add to Event</div>
                          <div className="text-xs text-gray-500">Invite to upcoming events</div>
                        </div>
                      </button>
                      
                      <button 
                        onClick={() => {
                          handleViewDonations();
                          setIsQuickActionsOpen(false);
                        }}
                        className="w-full px-4 py-3 text-left hover:bg-purple-50 transition-colors flex items-center space-x-3"
                      >
                        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                          <DollarSign className="w-4 h-4 text-purple-600" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">View Donations</div>
                          <div className="text-xs text-gray-500">Detailed contribution history</div>
                        </div>
                      </button>
                      
                      <button 
                        onClick={() => {
                          handleExportProfile();
                          setIsQuickActionsOpen(false);
                        }}
                        className="w-full px-4 py-3 text-left hover:bg-orange-50 transition-colors flex items-center space-x-3"
                      >
                        <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                          <Download className="w-4 h-4 text-orange-600" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">Export Profile</div>
                          <div className="text-xs text-gray-500">Download as PDF/CSV</div>
                        </div>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {isSendMessageOpen && (
        <SendMessageModal
          isOpen={isSendMessageOpen}
          onClose={() => setIsSendMessageOpen(false)}
          onSendMessage={handleSendMessage}
          recipientName={currentData.full_name}
          recipientEmail={currentData.email}
        />
      )}

      {isAddToEventOpen && (
        <AddToEventModal
          isOpen={isAddToEventOpen}
          onClose={() => setIsAddToEventOpen(false)}
          onAddToEvent={handleAddToEvent}
          alumniName={currentData.full_name}
        />
      )}
    </div>
  );
};

export default AlumniProfile;
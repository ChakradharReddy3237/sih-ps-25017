import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { 
  User,
  MapPin, 
  Building, 
  Calendar, 
  Linkedin,
  TrendingUp,
  Award,
  Users,
  DollarSign,
  Activity,
  Clock,
  ExternalLink,
  Mail,
  Phone,
  GraduationCap,
  Briefcase,
  UserCheck,
  UserPlus,
  Target,
  Star,
  ChevronRight,
  Eye,
  Download
} from 'lucide-react';
import StudentDetailModal from '../../components/StudentDetailModal.tsx';


interface AlumniData {
  id: string;
  full_name: string;
  email: string;
  graduation_year: number;
  department: string;
  current_company: string;
  current_role: string;
  location: string;
  phone: string;
  linkedin: string;
  bio?: string;
  profile_image_url?: string;
  contributions?: {
    total_donated: number;
    events_participated: number;
    events_funded: number;
    mentorship_hours: number;
    students_recruited: number;
    job_postings_shared: number;
    referrals_provided: number;
  };
}

interface Event {
  id: string;
  name: string;
  date: string;
  type: 'conference' | 'workshop' | 'networking' | 'career_fair' | 'alumni_meet';
  status: 'upcoming' | 'ongoing' | 'completed';
  description: string;
  participants_count: number;
  my_participation?: {
    role: 'participant' | 'sponsor' | 'organizer';
    amount_contributed?: number;
  };
}

interface Student {
  id: string;
  name: string;
  email: string;
  phone?: string;
  department: string;
  graduation_year: number;
  current_status: string;
  profile_image_url?: string;
  gpa?: number;
  location?: string;
  linkedin?: string;
  skills?: string[];
  achievements?: string[];
  internships?: Array<{
    company: string;
    role: string;
    duration: string;
    description: string;
  }>;
  referred_by?: string;
  recruited_by?: string;
  date_referred?: string;
  date_recruited?: string;
}

const AlumniDashboard: React.FC = () => {
  const { user } = useAuth();
  const [alumniData, setAlumniData] = useState<AlumniData | null>(null);
  const [participatedEvents, setParticipatedEvents] = useState<Event[]>([]);
  const [ongoingEvents, setOngoingEvents] = useState<Event[]>([]);
  const [referredStudents, setReferredStudents] = useState<Student[]>([]);
  const [recruitedStudents, setRecruitedStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [studentModalType, setStudentModalType] = useState<'referred' | 'recruited'>('referred');
  const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);

  // Sample data - replace with actual API calls
  const sampleAlumniData: AlumniData = {
    id: '1',
    full_name: 'Rajesh Kumar',
    email: 'rajesh.kumar@email.com',
    graduation_year: 2018,
    department: 'Computer Science Engineering',
    current_company: 'Microsoft',
    current_role: 'Senior Software Engineer',
    location: 'Bangalore, Karnataka',
    phone: '+91 9876543210',
    linkedin: 'https://linkedin.com/in/rajeshkumar',
    bio: 'Passionate software engineer with 6+ years of experience in full-stack development. Alumni mentor and active contributor to institutional events.',
    profile_image_url: 'https://via.placeholder.com/150x150/4F46E5/FFFFFF?text=RK',
    contributions: {
      total_donated: 150000,
      events_participated: 8,
      events_funded: 3,
      mentorship_hours: 120,
      students_recruited: 5,
      job_postings_shared: 12,
      referrals_provided: 8
    }
  };

  const sampleParticipatedEvents: Event[] = [
    {
      id: '1',
      name: 'Annual Tech Symposium 2024',
      date: '2024-03-15',
      type: 'conference',
      status: 'completed',
      description: 'Annual technology conference with industry leaders',
      participants_count: 250,
      my_participation: { role: 'participant' }
    },
    {
      id: '2',
      name: 'Alumni Meet 2024',
      date: '2024-04-20',
      type: 'alumni_meet',
      status: 'completed',
      description: 'Yearly alumni gathering and networking event',
      participants_count: 180,
      my_participation: { role: 'sponsor', amount_contributed: 50000 }
    },
    {
      id: '3',
      name: 'Career Guidance Workshop',
      date: '2024-05-10',
      type: 'workshop',
      status: 'completed',
      description: 'Workshop for current students on career development',
      participants_count: 100,
      my_participation: { role: 'organizer' }
    }
  ];

  const sampleOngoingEvents: Event[] = [
    {
      id: '4',
      name: 'AI/ML Innovation Summit 2024',
      date: '2024-12-15',
      type: 'conference',
      status: 'upcoming',
      description: 'Conference focused on AI and Machine Learning innovations',
      participants_count: 0
    },
    {
      id: '5',
      name: 'Industry Connect 2024',
      date: '2024-11-20',
      type: 'career_fair',
      status: 'upcoming',
      description: 'Career fair connecting students with industry professionals',
      participants_count: 0
    },
    {
      id: '6',
      name: 'Entrepreneurship Workshop Series',
      date: '2024-10-25',
      type: 'workshop',
      status: 'ongoing',
      description: 'Multi-session workshop on starting and scaling businesses',
      participants_count: 45
    }
  ];

  const sampleReferredStudents: Student[] = [
    {
      id: '1',
      name: 'Amit Sharma',
      email: 'amit.sharma@student.edu',
      phone: '+91 9876543210',
      department: 'Computer Science Engineering',
      graduation_year: 2025,
      current_status: 'Final Year Student',
      profile_image_url: 'https://via.placeholder.com/100x100/059669/FFFFFF?text=AS',
      gpa: 8.5,
      location: 'Bangalore, Karnataka',
      linkedin: 'https://linkedin.com/in/amitsharma',
      skills: ['Java', 'Python', 'React', 'Node.js', 'MongoDB'],
      achievements: ['Dean\'s List 2023', 'Best Project Award', 'Hackathon Winner'],
      internships: [
        {
          company: 'TCS',
          role: 'Software Developer Intern',
          duration: 'Jun 2024 - Aug 2024',
          description: 'Worked on web application development using React and Node.js'
        }
      ],
      referred_by: 'Rajesh Kumar',
      date_referred: '2024-01-15'
    },
    {
      id: '2',
      name: 'Priya Patel',
      email: 'priya.patel@student.edu',
      phone: '+91 9876543211',
      department: 'Information Technology',
      graduation_year: 2024,
      current_status: 'Placed at TCS',
      profile_image_url: 'https://via.placeholder.com/100x100/DC2626/FFFFFF?text=PP',
      gpa: 9.2,
      location: 'Mumbai, Maharashtra',
      linkedin: 'https://linkedin.com/in/priyapatel',
      skills: ['JavaScript', 'Angular', 'Spring Boot', 'MySQL', 'AWS'],
      achievements: ['Valedictorian 2024', 'Google Code-in Finalist'],
      internships: [
        {
          company: 'Infosys',
          role: 'Full Stack Developer Intern',
          duration: 'Dec 2023 - May 2024',
          description: 'Developed enterprise applications using Angular and Spring Boot'
        }
      ],
      referred_by: 'Rajesh Kumar',
      date_referred: '2023-12-10'
    },
    {
      id: '3',
      name: 'Ravi Singh',
      email: 'ravi.singh@student.edu',
      department: 'Computer Science Engineering',
      graduation_year: 2025,
      current_status: 'Intern at Infosys',
      profile_image_url: 'https://via.placeholder.com/100x100/7C3AED/FFFFFF?text=RS',
      gpa: 7.8,
      location: 'Delhi, India',
      skills: ['Python', 'Django', 'PostgreSQL', 'Docker'],
      referred_by: 'Rajesh Kumar',
      date_referred: '2024-03-20'
    }
  ];

  const sampleRecruitedStudents: Student[] = [
    {
      id: '4',
      name: 'Sneha Gupta',
      email: 'sneha.gupta@alumni.edu',
      phone: '+91 9876543212',
      department: 'Computer Science Engineering',
      graduation_year: 2023,
      current_status: 'Software Engineer at Microsoft',
      profile_image_url: 'https://via.placeholder.com/100x100/E11D48/FFFFFF?text=SG',
      gpa: 9.0,
      location: 'Hyderabad, Telangana',
      linkedin: 'https://linkedin.com/in/snehagupta',
      skills: ['C#', '.NET', 'Azure', 'SQL Server', 'React'],
      achievements: ['Microsoft Intern of the Year 2023', 'Outstanding Graduate Award'],
      internships: [
        {
          company: 'Microsoft',
          role: 'Software Engineer Intern',
          duration: 'Jan 2023 - Jun 2023',
          description: 'Worked on Azure cloud services and .NET applications'
        }
      ],
      recruited_by: 'Rajesh Kumar',
      date_recruited: '2023-02-15'
    },
    {
      id: '5',
      name: 'Arjun Reddy',
      email: 'arjun.reddy@alumni.edu',
      department: 'Information Technology',
      graduation_year: 2022,
      current_status: 'Senior Developer at Microsoft',
      profile_image_url: 'https://via.placeholder.com/100x100/059669/FFFFFF?text=AR',
      gpa: 8.7,
      location: 'Bangalore, Karnataka',
      linkedin: 'https://linkedin.com/in/arjunreddy',
      skills: ['TypeScript', 'React', 'Node.js', 'Azure', 'Kubernetes'],
      achievements: ['Employee of the Month - March 2024', 'Tech Innovation Award'],
      recruited_by: 'Rajesh Kumar',
      date_recruited: '2022-01-10'
    }
  ];

  useEffect(() => {
    // Simulate API calls
    const loadData = async () => {
      setLoading(true);
      // In real app, fetch data from APIs
      setAlumniData(sampleAlumniData);
      setParticipatedEvents(sampleParticipatedEvents);
      setOngoingEvents(sampleOngoingEvents);
      setReferredStudents(sampleReferredStudents);
      setRecruitedStudents(sampleRecruitedStudents);
      setLoading(false);
    };

    loadData();
  }, [user]);

  const handleStudentClick = (student: Student, type: 'referred' | 'recruited') => {
    setSelectedStudent(student);
    setStudentModalType(type);
    setIsStudentModalOpen(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  if (!alumniData) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-500">Unable to load dashboard. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="p-8 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="relative">
            <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 h-40"></div>
            <div className="absolute inset-0 bg-black bg-opacity-20"></div>
          </div>
          <div className="px-8 pb-8">
            <div className="flex items-start space-x-6 -mt-20">
              <div className="flex-shrink-0">
                <div className="h-32 w-32 rounded-xl bg-white border-4 border-white shadow-xl overflow-hidden">
                  {alumniData.profile_image_url ? (
                    <img 
                      src={alumniData.profile_image_url} 
                      alt={alumniData.full_name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-400 to-purple-500">
                      <span className="text-2xl font-bold text-white">
                        {alumniData.full_name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex-1 mt-20">
                <h1 className="text-3xl font-bold text-gray-900">{alumniData.full_name}</h1>
                <p className="text-lg text-gray-600 mt-1">
                  {alumniData.current_role} at {alumniData.current_company}
                </p>
                <div className="flex items-center space-x-4 mt-3">
                  <span className="inline-flex items-center px-3 py-1 rounded-lg text-sm font-medium bg-blue-50 text-blue-700 border border-blue-200">
                    <GraduationCap className="w-4 h-4 mr-2" />
                    Class of {alumniData.graduation_year}
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-lg text-sm font-medium bg-green-50 text-green-700 border border-green-200">
                    <MapPin className="w-4 h-4 mr-2" />
                    {alumniData.location}
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-lg text-sm font-medium bg-purple-50 text-purple-700 border border-purple-200">
                    <Building className="w-4 h-4 mr-2" />
                    {alumniData.department}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-5 w-5 text-green-600" />
                  <span className="text-sm font-medium text-green-800">Total Contributions</span>
                </div>
                <div className="text-2xl font-bold text-green-900 mt-1">
                  ₹{alumniData.contributions?.total_donated.toLocaleString('en-IN')}
                </div>
              </div>
              <div className="text-right">
                <TrendingUp className="h-8 w-8 text-green-500" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  <span className="text-sm font-medium text-blue-800">Events Participated</span>
                </div>
                <div className="text-2xl font-bold text-blue-900 mt-1">
                  {alumniData.contributions?.events_participated}
                </div>
              </div>
              <div className="text-right">
                <Activity className="h-8 w-8 text-blue-500" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-2">
                  <UserCheck className="h-5 w-5 text-purple-600" />
                  <span className="text-sm font-medium text-purple-800">Students Recruited</span>
                </div>
                <div className="text-2xl font-bold text-purple-900 mt-1">
                  {alumniData.contributions?.students_recruited}
                </div>
              </div>
              <div className="text-right">
                <Users className="h-8 w-8 text-purple-500" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-orange-600" />
                  <span className="text-sm font-medium text-orange-800">Mentorship Hours</span>
                </div>
                <div className="text-2xl font-bold text-orange-900 mt-1">
                  {alumniData.contributions?.mentorship_hours}
                </div>
              </div>
              <div className="text-right">
                <Target className="h-8 w-8 text-orange-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Events */}
          <div className="lg:col-span-2 space-y-8">
            {/* My Participated Events */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">My Participated Events</h2>
                <Activity className="h-6 w-6 text-blue-500" />
              </div>
              
              <div className="space-y-4">
                {participatedEvents.map((event) => (
                  <div key={event.id} className="group hover:bg-gray-50 rounded-lg p-4 border border-gray-100 transition-all duration-200">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                            {event.name}
                          </h3>
                          <span className={`
                            inline-flex items-center px-2 py-1 rounded-full text-xs font-medium
                            ${event.my_participation?.role === 'sponsor' ? 'bg-green-100 text-green-800' :
                              event.my_participation?.role === 'organizer' ? 'bg-purple-100 text-purple-800' :
                              'bg-blue-100 text-blue-800'}
                          `}>
                            {event.my_participation?.role ? 
                              event.my_participation.role.charAt(0).toUpperCase() + event.my_participation.role.slice(1) :
                              'Participant'}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{event.description}</p>
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <span className="flex items-center">
                            <Calendar className="w-3 h-3 mr-1" />
                            {event.date}
                          </span>
                          <span className="flex items-center">
                            <Users className="w-3 h-3 mr-1" />
                            {event.participants_count} participants
                          </span>
                          {event.my_participation?.amount_contributed && (
                            <span className="flex items-center text-green-600">
                              <DollarSign className="w-3 h-3 mr-1" />
                              ₹{event.my_participation.amount_contributed.toLocaleString('en-IN')} contributed
                            </span>
                          )}
                        </div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Ongoing & Upcoming Events */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">All Events</h2>
                <Calendar className="h-6 w-6 text-green-500" />
              </div>
              
              <div className="space-y-4">
                {ongoingEvents.map((event) => (
                  <div key={event.id} className="group hover:bg-gray-50 rounded-lg p-4 border border-gray-100 transition-all duration-200">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-green-600 transition-colors">
                            {event.name}
                          </h3>
                          <span className={`
                            inline-flex items-center px-2 py-1 rounded-full text-xs font-medium
                            ${event.status === 'upcoming' ? 'bg-blue-100 text-blue-800' :
                              event.status === 'ongoing' ? 'bg-green-100 text-green-800' :
                              'bg-gray-100 text-gray-800'}
                          `}>
                            {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{event.description}</p>
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <span className="flex items-center">
                            <Calendar className="w-3 h-3 mr-1" />
                            {event.date}
                          </span>
                          <span className="flex items-center">
                            <Users className="w-3 h-3 mr-1" />
                            {event.participants_count} participants
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors">
                          <Eye className="h-4 w-4" />
                        </button>
                        <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Students */}
          <div className="space-y-8">
            {/* Referred Students */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Referred Students</h2>
                <UserPlus className="h-6 w-6 text-green-500" />
              </div>
              
              <div className="space-y-4">
                {referredStudents.map((student) => (
                  <div 
                    key={student.id} 
                    className="group hover:bg-gray-50 rounded-lg p-3 border border-gray-100 transition-all duration-200 cursor-pointer"
                    onClick={() => handleStudentClick(student, 'referred')}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        {student.profile_image_url ? (
                          <img 
                            src={student.profile_image_url} 
                            alt={student.name}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                            <span className="text-sm font-bold text-white">
                              {student.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-semibold text-gray-900 group-hover:text-green-600 transition-colors">
                          {student.name}
                        </h3>
                        <p className="text-xs text-gray-600">{student.department}</p>
                        <p className="text-xs text-green-600 font-medium">{student.current_status}</p>
                        {student.gpa && (
                          <p className="text-xs text-gray-500">GPA: {student.gpa}/10</p>
                        )}
                      </div>
                      <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recruited Students */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Recruited Students</h2>
                <UserCheck className="h-6 w-6 text-purple-500" />
              </div>
              
              <div className="space-y-4">
                {recruitedStudents.map((student) => (
                  <div 
                    key={student.id} 
                    className="group hover:bg-gray-50 rounded-lg p-3 border border-gray-100 transition-all duration-200 cursor-pointer"
                    onClick={() => handleStudentClick(student, 'recruited')}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        {student.profile_image_url ? (
                          <img 
                            src={student.profile_image_url} 
                            alt={student.name}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center">
                            <span className="text-sm font-bold text-white">
                              {student.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">
                          {student.name}
                        </h3>
                        <p className="text-xs text-gray-600">{student.department}</p>
                        <p className="text-xs text-purple-600 font-medium">{student.current_status}</p>
                        {student.gpa && (
                          <p className="text-xs text-gray-500">GPA: {student.gpa}/10</p>
                        )}
                      </div>
                      <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Info Card */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Contact Information</h2>
                <Mail className="h-6 w-6 text-blue-500" />
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium text-gray-900">{alumniData.email}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium text-gray-900">{alumniData.phone}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Linkedin className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">LinkedIn</p>
                    <a 
                      href={alumniData.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="font-medium text-blue-600 hover:text-blue-700 flex items-center"
                    >
                      View Profile
                      <ExternalLink className="h-3 w-3 ml-1" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Student Detail Modal */}
      <StudentDetailModal
        isOpen={isStudentModalOpen}
        onClose={() => setIsStudentModalOpen(false)}
        student={selectedStudent}
        type={studentModalType}
      />
    </div>
  );
};

export default AlumniDashboard;
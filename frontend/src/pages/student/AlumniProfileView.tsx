import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { ArrowLeft, Building, Calendar, MapPin, Linkedin, MessageCircle, Users } from 'lucide-react';
import RequestModal from '../../components/RequestModal';

interface AlumniProfile {
  id: string;
  full_name: string;
  photo_url: string;
  current_address: string;
  graduation_year: number;
  current_company: string;
  current_role: string;
  linkedin_profile_url: string;
  department: {
    name: string;
  };
}

const AlumniProfileView: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<AlumniProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [requestType, setRequestType] = useState<'Mentorship' | 'Seminar Talk'>('Mentorship');

  useEffect(() => {
    if (id) {
      fetchProfile();
    }
  }, [id]);

  const fetchProfile = async () => {
    if (!id) return;

    const { data, error } = await supabase
      .from('alumni_profiles')
      .select(`
        id,
        full_name,
        photo_url,
        current_address,
        graduation_year,
        current_company,
        current_role,
        linkedin_profile_url,
        department:departments(name)
      `)
      .eq('id', id)
      .single();

    if (data) {
      setProfile(data);
    }
    setLoading(false);
  };

  const handleRequestClick = (type: 'Mentorship' | 'Seminar Talk') => {
    setRequestType(type);
    setShowRequestModal(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-500">Alumni profile not found.</p>
        <button
          onClick={() => navigate('/student/directory')}
          className="mt-4 bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors"
        >
          Back to Directory
        </button>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate('/student/directory')}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Directory
        </button>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-900 to-blue-800 px-8 py-6">
            <div className="flex items-center space-x-6">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
                {profile.photo_url ? (
                  <img
                    src={profile.photo_url}
                    alt={profile.full_name}
                    className="w-24 h-24 rounded-full object-cover"
                  />
                ) : (
                  <span className="text-3xl font-bold text-blue-900">
                    {profile.full_name.charAt(0)}
                  </span>
                )}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white font-['Poppins']">
                  {profile.full_name}
                </h1>
                <p className="text-blue-200 text-lg">
                  {profile.department.name}
                </p>
                <p className="text-blue-300">
                  Class of {profile.graduation_year}
                </p>
              </div>
            </div>
          </div>

          <div className="p-8">
            {/* Professional Information */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Professional Information</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center text-gray-900 mb-2">
                      <Building className="h-5 w-5 mr-3 text-gray-500" />
                      <span className="font-medium">Current Company</span>
                    </div>
                    <p className="text-gray-700 ml-8">
                      {profile.current_company || 'Not specified'}
                    </p>
                  </div>
                  
                  <div>
                    <div className="flex items-center text-gray-900 mb-2">
                      <span className="w-5 h-5 mr-3 flex items-center justify-center text-gray-500">
                        💼
                      </span>
                      <span className="font-medium">Current Role</span>
                    </div>
                    <p className="text-gray-700 ml-8">
                      {profile.current_role || 'Not specified'}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex items-center text-gray-900 mb-2">
                      <MapPin className="h-5 w-5 mr-3 text-gray-500" />
                      <span className="font-medium">Location</span>
                    </div>
                    <p className="text-gray-700 ml-8">
                      {profile.current_address || 'Not specified'}
                    </p>
                  </div>

                  {profile.linkedin_profile_url && (
                    <div>
                      <div className="flex items-center text-gray-900 mb-2">
                        <Linkedin className="h-5 w-5 mr-3 text-gray-500" />
                        <span className="font-medium">LinkedIn</span>
                      </div>
                      <div className="ml-8">
                        <a
                          href={profile.linkedin_profile_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-yellow-600 hover:text-yellow-700 hover:underline"
                        >
                          View LinkedIn Profile
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Connect with {profile.full_name}</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <button
                  onClick={() => handleRequestClick('Mentorship')}
                  className="flex items-center justify-center space-x-3 bg-yellow-500 text-white py-4 px-6 rounded-lg hover:bg-yellow-600 transition-colors font-medium"
                >
                  <MessageCircle className="h-5 w-5" />
                  <span>Request One-on-One Session</span>
                </button>
                
                <button
                  onClick={() => handleRequestClick('Seminar Talk')}
                  className="flex items-center justify-center space-x-3 bg-blue-500 text-white py-4 px-6 rounded-lg hover:bg-blue-600 transition-colors font-medium"
                >
                  <Users className="h-5 w-5" />
                  <span>Request a Campus Talk</span>
                </button>
              </div>
              
              <p className="text-sm text-gray-600 mt-4 text-center">
                Your request will be sent to the alumni for approval. They will contact you directly if they accept.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Request Modal */}
      {showRequestModal && (
        <RequestModal
          isOpen={showRequestModal}
          onClose={() => setShowRequestModal(false)}
          alumniName={profile.full_name}
          alumniId={profile.id}
          requestType={requestType}
        />
      )}
    </div>
  );
};

export default AlumniProfileView;
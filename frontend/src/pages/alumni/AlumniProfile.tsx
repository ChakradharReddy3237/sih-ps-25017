import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
import { Edit, Save, X, MapPin, Building, Calendar, Linkedin } from 'lucide-react';

interface AlumniProfile {
  id: string;
  full_name: string;
  photo_url: string;
  phone_number: string;
  current_address: string;
  graduation_year: number;
  department_id: string;
  current_company: string;
  current_role: string;
  linkedin_profile_url: string;
  students_recruited: string;
}

interface Department {
  id: string;
  name: string;
}

const AlumniProfile: React.FC = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<AlumniProfile | null>(null);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editData, setEditData] = useState<Partial<AlumniProfile>>({});

  useEffect(() => {
    fetchProfile();
    fetchDepartments();
  }, [user]);

  const fetchProfile = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('alumni_profiles')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (data) {
      setProfile(data);
      setEditData(data);
    }
    setLoading(false);
  };

  const fetchDepartments = async () => {
    const { data } = await supabase
      .from('departments')
      .select('*')
      .order('name');

    if (data) {
      setDepartments(data);
    }
  };

  const handleSave = async () => {
    if (!profile) return;

    setSaving(true);
    const { error } = await supabase
      .from('alumni_profiles')
      .update(editData)
      .eq('id', profile.id);

    if (!error) {
      setProfile({ ...profile, ...editData });
      setIsEditing(false);
    }
    setSaving(false);
  };

  const handleCancel = () => {
    setEditData(profile || {});
    setIsEditing(false);
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
        <p className="text-gray-500">Profile not found. Please contact admin.</p>
      </div>
    );
  }

  const selectedDepartment = departments.find(d => d.id === profile.department_id);

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-900 to-blue-800 px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
                  {profile.photo_url ? (
                    <img
                      src={profile.photo_url}
                      alt={profile.full_name}
                      className="w-20 h-20 rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-2xl font-bold text-blue-900">
                      {profile.full_name.charAt(0)}
                    </span>
                  )}
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white font-['Poppins']">
                    {profile.full_name}
                  </h1>
                  <p className="text-blue-200">
                    {selectedDepartment?.name} • Class of {profile.graduation_year}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-600 transition-colors flex items-center space-x-2"
              >
                <Edit className="h-4 w-4" />
                <span>{isEditing ? 'Cancel Edit' : 'Edit Profile'}</span>
              </button>
            </div>
          </div>

          <div className="p-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Contact Information */}
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">
                  Contact Information
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    {isEditing ? (
                      <input
                        type="tel"
                        value={editData.phone_number || ''}
                        onChange={(e) => setEditData({ ...editData, phone_number: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
                        placeholder="+91 98765 43210"
                      />
                    ) : (
                      <div className="flex items-center text-gray-900">
                        <span>{profile.phone_number || 'Not provided'}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Current Address
                    </label>
                    {isEditing ? (
                      <textarea
                        value={editData.current_address || ''}
                        onChange={(e) => setEditData({ ...editData, current_address: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
                        rows={3}
                        placeholder="Phase 8, Mohali, Punjab"
                      />
                    ) : (
                      <div className="flex items-start text-gray-900">
                        <MapPin className="h-4 w-4 mr-2 mt-1 text-gray-500" />
                        <span>{profile.current_address || 'Not provided'}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Professional Information */}
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">
                  Professional Information
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Current Company
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editData.current_company || ''}
                        onChange={(e) => setEditData({ ...editData, current_company: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
                        placeholder="Microsoft"
                      />
                    ) : (
                      <div className="flex items-center text-gray-900">
                        <Building className="h-4 w-4 mr-2 text-gray-500" />
                        <span>{profile.current_company || 'Not provided'}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Current Role
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editData.current_role || ''}
                        onChange={(e) => setEditData({ ...editData, current_role: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
                        placeholder="Senior Software Engineer"
                      />
                    ) : (
                      <div className="flex items-center text-gray-900">
                        <span>{profile.current_role || 'Not provided'}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      LinkedIn Profile
                    </label>
                    {isEditing ? (
                      <input
                        type="url"
                        value={editData.linkedin_profile_url || ''}
                        onChange={(e) => setEditData({ ...editData, linkedin_profile_url: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
                        placeholder="https://linkedin.com/in/yourprofile"
                      />
                    ) : (
                      <div className="flex items-center text-gray-900">
                        <Linkedin className="h-4 w-4 mr-2 text-gray-500" />
                        {profile.linkedin_profile_url ? (
                          <a 
                            href={profile.linkedin_profile_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-yellow-600 hover:text-yellow-700"
                          >
                            View LinkedIn Profile
                          </a>
                        ) : (
                          <span>Not provided</span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Students Recruited */}
            <div className="mt-8">
              <h2 className="text-xl font-semibold text-gray-900 border-b pb-2 mb-4">
                Students Recruited
              </h2>
              {isEditing ? (
                <textarea
                  value={editData.students_recruited || ''}
                  onChange={(e) => setEditData({ ...editData, students_recruited: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
                  rows={4}
                  placeholder="List students you've helped recruit (manually managed for now)"
                />
              ) : (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-900">
                    {profile.students_recruited || 'No recruits recorded yet.'}
                  </p>
                </div>
              )}
            </div>

            {/* Save/Cancel Buttons */}
            {isEditing && (
              <div className="mt-8 flex space-x-4">
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-600 transition-colors flex items-center space-x-2 disabled:opacity-50"
                >
                  <Save className="h-4 w-4" />
                  <span>{saving ? 'Saving...' : 'Save Changes'}</span>
                </button>
                <button
                  onClick={handleCancel}
                  className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors flex items-center space-x-2"
                >
                  <X className="h-4 w-4" />
                  <span>Cancel</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlumniProfile;
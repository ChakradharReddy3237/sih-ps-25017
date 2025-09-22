import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, Users, Settings } from 'lucide-react';

const WelcomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-blue-900 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <GraduationCap className="h-10 w-10 text-yellow-400" />
              <div>
                <h1 className="text-3xl font-bold font-['Poppins']">Plenilune</h1>
                <p className="text-blue-200 text-sm">Alumni Management Platform</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-blue-200 text-sm">Punjab Engineering Institute</p>
              <p className="text-blue-100 text-xs">Excellence in Engineering Education</p>
            </div>
            <div className="flex items-center space-x-4">
                <button 
                    onClick={() => navigate('/login')}
                    className="bg-yellow-400 text-blue-900 font-semibold px-4 py-2 rounded-lg hover:bg-yellow-500 transition-colors"
                >
                    Login
                </button>
                <button 
                    onClick={() => navigate('/signup')}
                    className="bg-transparent border border-white text-white font-semibold px-4 py-2 rounded-lg hover:bg-white hover:text-blue-900 transition-colors"
                >
                    Signup
                </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-6 font-['Poppins']">
            Connect. Contribute. <span className="text-yellow-500">Collaborate.</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-['Inter']">
            Building bridges between our alumni community and current students. 
            Join a network of engineering excellence that spans generations.
          </p>
        </div>


        {/* Features Section */}
        <div className="mt-20 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🤝</span>
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Mentorship</h4>
            <p className="text-gray-600 text-sm">One-on-one guidance from industry experts</p>
          </div>
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">💼</span>
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Opportunities</h4>
            <p className="text-gray-600 text-sm">Internships and job referrals from alumni</p>
          </div>
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🎯</span>
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Events</h4>
            <p className="text-gray-600 text-sm">Campus talks and networking events</p>
          </div>
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">💝</span>
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Giving Back</h4>
            <p className="text-gray-600 text-sm">Support institutional development</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-8 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-blue-200">
            © 2025 Punjab Engineering Institute. All rights reserved.
          </p>
          <p className="text-blue-300 text-sm mt-2">
            Connecting generations of engineering excellence
          </p>
        </div>
      </footer>
    </div>
  );
};

export default WelcomePage;
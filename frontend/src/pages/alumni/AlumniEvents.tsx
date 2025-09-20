import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Target, Users } from 'lucide-react';

const AlumniEvents: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');

  const tabs = [
    { id: 'upcoming' as const, label: 'Upcoming Events' },
    { id: 'past' as const, label: 'Past Events' },
  ];

  const renderUpcomingEvents = () => (
    <div>
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Upcoming Events</h3>
        <p className="text-gray-600">Support upcoming institutional events through donations and participation.</p>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Sample Event Card */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
          <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
            <div className="text-center text-white">
              <Calendar className="h-12 w-12 mx-auto mb-2" />
              <p className="text-sm">Event Image</p>
            </div>
          </div>
          <div className="p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Annual Tech Symposium 2025</h4>
            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
              Join us for our annual technology symposium featuring industry leaders, 
              innovation showcases, and networking opportunities.
            </p>
            
            <div className="space-y-2 mb-4">
              <div className="flex items-center text-sm text-gray-600">
                <Clock className="h-4 w-4 mr-2" />
                <span>March 15, 2025 • 9:00 AM - 6:00 PM</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="h-4 w-4 mr-2" />
                <span>Main Auditorium, Campus</span>
              </div>
            </div>

            {/* Funding Progress */}
            <div className="mb-4">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-gray-600">Funding Progress</span>
                <span className="font-medium text-gray-900">₹45,000 / ₹100,000</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '45%' }}></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">45% funded • 25 contributors</p>
            </div>

            <button className="w-full bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 transition-colors font-medium">
              Fund This Event
            </button>
          </div>
        </div>

        {/* Placeholder for more events */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
          <div className="h-48 bg-gradient-to-r from-green-500 to-teal-600 flex items-center justify-center">
            <div className="text-center text-white">
              <Users className="h-12 w-12 mx-auto mb-2" />
              <p className="text-sm">Event Image</p>
            </div>
          </div>
          <div className="p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Alumni Meet 2025</h4>
            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
              Annual alumni gathering with cultural events, awards ceremony, 
              and reunion celebrations across all batches.
            </p>
            
            <div className="space-y-2 mb-4">
              <div className="flex items-center text-sm text-gray-600">
                <Clock className="h-4 w-4 mr-2" />
                <span>April 20, 2025 • 10:00 AM - 8:00 PM</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="h-4 w-4 mr-2" />
                <span>Sports Complex, Campus</span>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-gray-600">Funding Progress</span>
                <span className="font-medium text-gray-900">₹80,000 / ₹150,000</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '53%' }}></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">53% funded • 42 contributors</p>
            </div>

            <button className="w-full bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 transition-colors font-medium">
              Fund This Event
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPastEvents = () => (
    <div>
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Past Events</h3>
        <p className="text-gray-600">View gallery and provide feedback for completed events.</p>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
          <div className="h-48 bg-gradient-to-r from-indigo-500 to-blue-600 flex items-center justify-center">
            <div className="text-center text-white">
              <Calendar className="h-12 w-12 mx-auto mb-2" />
              <p className="text-sm">Event Gallery</p>
            </div>
          </div>
          <div className="p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Tech Conference 2024</h4>
            <p className="text-gray-600 text-sm mb-4">
              Successfully completed with 300+ attendees and industry speakers.
            </p>
            
            <div className="flex items-center text-sm text-gray-600 mb-4">
              <Calendar className="h-4 w-4 mr-2" />
              <span>Completed on October 15, 2024</span>
            </div>

            <div className="space-y-2">
              <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors font-medium">
                View Gallery
              </button>
              <button className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                Provide Feedback
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 font-['Poppins'] mb-2">Events</h1>
          <p className="text-gray-600 font-['Inter']">
            Support institutional events and connect with the alumni community
          </p>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-yellow-500 text-yellow-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === 'upcoming' && renderUpcomingEvents()}
          {activeTab === 'past' && renderPastEvents()}
        </div>
      </div>
    </div>
  );
};

export default AlumniEvents;
import React, { useState } from 'react';
import { Heart, Users, Briefcase } from 'lucide-react';

const AlumniContributions: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'donations' | 'mentorship' | 'recruiting'>('donations');

  const tabs = [
    { id: 'donations' as const, label: 'Donations', icon: Heart },
    { id: 'mentorship' as const, label: 'Mentorship & Referrals', icon: Users },
    { id: 'recruiting' as const, label: 'Recruiter Activity', icon: Briefcase },
  ];

  const renderDonations = () => (
    <div>
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Your Donations</h3>
        <p className="text-gray-600">Track your financial contributions to institutional events and causes.</p>
      </div>
      
      <div className="bg-white border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Event
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount (₹)
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Transaction ID
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  No donations recorded yet
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">-</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">-</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">-</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderMentorship = () => (
    <div>
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Mentorship Requests</h3>
        <p className="text-gray-600">Requests from students seeking your guidance and expertise.</p>
      </div>
      
      <div className="space-y-4">
        <div className="bg-white border rounded-lg p-6">
          <div className="text-center py-8">
            <Users className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h4 className="text-lg font-medium text-gray-900 mb-2">No requests yet</h4>
            <p className="text-gray-500">
              Students will be able to request mentorship sessions and campus talks from you.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderRecruiting = () => (
    <div>
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Your Recruiting Activity</h3>
        <p className="text-gray-600">Job opportunities you've posted and students you've recruited.</p>
      </div>
      
      <div className="space-y-6">
        {/* Posted Opportunities */}
        <div className="bg-white border rounded-lg p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Posted Opportunities</h4>
          <div className="text-center py-8">
            <Briefcase className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h5 className="text-md font-medium text-gray-900 mb-2">No opportunities posted</h5>
            <p className="text-gray-500 mb-4">
              Share internship and job opportunities with current students.
            </p>
            <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors">
              Post New Opportunity
            </button>
          </div>
        </div>

        {/* Students Recruited */}
        <div className="bg-white border rounded-lg p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Students Recruited</h4>
          <p className="text-gray-600">
            This information is managed in your profile. Update your profile to track students you've helped recruit.
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 font-['Poppins'] mb-2">My Contributions</h1>
          <p className="text-gray-600 font-['Inter']">
            Track your impact on the alumni community and student development
          </p>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-yellow-500 text-yellow-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === 'donations' && renderDonations()}
          {activeTab === 'mentorship' && renderMentorship()}
          {activeTab === 'recruiting' && renderRecruiting()}
        </div>
      </div>
    </div>
  );
};

export default AlumniContributions;
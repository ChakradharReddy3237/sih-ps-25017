import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
  Users, 
  LogOut,
  GraduationCap,
  User 
} from 'lucide-react';

interface StudentLayoutProps {
  children: React.ReactNode;
}

const StudentLayout: React.FC<StudentLayoutProps> = ({ children }) => {
  const { signOut, user } = useAuth();
  const location = useLocation();

  const navigation = [
    { name: 'Alumni Directory', href: '/student/directory', icon: Users },
  ];

  const isActive = (href: string) => location.pathname === href;

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-blue-900 text-white flex flex-col">
        <div className="p-6 border-b border-blue-800">
          <div className="flex items-center space-x-3">
            <GraduationCap className="h-8 w-8 text-yellow-400" />
            <div>
              <h1 className="text-xl font-bold font-['Poppins']">Plenilune</h1>
              <p className="text-blue-200 text-sm">Student Portal</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-4 py-6">
          <ul className="space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                      isActive(item.href)
                        ? 'bg-yellow-500 text-white'
                        : 'text-blue-100 hover:bg-blue-800 hover:text-white'
                    }`}
                  >
                    <Icon className="h-5 w-5 mr-3" />
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="p-4 border-t border-blue-800">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center">
              <User className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="font-medium text-white">{user?.email}</p>
              <p className="text-blue-200 text-sm">Student</p>
            </div>
          </div>
          <button
            onClick={signOut}
            className="flex items-center px-4 py-2 text-blue-100 hover:text-white hover:bg-blue-800 rounded-lg transition-colors w-full"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
  );
};

export default StudentLayout;
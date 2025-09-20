import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { X, Send } from 'lucide-react';

interface RequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  alumniName: string;
  alumniId: string;
  requestType: 'Mentorship' | 'Seminar Talk';
}

const RequestModal: React.FC<RequestModalProps> = ({
  isOpen,
  onClose,
  alumniName,
  alumniId,
  requestType,
}) => {
  const { user } = useAuth();
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setSending(true);

    try {
      // First, get the student's profile ID
      const { data: studentProfile } = await supabase
        .from('student_profiles')
        .select('id')
        .eq('user_id', user.id)
        .single();

      if (!studentProfile) {
        throw new Error('Student profile not found');
      }

      // Create the request
      const { error } = await supabase
        .from('requests')
        .insert({
          requested_by: studentProfile.id,
          requested_to: alumniId,
          type: requestType,
          message: message,
        });

      if (error) {
        throw error;
      }

      alert('Request sent successfully! The alumni will be notified.');
      onClose();
    } catch (error) {
      console.error('Error sending request:', error);
      alert('Failed to send request. Please try again.');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">
              Request {requestType}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="mb-4">
            <p className="text-gray-600">
              Send a {requestType.toLowerCase()} request to <strong>{alumniName}</strong>
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                Message
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                placeholder={
                  requestType === 'Mentorship'
                    ? 'Describe what kind of guidance you\'re seeking and why you\'d like to connect with this alumni...'
                    : 'Describe the topic you\'d like them to speak about and provide event details...'
                }
              />
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={sending || !message.trim()}
                className="px-6 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                <Send className="h-4 w-4" />
                <span>{sending ? 'Sending...' : 'Send Request'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RequestModal;
import React, { useState } from 'react';
import { X, Send, Mail, Users, AlertCircle, CheckCircle } from 'lucide-react';

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSendNotification: (notification: { subject: string; message: string; priority: string }) => Promise<void>;
}

const NotificationModal: React.FC<NotificationModalProps> = ({
  isOpen,
  onClose,
  onSendNotification
}) => {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [priority, setPriority] = useState('normal');
  const [isSending, setIsSending] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const resetForm = () => {
    setSubject('');
    setMessage('');
    setPriority('normal');
    setErrors({});
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!subject.trim()) {
      newErrors.subject = 'Subject is required';
    } else if (subject.length < 5) {
      newErrors.subject = 'Subject must be at least 5 characters long';
    }

    if (!message.trim()) {
      newErrors.message = 'Message is required';
    } else if (message.length < 20) {
      newErrors.message = 'Message must be at least 20 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSending(true);
    try {
      await onSendNotification({
        subject: subject.trim(),
        message: message.trim(),
        priority
      });
      resetForm();
      onClose();
    } catch (error) {
      console.error('Failed to send notification:', error);
    } finally {
      setIsSending(false);
    }
  };

  const handleClose = () => {
    if (!isSending) {
      resetForm();
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <Mail className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Send Notification to All Alumni</h2>
              <p className="text-blue-100 text-sm">Send important updates to the entire alumni community</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            disabled={isSending}
            className="text-white hover:bg-white hover:bg-opacity-20 rounded-lg p-2 transition-colors disabled:opacity-50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Recipients Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Users className="w-5 h-5 text-blue-600" />
              <span className="font-medium text-blue-900">Recipients</span>
            </div>
            <p className="text-sm text-blue-700">
              This notification will be sent to all active alumni members via email.
            </p>
            <div className="mt-2 text-xs text-blue-600">
              Estimated recipients: <span className="font-semibold">~500 alumni</span>
            </div>
          </div>

          {/* Priority Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Priority Level
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { value: 'low', label: 'Low Priority', color: 'bg-green-50 border-green-200 text-green-800' },
                { value: 'normal', label: 'Normal', color: 'bg-blue-50 border-blue-200 text-blue-800' },
                { value: 'urgent', label: 'Urgent', color: 'bg-red-50 border-red-200 text-red-800' }
              ].map((option) => (
                <label key={option.value} className="cursor-pointer">
                  <input
                    type="radio"
                    name="priority"
                    value={option.value}
                    checked={priority === option.value}
                    onChange={(e) => setPriority(e.target.value)}
                    className="sr-only"
                  />
                  <div className={`
                    border-2 rounded-lg p-3 text-center text-sm font-medium transition-all
                    ${priority === option.value 
                      ? `${option.color} border-opacity-100` 
                      : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                    }
                  `}>
                    {option.label}
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Subject Field */}
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
              Subject *
            </label>
            <input
              type="text"
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className={`
                w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors
                ${errors.subject ? 'border-red-300 bg-red-50' : 'border-gray-300'}
              `}
              placeholder="Enter email subject (e.g., Important Update on Alumni Events)"
              disabled={isSending}
            />
            {errors.subject && (
              <div className="mt-1 flex items-center space-x-1 text-red-600">
                <AlertCircle className="w-4 h-4" />
                <span className="text-sm">{errors.subject}</span>
              </div>
            )}
          </div>

          {/* Message Field */}
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
              Message *
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={8}
              className={`
                w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-vertical
                ${errors.message ? 'border-red-300 bg-red-50' : 'border-gray-300'}
              `}
              placeholder="Dear Alumni,&#10;&#10;We hope this message finds you well. We wanted to inform you about...&#10;&#10;Please feel free to reach out if you have any questions.&#10;&#10;Best regards,&#10;Alumni Relations Team"
              disabled={isSending}
            />
            {errors.message && (
              <div className="mt-1 flex items-center space-x-1 text-red-600">
                <AlertCircle className="w-4 h-4" />
                <span className="text-sm">{errors.message}</span>
              </div>
            )}
            <div className="mt-1 text-xs text-gray-500">
              Character count: {message.length} (minimum 20 characters required)
            </div>
          </div>

          {/* Preview Section */}
          {subject && message && (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-3 flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                Email Preview
              </h3>
              <div className="bg-white border border-gray-200 rounded-lg p-4 text-sm">
                <div className="border-b border-gray-200 pb-2 mb-3">
                  <div className="text-gray-600">Subject:</div>
                  <div className="font-medium">{subject}</div>
                </div>
                <div className="whitespace-pre-wrap text-gray-800">
                  {message}
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={handleClose}
              disabled={isSending}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            
            <button
              type="submit"
              disabled={isSending || !subject.trim() || !message.trim()}
              className="flex items-center space-x-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSending ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Send to All Alumni</span>
                </>
              )}
            </button>
          </div>

          {/* Warning Notice */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start space-x-2">
              <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
              <div className="text-sm text-yellow-800">
                <p className="font-medium mb-1">Important Notice:</p>
                <p>
                  This action will send an email to all alumni members. Please ensure your message is clear, 
                  professional, and necessary before sending. Frequent notifications may impact engagement rates.
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NotificationModal;
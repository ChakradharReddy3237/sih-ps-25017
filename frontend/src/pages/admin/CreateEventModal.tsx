import React, { useState } from 'react';
import { X } from 'lucide-react';

interface CreateEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (event: { 
    title: string; 
    description: string; 
    dateFrom: string; 
    dateTo: string; 
    timeFrom: string; 
    timeTo: string; 
    goal: number;
  }) => void;
}

const CreateEventModal: React.FC<CreateEventModalProps> = ({ isOpen, onClose, onCreate }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [timeFrom, setTimeFrom] = useState("");
  const [timeTo, setTimeTo] = useState("");
  const [error, setError] = useState('');
  const [goal, setGoal] = useState(0);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !dateTo || !dateFrom || !timeFrom || !timeTo || goal <= 0) {
      setError('All fields are required and goal must be greater than 0.');
      return;
    }

    // Validate that end date/time is after start date/time
    const startDateTime = new Date(`${dateFrom}T${timeFrom}`);
    const endDateTime = new Date(`${dateTo}T${timeTo}`);
    
    if (endDateTime <= startDateTime) {
      setError('End date and time must be after start date and time.');
      return;
    }

    onCreate({ title, description, dateFrom, dateTo, timeFrom, timeTo, goal });
    // Reset form
    setTitle('');
    setDescription('');
    setDateFrom('');
    setDateTo('');
    setTimeFrom('');
    setTimeTo('');
    setGoal(0);
    setError('');
    onClose(); // Close modal on successful creation
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Create New Event</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
            <X size={24} />
          </button>
        </div>
        {error && <p className="text-red-500 bg-red-100 p-3 rounded-md mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            {/* Date From */}
            <div>
              <label htmlFor="dateFrom" className="block text-sm font-medium text-gray-700">From Date</label>
              <input
                id="dateFrom"
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                          focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Date To */}
            <div>
              <label htmlFor="dateTo" className="block text-sm font-medium text-gray-700">To Date</label>
              <input
                id="dateTo"
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                          focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            {/* Time From */}
            <div>
              <label htmlFor="timeFrom" className="block text-sm font-medium text-gray-700">From Time</label>
              <input
                id="timeFrom"
                type="time"
                value={timeFrom}
                onChange={(e) => setTimeFrom(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                          focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            {/* Time To */}
            <div>
              <label htmlFor="timeTo" className="block text-sm font-medium text-gray-700">To Time</label>
              <input
                id="timeTo"
                type="time"
                value={timeTo}
                onChange={(e) => setTimeTo(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                          focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <label htmlFor="goal" className="block text-sm font-medium text-gray-700">
                Goal Amount (₹)
              </label>
              <input
                id="goal"
                type="number"
                min="0"
                value={goal}
                onChange={(e) => setGoal(Number(e.target.value))}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                          focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Create Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEventModal;
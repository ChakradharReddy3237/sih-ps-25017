import React, { useState, useRef } from 'react';
import { X, Upload, Download, FileText, AlertCircle, CheckCircle2 } from 'lucide-react';

interface CSVModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImportComplete: (data: any[]) => void;
  currentData: any[];
}

const CSVModal: React.FC<CSVModalProps> = ({ isOpen, onClose, onImportComplete, currentData }) => {
  const [activeTab, setActiveTab] = useState<'import' | 'export'>('import');
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [importStatus, setImportStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [importResults, setImportResults] = useState<{
    total: number;
    successful: number;
    errors: string[];
  } | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type === 'text/csv' || droppedFile.name.endsWith('.csv')) {
        setFile(droppedFile);
      } else {
        alert('Please select a CSV file');
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type === 'text/csv' || selectedFile.name.endsWith('.csv')) {
        setFile(selectedFile);
      } else {
        alert('Please select a CSV file');
      }
    }
  };

  const parseCSV = (csvText: string): any[] => {
    const lines = csvText.split('\n');
    const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
    const data: any[] = [];

    for (let i = 1; i < lines.length; i++) {
      if (lines[i].trim()) {
        const values = lines[i].split(',').map(v => v.trim().replace(/"/g, ''));
        const row: any = {};
        headers.forEach((header, index) => {
          row[header] = values[index] || '';
        });
        data.push(row);
      }
    }
    return data;
  };

  const validateAlumniData = (data: any[]): { valid: any[], errors: string[] } => {
    const valid: any[] = [];
    const errors: string[] = [];
    const requiredFields = ['full_name', 'email', 'digital_id', 'graduation_year', 'department'];

    data.forEach((row, index) => {
      const missingFields = requiredFields.filter(field => !row[field]);
      
      if (missingFields.length > 0) {
        errors.push(`Row ${index + 2}: Missing required fields: ${missingFields.join(', ')}`);
      } else {
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(row.email)) {
          errors.push(`Row ${index + 2}: Invalid email format`);
        } else {
          // Transform data to match expected format
          valid.push({
            id: row.id || (Date.now() + index).toString(),
            digital_id: row.digital_id,
            full_name: row.full_name,
            email: row.email,
            graduation_year: parseInt(row.graduation_year) || new Date().getFullYear(),
            department: row.department,
            current_company: row.current_company || '',
            current_role: row.current_role || '',
            location: row.location || '',
            phone: row.phone || '',
            linkedin: row.linkedin || '',
            status: row.status || 'Active'
          });
        }
      }
    });

    return { valid, errors };
  };

  const handleImport = async () => {
    if (!file) return;

    setImportStatus('processing');
    
    try {
      const text = await file.text();
      const parsedData = parseCSV(text);
      const { valid, errors } = validateAlumniData(parsedData);

      setImportResults({
        total: parsedData.length,
        successful: valid.length,
        errors
      });

      if (valid.length > 0) {
        onImportComplete(valid);
        setImportStatus('success');
      } else {
        setImportStatus('error');
      }
    } catch (error) {
      setImportStatus('error');
      setImportResults({
        total: 0,
        successful: 0,
        errors: ['Failed to parse CSV file. Please check the file format.']
      });
    }
  };

  const handleExport = () => {
    const headers = [
      'digital_id',
      'full_name', 
      'email',
      'graduation_year',
      'department',
      'current_company',
      'current_role',
      'location',
      'phone',
      'linkedin',
      'status'
    ];

    const csvContent = [
      headers.join(','),
      ...currentData.map(alumni => 
        headers.map(header => `"${alumni[header] || ''}"`).join(',')
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `alumni_data_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const downloadTemplate = () => {
    const templateHeaders = [
      'digital_id',
      'full_name',
      'email', 
      'graduation_year',
      'department',
      'current_company',
      'current_role',
      'location',
      'phone',
      'linkedin',
      'status'
    ];

    const templateRows = [
      'ALU2024CS001,"John Doe","john.doe@email.com",2024,"Computer Science","Tech Corp","Software Engineer","Mumbai, Maharashtra","+91 9876543210","https://linkedin.com/in/johndoe","Active"'
    ];

    const csvContent = [
      templateHeaders.join(','),
      ...templateRows
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'alumni_template.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const resetModal = () => {
    setFile(null);
    setImportStatus('idle');
    setImportResults(null);
    setActiveTab('import');
  };

  const handleClose = () => {
    resetModal();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Alumni Data Management</h2>
          <button 
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex">
            <button
              onClick={() => setActiveTab('import')}
              className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'import'
                  ? 'border-yellow-500 text-yellow-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Import Data
            </button>
            <button
              onClick={() => setActiveTab('export')}
              className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'export'
                  ? 'border-yellow-500 text-yellow-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Export Data
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'import' ? (
            <div className="space-y-6">
              {importStatus === 'idle' && (
                <>
                  <div className="text-center">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Import Alumni Data</h3>
                    <p className="text-gray-600 mb-4">
                      Upload a CSV file to bulk import or update alumni information
                    </p>
                  </div>

                  {/* File Upload Area */}
                  <div
                    className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                      dragActive
                        ? 'border-yellow-500 bg-yellow-50'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                    <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    {file ? (
                      <div>
                        <p className="text-sm font-medium text-gray-900">{file.name}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {(file.size / 1024).toFixed(1)} KB
                        </p>
                      </div>
                    ) : (
                      <div>
                        <p className="text-gray-600 mb-2">
                          Drag and drop your CSV file here, or
                        </p>
                        <button
                          onClick={() => fileInputRef.current?.click()}
                          className="text-yellow-600 hover:text-yellow-700 font-medium"
                        >
                          browse to upload
                        </button>
                      </div>
                    )}
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".csv"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </div>

                  {/* Template Download */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <FileText className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-blue-900">Need a template?</h4>
                        <p className="text-sm text-blue-700 mt-1">
                          Download our CSV template with the correct format and sample data.
                        </p>
                        <button
                          onClick={downloadTemplate}
                          className="text-sm font-medium text-blue-600 hover:text-blue-800 mt-2"
                        >
                          Download Template
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex justify-end space-x-3">
                    <button
                      onClick={handleClose}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleImport}
                      disabled={!file}
                      className="px-6 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                    >
                      Import Data
                    </button>
                  </div>
                </>
              )}

              {importStatus === 'processing' && (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto mb-4"></div>
                  <p className="text-gray-600">Processing CSV file...</p>
                </div>
              )}

              {importStatus === 'success' && importResults && (
                <div className="text-center py-8">
                  <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Import Successful!</h3>
                  <p className="text-gray-600 mb-4">
                    Successfully imported {importResults.successful} out of {importResults.total} records.
                  </p>
                  {importResults.errors.length > 0 && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-4 text-left">
                      <h4 className="text-sm font-medium text-red-900 mb-2">Errors encountered:</h4>
                      <ul className="text-sm text-red-700 space-y-1">
                        {importResults.errors.slice(0, 5).map((error, index) => (
                          <li key={index}>• {error}</li>
                        ))}
                        {importResults.errors.length > 5 && (
                          <li>• ... and {importResults.errors.length - 5} more errors</li>
                        )}
                      </ul>
                    </div>
                  )}
                  <button
                    onClick={handleClose}
                    className="mt-4 px-6 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
                  >
                    Close
                  </button>
                </div>
              )}

              {importStatus === 'error' && importResults && (
                <div className="text-center py-8">
                  <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Import Failed</h3>
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-4 text-left">
                    <h4 className="text-sm font-medium text-red-900 mb-2">Errors:</h4>
                    <ul className="text-sm text-red-700 space-y-1">
                      {importResults.errors.map((error, index) => (
                        <li key={index}>• {error}</li>
                      ))}
                    </ul>
                  </div>
                  <button
                    onClick={() => {
                      setImportStatus('idle');
                      setImportResults(null);
                      setFile(null);
                    }}
                    className="mt-4 px-6 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
                  >
                    Try Again
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Export Alumni Data</h3>
                <p className="text-gray-600 mb-4">
                  Download current alumni data as a CSV file
                </p>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <div className="flex items-center space-x-4">
                  <Download className="h-8 w-8 text-gray-400" />
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-gray-900">Alumni Database Export</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Export {currentData.length} alumni records to CSV format
                    </p>
                  </div>
                  <button
                    onClick={handleExport}
                    className="bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-600 transition-colors"
                  >
                    Download CSV
                  </button>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <FileText className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-blue-900">Export includes:</h4>
                    <ul className="text-sm text-blue-700 mt-1 space-y-1">
                      <li>• Digital ID, Name, Email</li>
                      <li>• Graduation Year & Department</li>
                      <li>• Current Company & Role</li>
                      <li>• Contact Information</li>
                      <li>• Status & LinkedIn Profile</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleClose}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CSVModal;
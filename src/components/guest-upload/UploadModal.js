import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Upload, Image as ImageIcon, Video as VideoIcon, MessageSquare, X, Mic } from 'lucide-react';

const UploadModal = ({ 
  step, 
  guestInfo, 
  selectedFiles, 
  message, 
  uploading, 
  onClose, 
  onFileSelect, 
  onRemoveFile, 
  onUpload, 
  onStepChange,
  onGuestInfoChange,
  onMessageChange,
  uploadType,
  onUploadTypeChange,
  isAnonymous,
  onAnonymousChange,
  recording,
  onStartRecording,
  onStopRecording,
  audioBlob,
  albums,
  selectedAlbum,
  onAlbumChange
}) => {
  // Handle Escape key to close modal
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div 
      className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="upload-modal-title"
    >
      <div 
        className="bg-white rounded-xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-white/20"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 id="upload-modal-title" className="text-2xl font-bold text-gray-900">
            Share Photos & Memories
          </h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close upload modal"
          >
            <X className="h-6 w-6 text-gray-600" />
          </button>
        </div>

        {step === 'type' && (
          <UploadTypeStep
            uploadType={uploadType}
            onUploadTypeChange={onUploadTypeChange}
            isAnonymous={isAnonymous}
            onAnonymousChange={onAnonymousChange}
            guestInfo={guestInfo}
            onGuestInfoChange={onGuestInfoChange}
            onStepChange={onStepChange}
          />
        )}

        {step === 'upload' && (
          <UploadContentStep
            uploadType={uploadType}
            albums={albums}
            selectedAlbum={selectedAlbum}
            onAlbumChange={onAlbumChange}
            onFileSelect={onFileSelect}
            selectedFiles={selectedFiles}
            onRemoveFile={onRemoveFile}
            message={message}
            onMessageChange={onMessageChange}
            recording={recording}
            onStartRecording={onStartRecording}
            onStopRecording={onStopRecording}
            audioBlob={audioBlob}
            uploading={uploading}
            onUpload={onUpload}
            onStepChange={onStepChange}
          />
        )}

        {step === 'success' && (
          <SuccessStep onClose={onClose} uploadType={uploadType} />
        )}
      </div>
    </div>
  );
};

const UPLOAD_TYPES = [
  {
    type: 'media',
    icon: <ImageIcon className="h-8 w-8 text-gray-600 mx-auto mb-2" />,
    title: 'Upload Photos',
    description: 'Share photos & videos from the celebration'
  },
  {
    type: 'message', 
    icon: <MessageSquare className="h-8 w-8 text-gray-600 mx-auto mb-2" />,
    title: 'Send Wishes',
    description: 'Write warm messages & greetings'
  },
  {
    type: 'voice',
    icon: <Mic className="h-8 w-8 text-gray-600 mx-auto mb-2" />,
    title: 'Voice Message', 
    description: 'Record personal audio greetings'
  }
];

const UploadTypeStep = ({
  uploadType,
  onUploadTypeChange,
  isAnonymous,
  onAnonymousChange,
  guestInfo,
  onGuestInfoChange,
  onStepChange
}) => (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold text-gray-900 mb-4">
      Share Your Special Moments
    </h3>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4" role="radiogroup" aria-label="Choose upload type">
      {UPLOAD_TYPES.map((uploadTypeOption) => (
        <UploadTypeButton
          key={uploadTypeOption.type}
          type={uploadTypeOption.type}
          currentType={uploadType}
          onChange={onUploadTypeChange}
          icon={uploadTypeOption.icon}
          title={uploadTypeOption.title}
          description={uploadTypeOption.description}
        />
      ))}
    </div>

    <AnonymousSection
      isAnonymous={isAnonymous}
      onAnonymousChange={onAnonymousChange}
      guestInfo={guestInfo}
      onGuestInfoChange={onGuestInfoChange}
    />

    <Button 
      onClick={() => onStepChange('upload')}
      disabled={!uploadType}
      className="w-full mt-4"
      aria-label={`Continue to ${uploadType} upload`}
    >
      Continue
    </Button>
  </div>
);

const UploadTypeButton = ({ type, currentType, onChange, icon, title, description }) => (
  <button
    onClick={() => onChange(type)}
    role="radio"
    aria-checked={currentType === type}
    className={`p-6 border-2 rounded-lg text-center transition-all focus:outline-none focus:ring-2 focus:ring-[#f2adc8] ${
      currentType === type 
        ? 'border-[#f2adc8] bg-pink-50' 
        : 'border-gray-300 hover:border-gray-400'
    }`}
    aria-label={`Select ${title}: ${description}`}
  >
    {icon}
    <h4 className="font-semibold text-gray-900">{title}</h4>
    <p className="text-sm text-gray-600 mt-1">{description}</p>
  </button>
);

const AnonymousSection = ({ isAnonymous, onAnonymousChange, guestInfo, onGuestInfoChange }) => (
  <div className="mt-6 p-4 bg-gray-50 rounded-lg">
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="anonymous"
            checked={isAnonymous}
            onChange={onAnonymousChange}
            className="h-4 w-4 text-[#f2adc8] border-gray-300 rounded focus:ring-[#f2adc8]"
            aria-describedby="anonymous-description"
          />
          <Label htmlFor="anonymous" className="ml-2 text-gray-900">
            Post anonymously
          </Label>
        </div>
        <span id="anonymous-description" className="text-xs text-gray-500">
          (Your name won't be shown)
        </span>
      </div>
    </div>

    {!isAnonymous && (
      <div className="mt-4">
        <Label htmlFor="guest-name">Your Name</Label>
        <Input
          id="guest-name"
          type="text"
          value={guestInfo.name}
          onChange={(e) => onGuestInfoChange({ ...guestInfo, name: e.target.value })}
          className="mt-1"
          placeholder="Enter your name (optional)"
          aria-required="false"
        />
      </div>
    )}
  </div>
);

const UploadContentStep = ({
  uploadType,
  albums,
  selectedAlbum,
  onAlbumChange,
  onFileSelect,
  selectedFiles,
  onRemoveFile,
  message,
  onMessageChange,
  recording,
  onStartRecording,
  onStopRecording,
  audioBlob,
  uploading,
  onUpload,
  onStepChange
}) => (
  <div className="space-y-4">
    {uploadType === 'media' && albums.length > 0 && (
      <HorizontalAlbumSelector
        albums={albums}
        selectedAlbum={selectedAlbum}
        onAlbumChange={onAlbumChange}
      />
    )}
    
    {uploadType === 'media' && (
      <MediaUploadSection
        onFileSelect={onFileSelect}
        selectedFiles={selectedFiles}
        onRemoveFile={onRemoveFile}
      />
    )}

    {uploadType === 'message' && (
      <MessageSection
        message={message}
        onMessageChange={onMessageChange}
      />
    )}

    {uploadType === 'voice' && (
      <VoiceRecordingSection
        recording={recording}
        audioBlob={audioBlob}
        onStartRecording={onStartRecording}
        onStopRecording={onStopRecording}
      />
    )}

    <div className="flex space-x-3">
      <Button
        type="button"
        variant="outline"
        onClick={() => onStepChange('type')}
        className="flex-1"
        aria-label="Go back to upload type selection"
      >
        Back
      </Button>
      <Button
        onClick={onUpload}
        disabled={uploading || 
          (uploadType === 'media' && selectedFiles.length === 0) ||
          (uploadType === 'message' && !message.trim()) ||
          (uploadType === 'voice' && !audioBlob)
        }
        className="flex-1"
        aria-label={`Upload ${uploadType} content`}
      >
        {uploading ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" aria-hidden="true"></div>
            Uploading...
          </>
        ) : (
          `Send ${uploadType === 'media' ? `${selectedFiles.length} File${selectedFiles.length !== 1 ? 's' : ''}` : uploadType}`
        )}
      </Button>
    </div>
  </div>
);

// NEW: Horizontal Album Selector component
const HorizontalAlbumSelector = ({ albums, selectedAlbum, onAlbumChange }) => (
  <div className="space-y-2">
    <Label className="text-gray-900">
      Choose Album (Optional)
    </Label>
    <div className="flex overflow-x-auto pb-2 space-x-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
      <button
        onClick={() => onAlbumChange('')}
        className={`flex-shrink-0 px-4 py-2 rounded-lg border transition-all ${
          !selectedAlbum 
            ? 'border-[#f2adc8] bg-pink-50 text-[#f2adc8]' 
            : 'border-gray-300 text-gray-600 hover:border-gray-400'
        }`}
      >
        No Album
      </button>
      {albums.map(album => (
        <button
          key={album.id}
          onClick={() => onAlbumChange(album.id)}
          className={`flex-shrink-0 px-4 py-2 rounded-lg border transition-all ${
            selectedAlbum === album.id
              ? 'border-[#f2adc8] bg-pink-50 text-[#f2adc8]' 
              : 'border-gray-300 text-gray-600 hover:border-gray-400'
          }`}
        >
          {album.name}
        </button>
      ))}
    </div>
    <p className="text-xs text-gray-500">
      Select an album to organize your photos
    </p>
  </div>
);

const MediaUploadSection = ({ onFileSelect, selectedFiles, onRemoveFile }) => (
  <>
    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
      <input
        type="file"
        multiple
        accept="image/*,video/*"
        onChange={onFileSelect}
        className="hidden"
        id="file-upload"
        aria-describedby="file-upload-description"
      />
      <label htmlFor="file-upload" className="cursor-pointer block">
        <Upload className="h-12 w-12 text-gray-400 mx-auto mb-2" aria-hidden="true" />
        <p className="text-gray-600">Click to upload photos & videos</p>
        <p id="file-upload-description" className="text-sm text-gray-500 mt-1">
          Supported: JPG, PNG, MP4, MOV
        </p>
      </label>
    </div>

    {selectedFiles.length > 0 && (
      <SelectedFilesList
        selectedFiles={selectedFiles}
        onRemoveFile={onRemoveFile}
      />
    )}
  </>
);

const SelectedFilesList = ({ selectedFiles, onRemoveFile }) => (
  <div className="space-y-2">
    <Label>Selected Files ({selectedFiles.length})</Label>
    {selectedFiles.map((file, index) => (
      <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded">
        <div className="flex items-center space-x-2 min-w-0 flex-1">
          {file.type.startsWith('image/') ? (
            <ImageIcon className="h-4 w-4 text-green-600 flex-shrink-0" aria-hidden="true" />
          ) : (
            <VideoIcon className="h-4 w-4 text-blue-600 flex-shrink-0" aria-hidden="true" />
          )}
          <span className="text-sm truncate">{file.name}</span>
        </div>
        <button 
          onClick={() => onRemoveFile(index)}
          className="text-red-500 hover:text-red-700 p-1 flex-shrink-0"
          aria-label={`Remove ${file.name}`}
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    ))}
  </div>
);

const MessageSection = ({ message, onMessageChange }) => (
  <div>
    <Label htmlFor="guest-message">Your Message</Label>
    <Textarea
      id="guest-message"
      value={message}
      onChange={(e) => onMessageChange(e.target.value)}
      rows={4}
      className="mt-1"
      placeholder="Share your wishes, congratulations, or memories..."
      aria-describedby="message-description"
    />
    <p id="message-description" className="text-xs text-gray-500 mt-1">
      Your message will be shared with the event hosts and guests
    </p>
  </div>
);

const VoiceRecordingSection = ({ recording, audioBlob, onStartRecording, onStopRecording }) => (
  <div className="text-center space-y-4">
    {!recording && !audioBlob && (
      <>
        <Mic className="h-16 w-16 text-gray-400 mx-auto" aria-hidden="true" />
        <p className="text-gray-600">Click the button below to start recording</p>
        <Button 
          onClick={onStartRecording} 
          className="bg-red-500 hover:bg-red-600"
          aria-label="Start voice recording"
        >
          Start Recording
        </Button>
      </>
    )}

    {recording && (
      <>
        <div className="flex items-center justify-center space-x-2 text-red-500">
          <div className="h-3 w-3 bg-red-500 rounded-full animate-pulse" aria-hidden="true"></div>
          <p>Recording... Click stop when finished</p>
        </div>
        <Button 
          onClick={onStopRecording} 
          variant="outline"
          aria-label="Stop voice recording"
        >
          Stop Recording
        </Button>
      </>
    )}

    {audioBlob && !recording && (
      <>
        <audio controls className="w-full" aria-label="Your recorded voice message">
          <source src={URL.createObjectURL(audioBlob)} type="audio/wav" />
          Your browser does not support the audio element.
        </audio>
        <p className="text-sm text-green-600">Recording ready! Click upload to send.</p>
      </>
    )}
  </div>
);

const SuccessStep = ({ onClose, uploadType }) => (
  <div className="text-center space-y-4">
    <div className="text-green-600 text-5xl" aria-hidden="true">✓</div>
    <h2 className="text-2xl font-bold text-gray-900">Thank You!</h2>
    <p className="text-gray-600">
      Your {uploadType} has been uploaded successfully and is now part of the event album.
    </p>
    <Button 
      onClick={onClose} 
      className="w-full"
      aria-label="Close upload modal"
    >
      Close
    </Button>
  </div>
);

export default React.memo(UploadModal);
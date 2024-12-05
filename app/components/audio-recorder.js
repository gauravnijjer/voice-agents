// "use client"

// import React, { useState, useRef } from 'react';

// const AudioRecorder = () => {
//   const [isRecording, setIsRecording] = useState(false);
//   const [audioData, setAudioData] = useState(null);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const mediaRecorderRef = useRef(null);
//   const audioChunksRef = useRef([]);
//   const audioRef = useRef(null);

//   const startRecording = async () => {
//     try {
//       // Clear previous audio chunks when starting a new recording
//       audioChunksRef.current = [];
//       setAudioData(null);

//       const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//       mediaRecorderRef.current = new MediaRecorder(stream);

//       mediaRecorderRef.current.ondataavailable = (event) => {
//         audioChunksRef.current.push(event.data);
//       };

//       mediaRecorderRef.current.onstop = () => {
//         const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
//         const audioUrl = URL.createObjectURL(audioBlob);
//         setAudioData(audioUrl); // Store the audio data (URL) in state
//       };

//       mediaRecorderRef.current.start();
//       setIsRecording(true);
//     } catch (err) {
//       console.error('Error accessing microphone:', err);
//     }
//   };

//   const stopRecording = () => {
//     if (mediaRecorderRef.current) {
//       mediaRecorderRef.current.stop();
//       setIsRecording(false);
//     }
//   };

//   const toggleRecording = () => {
//     if (isRecording) {
//       stopRecording();
//     } else {
//       startRecording();
//     }
//   };

//   const playAudio = () => {
//     if (audioRef.current) {
//       audioRef.current.play();
//       setIsPlaying(true);
//     }
//   };

//   const stopAudio = () => {
//     if (audioRef.current) {
//       audioRef.current.pause();
//       audioRef.current.currentTime = 0; // Reset to the beginning
//       setIsPlaying(false);
//     }
//   };

//   return (
//     <div>
//       <button onClick={toggleRecording}>
//         {isRecording ? 'Stop Recording' : 'Start Recording'}
//       </button>

//       {audioData && (
//         <div>
//           <h3>Recorded Audio:</h3>
//           <audio ref={audioRef} controls>
//             <source src={audioData} type="audio/wav" />
//             Your browser does not support the audio element.
//           </audio>

//           <div>
//             {!isPlaying && (
//               <button onClick={playAudio}>Play</button>
//             )}
//             {isPlaying && (
//               <button onClick={stopAudio}>Stop</button>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AudioRecorder;


import uploadAudio from '@/actions/upload-audio';
import React, { useState, useRef } from 'react';

const AudioRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioData, setAudioData] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState(null); // To store uploaded audio URL

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const audioRef = useRef(null);

  const startRecording = async () => {
    try {
      audioChunksRef.current = []; // Clear previous audio chunks

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioData(audioUrl); // Store the audio data (URL) in state
        console.log("URL IS: ",audioUrl)
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (err) {
      console.error('Error accessing microphone:', err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0; // Reset to the beginning
      setIsPlaying(false);
    }
  };

  const uploadToCloudinary = async () => {
    if (!audioData) return; // No audio to upload

    setUploading(true);

    try {

      const audioBlob = await fetch(audioData).then((res) => res.blob());

        const response = await uploadAudio(audioBlob);
        const result = response.data

      

      if (response.success) {
   
        setUploadedUrl(result.secure_url);
        setUploading(false);
        console.log('Audio uploaded successfully:', result.secure_url);
      } else {
        setUploading(false);
        console.error('Error uploading to Cloudinary:', result);
      }
    } catch (error) {
      setUploading(false);
      console.error('Error uploading to Cloudinary:', error);
    }
  };

  return (
    <div>
      <button onClick={toggleRecording}>
        {isRecording ? 'Stop Recording' : 'Start Recording'}
      </button>

      {audioData && (
        <div>
          <h3>Recorded Audio:</h3>
          <audio ref={audioRef} controls>
            <source src={audioData} type="audio/wav" />
            Your browser does not support the audio element.
          </audio>

          <div>
            {!isPlaying && (
              <button onClick={playAudio}>Play</button>
            )}
            {isPlaying && (
              <button onClick={stopAudio}>Stop</button>
            )}
          </div>
        </div>
      )}

      {audioData && !uploading && !uploadedUrl && (
        <button onClick={uploadToCloudinary}>Upload to Cloudinary</button>
      )}

      {uploading && <p>Uploading...</p>}

      {uploadedUrl && (
        <div>
          <h3>Uploaded Audio:</h3>
          <audio controls>
            <source src={uploadedUrl} type="audio/wav" />
            Your browser does not support the audio element.
          </audio>
          <p>Audio uploaded successfully! <a href={uploadedUrl} target="_blank" rel="noopener noreferrer">View it here</a>.</p>
        </div>
      )}
    </div>
  );
};

export default AudioRecorder;

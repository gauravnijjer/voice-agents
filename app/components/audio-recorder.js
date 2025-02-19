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

"use client";

import { updateAgent } from "@/actions/update-agent";
import uploadAudio from "@/actions/upload-audio";
import React, { useState, useRef } from "react";
import { useRouter } from 'next/navigation'

const AudioRecorder = ({ agentName,agentId }) => {
  console.log("AGENT ID is: ",agentId)
  const [isRecording, setIsRecording] = useState(false);
  const [audioData, setAudioData] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState(null); // To store uploaded audio URL
  const [displayError, setDisplayError] = useState(null)
  const [uploadingAgent, setUploadingAgent] = useState(false);

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const audioRef = useRef(null);

  const router = useRouter();

  function setError(){
    setDisplayError("Something went wrong!")    
  }

  function resetError(){
    setDisplayError(null)
  }

  const startRecording = async () => {
    try {
      audioChunksRef.current = []; // Clear previous audio chunks
      setAudioData(null);
      setUploadedUrl(null);
      resetError();
      

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/wav",
        });
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioData(audioUrl); // Store the audio data (URL) in state
        console.log("URL IS: ", audioUrl);
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (err) {
        setError();
      console.error("Error accessing microphone:", err);
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
    resetError();

    setUploading(true);

    try {
      const audioBlob = await fetch(audioData).then((res) => res.blob());

      const response = await uploadAudio(audioBlob);
      const result = response.data;

      if (response.success) {
        setUploadedUrl(result.secure_url);
        setUploading(false);
        console.log("Audio uploaded successfully:", result.secure_url);
      } else {
        setUploading(false);
        console.error("Error uploading to Cloudinary:", result);
      }
    } catch (error) {
      setUploading(false);
      setError()
      console.error("Error uploading to Cloudinary:", error);
    }
  };

  async function updateAgentVoice() {
    // if (!uploadedUrl) {
    //   console.log("No URL found!");
    //   setError()
    //   return;
    // }

    try {
        resetError()
        setUploadingAgent(true)
    //   const res = await updateAgent(uploadedUrl, agentName, agentId);
    const audioBlob = await fetch(audioData).then((res) => res.blob());
      const res = await updateAgent(audioBlob, agentName, agentId);
      if(res.success){
        
        setUploadingAgent(false)
        router.push(`/${agentName}`)
      }
    } catch (error) {
      setError()
      setUploadingAgent(false)
      console.error("Error while updating agent's voice: ", error);
    }
  }

  return (
    <div>
      <h2>Wear your headphones and click on the Start Recording button. Then read out the following text and complete the sentences with precious, ordinary or fictional truths about yourself.</h2>
      <br />
      <p>
      Hello, my name is _________. When I woke up this morning, the first sound I heard was _______. Later as I was on my way to this place, I heard ________. I love the sound of _____ and I cannot stand the sound of ______. If I were to imagine my life as a song, the main instrument would be the sound of ________, carrying a sense of ________. And if I could hear just one sound forever, it would probably be ________, because ________
      </p> <br /><h2>Once you finish reading, click on the Stop Recording button. </h2>

      <br />
      <br />
      <button className="border-2 border-black" disabled={uploading} onClick={toggleRecording}>
        {isRecording ? "Stop Recording Voice" : "Start Recording Voice"}
      </button>

      {audioData && (
        <div>
          <h4>Recorded Audio:</h4>
          <audio ref={audioRef} controls>
            <source src={audioData} type="audio/wav" />
            Your browser does not support the audio element.
          </audio>

          <div>
            {/* {!isPlaying && <button className="border-2 border-black" onClick={playAudio}>Play</button>}
            {isPlaying && <button className="border-2 border-black" onClick={stopAudio}>Stop</button>} */}
          </div>
          <br />
          <h3>Now click on the button below to continue ahead </h3>
        </div>
      )}

      {/* {audioData && !uploading && !uploadedUrl && (
        <button className="border-2 border-black" onClick={uploadToCloudinary}>Upload to Cloudinary</button>
      )}

      {uploading && <p>Uploading...</p>}

      {uploadedUrl && (
        <div>
          <h3>Uploaded Audio:</h3>
          <audio controls>
            <source src={uploadedUrl} type="audio/wav" />
            Your browser does not support the audio element.
          </audio>
          <p>
            Audio uploaded successfully!{" "}
            <a href={uploadedUrl} target="_blank" rel="noopener noreferrer">
              View it here
            </a>
            .
          </p>
          <p>
            Not satisfied with the uploaded preview? Press "Start Recording"
            again.{" "}
          </p>
        </div>
      )} */}
      
      <br />
      <br />
      <button
        onClick={updateAgentVoice}
        // disabled={uploading || !uploadedUrl || isRecording || !audioData}
        disabled={isRecording || !audioData || uploadingAgent}
        // className={` disabled:bg-red-300 disabled:text-gray-400 px-2 py-1 border-red-500 bg-blue-400 text-blue-600 `}
      >
        Continue Ahead
      </button>

      {uploadingAgent && <p className="text-green-600 text-lg">Sharing your voice...</p>}

      {displayError &&
      <p className="text-red-600 text-2xl">{displayError}</p>
      }

    </div>
  );
};

export default AudioRecorder;

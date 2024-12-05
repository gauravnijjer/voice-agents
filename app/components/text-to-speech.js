"use client";

import { useState } from "react";

export default function TextSpeech() {
  const [audioSrc, setAudioSrc] = useState(null);

//   async function postClonedVoice() {
//     const url = "https://api.play.ht/api/v2/cloned-voices/instant/";
//     const headers = {
//       AUTHORIZATION: "d0794af339b34eb1818e19c9537089a9",
//       "X-USER-ID": "8yHCnbQ234ge0HriuCUujjvqNwE3",
//       accept: "application/json",
//     };

//     const formData = new FormData();
//     formData.append(
//       "sample_file_url",
//       "https://res.cloudinary.com/dgiduvbkl/video/upload/v1733384366/zw03cwduwy9mwnhocvbi.mp3"
//     );
//     formData.append("voice_name", "test-3");

//     try {
//       const response = await fetch(url, {
//         method: "POST",
//         headers: headers,
//         body: formData,
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }

//     //   const audioBlob = await res.blob();
//     //   const audioUrl = URL.createObjectURL(audioBlob);
//     //   setAudioSrc(audioUrl);
//       console.log("Response data:", data);
//       return data;
//     } catch (error) {
//       console.error("Error posting cloned voice:", error);
//       throw error;
//     }
//   }



  async function getVoiceFromText() {
    const options = {
      // credentials: "include",
      method: "POST",
      headers: {
        accept: "audio/mpeg",
        "content-type": "application/json",
        AUTHORIZATION: "d0794af339b34eb1818e19c9537089a9",
        "X-USER-ID": "8yHCnbQ234ge0HriuCUujjvqNwE3",
      },
      body: JSON.stringify({
        voice:
          "s3://voice-cloning-zero-shot/e2395fc0-c990-45b6-b95b-d65e9714f0de/test-1/manifest.json",
        output_format: "mp3",
        text: "Hey there this is a test",
      }),
    };

    fetch("/api/getVoice", options)
      .then(async (res) => {const audioBlob = await res.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      setAudioSrc(audioUrl);} )
      .then((res) => console.log(res))
      .catch((err) => console.error(err));
  }

  return (
    <>
      <button onClick={getVoiceFromText}>GET VOICE FROM TEXT</button>
      {/* <button onClick={postClonedVoice}>postClonedVoice</button> */}
      {audioSrc && (
        <audio autoPlay>
          <source src={audioSrc} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      )}
    </>
  );
}

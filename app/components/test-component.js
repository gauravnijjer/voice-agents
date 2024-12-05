"use client";

import { CldUploadWidget } from "next-cloudinary";
import { lazy, useEffect, useRef, useState } from "react";
import { CldUploadButton } from "next-cloudinary";
import { createAgent } from "@/actions/create-agent";
import base64 from "base-64"
import TextSpeech from "./text-to-speech";
import AudioRecorder from "./audio-recorder";



const Agent = lazy(() => import("./agent"));

export default function TestComponent() {
  const [resource, setResource] = useState(null);

  async function genClient() {
    try {
      // console.log("URL is: ", resource.url);
      // const res = await createAgent(resource.secure_url);
      const res = await createAgent();
      console.log("SUCCESS: ", res);
    } catch (error) {
      console.error("Something went wrong: ", error);
    }
  }

  return (
    <div>
      <CldUploadWidget
        // options={{uploadPreset: "signed_upload_1"}}
        signatureEndpoint="/api/sign-cloudinary-params"
        onError={(err) => console.log("ERROR IN Uploading: ", err)}
        onSuccess={(result, { widget }) => {
          console.log("HERE", result);
          setResource(result?.info); // { public_id, secure_url, etc }
        }}
        // onQueuesEnd={(result, { widget }) => {
        //   widget.close();
        // }}
      >
        {({ open }) => {
          function handleOnClick() {
            setResource(undefined);
            open();
          }
          return <button onClick={handleOnClick}>Upload Media</button>;
        }}
      </CldUploadWidget>

      <div className="mt-5 bg-red-50">
        {resource && resource.is_audio && (
          <div>
            <div>Uploaded Audio is: </div>
            <audio controls>
              <source src={resource?.url} type="audio/mpeg"></source>
            </audio>

            <button onClick={genClient}>Generate a Client</button>
          </div>
        )}
      </div>

      <button onClick={genClient}>Generate a Client</button>

      <div>
        <Agent />
      </div>

      <TextSpeech />

      <div>
        bot
        {/* <ChatBot /> */}
      </div>

      <AudioRecorder />
    </div>
  );
}






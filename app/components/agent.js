"use client";

import { useEffect, useState } from "react";
import { open as openEmbed } from "@play-ai/web-embed";

const webEmbedId = ""; // web embed id

export default function Agent() {
  const [text, setText] = useState("Change this text");

  const events = [
    {
      name: "change-text",
      when: "The user says what they want to change the text on the screen to",
      data: {
        text: { type: "string", description: "The text to change to" },
      },
    },
  ] 

  const onEvent = (event) => {
    console.log("onEvent: ", event);
    if (event.name === "change-text") {
      setText(event.data.text);
    }
  };

  async function run (){
    const res =  openEmbed(webEmbedId);
    console.log(res)

  }

  useEffect(() => {
    // const { setMinimized } = openEmbed(webEmbedId);
    // setMinimized(false)
    run()
  }, []);

  return (
    <>
      <div className="flex justify-center items-center h-[70vh]">
        <div className="font-medium text-2xl">{text}</div>
      </div>
    </>
  );
}

"use client";

import { useEffect, useState } from "react";
import { open as openEmbed } from "@play-ai/web-embed";

// const webEmbedId = ""; // web embed id

export default function Agent({ webEmbedId }) {
  console.log("embed id: ",webEmbedId)
  // if (!webEmbedId) {
  //   return <p>No Embed Id Provided </p>;
  // }



  useEffect(() => {
    // const { setMinimized } = openEmbed(webEmbedId);
    // setMinimized(false)
    async function run() {
      if (!webEmbedId) {
        return <p>No Embed Id Provided </p>;
      }
      const res = openEmbed(webEmbedId);
      console.log(res);
    }
    run();
  }, [webEmbedId]);

  return (
    <>
      <div> Embedded agent: ${webEmbedId} </div>
    </>
  );
}

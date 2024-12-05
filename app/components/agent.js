"use client";

import { useEffect, useState } from "react";
import { open as openEmbed } from "@play-ai/web-embed";

// const webEmbedId = ""; // web embed id

export default function Agent({ webEmbedId }) {
  console.log("embed id: ",webEmbedId)
  if (!webEmbedId) {
    return <p>No Embed Id Provided </p>;
  }

  async function run() {
    const res = openEmbed(webEmbedId);
    console.log(res);
  }

  useEffect(() => {
    // const { setMinimized } = openEmbed(webEmbedId);
    // setMinimized(false)
    run();
  }, []);

  return (
    <>
      <div> Embedded agent: ${webEmbedId} </div>
    </>
  );
}

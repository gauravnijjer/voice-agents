import React from 'react'
import Agent from '../components/agent'

export default function page() {

  console.log(process.env.AGENT_EMBED_ID3)
  return (
    <div>
      <h1>Click on the microphone button below to begin the conversation.</h1>
      <h2>if it has not loaded yet, give it a few seconds...</h2>
      <Agent webEmbedId={process.env.AGENT_EMBED_ID3} />
    </div>
  )
}

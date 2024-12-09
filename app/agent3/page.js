import React from 'react'
import Agent from '../components/agent'

export default function page() {

  console.log(process.env.AGENT_EMBED_ID3)
  return (
    <div>
      Agent3
      <Agent webEmbedId={process.env.AGENT_EMBED_ID3} />
    </div>
  )
}

import React from 'react'
import Agent from '../components/agent'

export default function page() {

  console.log(process.env.AGENT_EMBED_ID2)
  return (
    <div>
      Agent2
      <Agent webEmbedId={process.env.AGENT_EMBED_ID2} />
    </div>
  )
}

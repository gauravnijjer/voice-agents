import React from 'react'
import Agent from '../components/agent'

export default function page() {

  console.log(process.env.AGENT_EMBED_ID4)
  return (
    <div>
      Agent4
      <Agent webEmbedId={process.env.AGENT_EMBED_ID4} />
    </div>
  )
}

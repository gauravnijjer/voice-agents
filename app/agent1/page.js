import React from 'react'
import Agent from '../components/agent'

export default function page() {

  console.log(process.env.AGENT_EMBED_ID1)
  return (
    <div>
      Agent1
      <Agent webEmbedId={process.env.AGENT_EMBED_ID1} />
    </div>
  )
}

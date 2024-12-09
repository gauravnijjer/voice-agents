import AudioRecorder from "@/app/components/audio-recorder";

export default function page() {
  console.log(process.env.AGENT_ID1)
  return (
    <div>
      <h1>Welcome</h1>
      <AudioRecorder agentName={"agent1"} agentId={process.env.AGENT_ID1} />
    </div>
  )
}

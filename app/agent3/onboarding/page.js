import AudioRecorder from "@/app/components/audio-recorder";

export default function page() {
  console.log(process.env.AGENT_ID3)
  return (
    <div>
      Agent 3 Onboarding
      <AudioRecorder agentName={"agent3"} agentId={process.env.AGENT_ID3} />
    </div>
  )
}

import AudioRecorder from "@/app/components/audio-recorder";

export default function page() {
  console.log(process.env.AGENT_ID4)
  return (
    <div>
      Agent4 Onboarding
      <AudioRecorder agentName={"agent4"} agentId={process.env.AGENT_ID4} />
    </div>
  )
}

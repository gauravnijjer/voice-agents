import AudioRecorder from "@/app/components/audio-recorder";

export default function page() {
  console.log(process.env.AGENT_ID2)
  return (
    <div>
      Agent2 Onboarding
      <AudioRecorder agentName={"agent2"} agentId={process.env.AGENT_ID2} />
    </div>
  )
}

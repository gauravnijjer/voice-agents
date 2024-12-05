"use server";
import { redirect } from "next/navigation";
import { permanentRedirect } from "next/navigation";



export async function updateAgent(audioUrl, agentName, agentId) {
 
    const resVoice = await getVoiceClone(audioUrl);

    const updatedVoice = resVoice.id;

    const options = {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        AUTHORIZATION: process.env.PLAY_AI_SECRET_KEY,
        "X-USER-ID": process.env.PLAY_AI_USER_ID,
      },
      body: JSON.stringify({
        voice: updatedVoice,
      }),
    };

    const response = await fetch(
      `https://api.play.ai/api/v1/agents/${agentId}`,
      options
    );

    if (!response.ok) {
      throw new Error(
        `Error from PlayAI while updating the agent! Status: ${response.status}`
      );
    }
    const result = await response.json();
    console.log(result);

    redirect(`/${agentName}`);
  
}

async function getVoiceClone(voiceUrl) {
    console.log("VOICE URL IS: ",voiceUrl)
  const url = "https://api.play.ht/api/v2/cloned-voices/instant/";

  const formData = new FormData();
  formData.append("sample_file_url",voiceUrl);
  formData.append("voice_name", "agent-voice1");

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        accept: 'application/json',
        AUTHORIZATION: process.env.PLAY_HT_SECRET_KEY,
        'X-USER-ID': process.env.PLAY_HT_USER_ID,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    console.log("Response data from playht get voice clone:", data);
    return data;
  } catch (error) {
    console.error("Error posting cloned voice:", error);
    throw error;
  }
}

"use server"

export async function createAgent(audio) {

    console.log(process.env.PLAY_AI_SECRET_KEY
        ,process.env.PLAY_AI_USER_ID)
  try {
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
        AUTHORIZATION: `Bearer ${process.env.PLAY_AI_SECRET_KEY}`,
        "X-USER-ID": `${process.env.PLAY_AI_USER_ID}`,
      },
      body: JSON.stringify({
        // voice: audio,
        voice: "s3://voice-cloning-zero-shot/e2395fc0-c990-45b6-b95b-d65e9714f0de/test-1/manifest.json",
        voiceSpeed: 1.2,
        displayName: "Test 5",
        description: "An agent to have a casual chat",
        greeting: "Hello! what's up?",
        prompt: "You are an agent who likes to talk to people and know more about them. Anyone can come to you to talk about anything.",
        criticalKnowledge: "You are an extrovert",
        visibility: "public",
        answerOnlyFromCriticalKnowledge: true
    }),
    //   body: `{"voice":"${audio}","voiceSpeed":1.2,"displayName":"My Agent","description":"My agent is the best agent","greeting":"Hello! How can I help you today?","prompt":"You are an agent for a company that sells widgets. A customer calls in and asks about the different types of widgets you sell. You should respond by telling the customer about the different types of widgets you sell and how they differ from each other.\n","criticalKnowledge":"We have been in business for 20 years and have sold over 1 million widgets. Currently, we have 3 types of widgets: the standard widget, the deluxe widget, and the super widget. The standard widget is our most popular widget and is the most affordable. The deluxe widget is our mid-range widget and is popular with customers who want a little more than the standard widget. The super widget is our top of the line widget and is popular with customers who want the best of the best.","visibility":"public","answerOnlyFromCriticalKnowledge":true`,
    };

    const res = await fetch("https://api.play.ai/api/v1/agents", options);

    if (!res.ok) {
        let errorRes = await res.json();
        console.error("Something went wrong during POST request: ", errorRes)
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

    const data = await res.json();

    return data;
  } catch (error) {
    console.error(error);
    throw error
  }
}
//id: "`My-Agent-2hCtBy_GBBbyrvoTiQXX6`"



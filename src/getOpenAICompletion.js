import fetch from "node-fetch";

export async function getOpenAICompletion({ messages, functions }) {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_TOKEN}`
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages,
      functions: functions.map((f) => ({
        name: f.name,
        description: f.description,
        parameters: f.parameters
      }))
    })
  });

  const [{ message: response_message }] = (await response.json()).choices;

  if (response_message.function_call) {
    const function_to_call = functions.find(
      (f) => f.name === response_message.function_call.name
    );
    return await getOpenAICompletion({
      messages: [
        ...messages,
        response_message,
        {
          role: "function",
          name: response_message.function_call.name,
          content: await function_to_call?.fn(
            JSON.parse(response_message.function_call.arguments)
          )
        }
      ],
      functions
    });
  }

  return response_message.content;
}

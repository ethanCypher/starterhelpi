import OpenAI from "openai";
const openai = new OpenAI();

async function Chat_GPT({ key }: { key: string }) {
  const openai = new OpenAI({
    apiKey: key, // Ensure your API key is set here
  });

  let completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      {
        role: "user",
        content: "Write a haiku about recursion in programming.",
      },
    ],
  });
  console.log(completion.choices[0].message);
}

export default Chat_GPT;

import 'dotenv/config';
import { OpenAI } from "openai";

/**
 *
 * @param {*} prompt
 * @param {*} text
 * @returns
 */

export const chat = async (prompt, text) => {
  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-0125",
      messages: [
        { role: "system", content: prompt },
        { role: "user", content: text },
      ],
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.log(error);
    return "Error in chat";
  }
};
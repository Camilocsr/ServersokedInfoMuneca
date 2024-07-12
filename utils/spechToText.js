import 'dotenv/config';
import { AssemblyAI } from 'assemblyai';
import { deleteFile } from './deleteFile.js';

/**
 * The function transcribeAudio asynchronously transcribes audio from a file using AssemblyAI's Speech
 * to Text service with error handling.
 * @param audioFilePath - The `audioFilePath` parameter in the `transcribeAudio` function is the file
 * path to the audio file that you want to transcribe into text. This function uses the AssemblyAI
 * service to transcribe the audio file into text using the specified language code ("es" for Spanish
 * in this case).
 * @returns The function `transcribeAudio` is returning the transcribed text from the audio file after
 * processing it through AssemblyAI's transcription service.
 */
export const transcribeAudio = async (audioFilePath) => {
  console.log(audioFilePath)
  const client = new AssemblyAI({
    apiKey: process.env.ApiKeyAssembly
  });

  try {
    const params = {
      audio: audioFilePath,
      language_code: "es"
    };

    const transcript = await client.transcripts.transcribe(params);

    await deleteFile(audioFilePath);

    console.log(`esto es lo que se trascribe de el audio: ${transcript.text}`)
    return transcript.text;
  } catch (error) {
    console.error(`Ocurrió un error en el proceso de Speech to text de AssemblyAI: ${error}`);
    throw error;
  }
};
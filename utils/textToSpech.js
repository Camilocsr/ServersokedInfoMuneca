import { writeFileSync, mkdirSync, existsSync } from 'fs';
import fetch from 'node-fetch';
import 'dotenv/config';
import path from 'path'; // Importar path

/**
 * @param {string} text Texto que se convertirá en voz.
 * @returns {Promise<string>} Ruta del archivo de audio generado.
 */
export const textToVoice = async (text) => {
    try {
        const voiceId = process.env.VOZ_ELEVENLABS;
        const EVENT_TOKEN = process.env.EVENT_TOKEN ?? "";
        const URL = `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`;

        const header = {
            accept: "audio/mpeg",
            "xi-api-key": EVENT_TOKEN,
            "Content-Type": "application/json",
        };

        const raw = JSON.stringify({
            text,
            model_id: "eleven_multilingual_v2",
            voice_settings: {
                stability: 1,
                similarity_boost: 0.5,
            },
        });

        const requestOptions = {
            method: "POST",
            headers: header,
            body: raw,
            redirect: "follow",
        };

        const response = await fetch(URL, requestOptions);
        const buffer = await response.arrayBuffer();

        const tmpDir = path.join(process.cwd(), 'temp');
        const pathFile = path.join(tmpDir, `${Date.now()}-audio.mp3`);

        if (!existsSync(tmpDir)) {
            mkdirSync(tmpDir, { recursive: true });
        }

        writeFileSync(pathFile, Buffer.from(buffer));

        return pathFile;

    } catch (error) {
        console.error("Error en textToVoice:", error);
        throw error;
    }
};
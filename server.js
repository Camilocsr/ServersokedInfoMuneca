import 'dotenv/config';
import express from 'express';
import http from 'http';
import { WebSocketServer } from 'ws';
import { writeFileSync } from 'fs';
import path from 'path';
import { textToVoice } from './utils/textToSpech.js';
import { transcribeAudio } from './utils/spechToText.js';
import { chat } from './utils/OpenIA/ConversacionChatgpt.js';
import {promt} from './utils/OpenIA/promt.js';

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {
    console.log('Cliente conectado.');
    
    ws.on('message', async (audioBuffer) => {
        const timestamp = Date.now();
        const audioFilePath = path.join(process.cwd(), `temp/audio_${timestamp}.wav`);

        try {
            writeFileSync(audioFilePath, audioBuffer);
            const trascribsionAudio = await transcribeAudio(audioFilePath);

            console.log(`texto de trascriptcion de asemblyIA: ${trascribsionAudio}`)

            const respuestaOpenIA = await chat(promt,trascribsionAudio);

            console.log(respuestaOpenIA)

            const audioTranscript = await textToVoice(respuestaOpenIA);

            //console.log(`ubicacion de archivo de audio: ${audioTranscript}`)

            console.log(audioTranscript);

            ws.send('Audio recibido y guardado en el servidor.');
        } catch (error) {
            console.error(`Error en la transcripción de audio: ${error}`);
            ws.send('Error en el servidor al procesar el audio.');
        }
    });

    ws.on('close', () => {
        console.log('Cliente desconectado.');
    });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
    console.log(`Servidor Express con WebSocket iniciado en el puerto ${PORT}`);
});
import 'dotenv/config';
import express from 'express';
import http from 'http';
import { WebSocketServer } from 'ws';
import fs from 'fs';
import path from 'path';
import { transcribeAudio } from './utils/spechToText.js';
import { textToVoice } from './utils/textToSpech.js';
import { chat } from './utils/OpenIA/ConversacionChatgpt.js';
import { promt } from './utils/OpenIA/promt.js';
import { Writer } from 'wav';
import { deleteFile } from './utils/deleteFile.js';

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {
    console.log('Cliente conectado.');

    ws.on('message', async (audioBuffer) => {
        console.log('Audio recibido.');

        const timestamp = Date.now();
        const audioFilePath = path.join(process.cwd(), `temp/audio_${timestamp}.wav`);

        try {
            const writer = new Writer({
                channels: 2,
                sampleRate: 16000,
                bitDepth: 16,
            });

            writer.pipe(fs.createWriteStream(audioFilePath));

            writer.write(audioBuffer);
            writer.end();

            const transcription = await transcribeAudio(audioFilePath);
            const respuestaOpenIA = await chat(promt, transcription);
            const pathFileTextoAvoz = await textToVoice(respuestaOpenIA);

            console.log(`Respuesta generada: ${respuestaOpenIA}`);

            const audioFileBuffer = fs.readFileSync(pathFileTextoAvoz);

            //await deleteFile(pathFileTextoAvoz);

            ws.send(audioFileBuffer);
        } catch (error) {
            console.error(`Error en la transcripción de audio: ${error}`);
            ws.send('Error en el servidor al procesar el audio.');
        }
    });

    ws.on('close', () => {
        console.log('Cliente desconectado.');
    });

    ws.on('error', (err) => {
        console.error(`Error en la conexión WebSocket: ${err.message}`);
    });
});

const PORT = process.env.PORT;
server.listen(PORT, () => {
    console.log(`Servidor Express con WebSocket iniciado en el puerto ${PORT}`);
});
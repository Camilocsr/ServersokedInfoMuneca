import { Pinecone } from "@pinecone-database/pinecone"

if (!process.env.PINECONE_ENVIRONMENT || !process.env.PINECONE_API_KEY){
    throw new Error("Pinecone environment variables not set")
}

async function initPinecone(){
    try {
        const pinecone = new Pinecone()
        return pinecone;
    } catch (error) {
        console.log('Error initializing Pinecone', error)
        throw new Error("Error initializing Pinecone")
    }
}

export { initPinecone}
import { OpenAIEmbeddings } from "@langchain/openai";
import { PineconeStore } from "@langchain/pinecone";
import { pinecone } from "./connect.js";

const PINECONE_INDEX_NAME = process.env.PINECONE_INDEX_NAME || "";

const runOnPinecone = async (docs) => {
  const embeddings = new OpenAIEmbeddings();
  const index = pinecone.Index(PINECONE_INDEX_NAME);

  await PineconeStore.fromDocuments(docs, embeddings, {
    pineconeIndex: index,
    textKey: "text",
  });

  return true;
};

export { runOnPinecone };

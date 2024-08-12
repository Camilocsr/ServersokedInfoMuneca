import { OpenAIEmbeddings } from "@langchain/openai";
import { PineconeStore } from "@langchain/pinecone";
import { initPinecone } from "../pinecone/connect.js";
import { chainIntent } from "./index.js";

const runChat = async (question) => {
    const pinecone = await initPinecone();
    const index = pinecone.Index(`${process.env.PINECONE_INDEX_NAME}`);

    const loadedVector = await PineconeStore.fromExistingIndex(
        new OpenAIEmbeddings({}),
        {
            pineconeIndex: index,
            textKey: "text",
        }
    );

    const chain = chainIntent(loadedVector);
    const sanitizedQuestion = question.trim().replace("\n", " ");

    const response = await chain.invoke({
        question: sanitizedQuestion,
    });

    console.dir(response, { depth: null });

    return response;
};

export { runChat };
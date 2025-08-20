import { NextResponse } from "next/server";
import { ChatGroq } from "@langchain/groq";
import { loadSummarizationChain } from "langchain/chains";
import { Document } from "langchain/document";

export async function POST(req: Request) {
  try {
    const { text } = await req.json();

    if (!text) {
      return NextResponse.json({ error: "No text provided" }, { status: 400 });
    }

    // Initialize Groq LLM
    const llm = new ChatGroq({
      apiKey: process.env.GROQ_API_KEY,
      model: "llama3-8b-8192",
    });

    // Create a summarization chain
    const chain = loadSummarizationChain(llm, { type: "map_reduce" });

    // Wrap input in a Document
    const docs = [new Document({ pageContent: text })];

    // ✅ Correct usage for summarization chain
    const result = await chain.call({ input_documents: docs });

    return NextResponse.json({ summary: result.text });
  } catch (err) {
    console.error("Summarization error:", err);
    return NextResponse.json({ error: "Failed to summarize" }, { status: 500 });
  }
}

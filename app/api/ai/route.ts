import { systemContent } from "@/utils/ai";
import { NextRequest } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { url, description } = await req.json();
    if (!description) return Response.json({ error: true });
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-1106",
      messages: [
        {
          role: "system",
          content: systemContent,
        },
        {
          role: "user",
          content: `
            도서 설명: ${description}
            도서 관련 링크: ${url}
            
            위의 정보를 토대로 검색 키워드를 제공해주세요.
          `,
        },
      ],
    });

    return Response.json({ ...completion.choices[0].message, error: false });
  } catch (error) {
    return Response.json({ error: true, message: error });
  }
}

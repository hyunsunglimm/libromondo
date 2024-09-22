import Error from "next/error";
import { NextRequest } from "next/server";
import OpenAI from "openai";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { description } = await req.json();
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-1106",
      messages: [
        {
          role: "system",
          content: `
            조건 1: 저자는 제시하지 말 것
            조건 2: xx와 xx의 형태의 답이면 xx 로 하나의 키워드만 답하기
            조건 3: xx, xx, xx의 형태의 답이면 xx로 하나의 키워드만 답하기
            조건 4: 설명을 충분히 읽고 맥락을 잘 파악하여 어떤 키워드가 가장 관련된 책을 검색할 수 있는지 구체적으로 고려해볼 것
          `,
        },
        {
          role: "user",
          content: `
            ${description}
            
            위 도서 설명을 통해 위 도서와 관련된 도서를 검색하기 위한 키워드 하나를 제공해주세요
          `,
        },
      ],
    });

    return Response.json({ ...completion.choices[0].message, error: false });
  } catch (error) {
    return Response.json({ error: true });
  }
}

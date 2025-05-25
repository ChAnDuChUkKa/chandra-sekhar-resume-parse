import { OpenAI } from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function aiParseResume(text: string) {
  const prompt = `
You're a resume parsing expert. Extract the following structured JSON from the given raw resume text:

Resume Text:
"""
${text}
"""

Return only this JSON format:

{
  "skills": [{ "name": "string", "level": "Beginner | Intermediate | Advanced" }],
  "work_experience": [
    {
      "role": "string",
      "company": "string",
      "start": "Month YYYY",
      "end": "Month YYYY"
    }
  ],
  "education": [
    {
      "degree": "string",
      "institution": "string",
      "start": "YYYY",
      "end": "YYYY"
    }
  ]
}
`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // or 'gpt-3.5-turbo' if you're using that
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.2,
    });

    const content = response.choices[0].message?.content || '';
    const jsonStart = content.indexOf('{');
    const jsonText = content.slice(jsonStart);

    return JSON.parse(jsonText);
  } catch (err) {
    console.error('Error during LLM parsing:', err);
    throw new Error('Failed to parse resume with LLM');
  }
}

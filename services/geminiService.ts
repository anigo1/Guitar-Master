
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getAITutorResponse = async (prompt: string): Promise<any> => {
  const model = ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      systemInstruction: `Você é um professor de música especialista em guitarra. 
      Sua missão é explicar conceitos de teoria musical de forma didática, focando na aplicação prática no braço da guitarra. 
      Sempre inclua exercícios práticos e dicas de visualização. 
      Responda em JSON estruturado com os campos: explanation (string markdown), exercises (array de strings), tips (array de strings).`,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          explanation: { type: Type.STRING },
          exercises: { 
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          tips: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          }
        },
        required: ["explanation", "exercises", "tips"]
      }
    }
  });

  const response = await model;
  try {
    return JSON.parse(response.text);
  } catch (e) {
    console.error("Failed to parse Gemini response", e);
    return {
      explanation: response.text,
      exercises: [],
      tips: []
    };
  }
};

export const generateLessonContent = async (topic: string): Promise<string> => {
    const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Crie uma aula detalhada sobre "${topic}" para guitarristas. Use Markdown para formatar a resposta.`,
    });
    return response.text;
};

export const generateLessonImage = async (topic: string, description: string): Promise<string | null> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            text: `Create a clean, professional illustrative diagram for a guitar lesson titled "${topic}". 
            Focus on showing a guitar fretboard with clear note indicators or a theoretical musical concept. 
            Style: Modern, educational, minimalist, dark background matching a music app UI. 
            Description context: ${description}`,
          },
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: "16:9"
        }
      }
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
      }
    }
    return null;
  } catch (error) {
    console.error("Error generating lesson image:", error);
    return null;
  }
};

import { GoogleGenAI } from "@google/genai";
const ai = new GoogleGenAI({});

export async function getGeminiAPIResponse(prompt: string): Promise<string> {
  try {
  const response = await ai.models.generateContent({
    model: "gemini-flash-latest",
    contents: prompt,
  });

    return response.text as string;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "Some Error occur";
  }
}


export async function getClipdropImageResponse(prompt: string, style: string): Promise<string> { // why we add the promise <string> because async function return the promis 
  const CLIPDROP_API_KEY = process.env.CLIPDROP_API_KEY;
  if (!CLIPDROP_API_KEY) {
    console.error("CLIPDROP_API_KEY is not defined in environment variables.");
    return "Api key of clip drop is missing";
  }

  try {
    const form = new FormData();
    form.append('prompt', `${prompt}, in the style of ${style}`);

    const response = await fetch('https://clipdrop-api.co/text-to-image/v1', {
      method: 'POST',
      headers: {
        'x-api-key': CLIPDROP_API_KEY,
      },
      body: form as FormData, 
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Clipdrop API Error: ${response.status} ${errorText}`);
    }

   
    const imageBuffer = await response.arrayBuffer();
    const base64String = Buffer.from(imageBuffer).toString('base64');
    
    return `data:image/png;base64,${base64String}`;

  } catch (error) {
    console.error("Clipdrop Text-to-Image Error:", error);
    return "Some Error Occur";}
//   arrayBuffer() = grabs raw bytes of the PNG.
// Buffer.from(...).toString("base64") = turns those bytes into a base64 text string.
// data:image/png;base64,... = makes it usable as an <img> source.
}
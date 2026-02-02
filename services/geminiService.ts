import { GoogleGenAI } from "@google/genai";
import { LogoConfig } from "../types";

export type GenType = 'full' | 'icon';

export const generateLogoImage = async (
  config: LogoConfig, 
  variationIndex: number = 1, 
  type: GenType = 'full',
  referenceImageBase64?: string
): Promise<string> => {
  // Fix: Create a new GoogleGenAI instance right before making an API call to ensure it uses the most up-to-date API key
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const layoutInstruction = {
    'side-by-side': `Layout Architecture: The logo must feature a clean minimalist symbol on the left and the brand name "${config.brandName}" on the right in a modern sans-serif typeface.`,
    'stacked': `Layout Architecture: The logo must feature a clean minimalist symbol centered at the top and the brand name "${config.brandName}" centered directly below it in a modern typeface.`
  }[config.layout];

  const colorInstruction = {
    'Modern Blue': "Use professional shades of tech blue and cyan.",
    'Energetic Orange': "Use vibrant orange and dark grey accents.",
    'Sleek Dark': "Use a monochrome palette of deep charcoal, slate, and silver.",
    'Vibrant Gradient': "Use a modern high-end gradient (e.g., purple-to-blue or orange-to-pink).",
    'Monochrome': "Use strictly black and white for a timeless look."
  }[config.colorTheme];

  const uniquenessHint = [
    "Focus on geometric abstraction and sharp angles.",
    "Focus on soft curves, organic flows, and balance.",
    "Focus on clever negative space and hidden meanings.",
    "Focus on bold, heavy strokes and a strong presence.",
    "Focus on minimalist line-art and sophisticated simplicity."
  ][(variationIndex - 1) % 5];

  let prompt = "";
  let contents: any = { parts: [] };

  if (type === 'full') {
    prompt = `
      Create a complete 2D minimalist vector logo for a brand named "${config.brandName}".
      Variation Index: ${variationIndex}
      Design Style: ${config.style}
      Design Twist: ${uniquenessHint}
      Color Scheme: ${colorInstruction}
      ${layoutInstruction}
      
      Requirements:
      - Pure flat vector design. No mockups, no 3D effects.
      - Solid white background (#FFFFFF).
      - Represent: ${config.brandDescription || 'innovation and quality'}.
      - The typography must be ultra-professional and high-end sans-serif.
    `;
    contents.parts.push({ text: prompt.trim() });
  } else {
    // Note: Icon generation is currently bypassed in App.tsx for cost saving, 
    // but the service logic is kept for potential future on-demand use.
    if (referenceImageBase64) {
      const base64Data = referenceImageBase64.split(',')[1] || referenceImageBase64;
      contents.parts.push({
        inlineData: {
          mimeType: 'image/png',
          data: base64Data
        }
      });
      prompt = `
        Look at the provided logo image. Extract ONLY the iconic symbol/mark from it.
        Requirements:
        - REMOVE ALL TEXT. NO BRAND NAME. ONLY THE SYMBOL.
        - The symbol must be identical in visual form, color, and style to the one in the reference image.
        - Use a solid white background (#FFFFFF). 
        - The symbol should be centered.
        - Output a high-res flat vector-style image of JUST the mark.
      `;
    } else {
      prompt = `
        Create ONLY the iconic symbol (Icon) from the logo for brand "${config.brandName}".
        Variation Index: ${variationIndex}
        Design Style: ${config.style}
        Design Twist: ${uniquenessHint}
        Color Scheme: ${colorInstruction}
        
        Requirements:
        - NO TEXT. NO BRAND NAME. ONLY THE SYMBOL.
        - Use a solid white background (#FFFFFF).
        - Pure flat vector design.
        - Centered, minimalist, and iconic.
      `;
    }
    contents.parts.push({ text: prompt.trim() });
  }

  // Fix: Upgrade to gemini-3-pro-image-preview for 2K resolution requests.
  const isPro = config.imageSize === '2K';
  const model = isPro ? 'gemini-3-pro-image-preview' : 'gemini-2.5-flash-image';

  try {
    const response = await ai.models.generateContent({
      model,
      contents,
      config: {
        imageConfig: {
          aspectRatio: config.aspectRatio,
          // Fix: imageSize parameter is only supported on gemini-3-pro-image-preview
          ...(isPro ? { imageSize: config.imageSize } : {})
        }
      },
    });

    if (!response.candidates?.[0]?.content?.parts) {
       throw new Error("No response content received from the model.");
    }

    // Fix: Iterate through all parts to find the image part as recommended.
    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }

    throw new Error("The AI model did not return an image part.");
  } catch (error: any) {
    console.error("Gemini Image Gen Error:", error);
    const errorText = typeof error === 'string' ? error : (error.message || JSON.stringify(error));
    
    throw new Error(errorText || "Failed to generate logo identity.");
  }
};
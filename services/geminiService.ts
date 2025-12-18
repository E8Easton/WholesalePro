
import { GoogleGenAI } from "@google/genai";
import { DealState, GeneratedOffers, PropertyData, Comp, OfferCalculations } from "../types";

export const fetchPropertyDetails = async (address: string): Promise<Partial<PropertyData>> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
  const prompt = `
    You are a Real Estate Data Aggregator scraping data for: "${address}".
    
    Task:
    1. Estimate/Generate realistic property details (Zillow style).
    2. Generate a "Zillow-style" marketing description.
    3. Provide realistic images URLs from unsplash (use images.unsplash.com links for house interiors and exteriors).
    4. Estimate a Listing Agent/Realtor if one might exist (generate a realistic name/phone/email).
    
    Return ONLY a JSON object with this structure:
    {
      "city": "string",
      "state": "string (2 letter code)",
      "zip": "string",
      "price": number (estimated list price / Zestimate),
      "sqft": number,
      "beds": number,
      "baths": number,
      "lotSize": number,
      "yearBuilt": number,
      "county": "string",
      "description": "string",
      "type": "Single Family",
      "images": ["url1", "url2", "url3", "url4", "url5"],
      "realtorName": "string",
      "realtorPhone": "string",
      "realtorEmail": "string"
    }
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      }
    });

    const text = response.text;
    if (!text) throw new Error("No data returned");
    
    const data = JSON.parse(text);
    
    if (!data.images || data.images.length === 0) {
        data.images = [
            'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1484154218962-a1c002085d2f?auto=format&fit=crop&w=1200&q=80'
        ];
    }

    return data;
  } catch (error) {
    console.error("Property Fetch Error:", error);
    return {
      description: "Could not retrieve details. Please enter manually.",
      images: [
          'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80'
      ]
    };
  }
};

export const generateAIComps = async (address: string, propertyType: string): Promise<Comp[]> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
  const prompt = `
    Act as a Real Estate Appraiser. Generate 3 realistic comparable properties (Comps) for a property located at: "${address}" which is a ${propertyType}.
    The comps should be sold within the last 6 months, within 1 mile.
    
    Return ONLY a JSON array of objects with this structure:
    [
      {
        "address": "string",
        "salePrice": number,
        "sqft": number,
        "dateSold": "string (e.g. 2 months ago)",
        "similarity": number (0-100),
        "distancedMiles": number (e.g. 0.3)
      }
    ]
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      }
    });

    const text = response.text;
    if (!text) return [];
    return JSON.parse(text);
  } catch (error) {
    console.error("Comps Error:", error);
    return [];
  }
};

export const summarizePropertyDescription = async (description: string): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
  const prompt = `
    Summarize the following real estate description into a concise, easy-to-read paragraph highlighting the key features and condition. Max 50 words.
    
    Description:
    "${description}"
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text || description;
  } catch (error) {
    return description;
  }
};

export const generateOfferScript = async (offer: OfferCalculations, strategy: string, address: string, agentName?: string): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
  const prompt = `
    Write a professional and persuasive text message/email script to a real estate agent submitting an offer.
    
    Details:
    - Agent Name: ${agentName || 'Agent'}
    - Property: ${address}
    - Strategy: ${strategy} (e.g., Cash, Subject To, Seller Finance)
    - Offer Price: $${offer.offerPrice.toLocaleString()}
    - Down Payment: $${offer.downPayment.toLocaleString()} (if applicable)
    - Monthly Payment: $${offer.monthlyPayment.toLocaleString()} (if applicable)
    - Key Benefit: Stress-free closing, no fees, quick close.
    
    Keep it concise (under 150 words) and ready to copy-paste.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text || "Error generating script.";
  } catch (error) {
    return "Hi [Agent], I'd like to submit an offer for [Address]. Please see the attached details.";
  }
};

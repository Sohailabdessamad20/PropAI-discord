interface ShapesAPIMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface ShapesAPIRequest {
  model: string;
  messages: ShapesAPIMessage[];
}

interface ShapesAPIResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

export const sendMessageToAI = async (message: string): Promise<string> => {
  try {
    let actualMessage = message;
    if (message.startsWith('/generate ')) {
      const prompt = message.substring(10).trim();
      actualMessage = `imagine ${prompt}`;
    }

    const headers = {
      "Authorization": `Bearer ${import.meta.env.VITE_SHAPES_API_KEY}`,
      "Content-Type": "application/json"
    };

    const data: ShapesAPIRequest = {
      model: "shapesinc/propbot6969696969",
      messages: [
        { role: "user", content: actualMessage }
      ]
    };

    const response = await fetch("https://api.shapes.inc/v1/chat/completions", {
      method: "POST",
      headers,
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error:', response.status, errorText);
      throw new Error(`API request failed: ${response.status} - ${errorText}`);
    }

    const result: ShapesAPIResponse = await response.json();
    return result.choices[0]?.message?.content || "Sorry, I couldn't generate a response.";
  } catch (error) {
    console.error('AI API error:', error);
    if (error instanceof Error) {
      return `Sorry, I encountered an error: ${error.message}. Please try again later.`;
    }
    return "Sorry, I'm having trouble connecting to the AI service right now. Please try again later.";
  }
};
export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

// Function to generate a bot response by calling the Flask backend
export const generateBotResponse = async (userMessage: string): Promise<string> => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/query`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: userMessage }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    // Handle response as an array of chunks or a single string
    if (Array.isArray(data.response)) {
      return data.response.join(' ');
    }
    return data.response || 'Sorry, something went wrong.';
  } catch (error) {
    console.error('Error fetching bot response:', error);
    return 'Error: Could not reach the server. Please try again.';
  }
};
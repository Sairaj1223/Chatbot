import dotenv from 'dotenv';
dotenv.config();

export const sendMessage = async (req, res, next) => {
  try {
    const { message } = req.body;

    console.log('Received message:', message);

    if (!message || message.trim() === '') {
      return res.status(400).json({
        success: false,
        error: 'Message is required'
      });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY is not set in .env file');
    }

    // Using gemini-2.5-flash which is stable and available
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

    console.log('Calling Gemini API with model: gemini-2.5-flash');

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: message
          }]
        }]
      })
    });

    const data = await response.json();
    console.log('Gemini API Response status:', response.status);

    if (!response.ok) {
      console.error('Gemini API Error:', data);
      throw new Error(data.error?.message || 'Failed to get response from Gemini');
    }

    const text = data.candidates[0].content.parts[0].text;
    console.log('Success! Got response from AI');

    res.status(200).json({
      success: true,
      data: {
        message: text,
        timestamp: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Controller Error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Internal server error'
    });
  }
};

export const healthCheck = async (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Maitri AI Backend is running',
    timestamp: new Date().toISOString()
  });
};
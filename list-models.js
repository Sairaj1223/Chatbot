import dotenv from 'dotenv';
dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;

async function listModels() {
  try {
    console.log('Fetching available models...\n');
    
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`
    );
    
    const data = await response.json();
    
    console.log('✅ Available Models for generateContent:\n');
    
    data.models?.forEach(model => {
      if (model.supportedGenerationMethods?.includes('generateContent')) {
        console.log(`Model: ${model.name}`);
        console.log(`  Display Name: ${model.displayName}`);
        console.log(`  Description: ${model.description}`);
        console.log('---');
      }
    });
  } catch (error) {
    console.error('Error:', error.message);
  }
}

listModels();
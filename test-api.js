import dotenv from 'dotenv';
dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;

async function test() {
  try {
    console.log('Testing gemini-2.5-flash model...\n');
    
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: 'Say hello and introduce yourself' }] }]
        })
      }
    );

    console.log('Response status:', response.status);
    
    const data = await response.json();
    
    if (response.ok) {
      console.log('\n✅ SUCCESS!\n');
      console.log('AI Response:');
      console.log(data.candidates[0].content.parts[0].text);
    } else {
      console.log('\n❌ FAILED!\n');
      console.log('Error:', JSON.stringify(data, null, 2));
    }
  } catch (error) {
    console.error('ERROR:', error.message);
  }
}

test();
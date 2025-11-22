// functions/api/chat.js
export async function onRequestPost(context) {
    const { request } = context;
    
    try {
      const { message } = await request.json();
      
      // Get API key from Cloudflare environment variable
      const API_KEY = context.env.GEMINI_API_KEY;
      
      if (!API_KEY) {
        return new Response(
          JSON.stringify({ error: 'API key not configured' }),
          { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
      }
      
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
        {
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
        }
      );
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }
      
      const data = await response.json();
      return new Response(JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json' }
      });
      
    } catch (error) {
      return new Response(
        JSON.stringify({ error: error.message }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }
  }
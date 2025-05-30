export async function POST(request) {
  try {
    const body = await request.json();
    
    const response = await fetch('http://localhost:8080/api/chatbot/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error('Failed to get response from backend');
    }

    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    console.error('Error:', error);
    return Response.json(
      { message: 'Sorry, something went wrong. Please try again.' },
      { status: 500 }
    );
  }
} 
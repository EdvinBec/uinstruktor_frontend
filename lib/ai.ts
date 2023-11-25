const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const fetchAIPrompt = (code: string) => {
  const result = fetch(baseURL + '/api/ai/help', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({ content: code }),
  });
  return result;
};

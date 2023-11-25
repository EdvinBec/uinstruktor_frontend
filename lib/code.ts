const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const uploadCode = (code: string, assigmentId: string, lang: string) => {
  const result = fetch(baseURL + '/api/code/submission', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      lang: lang,
      source: code,
      assigmentID: assigmentId,
    }),
  });
  return result;
};

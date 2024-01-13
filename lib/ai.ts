const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const AIHelp = async (
  code: string,
  problemID?: string,
  assigmentID?: string,
) => {
  const result = fetch(baseURL + "/api/ai/help", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      userCode: code,
      problemID: problemID,
      assigmentID: assigmentID,
    }),
  });
  return (await result).json();
};

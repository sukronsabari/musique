/* eslint-disable import/prefer-default-export */
const generateRequestOptions = ({
  method = 'GET',
  url,
  params,
}: {
  method: 'GET' | 'POST' | 'DELETE' | 'PUT';
  url: string;
  params?: object;
}) => {
  return {
    method,
    url,
    params,
    headers: {
      'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPIDAPI_KEY,
      'X-RapidAPI-Host': process.env.NEXT_PUBLIC_RAPIDAPI_HOST,
    },
  };
};

export { generateRequestOptions };

export default async function getProductsList() {
  const response: Response = await fetch(
    `${import.meta.env.VITE_API_URL}/${import.meta.env.VITE_PROJECT_KEY}/products`,
    {
      method: 'GET',
      headers: {
        Authorization: `${import.meta.env.VITE_TOKEN_TYPE} ${localStorage.getItem('access_token')}`,
      },
    },
  );
  const data = await response.json();
  // console.log(data);
  return data.results;
}

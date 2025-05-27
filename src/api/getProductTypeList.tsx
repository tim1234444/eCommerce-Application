export default async function getProductTypeList() {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/${import.meta.env.VITE_PROJECT_KEY}/products/`,
    {
      method: 'GET',
      headers: {
        Authorization: `${import.meta.env.VITE_TOKEN_TYPE} ${localStorage.getItem('access_token')}`,
      },
    },
  );
  console.log(response);
}

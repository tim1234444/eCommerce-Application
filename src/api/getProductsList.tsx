export default async function getProductsList() {
  try {
    const response: Response = await fetch(
      `${import.meta.env.VITE_API_URL}/${import.meta.env.VITE_PROJECT_KEY}/products`,
      {
        method: 'GET',
        headers: {
          Authorization: `${import.meta.env.VITE_TOKEN_TYPE} ${localStorage.getItem('access_token')}`,
        },
      },
    );
    if (response.status === 200 && response.ok === true) {
      const data = await response.json();
      console.log(response);
      return data.results;
    } else {
      const err = new Error(
        `Response error status code = ${response.status} and status ok = ${response.ok}`,
      );
      throw err;
    }
  } catch (error) {
    console.error(error);
  }
}

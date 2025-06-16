import getCookie from './getCoockie';

export default async function getCustomer(email: string) {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/${import.meta.env.VITE_PROJECT_KEY}/customers/
?where=email%3D%22${email}%22`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${getCookie().access_token}`,
      },
    },
  );
  const data = await response.json();
  return data;
}

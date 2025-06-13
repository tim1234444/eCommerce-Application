export default async function fetchAccessToken(
  email: string,
  password: string,
  SetError: React.Dispatch<React.SetStateAction<string>>,
) {
  const authHost = import.meta.env.VITE_AUTH_URL;
  const projectKey = import.meta.env.VITE_PROJECT_KEY;
  const clientId = import.meta.env.VITE_CLIENT_ID;
  const clientSecret = import.meta.env.VITE_CLIENT_SECRET;
  const scope = import.meta.env.VITE_SCOPES;

  const url = `${authHost}/oauth/${projectKey}/customers/token`;
  const credentials = btoa(`${clientId}:${clientSecret}`);

  const body = new URLSearchParams({
    grant_type: 'password',
    username: email,
    password: password,
    scope: scope,
  });

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${credentials}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body,
  });

  if (!response.ok) {
    const error = await response.text();
    let message = 'Произошла ошибка. Попробуйте позже.';

    try {
      const errorData = JSON.parse(error);

      if (errorData?.error === 'invalid_customer_account_credentials') {
        message = 'Неверный email или пароль. Попробуйте снова.';
      }
    } catch (e) {
      console.warn('Ошибка при разборе текста ошибки:', e);
    }

    SetError(message);
    throw new Error(`Ошибка запроса: ${response.status} - ${error}`);
  }

  const data = await response.json();
  return data;
}

export default function getCookie() {
  const coockie = document.cookie
    .split('; ')
    .reduce((acc: { [key: string]: string }, item: string) => {
      const [name, value] = item.split('=');
      acc[name] = value;
      return acc;
    }, {});
  return coockie;
}

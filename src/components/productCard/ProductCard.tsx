export default function ProductCard({
  id,
  name,
  images,
  description,
}: {
  id: string;
  name: { 'en-US': string };
  images: [{ url: string }];
  description: { 'en-US': string };
}) {
  return (
    <li key={Number(id)} data-id={id}>
      <a href="#">
        <h3>{name['en-US']}</h3>
        <img src={images[0]['url']} width={200} alt="" />
        <p>{`${description['en-US']}`}</p>
      </a>
    </li>
  );
}

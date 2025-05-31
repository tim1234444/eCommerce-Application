import './productCard.css';
export default function ProductCard({
  id,
  name,
  images,
  description,
  prices,
}: {
  id: string;
  name: { 'en-US': string };
  images: [{ url: string }];
  description: { 'en-US': string };
  prices: {
    value: {
      centAmount: string;
      currencyCode: string;
    };
    discounted: {
      value: {
        centAmount: string;
        currencyCode: string;
      };
    };
  };
}) {
  return (
    <li key={Number(id)} data-id={id} className="item-list">
      <a href="#">
        <h3>{name['en-US']}</h3>
        <img
          src={images[0]['url']}
          width={200}
          height={150}
          alt={name['en-US']}
        />
        {prices && (
          <p>
            {`Price: `}
            {prices.value.centAmount}
            {prices.value.currencyCode}
          </p>
        )}
        {prices.discounted && (
          <p>
            {`Discount Price: `}
            {prices.discounted.value.centAmount}
            {prices.discounted.value.currencyCode}
          </p>
        )}
        <p className="item-list-description">{description['en-US']}</p>
      </a>
    </li>
  );
}

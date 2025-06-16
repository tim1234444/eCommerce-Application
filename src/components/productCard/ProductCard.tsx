import './productCard.css';
import addProductInCart from '../../api/addProductInCart';
export default function ProductCard({
  id,
  name,
  images,
  description,
  prices,
  masterVariant,
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
  masterVariant: {
    sku: string;
  };
}) {
  return (
    <li
      key={Number(id)}
      data-id={id}
      data-sku={masterVariant.sku}
      className="item-list"
    >
      <a href={`/item/${id}`}>
        <h4>{name['en-US']}</h4>
        <img
          src={images[0]['url']}
          width={200}
          height={150}
          alt={name['en-US']}
        />
        {prices && (
          <p>
            {`Current Price: `}
            {prices.value.centAmount}
            {prices.value.currencyCode}
          </p>
        )}
        {prices?.discounted && (
          <p className="item-list-discount">
            {`Current discount price: `}
            {prices.discounted.value.centAmount}
            {prices.discounted.value.currencyCode}
          </p>
        )}

        <p
          className="item-list-description"
          dangerouslySetInnerHTML={{
            __html: description['en-US'] || '',
          }}
        ></p>
      </a>
      <button
        type="button"
        onClick={() => {
          addProductInCart(id);
        }}
      >
        Add to cart
      </button>
    </li>
  );
}

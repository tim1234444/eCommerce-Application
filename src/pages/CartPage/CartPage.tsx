import { useEffect, useState } from 'react';
import Layout from '../../components/layout/Layout';
import './CartPage.css';
import getCartByCustomerID from '../../api/getCartByCustomerID';

import CarItem from '../../components/cartItem/carItem';
import deleteProductCart from '../../api/deleteCart';
import createCart from '../../api/createCart';
import addDiscountCode from '../../api/addDiscountCode';

type CartItem = {
  id: string;
  name: {
    'en-US': string;
  };

  price: {
    discounted?: {
      value: {
        centAmount: number;
      };
    };
    key: string;
    value: {
      type: string;
      currencyCode: string;
      centAmount: number;
      fractionDigits: number;
    };
  };
  variant: {
    images: {
      url: string;
    }[];
  };
  quantity: number;
};

type Cart = {
  id: string;
  lineItems: CartItem[];
  totalPrice: {
    centAmount: number;
  };
};

export default function CartPage() {
  const [data, Setdata] = useState<Cart | null>();
  const [total, Settotal] = useState<number>(0);
  const [promoCode, setPromoCode] = useState('');
  const [originalTotal, SetOriginalTotal] = useState<number>(0);
  useEffect(() => {
    async function fetchData() {
      const data: Cart = await getCartByCustomerID();
      if (data) {
        Setdata(data);
        Settotal(data.totalPrice.centAmount);
        const originalTotal = data.lineItems.reduce((acc, item) => {
          return acc + item.price.value.centAmount * item.quantity;
        }, 0);
        SetOriginalTotal(originalTotal);
      }
    }

    fetchData();
  }, []);

  async function refreshCart() {
    const updatedCart: Cart = await getCartByCustomerID();
    Setdata(updatedCart);
    Settotal(updatedCart.totalPrice.centAmount);
    const originalTotal = updatedCart.lineItems.reduce((acc, item) => {
      return acc + item.price.value.centAmount * item.quantity;
    }, 0);
    SetOriginalTotal(originalTotal);
  }
  const [showConfirm, setShowConfirm] = useState(false);

  const handleClearCart = async () => {
    const result = await deleteProductCart();
    if (result) {
      const newCart = await createCart();
      Setdata(newCart);
      Settotal(newCart?.totalPrice?.centAmount);
    }
    setShowConfirm(false);
  };
  return (
    <Layout>
      <section className="cart">
        <div className="cart__container">
          <ul className="cart__list">
            {data && data.lineItems.length === 0 && (
              <p className="cart__text">
                There is nothing here yet. To add products to the{' '}
                <a style={{ color: 'red' }} href="/catalog">
                  catalog page
                </a>
              </p>
            )}
            {data &&
              data.lineItems.map((item) => (
                <CarItem
                  onUpdate={refreshCart}
                  id={item.id}
                  key={item.id}
                  name={item.name['en-US']}
                  src={item.variant.images[0].url}
                  price={
                    item.price.discounted?.value.centAmount ||
                    item.price.value.centAmount
                  }
                  count={item.quantity}
                />
              ))}
          </ul>
          {data && data.lineItems.length != 0 && (
            <>
              {' '}
              <p className="cart__total-price">
                {originalTotal !== total ? (
                  <>
                    <span
                      style={{
                        textDecoration: 'line-through',
                        color: 'gray',
                        marginRight: '8px',
                      }}
                    >
                      {originalTotal} USD
                    </span>
                    <span style={{ color: 'red', fontWeight: 'bold' }}>
                      {total} USD
                    </span>
                  </>
                ) : (
                  <span>{total} USD</span>
                )}
              </p>
              <button onClick={() => setShowConfirm(true)}>empty basket</button>
              <div className="promo">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="enter promotional code"
                  className="promo__input"
                />
                <button
                  onClick={async () => {
                    const data = await addDiscountCode(promoCode);
                    if (data) {
                      Setdata(data);
                      Settotal(data?.totalPrice?.centAmount);
                    }
                  }}
                  className="promo__button"
                >
                  Apply
                </button>
              </div>
              {showConfirm && (
                <div className="modal">
                  <div className="modal__content">
                    <p>Are you sure you want to empty your trash?</p>
                    <button onClick={handleClearCart}>Yes</button>
                    <button onClick={() => setShowConfirm(false)}>No</button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </Layout>
  );
}

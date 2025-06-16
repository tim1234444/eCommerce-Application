import { useState } from 'react';
import changeLineItemQuantity from '../../api/changeLineItemQuantity';
import deleteProductInCart from '../../api/deleteProductInCart';

export default function CarItem({
  id,
  name,
  src,
  price,
  count,
  onUpdate,
}: {
  id: string;
  name: string;
  src: string;
  price: number;
  count: number;
  onUpdate: () => void;
}) {
  const [changeCount, SetchangeCount] = useState(count);

  const [showToast, setShowToast] = useState(false);
  const [color, setColor] = useState('green');
  const [toastMessage, setToastMessage] = useState('');

  const showToastMessage = (message: string) => {
    setToastMessage(message);
    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
      setToastMessage('');
    }, 3000);
  };
  return (
    <div>
      {showToast && (
        <div style={{ background: color }} className="toast">
          {toastMessage}
        </div>
      )}
      <li className="car__item">
        <div className="car__item-info">
          <p className="info__name">{name}</p>
          <div className="info__img-container">
            <img src={src} className="info__img"></img>
          </div>

          <p className="info__price">{price} USD</p>
          <div className="info__change-count">
            <p className="info__count">{changeCount}</p>
            <div className="change__buttons">
              <button
                onClick={() => {
                  if (changeCount >= 1) {
                    SetchangeCount(changeCount + 1);
                  }
                }}
                className="change__plus"
              >
                +
              </button>
              <button
                onClick={() => {
                  if (changeCount > 1) {
                    SetchangeCount(changeCount - 1);
                  }
                }}
                className="change__minus"
              >
                -
              </button>
              <button
                onClick={async () => {
                  const data = await changeLineItemQuantity(id, changeCount);
                  if (data) {
                    setColor('green');
                    showToastMessage('Save');
                    onUpdate();
                  } else {
                    setColor('red');
                    showToastMessage('Error');
                  }
                }}
                className="info__save"
              >
                Save
              </button>
            </div>
          </div>

          <p className="info__total">{price * changeCount} USD</p>
          <button
            onClick={async () => {
              const data = await deleteProductInCart(id);
              if (data) {
                setColor('green');
                showToastMessage('delete');

                onUpdate();
              } else {
                setColor('red');
                showToastMessage('Error');
              }
            }}
            className="delete-button"
          >
            delete product
          </button>
        </div>
      </li>
    </div>
  );
}

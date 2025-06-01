import React, { useEffect, useState } from 'react';
import { getCurrentUserData } from '../api/getUserProfile';

interface Address {
  streetName: string;
  streetNumber?: string | number;
  postalCode: string;
  city: string;
  state?: string;
  country: string;
}

interface CustomerData {
  firstName: string;
  lastName: string;
  dateOfBirth?: string;
  addresses?: Address[];
  defaultBillingAddress?: number;
  defaultShippingAddress?: number;
}

interface ProfilePageProps {
  customerId: string;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ customerId }) => {
  const [userData, setUserData] = useState<CustomerData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const data = await getCurrentUserData();
        setUserData(data);
      } catch (e: unknown) {
        if (e instanceof Error) {
          setError(e.message);
        } else {
          setError('Ошибка при загрузке профиля');
        }
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, [customerId]);

  if (loading) return <p>Загрузка данных...</p>;
  if (error) return <p style={{ color: 'red' }}>Ошибка: {error}</p>;
  if (!userData) return <p>Пользователь не найден</p>;

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
      <section>
        <h2>Личная информация</h2>
        <p>
          <strong>Имя:</strong> {userData.firstName}
        </p>
        <p>
          <strong>Фамилия:</strong> {userData.lastName}
        </p>
        <p>
          <strong>Дата рождения:</strong> {userData.dateOfBirth || 'не указана'}
        </p>
      </section>

      <section style={{ marginTop: 30 }}>
        <h2>Адреса</h2>
        {userData.addresses && userData.addresses.length > 0 ? (
          userData.addresses.map((addr, index) => {
            const isDefaultBilling = index === userData.defaultBillingAddress;
            const isDefaultShipping = index === userData.defaultShippingAddress;

            return (
              <div
                key={index}
                style={{
                  backgroundColor: isDefaultBilling
                    ? '#d0f0c0'
                    : isDefaultShipping
                      ? '#c0d0f0'
                      : '#f0f0f0',
                  padding: 15,
                  marginBottom: 15,
                  borderRadius: 8,
                  border: '1px solid #ccc',
                }}
              >
                <p>
                  {addr.streetName} {addr.streetNumber}, {addr.city},{' '}
                  {addr.state ?? ''} {addr.postalCode}, {addr.country}
                </p>
                {isDefaultBilling && (
                  <span style={{ fontWeight: 'bold', color: 'green' }}>
                    Default Billing Address
                  </span>
                )}
                {isDefaultShipping && (
                  <span
                    style={{
                      fontWeight: 'bold',
                      color: 'blue',
                      marginLeft: 10,
                    }}
                  >
                    Default Shipping Address
                  </span>
                )}
              </div>
            );
          })
        ) : (
          <p>Адреса не найдены</p>
        )}
      </section>
    </div>
  );
};

export default ProfilePage;

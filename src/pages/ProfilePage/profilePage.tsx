import React, { useEffect, useState } from 'react';
import './ProfilePage.css';
import { getUserProfile } from '../../api/getUserProfile';

interface Address {
  id: string;
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
  defaultShippingAddressId?: string;
  billingAddressIds?: string[];
}

const ProfilePage: React.FC = () => {
  const [userData, setUserData] = useState<CustomerData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const data = await getUserProfile();
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
  }, []);

  if (loading) return <p>Loading data...</p>;
  if (error) return <p className="error-text">Error: {error}</p>;
  if (!userData) return <p>User not found</p>;

  return (
    <div className="profile-container">
      <section>
        <h2>Personal information</h2>
        <p>
          <strong>First name:</strong> {userData.firstName}
        </p>
        <p>
          <strong>Last name:</strong> {userData.lastName}
        </p>
        <p>
          <strong>Date of birth:</strong> {userData.dateOfBirth || 'не указана'}
        </p>
      </section>

      <section className="addresses-section">
        <h2>Adress:</h2>
        {userData.addresses && userData.addresses.length > 0 ? (
          userData.addresses.map((addr, index) => {
            const isDefaultBilling = userData.billingAddressIds?.includes(
              addr.id,
            );
            const isDefaultShipping =
              userData.defaultShippingAddressId === addr.id;

            return (
              <div
                key={index}
                className={`address-card ${isDefaultBilling ? 'billing' : isDefaultShipping ? 'shipping' : ''}`}
              >
                <p>
                  Street name: {addr.streetName} <br />
                  Street number: {addr.streetNumber} <br />
                  City: {addr.city} <br />
                  {addr.state && (
                    <>
                      State: {addr.state} <br />
                    </>
                  )}
                  Postal Code: {addr.postalCode} <br />
                  Country: {addr.country}
                </p>
                {isDefaultBilling && (
                  <span className="label billing-label">
                    Default Billing Address
                  </span>
                )}
                {isDefaultShipping && (
                  <span className="label shipping-label">
                    Default Shipping Address
                  </span>
                )}
              </div>
            );
          })
        ) : (
          <p>No addresses found</p>
        )}
      </section>
    </div>
  );
};

export default ProfilePage;

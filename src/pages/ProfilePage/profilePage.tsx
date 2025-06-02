import React, { useState, useEffect } from 'react';
import type { FormEvent } from 'react';
import './ProfilePage.css';
import { getUserProfile } from '../../api/getUserProfile';
import { updateUserProfileCT } from '../../api/updateUserProfile';
import type { CustomerUpdateAction } from '@commercetools/platform-sdk';
import InputName from '../../components/inputName/InputName';
import InputdateOfBirth from '../../components/inputdateOfBirth/inputdateOfBirth';
import InputEmail from '../../components/inputEmail/InputEmail';
import InputLastName from '../../components/inputLastName/InputLastName';

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
  id: string;
  version: number;
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth?: string;
  addresses?: Address[];
  defaultShippingAddressId?: string;
  billingAddressIds?: string[];
}

const ProfilePage: React.FC = () => {
  const [userData, setUserData] = useState<CustomerData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [editMode, setEditMode] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    dateOfBirth: '',
  });
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const data = await getUserProfile();

        // Нормализуем данные и обновляем состояния
        setUserData({
          id: data.id,
          version: data.version,
          firstName: data.firstName ?? '',
          lastName: data.lastName ?? '',
          email: data.email ?? '',
          dateOfBirth: data.dateOfBirth ?? '',
          addresses: data.addresses ?? [],
          defaultShippingAddressId: data.defaultShippingAddressId,
          billingAddressIds: data.billingAddressIds,
        });

        setFormData({
          firstName: data.firstName ?? '',
          lastName: data.lastName ?? '',
          email: data.email ?? '',
          dateOfBirth: data.dateOfBirth ?? '',
        });
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!userData) {
      setMessage('Профиль не загружен');
      return;
    }

    const form = e.target as HTMLFormElement;
    if (!form.checkValidity()) {
      setMessage('Пожалуйста, исправьте ошибки в форме');
      return;
    }

    const actions: CustomerUpdateAction[] = [];

    if (formData.firstName !== userData.firstName) {
      actions.push({ action: 'setFirstName', firstName: formData.firstName });
    }
    if (formData.lastName !== userData.lastName) {
      actions.push({ action: 'setLastName', lastName: formData.lastName });
    }
    if (formData.email !== userData.email) {
      actions.push({ action: 'changeEmail', email: formData.email });
    }
    if (formData.dateOfBirth !== (userData.dateOfBirth ?? '')) {
      actions.push({
        action: 'setDateOfBirth',
        dateOfBirth: formData.dateOfBirth,
      });
    }

    if (actions.length === 0) {
      setMessage('No changes to save');
      return;
    }

    try {
      const updatedUser = await updateUserProfileCT(
        userData.id,
        userData.version,
        actions,
      );

      setUserData({
        id: updatedUser.id,
        version: updatedUser.version,
        firstName: updatedUser.firstName ?? '',
        lastName: updatedUser.lastName ?? '',
        email: updatedUser.email ?? '',
        dateOfBirth: updatedUser.dateOfBirth ?? '',
        addresses: updatedUser.addresses ?? [],
        defaultShippingAddressId: updatedUser.defaultShippingAddressId,
      });

      setFormData({
        firstName: updatedUser.firstName ?? '',
        lastName: updatedUser.lastName ?? '',
        email: updatedUser.email ?? '',
        dateOfBirth: updatedUser.dateOfBirth ?? '',
      });

      setEditMode(false);
      setMessage('Profile updated successfully');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setMessage(`Ошибка: ${err.message}`);
      } else {
        setMessage('Неизвестная ошибка');
      }
    }
  };

  if (loading) return <p>Loading data...</p>;
  if (error) return <p className="error-text">Error: {error}</p>;
  if (!userData) return <p>User not found</p>;

  return (
    <div className="profile-container">
      <section>
        <h2>Personal information</h2>

        {message && (
          <p
            style={{
              color: message.toLowerCase().includes('ошибка') ? 'red' : 'green',
            }}
          >
            {message}
          </p>
        )}

        {!editMode ? (
          <>
            <p>
              <strong>First name:</strong> {userData.firstName}
            </p>
            <p>
              <strong>Last name:</strong> {userData.lastName}
            </p>
            <p>
              <strong>Email:</strong> {userData.email}
            </p>
            <p>
              <strong>Date of birth:</strong>{' '}
              {userData.dateOfBirth || 'не указана'}
            </p>
            <button
              onClick={() => {
                setEditMode(true);
                setMessage(null);
              }}
            >
              Edit
            </button>
          </>
        ) : (
          <form onSubmit={handleSubmit}>
            <InputName value={formData.firstName} onChange={handleChange} />
            <br />
            <InputLastName value={formData.lastName} onChange={handleChange} />
            <br />
            <InputEmail value={formData.email} onChange={handleChange} />
            <br />
            <InputdateOfBirth
              value={formData.dateOfBirth}
              onChange={handleChange}
            />
            <br />
            <button type="submit">Save</button>{' '}
            <button
              type="button"
              onClick={() => {
                setEditMode(false);
                setMessage(null);
              }}
            >
              Cancel
            </button>
          </form>
        )}
      </section>

      <section className="addresses-section">
        <h2>Address:</h2>
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

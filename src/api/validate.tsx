import type { FormEvent } from 'react';

export default function validate(event: FormEvent) {
  if (event.target instanceof HTMLInputElement) {
    if (
      event.target.name === 'firstName' ||
      event.target.name === 'lastName' ||
      event.target.name === 'city'
    ) {
      if (event.target.value.length == 0)
        event.target.title = 'Minimum length 1 characters';
      else if (!/^[a-zA-Z]+$/.test(event.target.value))
        event.target.title =
          'Latin letters and no special characters or numbers';
    }
    if (event.target.name === 'password') {
      if (event.target.value.length < 8) {
        event.target.title = 'Minimum 8 characters';
      } else if (
        !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/.test(
          event.target.value,
        )
      )
        event.target.title =
          'at least 1 uppercase letter, 1 lowercase letter, and 1 number';
    }
    if (event.target.name === 'streetName') {
      if (!/^.+$/.test(event.target.value))
        event.target.title = 'Must contain at least one character';
    }
    if (event.target.name === 'streetNumber') {
      if (/^\d{1,5}[A-Za-z]?$/.test(event.target.value) === false)
        event.target.title =
          'Enter the house number (up to 5 digits and, if necessary, one letter and no special characters)';
    }
    if (event.target.name === 'postalCode') {
      if (!/\d{5}(-\d{4})?/.test(event.target.value))
        event.target.title =
          'Enter the zip code in the format XXXXX or XXXXX-XXXX';
    }
  }
}

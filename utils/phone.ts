import parsePhoneNumber, { isValidPhoneNumber } from 'libphonenumber-js'

export const formatPhone = (phone: string) => {
  return isValidPhoneNumber(phone)
    ? parsePhoneNumber(phone)?.formatInternational()
    : phone;
};

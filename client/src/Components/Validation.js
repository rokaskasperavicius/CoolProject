export const required = value => {
  if (!value) return 'This field is required';
  else return undefined
}

export const phone = phoneNumber => {
  if (phoneNumber && !/^(\+?\d{1}(|-)\d{1,3}(| |-))[0-9()+ -]{6,15}$/.test(phoneNumber)) return 'Invalid phone number';
  else return undefined;
};

export const email = value => {
  if (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) return 'Invalid email address';
  else return undefined;
};

export const maxValue = value => {
  if (value && value.length > 20) return 'User name must be 20 or less characters long';
  else return undefined;
};

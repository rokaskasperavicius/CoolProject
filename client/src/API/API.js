import { timeout } from '../Constants/Constants';
import { NotificationManager } from 'react-notifications';

export const login = values => {
  return fetch('/api/login', {
    method: 'POST',
    body: JSON.stringify(values),
    headers: {"Content-Type": "application/json"}})
       .then(res => res.json())
       .then(properties => {
         return properties;
    })
    .catch(() => {
       NotificationManager.error('Something went wrong! Please try again later', '', timeout);
    });
};

export const dataPOST = values => {
  return fetch('/api/data', {
     method: 'POST',
     body: JSON.stringify(values),
     headers: {"Content-Type": "application/json"}})
      .then(res => res.json())
      .then(properties => {
        return properties;
    })
    .catch(() => {
      NotificationManager.error('Something went wrong! Please try again later', '', timeout);
    });
};

export const userPOST = values => {
  return fetch('/api/userAdd', {
     method: 'POST',
     body: JSON.stringify(values),
     headers: {"Content-Type": "application/json"}})
      .then(res => res.json())
      .then(properties => {
        return properties;
    })
    .catch(() => {
      NotificationManager.error('Something went wrong! Please try again later', '', timeout);
    });
};

export const userUPDATE = values => {
  return fetch('/api/userUpdate', {
     method: 'POST',
     body: JSON.stringify(values),
     headers: {"Content-Type": "application/json"}})
      .then(res => res.json())
      .then(properties => {
        return properties;
    })
    .catch(() => {
      NotificationManager.error('Something went wrong! Please try again later', '', timeout);
    });
};

export const data = () => {
  return fetch('/api/data')
    .then(res => res.json())
    .then(data => {
      return data;
    })
    .catch(() => {
      NotificationManager.error('Something went wrong! Please try again later', '', timeout);
    })
}
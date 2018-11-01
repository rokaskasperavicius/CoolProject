export const login = values => {
   return fetch('/login', {
      method: 'POST',
      body: JSON.stringify(values),
      headers: {"Content-Type": "application/json"}})
       .then(res => res.json())
       .then(properties => {
         return properties;
     })
     .catch(() => {
      console.log('Something went wrong! Please try again later');
     });
};
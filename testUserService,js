const axios = require('axios');

// Test GET /users
axios.get('http://localhost:3001/users')
  .then(response => {
    console.log('GET /users response:', response.data);
  })
  .catch(error => {
    console.error('Error fetching users:', error);
  });

// Test POST /users
axios.post('http://localhost:3001/users', {
  name: 'Jane Doe',
  role: 'Librarian',
  password: 'securepassword'
})
  .then(response => {
    console.log('POST /users response:', response.data);
  })
  .catch(error => {
    console.error('Error creating user:', error);
  });

// Test POST /login
axios.post('http://localhost:3001/login', {
  name: 'Jane Doe',
  password: 'securepassword'
})
  .then(response => {
    console.log('POST /login response:', response.data);
  })
  .catch(error => {
    console.error('Error logging in:', error);
  });

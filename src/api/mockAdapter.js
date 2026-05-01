import MockAdapter from 'axios-mock-adapter';
import api from './api';

const mock = new MockAdapter(api, { delayResponse: 800 });

// Mock Login
mock.onPost('/api/auth/login').reply((config) => {
  const { email, password } = JSON.parse(config.data);
  if (password.length >= 6) {
    return [200, {
      token: 'mock-jwt-token-12345',
      user: { id: 1, name: 'Mock User', email, role: 0 }
    }];
  }
  return [401, { message: 'Invalid credentials' }];
});

// Mock Register
mock.onPost('/api/auth/register').reply((config) => {
  const data = JSON.parse(config.data);
  return [200, {
    token: 'mock-jwt-token-67890',
    user: { id: 2, name: data.name, email: data.email, role: data.role }
  }];
});

export default mock;

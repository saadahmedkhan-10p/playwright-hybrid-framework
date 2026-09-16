import { test, expect } from '../fixtures';
import { generateUser } from '../../utils/api/ApiUserData';

test.describe('Reqres API Tests', () => {
  test('GET list of users', async ({ apiClient }) => {
    const response = await apiClient.get('/api/users?page=2');
    expect(response.status()).toBe(200);

    const data = await response.json();
    expect(data.data.length).toBeGreaterThan(0);
  });

  test('POST create a new user', async ({ apiClient }) => {
    
    const userData = generateUser();
    
    const response = await apiClient.post('/api/users', userData);
    expect(response.status()).toBe(201);

    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('id');
    expect(responseBody).toHaveProperty('createdAt');
    expect(responseBody.name).toBe(userData.name);
    expect(responseBody.job).toBe(userData.job);
  });

  test('Create a user and then update it', async ({ apiClient }) => {
    const newUser = generateUser();
    const createResponse = await apiClient.post('/api/users', newUser);
    expect(createResponse.status()).toBe(201);

    const createdUser = await createResponse.json();
    expect(createdUser).toHaveProperty('id');

    const updatedUser = generateUser();
    const updateResponse = await apiClient.put(`/api/users/${createdUser.id}`, updatedUser);
    expect(updateResponse.status()).toBe(200);

    const updatedBody = await updateResponse.json();
    expect(updatedBody.name).toBe(updatedUser.name);
    expect(updatedBody.job).toBe(updatedUser.job);
    expect(updatedBody).toHaveProperty('updatedAt');
  });
});

import { test, expect } from '@playwright/test';
import { APIUtils } from '../../../utils/web/api/APIUtils';
import { generateUser } from '../../../utils/web/api/ApiUserData';

test.describe('Reqres API Tests', () => {
  let api: APIUtils;

  test.beforeAll(async () => {
    api = new APIUtils();
    await api.init(process.env.API_URL!, process.env.X_API_KEY);
  });

  test.afterAll(async () => {
    await api.dispose();
  });

  test('GET list of users', async () => {
    const response = await api.get('/api/users?page=2');
    expect(response.status()).toBe(200);

    const data = await response.json();
    expect(data.data.length).toBeGreaterThan(0);
  });

  test('POST create a new user', async () => {
    
    const userData = generateUser();
    
    const response = await api.post('/api/users', userData);
    expect(response.status()).toBe(201);

    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('id');
    expect(responseBody).toHaveProperty('createdAt');
    expect(responseBody.name).toBe(userData.name);
    expect(responseBody.job).toBe(userData.job);
  });

  test('Create a user and then update it', async () => {
    // Step 1: Create a new user
    const newUser = generateUser();
    const createResponse = await api.post('/api/users', newUser);
    expect(createResponse.status()).toBe(201);

    const createdUser = await createResponse.json();
    expect(createdUser).toHaveProperty('id');
    console.log('Created user ID:', createdUser.id);

    // Step 2: Update the same user
    const updatedUser = generateUser(); // new fake data
    const updateResponse = await api.put(`/api/users/${createdUser.id}`, updatedUser);
    expect(updateResponse.status()).toBe(200);

    const updatedBody = await updateResponse.json();
    expect(updatedBody.name).toBe(updatedUser.name);
    expect(updatedBody.job).toBe(updatedUser.job);
    expect(updatedBody).toHaveProperty('updatedAt');
  });
});

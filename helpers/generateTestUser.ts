export function generateTestUser() {
  const timestamp = Date.now();
  const firstName = `John${timestamp}`;
  const lastName = `Doe${timestamp}`;
  const postalCode = `${Math.floor(10000 + Math.random() * 90000)}`;
  return { firstName, lastName, postalCode };
}
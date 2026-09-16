import { faker } from '@faker-js/faker';

export function generateUser() {
  return {
    name: faker.person.firstName(),
    job: faker.person.jobTitle(),
  };
}
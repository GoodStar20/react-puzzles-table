import faker from "faker";

const generateFakeUsers = (length) => {
  let fakeUsers = [];
  for (let i = 0; i < length; i++) {
    fakeUsers.push({
      id: faker.datatype.number(),
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
      email: faker.internet.email(),
      city: faker.address.city(),
      registered_at: faker.date.past(),
    });
  }
  return fakeUsers;
};

export default generateFakeUsers;

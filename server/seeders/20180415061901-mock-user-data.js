
module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Users', [{
    username: 'Jane Doe',
    password: 'janedoe',
    email: 'janedoe@wemail.com',
    createdAt: '2017-10-01 11:01:29.994+00',
    updatedAt: '2017-10-01 11:01:29.994+00',
  },
  {
    username: 'Jackie Chan',
    password: 'jackiechan',
    email: 'jackie@wemail.com',
    createdAt: '2017-10-01 11:01:29.994+00',
    updatedAt: '2017-10-01 11:01:29.994+00',
  },
  ]),
  /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */

  down: queryInterface => queryInterface.bulkDelete('Users', null, {}),
  // Example:
  // return queryInterface.bulkDelete('Person', null, {});

};


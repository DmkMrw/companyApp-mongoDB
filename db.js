let db = {
  employees: [
    {
      firstName: 'John',
      lastName: 'Doe',
      department: 'IT'
    },
    {
      firstName: 'Amanda',
      lastName: 'Doe',
      department: 'Marketing'
    },
    {
      firstName: 'Johnatan',
      lastName: 'Wilson',
      department: 'IT'
    },
    {
      firstName: 'Thomas',
      lastName: 'Jefferson',
      department: 'Testing'
    },
    {
      firstName: 'Emma',
      lastName: 'Cowell',
      department: 'Testing'
    }
  ],
  departments: [
    { name: 'IT' },
    { name: 'Marketing' },
    { name: 'Testing' }
  ],
  products: [
    {
      name: 'New Wave Festival',
      client: 'MyMusicWave corp.'
    },
    {
      name: 'ImRich Banking official website',
      client: 'ImRich LTD.'
    }
  ]
};

module.exports = db;

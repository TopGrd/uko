let data = {
  fruit: {
    apple: 20,
    banana: 5,
  },
  book: 9,
  movie: [
    'aixi', 'modle', 'shark',
  ],
};

let userData = {
  users: [
    {
      name: 'xx',
      id: 2,
    }, {
      name: 'dd',
      id: 3,
    },
  ]
};

indexModel = new Model(data);
indexView = new View();
let IndexController = new Controller(indexModel, indexView);

userModel = new Model(userData);
userView = new View();
let UserController = new Controller(userModel, userView);

let router = [
  {
    url: 'index',
    view: 'food',
    controller: IndexController,
  }, {
    url: 'user',
    view: 'user',
    controller: UserController,
  }
];
uko.start({router: router});

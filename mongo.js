const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://javimacias:${password}@cluster0.5hs3tfb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const filmSchema = new mongoose.Schema({
    titulo: String,
    vista: Boolean,
    buena: Number,
    mala: Number,
    idExterna: String,
  })
  
  const Film = mongoose.model('Film', filmSchema)
  
  
      let films = [
          {
            idExterna: "635910",
            vista: false,
            titulo: "El ultimo viaje del Demeter",
            buena: 1,
            mala: 0
          },
          {
            vista: true,
            idExterna: "670292",
            titulo: "The Creator",
            buena: 0,
            mala: 1
          },
          {
            vista: false,
            idExterna: "597208",
            titulo: "El callejón de las almas perdidas",
            buena: 0,
            mala: 0
          },
          {
            vista: true,
            idExterna: "787699",
            titulo: "Wonka",
            buena: 1,
            mala: 0
          },
          {
            idExterna: "507089",
            vista: false,
            titulo: "Five Nights at Freddy's",
            buena: 0,
            mala: 0
          },
          {
            idExterna: "835504",
            vista: false,
            titulo: "Cinco Lobitos",
            buena: 1,
            mala: 0
          },
          {
            idExterna: "609681",
            vista: false,
            titulo: "The Marvels",
            buena: 0,
            mala: 0
          },
          {
            idExterna: "693134",
            vista: false,
            titulo: "Dune: Parte dos",
            buena: 0,
            mala: 0
          },
          {
            vista: true,
            idexterna: "615777",
            titulo: "Babylon",
            buena: 0,
            mala: 0
          },
          {
            idExterna: "823464",
            vista: true,
            titulo: "Godzilla y Kong: El nuevo imperio",
            buena: 0,
            mala: 1
          },
          {
            idExterna: "1001311",
            vista: false,
            titulo: "En las profundidades del Sena",
            buena: 0,
            mala: 0
          },
          {
            idExterna: "1189205",
            vista: false,
            titulo: "Blood and Snow",
            buena: 0,
            mala: 0
          }
    ]

const userSchema = new mongoose.Schema({
    name: String,
    username: String,
    password: String,
    online: Boolean,
    email: String,
    image: String
  })
  
  const User = mongoose.model('User', userSchema)

  let users = [
    {
      name: "Javier",
      username: "Javierito",
      password: "Javier",
      id: "2234",
      online: true,
      email: "javimacias@gmail.com",
      image: "../images/Hombre.jpg"
    },
    {
      name: "Miriam",
      username: "Mirita",
      password: "Miriam",
      id: "2235",
      online: false,
      email: "miriampilar999@gmail.com",
      image: "../images/Hombre.jpg"
    },
    {
      id: "89",
      name: "Andres",
      username: "Andresiño",
      password: "Andres",
      email: "andres@gmail.com",
      online: false
    },
    {
      id: "bda6",
      name: "Andrea",
      username: "Andreitacometeelpollo",
      password: "Andrea",
      email: "pollo@gmail.com",
      online: false
    },
    {
      id: "9143",
      name: "Ariel",
      username: "Arielito",
      password: "Ariel",
      email: "ariel@gmail.com",
      online: false
    }
]

const insertFilms = films.map(film => new Film(film).save());
const insertUsers = users.map(user => new User(user).save());

Promise.all([...insertFilms, ...insertUsers])
  .then(() => {
    console.log('Data inserted');
    return Promise.all([Film.find({}), User.find({})]);
  })
  .then(([filmsResult, usersResult]) => {
    filmsResult.forEach(film => {
      console.log(film);
    });
    usersResult.forEach(user => {
      console.log(user);
    });
    mongoose.connection.close();
  })
  .catch(err => {
    console.error(err);
    mongoose.connection.close();
  });
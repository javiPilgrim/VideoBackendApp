const mongoose = require('mongoose')
require('dotenv').config()
const password = process.argv[2]
const express = require('express')
const cors = require('cors')


const app = express()
const url = process.env.MONGODB_URI

mongoose.set('strictQuery',false)
mongoose.connect(url)


app.use(express.json());
app.use(cors());
app.use(express.static('dist'));

const filmSchema = new mongoose.Schema({
  titulo: String,
  vista: Boolean,
  buena: Number,
  mala: Number,
  idExterna: String,
});

const Film = mongoose.model('Film', filmSchema);

const userSchema = new mongoose.Schema({
  name: String,
  username: String,
  password: String,
  online: Boolean,
  email: String,
  image: String,
});

const User = mongoose.model('User', userSchema);

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>');
});

app.get('/api/films', (request, response) => {
  Film.find({}).then(films => {
    response.json(films);
  });
});

app.get('/api/films/:id', (request, response) => {
  Film.findById(request.params.id).then(film => {
    if (film) {
      response.json(film);
    } else {
      response.status(404).end();
    }
  }).catch(error => {
    console.log(error);
    response.status(500).send({ error: 'malformatted id' });
  });
});

app.delete('/api/films/:id', (request, response) => {
  Film.findByIdAndDelete(request.params.id).then(() => {
    response.status(204).end();
  }).catch(error => {
    console.log(error);
    response.status(500).send({ error: 'malformatted id' });
  });
});

app.post('/api/films', (request, response) => {
  const body = request.body;

  if (!body.titulo) {
    return response.status(400).json({
      error: 'title missing'
    });
  }

  const film = new Film({
    idExterna: body.idExterna,
    vista: Boolean(body.vista) || false,
    titulo: body.titulo,
    buena: body.buena,
    mala: body.mala,
  });

  film.save().then(savedFilm => {
    response.json(savedFilm);
  });
});

app.put('/api/films/:id', (request, response) => {
  const body = request.body;

  const film = {
    titulo: body.titulo,
    vista: body.vista,
    buena: body.buena,
    mala: body.mala,
  };

  Film.findByIdAndUpdate(request.params.id, film, { new: true }).then(updatedFilm => {
    response.json(updatedFilm);
  }).catch(error => {
    console.log(error);
    response.status(500).send({ error: 'malformatted id' });
  });
});

app.get('/api/users', (request, response) => {
  User.find({}).then(users => {
    response.json(users);
  });
});

app.get('/api/users/:id', (request, response) => {
  User.findById(request.params.id).then(user => {
    if (user) {
      response.json(user);
    } else {
      response.status(404).end();
    }
  }).catch(error => {
    console.log(error);
    response.status(500).send({ error: 'malformatted id' });
  });
});

app.delete('/api/users/:id', (request, response) => {
  User.findByIdAndRemove(request.params.id).then(() => {
    response.status(204).end();
  }).catch(error => {
    console.log(error);
    response.status(500).send({ error: 'malformatted id' });
  });
});

app.post('/api/users', (request, response) => {
  const body = request.body;

  if (!body.name || !body.password) {
    return response.status(400).json({
      error: 'name or password missing'
    });
  }

  const user = new User({
    name: body.name,
    username: body.username,
    password: body.password,
    online: Boolean(body.online) || false,
    email: body.email,
    image: body.image,
  });

  user.save().then(savedUser => {
    response.json(savedUser);
  });
});

app.put('/api/users/:id', (request, response) => {
  const body = request.body;

  const user = {
    name: body.name,
    username: body.username,
    password: body.password,
    online: body.online,
    email: body.email,
    image: body.image,
  };

  User.findByIdAndUpdate(request.params.id, user, { new: true }).then(updatedUser => {
    response.json(updatedUser);
  }).catch(error => {
    console.log(error);
    response.status(500).send({ error: 'malformatted id' });
  });
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

app.use(unknownEndpoint);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
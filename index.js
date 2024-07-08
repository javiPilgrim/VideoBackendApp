const express = require('express')
const cors = require('cors')


const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static('dist'))


    let films = [
        {
          id: "635910",
          vista: false,
          titulo: "El ultimo viaje del Demeter",
          buena: 1,
          mala: 0
        },
        {
          vista: true,
          id: "670292",
          titulo: "The Creator",
          buena: 0,
          mala: 1
        },
        {
          vista: false,
          id: "597208",
          titulo: "El callejón de las almas perdidas",
          buena: 0,
          mala: 0
        },
        {
          vista: true,
          id: "787699",
          titulo: "Wonka",
          buena: 1,
          mala: 0
        },
        {
          id: "507089",
          vista: false,
          titulo: "Five Nights at Freddy's",
          buena: 0,
          mala: 0
        },
        {
          id: "835504",
          vista: false,
          titulo: "Cinco Lobitos",
          buena: 1,
          mala: 0
        },
        {
          id: "609681",
          vista: false,
          titulo: "The Marvels",
          buena: 0,
          mala: 0
        },
        {
          id: "693134",
          vista: false,
          titulo: "Dune: Parte dos",
          buena: 0,
          mala: 0
        },
        {
          vista: true,
          id: "615777",
          titulo: "Babylon",
          buena: 0,
          mala: 0
        },
        {
          id: "823464",
          vista: true,
          titulo: "Godzilla y Kong: El nuevo imperio",
          buena: 0,
          mala: 1
        },
        {
          id: "1001311",
          vista: false,
          titulo: "En las profundidades del Sena",
          buena: 0,
          mala: 0
        },
        {
          id: "1189205",
          vista: false,
          titulo: "Blood and Snow",
          buena: 0,
          mala: 0
        }
  ]
  
    
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


  app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
  })
  
  app.get('/api/films', (request, response) => {
    response.json(films)
  })

  app.get('/api/films/:id', (request, response) => {
    const id = request.params.id
    const film = films.find(film => film.id === id)
    if (film) {
        response.json(film)
      } else {
        response.status(404).end()
      }
  })

  app.delete('/api/films/:id', (request, response) => {
    const id = request.params.id
    films = films.filter(film => film.id !== id)
    response.status(204).end()
  })

  app.post('/api/films', (request, response) => {
    const body = request.body
    if (!body.titulo) {
        return response.status(400).json({ 
          error: 'title missing' 
        })
      }
      const film = {
        id: body.id,
        vista: Boolean(body.vista) || false,
        titulo: body.titulo,
        buena: body.buena,
        mala: body.mala
      }
    films = films.concat(film)
    response.json(film)
  })

  app.put('/api/films/:id', (request, response) => {
    const id = request.params.id;
    const body = request.body;

    const filmIndex = films.findIndex(film => film.id === id);
    if (filmIndex === -1) {
        return response.status(404).json({
            error: 'film not found'
        });
    }

    const updatedFilm = {
        ...films[filmIndex],
        ...body
    };

    films[filmIndex] = updatedFilm;
    response.json(updatedFilm);
});

  app.get('/api/users', (request, response) => {
    response.json(users)
  })

  app.get('/api/users/:id', (request, response) => {
    const id = request.params.id
    const user = users.find(user => user.id === id)
    if (user) {
        response.json(user)
      } else {
        response.status(404).end()
      }
  })

  app.delete('/api/users/:id', (request, response) => {
    const id = request.params.id
    users = users.filter(user => user.id !== id)
  
    response.status(204).end()
  })

  app.post('/api/users', (request, response) => {
    const body = request.body
    if (!body.name || !body.password) {
        return response.status(400).json({ 
          error: 'name or password missing' 
        })
      }
      const user = {
        id: body.id,
        online: Boolean(body.online) || false,
        name: body.name,
        username: body.username,
        password: body.password,
        email: body.email,
        image: body.image
      }
    users = users.concat(user)
    response.json(user)
  })

  app.put('/api/users/:id', (request, response) => {
    const id = request.params.id;
    const body = request.body;

    const userIndex = users.findIndex(user => user.id === id);
    if (userIndex === -1) {
        return response.status(404).json({
            error: 'user not found'
        });
    }

    const updatedUser = {
        ...users[userIndex],
        ...body
    };

    users[userIndex] = updatedUser;
    response.json(updatedUser);
});



  const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
  
  app.use(unknownEndpoint)
  


  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
  });
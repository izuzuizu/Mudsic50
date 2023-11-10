const express = require('express');
const mysql = require('mysql2');
const cors = require('cors')

const app = express();
const port = process.env.PORT || 3001;

//Middleware
app.use(cors());
app.use(express.json());

// Configura la conexión a la base de datos MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  port: 3306,
  database: 'mudsic2',
  connectTimeout: 30000 // Esto es 30 segundos
});

db.connect((err) => {
  console.log('conectando')
  if (err) {
    throw err;
  }
  console.log('Conexión a la base de datos MySQL establecida');
});

app.get('/api/usuarios', (req, res) => {
    try {
      const sql = 'SELECT * FROM usuarios';
      db.query(sql, (err, result) => {
        if (err) {
          throw err;
        }
        res.json(result);
      });
    } catch(error) {
      console.log(error)
    }
  });
  

  // Ruta para obtener un usuario por su ID
  app.get('/api/usuarios/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM usuarios WHERE ID_u = ?';
    db.query(sql, [id], (err, result) => {
      if (err) {
        throw err;
      }
      // console.log(res)
      res.json(result);
    });
  });// Ruta para obtener un artista por su nombre
  app.get('/api/artistas/:name', (req, res) => {
    const { name } = req.params;
    const sql = 'SELECT * FROM artistas WHERE nombre = ?';
    db.query(sql, [name], (err, result) => {
      if (err) {
        throw err;
      }
      // console.log(res)
      res.json(result);
    });
  });
  // Ruta para obtener un historial por el ID del usuario
  app.get('/api/historial/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM historial WHERE usuarioId = ?';
    db.query(sql, [id], (err, result) => {
      if (err) {
        throw err;
      }
      // console.log(result)
      res.json(result);
    });
  });
  // Ruta para obtener una cancion por el nombre
  app.get('/api/canciones/:name', (req, res) => {
    const { name } = req.params;
    const sql = 'SELECT * FROM canciones WHERE nombre = ?';
    db.query(sql, [name], (err, result) => {
      if (err) {
        throw err;
      }
      // console.log(result)
      res.json(result);
    });
  });
    
  // Ruta para obtener un album por el nombre
  app.get('/api/albumes/:name', (req, res) => {
    const { name } = req.params;
    const sql = 'SELECT * FROM albumes WHERE nombre = ?';
    db.query(sql, [name], (err, result) => {
      if (err) {
        throw err;
      }
      // console.log(result)
      res.json(result);
    });
  });
    
  // Ruta para agregar un nuevo usuario
  app.post('/api/usuarios', (req, res) => {
    const { nombre, correo, contrasenna } = req.body;
    const sql = 'INSERT INTO usuarios (Nbr_u, Email_u, Pass_u) VALUES (?, ?, ?)';
    db.query(sql, [nombre, correo, contrasenna], (err, result) => {
        if (err) {
            throw err;
        }
        
        res.json({
          message: 'Usuario agregado exitosamente',
          id: result.insertId
        });
    });
});

// app.post('/api/subirImagen', (req, res) => {
//   const { img } = req.body;
//   const sql = 'INSERT INTO usuarios (Img_u) VALUES (?)';
//   db.query(sql, [img], (err,result) => {
//     if(err) {
//       throw err;
//     }

//     res.json({
//       message: 'imagen subida',
//       img: result.imagenSubida
//     })
//   })
// })

  // Ruta para actualizar un usuario
  app.put('/api/usuarios/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, apellido, correo } = req.body;
    const sql = 'UPDATE usuarios SET nombre = ?, apellido = ?, correo = ? WHERE id = ?';
    db.query(sql, [nombre, apellido, correo, id], (err, result) => {
      if (err) {
        throw err;
      }
      res.json({ message: 'Usuario actualizado exitosamente', id });
    });
  });
  
  // Ruta para eliminar un usuario
  app.delete('/api/usuarios/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM usuarios WHERE id = ?';
    db.query(sql, [id], (err, result) => {
      if (err) {
        throw err;
      }
      res.json({ message: 'Usuario eliminado exitosamente', id });
    });
  });

  //Login
  app.post("/api/login", (req, res) => {
    const {nombre, correo, contrasenna } = req.body
    const sql = 'SELECT * FROM usuarios WHERE Nbr_u = ? AND Email_u = ? AND Pass_u= ?';
    db.query(sql, [nombre, correo, contrasenna], (err, result) => {
      if (err) {
        throw err;
      } else {
        if(result.length > 0) {
          res.status(200).send(result[0])
        }
        res.status(400).send("usuario no existe")
      }
    })
  })

  app.listen(port, () => {
    console.log(`Servidor Express en ejecución en el puerto ${port}`);
  });
const users = [
    {
        id: 1,
        firstname: "John",
        lastname: "Doe",
        email: "john.doe@example.com",
        city: "Paris",
        language: "English"
    },
    {
        id: 2,
        firstname: "Valeriy",
        lastname: "Appius",
        email: "valeriy.appius@example.com",
        city: "Moscow",
        language: "Russian"
    },
    {
        id: 3,
        firstname: "Ralf",
        lastname: "Geronimo",
        email: "ralf.geronimo@example.com",
        city: "New York",
        language: "Italian"
    },
    {
        id: 4,
        firstname: "Maria",
        lastname: "Iskandar",
        email: "maria.iskandar@example.com",
        city: "New York",
        language: "German"
    },
    {
        id: 5,
        firstname: "Jane",
        lastname: "Doe",
        email: "jane.doe@example.com",
        city: "London",
        language: "English"
    },
    {
        id: 6,
        firstname: "Johanna",
        lastname: "Martino",
        email: "johanna.martino@example.com",
        city: "Milan",
        language: "Spanish"
    }
]

const database = require("./database");

const getUsers = (req, res) => {
  res.status(200).json(users);
  };

const getUserById = (req, res) => {
  const id = parseInt(req.params.id);

  database
    .query("select * from users where id = ?", [id])
    .then(([users]) => {
      if (users[0] != null) {
        res.status(200).json(users[0]);
      } else {
        res.status(404).send("Not Found");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
  };

  const postUsers = (req, res) => {
    const { firstname, lastname, email, city, language } = req.body;
  
    database
    .query("INSERT INTO users(firstname, lastname, email, city, language) VALUE (?, ?, ?, ?, ?)",
    [firstname, lastname, email, city, language]
    )
    .then(([result]) => {
      res.location(`/api/users/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error to saving a user");
    });
  };


module.exports = {
    getUsers,
    getUserById,
    postUsers,
};
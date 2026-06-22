const express = require("express");
var bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
const port = 3010;

const generateRandomId = () => Math.floor(Math.random() * 1000);

const users = [
  {
    id: generateRandomId(),
    name: "Johannes Teig",
    createdAt: new Date(),
  },
];

app.get("/", (req, res) => {
  res.send("Hallo Welt!");
});

app.get("/users", (req, res) => {
  try {
    const { filter } = req.query;
    if (filter) {
      const filteredUsers = users.filter((user) =>
        user.name.toLowerCase().includes(filter.toLowerCase())
      );
      return res.json(filteredUsers);
    } else {
      res.json(users);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/users", (req, res) => {
  try {
    if (!req?.body?.name) {
      return res.status(400).json({ message: "Name ist verpflichtend" });
    }
    const { name } = req?.body;
    const newUser = {
      id: generateRandomId(),
      name,
      createdAt: new Date(),
    };
    users.push(newUser);
    res.json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put("/users/:id", (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const user = users.find((user) => user.id === Number(id));
    if (!user) {
      return res.status(404).json({ message: "User konnte nicht gefunden werden" });
    }
    user.name = name;
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete("/users/:id", (req, res) => {
  try {
    const { id } = req.params;
    const userIndex = users.findIndex((user) => user.id === Number(id));
    if (userIndex === -1) {
      return res.status(404).json({ message: "User konnte nicht gefunden werden" });
    }
    users.splice(userIndex, 1);
    res.json({ message: "User gelöscht" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(port, () => {
  console.log(`Beispiel App hört den Port zu ${port}`);
});

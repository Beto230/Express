const express = require('express');
const bodyParser = require('body-parser');
const items = require('./fakeDb'); 

const app = express();
app.use(bodyParser.json());

const itemsRouter = express.Router();


itemsRouter.get('/', (req, res) => {
  res.json(items);
});


itemsRouter.post('/', (req, res) => {
  const { name, price } = req.body;
  const newItem = { name, price };
  items.push(newItem);
  res.status(201).json({ added: newItem });
});


itemsRouter.get('/:name', (req, res) => {
  const name = req.params.name;
  const item = items.find((i) => i.name === name);

  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ error: 'Item not found' });
  }
});


itemsRouter.patch('/:name', (req, res) => {
  const name = req.params.name;
  const itemIndex = items.findIndex((i) => i.name === name);

  if (itemIndex === -1) {
    res.status(404).json({ error: 'Item not found' });
  } else {
    const { name: newName, price } = req.body;
    items[itemIndex] = { name: newName || name, price: price || items[itemIndex].price };
    res.json({ updated: items[itemIndex] });
  }
});


itemsRouter.delete('/:name', (req, res) => {
  const name = req.params.name;
  const itemIndex = items.findIndex((i) => i.name === name);

  if (itemIndex === -1) {
    res.status(404).json({ error: 'Item not found' });
  } else {
    items.splice(itemIndex, 1);
    res.json({ message: 'Deleted' });
  }
});

app.use('/items', itemsRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

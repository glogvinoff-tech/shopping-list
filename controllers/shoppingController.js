const shoppingItems = require('../data');

let nextId = 4;

const getItems = (req, res) => {
    const { purchased } = req.query;
    
    let filteredItems = [...shoppingItems];
    
    if (purchased !== undefined) {
        const isPurchased = purchased === 'true';
        filteredItems = shoppingItems.filter(item => item.purchased === isPurchased);
    }
    
    res.json(filteredItems);
};

const getItemById = (req, res) => {
    const id = parseInt(req.params.id);
    const item = shoppingItems.find(item => item.id === id);
    
    if (!item) {
        return res.status(404).json({ error: 'Товар не найден' });
    }
    
    res.json(item);
};

const addItem = (req, res) => {
    const { name, quantity } = req.body;
    
    if (!name || !quantity) {
        return res.status(400).json({ error: 'Название и количество обязательны' });
    }
    
    const newItem = {
        id: nextId++,
        name,
        quantity: parseInt(quantity),
        purchased: false
    };
    
    shoppingItems.push(newItem);
    res.status(201).json(newItem);
};

const updateItem = (req, res) => {
    const id = parseInt(req.params.id);
    const index = shoppingItems.findIndex(item => item.id === id);
    
    if (index === -1) {
        return res.status(404).json({ error: 'Товар не найден' });
    }
    
    const { name, quantity, purchased } = req.body;
    
    if (name !== undefined) shoppingItems[index].name = name;
    if (quantity !== undefined) shoppingItems[index].quantity = parseInt(quantity);
    if (purchased !== undefined) shoppingItems[index].purchased = purchased;
    
    res.json(shoppingItems[index]);
};

const deleteItem = (req, res) => {
    const id = parseInt(req.params.id);
    const index = shoppingItems.findIndex(item => item.id === id);
    
    if (index === -1) {
        return res.status(404).json({ error: 'Товар не найден' });
    }
    
    const deletedItem = shoppingItems.splice(index, 1)[0];
    res.json({ message: 'Товар удален', item: deletedItem });
};

module.exports = {
    getItems,
    getItemById,
    addItem,
    updateItem,
    deleteItem
};
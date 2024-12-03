// app.js
const express = require('express');
const bodyParser = require('body-parser');
const { addArticle, searchArticles, getArticleById } = require('./articles');

const app = express();
const port = 3000;

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Route to add an article
app.post('/articles', (req, res) => {
    const article = req.body;
    const addedArticle = addArticle(article);
    res.status(201).json(addedArticle);
});

// Route to search articles by keyword
app.get('/articles/search', (req, res) => {
    const { keyword } = req.query;
    const articles = searchArticles(keyword);
    res.status(200).json(articles);
});

// Route to get a single article by ID
app.get('/articles/:id', (req, res) => {
    const { id } = req.params;
    const article = getArticleById(id);
    if (!article) {
        res.status(404).send('Article not found');
    } else {
        res.status(200).json(article);
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

// articles.js
const _ = require('lodash');

// In-memory article storage
let articles = [];
let nextId = 1; // For assigning unique article IDs

// Add a new article
const addArticle = ({ title, content, tags }) => {
    const newArticle = {
        id: nextId++,
        title,
        content,
        tags
    };
    articles.push(newArticle);
    return newArticle;
};

// Search for articles by keyword
const searchArticles = (keyword) => {
    return articles.filter((article) => {
        return (
            article.title.includes(keyword) ||
            article.content.includes(keyword) ||
            article.tags.some(tag => tag.includes(keyword))
        );
    }).map((article) => {
        return {
            ...article,
            relevance: calculateRelevance(article, keyword) // Add relevance score
        };
    }).sort((a, b) => b.relevance - a.relevance); // Sort by relevance
};

// Calculate relevance score based on keyword frequency
const calculateRelevance = (article, keyword) => {
    const keywordFrequencyInTitle = (article.title.match(new RegExp(keyword, 'gi')) || []).length;
    const keywordFrequencyInContent = (article.content.match(new RegExp(keyword, 'gi')) || []).length;
    return keywordFrequencyInTitle + keywordFrequencyInContent;
};

// Get an article by its ID
const getArticleById = (id) => {
    return articles.find(article => article.id == id);
};

module.exports = { addArticle, searchArticles, getArticleById };

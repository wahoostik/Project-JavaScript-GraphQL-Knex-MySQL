const express = require('express');
require('dotenv').config();
const chalk = require('chalk');
const morgan = require('morgan');
const cors = require('cors');

const port = process.env.PORT || 4500;
const router = require('./router/router.js');

// Création du serveur
const server = express();

// Express parle en JSON
server.use(express.json());

// on rajoute la gestion des POST body
server.use(express.urlencoded({extended: true}));

server.use(morgan('tiny'));

server.use(router);

// CORS
server.use(cors({
    origin: '*',
    credentials: true,
}));

// GraphQL
const { graphqlHTTP } = require('express-graphql'); // Serveur GraphQL
const schema = require('./GraphQL/schemas');
// const rootResolver = require('./GraphQL/resolver');

server.use('/graphql', graphqlHTTP({
    schema,
    // rootValue: rootResolver,
    graphiql: true})); // permet d'utiliser GraphiQL sur le localhost

// Activation du serveur
server.listen(port, () => {
    console.log(chalk.blue(`Serveur Express-GraphQL en marche sur http://localhost:${port}`));
});
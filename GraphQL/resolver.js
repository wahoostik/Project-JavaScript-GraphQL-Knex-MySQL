const userQueries = require('./Queries/UserQueries');
const houseQueries = require('./Queries/HouseQueries');

const rootResolver = {
    ...userQueries,
    ...houseQueries
    // On ajoutera ici d'autres resolvers au besoin
};

module.exports = rootResolver;
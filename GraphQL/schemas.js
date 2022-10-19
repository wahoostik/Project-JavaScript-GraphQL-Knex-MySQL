const { GraphQLObjectType, GraphQLSchema } = require('graphql');
const { GET_ALL_HOUSES, GET_HOUSE_BY_ID } = require('./Queries/HouseQueries');
const { GET_ALL_USERS, GET_USER_BY_ID, GET_USER_BY_FILTER } = require('./Queries/UserQueries');
const { GET_ALL_CODE_HOUSES, GET_CODE_HOUSE_BY_ID } = require('./Queries/CodeHouseQueries');
const { CREATE_CODE_HOUSE, DELETE_CODE_HOUSE, UPDATE_CODE_HOUSE } = require('./Mutations/CodeHouseMutations');
const { CREATE_HOUSE, DELETE_HOUSE, UPDATE_HOUSE } = require('./Mutations/HouseMutations');
const { CREATE_USER, DELETE_USER, UPDATE_USER } = require('./Mutations/UserMutations');

const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        // User
        getAllUsers: GET_ALL_USERS,
        getUserByID: GET_USER_BY_ID,
        getUserByFilter: GET_USER_BY_FILTER,
        // House
        getAllHouses: GET_ALL_HOUSES,
        getHouseByID: GET_HOUSE_BY_ID,
        // Code House
        getAllCodeHouses: GET_ALL_CODE_HOUSES,
        getCodeHouseByID: GET_CODE_HOUSE_BY_ID
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        // User
        createUser: CREATE_USER,
        deleteUserByID: DELETE_USER,
        updateUserByID: UPDATE_USER,
        // House
        createHouse: CREATE_HOUSE,
        deleteHouseByID: DELETE_HOUSE,
        updateHouseByID: UPDATE_HOUSE,
        // Code House
        createCodeHouse: CREATE_CODE_HOUSE,
        deleteCodeHouseByID: DELETE_CODE_HOUSE,
        updateCodeHouseByID: UPDATE_CODE_HOUSE
        
    }
});

const schema = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});

module.exports = schema;
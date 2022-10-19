const graphql = require('graphql');
const { GraphQLString, GraphQLID } = graphql;

const UserType = require('../TypeDefinition/UserType');
const { db } = require('../../database.js');
const MessageType = require('../TypeDefinition/MessageType');

const CREATE_USER = {
    type: UserType,
    args: {
        firstname: { type: GraphQLString},
        lastname: { type: GraphQLString},
        code_client: { type: GraphQLString},
        email: { type: GraphQLString},
        password: { type: GraphQLString},
    },
    async resolve(parent, args) {
        try {
            const { firstname, lastname, code_client, email, password } = args;
            let response = await db('user').insert({firstname, lastname, code_client, email, password});
            console.log(response);
            return args;
        } catch (err) {
            throw new Error('Erreur lors de la création d\'un utilisateur');
        }
    }
};

const DELETE_USER = {
    type: MessageType,
    args: {
        id: { type: GraphQLID },
    },
    async resolve(parent, args) {
        try {
            const id = args.id;
            await db('user').where('id', id).del();
            return { successful: true, message: 'Utilisateur supprimé avec succès' };
        } catch (err) {
            throw new Error('Erreur lors de la suppression d\'un utilisateur');
        }
    },
};

const UPDATE_USER = {
    type: MessageType,
    args: {
        id: { type: GraphQLID },
        firstname: { type: GraphQLString},
        lastname: { type: GraphQLString},
        code_client: { type: GraphQLString},
        email: { type: GraphQLString},
        password: { type: GraphQLString}
    },
    async resolve(parent, args) {
        try {
            const { id, firstname, lastname, code_client, email, password } = args;
            await db('user').where('id', id).update({firstname, lastname, code_client, email, password});
            return { successful: true, message: 'Utilisateur modifié avec succès' };
        } catch (err) {
            throw new Error('Erreur lors de la modification d\'un utilisateur');
        }
    },
};

module.exports = { CREATE_USER, DELETE_USER, UPDATE_USER };
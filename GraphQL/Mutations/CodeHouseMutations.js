const graphql = require('graphql');
const { GraphQLString, GraphQLID } = graphql;

const { db } = require('../../database.js');
const CodeHouseType = require('../TypeDefinition/CodeHouseType');
const MessageType = require('../TypeDefinition/MessageType.js');

const CREATE_CODE_HOUSE = {
    type: CodeHouseType,
    args: {
        type: { type: GraphQLString},
    },
    async resolve(parent, args) {
        try {
            const { type } = args;
            let response = await db('code_house').insert({type});
            console.log(response);
            return args;
        } catch (err) {
            throw new Error('Erreur lors de la création d\'un type d\'habitation');
        }
    }
};

const DELETE_CODE_HOUSE = {
    type: MessageType,
    args: {
        id: { type: GraphQLID },
    },
    async resolve(parent, args) {
        try {
            const id = args.id;
            await db('code_house').where('id', id).del();
            return { successful: true, message: 'Type d\'habitation supprimé avec succès' };
        } catch (err) {
            throw new Error('Erreur lors de la suppression d\'un type d\'habitation');
        }
    },
};

const UPDATE_CODE_HOUSE = {
    type: MessageType,
    args: {
        id: { type: GraphQLID },
        type: { type: GraphQLString},
    },
    async resolve(parent, args) {
        try {
            const { id, type } = args;
            await db('code_house').where('id', id).update({type});
            return { successful: true, message: 'Type d\'habitation modifié avec succès' };
        } catch (err) {
            throw new Error('Erreur lors de la modification d\'un type d\'habitation');
        }
    },
};

module.exports = { CREATE_CODE_HOUSE, DELETE_CODE_HOUSE, UPDATE_CODE_HOUSE };
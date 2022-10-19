const graphql = require('graphql');
const { GraphQLString, GraphQLFloat, GraphQLID } = graphql;

const { db } = require('../../database.js');
const HouseType = require('../TypeDefinition/HouseType');
const MessageType = require('../TypeDefinition/MessageType.js');

const CREATE_HOUSE = {
    type: HouseType,
    args: {
        latitude: { type: GraphQLFloat},
        longitude: { type: GraphQLFloat},
        lot: { type: GraphQLString},
        address: { type: GraphQLString},
        city: { type: GraphQLString},
        country: { type: GraphQLString},
        user_id: { type: GraphQLID},
        code_house_id: { type: GraphQLID},
    },
    async resolve(parent, args) {
        try {
            const { latitude, longitude, lot, address, city, country, user_id, code_house_id } = args;
            let response = await db('house').insert({latitude, longitude, lot, address, city, country, user_id, code_house_id});
            console.log(response);
            return args;
        } catch (err) {
            throw new Error('Erreur lors de la création d\'une habitation');
        }
    }
};

const DELETE_HOUSE = {
    type: MessageType,
    args: {
        id: { type: GraphQLID },
    },
    async resolve(parent, args) {
        try {
            const id = args.id;
            await db('house').where('id', id).del();
            return { successful: true, message: 'Habitation supprimé avec succès' };
        } catch (err) {
            throw new Error('Erreur lors de la suppression d\'une habitation');
        }
    },
};

const UPDATE_HOUSE = {
    type: MessageType,
    args: {
        id: { type: GraphQLID },
        latitude: { type: GraphQLFloat},
        longitude: { type: GraphQLFloat},
        lot: { type: GraphQLString},
        address: { type: GraphQLString},
        city: { type: GraphQLString},
        country: { type: GraphQLString},
        user_id: { type: GraphQLID},
        code_house_id: { type: GraphQLID},
    },
    async resolve(parent, args) {
        try {
            const { id, latitude, longitude, lot, address, city, country, user_id, code_house_id } = args;
            await db('house').where('id', id).update({latitude, longitude, lot, address, city, country, user_id, code_house_id});
            return { successful: true, message: 'Habitation modifié avec succès' };
        } catch (err) {
            throw new Error('Erreur lors de la modification d\'une habitation');
        }
    },
};

module.exports = { CREATE_HOUSE, DELETE_HOUSE, UPDATE_HOUSE };
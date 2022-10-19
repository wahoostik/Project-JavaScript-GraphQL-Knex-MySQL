const graphql = require('graphql');
const { GraphQLList, GraphQLNonNull, GraphQLID} = graphql;

const HouseType = require('../TypeDefinition/HouseType');
const { db } = require('../../database.js');

const GET_ALL_HOUSES = {
    type: new GraphQLList(HouseType),
    async resolve ()  {
        return db('house')
            .select('*');
    }
};

const GET_HOUSE_BY_ID = {
    type: HouseType,
    args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
    },
    async resolve (parent, args)  {
        const id = args.id;
        return await db('house')
            .select('*')
            .where('id', id)
            .first();
    }
};

/*
function getHouses(filters) {
    return db('house')
        .select('*')
        .where(filters);
}
*/

module.exports = { GET_ALL_HOUSES, GET_HOUSE_BY_ID };
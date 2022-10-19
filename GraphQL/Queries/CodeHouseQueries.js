const graphql = require('graphql');
const { GraphQLList, GraphQLNonNull, GraphQLID} = graphql;

const CodeHouseType = require('../TypeDefinition/CodeHouseType');
const { db } = require('../../database.js');

const GET_ALL_CODE_HOUSES = {
    type: new GraphQLList(CodeHouseType),
    async resolve ()  {
        return db('code_house')
            .select('*');
    }
};

const GET_CODE_HOUSE_BY_ID = {
    type: CodeHouseType,
    args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
    },
    async resolve (parent, args)  {
        const id = args.id;
        return await db('code_house')
            .select('*')
            .where('id', id)
            .first();
    }
};

module.exports = { GET_ALL_CODE_HOUSES, GET_CODE_HOUSE_BY_ID };
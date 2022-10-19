const graphql = require('graphql');
const { GraphQLList, GraphQLNonNull, GraphQLID, GraphQLString } = graphql;

const UserType = require('../TypeDefinition/UserType');
const { db } = require('../../database.js');

const GET_ALL_USERS = {
    type: new GraphQLList(UserType),
    async resolve ()  {
        return await db('user')
            .select('*');
    }
};

const GET_USER_BY_ID = {
    type: UserType,
    args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
    },
    async resolve (parent, args)  {
        const id = args.id;
        return await db('user')
            .select('*')
            .where('id', id)
            .first();
    }
};

const GET_USER_BY_FILTER = {
    type: new GraphQLList(UserType),
    args: {
        firstname: { type: GraphQLString },
        lastname: { type: GraphQLString },
        code_client: { type: GraphQLString },
        email: { type: GraphQLString },
    },
    async resolve (parent, args)  {
        const {firstname, lastname, code_client, email} = args;
        return await db('user')
            .select('*')
            .whereILike('code_client', `%${code_client}%`)
            .orWhereILike('lastname', `%${lastname}%`)
            .orWhereILike('firstname', `%${firstname}%`)
            .orWhereILike('email', `%${email}%`);
    }
};

module.exports = { GET_ALL_USERS, GET_USER_BY_ID, GET_USER_BY_FILTER };
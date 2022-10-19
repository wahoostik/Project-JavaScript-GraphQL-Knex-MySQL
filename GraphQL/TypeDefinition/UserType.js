const graphql = require('graphql');
const HouseType = require('./HouseType');
const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLID } = graphql;
const { db } = require('../../database.js');

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLID },
        firstname: { type: GraphQLString },
        lastname: { type: GraphQLString },
        code_client: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        created_at: { type: GraphQLString },
        house: { type: new GraphQLList(HouseType),
            resolve(parent) {
                return db('house')
                    .select('*')
                    .where('user_id', parent.id);
            }
        }
    })
});

module.exports = UserType;
const graphql = require('graphql');
const CodeHouseType = require('./CodeHouseType');
const { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLFloat, GraphQLID } = graphql;
const { db } = require('../../database.js');

const HouseType = new GraphQLObjectType({
    name: 'House',
    fields: () => ({
        id: { type: GraphQLID },
        latitude: { type: GraphQLFloat },
        longitude: { type: GraphQLFloat },
        lot: { type: GraphQLString },
        address: { type: GraphQLString },
        city: { type: GraphQLString },
        country: { type: GraphQLString },
        user_id: { type: GraphQLInt },
        type: { type: CodeHouseType,
            resolve(parent) {
                return db('code_house')
                    .select('*')
                    .where('id', parent.code_house_id)
                    .first();
            }
        }
    })
});

module.exports = HouseType;
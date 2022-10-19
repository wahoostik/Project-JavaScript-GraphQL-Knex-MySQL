const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql;

const CodeHouseType = new GraphQLObjectType({
    name: 'CodeHouse',
    fields: () => ({
        id: { type: GraphQLID },
        type: { type: GraphQLString },
    })
});

module.exports = CodeHouseType;
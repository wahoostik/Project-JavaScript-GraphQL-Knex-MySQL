const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLBoolean } = graphql;

const MessageType = new GraphQLObjectType({
    name: 'Message',
    fields: () => ({
        successful: { type: GraphQLBoolean },
        message: { type: GraphQLString },
    }),
});

module.exports = MessageType;
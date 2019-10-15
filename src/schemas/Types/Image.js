import {
	GraphQLObjectType,
	GraphQLString,
} from 'graphql'

const ImageType = new GraphQLObjectType({
	name: 'Image',
	fields: () => ({
		imageSrc: { type: GraphQLString },
		preloadSrc: { type: GraphQLString }
	})
})

export default ImageType
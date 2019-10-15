import {
	GraphQLObjectType,
	GraphQLString,
} from 'graphql'

const ImageType = new GraphQLObjectType({
	name: 'Image',
	fields: () => ({
		imageSrc: { type: GraphQLString },
		preloadImageSrc: { type: GraphQLString }
	})
})

export default ImageType
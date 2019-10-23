import { graphql } from 'graphql'
import schema from '../../'
import BrandQueries from '../../Queries/Brand'

// beforeEach(async () => await setupTest());

// it('should not return null', async () => {
// 	const query = `
// 		query {
// 			brands {
// 				name
// 			}
// 		}
// 	`
// 	const rootValue = {}
// 	const result = await graphql(schema, query, rootValue)
// 	console.log(result)
// 	const { data } = result
// 	console.log(data)
// 	expect(data).not.toBe(null)
// })
// 
describe('Brand Queries', () => {
	let test
	beforeEach(async () => {
		test = 1
	})
	it('should be able to query brands', async () => {
		console.log(test)
		expect(test).toBe(1)
	})
})
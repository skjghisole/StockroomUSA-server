import { graphql } from 'graphql'
import schema from '../../'
import BrandQueries from '../../Queries/Brand'


it('should not return null', async () => {
	const query = `
		query {
			brands {
				name
			}
		}
	`

	const result = await graphql(schema, query, {})
	console.log(result)
	const { data } = result
	console.log(data)
	expect(data).not.toBe(null)
})
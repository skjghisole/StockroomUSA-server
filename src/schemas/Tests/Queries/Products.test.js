import { graphql } from 'graphql'
import schema from '../../'

// describe('Products Query', () => {
it('It should not be null', async () => {
	const query = `
		query {
			products {
				name
			}
		}
	`

	const result = await graphql(schema, query, {})
	const { data } = result
	expect(data).not.toBe(null)
})
// })
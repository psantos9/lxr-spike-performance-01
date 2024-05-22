import gql from 'graphql-tag'
import schema from 'data/schema.json'

const query = `
query MyQuery {
    allFactSheets {
        edges {
            node {
                id
            }
        }
    }
}

query MyOtherQuery {
  allFactSheets {
    edges {
      node {
        id
      }
    }
  }
}
`

test('adds 1 + 2 to equal 3', () => {
  const obj = gql(query)
  console.log('OK')
})

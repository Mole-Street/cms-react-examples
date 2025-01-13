export const query = `
query getResourceCenterCollection {
  HUBDB {
    react_resource_center_collection {
      items {
        date
        name
        image
        topic
        url
        description
        featured
      }
    }
  }
}
`


import gql from 'graphql-tag'
import MEMBERS_FIELDS from '../fields/member'

export const ME = gql`
  query Me {
    me {
      ${MEMBERS_FIELDS}
    }
  }
`

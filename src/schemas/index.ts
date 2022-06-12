import { gql } from "apollo-server";

export default gql`
  type User {
    id: Int
    name: String
    email: String
  }

  type Query {
    users: [User]
  }

  input UserInput {
    name: String!
    email: String!
  }

  type Mutation {
    createUser(data: UserInput!): User
  }

  type Subscription {
    userAdded: UserSubscriptionPayload!
    usersSearched: UsersSubscriptionPayload!
  }

  type UserSubscriptionPayload {
    data: User!
    action: String!
  }

  type UsersSubscriptionPayload {
    data: [User!]!
    action: String!
  }
`;

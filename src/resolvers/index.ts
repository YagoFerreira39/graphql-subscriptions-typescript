interface User {
  id: number;
  name: string;
  email: string;
}

let dataUsers: User[] = [];
const USER_ADDED = "USER_ADDED";
const USERS_SEARCHED = "USERS_SEARCHED"

export default {
  Query: {
    users: (_, args, { pub }) => {
      pub.publish(USERS_SEARCHED, {
        usersSearched: { data: dataUsers, action: 'QUERY' }
      })
      return dataUsers
    },
  },
  Mutation: {
    createUser: (_, { data }, { pub }) => {
      const newUser = { ...data, id: dataUsers.length + 1 };
      dataUsers.push(newUser);
      pub.publish(USER_ADDED, {
        userAdded: { data: newUser, action: 'CREATED' },
      });
      return newUser;
    },
  },
  Subscription: {
    userAdded: {
      subscribe: (obj, args, context) => {
        return context.pub.asyncIterator([USER_ADDED]);
      },
    },
    usersSearched: {
      subscribe: (obj, args, context) => {
        return context.pub.asyncIterator([USERS_SEARCHED]);
      },
    },
  },
};

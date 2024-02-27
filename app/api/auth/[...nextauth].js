import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

const options = {
  providers: [
    Credentials({
      credentials: {
        // Customize your credentials options if needed
      },
      authorize: async (credentials, req) => {
        const { email, password } = credentials;
        if (email !== '123@gmail.com' && password !== '123') {
          return null;
        }
        return { id: '1', name: '123', email: '123@gmail.com' };
      },
    }),
  ],
};

export default (req, res) => NextAuth(req, res, options);
import { dbConfig } from "@/app/utils/dbConfig";
import CredentialsProvider from "next-auth/providers/credentials";
export const options = {
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: { label: "email", type: "email", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        await dbConfig();

        const res = await fetch("http://localhost:3000/api/agent/signin", {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" },
        });
        const user = await res.json();

        console.log(user);

        if (res.ok && user) {
          return user;
        }
        return null;
      },
    }),
  ],
  secret: "jjkjuiughbjkl;kjkghfdrtyfhv ",

  callbacks: {
    async() {
      return "/";
    },
  },

  pages: {
    signIn: "/auth/register/agent/signin",
  },
};

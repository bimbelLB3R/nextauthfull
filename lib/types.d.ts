import { User } from '@prisma/client';

// file ini dibuat agar bisa mengambil firstName dan lastName
declare module 'next-auth' {
  interface Session {
    user: User;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    user: User;
  }
}

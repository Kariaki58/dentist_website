import { NextAuthOptions, User as NextAuthUser } from "next-auth";
import GoogleProvider, { GoogleProfile } from "next-auth/providers/google";
import User from "@/models/user";
import connectToDatabase from "@/lib/mongoose";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            role: string;
            name: string;
            email: string;
        };
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: string;
        role: string;
    }
}

export const options: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.AUTH_GOOGLE_ID as string,
            clientSecret: process.env.AUTH_GOOGLE_SECRET as string,
            profile: async (profile: GoogleProfile): Promise<NextAuthUser | null> => {
                try {
                    await connectToDatabase();
                    let user = await User.findOne({ email: profile.email }).exec();
                    
                    if (!user) {
                        user = await User.create({
                            name: profile.name,
                            email: profile.email,
                            googleId: profile.sub,
                            avatar: profile.picture,
                            role: "admin",
                        });
                    }
                    
                    return {
                        ...profile,
                        id: user._id.toString(),
                        role: user.role,
                    } as NextAuthUser;
                } catch (error: any) {
                    console.error(error);
                    return null;
                }
            },
        }),
    ],
    // pages: {
    //     signIn: "/auth/signin",
    // },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                const customUser = user as { id: string; role: string };
                token.role = customUser.role;
                token.id = customUser.id;
            }
            return token;
        },
        async session({ session, token }) {
            if (session?.user) {
                session.user.role = token.role;
                session.user.id = token.id;
            }
            return session;
        },
    },
    session: {
        strategy: "jwt",
    },
    jwt: {
        secret: process.env.NEXTAUTH_SECRET,
    },
    secret: process.env.NEXTAUTH_SECRET,
};
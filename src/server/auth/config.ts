import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { type DefaultSession, type NextAuthConfig } from "next-auth";
// import Apple from "next-auth/providers/apple";
// import Auth0 from "next-auth/providers/auth0";
// import AzureB2C from "next-auth/providers/azure-ad-b2c";
// import BankIDNorway from "next-auth/providers/bankid-no";
// import BoxyHQSAML from "next-auth/providers/boxyhq-saml";
// import Cognito from "next-auth/providers/cognito";
// import Coinbase from "next-auth/providers/coinbase";
import Discord from "next-auth/providers/discord";
// import Dropbox from "next-auth/providers/dropbox";
// import Facebook from "next-auth/providers/facebook";
import GitHub from "next-auth/providers/github";
// import GitLab from "next-auth/providers/gitlab";
// import Google from "next-auth/providers/google";
// import Hubspot from "next-auth/providers/hubspot";
// import Keycloak from "next-auth/providers/keycloak";
// import LinkedIn from "next-auth/providers/linkedin";
// import MicrosoftEntraId from "next-auth/providers/microsoft-entra-id";
// import Netlify from "next-auth/providers/netlify";
// import Okta from "next-auth/providers/okta";
// import Passage from "next-auth/providers/passage";
// import Passkey from "next-auth/providers/passkey";
// import Pinterest from "next-auth/providers/pinterest";
// import Reddit from "next-auth/providers/reddit";
// import Slack from "next-auth/providers/slack";
// import Salesforce from "next-auth/providers/salesforce";
// import Spotify from "next-auth/providers/spotify";
// import Twitch from "next-auth/providers/twitch";
// import Twitter from "next-auth/providers/twitter";
// import Vipps from "next-auth/providers/vipps";
// import WorkOS from "next-auth/providers/workos";
// import Zoom from "next-auth/providers/zoom";

import { db } from "@/server/db";
import {
  accounts,
  sessions,
  users,
  verificationTokens,
  analytics,
  orders,
  profiles,
  qrcodes,
} from "@/server/db/schema/index";

export type UserRole = "admin" | "user";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      role?: UserRole;
      // ...other properties
    } & DefaultSession["user"];
  }

  interface User {
    // ...other properties
    role: UserRole;
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authConfig = {
  providers: [
    // Apple,
    // Auth0,
    // AzureB2C,
    // BankIDNorway,
    // BoxyHQSAML({
    //   clientId: "dummy",
    //   clientSecret: "dummy",
    //   issuer: process.env.AUTH_BOXYHQ_SAML_ISSUER,
    // }),
    // Cognito,
    // Coinbase,
    Discord,
    // Dropbox,
    // Facebook,
    GitHub,
    // GitLab,
    // Google,
    // Hubspot,
    // Keycloak({ name: "Keycloak (bob/bob)" }),
    // LinkedIn,
    // MicrosoftEntraId,
    // Netlify,
    // Okta,
    // Passkey({
    //   formFields: {
    //     email: {
    //       label: "Username",
    //       required: true,
    //       autocomplete: "username webauthn",
    //     },
    //   },
    // }),
    // Passage,
    // Pinterest,
    // Reddit,
    // Salesforce,
    // Slack,
    // Spotify,
    // Twitch,
    // Twitter,
    // Vipps({
    //   issuer: "https://apitest.vipps.no/access-management-1.0/access/",
    // }),
    // WorkOS({ connection: process.env.AUTH_WORKOS_CONNECTION! }),
    // Zoom,
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
  adapter: DrizzleAdapter(db, {
    analyticsTable: analytics,
    accountsTable: accounts,
    ordersTable: orders,
    profilesTable: profiles,
    qrcodesTable: qrcodes,
    sessionsTable: sessions,
    usersTable: users,
    verificationTokensTable: verificationTokens,
  }),
  callbacks: {
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
        role: user.role,
      },
    }),
  },
  theme: {
    colorScheme: "auto",
    brandColor: "",
    logo: "",
    buttonText: "",
  },
} satisfies NextAuthConfig;

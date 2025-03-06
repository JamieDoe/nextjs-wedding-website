import { Client, Account, Databases } from 'node-appwrite'

const APPWRITE_ENDPOINT = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!
const APPWRITE_PROJECT_ID = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!
const APPWRITE_API_KEY = process.env.NEXT_APPWRITE_API_KEY!

const client = new Client()

export default async function createAdminClient() {
  client.setEndpoint(APPWRITE_ENDPOINT).setProject(APPWRITE_PROJECT_ID).setKey(APPWRITE_API_KEY)
  return {
    get account() {
      return new Account(client)
    },
    get database() {
      return new Databases(client)
    }
  }
}

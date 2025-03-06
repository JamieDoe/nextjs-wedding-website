'use server'

import createAdminClient from '@/lib/appwrite'

const APPWRITE_DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!
const APPWRITE_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_GUEST_COLLECTION_ID!

console.log(APPWRITE_DATABASE_ID)
console.log(APPWRITE_COLLECTION_ID)

export default async function getGuests() {
  const { account, database } = await createAdminClient()

  const session = await account.createAnonymousSession()

  if (!session) {
    return
  }

  console.log('Session', session)

  try {
    const response = await database.listDocuments(APPWRITE_DATABASE_ID, APPWRITE_COLLECTION_ID)

    console.log('Response', response)
    return response.documents
  } catch (error) {
    console.error(error)
    return error
  }
}

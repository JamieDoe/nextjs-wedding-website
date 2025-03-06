// new file
export interface Guest {
  first_name: string
  last_name: string
  is_attending_ceremony: boolean
  is_attending_reception: boolean
  meal_selection: string
  dietary_requirements: string | null
  special_notes: string | null
  spotify_track_id: string | null
  related_guest_ids: string[]
  $id: string
  $createdAt: string
  $updatedAt: string
  $permissions: string[]
  $databaseId: string
  $collectionId: string
}

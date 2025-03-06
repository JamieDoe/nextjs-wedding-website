import z from 'zod'

const rsvpSchema = z.object({
  first_name: z
    .string()
    .nonempty({ message: 'First name is required' })
    .min(2, { message: 'First name must be at least 2 characters' }),
  last_name: z
    .string()
    .nonempty({ message: 'Last name is required' })
    .min(2, { message: 'Last name must be at least 2 characters' })
})

const rsvpSubmissionSchema = z.object({
  is_attending_ceremony: z.boolean(),
  is_attending_reception: z.boolean(),
  meal_selection: z.string().optional(),
  dietary_requirements: z.string().optional(),
  song_request: z.string().optional(),
  special_notes: z.string().optional()
})

export { rsvpSchema, rsvpSubmissionSchema }

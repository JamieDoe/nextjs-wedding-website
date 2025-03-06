'use server'

import { headers } from 'next/headers'
import Link from 'next/link'

import { buttonVariants } from '@/components'

import { ChevronLeft } from 'lucide-react'
import RsvpContainer from '@/components/custom/RsvpContainer'

export default async function RSVPPage() {
  const headerList = await headers()
  const referer = headerList.get('referer')

  const redirectLink = referer?.includes('/rsvp')
    ? {
        href: '/',
        label: 'Go Home'
      }
    : {
        href: referer,
        label: 'Go Back'
      }

  return (
    <div className='min-h-dvh flex flex-col items-center gap-2 pt-40 px-4 lg:px-8'>
      <div className='container relative flex flex-col items-center justify-center gap-8 text-center z-20 font-lovelace text-foreground'>
        <Link
          href={redirectLink.href!}
          className={buttonVariants({
            variant: 'default',
            size: 'sm',
            className: 'px-8 group'
          })}
        >
          <ChevronLeft className='group-hover:-translate-x-1 duration-200' />
          <span className='pt-1'>{redirectLink.label}</span>
        </Link>
      </div>
      <RsvpContainer />
    </div>
  )
}

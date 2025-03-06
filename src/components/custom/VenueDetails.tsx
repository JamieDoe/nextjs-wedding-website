import { Clock2, MapPinned } from 'lucide-react'
import Link from 'next/link'

import { Separator, buttonVariants } from '@/components'

import ImageCarousel from './ImageCarousel'

interface VenueDetailsProps {
  images: {
    src: string
    alt: string
    width: number
    height: number
  }[]
  name: string
  description: string
  time: string
  location: string
  mapLink: string
  isReception?: boolean
  variant?: 'img-right' | 'img-left'
}

export default function VenueDetails({
  images,
  name,
  description,
  time,
  location,
  mapLink,
  isReception,
  variant
}: VenueDetailsProps) {
  return (
    <section className='flex flex-col items-center justify-center gap-8'>
      <div className='max-w-screen-2xl w-full flex flex-col gap-14'>
        <div
          className={`flex flex-col gap-18 ${variant === 'img-right' ? 'lg:flex-row-reverse' : 'lg:flex-row'} lg:gap-24`}
        >
          <ImageCarousel images={images} />
          <div className='flex flex-col gap-12 max-w-screen-md w-full'>
            <div className='flex flex-col gap-2 w-fit'>
              <h3 className='text-4xl font-lovelace'>{name}</h3>
              <Separator className='fill-primary' />
            </div>

            <p className='text-[18px] font-lovelace leading-relaxed'>{description}</p>
            <div className='flex flex-col lg:flex-row gap-8'>
              <div className='flex flex-col gap-5 font-lovelace w-fit'>
                <div className='flex flex-col w-fit'>
                  <h4 className='text-lg text-nowrap'>Time of Arrival</h4>
                  <Separator />
                </div>
                <div className='flex items-center gap-2'>
                  <Clock2 size={24} className='opacity-70' />
                  <p className='pt-1'>{time}</p>
                </div>
              </div>
              <div className='flex flex-col gap-5 font-lovelace'>
                <div className='flex flex-col w-fit'>
                  <h4 className='text-lg'>Location</h4>
                  <Separator />
                </div>

                <div className='flex items-center gap-2'>
                  <MapPinned size={24} className='opacity-70' />
                  <Link href={mapLink} className='pt-1 underline' target='_blank'>
                    {location}
                  </Link>
                </div>
              </div>
            </div>
            {isReception && (
              <Link
                href='/rsvp'
                className={buttonVariants({
                  variant: 'default',
                  size: 'lg',
                  className: 'w-full lg:w-fit font-lovelace h-fit'
                })}
              >
                <span className='text-lg pb-4 pt-5 lg:pb-2 lg:pt-3'>Reserve a Room</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

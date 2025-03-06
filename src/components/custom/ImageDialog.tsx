import Image from 'next/image'

import { X } from 'lucide-react'

import { Dialog, DialogContent, DialogTrigger, DialogTitle } from '@/components'
import { DialogClose } from '@radix-ui/react-dialog'

export default function ImageDialog({
  src,
  alt,
  width,
  height
}: {
  src: string
  alt: string
  width: number
  height: number
}) {
  if (!src) return null
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className='cursor-pointer object-cover rounded-xl min-h-[550px] h-full w-full'
        />
      </DialogTrigger>
      <DialogContent className='flex items-center justify-center bg-transparent border-none p-0' hideClose>
        <DialogTitle className='sr-only'>{alt}</DialogTitle>
        <DialogClose className='absolute top-0 right-0 text-foreground/75 shadow-md p-2 hover:cursor-pointer'>
          <X />
        </DialogClose>
        <Image src={src} alt={alt} width={width} height={height} className='rounded-xl object-cover' />
      </DialogContent>
    </Dialog>
  )
}

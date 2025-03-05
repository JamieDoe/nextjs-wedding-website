import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  ImageDialog,
} from "@/components";

export default function ImageCarousel({
  images,
}: {
  images: { src: string; alt: string; width: number; height: number }[];
}) {
  return (
    <Carousel
      className="max-w-screen-md shadow-lg w-full max-h-[550px] h-full rounded-xl overflow-hidden"
      opts={{
        loop: true,
      }}
    >
      <CarouselContent>
        {images.map(({ src, alt, width, height }) => {
          return (
            <CarouselItem key={src} className="h-fit">
              <ImageDialog src={src} alt={alt} width={width} height={height} />
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <CarouselPrevious className="absolute top-1/2 left-4 shadow-md hover:cursor-pointer" />
      <CarouselNext className="absolute top-1/2 right-4 shadow-md hover:cursor-pointer" />
    </Carousel>
  );
}

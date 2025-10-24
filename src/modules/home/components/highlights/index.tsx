"use client"
import { Button, clx } from "@medusajs/ui"
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@modules/common/components/carousel/carousel"
import { Volume2, VolumeX } from "lucide-react"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"

const mockHighlights = [
  {
    image: "/highlight-1.jpg",
  },
  {
    video: "/highlight-2.mp4",
  },
  {
    video: "/highlight-3.mp4",
  },
  {
    video: "/highlight-4.mp4",
  },
  {
    video: "/highlight-5.mp4",
  },
  {
    video: "/highlight-6.mp4",
  },
  {
    video: "/highlight-7.mp4",
  },
]
export default function Highlights() {
  const [api, setApi] = useState<CarouselApi | null>(null)
  const [activeSlide, setActiveSlide] = useState<number>(0)
  const [muted, changeMuted] = useState(true)

  useEffect(() => {
    if (api) {
      api.on("select", () => {
        setActiveSlide(api.selectedScrollSnap())
      })
    }
  }, [api])

  return (
    <div className="md:content-container pt-12">
      <Carousel opts={{ loop: true, align: "center" }} setApi={setApi}>
        <CarouselContent>
          {mockHighlights.map((highlight, index) => (
            <CarouselItem
              key={index}
              className="flex-none relative aspect-[4/9] flex flex-col justify-center"
              onClick={() => api?.scrollTo(index)}
            >
              <HighlightItem
                highlight={highlight}
                isActive={activeSlide === index}
                muted={muted}
                changeMuted={changeMuted}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex items-center justify-center gap-4">
          <div className="relative py-8">
            <CarouselPrevious className="p-2" />
            <CarouselNext className="p-2" />
          </div>
        </div>
      </Carousel>
    </div>
  )
}
export const HighlightItem = ({
  highlight,
  isActive,
  muted,
  changeMuted,
}: {
  highlight: {
    image?: string
    video?: string
  }
  isActive: boolean
  muted: boolean
  changeMuted: (val: boolean) => void
}) => {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (isActive && videoRef.current) {
      videoRef.current.currentTime = 0
      videoRef.current.play()
    } else {
      videoRef.current?.pause()
    }
  }, [isActive])

  return (
    <div className={clx("flex flex-col flex-none gap-4")}>
      <div
        className={clx(
          "w-72 aspect-[9/14] overflow-hidden rounded-lg relative transition-[aspect-ratio] duration-500 ease-in-out",
          isActive && "aspect-[9/16]"
        )}
      >
        {highlight.image && (
          <Image
            src={highlight.image}
            alt={highlight.image}
            width={288}
            height={512}
            className="w-full h-full object-cover"
          />
        )}
        {highlight.video && (
          <>
            <video
              src={highlight.video}
              className={"w-full h-full object-cover "}
              autoPlay={isActive}
              muted={muted}
              ref={videoRef}
            />

            <Button
              className="absolute bottom-6 right-4 size-8 p-2 rounded-full bg-ui-alpha-400 hover:bg-ui-alpha-400"
              variant="transparent"
              size="base"
              onClick={() => changeMuted(!muted)}
            >
              {muted ? (
                <VolumeX className="fill-white text-white" />
              ) : (
                <Volume2 className="fill-white text-white" />
              )}
            </Button>
          </>
        )}
      </div>

      <div
        className={clx(
          "flex gap-2 p-1 mb-1 rounded-md shadow-buttons-neutral w-full"
        )}
      >
        <div className="aspect-square size-16 overflow-hidden">
          <Image src="/28.png" height={200} width={200} alt="" />
        </div>
        <div className="flex-auto flex flex-col justify-evenly">
          <div className="text-sm text-ui-fg-subtle">
            Cetaphil чийгшүүлэх тос
          </div>
          <div className="text-xs text-ui-fg-subtle ">MNT 69,000.00</div>
        </div>
      </div>
    </div>
  )
}

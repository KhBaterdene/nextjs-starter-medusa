// This template requires the Embla Auto Scroll plugin to be installed:
//
// npm install embla-carousel-auto-scroll

"use client"

import AutoScroll from "embla-carousel-auto-scroll"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@modules/common/components/carousel/carousel"
import Image from "next/image"
import Link from "next/link"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

interface Logo {
  id: string
  className?: string
}

interface Logos3Props {
  heading?: string
  logos?: Logo[]
  className?: string
}

const Brands = ({
  heading = "All from USA 🇺🇸",
  logos = [
    {
      id: "cetaphil",
      className: "h-12 w-auto",
    },

    {
      id: "eucerin",
      className: "h-11 w-auto",
    },
    {
      id: "panoxyl",
      className: "h-10 w-auto",
    },
    {
      id: "sheglam",
      className: "h-5 w-auto px-4",
    },
    {
      id: "essence",
      className: "h-9 w-auto",
    },
    {
      id: "cerave",
      className: "h-12 w-auto",
    },
    {
      id: "elf",
      className: "h-11 w-auto",
    },
    {
      id: "thayers",
      className: "h-10 w-auto",
    },
    {
      id: "tree-hut",
      className: "w-auto h-12",
    },
  ],
}: Logos3Props) => {
  return (
    <section className="py-16">
      <div className=" flex flex-col items-center text-center mx-auto">
        <h1 className="mb-12  text-2xl font-medium text-pretty">{heading}</h1>
      </div>
      <div>
        <div className="relative mx-auto flex items-center justify-center content-container">
          <Carousel
            opts={{ loop: true }}
            plugins={[
              AutoScroll({
                playOnInit: true,
                stopOnInteraction: true,
                speed: 1,
              }),
            ]}
            style={{
              maskImage: `linear-gradient(to right, transparent, black 5%, black 95%, transparent)`,
            }}
          >
            <CarouselContent className="ml-0">
              {logos.map((logo) => (
                <CarouselItem
                  key={logo.id}
                  className="flex basis-1/3 justify-center pl-0 sm:basis-1/4 md:basis-1/5 lg:basis-1/6 select-none"
                >
                  <LocalizedClientLink
                    href={`/collections/${logo.id}`}
                    className="mx-10 flex shrink-0 items-center justify-center"
                  >
                    <div>
                      <Image
                        width={150}
                        height={150}
                        src={`/brands/${logo.id}.png`}
                        alt={logo.id}
                        className={logo.className}
                      />
                    </div>
                  </LocalizedClientLink>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </section>
  )
}

export { Brands }

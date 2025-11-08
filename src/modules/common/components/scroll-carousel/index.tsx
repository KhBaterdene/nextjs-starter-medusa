"use client"
import * as React from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { clx } from "@medusajs/ui"
import { HttpTypes } from "@medusajs/types"
import ProductPreview from "@modules/products/components/product-preview"

// Define the props for the main component
export interface SparksCarouselProps {
  products: HttpTypes.StoreProduct[]
}

export const SparksCarousel = React.forwardRef<
  HTMLDivElement,
  SparksCarouselProps
>(({ products }, ref) => {
  const carouselRef = React.useRef<HTMLDivElement>(null)
  const [isAtStart, setIsAtStart] = React.useState(true)
  const [isAtEnd, setIsAtEnd] = React.useState(false)

  // Function to scroll the carousel
  const scroll = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current
      const scrollAmount = clientWidth * 0.8 // Scroll by 80% of the visible width
      const newScrollLeft =
        direction === "left"
          ? scrollLeft - scrollAmount
          : scrollLeft + scrollAmount

      carouselRef.current.scrollTo({ left: newScrollLeft, behavior: "smooth" })
    }
  }

  // Effect to check scroll position and update button states
  React.useEffect(() => {
    const checkScrollPosition = () => {
      if (carouselRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current
        setIsAtStart(scrollLeft < 10)
        setIsAtEnd(scrollLeft + clientWidth >= scrollWidth - 10)
      }
    }

    const currentRef = carouselRef.current
    if (currentRef) {
      // Initial check
      checkScrollPosition()
      currentRef.addEventListener("scroll", checkScrollPosition)
    }

    // Check again on window resize
    window.addEventListener("resize", checkScrollPosition)

    return () => {
      if (currentRef) {
        currentRef.removeEventListener("scroll", checkScrollPosition)
      }
      window.removeEventListener("resize", checkScrollPosition)
    }
  }, [products])

  return (
    <div className="relative" ref={ref}>
      <div
        ref={carouselRef}
        className="flex w-full space-x-4 overflow-x-auto no-scrollbar pb-4"
      >
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            className="group w-[280px] flex-shrink-0 p-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <ProductPreview product={product} />
          </motion.div>
        ))}
      </div>

      {/* Navigation Buttons */}
      {!isAtStart && (
        <button
          onClick={() => scroll("left")}
          className={clx(
            "absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-background/60 backdrop-blur-sm border text-foreground shadow-md transition-opacity hover:bg-background/80 disabled:opacity-0"
          )}
          aria-label="Scroll left"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
      )}
      {!isAtEnd && (
        <button
          onClick={() => scroll("right")}
          className={clx(
            "absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-background/60 backdrop-blur-sm border text-foreground shadow-md transition-opacity hover:bg-background/80 disabled:opacity-0"
          )}
          aria-label="Scroll right"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      )}
    </div>
  )
})

SparksCarousel.displayName = "SparksCarousel"

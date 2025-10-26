import Image from "next/image"

const Hero = () => {
  return (
    <div className="md:aspect-[16/6] md:content-container aspect-square relative bg-gray-100">
      <Image
        src="/hero.png"
        alt="Hero"
        fill
        sizes="(max-width: 768px) 150vw, 100vw"
        className="object-cover absolute"
      />
    </div>
  )
}

export default Hero

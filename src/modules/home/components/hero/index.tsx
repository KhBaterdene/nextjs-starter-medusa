import Image from "next/image"

const Hero = () => {
  return (
    <div className="md:aspect-[2/1] aspect-square relative">
      <Image
        src="/hero.png"
        alt="Hero"
        fill
        className="object-cover absolute"
      />
    </div>
  )
}

export default Hero

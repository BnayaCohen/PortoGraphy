import Image from "next/image"
import { useState } from "react"
import { Eye } from "lucide-react";

type Props = {
  photoSrc: string
}

export default function ImgContainer({ photoSrc }: Props) {

  const widthHeightRatio = 375 / 250 // photo.height / photo.width
  const galleryHeight = Math.ceil(250 * widthHeightRatio)
  const photoSpans = Math.ceil(galleryHeight / 10) + 1
  const [hovered, setHovered] = useState(false);

  return (
    <div className="w-full sm:w-[] md:w-[`calc(100vw / 3)`] mb-[2px] justify-self-center"
    onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
      style={{ gridRow: `span ${photoSpans}` }}>
      <div className="grid place-content-center">
        <div className="relative rounded-[1px] overflow-hidden group">
          <Image
            src={photoSrc}
            alt={"photo"}
            width={250}
            height={375}
            style={{
              width: '100%',
              height: 'auto',
            }}
            // sizes="(min-width: 1280px) 278px, (min-width: 1040px) calc(12.73vw + 118px), (min-width:800px) 33.18vw, (min-width:540px) 50vw, calc(100vw - 16px)"
            // sizes="250px"
            sizes="100vw"
            placeholder="blur"
            blurDataURL={"iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mPcXg8AAfMBOOg8T0oAAAAASUVORK5CYII="}
            className="group-hover:opacity-65 cursor-pointer group-hover:hidden-text:opacity-100"
            
          />
          {hovered && (
            <div className="absolute inset-0 flex items-center justify-center z-50">
              <div className="text-zinc-600 font-semibold px-4 py-2 rounded-md"><Eye size={30} /></div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
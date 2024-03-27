import type { Photo } from "@/models/images"
import Image from "next/image"

type Props ={
  photo: Photo
}

export default function ImgContainer({photo}: Props) {

  const widthHeightRatio = photo.height / photo.width
  const galleryHeight = Math.ceil(250 * widthHeightRatio)
  const photoSpans = Math.ceil(galleryHeight / 10) + 1

  return(
    <div className="w-full sm:w-[300px] md:w-[250px] mb-[3px] justify-self-center"
    style={{gridRow: `span ${4}`}}>
      <div className="grid place-content-center">
        <div className="rounded-[2px] overflow-hidden group">
          <Image
          src={photo.src.large}
          alt={"photo"}
          width={250}
          height={375}
          // layout="responsive"
          style={{
            width: '100%',
            height: 'auto',
          }}
          // sizes="(min-width: 1280px) 278px, (min-width: 1040px) calc(12.73vw + 118px), (min-width:800px) 33.18vw, (min-width:540px) 50vw, calc(100vw - 16px)"
          // sizes="250px"
          sizes="100vw"
          placeholder="blur"
          blurDataURL={"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mPcuXdvPQAHHgK0ao3GhAAAAABJRU5ErkJggg=="}
          className="group-hover:opacity-75"
          />
        </div>
      </div>
    </div>
  )
}
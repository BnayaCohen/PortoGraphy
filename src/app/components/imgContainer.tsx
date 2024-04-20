import { useEffect, useState } from "react";
import Image from "next/image"
import fs from "node:fs/promises";
import { getPlaiceholder } from "plaiceholder";



type Props = {
  photoSrc: string
}

export default function ImgContainer({ photoSrc }: Props) {

  const widthHeightRatio = 375 / 250 // photo.height / photo.width
  const galleryHeight = Math.ceil(250 * widthHeightRatio)
  const photoSpans = Math.ceil(galleryHeight / 10) + 1
  let [blurrredURL, setBlurredURL] = useState<string>('')

  const getBase64 = async (imgPath: string) => {
    try {
      const file = await fs.readFile(imgPath)
      const { base64 } = await getPlaiceholder(file)
      console.log(base64);
      return base64
  
    } catch (error: unknown) {
      // //error handling
      // if (error instanceof Error) return error.message
      // else if (error && typeof error === "object" && "message" in error)
      //   return error.message as string
      // else if (typeof error === "string") return error;
      // else return "Unexpected error!"
    }
  }

  useEffect(() => {
    console.log(blurrredURL);
    // getBase64(photoSrc).then(setBlurredURL)
    console.log(blurrredURL);
  }, []);

  return (
    <div className="w-full sm:w-[] md:w-[`calc(100vw / 3)`] mb-[2px] justify-self-center"
      style={{ gridRow: `span ${photoSpans}` }}>
      <div className="grid place-content-center">
        <div className="rounded-[1px] overflow-hidden group">
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
            blurDataURL={"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mPcuXdvPQAHHgK0ao3GhAAAAABJRU5ErkJggg=="}
            className="group-hover:opacity-65 cursor-pointer"
          />
        </div>
      </div>
    </div>
  )
}
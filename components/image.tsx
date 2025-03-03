import Image, { ImageProps } from "next/image"

export default function Img(props: ImageProps) {
  const cloudflareImageLoader = ({ src, width, quality }: ImageProps) => {
    if (!quality) {
      quality = 75
    }
    const path = `https://${process.env.NEXT_PUBLIC_WORKERS}?width=${width}&quality=${quality}&image=`;
    if ((src.toString()).includes('http')) {
      return `${path}${src}`
    }
    return `${path}https://${process.env.NEXT_PUBLIC_DOMAINS}${src}`
  }

  if (!props.src || props.src?.toString().includes("strapi.cariber.coundefined")) {
    return <Image src="/image-not-found.png"
      unoptimized={true}
      width={props.width}
      height={props.height}
      loader={cloudflareImageLoader}
      objectFit="contain"
      alt={props.alt} />
  }

  if (process.env.NODE_ENV === 'development') {
    return <Image unoptimized={true} {...props} alt={props.alt} />
  } else {
    return <Image {...props} loader={cloudflareImageLoader} alt={props.alt} />
  }
}

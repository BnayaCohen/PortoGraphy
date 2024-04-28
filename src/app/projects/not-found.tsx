import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className='h-svh flex flex-col justify-center items-center text-white'>
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <br />
      <Link href="/"><h1 className='font-bold'>Return Home</h1></Link>
    </div>
  )
}
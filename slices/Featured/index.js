import React from 'react'
import Image from 'next/image'

const Square = ({ img, alt, start }) => (
  <div
    className={`
    relative grid justify-center w-full items-center
    aspect-square bg-white my-8 scroll-element col-span-7 ${start}
  `}
  >
    {img && <Image layout='fill' alt={alt} src={img} />}
  </div>
)

// TODO: start 2, 5, 2, 5, alternating.
// might just use the API and avoid all of this for now...

const Featured = ({ slice }) => (
  <div className='absolute top-0 left-0 grid grid-cols-3 w-full h-full z-10'>
  <div
    className={`
    sticky overflow-y-scroll col-span-1 col-start-3 h-screen top-0
    scroll-container bg-slate-300 grid grid-cols-12 scroll-py-20
  `}
  >
    <h1
      className={`
      col-span-12 text-white freight-neo text-center top-0 left-0 text-3xl pt-6 mb-8 sticky
    `}
    >
      {slice.primary.title}
    </h1>
    {slice?.items?.map((item, i) => (
      <Square img={item.image.url} alt={item.image.alt} start='col-start-5' key={i} />
    ))}
  </div>
  </div>
)

export default Featured

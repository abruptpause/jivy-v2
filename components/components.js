import { useState } from 'react'
import Image from 'next/image'

export const Row = ({ children, bg = 'bg-slate-100', width = 'col-span-10 col-start-2' }) => (
  <div className={`min-h-screen grid grid-cols-12 overflow-x-hidden ${bg}`}>
    <div className={`${width} grid grid-cols-12 gap-y-14 m-7 md:m-14`}>{children}</div>
  </div>
)

export const Description = ({ src, className, primary = 'text-slate-400', secondary = 'text-slate-500' }) => (
  <div className={`relative ${className} md:mx-7 col-span-12 col-start-1`}>
    <h1 className={`freight-neo font-normal text-3xl xl:text-4xl mb-4 ${primary}`}>
      {src.name}
    </h1>
    <h2 className={`freight-neo xl:text-lg ${secondary}`}>{src.medium}</h2>
    <h2 className={`freight-neo xl:text-lg md:mb-12 ${secondary}`}>
      {src.size}
    </h2>
  </div>
)

export const Art = ({ src, className }) => {
  const [opacity, setOpacity] = useState('0')

  return (
    <div
      className={`relative ${className} md:mx-7 col-span-12 col-start-1`}
      style={{
        transition: 'opacity 0.75s',
        opacity
      }}
    >
      <Image src={src} alt='' layout='fill' onLoadingComplete={() => {
        setOpacity('1')
      }} />
    </div>
  )
}

// a square work (featured section)
const Square = ({ src, start }) => {
  const [opacity, setOpacity] = useState('0')

  return (
    <div className={`
      relative aspect-[1/1] my-8 scroll-element col-span-7 ${start}
    `}
    style={{
      transition: 'opacity 0.75s',
      opacity
    }}
    >
      <Image src={src} alt='' layout='fill' onLoadingComplete={() => {
        setOpacity('1')
      }} />
    </div>
  )
}

// featured section
export const Featured = ({ page }) => {
  const featured = page.data.slices.filter(slice => slice.slice_type === 'featured')[0]

  return (
    <div
      className='grid grid-cols-3 absolute top-0 left-0 w-full h-full z-10'
    >
      <div className={`
        grid grid-cols-12
        col-span-1 col-start-3
        sticky overflow-y-scroll h-screen top-0
        scroll-container bg-slate-300 scroll-py-20
      `}>
        <h1
          className='col-span-12 text-white freight-neo text-center top-0 left-0 text-3xl pt-6 mb-8 sticky'
        >
          {featured.primary.title}
        </h1>
        {featured.items.map((i, k) => (
          <Square key={k} src={i.image.url} start={k % 2 === 0 ? 'col-start-2' : 'col-start-5'} />
        ))}
      </div>
    </div>
  )
}

// hero splash/text
// TODO probably add a loader here for text
export const Hero = ({ page, width, index }) => (
  <div
    className={`grid grid-cols-3 w-full absolute top-0 left-0 ${index}`}
    style={{
      height: '200vh'
    }}
  >
    <div className={`
      ${width}
      h-screen top-0 sticky
      freight-neo text-center text-white
      flex justify-center items-center
    `}>
      <div className='overflow-x-hidden'>
        <h1 className='text-xl pb-12'>{page.data.subtitle[0].text}</h1>
        {page.data.title.map((i, k) => <h1 key={k} className='text-5xl md:text-7xl lg:text-9xl 2xl:text-[10rem]'>{i.text}</h1>)}
      </div>
    </div>
  </div>
)

import Image from 'next/image'

export const Section = ({ children, bg = 'bg-slate-100', width = 'col-span-10 col-start-2' }) => (
  <div className={`min-h-screen grid grid-cols-12 ${bg}`}>
    <div className={`${width} grid grid-cols-12 gap-y-14 m-14`}>{children}</div>
  </div>
)

export const Text = ({ item, className, primary = 'text-slate-400', secondary = 'text-slate-500' }) => (
  <div className={`relative ${className} mx-7`}>
    <h1 className={`freight-neo font-normal text-3xl mb-4 ${primary}`}>
      {item.name}
    </h1>
    <h2 className={`freight-neo ${secondary}`}>{item.medium}</h2>
    <h2 className={`freight-neo mb-12 ${secondary}`}>
      {item.size}
    </h2>
  </div>
)

export const Work = ({ src, className }) => (
  <div className={`relative ${className} mx-7`}>
    <Image src={src} alt='' layout='fill' />
  </div>
)

const Square = ({ src, start }) => (
  <div className={`
    relative aspect-[1/1] my-8 scroll-element col-span-7 ${start}
  `}>
    <Image layout='fill' alt='' src={src} />
  </div>
)

export const Featured = ({page}) => {
  const featured = page.data.slices.filter(slice => slice.slice_type === 'featured')[0]

  return (
    <div
      className='grid grid-cols-3 absolute top-0 left-0 w-full h-full z-10'
      // style={{transform: 'translateX(10%)'}}
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

export const Hero = ({page, width, index}) => (
  <div
    className={`grid grid-cols-3 w-full absolute top-0 left-0 ${index}`}
    style={{ height: '200vh' }}
  >
    <div className={`
      ${width}
      h-screen top-0 sticky
      freight-neo text-center text-white
      flex justify-center items-center
    `}>
      <div>
        <h1 className='text-xl pb-12'>{page.data.subtitle[0].text}</h1>
        {page.data.title.map((i, k) => <h1 key={k} className='text-9xl'>{i.text}</h1>)}
      </div>
    </div>
  </div>
)

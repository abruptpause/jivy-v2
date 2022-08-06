import Image from 'next/image'

export const Section = ({ children, bg = 'bg-slate-100', width }) => (
  <div className={`min-h-screen grid grid-cols-12 ${bg}`}>
    <div className={`${width} grid grid-cols-12 gap-14 m-14`}>{children}</div>
  </div>
)

export const Text = ({ item, className, primary = 'text-slate-400', secondary = 'text-slate-500' }) => (
  <div className={`relative ${className}`}>
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
  <div className={`relative ${className}`}>
    <Image src={src} alt='' layout='fill' />
  </div>
)

const Square = ({ src, start }) => (
  <div className={`
    relative grid justify-center w-full items-center
    aspect-[1/1] bg-white my-8 scroll-element col-span-7 ${start}
  `}>
    <Image layout='fill' alt='' src={src} />
  </div>
)

export const Featured = ({page}) => {
  const featured = page.data.slices.filter(slice => slice.slice_type === 'featured')[0]

  return (
    <div className='absolute top-0 left-0 grid grid-cols-3 w-full h-full z-10'>
      <div className={`
        sticky overflow-y-scroll col-span-1 col-start-3 h-screen top-0
        scroll-container bg-slate-300 grid grid-cols-12 scroll-py-20
      `}>
        <h1
          className='col-span-12 text-white freight-neo text-center top-0 left-0 text-3xl pt-6 mb-8 sticky'
        >
          {featured.primary.title}
        </h1>
        {featured.items.map((i, k) => <Square key={k} src={i.image.url} start={k % 2 === 0 ? 'col-start-2' : 'col-start-5'} />)}
      </div>
    </div>
  )
}

export const Header = ({page}) => (
  <div
    className='absolute top-0 left-0 grid grid-cols-3 w-full z-10'
    style={{ height: '200vh' }}
  >
    <div className={`
      freight-neo sticky flex h-screen top-0 text-center text-white
      text-9xl col-span-2 justify-center items-center
    `}>
      <div>
        <h1 className='text-xl pb-12'>{page.data.subtitle[0].text}</h1>
        {page.data.title.map((i, k) => <h1 key={k}>{i.text}</h1>)}
      </div>
    </div>
  </div>
)

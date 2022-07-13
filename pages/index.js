import { createClient } from "../prismicio"

import Image from 'next/image'

const Section = ({ children, bg = 'bg-slate-100', span }) => (
  <div className={`min-h-screen grid grid-cols-12 ${bg}`}>
    <div className={`${span} grid grid-cols-12 gap-14 m-14`}>{children}</div>
  </div>
)

const Artwork = ({ src, className }) => (
  <div className={className}>
    <Image src={src} alt='' layout='fill' />
  </div>
)

const Square = ({ img, start }) => (
  <div
    className={`
    relative grid justify-center w-full items-center
     aspect-[1/1] bg-white my-8 scroll-element col-span-7 ${start}
  `}
  >
    <Image layout='fill' alt='' src={img} />
  </div>
)

const Featured = ({page}) => {
  const featured = page.data.slices.filter(slice => slice.slice_type === 'featured')[0]

  return (
    <div className='absolute top-0 left-0 grid grid-cols-3 w-full h-full z-10'>
    <div
      className={`
      sticky overflow-y-scroll col-span-1 col-start-3 h-screen top-0
      scroll-container bg-slate-300 grid grid-cols-12 scroll-py-20
    `}
    >
      <h1
        className='col-span-12 text-white freight-neo text-center top-0 left-0 text-3xl pt-6 mb-8 sticky'
      >
        {featured.primary.title}
      </h1>
      {featured.items.map((i, k) => <Square key={k} img={i.image.url} start={k % 2 === 0 ? 'col-start-2' : 'col-start-5'} />)}
    </div>
    </div>
  )
}

const Header = ({page}) => (
  <div
    className='absolute top-0 left-0 grid grid-cols-3 w-full z-10'
    style={{
      height: '200vh'
    }}
  >
  <div
    className={`
    freight-neo sticky flex h-screen top-0 text-center text-white
    text-9xl col-span-2 justify-center items-center
  `}
  >
    <div>
      <h1 className='text-xl pb-12'>{page.data.subtitle[0].text}</h1>
      {page.data.title.map((i, k) => <h1 key={k}>{i.text}</h1>)}
    </div>
  </div>
  </div>
)

const Description = ({ item, className, primary = 'text-slate-400', secondary = 'text-slate-500' }) => (
  <div className={className}>
    <h1 className={`freight-neo font-normal text-3xl mb-4 ${primary}`}>
      {item.name}
    </h1>
    <h2 className={`freight-neo ${secondary}`}>{item.medium}</h2>
    <h2 className={`freight-neo mb-12 ${secondary}`}>
      {item.size}
    </h2>
  </div>
)

const TopSection = ({page}) => (
  <div className='relative grid grid-cols-3'>
    <Header page={page} />
    <Featured page={page} />

    <div
      className='col-span-2 relative h-screen bg-center bg-cover text-slate-200'
      style={{ backgroundImage: `url('${page.data.image.url}')` }}
    />

    <div className='col-span-2 relative flex h-screen bg-slate-200 items-end justify-center' />

    <div className='col-span-2 relative bg-slate-200 text-justify grid grid-cols-5'>
      <div className='pb-24 col-span-3 col-start-2'>
        {page.data.about.map((i, k) => (
          <p key={k} className='font-extralight mb-4 text-slate-500 text-xl'>
            {i.text}
          </p>
        ))}
      </div>
    </div>
  </div>
)


const Home = ({ page }) => {
  // const [span, setSpan] = useState('col-span-10 col-start-2')
  // const [span, setSpan] = useState('col-span-8 col-start-1')
  const span = 'col-span-10 col-start-2'

  const artworksData = page.data.slices.filter(slice => slice.slice_type === 'artworks')[0]
  const artworks = artworksData.items.sort((a, b) => a.position - b.position).map(i => { return { ...i, image: i.image.url } })

  return (
    <main>
      <TopSection page={page} />

      <Section span={span}>
        <Artwork src={artworks[0].image} className='relative col-span-8 aspect-[5/7] self-start' />
        <Description item={artworks[0]} className='relative col-span-4 self-end' />
        <Description item={artworks[1]} className='relative col-span-8 self-end text-right' />
        <Artwork src={artworks[1].image} className='relative col-span-4 aspect-[4/5] self-end mb-24' />
      </Section>

      <Section bg='bg-slate-200' span={span}>
        <Artwork src={artworks[2].image} className='relative col-span-6 aspect-[2/3] self-start' />
        <Description item={artworks[2]} className='col-span-6 self-end' />
      </Section>

      <Section bg='bg-slate-400' span={span}>
        <Artwork src={artworks[3].image} className='relative col-span-8 col-start-3 aspect-[7/5] bg-slate-500 self-center' />
        <Description item={artworks[3]} className='col-span-8 col-start-3 text-center' primary='text-slate-600' secondary='text-slate-700' />
      </Section>

      <Section span={span}>
        <Artwork src={artworks[4].image} className='relative col-span-6 aspect-[4/5] self-start' />
        <Description item={artworks[4]} className='relative col-span-5 self-end' />
        <Description item={artworks[5]} className='relative col-span-6 self-end text-right' />
        <Artwork src={artworks[5].image} className='relative col-span-5 aspect-[1/1] self-end' />
      </Section>
    </main>
  )
}

export default Home

export async function getServerSideProps({ locale, previewData }) {
  const client = createClient({ previewData })

  const page = await client.getByUID("home", "home", { lang: locale })

  return {
    props: {
      page
    }
  }
}

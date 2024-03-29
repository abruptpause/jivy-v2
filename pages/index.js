import { useState } from 'react'
import { createClient } from '../prismicio'
import { Featured, Hero, Row, Description, Art } from '../components/components.js'
import Head from 'next/head'

const Home = ({ page }) => {
  const { about, image, slices } = page.data

  const art = slices
    .filter(slice => slice.slice_type === 'artworks')[0].items
    .sort((a, b) => a.position - b.position)
    .map(i => { return { ...i, image: i.image.url } })

  // TODO replace with <Image /> ?
  const heroImage = { backgroundImage: `url('${image.url}')` }

  // these are all for the hero section.
  const [width, setWidth] = useState('w-2/3')
  const [index, setIndex] = useState('z-1')
  const [transform, setTransform] = useState('initial')

  return (
    <>
    <Head>
      <title>Abrupt Pause</title>
    </Head>
    <main>

      {/* the entire top section (a mess) */}
      <div className='relative grid grid-cols-3'>

        {/* featured container */}
        <Featured page={page} />

        {/* hero container */}
        <div
          className={`relative col-span-3 z-10 ${width}`}
          style={{ transition: 'width 0.65s' }}
        >

          {/* toggle button container */}
          <div className='absolute z-20 h-full right-6 bottom-6'>

            {/* toggle button */}
            <div
              onClick={() => {
                index === 'z-1' ? setIndex('z-10') : setIndex('z-1')
                width === 'w-2/3' ? setWidth('w-full') : setWidth('w-2/3')
                transform === 'scaleX(-100%)' ? setTransform('initial') : setTransform('scaleX(-100%)')
              }}
              className='sticky cursor-pointer bg-white text-slate-600 flex justify-center items-center font-bold'
              style={{
                top: 'calc(100vh - 68px)',
                width: '50px',
                height: '50px',
                transition: 'transform 0.65s',
                transform
              }}
              >
              <h1>{'->'}</h1>
            </div>

          </div>

          {/* the hero image */}
          <div className={`${index} h-screen bg-center bg-cover text-slate-200`} style={heroImage} />

          {/* background div behind 'featuring art by john ivy */}
          <div className={`${index} h-screen bg-slate-200`} />

          {/* "featuring art by john ivy" */}
          <Hero page={page} width='col-span-3' index={index} />

          {/* paragraph under hero */}
          <div className={`${index} grid grid-cols-5 col-span-2 bg-slate-200 text-justify`}>
            <div className='col-span-3 col-start-2 mb-24'>
              {about.map((i, k) => (
                <p key={k} className='text-md md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl text-slate-500 font-extralight mb-4'>
                  {i.text}
                </p>
              ))}
            </div>
          </div>

        </div>
        {/* end left container */}

      </div>
      {/* end hero section */}

      {/* all the rows */}
      <Row>
        <Art src={art[0].image} className='lg:col-span-8 aspect-[5/7] self-start' />
        <Description src={art[0]} className='lg:col-span-4 self-end' />
        <Description src={art[1]} className='lg:col-span-8 self-end text-right' />
        <Art src={art[1].image} className='lg:col-span-4 aspect-[4/5] self-end mb-24' />
      </Row>

      <Row bg='bg-slate-200'>
        <Art src={art[2].image} className='lg:col-span-6 aspect-[2/3] self-start' />
        <Description src={art[2]} className='lg:col-span-6 self-end' />
      </Row>

      <Row bg='bg-slate-400'>
        <Art src={art[3].image} className='lg:col-span-10 lg:col-start-2 aspect-[7/5] bg-slate-500 self-center' />
        <Description src={art[3]} className='lg:col-span-10 lg:col-start-2 text-center' primary='text-slate-600' secondary='text-slate-700' />
      </Row>

      <Row>
        <Art src={art[4].image} className='lg:col-span-6 aspect-[4/5] self-start' />
        <Description src={art[4]} className='lg:col-span-5 self-end' />
        <Description src={art[5]} className='lg:col-span-6 self-end text-right' />
        <Art src={art[5].image} className='lg:col-span-5 aspect-[1/1] self-end' />
      </Row>
    </main>
    </>
  )
}

export async function getServerSideProps ({ locale, previewData }) {
  const client = createClient({ previewData })
  const page = await client.getByUID('home', 'home', { lang: locale })

  return {
    props: {
      page
    }
  }
}

export default Home

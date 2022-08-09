// https://jivy-v2.vercel.app/
import { useState } from 'react'
import { createClient } from "../prismicio"
import { Featured, Hero, Section, Text, Work } from '../components/components.js'

const Home = ({ page }) => {
  const { about, image, slices } = page.data

  const art = slices
  .filter(slice => slice.slice_type === 'artworks')[0].items
  .sort((a, b) => a.position - b.position)
  .map(i => { return { ...i, image: i.image.url } })

  const heroImage = { backgroundImage: `url('${image.url}')` }

  // col-span-2 or col-span-3 when expanded
  const [width, setWidth] = useState('w-2/3')

  // z-1 or z-10 when expanded
  const [index, setIndex] = useState('z-1')


  const [transform, setTransform] = useState('initial')



  return (
    <main>



      <div className='relative grid grid-cols-3'>

        <Featured page={page} />

        {/*
            TODO wrap all hero components in a percentage width (75-100%/w-screen), and change inner classes to w-full
            can also use fraction widths: https://tailwindcss.com/docs/width
          */}

        <div className={`relative col-span-3 z-10 ${width}`}
          style={{
            transition: 'width 0.65s'
          }}
        >

                <div
                  onClick={() => {
                    index === 'z-1' ? setIndex('z-10') : setIndex('z-1')
                    width === 'w-2/3' ? setWidth('w-full') : setWidth('w-2/3')
                    transform === 'scaleX(-100%)' ? setTransform('initial') : setTransform('scaleX(-100%)')
                  }}
                  className='absolute z-20 cursor-pointer bg-white text-slate-600 flex justify-center items-center font-bold'
                  style={{
                    right: '18px',
                    top: 'calc(100vh - 68px)',
                    width: '50px',
                    height: '50px',
                    transition: 'transform 0.65s',
                    transform
                  }}
                >
                  <h1>{'->'}</h1>
                </div>

          <div className={`${index} h-screen bg-center bg-cover text-slate-200`} style={heroImage} />
          <div className={`${index} h-screen bg-slate-200`} />

          <Hero page={page} width='col-span-3' index={index} />

          <div className={`${index} grid grid-cols-5 col-span-2 bg-slate-200 text-justify`}>
            <div className='col-span-3 col-start-2 mb-24'>
              {about.map((i, k) => (
                <p key={k} className='text-xl text-slate-500 font-extralight mb-4'>
                  {i.text}
                </p>
              ))}
            </div>
          </div>

        </div>

      </div>

      <Section>
        <Work src={art[0].image} className='col-span-8 aspect-[5/7] self-start' />
        <Text item={art[0]} className='col-span-4 self-end' />
        <Text item={art[1]} className='col-span-8 self-end text-right' />
        <Work src={art[1].image} className='col-span-4 aspect-[4/5] self-end mb-24' />
      </Section>

      <Section bg='bg-slate-200'>
        <Work src={art[2].image} className='col-span-6 aspect-[2/3] self-start' />
        <Text item={art[2]} className='col-span-6 self-end' />
      </Section>

      <Section bg='bg-slate-400'>
        <Work src={art[3].image} className='col-span-10 col-start-2 aspect-[7/5] bg-slate-500 self-center' />
        <Text item={art[3]} className='col-span-10 col-start-2 text-center' primary='text-slate-600' secondary='text-slate-700' />
      </Section>

      <Section>
        <Work src={art[4].image} className='col-span-6 aspect-[4/5] self-start' />
        <Text item={art[4]} className='col-span-5 self-end' />
        <Text item={art[5]} className='col-span-6 self-end text-right' />
        <Work src={art[5].image} className='col-span-5 aspect-[1/1] self-end' />
      </Section>
    </main>
  )
}

export async function getServerSideProps({ locale, previewData }) {
  const client = createClient({ previewData })
  const page = await client.getByUID("home", "home", { lang: locale })

  return {
    props: {
      page
    }
  }
}

export default Home

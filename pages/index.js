import { useState } from 'react'
import { createClient } from "../prismicio"
import { Featured, Header, Section, Text, Work } from '../components/components.js'

const Home = ({ page }) => {
  const { about, image, slices } = page.data

  const art = slices
    .filter(slice => slice.slice_type === 'artworks')[0].items
    .sort((a, b) => a.position - b.position)
    .map(i => { return { ...i, image: i.image.url } })

  const heroImage = { backgroundImage: `url('${image.url}')` }

  const [width, setWidth] = useState('col-span-10 col-start-2')
  // 'col-span-8 col-start-1'

  return (
    <main>
      <div className='relative grid grid-cols-3'>
        <Header page={page} />
        <Featured page={page} />

        <div className='col-span-2 relative h-screen bg-center bg-cover text-slate-200' style={heroImage} />

        <div className='col-span-2 relative flex h-screen bg-slate-200 items-end justify-center' />

        <div className='col-span-2 relative bg-slate-200 text-justify grid grid-cols-5'>
          <div className='pb-24 col-span-3 col-start-2'>
            {about.map((i, k) => (
              <p key={k} className='font-extralight mb-4 text-slate-500 text-xl'>
                {i.text}
              </p>
            ))}
          </div>
        </div>
      </div>

      <Section width={width}>
        <Work src={art[0].image} className='col-span-8 aspect-[5/7] self-start' />
        <Text item={art[0]} className='col-span-4 self-end' />
        <Text item={art[1]} className='col-span-8 self-end text-right' />
        <Work src={art[1].image} className='col-span-4 aspect-[4/5] self-end mb-24' />
      </Section>

      <Section bg='bg-slate-200' width={width}>
        <Work src={art[2].image} className='col-span-6 aspect-[2/3] self-start' />
        <Text item={art[2]} className='col-span-6 self-end' />
      </Section>

      <Section bg='bg-slate-400' width={width}>
        <Work src={art[3].image} className='col-span-8 col-start-3 aspect-[7/5] bg-slate-500 self-center' />
        <Text item={art[3]} className='col-span-8 col-start-3 text-center' primary='text-slate-600' secondary='text-slate-700' />
      </Section>

      <Section width={width}>
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

// https://jivy-v2.vercel.app/
export default Home

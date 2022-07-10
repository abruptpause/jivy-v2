import { createClient } from "../prismicio"

import Image from 'next/image'

// const Index = ({ page }) => (<Fofofo />)
// export default Index


const Square = ({ img, start }) => (
  <div
    className={`
    relative grid justify-center w-full items-center
     aspect-[1/1] bg-white my-8 scroll-element col-span-7 ${start}
  `}
  >
    {img && <Image layout='fill' alt='' src={img} />}
  </div>
)

const Featured = () => (
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
      featured work
    </h1>

    <Square img='https://images.prismic.io/next-multi-page/468614fb-a0bd-4a87-8af2-23cd682ebb57_JIV4.jpg?auto=compress,format' start='col-start-5' />
    <Square img='https://images.prismic.io/next-multi-page/468614fb-a0bd-4a87-8af2-23cd682ebb57_JIV4.jpg?auto=compress,format' start='col-start-2' />
    <Square img='https://images.prismic.io/next-multi-page/468614fb-a0bd-4a87-8af2-23cd682ebb57_JIV4.jpg?auto=compress,format' start='col-start-5' />
    <Square img='' start='col-start-2' />
    <Square img='' start='col-start-5' />
  </div>
)

const Header = ({ text = ['title', 'text'], subtext = 'subtext' }) => {
  return (
    <div
      className={`
      freight-neo sticky flex h-screen top-0 text-center text-white
      text-9xl col-span-2 justify-center items-center
    `}
    >
      <div>
        <h1 className='text-xl pb-12'>{subtext}</h1>
        {Array.isArray(text) &&
          text.length &&
          text.map((val, ind) => <h1 key={ind}>{val}</h1>)}
      </div>
    </div>
  )
}

const Section = ({ children, bg = 'bg-slate-100', span }) => (
  <div className={`min-h-screen grid grid-cols-12 ${bg}`}>
    <div className={`${span} grid grid-cols-12 gap-14 m-14`}>{children}</div>
  </div>
)

const TopSection = () => (
  <div className='relative grid grid-cols-3'>
    <div
      className='absolute top-0 left-0 grid grid-cols-3 w-full z-10'
      style={{
        height: '200vh'
      }}
    >
      <Header
        text={['featuring', 'art', 'by', 'john ivy']}
        subtext='abrupt pause'
      />
    </div>

    <div className='absolute top-0 left-0 grid grid-cols-3 w-full h-full z-10'>
      <Featured />
    </div>

    <div
      className='col-span-2 relative h-screen bg-center bg-cover bg-white text-slate-200'
      style={{ backgroundImage: `url('https://images.prismic.io/next-multi-page/468614fb-a0bd-4a87-8af2-23cd682ebb57_JIV4.jpg?auto=compress,format')` }}
    ></div>

    <div className='col-span-2 relative flex h-screen bg-slate-200 items-end justify-center'></div>

    <div className='col-span-2 relative bg-slate-200 text-justify grid grid-cols-5'>
      <div className='pb-24 col-span-3 col-start-2'>
        {[
          `For me, I rarely approach a work with a preconception of how it should look. It's much too frustrating, and I'm just not that good.`,
          `My best laid plans are never realized, and often what I end up with has little or nothing to do with my initial premise.`,
          `Even when a piece is finished (which only means I've stopped working on it), What has been of interest to me has more to do with the process or evolution than the product.`,
          `It's not a very efficient way to work, I suppose.`
        ].map((val, key) => (
          <p key={key} className='font-extralight mb-4 text-slate-500 text-xl'>
            {val}
          </p>
        ))}
      </div>
    </div>

  </div>
)

const Description = () => (
  <>
    <h1 className='freight-neo font-normal text-3xl text-slate-400 mb-4'>
      {'Pterodactyl-543'}
    </h1>
    <h2 className='freight-neo text-slate-500'>Medium: Paper and ...</h2>
    <h2 className='freight-neo text-slate-500 mb-12'>
      Size: 1234 x 4567 inches
    </h2>
  </>
)

// /*
const Home = ({ page }) => {
  // sidebar closed
  // eslint-disable-next-line
  // const [span, setSpan] = useState('col-span-10 col-start-2')
  const span = 'col-span-10 col-start-2'

  // sidebar open
  // const [span, setSpan] = useState('col-span-8 col-start-1')

  return (
      <main>
        <TopSection />

        <Section span={span}>
          <div className='relative col-span-8 aspect-[5/7] self-start'>
            <Image alt='' src='https://images.prismic.io/next-multi-page/468614fb-a0bd-4a87-8af2-23cd682ebb57_JIV4.jpg?auto=compress,format' layout='fill' />
          </div>
          <div className='relative col-span-4 self-end'>
            <Description />
          </div>
          <div className='relative col-span-8 self-end text-right'>
            <Description />
          </div>
          <div className='relative col-span-4 aspect-[4/5] self-end mb-24'>
            <Image alt='' src='https://images.prismic.io/next-multi-page/468614fb-a0bd-4a87-8af2-23cd682ebb57_JIV4.jpg?auto=compress,format' layout='fill' />
          </div>
        </Section>

        <Section bg='bg-slate-200' span={span}>
          <div className='relative col-span-6 aspect-[2/3] self-start'>
            <Image alt='' src='https://images.prismic.io/next-multi-page/468614fb-a0bd-4a87-8af2-23cd682ebb57_JIV4.jpg?auto=compress,format' layout='fill' />
          </div>
          <div className='col-span-6 self-end'>
            <Description />
            {[
              `So, in not thinking too much about what I'm trying to do, and just doing it.`,
              `For me, I rarely approach a work with a preconception of how it should look. It's much too frustrating, and I'm just not that good.`,
              `My best laid plans are never realized, and often what I end up with has little or nothing to do with my initial premise.`,
              `It's not a very efficient way to work, I suppose.`
            ].map((val, key) => (
              <p
                key={key}
                className='mb-4 text-slate-500 text-xl font-extralight'
              >
                {val}
              </p>
            ))}
          </div>
        </Section>

        <Section bg='bg-slate-400' span={span}>
          <div className='relative col-span-8 col-start-3 aspect-[7/5] bg-slate-500 self-center'>
            <Image alt='' src='https://images.prismic.io/next-multi-page/468614fb-a0bd-4a87-8af2-23cd682ebb57_JIV4.jpg?auto=compress,format' layout='fill' />
          </div>
          <div className='col-span-8 col-start-3 text-center'>
            <h1 className='freight-neo font-normal text-3xl text-slate-600 mb-4'>
              {'Pterodactyl-543'}
            </h1>
            <h2 className='freight-neo text-slate-700'>
              Medium: Paper and ...
            </h2>
            <h2 className='freight-neo text-slate-700 mb-12'>
              Size: 1234 x 4567 inches
            </h2>
          </div>
        </Section>

        <Section span={span}>
          <div className='relative col-span-6 aspect-[4/5] self-start'>
            <Image alt='' src='https://images.prismic.io/next-multi-page/468614fb-a0bd-4a87-8af2-23cd682ebb57_JIV4.jpg?auto=compress,format' layout='fill' />
          </div>
          <div className='relative col-span-5 self-end'>
            <Description />
          </div>

          <div className='relative col-span-6 self-end text-right'>
            <Description />
          </div>
          <div className='relative col-span-5 aspect-[1/1] self-end'>
            <Image alt='' src='https://images.prismic.io/next-multi-page/c0fc1126-1ccb-4536-8a43-ee2e5fb52b58_JIV5.jpg' layout='fill' />
          </div>
        </Section>
      </main>
  )
}

export default Home

export async function getStaticProps({ locale, previewData }) {
  const client = createClient({ previewData })

  const page = await client.getByUID("home", "home", { lang: locale })

  return {
    props: {
      page
    }
  }
}

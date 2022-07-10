const Hero = ({ slice }) => (
  <div className='bg-slate-400'>
    {slice.primary.text.map(item => item.text)}
  </div>
)

export default Hero

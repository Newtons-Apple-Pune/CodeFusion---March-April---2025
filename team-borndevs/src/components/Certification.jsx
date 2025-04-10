export default function Certification() {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 bg-gradient-to-br from-blue-600 to-violet-950 text-white pt-6 md:py-8 rounded-xl mx-2 my-4 lg:mx-8 lg:my-8'>
        <h2 className="text-2xl lg:text-4xl xl:text-5xl font-bold flex flex-col items-center justify-center"><span>We Don't Just Talk Quality.</span> <span>We're <span className='bg-clip-text text-transparent bg-gradient-to-br from-yellow-400 to-yellow-800'>ISO Certified</span> For It.</span></h2>
        <ul className="flex justify-center gap-4 my-6">
            <li className="h-20 w-20 lg:h-30 lg:w-30"><img className="h-20 w-20 lg:h-30 lg:w-30" src="./assets/ISO-27701-certified.png" alt="cert1" /></li>
            <li className="h-20 w-20 lg:h-30 lg:w-30"><img className="h-20 w-20 lg:h-30 lg:w-30" src="./assets/iso9001.png" alt="cert2" /></li>
            <li className="h-20 w-20 lg:h-30 lg:w-30"><img className="h-20 w-20 lg:h-30 lg:w-30" src="./assets/iso27001.png" alt="cert3" /></li>
        </ul>
    </div>
  )
}
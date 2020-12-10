import React from 'react'
import ItemGrid from '../components/ItemGrid'
import LoadingGrid from '../components/LoadingGrid'
import { HomePageGrid } from '../styles/Grids'
import useLatestData from '../utils/useLatestData'

const CurrentlySlicing = ({ slicemasters }) => {
   return (
      <div>
         <h2 className="center">
            <span className="mark tilt">Slicemasters On</span>
         </h2>
         <p>Standing by, ready to slice you up!</p>
         {!slicemasters && <LoadingGrid count={4} />}
         {slicemasters && !slicemasters?.length && (
            <p>No one is working right now!</p>
         )}
         {slicemasters?.length && <ItemGrid items={slicemasters} />}
      </div>
   )
}

const HotSlices = ({ hotSlices }) => {
   return (
      <div>
         <h2 className="center">
            <span className="mark tilt">Hot Slices</span>
         </h2>
         <p>Come on by, buy the slice!</p>
         {!hotSlices && <LoadingGrid count={4} />}
         {hotSlices && !hotSlices?.length && <p>Nothin' in the Case</p>}
         {hotSlices?.length && <ItemGrid items={hotSlices} />}
      </div>
   )
}

const HomePage = () => {
   const { slicemasters, hotSlices } = useLatestData()
   return (
      <div className="center">
         <h1>Best pizza</h1>
         <HomePageGrid>
            <CurrentlySlicing slicemasters={slicemasters}></CurrentlySlicing>
            <HotSlices hotSlices={hotSlices}></HotSlices>
         </HomePageGrid>
      </div>
   )
}

export default HomePage

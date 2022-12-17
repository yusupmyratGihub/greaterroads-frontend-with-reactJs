import React from 'react'
import Spacer from '../../components/common/spacer/spacer'
import RentPath from '../../components/users/about/rent-path/rent-path'
import WhyChooseUs from '../../components/users/about/why-choose-us/why-choose-us'
import MobileApp from '../../components/users/home/mobile-app/mobile-app'
import PopularVehicles from '../../components/users/home/popular-vehicles/popular-vehicles'
import Slider from '../../components/users/home/slider/slider'

const HomePage = () => {
  return (
    <>
      <Slider/>
      <Spacer/>
      <PopularVehicles/>
      <Spacer/>
      <RentPath/>
      <Spacer/>
      <MobileApp/>
      <Spacer/>
      <WhyChooseUs/>
      <Spacer/>
    </>
  )
}

export default HomePage
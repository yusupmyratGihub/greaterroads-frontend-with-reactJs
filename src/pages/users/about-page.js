import React from 'react'
import Spacer from '../../components/common/spacer/spacer'
import RentPath from '../../components/users/about/rent-path/rent-path'
import WhyChooseUs from '../../components/users/about/why-choose-us/why-choose-us'
import PageHeader from '../../components/users/common/page-header/page-header'

const AboutPage = () => {
  return (
    <>
      <PageHeader title="About Us"/>
      <Spacer/>
      <RentPath/>
      <Spacer/>
      <WhyChooseUs/>
      <Spacer/>
    </>
  )
}

export default AboutPage
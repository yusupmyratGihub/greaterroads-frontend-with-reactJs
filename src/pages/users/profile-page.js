import React from 'react'
import Spacer from '../../components/common/spacer/spacer'
import PageHeader from '../../components/users/common/page-header/page-header'
import Profile from '../../components/users/profile/profile'

const ProfilePage = () => {
  return (
    <>
      <PageHeader title="Profile" />
      <Spacer/>
      <Profile/>
      <Spacer />
    </>
  )
}

export default ProfilePage
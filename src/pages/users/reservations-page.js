import React from 'react'
import Spacer from '../../components/common/spacer/spacer'
import PageHeader from '../../components/users/common/page-header/page-header'
import Reservations from '../../components/users/reservations/reservations'

const ReservationsPage = () => {
  return (
    <>
      <PageHeader title="Reservations" />
      <Spacer/>
      <Reservations/>
      <Spacer/>
    </>
  )
}

export default ReservationsPage
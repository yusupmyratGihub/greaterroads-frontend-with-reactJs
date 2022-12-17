import React from "react";
import Spacer from "../../components/common/spacer/spacer";
import PageHeader from "../../components/users/common/page-header/page-header";
import Vehicles from "../../components/users/vehicles/vehicles";

const VehiclesPage = () => {
  return (
    <>
      <PageHeader title="Vehicles" />
      <Spacer />
      <Vehicles />
      <Spacer />
    </>
  );
};

export default VehiclesPage;

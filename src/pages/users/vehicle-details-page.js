import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getVehicle } from "../../api/vehicle-service";
import Loading from "../../components/common/loading/loading";
import Spacer from "../../components/common/spacer/spacer";
import PageHeader from "../../components/users/common/page-header/page-header";
import VehicleDetails from "../../components/users/vehicle-details/vehicle-details";
import { setVehicle } from "../../store/slices/reservation-slice";

const VehicleDetailsPage = () => {
  const vehicle = useSelector(state=> state.reservation.vehicle);
  const [loading, setLoading] = useState(true);
  const { vehicleId } = useParams();
  const dispatch = useDispatch();

  const loadData = async () => {
    try {
      const resp = await getVehicle(vehicleId);
      dispatch(setVehicle(resp.data));
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <PageHeader title={vehicle?.model}/>
      <Spacer />
      {loading ? <Loading /> : <VehicleDetails />}

      <Spacer />
    </>
  );
};

export default VehicleDetailsPage;

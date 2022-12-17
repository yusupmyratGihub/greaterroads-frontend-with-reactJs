import React from "react";
import { Badge, Container, Row, Col, Card } from "react-bootstrap";
import { RiGasStationFill, RiCarLine, RiCaravanLine } from "react-icons/ri";
import { IoIosSnow } from "react-icons/io";
import { MdOutlineAirlineSeatReclineExtra } from "react-icons/md";
import { GiJoystick, GiCalendarHalfYear } from "react-icons/gi";
import { getVehicleImage } from "../../../utils/functions/vehicle";
import Spacer from "../../common/spacer/spacer";
import { useSelector } from "react-redux";
import "./vehicle-details.scss";
import BookingForm from "./booking-form";

const VehicleDetails = () => {
  const vehicle = useSelector((state) => state.reservation.vehicle);

  const {
    image,
    model,
    age,
    airConditioning,
    doors,
    fuelType,
    luggage,
    pricePerHour,
    seats,
    transmission,
  } = vehicle;

  return (
    <Container className="vehicle-details">
      <Row className="g-5">
        <Col md={8}>
          <div className="title">
            <h1>{model}</h1>
            <h3>
              <Badge bg="primary">${pricePerHour}/hour</Badge>
            </h3>
          </div>

          <Card>
            <img src={getVehicleImage(image)} className="img-fluid" alt={model}/>
          </Card>
          <Spacer height={30} />

          <h2>Property Highlights</h2>
          <ul>
            <li>
              <RiCarLine /> Model: {model}
            </li>
            <li>
              <RiCarLine /> Doors: {doors}
            </li>
            <li>
              <MdOutlineAirlineSeatReclineExtra /> Seats: {seats}
            </li>
            <li>
              <RiCaravanLine /> Luggage: {luggage}
            </li>
            <li>
              <GiJoystick /> Transmission: {transmission}
            </li>
            {airConditioning && (
              <li>
                <IoIosSnow /> Air conditioning
              </li>
            )}

            <li>
              <RiGasStationFill /> Fuel Type: {fuelType}
            </li>
            <li>
              <GiCalendarHalfYear /> Age: {age}
            </li>
          </ul>
        </Col>
        <Col md={4}>
          <BookingForm/>
        </Col>
      </Row>
    </Container>
  );
};

export default VehicleDetails;

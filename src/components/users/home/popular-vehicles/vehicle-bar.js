import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import "./vehicle-bar.scss";
import { useRef } from "react";

const VehicleBar = (props) => {
  const { vehicles, activeVehicle, setActiveVehicle } = props;
  const [isEnd, setIsEnd] = useState(false);
  const [isBeginning, setIsBeginning] = useState(true);
  const swiperRef = useRef(null);

  const handlePrev = () => {
    swiperRef.current.swiper.slidePrev();
  };

  const handleNext = () => {
    swiperRef.current.swiper.slideNext();
  };

  const handleChange = (e) => {
    setIsBeginning(e.isBeginning);
    setIsEnd(e.isEnd);
  };

  return (
    <Container className="vehicle-bar">
      <div
        className={`arrow ${isBeginning ? "passive" : ""}`}
        onClick={handlePrev}
      >
        <IoIosArrowDropleft />
      </div>
      <Swiper
        onSlideChange={handleChange}
        ref={swiperRef}
        breakpoints={{
          0: {
            spaceBetween: 10,
            slidesPerView: 1,
          },
          576: {
            spaceBetween: 20,
            slidesPerView: 2,
          },
          768: {
            spaceBetween: 20,
            slidesPerView: 3,
          },
          992: {
            spaceBetween: 20,
            slidesPerView: 5,
          },
          1200: {
            spaceBetween: 20,
            slidesPerView: 6,
          },
        }}
      >
        {vehicles.map((vehicle) => (
          <SwiperSlide
            className={vehicle.id === activeVehicle.id ? "active" : ""}
            onClick={() => setActiveVehicle(vehicle)}
            key={vehicle.id}
          >
            {vehicle.model}
          </SwiperSlide>
        ))}
      </Swiper>
      <div className={`arrow ${isEnd ? "passive" : ""}`} onClick={handleNext}>
        <IoIosArrowDropright />
      </div>
    </Container>
  );
};

export default VehicleBar;

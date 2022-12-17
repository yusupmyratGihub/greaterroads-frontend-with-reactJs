import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import SectionHeader from "../../common/section-header/section-header";
import "./mobile-app.scss";
import btnGoogle from "../../../../assets/img/buttons/google-play.svg";
import btnApple from "../../../../assets/img/buttons/app-store.svg";
import mobileApp from "../../../../assets/img/bg/mobile.png";

const MobileApp = () => {
  return (
    <Container fluid className="mobile-app">
      <Container>
        <Row className="g-5">
          <Col md={6}>
            <SectionHeader
              title="Download our app to get some goodies"
              subTitle="Download now"
              alignment="left"
            />
            <p>
              To be aware of extra discounts, new cars, advantages of membership
              and interact other members please download your mobile
              application. To be aware of extra discounts, new cars, advantages
              of membership, interact other members and so on please download
              your mobile application.
            </p>

            <div className="store">
                <a href="https://play.google.com">
                    <img src={btnGoogle} alt="Download from Google Play" className="img-fluid"/>
                </a>
                <a href="https://apple.com">
                    <img src={btnApple} alt="Download from App Store" className="img-fluid"/>
                </a>
            </div>


          </Col>
          <Col md={6}>
            <img src={mobileApp} alt="Greater Roads Mobile App" className="img-fluid"/>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default MobileApp;

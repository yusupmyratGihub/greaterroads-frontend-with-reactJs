import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Col, Container, Pagination, Row } from "react-bootstrap";
import { getVehiclesByPage } from "../../../api/vehicle-service";
import Loading from "../../common/loading/loading";
import Spacer from "../../common/spacer/spacer";
import SectionHeader from "../common/section-header/section-header";
import VehicleCard from "./vehicle-card";
import "./vehicles.scss";

const Vehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({});

  const loadData = async (page) => {
    try {
      const resp = await getVehiclesByPage(page, 8);
      console.log(resp.data);

      const {
        content,
        numberOfElements,
        size,
        totalElements,
        totalPages,
        pageable,
      } = resp.data;

      setVehicles(content);
      setPagination({
        numberOfElements,
        size,
        totalElements,
        totalPages,
        pageable,
      });
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData(0);
  }, []);

  return (
    <Container>
      <SectionHeader
        title="Vehicle Models"
        subTitle="Lux &amp; Economic"
        desc="To contribute to positive change and achieve our sustainability goals with many extraordinary"
      />
      <Spacer height={30} />

      {loading ? (
        <Loading />
      ) : (
        <>
          <Row className="g-5">
            {vehicles.map((vehicle) => (
              <Col key={vehicle.id} sm={6} md={4} lg={3}>
                <VehicleCard {...vehicle} />

              </Col>
            ))}
          </Row>

          {pagination.totalPages > 1 && (
            <Row className="vehicles-pagination">
              <Pagination>
                <Pagination.First
                  onClick={() => loadData(0)}
                  disabled={pagination.pageable.pageNumber <= 0}
                />
                <Pagination.Prev
                  onClick={() => loadData(pagination.pageable.pageNumber - 1)}
                  disabled={pagination.pageable.pageNumber <= 0}
                />

                {[...Array(pagination.totalPages)].map((item, index) => (
                  <Pagination.Item
                    active={index === pagination.pageable.pageNumber}
                    key={index}
                    onClick={() => loadData(index)}
                  >
                    {index + 1}
                  </Pagination.Item>
                ))}

                <Pagination.Next
                  onClick={() => loadData(pagination.pageable.pageNumber + 1)}
                  disabled={
                    pagination.pageable.pageNumber >= pagination.totalPages - 1
                  }
                />
                <Pagination.Last
                  onClick={() => loadData(pagination.totalPages - 1)}
                  disabled={
                    pagination.pageable.pageNumber >= pagination.totalPages - 1
                  }
                />
              </Pagination>
            </Row>
          )}
        </>
      )}
    </Container>
  );
};

export default Vehicles;

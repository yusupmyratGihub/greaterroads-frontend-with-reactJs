import React, { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getReservations } from "../../../api/reservation-service";
import { formatDateTimeToLLL } from "../../../utils/functions/date-time";
import Loading from "../../common/loading/loading";

const Reservations = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const loadData = async () => {
    setLoading(true);

    try {
      const resp = await getReservations();
      setReservations(resp.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    } finally {
    }
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <Table responsive="lg" bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Vehicle</th>
            <th>Pick-up</th>
            <th>Drop-off</th>
          </tr>
        </thead>
        <tbody>
          {loading && (
            <tr>
              <td colSpan={4}>
                <Loading />
              </td>
            </tr>
          )}

          {reservations.map((reservation, index) => (
            <tr
              key={reservation.id}
              className={
                reservation.status === "CREATED"
                  ? "table-success"
                  : reservation.status === "COMPLETED"
                  ? "table-info"
                  : "table-secondary"
              }
              style={{cursor: "pointer"}}
              onClick={()=> navigate(`/user/reservations/${reservation.id}`)}
            >
              <td>{index + 1}</td>
              <td>{reservation.carId.model}</td>
              <td>
                {reservation.pickUpLocation},{" "}
                {formatDateTimeToLLL(reservation.pickUpTime)}
              </td>
              <td>
                {reservation.dropOffLocation},{" "}
                {formatDateTimeToLLL(reservation.dropOffTime)}
              </td>
            </tr>
          ))}

          {!loading && reservations.length <= 0 && (
            <tr>
              <td colSpan={4}>No reservation</td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default Reservations;

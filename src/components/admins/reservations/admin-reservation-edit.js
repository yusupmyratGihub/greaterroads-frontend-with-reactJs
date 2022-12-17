import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Form,
  Button,
  Row,
  Col,
  ButtonGroup,
  InputGroup,
  Spinner,
} from "react-bootstrap";
import {
  deleteReservationByIdAdmin,
  getReservationByIdAdmin,
  updateReservationByIdAdmin,
} from "../../../api/reservation-service";
import { getVehicles } from "../../../api/vehicle-service";
import {
  combineDateAndTime,
  getDate,
  getTime,
} from "../../../utils/functions/date-time";
import Loading from "../../common/loading/loading";
import { question, toast } from "../../../utils/functions/swal";

const AdminReservationEdit = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [saving, setSaving] = useState(false);
  const { reservationId } = useParams();
  const navigate = useNavigate();

  const [initialValues, setInitialValues] = useState({
    pickUpLocation: "",
    dropOffLocation: "",
    pickUpDate: "",
    pickUpTime: "",
    dropOffDate: "",
    dropOffTime: "",
    carId: "",
    status: "",
    userId: "",
  });

  const validationSchema = Yup.object({
    pickUpLocation: Yup.string().required("Enter the pick up place"),
    dropOffLocation: Yup.string().required("Enter the drop off place"),
    pickUpDate: Yup.string().required("Enter the pick up date"),
    pickUpTime: Yup.string().required("Enter the pick up time"),
    dropOffDate: Yup.string().required("Enter the drop off date"),
    dropOffTime: Yup.string().required("Enter the drop off time"),
    carId: Yup.number().required("Select a car"),
    status: Yup.string().required("Select a status"),
  });

  const onSubmit = async (values) => {
    setSaving(true);

    const {
      pickUpLocation,
      dropOffLocation,
      pickUpDate,
      pickUpTime,
      dropOffDate,
      dropOffTime,
      carId,
      status,
    } = values;

    try {
      const dto = {
        pickUpTime: combineDateAndTime(pickUpDate, pickUpTime),
        dropOffTime: combineDateAndTime(dropOffDate, dropOffTime),
        pickUpLocation,
        dropOffLocation,
        status,
      };

      await updateReservationByIdAdmin(carId, reservationId, dto);
      toast("Reservation updated", "success");
    } catch (err) {
      console.log(err);
      toast(err.response.data.message);
    } finally {
      setSaving(false);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
    enableReinitialize: true,
  });

  const statusData = ["CREATED", "CANCELLED", "DONE"];

  const loadData = async () => {
    setLoading(true);

    try {
      const respReservations = await getReservationByIdAdmin(reservationId);
      const respVehicles = await getVehicles();

      const {
        pickUpLocation,
        dropOffLocation,
        dropOffTime,
        pickUpTime,
        status,
        userId,
        carId,
      } = respReservations.data;

      const dto = {
        pickUpLocation,
        dropOffLocation,
        pickUpDate: getDate(pickUpTime),
        pickUpTime: getTime(pickUpTime),
        dropOffDate: getDate(dropOffTime),
        dropOffTime: getTime(dropOffTime),
        carId: carId.id,
        status: status,
        userId: userId,
      };

      setInitialValues(dto);
      setVehicles(respVehicles.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const removeReservation = async () => {
    setDeleting(true);
    try {
      await deleteReservationByIdAdmin(reservationId);
      toast("Reservation was deleted", "success");
      navigate(-1);
    } catch (err) {
      toast(err.response.data.message, "error");
    } finally {
      setDeleting(false);
    }
  };

  const handleDelete = () => {
    question(
      "Are you sure to delete?",
      "You won't be able to revert this!"
    ).then((result) => {
      if (result.isConfirmed) {
        removeReservation();
      }
    });
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <Form noValidate onSubmit={formik.handleSubmit}>
      <fieldset disabled={initialValues.builtIn}>
        <Row>
          <Form.Group as={Col} md={6} lg={4} className="mb-3">
            <Form.Label>Pick-Up Location</Form.Label>
            <Form.Control
              type="text"
              {...formik.getFieldProps("pickUpLocation")}
              isInvalid={
                formik.touched.pickUpLocation && formik.errors.pickUpLocation
              }
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.pickUpLocation}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md={6} lg={4} className="mb-3">
            <Form.Label>Drop-off Location</Form.Label>
            <Form.Control
              type="text"
              {...formik.getFieldProps("dropOffLocation")}
              isInvalid={
                formik.touched.dropOffLocation && formik.errors.dropOffLocation
              }
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.dropOffLocation}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md={6} lg={4} className="mb-3">
            <Form.Label>Pick Up Time</Form.Label>
            <InputGroup className="mb-3">
              <Form.Control
                type="date"
                {...formik.getFieldProps("pickUpDate")}
                isInvalid={
                  formik.touched.pickUpDate && formik.errors.pickUpDate
                }
              />
              <Form.Control
                type="time"
                {...formik.getFieldProps("pickUpTime")}
                isInvalid={
                  formik.touched.pickUpTime && formik.errors.pickUpTime
                }
              />
            </InputGroup>
            <Form.Control.Feedback type="invalid">
              {formik.errors.pickUpDate || formik.errors.pickUpTime}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md={6} lg={4} className="mb-3">
            <Form.Label>Drop Off Time</Form.Label>
            <InputGroup className="mb-3">
              <Form.Control
                type="date"
                {...formik.getFieldProps("dropOffDate")}
                isInvalid={
                  formik.touched.dropOffDate && formik.errors.dropOffDate
                }
              />
              <Form.Control
                type="time"
                {...formik.getFieldProps("dropOffTime")}
                isInvalid={
                  formik.touched.dropOffTime && formik.errors.dropOffTime
                }
              />
            </InputGroup>
            <Form.Control.Feedback>
              {formik.errors.dropOffDate || formik.errors.dropOffTime}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md={6} lg={4} className="mb-3">
            <Form.Label>Vehicle</Form.Label>
            <Form.Select
              {...formik.getFieldProps("carId")}
              isInvalid={formik.touched.carId && formik.errors.carId}
            >
              {vehicles.map((vehicle) => (
                <option value={vehicle.id} key={vehicle.id}>
                  {vehicle.model}
                </option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {formik.errors.carId}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md={6} lg={4} className="mb-3">
            <Form.Label>Status</Form.Label>
            <Form.Select
              {...formik.getFieldProps("status")}
              isInvalid={formik.touched.status && formik.errors.status}
            >
              {statusData.map((status, index) => (
                <option key={index} value={status}>
                  {status}
                </option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {formik.errors.status}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md={6} lg={4} className="mb-3">
            <Form.Label>Customer</Form.Label>
            <div>
              <Link to={`/admin/users/${initialValues.userId}`}>
                Get Customer
              </Link>
            </div>
          </Form.Group>
        </Row>
      </fieldset>

      <div className="text-end">
        <ButtonGroup aria-label="Basic example">
          <Button variant="primary" type="submit" disabled={saving}>
            {saving && <Spinner animation="border" size="sm" />} Save
          </Button>
          <Button
            variant="secondary"
            type="button"
            onClick={() => navigate(-1)}
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            type="button"
            onClick={handleDelete}
            disabled={deleting}
          >
            {deleting && <Spinner animation="border" size="sm" />} Delete
          </Button>
        </ButtonGroup>
      </div>
    </Form>
  );
};

export default AdminReservationEdit;

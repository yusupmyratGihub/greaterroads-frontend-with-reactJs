import React, { useState, useRef, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Form,
  Button,
  Row,
  Col,
  ButtonGroup,
  Badge,
  Spinner,
  Alert,
} from "react-bootstrap";
import "./admin-vehicle.scss";
import {
  deleteVehicleById,
  deleteVehicleImage,
  getVehicle,
  updateVehicle,
  uploadVehicleImage,
} from "../../../api/vehicle-service";
import { question, toast } from "../../../utils/functions/swal";
import { useNavigate, useParams } from "react-router-dom";
import { getVehicleImage } from "../../../utils/functions/vehicle";
import Loading from "../../common/loading/loading";

let isImageChanged = false;

const AdminVehicleEdit = () => {
  const [imageSrc, setImageSrc] = useState("");
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [loading, setLoading] = useState(false);
  const fileImageRef = useRef();
  const navigate = useNavigate();
  const { vehicleId } = useParams();

  const [initialValues, setInitialValues] = useState({
    model: "",
    doors: "",
    seats: "",
    luggage: "",
    transmission: "",
    airConditioning: "",
    fuelType: "",
    age: "",
    pricePerHour: "",
    image: "",
  });

  const validationSchema = Yup.object({
    model: Yup.string().required("Please enter the model"),
    doors: Yup.number().required("Please enter the number of doors"),
    seats: Yup.number().required("Please enter the number of seats"),
    luggage: Yup.number().required("Please enter the luggage capacity"),
    transmission: Yup.string().required("Please enter type of transmission"),
    airConditioning: Yup.string().required(
      "Please enter whether air conditioning exists"
    ),
    fuelType: Yup.string().required("Please enter type of fuel"),
    age: Yup.number().required("Please enter age of car"),
    pricePerHour: Yup.number().required("Please enter price per hour"),
    image: Yup.mixed().required("Please select an image"),
  });

  const onSubmit = async (values) => {
    setSaving(true);

    try {
      let imageId = values.image[0];

      // isImageChanged görüntü değiştirildiğinde true olacak
      if (isImageChanged) {
        // Mevcut image database den siliniyor
        await deleteVehicleImage(imageId);

        const newImageFile = fileImageRef.current.files[0];
        const formData = new FormData();
        formData.append("file", newImageFile);

        const resp = await uploadVehicleImage(formData);
        imageId = resp.data.imageId;
        isImageChanged = false;
      }

      const payload = { ...values };
      delete payload.image;

      await updateVehicle(imageId, vehicleId, payload);
      toast("Vehicle was updated", "success");
    } catch (err) {
      console.log(err);
      toast(err.response.data.message, "error");
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

  const handleSelectImage = () => {
    fileImageRef.current.click();
  };
  const handleImageChange = () => {
    const file = fileImageRef.current.files[0];
    if (!file) return;

    const reader = new FileReader(); //Seçilen görüntüyü ekrana yerleştirdik
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImageSrc(reader.result);
    };

    isImageChanged = true;
  };

  const loadData = async () => {
    setLoading(true);

    try {
      const resp = await getVehicle(vehicleId);
      setInitialValues(resp.data);
      setImageSrc(getVehicleImage(resp.data.image));
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const removeVehicle = async () => {
    setDeleting(true);
    try {
      await deleteVehicleById(vehicleId);
      toast("Vehicle was deleted", "success");
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
        removeVehicle();
      }
    });
  };

  const isError = (field) => {
    return formik.touched[field] && formik.errors[field];
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
          <Col xl={3} className="image-area">
            <Form.Control
              type="file"
              name="image"
              className="d-none"
              onChange={handleImageChange}
              ref={fileImageRef}
            />
            <img src={imageSrc} className="img-fluid" alt="..."/>
            {formik.errors.image && (
              <Badge bg="danger" className="image-area-error">
                Please select an image
              </Badge>
            )}
            <Button
              variant={formik.errors.image ? "danger" : "primary"}
              onClick={handleSelectImage}
            >
              Select Image
            </Button>
          </Col>
          <Col xl={9}>
            <Row>
              <Form.Group as={Col} md={4} lg={3} className="mb-3">
                <Form.Label>Model</Form.Label>
                <Form.Control
                  type="text"
                  {...formik.getFieldProps("model")}
                  className={isError("model") && "is-invalid"}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.model}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md={4} lg={3} className="mb-3">
                <Form.Label>Doors</Form.Label>
                <Form.Control
                  type="number"
                  {...formik.getFieldProps("doors")}
                  className={isError("doors") && "is-invalid"}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.doors}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md={4} lg={3} className="mb-3">
                <Form.Label>Seats</Form.Label>
                <Form.Control
                  type="number"
                  {...formik.getFieldProps("seats")}
                  className={isError("seats") && "is-invalid"}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.seats}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md={4} lg={3} className="mb-3">
                <Form.Label>Luggage</Form.Label>
                <Form.Control
                  type="number"
                  {...formik.getFieldProps("luggage")}
                  className={isError("luggage") && "is-invalid"}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.luggage}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md={4} lg={3} className="mb-3">
                <Form.Label>Transmission</Form.Label>
                <Form.Select
                  {...formik.getFieldProps("transmission")}
                  className={isError("transmission") && "is-invalid"}
                >
                  <option>Select</option>
                  <option value="Automatic">Automatic</option>
                  <option value="Manuel">Manuel</option>
                  <option value="Tiptronic">Tiptronic</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {formik.errors.transmission}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md={4} lg={3} className="mb-3">
                <Form.Label>Air Conditioning</Form.Label>
                <Form.Select
                  {...formik.getFieldProps("airConditioning")}
                  className={isError("airConditioning") && "is-invalid"}
                >
                  <option>Select</option>
                  <option value={true}>Yes</option>
                  <option value={false}>No</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {formik.errors.airConditioning}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md={4} lg={3} className="mb-3">
                <Form.Label>Fuel Type</Form.Label>
                <Form.Select
                  {...formik.getFieldProps("fuelType")}
                  className={isError("fuelType") && "is-invalid"}
                >
                  <option>Select</option>
                  <option value="Electricity">Electricity</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="Gasoline">Gasoline</option>
                  <option value="Diesel">Diesel</option>
                  <option value="Hydrogen">Hydrogen</option>
                  <option value="LPG">LPG</option>
                  <option value="CNG">CNG</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {formik.errors.fuelType}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md={4} lg={3} className="mb-3">
                <Form.Label>Age</Form.Label>
                <Form.Control
                  type="number"
                  {...formik.getFieldProps("age")}
                  className={isError("age") && "is-invalid"}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.age}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md={4} lg={3} className="mb-3">
                <Form.Label>Price Per Hour</Form.Label>
                <Form.Control
                  type="number"
                  {...formik.getFieldProps("pricePerHour")}
                  className={isError("pricePerHour") && "is-invalid"}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.pricePerHour}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
          </Col>
        </Row>
      </fieldset>
      
      {initialValues.builtIn && (
        <Alert variant="danger" className="mt-5">
          Built-in vehicles can not be deleted and updated
        </Alert>
      )}

      <div className="text-end">
        <ButtonGroup aria-label="Basic example">
          <Button
            variant="secondary"
            type="button"
            onClick={() => navigate(-1)}
          >
            Cancel
          </Button>
          {!initialValues.builtIn && (
            <>
              <Button variant="primary" type="submit" disabled={saving}>
                {saving && <Spinner animation="border" size="sm" />} Update
              </Button>
              <Button
                variant="danger"
                type="button"
                disabled={deleting}
                onClick={handleDelete}
              >
                {deleting && <Spinner animation="border" size="sm" />} Delete
              </Button>
            </>
          )}
        </ButtonGroup>
      </div>
    </Form>
  );
};

export default AdminVehicleEdit;

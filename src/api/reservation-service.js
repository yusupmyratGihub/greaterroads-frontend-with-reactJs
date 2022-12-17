import axios from "axios";
import { settings } from "../utils/settings";
import authHeader from "./auth-header";

const API_URL = settings.apiURL;

export const isVehicleAvailable = (dto) => {
  const { carId, pickUpDateTime, dropOffDateTime } = dto;

  return axios.get(
    `${API_URL}/reservations/auth?carId=${carId}&pickUpDateTime=${pickUpDateTime}&dropOffDateTime=${dropOffDateTime}`,
    { headers: authHeader() }
  );
};

export const createReservation = (carId, reservation) => {
  return axios.post(`${API_URL}/reservations/add?carId=${carId}`, reservation, {
    headers: authHeader(),
  });
};

export const getReservations = () => {
  return axios.get(`${API_URL}/reservations/auth/all`, {
    headers: authHeader(),
  });
};

export const getReservation = (id) => {
  return axios.get(`${API_URL}/reservations/${id}/auth`, {
    headers: authHeader(),
  });
};

/* ADMIN SERVICES */

export const getReservationsAdmin = () => {
  return axios.get(`${API_URL}/reservations/admin/all`, {
    headers: authHeader(),
  });
};

export const getReservationByIdAdmin = (id) => {
  return axios.get(`${API_URL}/reservations/${id}/admin`, {
    headers: authHeader(),
  });
};

export const updateReservationByIdAdmin = (
  carId,
  reservationId,
  reservation
) => {
  return axios.put(
    `${API_URL}/reservations/admin/auth?carId=${carId}&reservationId=${reservationId}`,
    reservation,
    {
      headers: authHeader(),
    }
  );
};

export const deleteReservationByIdAdmin = (id) => {
  return axios.delete(`${API_URL}/reservations/admin/${id}/auth`, {
    headers: authHeader(),
  });
};

export const downloadReservations = () => {
  return axios.get(`${API_URL}/excel/download/reservations`, {
    headers: {
      ...authHeader(),
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    },
    responseType: "blob",
  });
};

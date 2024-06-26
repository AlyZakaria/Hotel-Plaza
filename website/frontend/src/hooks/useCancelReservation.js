import { useEffect } from "react";
import axios from "../Apis/axios";
const useCancelReservation = (
  cancel,
  setCancel,

  reservations,
  reservation,
  setReservations
) => {
  const cancelReservation = async () => {
    try {
      const cancelled = await axios.post(`/cancel-reservation`, {
        reservationId: reservation.id,
      });
    } catch (error) {
    } finally {
    }
  };
  useEffect(() => {
    if (cancel) cancelReservation();
  }, [cancel]);
};

export default useCancelReservation;

import { useEffect } from "react";
import axios from "../Apis/axios";
import { toast } from "react-toastify";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const useCancelReservation = (
  cancel,
  setCancel,
  reservations,
  reservation,
  setReservations
) => {
  const cancelReservation = async () => {
    try {
      // set token
      let token = JSON.parse(sessionStorage.getItem("token"));
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      console.log(reservation.id);
      const response = await axios.post(`/api/cancel-reservation`, {
        reservationId: reservation.id,
      });

      if (response.status === 200) {
        console.log("Cancelled reservation", reservation.id);

        toast.success("Reservation cancelled", {
          icon: <CheckCircleIcon sx={{ color: "green" }} />,
          hideProgressBar: true,
          autoClose: 1000,
          theme: "light",
        });
        window.location.reload();
      }
    } catch (error) {
    } finally {
      setCancel(false);
    }
  };
  useEffect(() => {
    if (cancel) cancelReservation();
  }, [cancel]);
};

export default useCancelReservation;

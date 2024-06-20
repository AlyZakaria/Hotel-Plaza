import URLS from "../Apis/URLS.json";
import { useEffect } from "react";
import axios from "../Apis/axios";

const useAddReview = (
  setSubmitted,
  submitted,
  room,
  reservations,
  setReservations,
  rating,
  comment,
  roomId
) => {
  const addReview = async () => {
    try {
      // set token
      let token = JSON.parse(sessionStorage.getItem("token"));
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const response = await axios.post(`${URLS.addReview}`, {
        rating: rating,
        comment: comment,
        roomTypeId: roomId,
      });
      if (response.status === 201) {
        console.log("Review added successfully");
        // Add review to the roomType object
        let roomType = room.room;
        roomType.reviews = [
          {
            // Add the new review
            rating: rating,
            comment: comment,
          },
        ];
        room.room = roomType;
        // refresh the page
        window. location.reload();

        setReservations([...reservations]);
      }
    } catch (error) {
      console.error("Error adding review:", error);
    } finally {
      setSubmitted(false);
    }
  };
  useEffect(() => {
    if (submitted) addReview();
  });
};

export default useAddReview;

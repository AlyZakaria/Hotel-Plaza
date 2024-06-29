import { useEffect } from "react";
import axios from "../Apis/axios";
import URLS from "../Apis/URLS.json";

const useDeleteRoomType = (
  deleteBtn,
  setDeleteBtn,
  roomTypes,
  setRoomTypes,
  deleteIndex
) => {
  const deleteRoomType = async () => {
    try {
      let response = await axios.delete(
        `${URLS.deleteRoomType}?id=${roomTypes[deleteIndex].id}`
      );
      if (response.status === 200) {
        let newRoomTypes = roomTypes.filter(
          (type) => type.id !== roomTypes[deleteIndex].id
        );
        setRoomTypes(newRoomTypes);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setDeleteBtn(false);
    }
  };
  useEffect(() => {
    if (deleteBtn) {
      deleteRoomType();
    }
  }, [deleteBtn]);
};

export default useDeleteRoomType;

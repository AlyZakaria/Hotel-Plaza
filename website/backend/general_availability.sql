WITH cte AS ( 
    SELECT 
    roomtype.name AS roomtype,
    (roomtype.count - COUNT(booking.roomId)) as available 
    FROM booking 
    JOIN reservations ON reservations.id = booking.reservationId
    JOIN room ON booking.roomId = room.room_id
    JOIN roomtype ON room.typeId = roomtype.id
    WHERE ((reservations.checkin BETWEEN '2021-12-01' AND '2021-12-07' OR reservations.checkout BETWEEN '2021-12-01' AND '2021-12-07')
    OR (reservations.checkin <= '2021-12-01' AND reservations.checkout >= '2021-12-07'))
    AND booking.status != 'cancelled'
--     AND roomtype.name = "sea"
    GROUP BY (room.typeId)
)
SELECT * FROM cte

UNION

SELECT roomtype.name, COUNT(room.room_id)
FROM roomtype
JOIN room ON roomtype.id = room.typeId
WHERE roomtype.name NOT IN(SELECT roomtype FROM cte)
AND room.status != 'out_of_service'

-- AND roomtype.name = 'sea'
GROUP BY (roomtype.name)
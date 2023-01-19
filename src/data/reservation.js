import { encodeObject, filterRelation } from "../util.js";
import { get } from "./api.js";

const endpoints = {
    'reservationsByRoomId': (roomId) => '/classes/Reservation?where=' + encodeObject(filterRelation('room', 'Room', roomId))
};

export async function getByRoomId(roomId){
    return get(endpoints.reservationsByRoomId(roomId));
}
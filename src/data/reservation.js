import { addOwner, encodeObject, filterRelation } from "../util.js";
import { get, post } from "./api.js";

const endpoints = {
    'reservationsByRoomId': (roomId) => '/classes/Reservation?where=' + encodeObject(filterRelation('room', 'Room', roomId)),
    'reservations': '/classes/Reservation',
};

export async function getByRoomId(roomId){
    return get(endpoints.reservationsByRoomId(roomId));
}

export async function create(roomData, userId) {
    return post(endpoints.reservations, addOwner(roomData, userId))
}
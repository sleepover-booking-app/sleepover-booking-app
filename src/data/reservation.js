import { addOwner, createPointer, encodeObject, filterRelation } from "../util.js";
import { get, post } from "./api.js";

const endpoints = {
    'reservationsByRoomId': (roomId) => '/classes/Reservation?where=' + encodeObject(filterRelation('room', 'Room', roomId)),
    'reservations': '/classes/Reservation',
};

export async function getByRoomId(roomId){
    return get(endpoints.reservationsByRoomId(roomId));
}

export async function create(roomData, roomId, userId) {
    roomData = addOwner(roomData, userId);
    roomData.room = createPointer('Room', roomId);
    return post(endpoints.reservations, roomData);
}
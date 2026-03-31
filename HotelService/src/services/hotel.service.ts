import { createHotelDTO, updateHotelDTO } from "../dto/hotel.dto";
import { createHotel, getHotelById , getAllHotels, softDeleteHotel, updateHotel } from "../repositories/hotel.repository";

export async function createHotelService(hotelData: createHotelDTO) {
    const hotel = await createHotel(hotelData);
    return hotel;
}

export async function getHotelByIdService(id: number) {
    const hotel = await getHotelById(id);
    return hotel;
}

export async function updateHotelService(id: number, hotelData: updateHotelDTO) {
    const hotel = await updateHotel(id, hotelData);
    return hotel;
}

export async function getAllHotelsService() {
    const hotels = await getAllHotels();
    return hotels;
}

export async function softDeleteHotelService(id: number) {
    const response= await softDeleteHotel(id);
    return response;
}
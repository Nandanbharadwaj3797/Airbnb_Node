import logger from "../config/logger.config";
import Hotel from "../db/models/hotel";
import { createHotelDTO, updateHotelDTO } from "../dto/hotel.dto";
import { NotFoundError } from "../utils/errors/app.error";

export async function createHotel(hotelData: createHotelDTO) {
    const hotel = await Hotel.create({
        name: hotelData.name,
        address: hotelData.address,
        location: hotelData.location,
        rating: hotelData.rating,
        ratingCount: hotelData.ratingCount,
    });

    logger.info(`Hotel created: ${hotel.id}`);

    return hotel;
}

export async function getHotelById(id: number) {
    const hotel = await Hotel.findOne({
        where: {
            id,
            deletedAt: null,
        },
    });

    if (!hotel) {
        logger.error(`Hotel not found: ${id}`);
        throw new NotFoundError(`Hotel with id ${id} not found`);
    }

    logger.info(`Hotel found: ${hotel.id}`);

    return hotel;
}

export async function updateHotel(id: number, hotelData: updateHotelDTO) {
    const hotel = await Hotel.findOne({
        where: {
            id,
            deletedAt: null,
        },
    });

    if (!hotel) {
        logger.error(`Hotel not found: ${id}`);
        throw new NotFoundError(`Hotel with id ${id} not found`);
    }

    await hotel.update(hotelData);
    logger.info(`Hotel updated: ${hotel.id}`);

    return hotel;
}

export async function getAllHotels() {
    const hotels = await Hotel.findAll({
        where: {
            deletedAt: null, // Only fetch hotels that are not soft-deleted
        },
    });

    logger.info(`Hotels found: ${hotels.length}`);
    return hotels;
}

export async function softDeleteHotel(id: number) {
    const hotel = await Hotel.findOne({
        where: {
            id,
            deletedAt: null,
        },
    });
    if (!hotel) {
        logger.error(`Hotel not found: ${id}`);
        throw new NotFoundError(`Hotel with id ${id} not found`);
    }

    hotel.deletedAt = new Date();
    await hotel.save();
    logger.info(`Hotel soft deleted: ${hotel.id}`);
    return true;
}
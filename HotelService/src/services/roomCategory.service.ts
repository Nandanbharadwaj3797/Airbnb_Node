import { createRoomCategoryDTO } from "../dto/roomCategory.dto";
import {RoomCategoryRepository} from "../repositories/roomCategory.repository";
import {HotelRepository} from "../repositories/hotel.repository";
import { NotFoundError } from "../utils/errors/app.error";

const rooCategoryRepository =new RoomCategoryRepository();

const hotelRepository = new HotelRepository();

export async function createRoomCategoryServuce(createRoomCategoryDTO:createRoomCategoryDTO){
    const roomCategory = await rooCategoryRepository.create(createRoomCategoryDTO);
    return roomCategory;
}


export async function getRoomCategoriesByIdService(id:number){
    const roomCategories = await rooCategoryRepository.findById(id);
    return roomCategories;
}

export async function getAllRoomCategoriesByHotelIdService(hotelId:number){

    const hotel = await hotelRepository.findById(hotelId);
    if(!hotel){
        throw new NotFoundError("Hotel with id "+hotelId+" not found");
    }
    const roomCategories = await rooCategoryRepository.findAllByHotelId(hotelId);
    return roomCategories;
    
}

export async function deleteRoomCategoryService(id: number) {
    const roomCategory = await rooCategoryRepository.findById(id);
    if(!roomCategory){
        throw new NotFoundError("Room category with id "+id+" not found");
    }
    await rooCategoryRepository.delete({id});
    return roomCategory;
}
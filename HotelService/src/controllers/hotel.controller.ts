import { Request, Response, NextFunction } from "express";
import { createHotelService, getAllHotelsService, getHotelByIdService,softDeleteHotelService, updateHotelService } from "../services/hotel.service";
import { StatusCodes } from "http-status-codes";

export async function createHotelHandler(req: Request, res: Response, next: NextFunction) {
    // 1. Call the service layer

    const hotelResponse = await createHotelService(req.body);

    // 2. Send the response

    res.status(StatusCodes.CREATED).json({
        message: "Hotel created successfully",
        data: hotelResponse,
        success: true,
    })
}

export async function getHotelByIdHandler(req: Request, res: Response, next: NextFunction) {
    // 1. Call the service layer

    const hotelResponse = await getHotelByIdService(Number(req.params.id));

    // 2. Send the response

    res.status(StatusCodes.OK).json({
        message: "Hotel found successfully",
        data: hotelResponse,
        success: true,
    })
}

export async function updateHotelHandler(req: Request, res: Response, next: NextFunction) {
    // 1. Call the service layer
    const hotelResponse = await updateHotelService(Number(req.params.id), req.body);

    // 2. Send the response
    res.status(StatusCodes.OK).json({
        message: "Hotel updated successfully",
        data: hotelResponse,
        success: true,
    })
}

export async function getAllHotelsHandler(req: Request, res: Response, next: NextFunction) {
    // 1. Call the service layer
    const hotelsResponse = await getAllHotelsService();

    // 2. Send the response
    res.status(StatusCodes.OK).json({
        message: "Hotels found successfully",
        data: hotelsResponse,
        success: true,
    });
}

export async function softDeleteHotelHandler(req: Request, res: Response, next: NextFunction) {
    // 1. Call the service layer
    const response = await softDeleteHotelService(Number(req.params.id));

    // 2. Send the response
    res.status(StatusCodes.OK).json({
        message: "Hotel soft deleted successfully",
        data: response,
        success: true,
    });
}
import express from 'express';
import { createHotelHandler, getHotelByIdHandler, getAllHotelsHandler, softDeleteHotelHandler } from '../../controllers/hotel.controller';
import { validateRequestBody, validateParams } from '../../validators';
import { hotelSchema, hotelIdParamSchema, } from '../../validators/hotel.validator';

const hotelRouter = express.Router();

hotelRouter.post(
    '/', 
    validateRequestBody(hotelSchema),
    createHotelHandler);

hotelRouter.get('/:id', 
    validateParams(hotelIdParamSchema),
    getHotelByIdHandler);

hotelRouter.get('/',
    getAllHotelsHandler);

hotelRouter.delete('/:id', 
    validateParams(hotelIdParamSchema),
    softDeleteHotelHandler);

export default hotelRouter;
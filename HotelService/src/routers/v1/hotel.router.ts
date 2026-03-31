import express from 'express';
import { createHotelHandler, getHotelByIdHandler, getAllHotelsHandler, softDeleteHotelHandler, updateHotelHandler } from '../../controllers/hotel.controller';
import { validateRequestBody, validateParams } from '../../validators';
import { hotelSchema, hotelIdParamSchema, hotelUpdateSchema } from '../../validators/hotel.validator';

const hotelRouter = express.Router();

hotelRouter.post(
    '/', 
    validateRequestBody(hotelSchema),
    createHotelHandler);

hotelRouter.get('/:id', 
    validateParams(hotelIdParamSchema),
    getHotelByIdHandler);

hotelRouter.put('/:id',
    validateParams(hotelIdParamSchema),
    validateRequestBody(hotelUpdateSchema),
    updateHotelHandler);

hotelRouter.patch('/:id',
    validateParams(hotelIdParamSchema),
    validateRequestBody(hotelUpdateSchema),
    updateHotelHandler);

hotelRouter.get('/',
    getAllHotelsHandler);

hotelRouter.delete('/:id', 
    validateParams(hotelIdParamSchema),
    softDeleteHotelHandler);

export default hotelRouter;
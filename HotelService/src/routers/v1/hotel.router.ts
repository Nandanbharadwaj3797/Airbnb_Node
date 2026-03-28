import express from 'express';
import { createHotelHandler, getHotelByIdHandler } from '../../controllers/hotel.controller';
import { validateRequestBody, validateParams } from '../../validators';
import { hotelSchema, hotelIdParamSchema } from '../../validators/hotel.validator';

const hotelRouter = express.Router();

hotelRouter.post(
    '/', 
    validateRequestBody(hotelSchema),
    createHotelHandler);

hotelRouter.get('/:id', 
    validateParams(hotelIdParamSchema),
    getHotelByIdHandler);

export default hotelRouter;
import { z } from "zod";

// Schema for creating/updating hotels
export const hotelSchema = z.object({
    name: z.string().min(1, "Hotel name is required").max(255, "Hotel name must be less than 255 characters"),
    address: z.string().min(1, "Address is required").max(500, "Address must be less than 500 characters"),
    location: z.string().min(1, "Location is required").max(255, "Location must be less than 255 characters"),
    rating: z.number().min(0, "Rating must be at least 0").max(5, "Rating must not exceed 5").optional(),
    ratingCount: z.number().min(0, "Rating count must be non-negative").int("Rating count must be an integer").optional(),
});

// Schema for partial updates
export const hotelUpdateSchema = hotelSchema.partial();

// Schema for validating ID parameters
export const hotelIdParamSchema = z.object({
    id: z.string().refine((val) => !isNaN(Number(val)), {
        message: "ID must be a valid number",
    }),
});
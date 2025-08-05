import { z } from "zod";

export const EntityValidator_Lenght_4 = z.tuple([
    z.strictObject({
        offset: z.number(),
        length: z.number(),
        type: z.string(),
    }),
    z.strictObject({
        offset: z.number(),
        length: z.number(),
        type: z.string(),
    }),
    z.strictObject({
        offset: z.number(),
        length: z.number(),
        type: z.string(),
    }),
    z.strictObject({
        offset: z.number(),
        length: z.number(),
        type: z.string(),
        url: z.url({ hostname: /app\.rhmt\.uz/ }),
    }),
]);
export type EntityValidator_Lenght_4_Type = z.infer<typeof EntityValidator_Lenght_4>;

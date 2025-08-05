import { z } from "zod";

export const ForwardMetaValidator = z.strictObject({
    id: z.number(),
    is_bot: z.literal(true),
    first_name: z.string(),
    username: z.literal("RahmatRobot"),
});
export type ForwardMetaValidatorType = z.infer<typeof ForwardMetaValidator>;

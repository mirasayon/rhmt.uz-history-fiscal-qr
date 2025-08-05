import { Message } from "telegraf/types";
import { ForwardMetaValidator } from "./forwarded-text.js";
import { forward_metadataType } from "#/types/bot.js";

export const Validator = async (ctx: any, next: () => Promise<void>) => {
    const msg = ctx.message as unknown as Message.TextMessage & forward_metadataType;
    const forward_metadata = msg.forward_from;
    if (!msg.entities) {
        return;
    }
    if (!forward_metadata) {
        return;
    }
    const metaValidated = await ForwardMetaValidator.safeParseAsync(forward_metadata);
    if (!metaValidated.success) {
        return;
    }
    return await next();
};

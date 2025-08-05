import { forMsgType3L } from "#/common/for-message-type-3-lenght.js";
import { forMsgType4L } from "#/common/for-message-type-4-lenght.js";
import { Env } from "#/configs/environment.js";
import { ImATeapot } from "#/configs/settings.js";
import { NeededCtx } from "#/types/app.js";
import { forward_metadataType } from "#/types/bot.js";
import { Validator } from "#/validators/request.js";
import { Telegraf } from "telegraf";
import { message } from "telegraf/filters";
import { Message } from "telegraf/types";

const bot = new Telegraf(Env.bot_token, {});
bot.use(async (ctx, next) => {
    if (!ctx.from) {
        return;
    }
    if (ctx.from.username === Env.for_username) {
        return await next();
    }
});
bot.start((ctx) => ctx.reply(ImATeapot));

bot.on(message("forward_origin"), Validator, async (ctx) => {
    const msg = ctx.message as unknown as Required<Message.TextMessage> & forward_metadataType;

    if (msg.entities.length === 3) {
        return await forMsgType3L(ctx as NeededCtx);
    }
    if (msg.entities.length === 4) {
        return await forMsgType4L(ctx as NeededCtx);
    }
});
bot.launch({});
console.log("Bot started");

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));

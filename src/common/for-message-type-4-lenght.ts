import { EntityValidator_Lenght_4 } from "#/validators/entity-length-4.js";
import { Context, Input, NarrowedContext } from "telegraf";
import { MakeItEasy } from "./make-it-easy.js";
import { dirname } from "path";
import { deleteFolderLazy } from "#/utils/common.js";
import { Message, Update } from "telegraf/types";

export async function forMsgType4L(
    ctx: NarrowedContext<Context<Update>, Update.MessageUpdate<Record<"forward_origin", {}> & Message.TextMessage>>,
) {
    const z = await EntityValidator_Lenght_4.safeParseAsync(ctx.message.entities);
    if (!z.success) {
        return;
    }
    const { final_path, segment, target } = await MakeItEasy(z.data[3].url);
    await ctx.replyWithPhoto(Input.fromLocalFile(final_path, `${segment}.png`), {
        caption: target,
    });
    deleteFolderLazy(dirname(final_path));
    return;
}

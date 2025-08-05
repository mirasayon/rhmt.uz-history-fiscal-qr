import { Context, NarrowedContext } from "telegraf";
import { Message, Update } from "telegraf/types";

export type Doit_ReturnType = Promise<{
    /** downloaded qr code path */
    final_path: string;
    /** Soliq segment of URL */
    segment: string;
    target: string;
}>;

export type NeededCtx = NarrowedContext<
    Context<Update>,
    Update.MessageUpdate<Record<"forward_origin", {}> & Message.TextMessage>
>;

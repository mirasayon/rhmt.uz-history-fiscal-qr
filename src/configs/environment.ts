import { env } from "node:process";

const required_env_variables = ["BOT_ACCESS_TOKEN", "FOR_USERNAME"];

/** Environment variables configuration */
export const Env = new (class EnvironmentClass {
    constructor() {
        for (const _var of required_env_variables) {
            if (!Object.hasOwn(env, _var)) {
                throw new Error(`Environment variable: "${_var}" is required`);
            }
        }
    }
    for_username = env.FOR_USERNAME as string;
    /** Bot token */
    bot_token = env.BOT_ACCESS_TOKEN as string;
})();


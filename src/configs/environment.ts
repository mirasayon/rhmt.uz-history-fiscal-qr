import { env } from "node:process";

const required_env_variables = ["BOT_ACCESS_TOKEN"];

const check = () => {
    for (const _var of required_env_variables) {
        if (!Object.hasOwn(env, _var)) {
            throw new Error(`Environment variable: "${_var}" is required`);
        }
    }
};
check();
export const forUser = env.FOR_USERNAME ?? null;
/** Bot token */
export const botToken = env.BOT_ACCESS_TOKEN as string;


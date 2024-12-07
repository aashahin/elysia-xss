import {Elysia} from "elysia";
import xss from "xss";

export type ElysiaXSS = {
    as?: "global" | "scoped" | "local";
}

export const elysiaXSS = ({as}: ElysiaXSS) => new Elysia()
    .derive({as: as || "global"}, ({body}) => {
        if (body && typeof body === 'object') {
            // Recursively sanitize object properties
            const sanitizeObject = (obj: any): any => {
                if (Array.isArray(obj)) {
                    return obj.map(item => sanitizeObject(item));
                }
                if (typeof obj === 'object' && obj !== null) {
                    const sanitized: any = {};
                    for (const [key, value] of Object.entries(obj)) {
                        sanitized[key] = sanitizeObject(value);
                    }
                    return sanitized;
                }
                if (typeof obj === 'string') {
                    return xss(obj);
                }
                return obj;
            };

            return {
                body: sanitizeObject(body)
            };
        }
        return {};
    })
export type Json = string | number | boolean | JsonObject | JsonArray

export interface JsonObject {
    [key: string]: Json
}

export interface JsonArray extends Array<Json> {}

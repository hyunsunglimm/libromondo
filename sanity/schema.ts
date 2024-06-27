import { type SchemaTypeDefinition } from "sanity";
import { user } from "./schemas/user";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [user],
};

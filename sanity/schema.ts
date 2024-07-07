import { type SchemaTypeDefinition } from "sanity";
import { user } from "./schemas/user";
import { book } from "./schemas/book";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [user, book],
};

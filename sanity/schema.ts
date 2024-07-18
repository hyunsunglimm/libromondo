import { type SchemaTypeDefinition } from "sanity";
import { user } from "./schemas/user";
import { book } from "./schemas/book";
import { review } from "./schemas/review";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [user, book, review],
};

import { client } from "@/sanity/lib/client";

export function addUser(id: string, name: string, image: string) {
  return client.createIfNotExists({
    _id: id,
    _type: "user",
    name,
    image,
  });
}

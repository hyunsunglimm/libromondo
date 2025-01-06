export type SanityUser = {
  id: string;
  name: string;
  image: string;
  following: SimpleUser[];
  followers: SimpleUser[];
};

export type SimpleUser = Pick<SanityUser, "id" | "name" | "image">;

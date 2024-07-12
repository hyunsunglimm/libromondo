export const user = {
  title: "User",
  name: "user",
  type: "document",
  fields: [
    {
      title: "Name",
      name: "name",
      type: "string",
    },
    {
      title: "Image",
      name: "image",
      type: "string",
    },
    {
      title: "Books",
      name: "books",
      type: "array",
      of: [{ type: "book" }],
    },
    {
      title: "Following",
      name: "following",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "user" }],
        },
      ],
      validation: (Rule) => Rule.unique(),
    },
    {
      title: "Followers",
      name: "followers",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "user" }],
        },
      ],
      validation: (Rule) => Rule.unique(),
    },
  ],
  preview: {
    select: {
      title: "name",
      media: "image",
    },
    prepare(selection) {
      const { title, media } = selection;
      return {
        title: title,
        // eslint-disable-next-line @next/next/no-img-element
        media: <img src={media} alt="preview image" />,
      };
    },
  },
};

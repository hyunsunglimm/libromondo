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

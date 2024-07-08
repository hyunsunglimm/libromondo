export const book = {
  title: "Book",
  name: "book",
  type: "object",
  fields: [
    {
      title: "Authors",
      name: "authors",
      type: "array",
      of: [{ type: "string" }],
    },
    {
      title: "Contents",
      name: "contents",
      type: "string",
    },
    {
      title: "Datetime",
      name: "datetime",
      type: "string",
    },
    {
      title: "ISBN",
      name: "isbn",
      type: "string",
    },
    {
      title: "Price",
      name: "price",
      type: "number",
    },
    {
      title: "Publisher",
      name: "publisher",
      type: "string",
    },
    {
      title: "Sale Price",
      name: "sale_price",
      type: "number",
    },
    {
      title: "Status",
      name: "status",
      type: "string",
    },
    {
      title: "Thumbnail",
      name: "thumbnail",
      type: "string",
    },
    {
      title: "Title",
      name: "title",
      type: "string",
    },
    {
      title: "Translators",
      name: "translators",
      type: "array",
      of: [{ type: "string" }],
    },
    {
      title: "URL",
      name: "url",
      type: "url",
    },
  ],
  preview: {
    select: {
      title: "title",
      authors: "authors",
      media: "thumbnail",
    },
    prepare(selection) {
      const { title, authors, media } = selection;
      return {
        title: `${title} (${authors[0]})`,
        // eslint-disable-next-line @next/next/no-img-element
        media: <img src={media} alt="preview image" className="w-full" />,
      };
    },
  },
};

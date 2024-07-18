export const review = {
  title: "Review",
  name: "review",
  type: "document",
  fields: [
    {
      title: "Author",
      name: "author",
      type: "reference",
      to: [{ type: "user" }],
    },
    {
      title: "Book",
      name: "book",
      type: "reference",
      to: [{ type: "book" }],
    },
    {
      title: "Contents",
      name: "content",
      type: "string",
    },
    {
      title: "Comments",
      name: "comments",
      type: "array",
      of: [
        {
          title: "Comment",
          name: "comment",
          type: "document",
          fields: [
            {
              title: "Author",
              name: "author",
              type: "reference",
              to: [{ type: "user" }],
            },
            {
              title: "Comment",
              name: "comment",
              type: "string",
            },
          ],
        },
      ],
    },
  ],
  preview: {
    select: {
      author: "author.name",
      bookTitle: "book.title",
      media: "book.thumbnail",
    },
    prepare(selection) {
      const { author, bookTitle, media } = selection;
      return {
        title: author,
        subtitle: bookTitle,
        // eslint-disable-next-line @next/next/no-img-element
        media: <img src={media} alt="preview image" />,
      };
    },
  },
};

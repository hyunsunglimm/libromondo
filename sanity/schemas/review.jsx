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
    },
    {
      title: "Contents",
      name: "contents",
      type: "string",
    },
    {
      title: "Grade",
      name: "grade",
      type: "number",
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
      contents: "contents",
      bookThumbnail: "book.thumbnail",
    },
    prepare(selection) {
      const { author, contents, bookThumbnail } = selection;
      return {
        title: `작성자: ${author}`,
        subtitle: `리뷰 내용: ${contents}`,
        // eslint-disable-next-line @next/next/no-img-element
        media: <img src={bookThumbnail} alt="preview book thumbnail" />,
      };
    },
  },
};

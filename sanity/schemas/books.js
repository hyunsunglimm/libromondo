// 서재에 담긴 책 테이블
export const books = {
  title: "Books",
  name: "books",
  type: "document",
  fields: [
    {
      title: "User",
      name: "user",
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
  ],
  preview: {
    select: {
      author: "user.name",
      bookTitle: "book.title",
      userImage: "user.image",
    },
    prepare(selection) {
      const { user, bookTitle, userImage } = selection;
      return {
        title: user,
        subtitle: bookTitle,
        // eslint-disable-next-line @next/next/no-img-element
        media: <img src={userImage} alt="preview user profile image" />,
      };
    },
  },
};

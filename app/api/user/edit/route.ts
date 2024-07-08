import { auth } from "@/auth";
import { editProfile } from "@/service/user";

export const PUT = async (req: Request) => {
  const session = await auth();
  const user = session?.user;

  if (!user || !user.id) {
    return new Response("인증 에러", { status: 401 });
  }

  const form = await req.formData();
  const name = form.get("name")?.toString();
  const file = form.get("file") as Blob;

  if (!name) {
    return new Response("이름값이 없습니다.", { status: 401 });
  }

  return editProfile(user.id, name, file)
    .then((res) => Response.json({ ...res, id: res._id }))
    .catch((error) => new Response(JSON.stringify(error), { status: 500 }));
};

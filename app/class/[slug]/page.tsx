import AssigmentCard from "@/components/ClassCards/AssigmentCard";
import { decryptAuthToken } from "@/lib/auth";
import { getClassData } from "@/lib/class";
import { Settings2 } from "lucide-react";
import { cookies } from "next/headers";
import Link from "next/link";
import React from "react";

function getToken() {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  return token?.value as string;
}

const AssigmentsPage = async ({ params }: { params: { slug: string } }) => {
  const user = await decryptAuthToken(getToken())!;
  const classData = await getClassData(params.slug);

  return (
    <div className="md:p-6 p-2 md:w-3/4 w-full h-[90vh]">
      <h1 className="text-4xl font-bold pb-2">
        {classData.className}{" "}
        {classData.classCreator === user?.username ? (
          <Link href={`/class/${params.slug}/settings`}>
            <Settings2 className="inline ml-6" size={40} />
          </Link>
        ) : null}
      </h1>
      <div className="pb-4">
        <p>{classData.description}</p>
      </div>
      <div className="mt-6 font-semibold">
        {/* {user?.role === "teacher" ? (
          <Link href={`/class/${params.slug}/new`}>
            <Button>New Assigment</Button>
          </Link>
        ) : null} */}
        <h2 className="text-3xl pb-2">Assigments</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {classData.assigments.map((assigment, index) => (
            <Link
              key={index}
              href={`${params.slug}/assigment/${assigment.assigmentID}`}
            >
              <AssigmentCard
                title={assigment.title}
                description={assigment.shortDescription}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AssigmentsPage;

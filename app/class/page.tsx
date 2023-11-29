import { getClasses } from '@/lib/class';
import React from 'react';
import { cookies } from 'next/headers';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';
import { decryptToken } from '@/lib/auth';

async function getCurrentUser() {
  const cookieStore = cookies();
  const token = cookieStore.get('token');
  if (token) {
    return await decryptToken(token.value);
  }
}

const Page = async ({ params }: { params: { slug: string } }) => {
  const user = await getCurrentUser();
  console.log(user);
  const classes = await getClasses(user as string);

  return (
    <div className="p-4">
      <div className="flex flex-row space-x-2 items-center">
        <h1 className="text-4xl">Classes:</h1>
      </div>
      <div className="grid grid-cols-5 grid-rows-2 gap-6 p-4">
        {classes.map((subject, index) => (
          <Link key={index} className="" href={`/class/${subject.classID}`}>
            <Card className="h-full" style={{ height: '100%' }}>
              <CardHeader>
                <CardTitle>{subject.className}</CardTitle>
                <CardDescription>{subject.classCreator}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="break-words">{subject.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Page;

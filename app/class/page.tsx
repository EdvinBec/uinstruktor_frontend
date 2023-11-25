import { getClasses } from '@/lib/class';
import React from 'react';
import { cookies } from 'next/headers';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';
import { GetJwtSecretKey, decryptToken } from '@/lib/auth';
import { compactDecrypt, jwtDecrypt } from 'jose';

async function getCurrentUser() {
  const cookieStore = cookies();
  const token = cookieStore.get('token');
  if (token) {
    return await decryptToken(token.value);
  }
}

const Page = async ({ params }: { params: { slug: string } }) => {
  const user = await getCurrentUser();
  const classes = await getClasses(user as string);

  return (
    <div className="p-4">
      <h1 className="text-4xl">Classes:</h1>
      <div className="grid gap-6 p-4">
        {classes.map((subject, index) => (
          <Link key={index} className="" href={`/class/${subject.classID}`}>
            <Card className="">
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

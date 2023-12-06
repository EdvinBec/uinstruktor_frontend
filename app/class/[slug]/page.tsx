import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardHeader } from '@/components/ui/card';
import { verifyJwtToken } from '@/lib/auth';
import { getAssigments, getClasses } from '@/lib/class';
import { UserToken } from '@/types';
import { Clock } from 'lucide-react';
import { cookies } from 'next/headers';
import Link from 'next/link';
import React from 'react';

function getToken() {
  const cookieStore = cookies();
  const token = cookieStore.get('token');
  return token?.value as string;
}

const AssigmentsPage = async ({ params }: { params: { slug: string } }) => {
  const assigments = await getAssigments(params.slug);
  const user: UserToken = await verifyJwtToken(getToken());

  return (
    <div className="p-4">
      <h1 className="text-4xl">Assigments: </h1>
      {user.role === 'teacher' ? (
        <Link href={`/class/${params.slug}/new`}>
          <Button>New Assigment</Button>
        </Link>
      ) : null}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 p-4 gap-4">
        {assigments.map((assigment, index) => (
          <Link
            key={index}
            href={`${params.slug}/assigment/${assigment.assigmentID}`}
          >
            <Card className="p-2 h-full">
              <CardHeader>{assigment.title}</CardHeader>
              <CardDescription>
                <span className="flex flex-row gap-4 items-center">
                  <Clock />
                  {new Date(assigment.timeExpiration).toLocaleString()}
                </span>
              </CardDescription>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AssigmentsPage;

import { Card, CardDescription, CardHeader } from '@/components/ui/card';
import { getAssigments, getClasses } from '@/lib/class';
import { Clock } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const Page = async ({ params }: { params: { slug: string } }) => {
  const assigments = await getAssigments(params.slug);
  console.log(assigments);
  return (
    <div className="p-4">
      <h1 className="text-4xl">Assigments: </h1>
      <div className="grid grid-cols-5 p-4 gap-4">
        {assigments.map((assigment, index) => (
          <Link
            key={index}
            href={`${params.slug}/assigment/${assigment.assigmentID}`}
          >
            <Card className="p-2">
              <CardHeader>{assigment.title}</CardHeader>
              <CardDescription>
                <div className="flex flex-row gap-4 items-center">
                  <Clock />
                  {new Date(assigment.time_expiration).toLocaleString()}
                </div>
              </CardDescription>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Page;

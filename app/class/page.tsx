import { getClasses } from '@/lib/class';
import React from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRightSquare, ChevronsRight } from 'lucide-react';
import Link from 'next/link';

const Page = async ({ params }: { params: { slug: string } }) => {
  const classes = await getClasses('test2');
  console.log(classes);
  return (
    <div className="p-4">
      <h1 className="text-4xl">Classes:</h1>
      <div className="grid grid-cols-5 gap-6 p-4">
        {classes.map((subject, index) => (
          <Link key={index} href={`/class/${subject.classID}`}>
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

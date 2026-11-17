import { IssueSchema } from "@/app/validationSchema";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

interface Props {
  params: Promise<{ id: string }>;
}

export async function POST(request: NextRequest, { params }: Props) {
  const { id } = await params;

  const body = await request.json();

  const validation = IssueSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(z.treeifyError(validation.error), { status: 400 });

  const issue = await prisma.issue.findUnique({
    where: { id: Number(id) },
  });

  if (!issue) return NextResponse.json("Issue invalid", { status: 400 });

  const updatedIssue = await prisma.issue.update({
    where: { id: Number(id) },
    data: { title: body.title, description: body.description },
  });

  return NextResponse.json(updatedIssue);
}

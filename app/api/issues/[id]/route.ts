import { IssueSchema } from "@/app/validationSchema";
import prisma from "@/prisma/client";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

interface Props {
  params: Promise<{ id: string }>;
}

export async function PATCH(request: NextRequest, { params }: Props) {
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

export async function DELETE(request: NextRequest, { params }: Props) {
  const { id } = await params;
  console.log('debug',id)

  const issue = await prisma.issue.findUnique({
    where: { id: Number(id) },
  });

  if (!issue)
    return NextResponse.json({ error: "Invalid issue" }, { status: 400 });

  await prisma.issue.delete({
    where: { id: Number(id) },
  });

  return NextResponse.json({});
}

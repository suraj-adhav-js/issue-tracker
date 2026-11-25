import authOptions from "@/app/auth/authOptions";
import { issueSchema, patchIssueSchema } from "@/app/validationSchema";
import prisma from "@/prisma/client";
import { error } from "console";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

interface Props {
  params: Promise<{ id: string }>;
}

export async function PATCH(request: NextRequest, { params }: Props) {
  const sesssion = await getServerSession(authOptions);
  if (!sesssion) return NextResponse.json({}, { status: 401 });

  const { id } = await params;

  const body = await request.json();

  const validation = patchIssueSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(z.treeifyError(validation.error), { status: 400 });

  const issue = await prisma.issue.findUnique({
    where: { id: Number(id) },
  });

  if (!issue) return NextResponse.json("Issue invalid", { status: 404 });

  const { title, description, assignedToUserId } = body;
  if (assignedToUserId) {
    const user = await prisma.user.findUnique({
      where: { id: assignedToUserId },
    });

    if (!user)
      return NextResponse.json({ error: "Invalid User" }, { status: 404 });
  }

  const updatedIssue = await prisma.issue.update({
    where: { id: Number(id) },
    data: {
      title,
      description,
      assignedToUserId,
    },
  });

  return NextResponse.json(updatedIssue);
}

export async function DELETE(request: NextRequest, { params }: Props) {
  const sesssion = await getServerSession(authOptions);
  if (!sesssion) return NextResponse.json({}, { status: 401 });

  const { id } = await params;
  console.log("debug", id);

  const issue = await prisma.issue.findUnique({
    where: { id: Number(id) },
  });

  if (!issue)
    return NextResponse.json({ error: "Invalid issue" }, { status: 404 });

  await prisma.issue.delete({
    where: { id: Number(id) },
  });

  return NextResponse.json({});
}

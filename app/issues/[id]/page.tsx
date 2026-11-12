'use cache'

import prisma  from "@/prisma/client";

interface Props{
    params: Promise<{id: string}>
}

const IssueDetailPage = async({params}: Props) => {
    const {id} = await params;

    const issue = await prisma.issue.findUnique({
        where: { id: Number(id)}
    });
  return (
    <div>
        {issue?.title}
    </div>
  )
}

export default IssueDetailPage
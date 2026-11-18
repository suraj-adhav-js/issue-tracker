import { connection } from "next/server"
import IssueForm from "../_components/IssueForm"

const NewIssuePage =async () => {
  await connection();
  return (
    <IssueForm/>
  )
}

export default NewIssuePage
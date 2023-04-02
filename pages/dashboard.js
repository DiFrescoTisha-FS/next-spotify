import { useSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { useRouter } from "next/router";
import { useState } from "react";
import { Link } from "next/link";

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions)
}
// function Dashboard() {
//   return (
//     <h1>Dashboard Page</h1>
//   )
// }

// export default Dashboard

import { Button } from "@/components/ui/button"
import Link from "next/link"
 
export default function SignIn() {
  return (
    <div className="h-screen flex flex-col items-center justify-center gap-5">
      <Link href={"/auth/sign-in"}>
        <Button variant={"outline"}>Signin</Button>
      </Link>
    </div>
  )
} 
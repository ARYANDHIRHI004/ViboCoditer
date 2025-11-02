
import { Button } from "@/components/ui/button"
import { signIn } from "@/auth"
 
export default function SignIn() {
  return (
    <div className="h-screen flex flex-col items-center justify-center gap-5">
      <form
      action={async () => {
        "use server"
        await signIn("google")
      }}
    >
      <Button type="submit">Signin with Google</Button>
    </form>
    <form
      action={async () => {
        "use server"
        await signIn("github")
      }}
    >
      <button type="submit">Signin with GitHub</button>
    </form>
    </div>
  )
} 
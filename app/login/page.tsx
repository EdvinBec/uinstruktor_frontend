import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const LoginPage = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <form className="w-1/4 md:1/5 h-auto flex flex-col gap-4">
        <h1 className="text-center font-bold text-3xl mb-8">Login</h1>
        <div className="flex flex-col gap-2 w-full">
          <Label>Email</Label>
          <Input type="email" id="email" />
          <Label className="text-red-500">
            Please enter a valid email adress
          </Label>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <Label>Password</Label>
          <Input type="email" id="email" />
        </div>
        <Button>Login</Button>
      </form>
    </div>
  );
};

export default LoginPage;

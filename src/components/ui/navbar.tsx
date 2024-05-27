import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { IUserProfile } from "@/types";
import { Button } from "./button";
import AvatarFemale from "../../assets/avatar-female.png";
import AvatarMale from "../../assets/avatar-male.png";
import { avatarFallbackName } from "@/lib/utils";

const Navbar = ({ data }: { data: IUserProfile }) => {
  const { name, gender } = data || {};

  const getImageByGender = (gender: "male" | "female") => {
    switch (gender) {
      case "female":
        return <AvatarImage src={AvatarFemale} alt="@shadcn" />;
      case "male":
        return <AvatarImage src={AvatarMale} alt="@shadcn" />;
    }
  };

  return (
    <header className="w-full">
      <nav className="p-5 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Technical Test</h1>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Avatar className="cursor-pointer">
                {getImageByGender(gender)}
                <AvatarFallback className="uppercase">
                    {avatarFallbackName(name || 'tes')}
                </AvatarFallback>
              </Avatar>
            </TooltipTrigger>
            <TooltipContent className="bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
              <div className="h-20 w-52 space-y-3">
                <p className="text-black text-base text-center">{name}</p>
                <Button className="w-full">Go To Profile</Button>
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </nav>
    </header>
  );
};

export default Navbar;

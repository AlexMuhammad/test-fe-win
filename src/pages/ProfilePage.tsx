import React, { useEffect } from "react";
import {useNavigate} from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/index";
import { profileUser } from "@/redux/profile.slice";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AvatarFemale from "../assets/avatar-female.png";
import AvatarMale from "../assets/avatar-male.png";
import { avatarFallbackName } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    ArrowLeftIcon
  } from "@radix-ui/react-icons";

const ProfilePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { data: userData } = useSelector((state: RootState) => state.profile);

  const getData = async () => {
    await dispatch(profileUser());
  };

  useEffect(() => {
    getData();
  }, [dispatch]);

  const { name, email, gender } = userData.data || {};
  const getImageByGender = (gender: "male" | "female") => {
    switch (gender) {
      case "female":
        return <AvatarImage src={AvatarFemale} alt="@shadcn" />;
      case "male":
        return <AvatarImage src={AvatarMale} alt="@shadcn" />;
    }
  };
  return (
    <div className="h-screen max-w-full flex justify-center items-center space-x-3">
      <Button onClick={() => navigate('/')}><ArrowLeftIcon className="h-4 w-4 mr-2" /> Back</Button>
      <div className="w-1/3 flex items-center p-5 rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)] space-x-3">
        <Avatar className="w-16 h-16">
          {getImageByGender(gender)}
          <AvatarFallback className="uppercase">
            {avatarFallbackName(name || "tes")}
          </AvatarFallback>
        </Avatar>
        <div>
          <h4 className="text-base font-bold">{name}</h4>
          <h4 className="text-xs">{email}</h4>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

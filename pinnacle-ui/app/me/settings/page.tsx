"use client";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import withAuth from "@/app/lib/hocs/withAuth";
import useCurrentUser from "@/app/lib/hooks/useCurrentUser";
import FormPageHeader from "@/app/lib/components/navigation/form-page-header";
import Container from "@/app/lib/components/layout/container";
import Avatar from "@/app/lib/components/data-display/avatar";
import FormGroup from "@/app/lib/components/forms/form-group";
import Label from "@/app/lib/components/forms/label";
import TextInput from "@/app/lib/components/data-input/text-input";
import Button from "@/app/lib/components/actions/button";

const UserSettings: NextPage = () => {
  const { data: currentUser } = useCurrentUser();
  const [name, setName] = useState<string | undefined>(
    currentUser?.fullname || undefined,
  );

  useEffect(() => {
    setName(currentUser?.fullname || undefined);
  }, [currentUser]);

  const handleAvatarOnClick = () => {
    console.log("Clicked");
  };

  return (
    <>
      <FormPageHeader title={`${currentUser?.fullname} / Settings`} />
      <Container width="w-2/6">
        <h1 className="text-4xl mb-10">Profile</h1>
        <div className="">
          <div className="flex flex-col items-center">
            <Avatar
              size={250}
              className="mb-10"
              onClick={handleAvatarOnClick}
            />
          </div>
          <form>
            <FormGroup>
              <Label value="Name" />
              <TextInput
                fullWidth
                padding="sm"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label value="Email" />
              <TextInput value={currentUser?.email} padding="sm" fullWidth />
            </FormGroup>
            <div className="flex justify-end">
              <Button value="Update profile" />
            </div>
          </form>
        </div>
      </Container>
    </>
  );
};

export default withAuth(UserSettings);

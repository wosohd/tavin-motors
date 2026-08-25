"use client";

import {
  useState,
} from "react";

import {
  useRouter,
} from "next/navigation";

import {
  ShieldCheck,
  ShieldOff,
  UserMinus,
  UserPlus,
} from "lucide-react";

import {
  toast,
} from "sonner";

import {
  Button,
} from "@/components/ui/button";


type Props = {
  userId:string;
  role:string | null;
  banned:boolean | null;
};



export function AdminUserActions({
  userId,
  role,
  banned,
}:Props) {


  const router =
    useRouter();


  const [
    loading,
    setLoading,
  ] =
    useState(false);



  async function updateUser(
    action:
      | "PROMOTE_ADMIN"
      | "REMOVE_ADMIN"
      | "BAN"
      | "UNBAN",
  ) {


    setLoading(true);


    try {

      const response =
        await fetch(
          `/api/admin/users/${userId}`,
          {

            method:
              "PATCH",

            headers:{
              "Content-Type":
                "application/json",
            },

            body:
              JSON.stringify({
                action,
              }),

          },
        );


      const result =
        await response.json();


      if (!response.ok) {

        toast.error(
          result.message ??
          "Unable to update user.",
        );

        return;

      }



      toast.success(
        "User updated.",
      );


      router.refresh();


    } catch {

      toast.error(
        "Something went wrong.",
      );

    } finally {

      setLoading(false);

    }

  }



  return (

    <section className="rounded-2xl border border-border bg-card/70 p-6">


      <h2 className="text-lg font-semibold">
        Account actions
      </h2>



      <div className="mt-5 flex flex-wrap gap-3">


        {
          role === "admin" ? (

            <Button
              disabled={loading}
              variant="outline"
              onClick={() =>
                updateUser(
                  "REMOVE_ADMIN",
                )
              }
            >

              <UserMinus className="size-4" />

              Remove admin

            </Button>


          ) : (


            <Button
              disabled={loading}
              onClick={() =>
                updateUser(
                  "PROMOTE_ADMIN",
                )
              }
            >

              <UserPlus className="size-4" />

              Make admin

            </Button>


          )
        }



        {
          banned ? (

            <Button
              disabled={loading}
              variant="outline"
              onClick={() =>
                updateUser(
                  "UNBAN",
                )
              }
            >

              <ShieldCheck className="size-4" />

              Restore account

            </Button>


          ) : (


            <Button
              disabled={loading}
              variant="destructive"
              onClick={() =>
                updateUser(
                  "BAN",
                )
              }
            >

              <ShieldOff className="size-4" />

              Restrict account

            </Button>


          )
        }


      </div>


    </section>

  );
}
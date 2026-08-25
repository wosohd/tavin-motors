import type { Metadata } from "next";

import Link from "next/link";

import {
  Eye,
} from "lucide-react";

import {
  Badge,
} from "@/components/ui/badge";

import {
  buttonVariants,
} from "@/components/ui/button";

import {
  prisma,
} from "@/lib/prisma";

import {
  cn,
} from "@/lib/utils";


export const metadata: Metadata = {
  title:
    "Website Content",
};


function formatStatus(
  status:string,
) {

  return status
    .replaceAll("_"," ")
    .toLowerCase()
    .replace(
      /\b\w/g,
      (letter)=>
        letter.toUpperCase(),
    );

}



export default async function AdminContentPage() {


  const content =
    await prisma.siteContent.findMany({

      orderBy:{
        updatedAt:
          "desc",
      },

    });



  return (

    <div className="space-y-8">


      <header className="border-b border-border pb-7">

        <p className="tm-eyebrow">
          Website management
        </p>


        <h1 className="mt-4 text-3xl font-semibold">
          Website Content
        </h1>


        <p className="mt-3 text-sm leading-7 text-muted-foreground">
          Manage website content records and publishing status.
        </p>

      </header>




      <section className="grid gap-5 lg:grid-cols-2">


        {
          content.map(
            (item)=> (

              <article
                key={
                  item.id
                }
                className="rounded-2xl border border-border bg-card/70 p-5"
              >


                <div className="flex items-start justify-between gap-4">


                  <div>

                    <p className="text-xs tracking-[0.14em] text-muted-foreground uppercase">

                      {
                        item.key
                      }

                    </p>


                    <h2 className="mt-2 text-xl font-semibold">

                      {
                        item.title ??
                        "Untitled content"
                      }

                    </h2>


                  </div>



                  <Badge variant="outline">

                    {
                      formatStatus(
                        item.status,
                      )
                    }

                  </Badge>


                </div>



                {
                  item.subtitle && (

                    <p className="mt-4 text-sm text-muted-foreground">

                      {
                        item.subtitle
                      }

                    </p>

                  )
                }




                {
                  item.body && (

                    <p className="mt-4 line-clamp-4 text-sm leading-7 text-muted-foreground">

                      {
                        item.body
                      }

                    </p>

                  )
                }



                <Link

                  href={`/admin/content/${item.id}`}

                  className={cn(
                    buttonVariants({
                      variant:
                        "outline",
                      size:
                        "sm",
                    }),
                    "mt-5 w-full",
                  )}

                >

                  <Eye className="size-4" />

                  Review content

                </Link>


              </article>

            )
          )
        }


      </section>


    </div>

  );
}
import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import {
  CheckCircle2,
  CircleHelp,
  Clock3,
  Mail,
  MessageCircle,
  MessagesSquare,
  Phone,
  Plus,
  RefreshCcw,
  Send,
} from "lucide-react";

import { DashboardDemoNotice } from "@/components/dashboard/dashboard-demo-notice";
import { DashboardPageHeader } from "@/components/dashboard/dashboard-page-header";
import { DemoActionButton } from "@/components/dashboard/demo-action-button";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  currentCustomer,
  enquiries,
} from "@/data/dashboard";
import { formatDashboardDateTime } from "@/lib/dashboard";
import { cn } from "@/lib/utils";
import type { EnquiryChannel } from "@/types/dashboard";

const channelDetails: Record<
  EnquiryChannel,
  {
    label: string;
    icon: LucideIcon;
  }
> = {
  WEBSITE: {
    label: "Website",
    icon: MessagesSquare,
  },
  PHONE: {
    label: "Phone",
    icon: Phone,
  },
  WHATSAPP: {
    label: "WhatsApp",
    icon: MessageCircle,
  },
  EMAIL: {
    label: "Email",
    icon: Mail,
  },
};

export default function CustomerEnquiriesPage() {
  const customerEnquiries = enquiries
    .filter(
      (enquiry) =>
        enquiry.customerName === currentCustomer.name,
    )
    .sort(
      (firstEnquiry, secondEnquiry) =>
        new Date(
          secondEnquiry.createdAt,
        ).getTime() -
        new Date(
          firstEnquiry.createdAt,
        ).getTime(),
    );

  const openEnquiries = customerEnquiries.filter(
    (enquiry) => enquiry.status === "OPEN",
  ).length;

  const repliedEnquiries = customerEnquiries.filter(
    (enquiry) => enquiry.status === "REPLIED",
  ).length;

  const closedEnquiries = customerEnquiries.filter(
    (enquiry) => enquiry.status === "CLOSED",
  ).length;

  return (
    <div className="space-y-8">
      <DashboardPageHeader
        eyebrow="Customer dashboard"
        title="Enquiries"
        description="Review questions and requests submitted to the Tavin Motors team and monitor their response status."
        actions={
          <Link
            href="/contact"
            className={buttonVariants({
              size: "lg",
            })}
          >
            <Plus aria-hidden="true" />
            New enquiry
          </Link>
        }
      />

      <DashboardDemoNotice />

      <section
        aria-label="Enquiry overview"
        className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
      >
        <Card className="border border-border bg-card/80 shadow-sm">
          <CardContent className="flex items-center gap-4 p-5">
            <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-brand-gold/20 bg-brand-burgundy/10 text-brand-gold dark:bg-brand-burgundy/30">
              <MessagesSquare
                aria-hidden="true"
                className="size-5"
              />
            </span>

            <div>
              <p className="text-2xl font-semibold text-foreground">
                {customerEnquiries.length}
              </p>

              <p className="text-sm text-muted-foreground">
                Total enquiries
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-border bg-card/80 shadow-sm">
          <CardContent className="flex items-center gap-4 p-5">
            <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-sky-600/20 bg-sky-500/10 text-sky-700 dark:border-sky-400/20 dark:text-sky-300">
              <Clock3
                aria-hidden="true"
                className="size-5"
              />
            </span>

            <div>
              <p className="text-2xl font-semibold text-foreground">
                {openEnquiries}
              </p>

              <p className="text-sm text-muted-foreground">
                Awaiting response
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-border bg-card/80 shadow-sm">
          <CardContent className="flex items-center gap-4 p-5">
            <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-amber-600/20 bg-amber-500/10 text-amber-700 dark:border-amber-300/20 dark:text-amber-300">
              <Send
                aria-hidden="true"
                className="size-5"
              />
            </span>

            <div>
              <p className="text-2xl font-semibold text-foreground">
                {repliedEnquiries}
              </p>

              <p className="text-sm text-muted-foreground">
                Replied
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-border bg-card/80 shadow-sm">
          <CardContent className="flex items-center gap-4 p-5">
            <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-emerald-600/20 bg-emerald-500/10 text-emerald-700 dark:border-emerald-400/20 dark:text-emerald-300">
              <CheckCircle2
                aria-hidden="true"
                className="size-5"
              />
            </span>

            <div>
              <p className="text-2xl font-semibold text-foreground">
                {closedEnquiries}
              </p>

              <p className="text-sm text-muted-foreground">
                Closed
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      <section aria-labelledby="customer-enquiries-heading">
        <div className="mb-5">
          <h2
            id="customer-enquiries-heading"
            className="text-xl font-semibold text-foreground"
          >
            Your conversations
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            View enquiry subjects, communication channels and
            current response status.
          </p>
        </div>

        {customerEnquiries.length > 0 ? (
          <div className="space-y-5">
            {customerEnquiries.map((enquiry) => {
              const channel =
                channelDetails[enquiry.channel];

              const ChannelIcon = channel.icon;
              const isOpen =
                enquiry.status === "OPEN";
              const isReplied =
                enquiry.status === "REPLIED";
              const isClosed =
                enquiry.status === "CLOSED";

              return (
                <Card
                  key={enquiry.id}
                  className="border border-border bg-card/80 shadow-sm transition-colors hover:bg-card"
                >
                  <CardHeader className="gap-5 lg:flex-row lg:items-start lg:justify-between">
                    <div className="min-w-0">
                      <div className="mb-3 flex flex-wrap items-center gap-3">
                        <StatusBadge
                          status={enquiry.status}
                        />

                        <span className="text-xs text-muted-foreground">
                          Enquiry ID: {enquiry.id}
                        </span>
                      </div>

                      <CardTitle className="text-xl text-foreground">
                        {enquiry.subject}
                      </CardTitle>

                      <CardDescription className="mt-1">
                        Submitted{" "}
                        {formatDashboardDateTime(
                          enquiry.createdAt,
                        )}
                      </CardDescription>
                    </div>

                    <span className="grid size-12 shrink-0 place-items-center rounded-xl border border-brand-gold/20 bg-brand-burgundy/10 text-brand-gold dark:bg-brand-burgundy/30">
                      <ChannelIcon
                        aria-hidden="true"
                        className="size-5"
                      />
                    </span>
                  </CardHeader>

                  <CardContent>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div className="rounded-xl border border-border bg-muted/40 p-4">
                        <span className="flex items-center gap-2 text-xs text-muted-foreground">
                          <ChannelIcon
                            aria-hidden="true"
                            className="size-4 text-brand-gold"
                          />
                          Communication channel
                        </span>

                        <p className="mt-2 font-medium text-foreground">
                          {channel.label}
                        </p>
                      </div>

                      <div className="rounded-xl border border-border bg-muted/40 p-4">
                        <span className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Clock3
                            aria-hidden="true"
                            className="size-4 text-brand-gold"
                          />
                          Submitted
                        </span>

                        <p className="mt-2 font-medium text-foreground">
                          {formatDashboardDateTime(
                            enquiry.createdAt,
                          )}
                        </p>
                      </div>
                    </div>

                    {isOpen ? (
                      <div className="mt-4 rounded-xl border border-sky-600/20 bg-sky-500/10 p-4 dark:border-sky-400/20">
                        <p className="text-xs font-semibold tracking-[0.14em] text-sky-700 uppercase dark:text-sky-300">
                          Awaiting response
                        </p>

                        <p className="mt-2 text-sm leading-6 text-muted-foreground">
                          The Tavin Motors team has received
                          this enquiry. A response will appear
                          here when customer messaging is
                          connected during the backend phase.
                        </p>
                      </div>
                    ) : null}

                    {isReplied ? (
                      <div className="mt-4 rounded-xl border border-amber-600/20 bg-amber-500/10 p-4 dark:border-amber-400/20">
                        <p className="text-xs font-semibold tracking-[0.14em] text-amber-700 uppercase dark:text-amber-300">
                          Response available
                        </p>

                        <p className="mt-2 text-sm leading-6 text-muted-foreground">
                          The team has responded to this
                          enquiry. Full message history and
                          customer replies will become
                          available after backend integration.
                        </p>
                      </div>
                    ) : null}

                    {isClosed ? (
                      <div className="mt-4 rounded-xl border border-emerald-600/20 bg-emerald-500/10 p-4 dark:border-emerald-400/20">
                        <p className="text-xs font-semibold tracking-[0.14em] text-emerald-700 uppercase dark:text-emerald-300">
                          Enquiry resolved
                        </p>

                        <p className="mt-2 text-sm leading-6 text-muted-foreground">
                          This conversation has been marked as
                          resolved. It can be reopened later
                          when persistent messaging is
                          available.
                        </p>
                      </div>
                    ) : null}

                    <div className="mt-5 flex flex-col gap-2 border-t border-border pt-5 sm:flex-row sm:justify-end">
                      <DemoActionButton
                        variant="outline"
                        size="lg"
                      >
                        <MessagesSquare
                          aria-hidden="true"
                        />
                        View conversation
                      </DemoActionButton>

                      {isOpen || isReplied ? (
                        <DemoActionButton
                          variant="ghost"
                          size="lg"
                          className="text-muted-foreground hover:text-foreground"
                        >
                          <Send aria-hidden="true" />
                          Send follow-up
                        </DemoActionButton>
                      ) : null}

                      {isClosed ? (
                        <DemoActionButton
                          variant="ghost"
                          size="lg"
                          className="text-muted-foreground hover:text-foreground"
                        >
                          <RefreshCcw
                            aria-hidden="true"
                          />
                          Reopen enquiry
                        </DemoActionButton>
                      ) : null}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <Card className="border border-dashed border-border bg-card/60 shadow-sm">
            <CardContent className="flex flex-col items-center px-6 py-14 text-center">
              <span className="grid size-14 place-items-center rounded-full border border-brand-gold/20 bg-brand-gold/10 text-brand-gold">
                <CircleHelp
                  aria-hidden="true"
                  className="size-6"
                />
              </span>

              <h2 className="mt-5 text-lg font-semibold text-foreground">
                No enquiries yet
              </h2>

              <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
                Contact the Tavin Motors team about a vehicle,
                import request, marketplace listing or service
                appointment.
              </p>

              <Link
                href="/contact"
                className={cn(
                  buttonVariants({
                    size: "lg",
                  }),
                  "mt-6",
                )}
              >
                Submit your first enquiry
                <Plus aria-hidden="true" />
              </Link>
            </CardContent>
          </Card>
        )}
      </section>
    </div>
  );
}
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

import { BrandMark } from "@/components/brand/brand-mark";
import { siteConfig } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-black/30">
      <div className="tm-container py-12">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr]">
          <div className="max-w-md">
            <BrandMark />

            <p className="mt-5 text-sm leading-7 text-muted-foreground">
              Premium vehicle sales, assisted imports, local marketplace
              listings and professional automotive care.
            </p>
          </div>

          <div>
            <p className="tm-eyebrow">Explore</p>

            <nav className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3">
              {siteConfig.mainNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-white"
                >
                  {item.title}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <p className="tm-eyebrow">Contact</p>

            <div className="mt-5 space-y-4 text-sm text-muted-foreground">
              <p className="flex items-center gap-3">
                <Phone className="size-4 text-brand-gold" />
                Phone details coming soon
              </p>

              <p className="flex items-center gap-3">
                <Mail className="size-4 text-brand-gold" />
                Email details coming soon
              </p>

              <p className="flex items-center gap-3">
                <MapPin className="size-4 text-brand-gold" />
                Location details coming soon
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Tavin Motors. All rights reserved.
          </p>

          <div className="flex gap-5">
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/marketplace-rules">Marketplace Rules</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
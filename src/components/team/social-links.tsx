import { Globe, Mail } from "lucide-react";
import {
  FacebookIcon,
  GithubIcon,
  InstagramIcon,
  LinkedinIcon,
  TiktokIcon,
  XIcon,
} from "@/components/ui/brand-icons";
import { cn } from "@/lib/utils";
import type { TeamMember } from "@/lib/types";

type IconComponent = React.ComponentType<{ size?: number; className?: string }>;
type LinkDef = { href: string; label: string; Icon: IconComponent };

function buildLinks(member: TeamMember): LinkDef[] {
  const links: LinkDef[] = [];
  if (member.github_url)
    links.push({ href: member.github_url, label: "GitHub", Icon: GithubIcon });
  if (member.linkedin_url)
    links.push({
      href: member.linkedin_url,
      label: "LinkedIn",
      Icon: LinkedinIcon,
    });
  if (member.instagram_url)
    links.push({ href: member.instagram_url, label: "Instagram", Icon: InstagramIcon });
  if (member.facebook_url)
    links.push({ href: member.facebook_url, label: "Facebook", Icon: FacebookIcon });
  if (member.tiktok_url)
    links.push({ href: member.tiktok_url, label: "TikTok", Icon: TiktokIcon });
  if (member.website_url)
    links.push({ href: member.website_url, label: "Sitio web", Icon: Globe });
  if (member.twitter_url)
    links.push({ href: member.twitter_url, label: "X / Twitter", Icon: XIcon });
  if (member.email)
    links.push({ href: `mailto:${member.email}`, label: "Email", Icon: Mail });
  return links;
}

/** `true` si la persona tiene al menos un enlace o red para mostrar. */
export function hasSocialLinks(member: TeamMember) {
  return buildLinks(member).length > 0;
}

export function SocialLinks({
  member,
  size = "md",
  className,
}: {
  member: TeamMember;
  size?: "sm" | "md";
  className?: string;
}) {
  const links = buildLinks(member);
  if (!links.length) return null;

  const dims = size === "sm" ? "h-9 w-9" : "h-10 w-10";
  const iconSize = size === "sm" ? 16 : 18;

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {links.map(({ href, label, Icon }) => {
        const isMail = href.startsWith("mailto:");
        return (
          <a
            key={label}
            href={href}
            aria-label={label}
            title={label}
            {...(isMail
              ? {}
              : { target: "_blank", rel: "noopener noreferrer" })}
            className={cn(
              "inline-flex items-center justify-center rounded-full border border-line bg-white text-ink-soft transition-colors hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700",
              dims,
            )}
          >
            <Icon size={iconSize} />
          </a>
        );
      })}
    </div>
  );
}

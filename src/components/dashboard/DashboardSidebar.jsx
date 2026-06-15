import {
  LayoutSideContentLeft,
  Bell,
  Envelope,
  Gear,
  House,
  Magnifier,
  Person,
  Briefcase,
} from "@gravity-ui/icons";
import { Bookmark, FileText } from "lucide-react";
import { Button, Drawer } from "@heroui/react";
import Link from "next/link";
import { getUserSession } from "@/lib/core/session";
import {
  LayoutDashboard,
  Users,
  Building2,
  CreditCard,
  Settings,
} from "lucide-react";

export async function DashboardSidebar() {
  const user = await getUserSession();
  const recruiterNavLinks = [
    { icon: House, href: "/dashboard/recruiter", label: "Home" },
    { icon: Magnifier, href: "/dashboard/recruiter/jobs", label: "Jobs" },
    {
      icon: Bell,
      href: "/dashboard/recruiter/jobs/new",
      label: "Post A Jobs",
    },
    {
      icon: Briefcase,
      href: "/dashboard/recruiter/company",
      label: "Company Profile",
    },
    { icon: Envelope, href: "/message", label: "Messages" },
    { icon: Person, href: "/profile", label: "Profile" },
    { icon: Gear, href: "/settings", label: "Settings" },
  ];

  const seekerNavLinks = [
    { icon: House, href: "/dashboard/seeker", label: "Home" },

    { icon: Magnifier, href: "/dashboard/seeker/jobs", label: "Find Jobs" },

    {
      icon: Briefcase,
      href: "/dashboard/seeker/applications",
      label: "My Applications",
    },

    {
      icon: Bookmark,
      href: "/dashboard/seeker/saved-jobs",
      label: "Saved Jobs",
    },

    {
      icon: FileText,
      href: "/dashboard/seeker/resume",
      label: "Resume",
    },

    {
      icon: Envelope,
      href: "/message",
      label: "Messages",
    },

    {
      icon: Person,
      href: "/profile",
      label: "Profile",
    },

    {
      icon: Gear,
      href: "/settings",
      label: "Settings",
    },
  ];

  const adminNavLinks = [
    {
      icon: LayoutDashboard,
      href: "/dashboard/admin",
      label: "Dashboard",
    },

    {
      icon: Users,
      href: "/dashboard/admin/users",
      label: "Users",
    },

    {
      icon: Building2,
      href: "/dashboard/admin/companies",
      label: "Companies",
    },

    {
      icon: Briefcase,
      href: "/dashboard/admin/jobs",
      label: "Jobs",
    },

    {
      icon: CreditCard,
      href: "/dashboard/admin/payments",
      label: "Payment",
    },

    {
      icon: Settings,
      href: "/dashboard/admin/settings",
      label: "Settings",
    },
  ];

  const navLinksMap = {
    seeker: seekerNavLinks,
    recruiter: recruiterNavLinks,
    admin: adminNavLinks,
  };

  const navItems = navLinksMap[user?.role || "seeker"];

  const navContent = (
    <nav className="flex flex-col gap-1">
      {navItems.map((item) => (
        <Link
          key={item.label}
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
          type="button"
          href={item.href}
        >
          <item.icon className="size-5 text-muted" />
          {item.label}
        </Link>
      ))}
    </nav>
  );

  return (
    <>
      <aside className="hidden lg:block w-64 shrink-0 border-r border-default p-4 ">
        {navContent}
      </aside>

      <Drawer>
        <Button className={"lg:hidden"} variant="secondary">
          <LayoutSideContentLeft></LayoutSideContentLeft>
          Sidebar
        </Button>
        <Drawer.Backdrop>
          <Drawer.Content placement="left">
            <Drawer.Dialog>
              <Drawer.CloseTrigger />
              <Drawer.Header>
                <Drawer.Heading>Navigation</Drawer.Heading>
              </Drawer.Header>
              <Drawer.Body>{navContent}</Drawer.Body>
            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer.Backdrop>
      </Drawer>
    </>
  );
}

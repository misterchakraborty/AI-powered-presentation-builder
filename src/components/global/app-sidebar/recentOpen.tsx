"use client";

import { Button } from "@/components/ui/button";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useSlideStore } from "@/store/useSlideStore";
import { JsonValue } from "@prisma/client/runtime/library";
import { toast } from "sonner";
import React from "react";
import { useRouter } from "next/navigation";
import { Project } from "@prisma/client";

const RecentOpen = ({ recentProjects }: { recentProjects: Project[] }) => {
  const router = useRouter();
  const { setSlides } = useSlideStore();

  const handleClick = (projectId: string, slides: JsonValue) => {
    if (!projectId || !slides) {
      toast.error("Project not found", {
        description: "Please try again",
      });

      return;
    }

    setSlides(JSON.parse(JSON.stringify(slides)));
    router.push(`/presentation/${projectId}`);
  };

  return (
    <>
      {recentProjects && recentProjects.length > 0 && (
        <SidebarGroup>
          <SidebarGroupLabel className="cursor-default">
            Recently Projects
          </SidebarGroupLabel>
          <SidebarMenu>
            {recentProjects?.map((project) => (
              <SidebarMenuItem key={project.id}>
                <SidebarMenuButton
                  asChild
                  tooltip={project.title}
                  className="hover:bg-primary/7"
                >
                  <Button
                    variant={"link"}
                    onClick={() => handleClick(project.id, project.slides)}
                    className="text-xs items-center justify-start cursor-pointer"
                  >
                    <span>{project.title}</span>
                  </Button>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      )}
    </>
  );
};

export default RecentOpen;

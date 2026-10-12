import { createFileRoute } from "@tanstack/react-router";
import { NotFoundComponent } from "@/components/site/NotFound";

// Prerendered to 404.html, which GitHub Pages serves for any unknown path.
export const Route = createFileRoute("/404")({
  component: NotFoundComponent,
  head: () => ({
    meta: [
      { title: "Page Not Found | AFON" },
      { name: "robots", content: "noindex, follow" },
      {
        name: "description",
        content:
          "This page doesn't exist. Find AFON's electrical repair services, service areas and contact details.",
      },
    ],
  }),
});

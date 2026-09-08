import type { Metadata } from "next";
import { MessageSquare } from "lucide-react";
import { StubPage } from "@/components/layout/StubPage";

export const metadata: Metadata = { title: "Messages" };

export default function MessagesPage() {
  return (
    <StubPage
      icon={MessageSquare}
      title="Messages"
      body="Project messaging is a stub in this demo. You can see an example thread on your active project."
    />
  );
}

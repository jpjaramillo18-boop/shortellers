import type { Metadata } from "next";
import { UserRound } from "lucide-react";
import { StubPage } from "@/components/layout/StubPage";

export const metadata: Metadata = { title: "Account" };

export default function AccountPage() {
  return (
    <StubPage
      icon={UserRound}
      title="Account"
      body="Signed in as Rosewood Bakehouse. Account settings are out of scope for this demo — use “Reset demo” in the header menu to start the story over."
    />
  );
}

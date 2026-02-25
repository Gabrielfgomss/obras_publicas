"use client"

import { PortalHeader } from "@/components/portal-header"
import { IntroSection } from "@/components/sections/intro-section"
import { DashboardSection } from "@/components/sections/dashboard-section"
import { ContactSection } from "@/components/sections/contact-section"
import { PortalFooter } from "@/components/portal-footer"

export default function HomePage() {
  return (
    <>
      <PortalHeader />
      <main>
        <IntroSection />
        <DashboardSection />
        <ContactSection />
      </main>
      <PortalFooter />
    </>
  )
}

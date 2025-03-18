import Navigation from "@/components/app-ui/Navigation";
import { FooterDesign } from "@/components/app-ui/footer-design";
import { Analytics } from "@vercel/analytics/react"

export default function RootLayout({ children }: {
    children: React.ReactNode;
}) {
    return (
        <main>
            <Analytics />
            <Navigation />
            {children}
            <FooterDesign />
        </main>
    )
}
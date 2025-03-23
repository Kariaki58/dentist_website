import Navigation from "@/components/app-ui/Navigation";
import { FooterDesign } from "@/components/app-ui/footer-design";
import { Analytics } from "@vercel/analytics/react";
import Provider from "@/components/app-ui/Provider";


export default function RootLayout({ children }: {
    children: React.ReactNode;
}) {
    return (
        <main>
            <Analytics />
            <Provider>
                <Navigation />
                {children}
                <FooterDesign />
            </Provider>
            
        </main>
    )
}
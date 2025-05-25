import DashboardServicePage from "./Service";
import { Suspense } from "react";

export default function DashboardServices() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <DashboardServicePage />;
        </Suspense>
    )
}
import About from "./About";

import { Suspense } from "react";


export default function AboutPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <About />
        </Suspense>
    );
}
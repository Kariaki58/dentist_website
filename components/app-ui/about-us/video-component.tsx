export default function VideoComponent() {
    const url = "https://0kxn1ytpe2mjc18k.public.blob.vercel-storage.com/dentist-video-0Os0Df9SVgG2BshMA8ogyyx8w3WhSx.mp4";
    const thumbnailUrl = "https://0kxn1ytpe2mjc18k.public.blob.vercel-storage.com/Screenshot%20from%202025-03-05%2004-01-46-EafcQ1tRJE9mafk2dfYJmoME9yGVRD.png"

    if (!url) {
        return <p>Video not found.</p>;
    }

    return (
        <video 
            controls 
            preload="none" 
            aria-label="Video player" 
            className="rounded-lg h-full" 
            poster={thumbnailUrl}
        >
            <source src={url} type="video/mp4" />
            Your browser does not support the video tag.
        </video>
    );
}

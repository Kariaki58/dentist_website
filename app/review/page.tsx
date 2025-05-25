import ReviewForm from "@/components/ReviewForm"


interface ReviewPageProps {
    searchParams: { token?: string };
}


export default async function Page({ searchParams }: ReviewPageProps) {

    const token = (await searchParams).token ?? "";
    return (
        <ReviewForm token={token} />
    )
}
import { Button } from "@/components/ui/button";



interface IServiceHeaderProps {
    btnText: string;
    content: string;
    title: string;
    description: string;
}


export default function ServiceHeader({ btnText, content, title, description }: IServiceHeaderProps) {
    return (
        <header className="bg-orange-100 h-[70vh]">
            <div className="flex justify-center pt-32">
                <Button variant="outline" className="py-3 w-52 ml-6 text-orange-500 hover:text-orange-600 cursor-auto bg-transparent outline-orange-400 border-orange-400 hover:bg-transparent">{btnText}</Button>
            </div>
            <h1 className="text-5xl text-center font-bold mt-4">
                {content} <span className="text-orange-500">{title}</span>
            </h1>
            <div className="flex justify-center mt-4">
                <p className="text-gray-500 max-w-md text-center">
                    {description}
                </p>
            </div>
        </header>
    )
}
import { Button } from "@/components/ui/button";


export default function ServiceHeader() {
    return (
        <header>
            <div className="flex justify-center pt-32">
                <Button variant="outline" className="py-3 w-52 ml-6 text-orange-500 hover:text-orange-600 cursor-auto bg-transparent outline-orange-400 border-orange-400 hover:bg-transparent">About Us</Button>
            </div>
            <h1 className="text-5xl text-center font-bold mt-4">
                Our <span className="text-orange-500">Dental Services</span>
            </h1>
            <div className="flex justify-center mt-4">
                <p className="text-gray-500 max-w-md text-center">
                    Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. 
                    Duis leo. Sed fringilla mauris sit amet nibh.
                </p>
            </div>
        </header>
    )
}
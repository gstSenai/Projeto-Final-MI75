import { Montserrat } from "next/font/google";
import { Header } from "@/components/header";
import footer from "../testFooter/page";
import { Footer } from "@/components/footer";

const montserrat = Montserrat({
    subsets: ['latin'],
    weight: ['400', '800'],
    display: 'swap',
});


export default function formularioContato() {
    return (
        <>
            <Header />
            <div className={`${montserrat.className} max-lg:px-4 px-20 py-12 sm:py-12 md:py-10 lg:py-14 xl:py-20`}>

                <div>
                    <h1 className="font-bold text-xl  md:text-3xl 2xl:text-5xl">Formulário para contato</h1>
                    <div className="border-t-8 border-[#702632] w-[265px] md:w-[405px] 2xl:w-[630px] my-2"></div>
                </div>
            </div>
            <Footer />
        </>);
}
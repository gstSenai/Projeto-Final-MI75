interface Botao {
    texto: string
}



export function Botao({ texto }: Botao) {

    return (
        <>
            <div className=" font-montserrat font-normal leading-normal text-black hover:text-white text-[1.25rem]  sm:text-[1.25rem] md:text-[1.75rem] lg:text-[1.975rem] 2xl:text-[2.2rem]">
                <button className="bg-[#702632] bg-opacity-40 hover:bg-opacity-100 transition-all duration-300 ease-in-out shrink-0 text-center rounded-[20px] w-[242px] h-[46px] sm:w-[242px] sm:h-[46px] md:w-[306px] md:h-[55px] lg:w-[314px] lg:h-[56px] 2xl:w-[370px] 2xl:h-[64px]">
                    {texto}
                </button>
            </div>
        </>


    )


}


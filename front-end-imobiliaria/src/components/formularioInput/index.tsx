export function InputFormulario() {
    return (
        <div>
            <div className="grid grid-cols-2 grid-flow-col ml-5 max-w-[50%]">
                <div className="flex flex-col gap-4 mt-5">
                    <input className="bg-[#FFFFFF] rounded-[20px] h-[60px] w-[95%]" type="text" placeholder="Nome" />
                    <input className="bg-[#FFFFFF] rounded-[20px] h-[60px] w-[95%]" type="text" placeholder="Nome" />
                    <input className="bg-[#FFFFFF] rounded-[20px] h-[60px] w-[95%]" type="text" placeholder="Nome" />
                </div>
                <div className="flex flex-col gap-4 mt-5">
                    <input className="bg-[#FFFFFF] rounded-[20px] h-[60px] w-[95%]" type="text" placeholder="Nome" />
                    <input className="bg-[#FFFFFF] rounded-[20px] h-[60px] w-[95%]" type="text" placeholder="Nome" />
                    <input className="bg-[#FFFFFF] rounded-[20px] h-[60px] w-[95%]" type="text" placeholder="Nome" />
                </div>
            </div>
        </div>
    )
}

"use client"

interface ImageUploadProps {
    title: string
    className?: string
}

export function ImageUpload({ title, className = "" }: ImageUploadProps) {
    return (
        <div className={`flex flex-col bg-white rounded-[20px] border border-black px-5 py-8 ${className}`}>
            <div className="flex items-center gap-5">
                <img src="/iconsImoveis/imagemImovel.png" alt="" className="h-5 lg:h-8" />
                <p className="text-[#5C5C5C]/80 max-sm:text-lg max-md:text-2xl max-lg:text-3xl lg:text-xl max-lg:text-black">
                    {title}
                </p>
            </div>
            <div className="bg-[#5C5C5C]/40 w-[30%] h-20 lg:h-32 xl:h-40 mt-6 rounded-2xl"></div>
        </div>
    )
}


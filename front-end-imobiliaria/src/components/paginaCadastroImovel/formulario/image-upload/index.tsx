"use client"

interface ImageUploadProps {
    title: string
    className?: string
}

export function ImageUpload({ title, className = "" }: ImageUploadProps) {
    return (
        <div className={`flex flex-col bg-white rounded-[20px] border border-black px-5 py-8 max-lg:pb-20 ${className}`}>
            <div className="flex items-center gap-5">
                <img src="/iconsImoveis/imagemImovel.png" alt="" className="h-5 lg:h-8" />
                <p className="text-[#5C5C5C]/80 max-sm:text-sm max-md:text-lg max-lg:text-2xl lg:text-xl">
                    {title}
                </p>
            </div>
            <div className="bg-[#5C5C5C]/40 max-lg:h-32 max-sm:h-20 max-sm:w-20 w-32 h-20 lg:h-32 xl:w-40 xl:h-40 mt-6 rounded-2xl"></div>
        </div>
    )
}


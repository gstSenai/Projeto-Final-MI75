
import Image from 'next/image';



export function cardHorario() {
    return (
        <>
            <div>
                <p>08:00 - 09:00</p>

                <div>



                    <p>Corretor: <span>João</span></p>

                    <Image
                        className='absolute -left-28 w-[32px] h-[30px]'
                        src="/imagemFundo.png"
                        alt="Imagem logo de fundo"
                        width={32}
                        height={30}
                        quality={100}
                    />
                </div>
            </div>
        </>
    );
}
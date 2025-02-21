import { Inter } from 'next/font/google';

// Carregando a fonte Inter
const inter = Inter({
    subsets: ['latin'],
    weight: ['400', '600'],
    display: 'swap',
});

export function Header() {
    return (
        <>
            <header className={`${inter.className} bg-[#DFDAD0] px-10 pt-6 max-lg:px-10 lg:px-30 xl:px-20 font-inter font-medium`}>
                <section className="flex flex-row justify-between ">
                    <div className="flex flex-row items-center lg:gap-16 xl:gap-26">
                        <div className="flex items-center gap-6">
                            <img src="/imagensHeader/Logo HAV.png" alt="Logo HAV" className="max-h-full lg:w-[60px] w-[40px] mt-[-0.5rem]" />
                            <p className="text-2xl xl:text-3xl font-bold text-[#702632]">HAV</p>
                        </div>
                        <div>
                            <nav>
                                <ul className="flex flex-row text-xl whitespace-nowrap gap-12 lg:gap-6 text-[#303030] max-lg:hidden">
                                    <li>Início</li>
                                    <li>Propriedades</li>
                                    <li>Corretores</li>
                                    <li>Sobre nós</li>
                                </ul>
                            </nav>
                        </div>
                    </div>

                    <div className="flex flex-row items-center font-medium ">
                        <div className="flex flex-row items-center gap-6 max-lg:hidden">
                            <div className="flex flex-row items-center pl-16" />
                            <img src="/imagensHeader/Botão tema site.png" alt="Tema" />
                        </div>
                        <div className="flex flex-row items-center gap-2 px-8 max-lg:hidden">
                            <img src="/imagensHeader/Brasil.png" alt="Idioma" />
                            <p className="text-xl">Português</p>
                            <img src="/imagensHeader/seta-para-baixo 2.png" alt="Abrir opções" />
                        </div>
                        <div className="flex flex-row items-center max-lg:hidden">
                            <img src="/imagensHeader/PERFIL SEM LOGIN.png" alt="Perfil sem login" className="w-12 lg:w-[50px]" />
                        </div>
                        <div className="flex flex-row items-center lg:hidden">
                            <img src="/imagensHeader/HAMBURGUER.png" alt="Perfil sem login" className="w-12 lg:w-[50px]" />
                        </div>
                    </div>
                </section >
            </header>
        </>
    );
}
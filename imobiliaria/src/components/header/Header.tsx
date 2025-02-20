export default function Header() {
    return (
        <>
            <header className="bg-[#DFDAD0]/80 h-[100px] p-6 min-h-screen font-inter font-medium">
                <section className="flex flex-row">
                    <div className="flex flex-row items-center gap-40">
                        <div className="flex items-center gap-6 pl-16">
                            <img src="../Logo HAV.png" alt="Logo HAV" className="max-h-full w-[3.5rem] mt-[-0.5rem]" />
                            <p className="text-2xl font-bold text-[#702632]">HAV</p>
                        </div>
                        <div>
                            <nav>
                                <ul className="flex flex-row text-xl gap-12 text-[#303030] lg:text-[1.3rem]">
                                    <li>Início</li>
                                    <li>Propriedades</li>
                                    <li>Corretores</li>
                                    <li>Sobre nós</li>
                                </ul>
                            </nav>
                        </div>
                    </div>

                    <div className="flex flex-row items-center font-medium">
                        <div className="flex flex-row items-center gap-6">
                            <div className="flex flex-row items-center pl-20" />
                            <img src="../Botão tema site.png" alt="Tema" />
                        </div>
                        <div className="flex flex-row items-center gap-2">
                            <img src="../Brasil.png" alt="Idioma" />
                            <p className="text-xl">Português</p>
                            <img src="../seta-para-baixo 2.png" alt="Abrir opções" />
                        </div>
                        <div className="flex flex-row items-center">
                            <img src="../PERFIL SEM LOGIN.png" alt="Perfil sem login" className="w-12" />
                        </div>
                    </div>
                </section >

            </header >
        </>
    );
}
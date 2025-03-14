import CardImovel from "./CardBeta"





export default function Card() {
/*    const [cards, setCards] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/api/cards")
            .then((res) => res.json())
            .then((data) => setCards(data))
            .catch((err) => console.error("Erro ao buscar os Cards: ", err));
    }, [])

    return (
        cards.map((cards, i) => (
            <CardImovel key={i} titulo={cards.titulo} cidade={cards.cidade}
                qtdDormitorios={cards.dormitorios} qtdSuite={cards.suite} qtdBanheiros={cards.banheiros}
                preco={cards.preco} codigo={cards.codigo} />
        ))
    )
    */

    return (
        <CardImovel titulo="GEMINADO / VENDE-SE" cidade="Jaraguá do Sul, Centro"
            qtdDormitorios={2} qtdSuite={1} qtdBanheiros={2} preco="R$799.000,00" codigo={54698} />
    )
}

  // Defina os cabeçalhos e dados da tabela
  
  import {GenericTable} from "./index"


  const headers = ['Código', 'Nome da Propriedade', 'Tipo de imóvel', 'Visibilidade', 'Estado'];
  const data = [
    ['4356AA353', 'Casa de Guaramirim', 'Venda', 'Permitida', 'Promoção'],
    ['6541e9v564', 'Casa de João pessoa', 'Locação', 'bloqueada', 'Alugado'],
    ['3567e943', 'Casa do Amizade', 'Locação', 'Permitida', 'Livre'],
    ['4356av01', 'Casa do Bau', 'Locação', 'Permitida', 'Livre'],
    ['3242x322a', 'Casa de Três rios', 'Venda', 'Permitida', 'Vendido'],
    ['23we2433', 'Casa de Nereu Ramos', 'Venda', 'bloqueada', 'A venda'],
    ['4356AA353', 'Casa de Guaramirim', 'Venda', 'Permitida', 'Promoção'],
    ['6541e9v564', 'Casa de João pessoa', 'Locação', 'bloqueada', 'Alugado'],
    ['3567e943', 'Casa do Amizade', 'Locação', 'Permitida', 'Livre'],
    ['4356av01', 'Casa do Bau', 'Locação', 'Permitida', 'Livre'],
    ['3242x322a', 'Casa de Três rios', 'Venda', 'Permitida', 'Vendido'],
    ['23we2433', 'Casa de Nereu Ramos', 'Venda', 'bloqueada', 'A venda']
  ];


  export default function Tabela(){

    return <GenericTable  headers={headers} data={data} />


  } 
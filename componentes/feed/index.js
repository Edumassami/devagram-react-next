import { useEffect, useState } from "react"
import Postagem from "./Postagem";

export default function Feed({ usuarioLogado }) {
    const [listaDePostagens, setListaDePostagens] = useState([]);

    useEffect(() => {
        console.log('Carregar o feed');
        setListaDePostagens([
            {
                id: '1',
                usuario: {
                    id: '1',
                    nome: 'Eduardo Massami',
                    avatar: null
                },
                fotoPost: 'https://ciclovivo.com.br/wp-content/uploads/2018/10/iStock-536613027.jpg',
                descricao: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
                curtidas: [],
                comentarios: [
                    {
                        nome: 'Fulano',
                        mensagem: 'Testando...'
                    }
                ]
            },
            {
                id: '2',
                usuario: {
                    id: '2',
                    nome: 'Miguel Kazuo',
                    avatar: null
                },
                fotoPost:'https://storage.googleapis.com/dpw/app/uploads/2019/04/lazy-loading-nativo-imagens-iframes_.jpg',
                descricao: 'It is a long established fact that a reader will be distracted by the readable content of ',
                curtidas: [],
                comentarios: [
                    {
                        nome: 'Ciclano',
                        mensagem: 'Testando 123...'
                    }
                ]
            }
        ])
    }, [usuarioLogado]);
   
    return (
        <div className="feedContainer largura30pctDesktop"> 
            {listaDePostagens.map (dadosPostagem => (
                <Postagem 
                    key={dadosPostagem.id} 
                    {...dadosPostagem}
                    usuarioLogado={usuarioLogado} 
                />
            ))}
        </div>
    );
}
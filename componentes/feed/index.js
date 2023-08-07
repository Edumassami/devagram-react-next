import { useEffect, useState } from "react";
import Postagem from "./Postagem"
import FeedService from "../../services/FeedService";

const feedService = new FeedService();

function Feed({ 
        usuarioLogado, 
        usuarioPerfil
    }) {
    const [listaDePostagens, setListaDePostagens] = useState([]);

    useEffect(() => {

        const asyncPostagens = async () => {
            setListaDePostagens([]);
            const { data } = await feedService.carregarPostagens(usuarioPerfil?._id);

            const postagensFormatadas = data.map((postagem) => (
                {
                    id: postagem?._id,
                    usuario: {
                        id: postagem?.idUsuario,
                        nome: usuarioPerfil?.nome || postagem.usuario?.nome,
                        avatar: usuarioPerfil?.avatar || postagem.usuario?.avatar 
                    },
                    fotoPost: postagem?.foto,
                    descricao: postagem?.descricao,
                    curtidas: postagem?.likes,
                    comentarios: postagem?.comentarios?.map(c => ({
                        nome: c.nome,
                        mensagem: c.comentario
                    }))
                }
            ))
            setListaDePostagens(postagensFormatadas);

        };

        asyncPostagens();

    }, [  usuarioLogado, usuarioPerfil   ]);

    if (!listaDePostagens.length) {
        return null;
    }


    return (
        <div className="feedContainer largura30pctDesktop">
            {listaDePostagens.length ? (
                listaDePostagens.map((dadosPostagem) => (
                    <Postagem
                        key={dadosPostagem.id}
                        {...dadosPostagem}
                        usuarioLogado={usuarioLogado}
                    />
                ))
            ) : (
                <span>Nenhuma postagem...</span>
            )}
        </div>
    );
}

export default Feed;

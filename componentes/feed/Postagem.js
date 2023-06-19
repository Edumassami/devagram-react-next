import { useState } from "react";
import Link from "next/link";
import Avatar from "../avatar";
import Image from "next/image";
import FazerComentario from "./fazerComentario";

import imagemCurtir from '../../public/imagens/curtir.svg';
import imagemCurtido from '../../public/imagens/curtido.svg';
import imagemComentarioAtivo from '../../public/imagens/comentarioAtivo.svg';
import imagemComentarioCinza from '../../public/imagens/comentarioCinza.svg';

const tamanhoLimiteDescricao = 90;

export default function Postagem({
    usuario,
    fotoPost,
    descricao,
    comentarios,
    usuarioLogado
}) {
    const [deveExibirSecaoComentar, setDeveExibirSecaoComentar] = useState(false);
    const [tamanhoAtualDescricao, setTamanhoAtualDescricao] = useState(tamanhoLimiteDescricao);

    const exibirDescricaoCompleta = () => {
        setTamanhoAtualDescricao(Number.MAX_SAFE_INTEGER);
    }

    const descricaoMaiorQueLimite = () => {
        return descricao.length > tamanhoAtualDescricao;
    }

    const obterDescricao = () => {
        let mensagem = descricao.substring(0, tamanhoAtualDescricao);
        if(descricaoMaiorQueLimite()) {
            mensagem += '...';
        }
        return mensagem;
    }

    return (
        <div className="postagem">
            <Link href={`/perfil/${usuario.id}`}>
                <section className="cabecalhoPostagem">
                    <Avatar src={usuario.avatar} />
                    <strong>{usuario.nome}</strong>
                </section>
            </Link>

            <div className="fotoPostagem">
                <img src={fotoPost} alt='foto da postagem'/> 
            </div>

            <div className="rodapePostagem">
                <div className="acoesPostagem">
                    <Image  
                        src={imagemCurtir}
                        alt='icone curtir'
                        width={20}
                        height={20}
                        onClick={() => console.log('curtir')}
                    />

                    <Image  
                        src={imagemComentarioCinza}
                        alt='icone comentar'
                        width={20}
                        height={20}
                        onClick={() => setDeveExibirSecaoComentar(!deveExibirSecaoComentar)}
                    />

                    <span className="quantidadeCurtidas">
                        Curtido por <strong>32 pessoas</strong>
                    </span>
                </div>

                <div className="descricaoPostagem">
                    <strong className="nomeUsuario">{usuario.nome}</strong>
                    <p className="descricao">
                        {obterDescricao()}
                        {descricaoMaiorQueLimite() && (
                            <span 
                                onClick={exibirDescricaoCompleta} 
                                className="exibirDescricaoCompleta">
                                mais
                            </span>
                        )}
                    </p>
                </div>

                <div className="comentariosPostagem">
                    {comentarios.map((comentario, i) => (
                        <div className="comentario" key={i}>
                            <strong className="nomeUsuario">{comentario.nome}</strong>
                            <p className="descricao">{comentario.mensagem}</p>
                        </div>
                    ))}
                </div>

            </div>

            {deveExibirSecaoComentar && 
                <FazerComentario usuarioLogado={usuarioLogado}/>
            }
        </div>
    )
}
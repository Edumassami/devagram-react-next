import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Avatar from "../avatar";
import { FazerComentario } from "./fazerComentario";
import FeedService from "@/services/FeedService";

import imagemCurtir from '../../public/imagens/curtir.svg';
import imagemCurtido from '../../public/imagens/curtido.svg';
import imagemComentarioAtivo from '../../public/imagens/comentarioAtivo.svg';
import imagemComentarioCinza from '../../public/imagens/comentarioCinza.svg';

const tamanhoLimiteDescricao = 90;
const feedService = new FeedService();

export default function Postagem({
    id,
    usuario,
    fotoPost,
    descricao,
    comentarios,
    usuarioLogado,
    curtidas
}) {
    const [curtidasPostagem, setCurtidasPostagem] = useState(curtidas);
    const [comentariosPostagem, setComentariosPostagem] = useState(comentarios);
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

    const obterImagemComentario = () => {
        return deveExibirSecaoComentar
            ?imagemComentarioAtivo
            :imagemComentarioCinza;
    }

    const comentar = async (comentario) => {

        try {
            await feedService.adicionarComentario(id, comentario);
            setDeveExibirSecaoComentar(false);
            setComentariosPostagem([
                ...comentariosPostagem,
                {
                    nome: usuarioLogado.nome,
                    mensagem: comentario
                }
            ])
        } catch (e) {
            alert(`Erro ao fazer comentário! ` + (e?.response?.data?.erro || ''));
        }
    }

    const usuarioLogadoCurtiuPostagem = () => {
        return curtidasPostagem.includes(usuarioLogado.id);
    }            

    const alterarCurtida = async () => {
        try{
            await feedService.alterarCurtida(id);
            if(usuarioLogadoCurtiuPostagem()) {
                setCurtidasPostagem(
                    curtidasPostagem.filter(idUsuarioQueCurtiu => idUsuarioQueCurtiu !== usuarioLogado.id)
                );
            } else {
                setCurtidasPostagem([
                    ...curtidasPostagem,
                    usuarioLogado.id
                ])
            }
        } catch (e){
            alert(`Erro ao alterar a curtida! ` + (e?.response?.data?.erro || ''));
        }
    }

    const obterImagemCurtida = () => {
        return usuarioLogadoCurtiuPostagem()
            ? imagemCurtido
            : imagemCurtir
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
                        src={obterImagemCurtida()}
                        alt='icone curtir'
                        width={20}
                        height={20}
                        onClick={alterarCurtida}
                    />

                    <Image  
                        src={obterImagemComentario()}
                        alt='icone comentar'
                        width={20}
                        height={20}
                        onClick={() => setDeveExibirSecaoComentar(!deveExibirSecaoComentar)}
                    />

                    <span className="quantidadeCurtidas">
                        Curtido por <strong>{curtidasPostagem.length} pessoas</strong>
                    </span>
                </div>

                <div className="descricaoPostagem">
                    <strong className="nomeUsuario">{usuario?.nome}</strong>
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
                    {comentariosPostagem.map((comentario, i) => (
                        <div className="comentario" key={i}>
                            <strong className="nomeUsuario">{comentario.nome}</strong>
                            <p className="descricao">{comentario.mensagem}</p>
                        </div>
                    ))}
                </div>

            </div>

            {deveExibirSecaoComentar && 
                <FazerComentario comentar={comentar}  usuarioLogado={usuarioLogado}/>
            }
        </div>
    )
}
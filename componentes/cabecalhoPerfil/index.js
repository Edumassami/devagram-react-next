import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import CabecalhoComAcoes from "@/componentes/cabecalhoComAcoes";
import Botao from "../botao";
import Avatar from "../avatar";
import UsuarioService from "@/services/UsuarioService";

import imagemSetaEsquerda from '../../public/imagens/setaEsquerda.svg'

const usuarioService = new UsuarioService();

export default function CabecalhoPerfil({
    usuario
}) {

    const [estaSeguindoUsuario, setEstaSeguindoUsuario] = useState(false);
    const [quantidadeSeguidores, setQuantidadeSeguidores] = useState(0);
    const router = useRouter();

    useEffect(() => {
        if(!usuario) {
            return;
        }

        setEstaSeguindoUsuario(usuario?.segueEsseUsuario);
        setQuantidadeSeguidores(usuario?.seguidores);
        console.log(usuario?.segueEsseUsuario)
    }, [usuario]);

    const obterTextoBotaoSeguir = () => {
        if(estaSeguindoUsuario) {
            return 'Deixar de seguir';
        }

        return 'Seguir';
    }

    const obterCorBotaoSeguir = () => {
        if(estaSeguindoUsuario) {
            return 'invertido';
        }

        return 'primaria'
    }

    const manipularCliqueBotaoSeguir = async () => {
        try{
            await usuarioService.alternarSeguir(usuario._id);
            setQuantidadeSeguidores(
                estaSeguindoUsuario 
                ? (quantidadeSeguidores - 1)
                : (quantidadeSeguidores + 1)
                )
            setEstaSeguindoUsuario(!estaSeguindoUsuario);
            } catch (error) {
            alert('Erro ao seguir/deixar de seguir');
        }
    }

    const aoClicarSetaEsquerda = () => {
        router.back();
    }

    return (
        <div className="cabecalhoPerfil largura30pctDesktop">
            <CabecalhoComAcoes 
                iconeEsquerda={imagemSetaEsquerda}
                aoClicarAcaoEsquerda={aoClicarSetaEsquerda}
                titulo={usuario.nome}
            />

            <hr className="bordaCabecalhoPerfil" />

            <div className='statusPerfil'>
                <Avatar src={usuario.avatar} />
                <div className="informacoesPerfil">
                    <div className="statusContainer">
                        <div className="status"> 
                            <strong>{usuario.publicacoes}</strong>
                            <span>Publicações</span>
                        </div>
                        <div className="status"> 
                            <strong>{usuario.seguidores}</strong>
                            <span>Seguidores</span>
                        </div>
                        <div className="status"> 
                            <strong>{usuario.seguindo}</strong>
                            <span>Seguindo</span>
                        </div>
                    </div>
                    <Botao 
                        texto={obterTextoBotaoSeguir()}
                        cor={obterCorBotaoSeguir()}
                        manipularClique={manipularCliqueBotaoSeguir}
                    />
                </div>

            </div>
        </div>

    )
}
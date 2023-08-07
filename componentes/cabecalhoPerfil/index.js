import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import CabecalhoComAcoes from "../cabecalhoComAcoes";
import Botao from "../botao";
import Avatar from "../avatar";
import UsuarioService from "@/services/UsuarioService";

import imagemSetaEsquerda from '../../public/imagens/setaEsquerda.svg'
import imagemLogout from '../../public/imagens/logout.svg'

const usuarioService = new UsuarioService();

export default function CabecalhoPerfil({
    usuario,
    estaNoPerfilPessoal
}) {

    const [estaSeguindoUsuario, setEstaSeguindoUsuario] = useState(false);
    const [quantidadeSeguidores, setQuantidadeSeguidores] = useState(0);
    const router = useRouter();

    console.log(estaSeguindoUsuario);
    console.log(usuario.seguidores);

    useEffect(() => {
       if(!usuario) {
            return;
        }

        setEstaSeguindoUsuario(usuario.segueEsseUsuario);
        setQuantidadeSeguidores(usuario.seguidores);
    }, [usuario]);

    const obterTextoBotaoPrincipal = () => {

        if(estaNoPerfilPessoal){
            return 'Editar perfil'
        }
        if(estaSeguindoUsuario) {
            return 'Deixar de seguir';
        }

        return 'Seguir';
    }

    const obterCorBotaoPrincipal = () => {
        if(estaNoPerfilPessoal){
            return 'primaria'
        }
        
        if (estaSeguindoUsuario) {
            return 'invertido';
        }
        
    
        return 'primaria'
    }

    const manipularCliqueBotaoPrincipal = async () => {
        if(estaNoPerfilPessoal){
            return router.push('/perfil/editar');
        }

        try{
            await usuarioService.alternarSeguir(usuario._id);
            setQuantidadeSeguidores(
                estaSeguindoUsuario 
                ? (quantidadeSeguidores - 1)
                : (quantidadeSeguidores + 1)
                );
            setEstaSeguindoUsuario(!estaSeguindoUsuario);
            } catch (error) {
            alert('Erro ao seguir/deixar de seguir');
        }
    }

    const aoClicarSetaEsquerda = () => {
        router.back();
    }

    const logout = () => {
        usuarioService.logout();
        router.replace('/');
    }

    const obterElementoDireitaCabecalho = () => {
        if(estaNoPerfilPessoal) {
            return(
                <Image
                    src={imagemLogout}
                    alt='icone logout'
                    onClick={logout}
                    width={23}
                    height={23}
                />
            );
        }
        return null;
    }

    return (
        <div className="cabecalhoPerfil largura30pctDesktop">          
                <CabecalhoComAcoes 
                    iconeEsquerda={estaNoPerfilPessoal ? null : imagemSetaEsquerda}
                    aoClicarAcaoEsquerda={aoClicarSetaEsquerda}
                    titulo={usuario?.nome}
                    elementoDireita={obterElementoDireitaCabecalho()}
                />

            <hr className="linhaDivisoria" />

            <div className='statusPerfil'>
                <Avatar src={usuario?.avatar} />
                <div className="informacoesPerfil">
                    <div className="statusContainer">
                        <div className="status"> 
                            <strong>{usuario?.publicacoes}</strong>
                            <span>Publicações</span>
                        </div>
                        <div className="status"> 
                            <strong>{quantidadeSeguidores}</strong>
                            <span>Seguidores</span>
                        </div>
                        <div className="status"> 
                            <strong>{usuario?.seguindo}</strong>
                            <span>Seguindo</span>
                        </div>
                    </div>
                    <Botao 
                        texto={obterTextoBotaoPrincipal()}
                        cor={obterCorBotaoPrincipal()}
                        manipularClique={manipularCliqueBotaoPrincipal}
                    />
                </div>  

            </div>
        </div>

    )
}
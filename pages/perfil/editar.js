import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import CabecalhoComAcoes from "@/componentes/cabecalhoComAcoes";
import UploadImagem from "@/componentes/uploadImagem";
import comAutorizacao from "@/hoc/comAutorizacao";
import UsuarioService from "@/services/UsuarioService";

import imagemAvatarPadrao from "../../public/imagens/avatar.svg"
import imagemLimpar from "../../public/imagens/limpar.svg"
import { validarNome } from "@/utils/validadores";

const usuarioService = new UsuarioService();

function EditarPerfil({usuarioLogado}) {
    const [avatar, setAvatar] = useState();
    const [inputAvatar, setInputAvatar] = useState();
    const [nome, setNome] = useState();
    const router = useRouter();

    useEffect(() => {
        if(!usuarioLogado){
            return;
        }

        setNome(usuarioLogado.nome);
        setAvatar({
            preview: usuarioLogado.avatar
        });
    }, [])

    const atualizarPerfil = async () => {
        try{
            if(!validarNome(nome)){
                alert('Nome precisa de pelo menos 2 caracteres')
                return
            }

            const corpoRequisicao = new FormData();
            corpoRequisicao.append('nome', nome);

            if(avatar.arquivo) {
                corpoRequisicao.append('file', avatar.arquivo);
            }

            await usuarioService.atualizarPerfil(corpoRequisicao);
            localStorage.setItem('nome', nome);

            if(avatar.arquivo) {
                localStorage.setItem('avatar', avatar.preview);
            }

            router.push('/perfil/eu');
        }catch(error){
            alert('Erro ao editar perfil');
        }
    }

    const aoCancelarEdicao = () => {
        router.push('/perfil/eu');
    }

    const abrirSeletorDeArquivos = () => {
        inputAvatar?.click();
    }

    return (
        <div className='paginaEditarPerfil largura30pctDesktop'>
            <div className='conteudoPaginaEditarPerfil'>
                <CabecalhoComAcoes
                    titulo={'Editar Perfil'}
                    aoClicarAcaoEsquerda={aoCancelarEdicao}
                    textoEsquerda='Cancelar'
                    elementoDireita={'Concluir'}
                    aoClicarElementoDireita={atualizarPerfil}
                />

                <hr className="linhaDivisoria" />

                <div className='edicaoAvatar'>
                    <UploadImagem
                        setImagem={setAvatar}
                        imagemPreview={avatar?.preview || imagemAvatarPadrao.src}
                        imagemPreviewClassName='avatar'
                        aoSetarAReferencia={setInputAvatar}
                    />

                     <span onClick={abrirSeletorDeArquivos}>Alterar foto do perfil</span>

                </div>

                <hr className="linhaDivisoria" />

                <div className='edicaoNome'>
                    <label>Nome</label>
                    <input
                        type='text'
                        value={nome}
                        onChange={e => setNome(e.target.value)}
                    />

                    <Image
                        src={imagemLimpar}
                        alt='icone limpar'
                        width={16}
                        height={16}
                        onClick={() => setNome('')}
                    />
                </div>

                <hr className="linhaDivisoria" />

            </div>


        </div>
    )
}

export default comAutorizacao(EditarPerfil);
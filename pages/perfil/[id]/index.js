import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Feed from "@/componentes/feed";
import comAutorizacao from "@/hoc/comAutorizacao";
import CabecalhoPerfil from "@/componentes/cabecalhoPerfil";
import UsuarioService from "@/services/UsuarioService";

const usuarioService = new UsuarioService();

function Perfil({ usuarioLogado }) {
    const [usuario,setUsuario] = useState ({});
    const router = useRouter(); 

    const obterPerfil = async (idUsuario) => {
        try{
            const { data } = await usuarioService.obterPerfil(idUsuario);
            return data;
        } catch(e) {
            alert('Erro ao obter o perfil do usuário!');
        }
    }

    useEffect(() => {
        if(!router.query.id){
            return;
        }
        const fetchData = async () => {
            const dadosPerfil = await obterPerfil(router.query.id);
            console.log(dadosPerfil);
            
            setUsuario(dadosPerfil);
        }
        
        fetchData();
    }, [router.query.id]);
    return (
        <div className="paginaPerfil"> 
            <CabecalhoPerfil 
                usuarioLogado={usuarioLogado}
                usuario={usuario}
            />
            <Feed usuarioLogado={usuarioLogado} /> 
        </div>
    );
}

export default comAutorizacao(Perfil);
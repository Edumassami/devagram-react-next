import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Feed from "@/componentes/feed";
import comAutorizacao from "@/hoc/comAutorizacao";
import CabecalhoPerfil from "@/componentes/cabecalhoPerfil";

function Perfil({ usuarioLogado }) {
    const [usuario,setUsuario] = useState ({});
    const router = useRouter(); 

    useEffect(() => {

        const fetchData = async () => {

        }
        setUsuario({
            nome: 'Eduardo Massami'
        })

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
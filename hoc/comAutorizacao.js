import Cabecalho from "@/componentes/layout/Cabecalho";
import Rodape from "@/componentes/layout/Rodape";
import UsuarioService from "@/services/UsuarioService"
import { useRouter } from "next/router";

const usuarioService = new UsuarioService();

export default function comAutorizacao(Componente) {
    return (props) => {
        const router = useRouter();

        if (typeof window !== 'undefined') {
            if (!usuarioService.estaAutenticado()) {
                router.replace('/');
                return null; 
            }

            const usuarioLogado = usuarioService.obterInformacoesUsuarioLogado();

            return(
                <>
                    <Cabecalho usuarioLogado={usuarioLogado}/>
                    <Componente usuarioLogado={usuarioLogado} {...props}/>
                    <Rodape usuarioLogado={usuarioLogado}/>
                </>
            )

        }

        return null;
    }
}
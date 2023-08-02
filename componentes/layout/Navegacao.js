import Image from 'next/image';
import imagemHomeAtivo from '../../public/imagens/homeAtivo.svg';
import imagemHomeCinza from '../../public/imagens/homeCinza.svg';
import imagemPublicacaoAtivo from '../../public/imagens/publicacaoAtivo.svg';
import imagemPublicacaoCinza from '../../public/imagens/publicacaoCinza.svg';
import imagemUsuarioAtivo from '../../public/imagens/usuarioAtivo.svg';
import imagemUsuarioCinza from '../../public/imagens/usuarioCinza.svg';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const mapaDeRotas = {
    home: {
        imagemAtivo: imagemHomeAtivo,
        rotasAtivacao: ['/'],
        imagemPadrao: imagemHomeCinza
    },
    publicacao: {
        imagemAtivo: imagemPublicacaoAtivo,
        rotasAtivacao: ['/publicacao'],
        imagemPadrao: imagemPublicacaoCinza
    },
    perfil: {
        imagemAtivo: imagemUsuarioAtivo,
        rotasAtivacao: ['/perfil/eu', 'perfil/editar'],
        imagemPadrao: imagemUsuarioCinza
    }
}

export default function Navegacao({ className }) {
    const  [rotaAtiva, setRotaAtiva] = useState('home');
    const router = useRouter();

    useEffect(() => {
        definirRotaAtiva();
    }, [router.asPath]);

    const definirRotaAtiva = () =>{
        const chavesDoMapaDeRotas = Object.keys(mapaDeRotas);
        const indiceAtivo = chavesDoMapaDeRotas.findIndex(chave => {
            return mapaDeRotas[chave].rotasAtivacao.includes(
                window.location.pathname
            );
        })

        if (indiceAtivo === -1) {
            setRotaAtiva('home');
        } else {
            setRotaAtiva(chavesDoMapaDeRotas[indiceAtivo]);
        }
    }
        
    const obterImagem  = (nome) => {
        const rotaAtivada = mapaDeRotas[nome];

        if (rotaAtiva === nome) {
            return rotaAtivada.imagemAtivo;
        }

        return rotaAtivada.imagemPadrao;
    }

    const aoClicarNoIcone = (nomeRota) => {
        setRotaAtiva(nomeRota);
        router.push(mapaDeRotas[nomeRota].rotasAtivacao[0]);
    }

    return (
        <nav className={`barraNavegacao ${className}`}>
            <ul>
                <li onClick={() => aoClicarNoIcone('home')}>
                    <Image
                        src={obterImagem('home')}
                        alt='icone home'
                        width={20}
                        height={20}
                    />
                </li>

                <li onClick={() => aoClicarNoIcone('publicacao')}>
                    <Image
                        src={obterImagem('publicacao')}
                        alt='icone publicacao'
                        width={20}
                        height={20}
                    />
                </li>

                <li onClick={() => aoClicarNoIcone('perfil')}>
                    <Image
                        src={obterImagem('perfil')}
                        alt='icone usuario'
                        width={20}
                        height={20}
                    />
                </li>
            </ul>
        </nav>
    );
}
import Image from 'next/image';
import imagemHomeAtivo from '../../public/imagens/homeAtivo.svg';
import imagemHomeCinza from '../../public/imagens/homeCinza.svg';
import imagemPublicacaoAtivo from '../../public/imagens/publicacaoAtivo.svg';
import imagemPublicacaoCinza from '../../public/imagens/publicacaoCinza.svg';
import imagemUsuarioAtivo from '../../public/imagens/usuarioAtivo.svg';
import imagemUsuarioCinza from '../../public/imagens/usuarioCinza.svg';

export default function Navegacao({ className }) {
    return (
        <nav className={`barraNavegacao ${className}`}>
            <ul>
                <li>
                    <Image
                        src={imagemHomeAtivo}
                        alt='icone home'
                        width={20}
                        height={20}
                    />
                </li>

                <li>
                    <Image
                        src={imagemPublicacaoCinza}
                        alt='icone publicacao'
                        width={20}
                        height={20}
                    />
                </li>

                <li>
                    <Image
                        src={imagemUsuarioCinza}
                        alt='icone usuario'
                        width={20}
                        height={20}
                    />
                </li>
            </ul>
        </nav>
    );
}
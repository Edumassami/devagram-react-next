import Image from 'next/image';
import imagemLogoHorizontal from '../../public/imagens/logoHorizontal.svg'
import imagemLupa from '../../public/imagens/lupa.svg'
import Navegacao from './Navegacao';

export default function Cabecalho() {
    return(
        <header className='cabecalhoPrincipal'>
            <div className='conteudoCabecalhoPrincipal'>
                <div className='logoCabecalhoPrincipal'>
                    <Image
                        src={imagemLogoHorizontal}
                        alt='logo devagram'
                        layout='fill'
                    />
                </div>

                <div className='barraPesquisa'>
                    <div className='containerImagemLupa'>
                        <Image
                            src={imagemLupa}
                            alt='Icone lupa'
                            layout='fill'
                        />
                    </div>

                    <input
                        type='text'
                        placeholder='Pesquisar'
                        value={''}
                        onChange={() => console.log('pesquisando')}
                    />
                </div>

                <Navegacao className='desktop' />
            </div>
        </header>
    );
}
import Image from 'next/image'



export default function CabecalhoComAcoes({
    className,
    iconeEsquerda, 
    textoEsquerda = null,
    aoClicarAcaoEsquerda,
    titulo,
    elementoDireita
}) {
    return (
        <div className={`cabecalhoComAcoes ${className}`}> 
            {iconeEsquerda ? (
                <Image 
                    src={iconeEsquerda}
                    alt='icone esquerda cabeçalho com ações'
                    onClick={aoClicarAcaoEsquerda}
                    width={25}
                    height={25}
                />
            ) : (
                textoEsquerda !== null && (
                    <span className="cabecalhoComAcoesTextoEsquerda"> onClick={}
                        {textoEsquerda}
                    </span>
                )
            )}

            <h3>{titulo}</h3>

            {elementoDireita &&
                <button 
                    type='button'
                >
                    {elementoDireita}
                </button>
            }
        </div>
    )
}
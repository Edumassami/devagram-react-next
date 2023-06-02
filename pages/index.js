import Botao from "@/componentes/botao";
import  UploadImagem  from "../componentes/uploadImagem";
import Avatar from "@/componentes/avatar";
import { useRef, useState } from "react";

export default function Home() {
  const [imagem, setImagem] = useState(null);
  const referenciaInput = useRef(null);

  console.log(imagem);

  return (
    <>
    <h1>Olá Mundo!</h1>
    <button onClick={() => referenciaInput?.current?.click()}>abrir seletor de arquivos</button>

    <UploadImagem 
      setImagem={setImagem} 
      imagemPreview={imagem?.preview}
      aoSetarAReferencia={(ref) =>referenciaInput.current = ref}
    />

    <div style={{width: 200}}>
      <Avatar />
      <Botao texto={'Login'} desabilitado={false} cor="invertido" manipularClique={() => console.log('Botão clicado')} />
    </div>
    </>
  );
};

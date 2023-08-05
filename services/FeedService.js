import DevagramApiService from "./DevagramApiService";

export default class FeedService extends DevagramApiService {
    async carregarPostagens(usuarioId) {
        let url = '/feed';
        if(usuarioId) {
            url += `?id=${usuarioId}`;
        }
        return this.get(url);
    }

    async adicionarComentario(idPostagem, comentario) {
        return this.put(`/comentario?id=${idPostagem}`, {
            comentario
        });
    }

    async alterarCurtida(idPostagem) {
        return this.put(`/like?id=${idPostagem}`);
    }

    async fazerPublicacao(dadosPublicacao){
        return this.post('/publicacao', dadosPublicacao);
    }
}
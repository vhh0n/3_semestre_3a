import {Link, useParams} from "react-router-dom";
function Filme() {
    const {id} = useParams();
    return (
        <div>
            <h1>Filme</h1>
            <p>Informações sobre o filme aqui: {id}</p>
            <Link to="/Inicio">Voltar para a página inicial</Link>
        </div>
    );
}

export default Filme;
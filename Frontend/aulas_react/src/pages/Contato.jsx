import { Link } from "react-router-dom";
function Contato() {
    return (
        <div>
            <h1>Contato</h1>
            <p>Informações de contato aqui.</p>
            <Link to="/Inicio">Voltar para a página inicial</Link>
        </div>
    );
}

export default Contato;
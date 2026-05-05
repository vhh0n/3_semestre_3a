import { Link } from "react-router-dom";
function Inicio() {
    return (
        <div>
            <h1>Bem Vindo</h1>
            <p>Mais informações aqui.</p>
            <Link to="/Detalhes">Detalhes</Link>
            <Link to="/Contato">Contato</Link>
        </div>
    );
}

export default Inicio;
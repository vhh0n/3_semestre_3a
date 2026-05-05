import { Link } from "react-router-dom";
function Detalhes() {
    return (
        <div>
            <h1>Detalhes</h1>
            <p>Informações detalhadas aqui.</p>
            <Link to="/Contato">Contato</Link>
        </div>
    );
}

export default Detalhes;
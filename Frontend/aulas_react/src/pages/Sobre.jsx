import {Link} from "react-router-dom";
function Sobre() {
    return (
        <div>
            <h1>Sobre</h1>
            <p>Esta é a página sobre nós.</p>
            <Link to="/">Voltar para a página inicial</Link>
        </div>
    );
}

export default Sobre;
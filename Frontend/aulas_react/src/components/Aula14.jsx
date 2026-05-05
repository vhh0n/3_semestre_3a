import { estilos } from "../style/Estilos"
import { Link, useNavigate } from "react-router-dom";

const Aula14 = () => {
    const navigate = useNavigate();
    return (
        <div style={estilos.cardAula}>
            <h2>Aula 14 - React Router - Navegação em React</h2>
            <h3>Biblioteca que permite criar e gerenciar rotas em React</h3>
            <hr />
            <h3>Navegação com Link</h3>
            <Link to="/sobre">Ir para a página Sobre</Link>
            <br />
            <Link to="/">Voltar para a página Principal</Link>
            <br />
            <Link to="/blablabla">Página não encontrada</Link>
            <br />
            <h3>Navegação com programação usanco useNavigate</h3>
            <button onClick={() => navigate("/sobre")}>Ir para a página Sobre</button>
            <hr />

            <h3>Rotas dinâmicas / Rotas com parâmetros (useParams)</h3>
            <button onClick={() => navigate("/perfil/Vh")}>Ir para a página do Usuário1</button>
            <button onClick={() => navigate("/perfil/Joao")}>Ir para a página do Usuário2</button>
            <hr />

            <h3>Navegação com programação com useNavigate</h3>
            <button onClick={() => navigate('/sobre')}>Sobre</button>
            <hr />

            <h3>Rotas com parâmetros (useParams)</h3>
            <button onClick={() => navigate("/filme/1")}>Ir para a página do Filme1</button>
            <button onClick={() => navigate("/filme/2")}>Ir para a página do Filme2</button>
            <button onClick={() => navigate("/filme/3")}>Ir para a página do Filme3</button>
            <button onClick={() => navigate("/filme/4")}>Ir para a página do Filme4</button>
            <hr />

        </div>
    )
}

export default Aula14;
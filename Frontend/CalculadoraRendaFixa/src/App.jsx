import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Calculadora from './pages/Calculadora';
import Sobre from './pages/Sobre';

function App() {
  return (
    //Habilita o sistema de navegação por rotas
    <BrowserRouter>
      {/* Barra de navegação, para aparacer em todas as páginas */}
      <NavBar />
      {/* Área do conteúdo principal, onde as páginas serão renderizadas */}
      <main className="Conteudo-principal">
        <Routes>
          <Route path="/" element={<Calculadora />} />
          <Route path="/sobre" element={<Sobre />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
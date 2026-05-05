import { View, Text, FlatList } from 'react-native';
import Hr from './Hr';
import Aula03_Exercicio from './Aula03_Exercicio';
import Aula03_Exercicio2 from './Aula03_Exercicio2';


const Aula03 = () => {
    //Definindo um vetor de turmas como fonte de dados para a FlatList
    const turmas = [
        { id: 1, turma: '3º A', pg: 10 },
        { id: 2, turma: '3º B', pg: 8 },
        { id: 3, turma: '2º A', pg: 6 },
        { id: 4, turma: '2º B', pg: 2 },
    ];

    const exibirItensLista = ({ item }) =>
    (
        <Text>{item.turma}</Text>
    )

    const exibirItensListaInterclasse = ({ item }) =>
    (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
            <Text>{item.id}º</Text>
            <Text>Turma: {item.turma}</Text>
            <Text>Pontos: {item.pg}</Text>
        </View>
    )

    return (
        <View>
            <Hr />
            <Text>Aula 03 - Listas com FlatList</Text>
            <Text>Aprendendo a manipular listas em React Native</Text>
            <Hr />
            <Text>Lista de turmas</Text>
            {
                turmas.map((linha) => (
                    <View key={linha.id}>
                        <Text key={linha.id}>{linha.turma}</Text>
                    </View>
                ))
            }
            <Text>Lista com o FlatList</Text>
            {/* Componente FlatList para exibir dados. Este componente é mais ptimizado e eficiente para a exibiçao de listas */}
            <FlatList
                data={turmas} // Passando o vetor de turmas para o FlatList como Props
                renderItem={exibirItensLista} //Função que "Desenha/renderiza" os itens
                keyExtractor={(item) => item.id} //Função que gerencia as chaves únicas da lista
            />
            <Hr />
            {/* Classificação de Interclasse do SESI utilizando FlatList */}
            <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold' }}>
                Interclasse do SESI
            </Text>
            <FlatList
                data={turmas}
                renderItem={exibirItensListaInterclasse}
                keyExtractor={(item) => item.id}
            />
            <Hr />
            <Aula03_Exercicio />
            <Aula03_Exercicio2 />
        </View>

    )
    

}
export default Aula03;
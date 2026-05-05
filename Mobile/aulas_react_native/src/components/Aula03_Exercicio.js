import { View, Text, FlatList } from 'react-native'
import Hr from './Hr';

const Aula03_Exercicio = () => {

    const alunos = [
        { id: 1, aluno: 'João Mamãe Ana Clara', materia: 'Matemática', media: 8.5, faltas: 2 },
        { id: 2, aluno: 'Fael Alah', materia: 'Português', media: 9.0, faltas: 1 },
        { id: 3, aluno: 'Pedro67', materia: 'História', media: 7.5, faltas: 3 },
        { id: 4, aluno: 'BrunoTonel', materia: 'Ciências', media: 9.5, faltas: 0 },
    ];

    const exibirItensLista = ({ item }) =>
    (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
            <Text>{item.id}º</Text>
            <Text>Aluno: {item.aluno}</Text>
            <Text>Matéria: {item.materia}</Text>
            <Text>Média: {item.media}</Text>
            <Text>Faltas: {item.faltas}</Text>
        </View>
    )

    return (
        <View>
            <Hr />
            <Text style={{ textAlign: 'left', fontSize: 20, fontWeight: 'bold', flex: 1 }}>
                Lista de Alunos
            </Text>
            <FlatList
                data={alunos}
                renderItem={exibirItensLista}
                keyExtractor={(item) => item.id}
            />
        </View>
    )
}

export default Aula03_Exercicio;
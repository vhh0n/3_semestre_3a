//Aqui é onde importamos todas as bibliotecas e componentes igual ao React
import { StatusBar } from 'expo-status-bar';
// todo o componente do React Native tem que ser importado aqui
import { StyleSheet, Text, View } from 'react-native';

export default function Aula01() {
    return (
        // O componente View é como se fosse uma div, Main, header, section
        <View style={styles.container}>

            <Text style={styles.titulo}>Hello, World!</Text>
            <Text style={styles.titulo}>Olá, esse é o meu primeiro app</Text>
            <StatusBar style="auto" />

            <View style={{ width: '100%' }}>
                <Text style={styles.texto}>Esquerda na cor azul</Text>
                <Text style={styles.texto2}>Direita em Negrito</Text>
                <Text style={styles.texto3}>Centro na cor vermelha</Text>

            </View>


        </View>

    );
}

// Para fazermos uma estilização utilizamos um objeto e o componente StyleSheet
// Esse objeto é igual fizemos no react
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    titulo: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'blue',
    },
    texto: {
        fontSize: 16,
        color: 'blue',
        textAlign: 'left',
    },
    texto2: {
        fontSize: 16,
        color: 'black',
        textAlign: 'right',
        fontWeight: 'bold',
    },
    texto3: {
        fontSize: 16,
        color: 'red',
        textAlign: 'center',
    },
});

    

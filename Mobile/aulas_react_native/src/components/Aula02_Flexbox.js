import { View, Text, StyleSheet } from 'react-native';

export default function Aula02_Flexbox() {
    return (
        <View style={estilos.conteudo}>
            <Text style={estilos.caixa}>1</Text>
            <Text style={estilos.caixa}>2</Text>
            <Text style={estilos.caixa}>3</Text>
        </View>
    );
}

const estilos = StyleSheet.create({
    conteudo: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 200,
        backgroundColor: 'blue',
    },
    caixa: {
        width: 50,
        height: 50,
        backgroundColor: 'lightblue',
        textAlign: 'center',
        lineHeight: 50 ,
    }
})
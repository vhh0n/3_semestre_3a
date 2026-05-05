import { View, Text, Image, TextInput, Button, TouchableOpacity, StyleSheet} from 'react-native';
import Logo from '../../assets/icon.png'
import { useState } from 'react';
import {LinearGradient} from 'expo-linear-gradient';
import Aula02_Flexbox from './Aula02_Flexbox';
import Hr from './Hr';


const Aula02 = () => {
    const [nome, setNome] = useState('');


    return (
        <View>
            <Hr />
            <Text>----------------------------------------------</Text>
            <Text>Aula 02</Text>
            <Text>Conhecendo o React Native</Text>

            <Image source={{ uri: 'https://picsum.photos/300/200' }}
                style={{ width: 300, height: 200 }} />

            {/* Inserindo uma imagem diretamente do caminho do aqruivo*/}
            <Image source={require('../../assets/icon.png')}
                style={{ width: 50, height: 50 }} />

            {/* Inserindo uma imagem referenciando como componente*/}
            <Image source={Logo}
                style={{ width: 50, height: 50 }} />

            <TextInput placeholder='Digite seu nome'
                style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
                onChangeText={setNome} />
            <Text>Seu nome é: {nome} </Text>

            {/* Botão com poucas opções de personalização*/}
            <Button title='Clique aqui' onPress={() => console.log({ nome })} />

            {/* Botão com mais opções de personalização*/}
            <TouchableOpacity onPress={() => console.log({ nome })}
                style={estilos.botao}>

                <Image source={Logo}
                    style={{ width: 50, height: 50 }} />

                <Text style={estilos.botaoTexto}>Clique aqui</Text>
            </TouchableOpacity>

                {/* Botão com gradiente*/}
                <LinearGradient
                    colors={['#7db5ff', '#7dffb3']}
                    style={estilos.botao}
                >
                    <Text style={estilos.botaoTexto}></Text>
                </LinearGradient>

                <Aula02_Flexbox/>
        </View>
    );
}

//utilizamos o StyleSheet do React Native que ele converta a estilização para o padrão dos componentes nativos
const estilos = StyleSheet.create({
    botao: {
        backgroundColor: 'purple',
        padding: 12,
        alignItems: 'center',
        borderRadius: 8
    },
    botaoTexto: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16
    }

})
export default Aula02;
import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Image, StatusBar } from 'react-native';
import Estilos, { corPrincipal, corSecundaria, corTextos, corFundo, corFundo2, corPlaceholder } from './Estilos';
import { MaterialIcons } from '@expo/vector-icons';

const ListaCompras = () => {
    //Variável de estado para o item que irei incluir na lista
    const [item, setItem] = useState('');
    const [listaCompras, setListaCompras] = useState([
        { id: 1, produto: '1 Cartela de Ovos', comprado: false },
        { id: 2, produto: '2 Nikito de Morango', comprado: false }
    ]);

    //Função para exibir o item da lista
    const exibirItem = ({ item }) => {
        return (
            <TouchableOpacity style={Estilos.botaoItem}>
                <Text style={Estilos.textoBotaoItem}>{item.produto}</Text>
                <MaterialIcons name="delete-outline" size={24} color={corPrincipal} />
            </TouchableOpacity>
        )
    }

    const botaoAdicionar = () => {
        //Criando um novo item para a lista
        const novoItem = {
            id: Date.now(),
            produto: item,
            comprado: false
        }
        //Criando uma nova lista com o item adicionado, mantendo os itens anteriores
        const novaLista = [...listaCompras, novoItem];
        //Atributo a nova lista de compras que estou exibindo no app
        setListaCompras(novaLista);
        setItem('');
    }

    return (
        <View style={Estilos.conteudo}>
            <StatusBar backgroundColor={corFundo} barStyle="light-content" />
            <View style={Estilos.header}>
                <Image source={require('../assets/logo_lista_compras.png')} style={Estilos.logo} />
            </View>

            <View style={Estilos.corpo}>
                <View style={Estilos.inputContainer}>
                    <TextInput
                        placeholder="Adicione um novo item na lista"
                        style={Estilos.input}
                        value={item}
                        onChangeText={setItem}
                        placeholderTextColor={corPlaceholder}
                    />
                    <TouchableOpacity style={Estilos.botao} onPress={botaoAdicionar}>
                        <Text style={Estilos.textoBotao}>+</Text>
                    </TouchableOpacity>
                </View>

                {/* Lista dos Produtos */}
                <FlatList
                    //no atributo data enviamos o vetor de dados da lista
                    data={listaCompras}
                    //no atributo RenderItem enviamos a função que desenha o item
                    renderItem={exibirItem}
                    //no atributo keyExtractor precisamos enviar um id unico
                    keyExtractor={item => item.id}
                />
            </View>
        </View>
    )
}

export default ListaCompras
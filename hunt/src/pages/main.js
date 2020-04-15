import React, { Component } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

// View //semelhante a uma div

// Text //semelhante a um p ou h

// FlatList //faz a função de um array.map de forma mais performatica

//TouchableOpacity //um button que quando o usuário clica ele diminui a opacidade

import api from '../services/api';

export default class Main extends Component {
  state = {
    productInfo: {},
    docs: [],
    page: 1,
  };

  componentDidMount() {
    this.loadProducts();
  }

  loadProducts = async (page = 1) => {
    const response = await api.get(`/products?page=${page}`);

    const { docs, ...productInfo } = response.data;

    this.setState({ docs: [...this.state.docs, ...docs], productInfo, page });
  };

  loadMore = () => {
    const { page, productInfo } = this.state;

    if (page === productInfo.pages) return;

    const pageNumer = page + 1;

    this.loadProducts(pageNumer);
  };

  renderItem = ({ item }) => {
    return (
      <View style={styles.productContainer}>
        <Text style={styles.productTitle}>{item.title}</Text>
        <Text style={styles.productDescription}>{item.description}</Text>

        <TouchableOpacity
          style={styles.productButton}
          onPress={() => {
            this.props.navigation.navigate('Product', { product: item });
          }}
        >
          <Text style={styles.productButtonText}>Acessar</Text>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Página Main:</Text>
        <FlatList
          contentContainerStyle={styles.list}
          data={this.state.docs}
          keyExtractor={(item) => item._id}
          renderItem={this.renderItem}
          onEndReached={this.loadMore}
          onEndReachedThreshold={0.2}
        />
      </View>
    );
  }
}

// onEndReached={this.loadMore}  //chama uma função quando chega no final da lista
// onEndReachedThreshold={0.2}   //ativa o onEndReached faltando 20% para termina a listagem

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },

  list: {
    padding: 20,
  },

  productContainer: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 5,
    padding: 20,
    marginBottom: 20,
  },

  productTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },

  productDescription: {
    fontSize: 16,
    color: '#999',
    marginTop: 5,
    lineHeight: 24,
  },

  productButton: {
    height: 42,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#DA552F',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },

  productButtonText: {
    fontSize: 16,
    color: '#DA552F',
    fontWeight: 'bold',
  },
});

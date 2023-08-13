import { View, Text, SafeAreaView, TextInput, StyleSheet, Button, Alert } from 'react-native'
import React, { useState, useEffect } from 'react';
import axios from 'axios'

const NorthwindAPIPractice = () => {
  const [name, setname] = useState('');
  const [price, setprice] = useState('');
  const [stock, setstock] = useState('');

  const [products, setProducts] = useState([]);

  const add = () => {

    var newItem = {
      name: name,
      price: price,
      stock: stock
    }

    axios.post('https://northwind.vercel.app/api/categories', newItem)
      .then(res => {
        Alert.alert("A new product has been added!!");
      })
      .catch(error => {
        console.error("Error adding product:", error);
      });
  }

  const fetchData = () => {
    axios.get('https://northwind.vercel.app/api/categories')
      .then(res => {
        // setProducts(res.data)
        const filteredProducts = res.data.filter(product => product.id > 8);
        setProducts(filteredProducts);
      })
      .catch(error => {
        console.error("Error getting products:", error);
      });
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>Name:</Text>
          <Text style={styles.label}>Unit Price:</Text>
          <Text style={styles.label}>Units In Stock:</Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput style={styles.input} value={name} onChangeText={setname} />
          <TextInput style={styles.input} value={price} onChangeText={setprice} />
          <TextInput style={styles.input} value={stock} onChangeText={setstock} />
        </View>
        <View style={styles.btnPost}><Button style={{ borderWidth: 1, borderColor: 'red', borderRadius: 5 }} title="Add" onPress={add} /></View>
      </View>


      <View style={styles.containerGet}>
        <Button style={styles.btnGet} title="Get Data" onPress={fetchData} />
        {products.map((product, index) => (
          <View key={index} style={[styles.productContainer, product.price > 50 ? { backgroundColor: 'red' } : null]}>
            <Text style={styles.labelGet}>Name: {product.name}</Text>
            <Text style={styles.labelGet}>Price: {product.price}</Text>
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  containerGet: {
    flex: 2,
    marginLeft: 20,
    alignItems: 'flex-start',
  },
  productContainer: {
    marginBottom: 10,
  },
  btnPost: {
   flex: 1,
  },
  btnGet: {
    borderWidth: 1, 
    borderColor: 'red', 
    borderRadius: 5
   },
  labelContainer: {
    flex: 1,
    marginRight: 10,
  },
  label: {
    fontSize: 17,
    fontWeight: 'bold',
    paddingBottom: 20,
  },
  labelGet: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  inputContainer: {
    flex: 2,
    marginRight: 10,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },

});

export default NorthwindAPIPractice

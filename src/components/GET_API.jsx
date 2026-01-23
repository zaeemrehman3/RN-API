import { View, Text, FlatList, StyleSheet ,ActivityIndicator, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GET_API = () => {

  const [myData, setMyData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('https://fakestoreapi.com/products')
      .then((result) => {
        setMyData(result.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("API Error:", error);
        setLoading(false);
      });
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
    <Text style={styles.email}>{item.id}</Text>
    <Image source={{uri:item.image}} width={50} height={50} />
    <Text style={styles.name}>{item.title}</Text>
    <Text style={styles.email}>{item.description}</Text>
    <Text style={styles.email}>{item.category}</Text>
    <Text style={styles.email}>${item.rating.rate}</Text>
    <Text style={styles.email}>{item.rating.count}</Text>
    </View>
  );

  if(loading){
    return(
      <View style={styles.loader} >
        <ActivityIndicator size={"large"} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={myData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

export default GET_API;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  card: {
    backgroundColor: '#f1f1f1',
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
  },
  email: {
    fontSize: 14,
    color: 'gray',
  },

  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

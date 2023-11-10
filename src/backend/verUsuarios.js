import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
//Este componente VerUsuarios voy a llamarlo desde screenUno para que forme parte del stack de navegacion
const ListaUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://192.168.100.57:3001/api/usuarios');

        if (!response.ok) {
          throw new Error('La solicitud no fue exitosa');
        }

        const data = await response.json();
        setUsuarios(data);
        console.log(data);
      } catch (error) {
        console.error('Error en la solicitud:', error);
        setUsuarios([{ nombre: 'Error', contraseña: 'Error', email: 'Error' }]);
      }
    };

    fetchData(); // Llama a la función asincrónica para obtener los datos
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Usuarios</Text>
      {usuarios.length > 0 ? (
        
        <FlatList
          data={usuarios}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.userItem}>
              <Text>ID: {item.ID_u}</Text>
              <Text>Nombre: {item.Nbr_u}</Text>
              <Text>Imagen: {item.Img_u}</Text>
              <Text>Contraseña: {item.Pass_u}</Text>
              <Text>Email: {item.Email_u}</Text>
              <Text>Token: {item.token}</Text>
            </View>
          )}
        />
        
      ) : (
        <Text>Cargando...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  userItem: {
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    borderRadius: 8,
  },
});

export default ListaUsuarios;
import React, { useState, useEffect } from 'react';
import { Text, View, Pressable, Modal, TextInput, Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import axios from 'axios';

import { faLocationDot, faPaw, faPerson } from '@fortawesome/free-solid-svg-icons';
import CustomMarker from './CustomMarker';

import { styles } from './styles';

export default function ServicosScreen() {
  const [location, setLocation]             = useState(null);
  const [selectedCoords, setSelectedCoords] = useState(null);
  const [modalVisible, setModalVisible]     = useState(false);
  const [animalType, setAnimalType]         = useState('');
  const [observations, setObservations]     = useState('');
  const [sightings, setSightings]           = useState([]);
  const [selectedSighting, setSelectedSighting] = useState(null);

  const fetchSightings = async () => {
    try {
      const response = await axios.get('http://10.4.132.134:3000/api/buscarLocalizacoesProximas');
      setSightings(response.data);
    } catch (error) {
      console.error('Erro ao buscar avistamentos:', error);
    }
  };

  useEffect(() => {
    fetchSightings();
  }, []);

  const getCurrentLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permissão de localização não concedida.');
        return;
      }
      const userLocation = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = userLocation.coords;
      setLocation({ latitude, longitude });
    } catch (error) {
      console.error('Erro ao obter localização:', error);
    }
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const handleReportSighting = async () => {
    try {
      if (!selectedCoords) {
        console.log('Selecione uma localização no mapa.');
        return;
      }

      const { latitude, longitude } = selectedCoords;

      await axios.post('http://10.4.132.134:3000/api/localizacao', {
        userId: 1,
        animalType,
        observations,
        latitude,
        longitude,
      });

      console.log('Avistamento registrado com sucesso!');
      setModalVisible(false);
      setSelectedCoords(null)
      fetchSightings();
    } catch (error) {
      console.error('Erro ao reportar avistamento:', error);
    }
  };

  const handleMapPress = (event) => {
    const { coordinate } = event.nativeEvent;

    const existingSighting = sightings.find((sighting) => {
      if( coordinate.latitude == sighting.latitude && coordinate.longitude == sighting.longitude){
        return true;
      } else {
        return false;
      }
    });

    if(existingSighting){
      setAnimalType(existingSighting.animalType || '');
      setObservations(existingSighting.observations || '');
    } else {
      setAnimalType('');
      setObservations('');
    }

    setSelectedSighting(existingSighting);
    setSelectedCoords(coordinate);
    setModalVisible(true);
  };

  const handleEditSighting = async () => {
    const updatedSighting = {
      id: selectedSighting.id,
      animalType,
      observations,
      latitude: selectedSighting.latitude,
      longitude: selectedSighting.longitude,
    };
  
    try {
      // Fazer a requisição PUT para atualizar o avistamento
      const response = await axios.put(`http://10.4.132.134:3000/api/avistamento/${selectedSighting.id}`, updatedSighting);
      console.log('Avistamento atualizado com sucesso:', response.data);
  
      setModalVisible(false);
      setSelectedCoords(null);
      fetchSightings();
    } catch (error) {
      console.error('Erro ao atualizar avistamento:', error);
      // Tratar o erro, se necessário
    }
  };

  const handleDeleteSighting = async () => {
    try {
      const response = await axios.delete(`http://10.4.132.134:3000/api/avistamento/excluir/${selectedSighting.id}`);
      console.log('Avistamento excluido com sucesso:', response.data);
  
      setModalVisible(false);
      setSelectedCoords(null);
      fetchSightings();
    } catch (error) {
      console.error('Erro ao atualizar avistamento:', error);
    }
  };

  const handleSwitchScreen = () => {
    console.log('Alternar entre telas');
  };

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        onPress={handleMapPress}
        initialRegion={{
          latitude: -22.453369607770558,
          longitude: -44.44934169526279,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {sightings.map((sighting) => (
          <Marker
          key={sighting.id}
          coordinate={{ latitude: sighting.latitude, longitude: sighting.longitude }}
        >
          <CustomMarker
            icon={faPaw}
            iconColor="green"
            iconSize={30}
          />
        </Marker>
        ))}
        {selectedCoords && (
          <Marker coordinate={selectedCoords} >
            <CustomMarker
              icon={faLocationDot}
              iconColor="red"
              iconSize={30}
            />
            </Marker>
          )}
        {location && (
          <Marker
            coordinate={{ latitude: location.latitude, longitude: location.longitude }}
            title="Sua Localização"
          >
            <CustomMarker
              icon={faPerson}
              iconColor="blue"
              iconSize={30}
            />
          </Marker>
        )}
      </MapView>

      <View style={{ position: 'absolute', top: 20, right: 20 }}>
        <Button title="Alternar Tela" onPress={handleSwitchScreen} />
      </View>

      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeader}>Informe os detalhes do animal:</Text>
            <TextInput
              style={styles.inputModal}
              value={animalType}
              onChangeText={setAnimalType}
            />
            <TextInput
              style={styles.inputModal}
              value={observations}
              onChangeText={setObservations}
              multiline={true}
              numberOfLines={4}
            />
            {selectedSighting ? (
              <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 }}>
                <Pressable style={styles.buttonInfoModal}    onPress={handleEditSighting}><Text style={styles.textButton}>Editar</Text></Pressable>
                <Pressable style={styles.buttonDangerModal}  onPress={handleDeleteSighting}><Text style={styles.textButton}>Excluir</Text></Pressable>
                <Pressable style={styles.buttonWarningModal} onPress={() => { setModalVisible(false); setSelectedSighting(null); }}><Text style={styles.textButton}>Cancelar</Text></Pressable>
              </View>
              ) : (
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 }}>
                  <Pressable style={styles.buttonInfoModal} onPress={handleReportSighting}><Text style={styles.textButton}>Salvar</Text></Pressable>
                  <Pressable style={styles.buttonWarningModal} onPress={() => setModalVisible(false)}><Text style={styles.textButton}>Cancelar</Text></Pressable>
                </View>
              )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

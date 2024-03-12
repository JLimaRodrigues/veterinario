import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';

// Fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const MenuLateral = ({ navigation }) => {
  // ... Your Menu component code ...

  return (
    <View style={styles.screen}>
      {/* Your Menu component content */}
      <TouchableOpacity style={styles.menuButton} onPress={() => navigation.closeDrawer()}>
        <FontAwesomeIcon icon={faBars} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  // ... your existing styles ...
});

export default MenuLateral;
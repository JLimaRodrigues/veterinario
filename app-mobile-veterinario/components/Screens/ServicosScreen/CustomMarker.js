import React from 'react';
import { View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

const CustomMarker = ({ icon, iconColor, iconSize }) => {
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <FontAwesomeIcon icon={icon} color={iconColor} size={iconSize} />
    </View>
  );
};

export default CustomMarker;

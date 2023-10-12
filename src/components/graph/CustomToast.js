import React from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import Colors from '../../style/colors';

const CustomToast = ({ message, onClose }) => {
  return (
    <Modal transparent={true} visible={true}>
      <View style={styles.modalContainer}>
        <View style={styles.toastContainer}>
          <View style={styles.blueBackground}></View>
          <View style={styles.whiteBackground}>
            <Text style={styles.message}>{message}</Text>
            <TouchableOpacity style={styles.okButton} onPress={onClose}>
              <Text style={styles.okText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    alignItems: 'center',
  },
  toastContainer: {
    backgroundColor: 'transparent',
    padding: 16,
    borderRadius: 8,
    width: '50%',
    flexDirection: 'row', // Use flexDirection 'row' to align two views horizontally
  },
  blueBackground: {
    backgroundColor: Colors.info,
    width: '5%', // Adjust the percentage as needed
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  whiteBackground: {
    backgroundColor: Colors.white,
    width: '95%', // Adjust the percentage as needed
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    color: Colors.black,
    marginBottom: 8,
  },
  okButton: {
    backgroundColor: Colors.white,
    padding: 8,
    borderRadius: 5,
  },
  okText: {
    color: Colors.black,
    fontWeight: 'bold',
  },
});

export default CustomToast;

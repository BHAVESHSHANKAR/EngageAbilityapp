import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function Gobacktohome() {
    const navigation = useNavigation();

    const handleGoBack = () => {
        navigation.navigate('Home'); // Assuming 'Home' is the route name for the home screen
    };

    return (
        <View style={styles.goBack}>
            <TouchableOpacity style={styles.goBackButton} onPress={handleGoBack}>
                <Text style={styles.buttonText}>Go Back to Home</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    goBack: {
        alignItems: 'center',
        padding: 20,
    },
    goBackButton: {
        backgroundColor: '#00b4db', // Example color, adjust as per your design
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 3, // For Android shadow
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default Gobacktohome;
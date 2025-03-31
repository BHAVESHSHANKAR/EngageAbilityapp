import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from '../components/Header';

const HomePage = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.wrapper}>
            {/* Status Bar Setup */}
            <StatusBar backgroundColor="#2b5876" barStyle="light-content" />
            
            {/* Header Component */}
            <Header />

            <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
                <Text style={styles.title}>Welcome to the EngageAbility Platform</Text>
                <Text style={styles.description}>
                    EngageAbility is an Activity Engagement Platform that provides interactive 
                    and stimulating activities designed for Deaf & Dumb individuals and 
                    people with mental disabilities.
                </Text>

                {/* Start Activities Button */}
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CareTaker')}>
                    <Text style={styles.buttonText}>Start Activities</Text>
                </TouchableOpacity>

                {/* Home Image */}
                <Image source={require('../assets/images/homeimage.webp')} style={styles.image} />

                {/* Mission Section */}
                <View style={styles.missionContainer}>
                    <Text style={styles.missionTitle}>Our Mission</Text>
                    <Text style={styles.missionDescription}>
                        Our platform is dedicated to enhancing the lives of Deaf & Dumb individuals and 
                        mentally disabled people by offering activities that promote cognitive, physical, and 
                        emotional well-being.
                    </Text>

                    <Text style={styles.featuresTitle}>Key Features:</Text>
                    <View style={styles.featuresList}>
                        {['Enjoyable', 'Stress Relief', 'Interactive', 'Stimulating'].map((feature, index) => (
                            <Text key={index} style={styles.featureItem}>{feature}</Text>
                        ))}
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: '#f5f7fa',
    },
    container: {
        flexGrow: 1,
        padding: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1a3c5e',
        textAlign: 'center',
        marginBottom: 15,
    },
    description: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    button: {
        backgroundColor: '#00b4db',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 30,
        marginBottom: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    image: {
        width: 300,
        height: 200,
        resizeMode: 'contain',
        marginBottom: 20,
    },
    missionContainer: {
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        marginBottom: 20,
        width: '100%',
    },
    missionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1a3c5e',
        textAlign: 'center',
        marginBottom: 10,
    },
    missionDescription: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    featuresTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#34495e',
        textAlign: 'center',
        marginBottom: 10,
    },
    featuresList: {
        alignItems: 'center',
    },
    featureItem: {
        fontSize: 16,
        color: '#2c3e50',
        marginBottom: 5,
    },
});

export default HomePage;

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, StyleSheet, Dimensions, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from '../components/Header'; // Assuming Header is already converted to RN
import Gobacktohome from '../components/gobacktohome'; // Assuming this is converted to RN
import LoginIllustration from '../assets/images/caretakerimage.webp'; // Ensure this image is available in your RN project

const { width, height } = Dimensions.get('window');

function CareTakerSig() {
    const navigation = useNavigation();
    const [name, setName] = useState('');
    const [institute, setInstitute] = useState('');

    const handleAccess = () => {
        if (name.trim() && institute.trim()) {
            Alert.alert(`Welcome, ${name} from ${institute}!`);
            navigation.navigate('Activities', { caretakerName: name, instituteName: institute });
        } else {
            Alert.alert('Please provide both your name and institute name.');
        }
    };

    return (
        <ScrollView style={styles.container}>
            <Header />
            <View style={styles.caretakerAccessContainer}>
                <Text style={styles.caretakerInstructions}>Read below instructions before accessing activities</Text>
                <Text style={styles.caretakerAccessTitle}>Caretaker Access</Text>
                <View style={styles.caretakerLoginSection}>
                    <View style={styles.caretakerAccessForm}>
                        <TextInput
                            style={styles.caretakerInputField}
                            placeholder="Enter Your Name"
                            value={name}
                            onChangeText={setName}
                            autoCapitalize="words"
                            required
                        />
                        <TextInput
                            style={styles.caretakerInputField}
                            placeholder="Enter Your Institute Name"
                            value={institute}
                            onChangeText={setInstitute}
                            autoCapitalize="words"
                            required
                        />
                        <TouchableOpacity style={styles.caretakerBtnPrimary} onPress={handleAccess}>
                            <Text style={styles.buttonText}>Access Activities</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.caretakerLoginIllustration}>
                        <Image source={LoginIllustration} style={styles.illustrationImage} />
                    </View>
                </View>
            </View>

            <View style={styles.caretakerHeaderContent}>
                <View style={styles.headerWithIllustration}>
                    <View style={styles.headerText}>
                        <Text style={styles.headerTitle}>Welcome to the Inclusive Care Platform</Text>
                        <Text style={styles.headerParagraph}>
                            This platform is designed to assist caretakers in communicating and engaging with 
                            <Text style={styles.boldText}> deaf, dumb, and mentally disabled individuals.</Text> Below are the detailed 
                            guidelines for effectively using our tools and ensuring meaningful interactions.
                        </Text>
                    </View>
                </View>

                <View style={styles.caretakerSection}>
                    <Text style={styles.sectionTitle}>👐 Supporting Deaf and Dumb Individuals</Text>
                    <Text style={styles.sectionParagraph}>
                        Our platform includes a <Text style={styles.boldText}>Text-to-Sign Tool</Text> that helps caretakers convert words 
                        into <Text style={styles.boldText}>American Sign Language (ASL) images</Text> to facilitate communication.
                    </Text>
                    <Text style={styles.subSectionTitle}>How to Use the Text-to-Sign Tool:</Text>
                    <Text style={styles.listItem}>✅ Enter a word or phrase in the input field.</Text>
                    <Text style={styles.listItem}>✅ Click the <Text style={styles.boldText}>"Get Sign Language"</Text> button.</Text>
                    <Text style={styles.listItem}>✅ The tool will generate ASL images for easy communication.</Text>
                    <Text style={styles.listItem}>✅ Show the ASL images to the individual for better understanding.</Text>
                    <Text style={styles.subSectionTitle}>Engagement Tips:</Text>
                    <Text style={styles.listItem}>👀 <Text style={styles.boldText}>Maintain eye contact</Text> and use clear facial expressions.</Text>
                    <Text style={styles.listItem}>👐 <Text style={styles.boldText}>Use hand gestures and visual aids</Text> to make communication easier.</Text>
                    <Text style={styles.listItem}>🗣️ <Text style={styles.boldText}>Speak clearly while signing</Text> (for those who can lip-read).</Text>
                </View>

                <View style={styles.caretakerSection}>
                    <Text style={styles.sectionTitle}>🧠 Supporting Mentally Disabled Individuals</Text>
                    <Text style={styles.sectionParagraph}>
                        Caretakers play a crucial role in helping mentally disabled individuals engage in daily 
                        activities and develop social and cognitive skills.
                    </Text>
                    <Text style={styles.subSectionTitle}>Best Practices for Engagement:</Text>
                    <Text style={styles.listItem}>✅ This tool is Integrated With IoT</Text>
                    <Text style={styles.listItem}>✅ Used to monitor the Mentally ill People</Text>
                    <Text style={styles.listItem}>✅ Use the Sensors Correctly to the Mentally ill People</Text>
                    <Text style={styles.subSectionTitle}>Interactive Activities:</Text>
                    <Text style={styles.sectionParagraph}>Based on the Person's Heart rate and behaviour our tool will provide some Activities. Below are some Activities</Text>
                    <Text style={styles.listItem}>🎶 <Text style={styles.boldText}>Music Therapy</Text> - Helps with relaxation and emotional expression.</Text>
                    <Text style={styles.listItem}>🎨 <Text style={styles.boldText}>Art and Craft</Text> - Boosts creativity and hand-eye coordination.</Text>
                    <Text style={styles.listItem}>🧩 <Text style={styles.boldText}>Puzzle Games</Text> - Enhances problem-solving skills.</Text>
                    <Text style={styles.listItem}>🏃 <Text style={styles.boldText}>Physical Activities</Text> - Helps improve motor skills and coordination.</Text>
                </View>

                <View style={styles.caretakerSection}>
                    <Text style={styles.sectionTitle}>💡 Caretaker Guidelines</Text>
                    <Text style={styles.sectionParagraph}>
                        As a caretaker, your patience and support can create a more inclusive and positive 
                        environment for those in your care.
                    </Text>
                    <Text style={styles.listItem}>❤️ <Text style={styles.boldText}>Be kind and understanding</Text> – Empathy is key.</Text>
                    <Text style={styles.listItem}>👂 <Text style={styles.boldText}>Listen and observe</Text> – Understand their needs and comfort levels.</Text>
                    <Text style={styles.listItem}>📝 <Text style={styles.boldText}>Use assistive tools</Text> – Our platform provides tools to ease communication.</Text>
                    <Text style={styles.listItem}>🤝 <Text style={styles.boldText}>Encourage social interactions</Text> – Foster friendships and group activities.</Text>
                    <Text style={styles.listItem}>💬 <Text style={styles.boldText}>Create a positive environment</Text> – Avoid frustration and use positive reinforcement.</Text>
                </View>
            </View>

            <Gobacktohome />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f7fa', // Gradient start color (simplified for RN)
    },
    caretakerAccessContainer: {
        width: '100%',
        minHeight: height * 0.5,
        padding: Math.min(Math.max(16, width * 0.03), 32),
        alignItems: 'center',
    },
    caretakerInstructions: {
        fontSize: Math.min(Math.max(14, width * 0.025), 18),
        color: '#666',
        marginBottom: Math.min(Math.max(8, width * 0.01), 16),
        textAlign: 'center',
    },
    caretakerAccessTitle: {
        fontSize: Math.min(Math.max(28, width * 0.05), 40),
        color: '#1a3c5e',
        fontWeight: '700',
        marginBottom: Math.min(Math.max(16, width * 0.02), 24),
    },
    caretakerLoginSection: {
        flexDirection: width > 768 ? 'row' : 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: Math.min(Math.max(16, width * 0.02), 32),
    },
    caretakerAccessForm: {
        width: '100%',
        maxWidth: Math.min(Math.max(300, width * 0.8), 500),
        gap: Math.min(Math.max(12, width * 0.02), 16),
    },
    caretakerInputField: {
        padding: Math.min(Math.max(10, width * 0.015), 12),
        fontSize: Math.min(Math.max(14, width * 0.02), 16),
        borderWidth: 2,
        borderColor: '#ddd',
        borderRadius: 8,
        width: '100%',
    },
    caretakerBtnPrimary: {
        backgroundColor: '#00b4db', // Simplified gradient
        paddingVertical: Math.min(Math.max(12, width * 0.02), 14),
        paddingHorizontal: Math.min(Math.max(24, width * 0.03), 32),
        borderRadius: 30,
        alignItems: 'center',
        shadowColor: '#00b4db',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 15,
    },
    buttonText: {
        color: 'white',
        fontSize: Math.min(Math.max(16, width * 0.025), 20),
        fontWeight: '600',
    },
    caretakerLoginIllustration: {
        width: '100%',
        maxWidth: Math.min(Math.max(250, width * 0.5), 400),
    },
    illustrationImage: {
        width: '100%',
        height: undefined,
        aspectRatio: 1,
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.2,
        shadowRadius: 15,
    },
    caretakerHeaderContent: {
        padding: Math.min(Math.max(16, width * 0.03), 32),
        width: '100%',
    },
    headerWithIllustration: {
        flexDirection: width > 768 ? 'row' : 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: Math.min(Math.max(16, width * 0.02), 32),
        marginBottom: Math.min(Math.max(24, width * 0.03), 32),
    },
    headerText: {
        width: width > 768 ? '55%' : '100%',
        alignItems: width > 768 ? 'flex-start' : 'center',
    },
    headerTitle: {
        fontSize: Math.min(Math.max(28, width * 0.05), 44),
        color: '#1a3c5e',
        fontWeight: '700',
        marginBottom: Math.min(Math.max(8, width * 0.01), 16),
        textAlign: width > 768 ? 'left' : 'center',
    },
    headerParagraph: {
        fontSize: Math.min(Math.max(14, width * 0.025), 18),
        color: '#666',
        lineHeight: 24,
    },
    boldText: {
        fontWeight: '700',
    },
    caretakerSection: {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        padding: Math.min(Math.max(16, width * 0.02), 24),
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 15,
        marginBottom: Math.min(Math.max(24, width * 0.03), 32),
    },
    sectionTitle: {
        fontSize: Math.min(Math.max(24, width * 0.035), 32),
        color: '#34495e',
        marginBottom: Math.min(Math.max(8, width * 0.01), 16),
    },
    subSectionTitle: {
        fontSize: Math.min(Math.max(20, width * 0.03), 26),
        color: '#2c3e50',
        marginVertical: Math.min(Math.max(12, width * 0.015), 16),
    },
    sectionParagraph: {
        fontSize: Math.min(Math.max(14, width * 0.025), 18),
        color: '#666',
        lineHeight: 24,
        marginBottom: Math.min(Math.max(8, width * 0.01), 16),
    },
    listItem: {
        fontSize: Math.min(Math.max(14, width * 0.02), 16),
        color: '#555',
        marginBottom: Math.min(Math.max(8, width * 0.01), 12),
        paddingLeft: 24,
    },
});

export default CareTakerSig;
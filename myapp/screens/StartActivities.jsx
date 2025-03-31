import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, StyleSheet, Dimensions, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Header from '../components/Header'; // Assuming this is converted to RN
import Gobacktohome from '../components/gobacktohome'; // Already converted to RN// Assuming this is converted to RN
import ActivitiesIllustration from '../assets/images/startactivitiesimage.webp'; // Ensure this is in your RN project

const { width, height } = Dimensions.get('window');

function StartActivities() {
  const navigation = useNavigation();
  const route = useRoute();

  const caretakerName = route.params?.caretakerName || 'Caretaker';
  const instituteName = route.params?.instituteName || 'Institute';

  const handleButton1 = () => {
    Alert.alert('Deaf and Dumb Activities');
    navigation.navigate('DeafandDumb', { caretakerName, instituteName });
  };

  const handleButton2 = () => {
    Alert.alert('Mental Disability Activities');
    navigation.navigate('MentalDisability', { caretakerName, instituteName });
  };

  return (
    <ScrollView style={styles.pageWrapper}>
      <Header />
      <View style={styles.activitiesContainer}>
        <View style={styles.welcomeSection}>
          <Text style={styles.title}>Welcome, {caretakerName}! ({instituteName})</Text>
          <View style={styles.activitiesIllustration}>
            <Image source={ActivitiesIllustration} style={styles.illustrationImage} />
          </View>
        </View>

        <View style={styles.optionsContainer}>
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>Empowering Communication for the Deaf and Dumb</Text>
            <Text style={styles.paragraph}>
              Communication is a fundamental right, but for individuals who are deaf and dumb, expressing their thoughts and understanding others can be challenging. Our platform bridges this gap by providing an <Text style={styles.boldText}>interactive and accessible solution</Text> for communication.
            </Text>
            <Text style={styles.subTitle}>Text to Sign Images Tool</Text>
            <Text style={styles.paragraph}>
              Our <Text style={styles.boldText}>Text to Sign Images</Text> tool helps caretakers convert written words into <Text style={styles.boldText}>American Sign Language (ASL) images</Text>. This enables individuals with hearing and speech impairments to understand messages visually, improving communication.
            </Text>
            <Text style={styles.subTitle}>Why This Matters?</Text>
            <Text style={styles.paragraph}>
              - 🌍 Bridging the communication gap between caretakers and individuals with disabilities.{"\n"}
              - 🔥 Encouraging caretakers to actively use tools that enhance accessibility.{"\n"}
              - 💡 Making communication inclusive and empowering for the deaf and dumb community.
            </Text>
            <Text style={styles.paragraph}>
              <Text style={styles.boldText}>Join us in creating a more inclusive world where no one is left unheard.</Text>
            </Text>
            <TouchableOpacity style={styles.activityButton} onPress={handleButton1}>
              <Text style={styles.buttonText}>Deaf and Dumb</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>Empowering Lives for Individuals with Mental Disabilities</Text>
            <Text style={styles.paragraph}>
              Mental disabilities can make it difficult for individuals to express their emotions, needs, and behaviors effectively. Our platform leverages <Text style={styles.boldText}>advanced hardware sensors and AI-driven insights</Text> to understand their behavior and provide tailored suggestions and activities to improve their quality of life.
            </Text>
            <Text style={styles.subTitle}>Behavior Monitoring and Analysis Tool</Text>
            <Text style={styles.paragraph}>
              Our <Text style={styles.boldText}>Behavior Monitoring and Analysis</Text> tool uses hardware sensors to track and analyze the behavior of individuals with mental disabilities. By collecting data on movement, emotional responses, and daily patterns, we generate <Text style={styles.boldText}>personalized recommendations</Text> to support their well-being.
            </Text>
            <Text style={styles.subTitle}>Why This Matters?</Text>
            <Text style={styles.paragraph}>
              - 🌍 Bridging the gap between understanding and supporting individuals with mental disabilities.{"\n"}
              - 🔥 Encouraging caretakers to adopt technology-driven solutions for better care.{"\n"}
              - 💡 Providing personalized activities and suggestions to enhance emotional and behavioral well-being.
            </Text>
            <Text style={styles.paragraph}>
              <Text style={styles.boldText}>Join us in creating a more inclusive world where everyone receives the care and support they deserve.</Text>
            </Text>
            <TouchableOpacity style={styles.activityButton} onPress={handleButton2}>
              <Text style={styles.buttonText}>Mental Disability</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <Gobacktohome />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  pageWrapper: {
    flex: 1,
    backgroundColor: '#f5f7fa', // Simplified gradient start color
  },
  activitiesContainer: {
    padding: Math.min(Math.max(16, width * 0.03), 32),
    width: '100%',
  },
  welcomeSection: {
    flexDirection: width > 768 ? 'row' : 'column',
    alignItems: 'center',
    justifyContent: width > 768 ? 'center' : 'flex-start',
    marginBottom: Math.min(Math.max(24, width * 0.03), 32),
    gap: width > 768 ? Math.min(Math.max(24, width * 0.03), 32) : 0,
  },
  title: {
    fontSize: Math.min(Math.max(28, width * 0.05), 44),
    color: '#1a3c5e',
    fontWeight: '700',
    marginBottom: width > 768 ? 0 : Math.min(Math.max(16, width * 0.02), 24),
    textAlign: width > 768 ? 'left' : 'center',
  },
  activitiesIllustration: {
    width: '100%',
    maxWidth: Math.min(Math.max(250, width * 0.5), 500),
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
  optionsContainer: {
    flexDirection: width > 768 ? 'row' : 'column',
    gap: Math.min(Math.max(24, width * 0.03), 32),
    width: '100%',
    justifyContent: width > 768 ? 'space-between' : 'flex-start',
  },
  headerContent: {
    backgroundColor: '#ffffff',
    padding: Math.min(Math.max(16, width * 0.02), 24),
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    flex: width > 768 ? 1 : undefined,
  },
  headerTitle: {
    fontSize: Math.min(Math.max(24, width * 0.04), 35),
    color: '#1a3c5e',
    fontWeight: '700',
    marginBottom: Math.min(Math.max(8, width * 0.01), 16),
    textAlign: width > 768 ? 'left' : 'center',
  },
  subTitle: {
    fontSize: Math.min(Math.max(19, width * 0.03), 26),
    color: '#34495e',
    marginVertical: Math.min(Math.max(16, width * 0.02), 24),
    textAlign: width > 768 ? 'left' : 'center',
  },
  paragraph: {
    fontSize: Math.min(Math.max(14, width * 0.025), 18),
    color: '#666',
    lineHeight: 24,
    marginBottom: Math.min(Math.max(8, width * 0.01), 16),
    textAlign: width > 768 ? 'left' : 'center',
  },
  boldText: {
    fontWeight: '700',
    color: '#2c3e50',
  },
  activityButton: {
    backgroundColor: '#00b4db', // Simplified gradient
    paddingVertical: Math.min(Math.max(12, width * 0.02), 14),
    paddingHorizontal: Math.min(Math.max(24, width * 0.03), 32),
    borderRadius: 30,
    alignItems: 'center',
    shadowColor: '#00b4db',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 15,
    marginTop: Math.min(Math.max(16, width * 0.02), 24),
    alignSelf: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: Math.min(Math.max(16, width * 0.025), 19),
    fontWeight: '600',
  },
});

export default StartActivities;
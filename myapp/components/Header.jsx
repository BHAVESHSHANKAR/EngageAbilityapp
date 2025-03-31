import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const Header = () => {
  return (
    <View style={styles.homeContainer}>
      <View style={styles.siteHeader}>
        <View style={styles.logoContainer}>
          <Image
            source={require("../assets/images/img1.webp")} // Ensure this image is in the correct path
            style={styles.siteLogo}
          />
          <View style={styles.titleContainer}>
            <Text style={styles.siteTitle}>EngageAbility</Text>
            <Text style={styles.siteCaption}>An Inclusive Activity Platform</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  homeContainer: {
    width: "100%",
    backgroundColor: "#2b5876",
    paddingVertical: 15,
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  siteHeader: {
    alignItems: "center",
    width: "100%",
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  siteLogo: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  titleContainer: {
    flexDirection: "column",
  },
  siteTitle: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
  },
  siteCaption: {
    fontSize: 14,
    color: "#dcdcdc",
  },
});

export default Header;

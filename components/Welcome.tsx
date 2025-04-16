// components/Welcome.tsx
import React from "react";
import { View, StyleSheet } from "react-native";
import { Title, Text } from "react-native-paper";

interface WelcomeProps {
    nombre?: string;
}

const Welcome: React.FC<WelcomeProps> = ({ nombre }) => {
    return (
        <View style={styles.container}>
            <Title style={styles.bienvenida}>
                ¡Hola, {nombre}! 👋
            </Title>
            <Text style={styles.subtitulo}>Bienvenido a tu panel</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
    },
    bienvenida: {
        fontSize: 24,
        fontWeight: "bold",
    },
    subtitulo: {
        fontSize: 16,
        color: "gray",
    },
});

export default Welcome;

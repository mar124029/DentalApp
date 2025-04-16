// views/Home.tsx
import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, Alert, ActivityIndicator } from "react-native";
import { Card, Paragraph, Button } from "react-native-paper";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import Welcome from "../components/Welcome"; // asegúrate que la ruta sea correcta

const HomeScreen = () => {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState();
    const navigation = useNavigation();

    useEffect(() => {
        const fetchProtectedData = async () => {
            try {
                const token = await AsyncStorage.getItem("userToken");
                const user = await AsyncStorage.getItem("userData");

                if (!token) {
                    Alert.alert("No estás autenticado");
                    return;
                }

                const response = await axios.get("http://192.168.1.8:3001/api/protected", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setData(response.data);
            } catch (error) {
                Alert.alert("Error", "No se pudo acceder a los datos protegidos");
            } finally {
                setLoading(false);
            }
        };

        fetchProtectedData();
    }, []);

    if (loading) {
        return (
            <View style={styles.loader}>
                <ActivityIndicator size="large" color="#2e86de" />
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <Welcome nombre={""} />

            <Card style={styles.card}>
                <Card.Content>
                    <Paragraph>Puedes agendar, revisar o cancelar tus citas desde el menú inferior.</Paragraph>
                </Card.Content>
            </Card>

            {/* Más contenido abajo si quieres */}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    loader: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    card: {
        marginVertical: 10,
    },
});

export default HomeScreen;

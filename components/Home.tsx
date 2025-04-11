import React, { useEffect, useState } from "react";
import { View, StyleSheet, Image, ScrollView, Alert } from "react-native";
import { Text, Title, Card, Paragraph, Button } from "react-native-paper";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    useEffect(() => {
        const fetchProtectedData = async () => {
            try {
                const token = await AsyncStorage.getItem("userToken");
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

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                {/* <Image
                    source={require("../assets/paciente.png")} // Cambia por tu imagen real o avatar
                    style={styles.avatar}
                /> */}
                <View>
                    <Title style={styles.bienvenida}>
                        ¡Hola, {data?.nombre || "Paciente"}! 👋
                    </Title>
                    <Text style={styles.subtitulo}>Bienvenido a tu panel</Text>
                </View>
            </View>

            <Card style={styles.card}>
                <Card.Content>
                    <Title>📅 Próxima cita</Title>
                    <Paragraph>
                        {data?.proximaCita || "Aún no tienes una cita agendada."}
                    </Paragraph>
                </Card.Content>
            </Card>

            <Text style={styles.accesos}>Accesos rápidos</Text>
            <Button
                icon="calendar-plus"
                mode="contained"
                style={styles.button}
                onPress={() => navigation.navigate("Agendar")}
            >
                Agendar cita
            </Button>
            <Button
                icon="calendar"
                mode="outlined"
                style={styles.button}
                onPress={() => navigation.navigate("MisCitas")}
            >
                Ver mis citas
            </Button>
            <Button
                icon="account"
                mode="outlined"
                style={styles.button}
                onPress={() => navigation.navigate("Perfil")}
            >
                Mi perfil
            </Button>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: "#f4f4f4",
        flex: 1,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
        gap: 10,
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 100,
        marginRight: 10,
    },
    bienvenida: {
        fontSize: 20,
        fontWeight: "bold",
    },
    subtitulo: {
        color: "#666",
        marginTop: 4,
    },
    card: {
        marginBottom: 20,
    },
    accesos: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
    button: {
        marginVertical: 6,
    },
});

export default HomeScreen;

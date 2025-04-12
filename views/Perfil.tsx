// Perfil.js (pantalla de Perfil)
import React from 'react';
import { View, Text, Button } from 'react-native';
import { useLogout } from '../hooks/useLogout';

export default function Perfil({ navigation }) {
    const [loading, logoutHandler] = useLogout();

    return (
        <View>
            <Text>Bienvenido a tu perfil</Text>
            <Button
                title="Cerrar sesión"
                onPress={() => logoutHandler(navigation)}
                disabled={loading}
            />
        </View>
    );
}

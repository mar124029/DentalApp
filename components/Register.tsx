// Register.tsx
import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Platform,
} from 'react-native';
import { TextInput } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import { handleSubmit } from '../handlers/registerHandler';
import { useNavigation } from '@react-navigation/native';


export default function Register() {
    const navigation = useNavigation();
    const [form, setForm] = useState({
        nombre: '',
        dni: '',
        nacimiento: '',
        telefono: '',
        correo: '',
        password: '',
        confirmar: '',
    });

    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const handleChange = (field, value) => {
        setForm({ ...form, [field]: value });
    };

    const handleDateChange = (event, selectedDate) => {
        setShowDatePicker(false);
        if (selectedDate) {
            const formatted = selectedDate.toLocaleDateString('es-PE');
            handleChange('nacimiento', formatted);
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.header}>
                    <Ionicons name="happy-outline" size={40} color="#00BCD4" />
                    <Text style={styles.title}>Regístrate</Text>
                    <Text style={styles.subtitle}>Crea tu cuenta para DentalCare</Text>
                </View>

                <TextInput
                    label="Nombre y Apellidos"
                    value={form.nombre}
                    onChangeText={(val) => handleChange('nombre', val)}
                    style={styles.input}
                    left={<TextInput.Icon icon="account" />}
                />

                <TextInput
                    label="DNI o Carnet de Extranjería"
                    value={form.dni}
                    onChangeText={(val) => handleChange('dni', val)}
                    style={styles.input}
                    keyboardType="numeric"
                    left={<TextInput.Icon icon="card-account-details" />}
                />

                <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                    <TextInput
                        label="Fecha de Nacimiento"
                        value={form.nacimiento}
                        style={styles.input}
                        editable={false}
                        left={<TextInput.Icon icon="calendar" />}
                    />
                </TouchableOpacity>
                {showDatePicker && (
                    <DateTimePicker
                        value={new Date()}
                        mode="date"
                        display={Platform.OS === 'ios' ? 'inline' : 'default'}
                        onChange={handleDateChange}
                        maximumDate={new Date()}
                    />
                )}

                <TextInput
                    label="Número de Teléfono"
                    value={form.telefono}
                    onChangeText={(val) => handleChange('telefono', val)}
                    style={styles.input}
                    keyboardType="phone-pad"
                    left={<TextInput.Icon icon="phone" />}
                />

                <TextInput
                    label="Correo electrónico"
                    value={form.correo}
                    onChangeText={(val) => handleChange('correo', val)}
                    style={styles.input}
                    keyboardType="email-address"
                    left={<TextInput.Icon icon="email" />}
                />

                <TextInput
                    label="Contraseña"
                    value={form.password}
                    onChangeText={(val) => handleChange('password', val)}
                    style={styles.input}
                    secureTextEntry={!showPassword}
                    left={<TextInput.Icon icon="lock" />}
                    right={
                        <TextInput.Icon
                            icon={showPassword ? 'eye-off' : 'eye'}
                            onPress={() => setShowPassword(!showPassword)}
                        />
                    }
                />

                <TextInput
                    label="Confirmar Contraseña"
                    value={form.confirmar}
                    onChangeText={(val) => handleChange('confirmar', val)}
                    style={styles.input}
                    secureTextEntry={!showConfirm}
                    left={<TextInput.Icon icon="lock" />}
                    right={
                        <TextInput.Icon
                            icon={showConfirm ? 'eye-off' : 'eye'}
                            onPress={() => setShowConfirm(!showConfirm)}
                        />
                    }
                />

                <TouchableOpacity style={styles.button} onPress={() => handleSubmit(form, setForm, navigation)}>
                    <Text style={styles.buttonText}>CREAR CUENTA</Text>
                </TouchableOpacity>

                <Text style={styles.terms}>
                    Al registrarte, aceptas nuestros{' '}
                    <Text style={styles.link}>Términos y Condiciones</Text>
                </Text>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#E0F7FA',
        flex: 1,
        justifyContent: 'center',
    },
    header: {
        alignItems: 'center',
        marginBottom: 20
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#007c91',
        marginTop: 5
    },
    subtitle: {
        color: '#6c9ea3',
        fontSize: 12
    },
    input: {
        marginBottom: 12,
        backgroundColor: '#fff',
    },
    button: {
        backgroundColor: '#00ACC1',
        padding: 12,
        borderRadius: 8,
        marginTop: 10,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    terms: {
        fontSize: 10,
        textAlign: 'center',
        color: '#6c9ea3',
        marginTop: 10,
    },
    link: {
        textDecorationLine: 'underline',
    },
});

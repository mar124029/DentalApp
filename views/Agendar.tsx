import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

function Agendar() {
    const [fecha, setFecha] = useState(new Date());
    const [hora, setHora] = useState('');
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);

    const handleFechaChange = (event, selectedDate) => {
        const currentDate = selectedDate || fecha;
        setShowDatePicker(Platform.OS === 'ios' ? true : false); // Para IOS, se mantiene el picker abierto
        setFecha(currentDate);
    };

    const handleHoraChange = (event, selectedTime) => {
        const currentTime = selectedTime || fecha;
        setShowTimePicker(false);
        setHora(currentTime.toLocaleTimeString()); // Ajusta el formato según tu preferencia
    };

    const handleSubmit = () => {
        if (!hora) {
            Alert.alert('Error', 'Por favor, selecciona una hora.');
            return;
        }

        // Aquí puedes agregar el código para hacer la solicitud a la API para agendar la cita
        Alert.alert('Éxito', `Cita agendada para el ${fecha.toLocaleDateString()} a las ${hora}`);
    };

    return (
        <View style={{ flex: 1, padding: 20 }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Agendar Cita</Text>

            <Text style={{ marginBottom: 10 }}>Selecciona la fecha:</Text>
            <Button onPress={() => setShowDatePicker(true)} title={`Seleccionar fecha: ${fecha.toLocaleDateString()}`} />

            {showDatePicker && (
                <DateTimePicker
                    value={fecha}
                    mode="date"
                    display="default"
                    onChange={handleFechaChange}
                />
            )}

            <Text style={{ marginBottom: 10, marginTop: 20 }}>Selecciona la hora:</Text>
            <Button onPress={() => setShowTimePicker(true)} title={`Seleccionar hora: ${hora || 'HH:mm'}`} />

            {showTimePicker && (
                <DateTimePicker
                    value={fecha}
                    mode="time"
                    display="default"
                    onChange={handleHoraChange}
                />
            )}

            {/* Botón para enviar la solicitud */}
            <Button title="Agendar" onPress={handleSubmit} />
        </View>
    );
}

export default Agendar;

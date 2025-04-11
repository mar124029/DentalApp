import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { TextInput } from 'react-native-paper';
import { loginHandler } from '../handlers/loginHandler';
import AsyncStorage from '@react-native-async-storage/async-storage';


const { width } = Dimensions.get('window');

const Login: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [dni, setDni] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <ScrollView>
        <View style={styles.header}>
          <Image source={require('../assets/fondo.png')} style={styles.fondo} resizeMode="cover" />
          <View style={styles.doctoresContainer}>
            <Image source={require('../assets/doctor.png')} style={styles.doctorImage} resizeMode="contain" />
            <Image source={require('../assets/doctora.png')} style={styles.doctoraImage} resizeMode="contain" />
          </View>
        </View>

        <View
          style={styles.loginCard}
        >
          <Text style={styles.title}>Iniciar Sesión</Text>

          <TextInput
            label="DNI"
            value={dni}
            onChangeText={setDni}
            mode="flat"
            keyboardType="phone-pad"
            left={<TextInput.Icon icon="card-account-details" />}
            style={styles.input}
            theme={{ roundness: 20 }}
          />
          <TextInput
            label="Contraseña"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            mode="flat"
            left={<TextInput.Icon icon="lock" />}
            right={
              <TextInput.Icon
                icon={showPassword ? 'eye-off' : 'eye'}
                onPress={() => setShowPassword(!showPassword)}
              />
            }
            style={styles.input}
            theme={{ roundness: 20 }}

          />

          <TouchableOpacity onPress={() => console.log('Recuperar contraseña')}>
            <Text style={styles.forgotText}>¿Olvidaste tu contraseña?</Text>
          </TouchableOpacity>

          <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 16 }}>
            <Text>¿No tienes una cuenta? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={{ color: '#0057ff', fontWeight: 'bold' }}>Regístrate</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.loginButton} onPress={() => loginHandler(dni, password, navigation)}>
            <Text style={styles.loginButtonText}>Ingresar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#E0F7FA',
    flex: 1,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 20,
  },
  fondo: {
    width: Dimensions.get('window').width,
    height: 200,
    position: 'absolute',
    top: 0,
  },
  doctoresContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    marginTop: 30,
  },
  doctorImage: {
    position: 'absolute',
    width: 200,
    height: 260,
    top: -70,
    right: -30
  },
  doctoraImage: {
    position: 'absolute',
    top: -16,
    width: 200,
    height: 170,
    left: -20
  },
  loginCard: {
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 20,
    marginTop: 150,
  },

  title: {
    fontSize: 22,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 20,
  },
  input: {
    marginBottom: 12,
    backgroundColor: '#fff',

  },
  forgotText: {
    alignSelf: 'center',
    color: '#0057ff',
    marginVertical: 12,
  },
  loginButton: {
    backgroundColor: '#000',
    paddingVertical: 12,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 8,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Login;


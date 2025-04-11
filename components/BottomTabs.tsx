import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import Home from './Home';
import MisCitas from './MisCitas';
import Agendar from './Agendar';
import Perfil from './Perfil';

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    let iconName;

                    switch (route.name) {
                        case 'Inicio':
                            iconName = 'home';
                            break;
                        case 'Mis citas':
                            iconName = 'calendar';
                            break;
                        case 'Agendar':
                            iconName = 'add-circle';
                            break;
                        case 'Perfil':
                            iconName = 'person';
                            break;
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#2e86de',
                tabBarInactiveTintColor: 'gray',
            })}
        >
            <Tab.Screen name="Inicio" component={Home} />
            <Tab.Screen name="Mis citas" component={MisCitas} />
            <Tab.Screen name="Agendar" component={Agendar} />
            <Tab.Screen name="Perfil" component={Perfil} />
        </Tab.Navigator>
    );
}

import axios from "axios";

const formatDateForMySQL = (dateString) => {
  const [day, month, year] = dateString.split('/');
  return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
};

export const handleSubmit = async (form, setForm, navigation) => {
  const { correo, password, confirmar, nombre, dni, nacimiento, telefono } = form;

  if (password !== confirmar) {
    alert("Las contraseñas no coinciden");
    return;
  }

  const nacimientoFormateado = formatDateForMySQL(nacimiento);

  try {
    const response = await axios.post('http://192.168.1.8:3001/api/auth/register', {
      nombre,
      dni,
      nacimiento: nacimientoFormateado,
      telefono,
      correo,
      password
    });

    setForm({
      nombre: "",
      dni: "",
      nacimiento: "",
      telefono: "",
      correo: "",
      password: "",
      confirmar: ""
    });

    alert("Registro exitoso");

    navigation.navigate('Login');

  } catch (error) {
    alert("Error al registrar: " + error.message);
  }
};

import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveUserData = async (formData: any) => {
  try {
    const jsonData = JSON.stringify(formData);
    await AsyncStorage.setItem('user_data', jsonData);
    console.log('Dados salvos com sucesso!');
  } catch (error) {
    console.error('Erro ao salvar os dados:', error);
  }
};

export const getUserData = async () => {
  try {
    const jsonData = await AsyncStorage.getItem('user_data');
    return jsonData != null ? JSON.parse(jsonData) : null;
  } catch (error) {
    console.error('Erro ao recuperar os dados:', error);
    return null;
  }
};

export const clearUserData = async () => {
  try {
    await AsyncStorage.removeItem('user_data');
    console.log('Dados removidos com sucesso!');
  } catch (error) {
    console.error('Erro ao remover os dados:', error);
  }
};

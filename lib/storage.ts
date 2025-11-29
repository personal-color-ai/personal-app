import AsyncStorage from '@react-native-async-storage/async-storage';
import { PersonalColor } from '@/types/api';

const PERSONAL_COLOR_KEY = '@personal_color';

/**
 * 퍼스널 컬러 저장
 */
export const savePersonalColor = async (color: PersonalColor): Promise<void> => {
  try {
    await AsyncStorage.setItem(PERSONAL_COLOR_KEY, color);
  } catch (error) {
    console.error('Failed to save personal color:', error);
    throw error;
  }
};

/**
 * 퍼스널 컬러 불러오기
 */
export const getPersonalColor = async (): Promise<PersonalColor | null> => {
  try {
    const color = await AsyncStorage.getItem(PERSONAL_COLOR_KEY);
    return color as PersonalColor | null;
  } catch (error) {
    console.error('Failed to get personal color:', error);
    return null;
  }
};

/**
 * 퍼스널 컬러 삭제
 */
export const clearPersonalColor = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(PERSONAL_COLOR_KEY);
  } catch (error) {
    console.error('Failed to clear personal color:', error);
    throw error;
  }
};

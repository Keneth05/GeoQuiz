import { useAuthentication } from '@/context/AuthContext';
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Alert,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  useWindowDimensions,
  View,
} from "react-native";
import { TextInput } from "react-native-paper";

interface FormValues {
  username: string;
  password: string;
}

const LoginPage = () => {
  const login = useAuthentication(state => state.login)
  const router = useRouter();

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const { width, height } = useWindowDimensions();
  const isLandscape = width > height; // true si está en horizontal

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: { username: "", password: "" },
    mode: "onSubmit",
  });

  const onSubmit = async ({ username, password }: FormValues) => {
    const success = await login(username, password);

    if (success) {
      // Redirige a la pantalla principal de la app para usuarios autenticados
      router.replace("/CountryList");
    } else {
      Alert.alert("Error", "Usuario o Contraseña inválidos");
    }
  };

  return (
    <View className="bg-Primary flex-1">
      <KeyboardAvoidingView
        className="flex-1"
        behavior="padding"
        keyboardVerticalOffset={Platform.OS === "ios" ? 54 : 0}
      >
        <ScrollView className="flex-1" contentContainerClassName="grow">
          <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View className={`flex-1 justify-center items-center p-4 ${isLandscape ? "flex-row gap-16" : "flex-col"}`}>
              <View className="mb-5">
                <Image
                  className="w-80 h-40"
                  source={require("@/assets/images/blanco-removebg-preview.png")}
                  resizeMode="contain"
                />
              </View>
              <View className="w-full max-w-sm ">
                <Text className="text-Details font-roboto font-bold text-xl mb-2">
                  Username
                </Text>
                <Controller
                  control={control}
                  name="username"
                  rules={{
                    required: "El usuario es obligatorio",
                  }}
                  render={({ field: { onChange, value } }) => (
                    <View className="mb-4">
                      <TextInput
                        mode="outlined"
                        placeholder="Your Username"
                        placeholderTextColor="#6b7280"
                        onChangeText={onChange}
                        value={value}
                        left={<TextInput.Icon icon="account" size={25} />}
                      />
                      {errors.username && (
                        <Text className="text-red-500 text-sm mt-1">
                          {errors.username.message}
                        </Text>
                      )}
                    </View>
                  )}
                />

                <Text className="text-Details font-roboto font-bold text-xl mb-2">
                  Password
                </Text>
                <Controller
                  control={control}
                  name="password"
                  rules={{
                    required: "La contraseña es obligatoria",
                    minLength: { value: 3, message: "Mínimo 3 caracteres" },
                  }}
                  render={({ field: { onChange, value } }) => (
                    <View className="mb-4">
                      <TextInput
                        mode="outlined"
                        placeholder="Your Password"
                        placeholderTextColor="#6b7280"
                        onChangeText={onChange}
                        value={value}
                        secureTextEntry={!showPassword}
                        left={<TextInput.Icon icon="lock" size={25} />}
                        right={
                          <TextInput.Icon
                            icon={showPassword ? "eye-off" : "eye"}
                            size={25}
                            forceTextInputFocus={false} 
                            onPress={() =>
                              setShowPassword((prevValue) => !prevValue)
                            }
                          />
                        }
                      />
                      {errors.password && (
                        <Text className="text-red-500 text-sm mt-1">
                          {errors.password.message}
                        </Text>
                      )}
                    </View>
                  )}
                />

                <Pressable
                  onPress={handleSubmit(onSubmit)}
                  disabled={isSubmitting}
                  className="w-full bg-Buttons py-3 rounded-lg active:bg-blue-700 disabled:bg-blue-400"
                >
                  <Text className="text-white text-center font-bold text-lg">
                    {isSubmitting ? "Verifying..." : "Login"}
                  </Text>
                </Pressable>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default LoginPage;

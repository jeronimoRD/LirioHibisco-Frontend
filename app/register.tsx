import { Text, View, ActivityIndicator } from 'react-native';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Field from '../src/components/Field';
import Button from '../src/components/Button';
import { useSession } from '../src/session/context';

type FormData = {
  user_name: string;
  email: string;
  password: string;
};

export default function Register() {
  const { signUp } = useSession();

  const { control, handleSubmit } = useForm<FormData>({
    defaultValues: {
      user_name: '',
      email: '',
      password: '',
    },
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const onSubmit = async (data: FormData) => {
    setError(null);
    setSuccess(false);
    setLoading(true);

    try {
      await signUp(
        data.user_name,
        data.email,
        data.password,
      );

      setSuccess(true);
      setError(null);
    } catch (err: any) {
      setError(err?.message ?? 'Error desconocido');
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-slate-50 px-6 py-10">
      <View className="mx-auto w-full max-w-md">

        <View className="mb-8 items-center">
          <Text className="text-3xl font-bold text-slate-900">
            Crear cuenta
          </Text>

          <Text className="mt-2 text-center text-sm text-slate-500">
            Completa tus datos para registrarte
          </Text>
        </View>

        <View className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <View className="gap-4">

            <Field
              control={control}
              name="user_name"
              label="Nombre"
            />

            <Field
              control={control}
              name="email"
              label="Correo"
              keyboardType="email-address"
              placeholder="correo@ejemplo.com"
            />

            <Field
              control={control}
              name="password"
              label="Contraseña"
              secureTextEntry
              placeholder="••••••••"
            />

            {error && (
              <View className="rounded-xl border border-red-200 bg-red-50 px-3 py-2">
                <Text className="text-center text-sm text-red-700">
                  {error}
                </Text>
              </View>
            )}

            {success && (
              <View className="rounded-xl border border-green-200 bg-green-50 px-3 py-2">
                <Text className="text-center text-sm text-green-700">
                  Usuario registrado correctamente
                </Text>
              </View>
            )}

            <Button
              text={loading ? 'Registrando...' : 'Registrarse'}
              onPress={handleSubmit(onSubmit)}
              disabled={loading}
            />

            {loading && (
              <ActivityIndicator className="mt-2 self-center" />
            )}

          </View>
        </View>

      </View>
    </View>
  );
}
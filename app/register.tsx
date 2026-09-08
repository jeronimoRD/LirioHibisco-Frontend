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
		defaultValues: { user_name: '', email: '', password: '' },
	});
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const onSubmit = async (data: FormData) => {
		setError(null);
		setLoading(true);
		try {
			await signUp(data.user_name, data.email, data.password);
		} catch (err: any) {
			setError(err?.message ?? 'Error desconocido');
		} finally {
			setLoading(false);
		}
	};

	return (
		<View className="flex-1 items-center justify-center px-6">
			<Text className="text-2xl font-semibold mb-6">Registro</Text>

			<View className="w-full max-w-md space-y-4">
				<Field control={control} name="user_name" label="Nombre" />
				<Field control={control} name="email" label="Correo" keyboardType="email-address" />
				<Field control={control} name="password" label="Contraseña" secureTextEntry />

				{error && <Text className="text-red-600">{error}</Text>}

				<Button
					text={loading ? 'Registrando...' : 'Registrarse'}
					onPress={handleSubmit(onSubmit)}
					disabled={loading}
				/>

				{loading && <ActivityIndicator className="mt-2" />}
			</View>
		</View>
	);
}

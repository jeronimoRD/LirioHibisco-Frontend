import type { ReactNode } from 'react';
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
  type RegisterOptions,
} from 'react-hook-form';
import { Text, TextInput, View, type TextInputProps } from 'react-native';

type Props<T extends FieldValues> = TextInputProps & {
  control: Control<T>;
  name: Path<T>;
  label: string;
  rules?: RegisterOptions<T, Path<T>>;
  containerClassName?: string;
  labelClassName?: string;
  inputWrapperClassName?: string;
  inputClassName?: string;
  /** Elemento opcional a la derecha del input, dentro del recuadro (ej. botón mostrar/ocultar contraseña) */
  rightElement?: ReactNode;
};

export default function Field<T extends FieldValues>({
  control,
  name,
  label,
  rules,
  containerClassName,
  labelClassName,
  inputWrapperClassName,
  inputClassName,
  rightElement,
  ...input
}: Props<T>) {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
        <View className={containerClassName ?? 'gap-1'}>
          <Text className={labelClassName ?? 'font-semibold'}>{label}</Text>

          <View
            className={
              inputWrapperClassName ??
              `flex-row items-center rounded-lg border ${
                error ? 'border-red-600' : 'border-neutral-300'
              }`
            }
          >
            <TextInput
              className={inputClassName ?? 'flex-1 p-3'}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              autoCapitalize="none"
              {...input}
            />
            {rightElement}
          </View>

          {!!error && <Text className="text-xs text-red-600">{error.message}</Text>}
        </View>
      )}
    />
  );
}

'use client';

import React from 'react';
import { Controller, FieldValues, Path, useFormContext } from 'react-hook-form';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { type FieldErrorType, getFieldError, getFieldState } from '@/lib/form-utils';
import { cn } from '@/lib/utils';

type InputType =
  | 'text'
  | 'email'
  | 'password'
  | 'number'
  | 'tel'
  | 'url'
  | 'date'
  | 'time'
  | 'datetime-local';

type SelectOption = {
  value: string | number;
  label: string;
  disabled?: boolean;
};

type FormFieldProps<TFieldValues extends FieldValues> = {
  name: Path<TFieldValues>;
  label?: string;
  placeholder?: string;
  description?: string;
  type?: InputType | 'textarea' | 'select';
  options?: SelectOption[];
  className?: string;
  wrapperClassName?: string;
  labelClassName?: string;
  descriptionClassName?: string;
  errorClassName?: string;
  disabled?: boolean;
  required?: boolean;
  autoComplete?: string;
  rows?: number;
  min?: number | string;
  max?: number | string;
  step?: number | string;
  pattern?: string;
  minLength?: number;
  maxLength?: number;
  readOnly?: boolean;
  autoFocus?: boolean;
  onChange?: (value: unknown) => void;
  onBlur?: () => void;
  onFocus?: () => void;
};

export function FormField<TFieldValues extends FieldValues>({
  name,
  label,
  placeholder,
  description,
  type = 'text',
  options = [],
  className,
  wrapperClassName,
  labelClassName,
  descriptionClassName,
  errorClassName,
  disabled = false,
  required = false,
  autoComplete,
  rows = 3,
  min,
  max,
  step,
  pattern,
  minLength,
  maxLength,
  readOnly = false,
  autoFocus = false,
  onChange,
  onBlur,
  onFocus,
}: FormFieldProps<TFieldValues>) {
  const {
    control,
    formState: { errors },
  } = useFormContext<TFieldValues>();

  const error = errors[name] as FieldErrorType;
  const fieldState = getFieldState(error);
  const errorMessage = getFieldError(error);

  const renderInput = (field: Record<string, unknown> & { ref?: unknown }) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { ref: _ref, ...fieldProps } = field;
    const commonProps = {
      ...fieldProps,
      id: name,
      placeholder,
      disabled,
      required,
      autoComplete,
      minLength,
      maxLength,
      min,
      max,
      step,
      pattern,
      readOnly,
      autoFocus,
      className: cn(
        'w-full',
        fieldState.invalid && 'border-destructive focus-visible:ring-destructive',
        className
      ),
      onChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
      ) => {
        field.onChange(e);
        onChange?.(e.target.value);
      },
      onBlur: () => {
        field.onBlur();
        onBlur?.();
      },
      onFocus: () => {
        onFocus?.();
      },
    };

    switch (type) {
      case 'textarea':
        return <Textarea {...commonProps} rows={rows} ref={ref} />;
      case 'select':
        return (
          <Select onValueChange={field.onChange} value={field.value || ''} disabled={disabled}>
            <SelectTrigger className={cn('w-full', fieldState.invalid && 'border-destructive')}>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {options.map((option) => (
                <SelectItem
                  key={String(option.value)}
                  value={String(option.value)}
                  disabled={option.disabled}
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      default:
        return <Input type={type} {...commonProps} ref={ref} />;
    }
  };

  return (
    <div className={cn('space-y-2', wrapperClassName)}>
      {label && (
        <Label
          htmlFor={name}
          className={cn(
            'text-sm font-medium leading-none',
            fieldState.invalid && 'text-destructive',
            labelClassName
          )}
        >
          {label}
          {required && <span className="ml-1 text-destructive">*</span>}
        </Label>
      )}
      <Controller name={name} control={control} render={({ field }) => renderInput(field)} />
      {description && !fieldState.invalid && (
        <p className={cn('text-sm text-muted-foreground', descriptionClassName)}>{description}</p>
      )}
      {fieldState.invalid && errorMessage && (
        <p className={cn('text-sm font-medium text-destructive', errorClassName)}>{errorMessage}</p>
      )}
    </div>
  );
}

const FormInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ name, className, ...props }, ref) => {
    const { field } = useFormField();
    return <Input id={name} className={cn('w-full', className)} {...field} {...props} ref={ref} />;
  }
);
FormInput.displayName = 'FormInput';

const FormTextarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ name, className, ...props }, ref) => {
    const { field } = useFormField();
    return (
      <Textarea id={name} className={cn('w-full', className)} {...field} {...props} ref={ref} />
    );
  }
);
FormTextarea.displayName = 'FormTextarea';

const FormSelect = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ options, placeholder, className, ...props }, _ref) => {
    const { field } = useFormField();
    return (
      <Select onValueChange={field.onChange} defaultValue={field.value} {...props}>
        <SelectTrigger className={className}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  }
);
FormSelect.displayName = 'FormSelect';

export { FormField, FormInput, FormSelect, FormTextarea, useFormField };

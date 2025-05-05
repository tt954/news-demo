import { ComponentPropsWithoutRef, ComponentPropsWithRef } from "react";

interface LabelProps extends ComponentPropsWithoutRef<"label"> {
  htmlFor: string;
}

interface BaseInputProps {
  name: string;
  label?: Omit<LabelProps, "htmlFor">;
  isTextarea?: boolean;
}

type InputProps =
  | (BaseInputProps & { isTextarea?: false } & ComponentPropsWithRef<"input">)
  | (BaseInputProps & { isTextarea: true } & ComponentPropsWithRef<"textarea">);

const Label = ({ children, htmlFor, ...props }: LabelProps) => {
  return (
    <label
      {...props}
      htmlFor={htmlFor}
      className={`font-medium text-gray-700 capitalize mb-2 ${props.className}`}
    >
      {children}
    </label>
  );
};

export default function Input({
  name,
  isTextarea = false,
  ...props
}: InputProps) {
  return (
    <>
      {props.label?.children ? (
        <Label {...props.label} htmlFor={name} />
      ) : (
        <Label {...props.label} htmlFor={name}>
          {name}
        </Label>
      )}
      {isTextarea ? (
        <textarea {...(props as ComponentPropsWithRef<"textarea">)} id={name} />
      ) : (
        <input {...(props as ComponentPropsWithRef<"input">)} id={name} />
      )}
    </>
  );
}

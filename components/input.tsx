import { ComponentPropsWithoutRef, ComponentPropsWithRef } from "react";

interface LabelProps extends ComponentPropsWithoutRef<"label"> {
  htmlFor: string;
}

type InputComponentType = "input" | "textarea";

interface BaseInputProps {
  name: string;
  label?: Omit<LabelProps, "htmlFor">;
  type?: InputComponentType;
}

type InputProps<T extends InputComponentType = "input"> = T extends "textarea"
  ? ComponentPropsWithRef<"textarea"> & BaseInputProps
  : ComponentPropsWithRef<"input"> & BaseInputProps;

const Label = ({ children, htmlFor, ...props }: LabelProps) => {
  return (
    <label
      {...props}
      htmlFor={htmlFor}
      className={`font-medium text-gray-700 capitalize ${props.className}`}
    >
      {children}
    </label>
  );
};

const BasicInput = (props: ComponentPropsWithRef<"input">) => {
  return (
    <input
      {...props}
      className={`w-full bg-white rounded-sm border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${props.className}`}
    />
  );
};

const TextArea = (props: ComponentPropsWithRef<"textarea">) => {
  return (
    <textarea
      {...props}
      className={`w-full bg-white rounded-sm border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${props.className}`}
    />
  );
};

export default function Input<T extends InputComponentType>({
  name,
  type = "input" as T,
  ...props
}: InputProps<T>) {
  return (
    <div className="form-control">
      {props.label?.children ? (
        <Label {...props.label} htmlFor={name} className="mb-2" />
      ) : (
        <Label {...props.label} htmlFor={name} className="mb-2">
          {name}
        </Label>
      )}
      {type === "textarea" ? (
        <TextArea {...(props as ComponentPropsWithRef<"textarea">)} id={name} />
      ) : (
        <BasicInput {...(props as ComponentPropsWithRef<"input">)} id={name} />
      )}
    </div>
  );
}

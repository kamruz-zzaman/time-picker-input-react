export interface TimePickerProps {
    /** Current value in "HH:MM" format (for controlled component) */
    value?: string;
    /** Default value in "HH:MM" format (for uncontrolled component) */
    defaultValue?: string;
    /** Callback when time changes */
    onChange?: (time: string) => void;
    /** Additional CSS classes */
    className?: string;
    /** Disable the input */
    disabled?: boolean;
    /** Placeholder text */
    placeholder?: string;
    /** ID for the input */
    id?: string;
    /** Name for the input */
    name?: string;
}
export default function TimePicker({ value, defaultValue, onChange, className, disabled, placeholder, id, name, }: TimePickerProps): import("react/jsx-runtime").JSX.Element;

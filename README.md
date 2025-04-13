# time-picker-input-react

A modern, customizable time picker input component for React applications with TypeScript support.

[Live Demo](https://time-picker-input-react.netlify.app/)

## Installation

```bash
npm install time-picker-input-react
# or
yarn add time-picker-input-react
# or
pnpm add time-picker-input-react
```

## Features

- 🎨 Built with TailwindCSS for modern styling
- 🔧 Highly customizable
- 📱 Mobile-friendly
- ⌨️ Keyboard accessible
- 💪 TypeScript support
- ⚛️ React 16.8+ compatible

## Usage

```jsx
import { TimePicker } from "time-picker-input-react";

function App() {
  const handleTimeChange = (time) => {
    console.log("Selected time:", time);
  };

  return (
    <TimePicker
      onChange={handleTimeChange}
      value="12:00"
      className="custom-class"
    />
  );
}
```

## Props

| Prop          | Type                     | Default         | Description                                      |
| ------------- | ------------------------ | --------------- | ------------------------------------------------ |
| `value`       | `string`                 | `''`            | The current time value in 24-hour format (HH:mm) |
| `onChange`    | `(time: string) => void` | -               | Callback function called when time changes       |
| `className`   | `string`                 | `''`            | Additional CSS classes to apply                  |
| `disabled`    | `boolean`                | `false`         | Disables the time picker input                   |
| `placeholder` | `string`                 | `'Select time'` | Placeholder text when no time is selected        |
| `format`      | `'12h' \| '24h'`         | `'24h'`         | Time format to display                           |

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

If you have any questions or need help, please open an issue in the GitHub repository.

---

Made with ❤️ using React and TailwindCSS

# NS FiveM React Boilerplate

A modern template for developing FiveM NUI interfaces using React, TypeScript, Vite, and TailwindCSS.

## ✨ Features

- **React 19** with TypeScript
- **Vite** for fast builds and hot reload
- **TailwindCSS 4.0** for styling
- **Custom hooks** for FiveM NUI integration
- **ESLint** configured for React
- **Project structure** optimized for FiveM
- **Visibility provider** for interface management

## 🚀 Quick Start

You can create a new project using this template in two ways:

### Method 1: Using npx (recommended)

```bash
npx ns-fivem-react-boilerplate my-fivem-resource
cd my-fivem-resource
npm install
```

### Method 2: Manual clone

```bash
git clone https://github.com/Nebula-Studios/ns-fivem-react-boilerplate.git my-fivem-resource
cd my-fivem-resource
rm -rf .git
npm install
```

## 📋 Project Structure

```
my-fivem-resource/
├── src/
│   ├── components/         # React components
│   │   └── App.tsx
│   ├── hooks/             # Custom hooks
│   │   └── useNuiEvent.ts
│   ├── providers/         # Context providers
│   │   └── VisibilityProvider.tsx
│   ├── utils/             # Utilities
│   │   ├── debugData.ts
│   │   ├── fetchNui.ts
│   │   └── misc.ts
│   ├── index.css          # Global styles
│   ├── main.tsx           # Entry point
│   └── vite-env.d.ts      # TypeScript definitions
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
└── postcss.config.mjs
```

## 🛠️ Available Scripts

```bash
# Start development server
npm start

# Build for development with watch mode (for FiveM)
npm run start:game

# Production build
npm run build

# Preview build
npm run preview
```

## 🎯 FiveM Usage

### 1. Development

During development, use:

```bash
npm run start:game
```

This command will build the project in watch mode, automatically updating files when you make changes.

### 2. NUI Communication

The template includes hooks and utilities for communicating with the FiveM client:

#### useNuiEvent Hook

```tsx
import { useNuiEvent } from "./hooks/useNuiEvent";

function MyComponent() {
  useNuiEvent<{ message: string }>("showNotification", (data) => {
    console.log(data.message);
  });

  return <div>My Component</div>;
}
```

#### fetchNui Utility

```tsx
import { fetchNui } from "./utils/fetchNui";

const handleClick = async () => {
  try {
    const response = await fetchNui<{ success: boolean }>("myCallback", {
      data: "some data",
    });
    console.log(response.success);
  } catch (error) {
    console.error("Error:", error);
  }
};
```

### 3. Visibility Management

The `VisibilityProvider` automatically manages interface visibility:

```tsx
// The interface will automatically hide when ESC is pressed
// or when it receives the 'setVisible' event with false
```

## 🎨 Customization

### TailwindCSS

The project uses TailwindCSS 4.0. You can customize colors and themes by modifying the CSS configuration file in `src/index.css`.

### TypeScript

TypeScript configurations are optimized for React and Vite. You can modify `tsconfig.json` for your specific needs.

## 📦 Build and Deployment

1. **For FiveM development:**

   ```bash
   npm run start:game
   ```

2. **For production:**
   ```bash
   npm run build
   ```

Built files will be in the `dist/` folder and can be copied to your FiveM resource.

## 🤝 Contributing

1. Fork the project
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is released under the MIT License. See the `LICENSE` file for more details.

## 🙏 Acknowledgments

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [TailwindCSS](https://tailwindcss.com/)
- [FiveM](https://fivem.net/)

---

Made with ❤️ for the FiveM community

# NS FiveM React Boilerplate

Un template moderno per lo sviluppo di interfacce NUI in FiveM utilizzando React, TypeScript, Vite e TailwindCSS.

## ✨ Caratteristiche

- **React 19** con TypeScript
- **Vite** per un build veloce e hot reload
- **TailwindCSS 4.0** per lo styling
- **Hooks personalizzati** per l'integrazione FiveM NUI
- **ESLint** configurato per React
- **Struttura del progetto** ottimizzata per FiveM
- **Provider per la visibilità** dell'interfaccia

## 🚀 Installazione rapida

Puoi creare un nuovo progetto utilizzando questo template in due modi:

### Metodo 1: Utilizzando npx (raccomandato)

```bash
npx ns-fivem-react-boilerplate my-fivem-resource
cd my-fivem-resource
npm install
```

### Metodo 2: Clone manuale

```bash
git clone https://github.com/tuousername/ns-fivem-react-boilerplate.git my-fivem-resource
cd my-fivem-resource
rm -rf .git
npm install
```

## 📋 Struttura del progetto

```
my-fivem-resource/
├── src/
│   ├── components/         # Componenti React
│   │   └── App.tsx
│   ├── hooks/             # Hook personalizzati
│   │   └── useNuiEvent.ts
│   ├── providers/         # Context providers
│   │   └── VisibilityProvider.tsx
│   ├── utils/             # Utilities
│   │   ├── debugData.ts
│   │   ├── fetchNui.ts
│   │   └── misc.ts
│   ├── index.css          # Stili globali
│   ├── main.tsx           # Entry point
│   └── vite-env.d.ts      # Definizioni TypeScript
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
└── postcss.config.mjs
```

## 🛠️ Script disponibili

```bash
# Avvia il server di sviluppo
npm start

# Build per sviluppo con watch mode (per FiveM)
npm run start:game

# Build di produzione
npm run build

# Preview del build
npm run preview
```

## 🎯 Utilizzo per FiveM

### 1. Sviluppo

Durante lo sviluppo, usa:

```bash
npm run start:game
```

Questo comando builderà il progetto in modalità watch, aggiornando automaticamente i file quando fai modifiche.

### 2. Comunicazione NUI

Il template include hook e utility per comunicare con il client FiveM:

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

### 3. Gestione della visibilità

Il `VisibilityProvider` gestisce automaticamente la visibilità dell'interfaccia:

```tsx
// L'interfaccia si nasconderà automaticamente quando si preme ESC
// o quando riceve l'evento 'setVisible' con false
```

## 🎨 Personalizzazione

### TailwindCSS

Il progetto utilizza TailwindCSS 4.0. Puoi personalizzare i colori e i temi modificando il file di configurazione CSS in `src/index.css`.

### TypeScript

Le configurazioni TypeScript sono ottimizzate per React e Vite. Puoi modificare `tsconfig.json` per le tue esigenze specifiche.

## 📦 Build e deployment

1. **Per sviluppo FiveM:**

   ```bash
   npm run start:game
   ```

2. **Per produzione:**
   ```bash
   npm run build
   ```

I file buildati saranno nella cartella `dist/` e possono essere copiati nella tua risorsa FiveM.

## 🤝 Contribuire

1. Fork del progetto
2. Crea un branch per la tua feature (`git checkout -b feature/AmazingFeature`)
3. Commit delle modifiche (`git commit -m 'Add some AmazingFeature'`)
4. Push del branch (`git push origin feature/AmazingFeature`)
5. Apri una Pull Request

## 📄 Licenza

Questo progetto è rilasciato sotto licenza MIT. Vedi il file `LICENSE` per maggiori dettagli.

## 🙏 Riconoscimenti

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [TailwindCSS](https://tailwindcss.com/)
- [FiveM](https://fivem.net/)

---

Made with ❤️ for the FiveM community

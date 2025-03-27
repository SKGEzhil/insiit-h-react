# Insiit-H

A modern web application built with React, TypeScript, and Vite, featuring a rich text editor and comprehensive content management capabilities.

## 🚀 Features

- **Rich Text Editor**: Powered by EditorJS with multiple plugins for enhanced content creation
- **Authentication**: Google OAuth integration for secure user access
- **State Management**: Redux Toolkit for efficient state handling
- **Responsive Design**: Built with Tailwind CSS and Material Tailwind
- **Type Safety**: Full TypeScript implementation
- **Modern UI Components**: Including accordions, modals, and responsive layouts
- **Markdown Support**: Convert between markdown and rich text formats
- **Search Functionality**: Implemented using Fuse.js for fuzzy searching

## 🛠️ Tech Stack

- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS, Material Tailwind
- **State Management**: Redux Toolkit
- **Routing**: React Router v6
- **Testing**: Jest, React Testing Library
- **Documentation**: JSDoc, React Styleguidist
- **Code Quality**: ESLint, TypeScript

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/insiit-h.git
cd insiit-h
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add necessary environment variables:
```env
VITE_GOOGLE_CLIENT_ID=your_google_client_id
# Add other required environment variables
```

4. Start the development server:
```bash
npm run dev
```

## 🏗️ Project Structure

```
src/
├── assets/         # Static assets (images, fonts, etc.)
├── components/     # Reusable UI components
├── config/         # Configuration files
├── context/        # React context providers
├── hooks/          # Custom React hooks
├── layouts/        # Page layouts
├── models/         # TypeScript interfaces and types
├── pages/          # Page components
├── services/       # API and external service integrations
├── store/          # Redux store configuration
├── utils/          # Utility functions
└── App.tsx         # Main application component
```

## 🧪 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test` - Run tests
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking
- `npm run docs` - Generate documentation

## 🔧 Editor Tools

The application includes a comprehensive set of EditorJS tools:

- Header
- Paragraph
- Checklist
- Code
- Delimiter
- Embed
- Image
- Inline Code
- Link
- List
- Marker
- Quote
- Raw
- Simple Image
- Table
- Warning

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [EditorJS](https://editorjs.io/) for the rich text editor
- [Material Tailwind](https://material-tailwind.com/) for UI components
- [React](https://reactjs.org/) for the frontend framework
- [Vite](https://vitejs.dev/) for the build tool

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

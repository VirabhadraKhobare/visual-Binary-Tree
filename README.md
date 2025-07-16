# 🌳 Visual Binary Tree

An interactive binary tree visualization application built with React, Next.js, and TypeScript. This project provides a beautiful, intuitive interface for creating, manipulating, and visualizing binary tree data structures.

![Binary Tree Visualization](https://img.shields.io/badge/Next.js-15.3.3-black?logo=next.js)
![React](https://img.shields.io/badge/React-18+-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3+-38B2AC?logo=tailwind-css)

## ✨ Features

- **Interactive Tree Visualization** - Click to select nodes and visualize tree structure
- **Node Operations** - Insert nodes as left or right children
- **Operation Logging** - Track all tree operations with detailed logs
- **Theme Support** - Toggle between dark and light modes
- **Responsive Design** - Works seamlessly on desktop and mobile devices
- **Modern UI** - Built with shadcn/ui components and Tailwind CSS
- **Real-time Updates** - See changes instantly as you modify the tree

## 🚀 Demo

[Live Demo](https://your-deployment-url.vercel.app) *(Deploy and add your URL)*

## 📋 Prerequisites

Before running this project, make sure you have:

- Node.js 18+ installed
- npm or yarn package manager

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/VirabhadraKhobare/visual-Binary-Tree.git
   cd visual-Binary-Tree
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
visual-Binary-Tree/
├── src/
│   ├── app/                    # Next.js app directory
│   │   ├── globals.css         # Global styles
│   │   ├── layout.tsx          # Root layout component
│   │   └── page.tsx            # Home page component
│   ├── components/             # React components
│   │   ├── ui/                 # shadcn/ui components
│   │   ├── operation-log.tsx   # Operation history component
│   │   ├── tree-controls.tsx   # Tree control buttons
│   │   ├── tree-visualizer.tsx # Main tree visualization
│   │   └── theme-provider.tsx  # Theme context provider
│   ├── hooks/                  # Custom React hooks
│   │   ├── use-binary-tree.ts  # Binary tree logic hook
│   │   ├── use-mobile.tsx      # Mobile detection hook
│   │   └── use-toast.ts        # Toast notification hook
│   └── lib/                    # Utility functions
│       └── utils.ts            # Helper utilities
├── components.json             # shadcn/ui configuration
├── next.config.ts              # Next.js configuration
├── package.json                # Dependencies and scripts
├── tailwind.config.ts          # Tailwind CSS configuration
└── tsconfig.json               # TypeScript configuration
```

## 🎮 Usage

### Basic Operations

1. **Creating a Tree**
   - The tree starts empty
   - Click "Insert as Root" to create the first node

2. **Adding Nodes**
   - Select a parent node by clicking on it
   - Choose "Insert Left" or "Insert Right"
   - Enter a numeric value for the new node

3. **Viewing Operations**
   - All operations are logged in the Operation Log panel
   - See timestamps and operation details

4. **Clearing the Tree**
   - Use the "Clear Tree" button to start over

### Keyboard Shortcuts

- `Ctrl/Cmd + /` - Toggle theme
- `Escape` - Deselect current node

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# Add any environment variables here
NEXT_PUBLIC_APP_NAME="Visual Binary Tree"
```

### Customization

- **Colors**: Modify theme colors in `tailwind.config.ts`
- **Components**: Customize UI components in `src/components/ui/`
- **Tree Logic**: Extend binary tree functionality in `src/hooks/use-binary-tree.ts`

## 📦 Built With

- **[Next.js 15](https://nextjs.org/)** - React framework for production
- **[React 18](https://reactjs.org/)** - JavaScript library for building user interfaces
- **[TypeScript](https://www.typescriptlang.org/)** - Typed superset of JavaScript
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[shadcn/ui](https://ui.shadcn.com/)** - Re-usable components built with Radix UI
- **[Lucide React](https://lucide.dev/)** - Beautiful & consistent icon toolkit
- **[next-themes](https://github.com/pacocoursey/next-themes)** - Theme switching library

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Deploy with zero configuration

### Other Platforms

- **Netlify**: `npm run build && npm run export`
- **GitHub Pages**: Enable static export in `next.config.ts`

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Virabhadra Khobare**
- GitHub: [@VirabhadraKhobare](https://github.com/VirabhadraKhobare)

## 🙏 Acknowledgments

- [shadcn](https://twitter.com/shadcn) for the amazing UI components
- [Vercel](https://vercel.com) for hosting and deployment
- [Lucide](https://lucide.dev) for the beautiful icons

## 📸 Screenshots

### Light Mode
![Light Mode Screenshot](https://via.placeholder.com/800x600/ffffff/000000?text=Light+Mode+Screenshot)

### Dark Mode
![Dark Mode Screenshot](https://via.placeholder.com/800x600/000000/ffffff?text=Dark+Mode+Screenshot)

---

⭐ If you found this project helpful, please give it a star on GitHub!
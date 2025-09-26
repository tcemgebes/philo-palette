# Philo Palette 🎭

> **Discover Your Philosophical Path Through AI-Powered Personality Matching**

A sophisticated web application that matches users with philosophical traditions and books based on their personality, challenges, and philosophical interests. Built with modern web technologies and powered by AI analysis.

## 🌟 Features

### 🧠 **AI-Powered Personality Analysis**
- Comprehensive personality assessment using the Big Five model
- Advanced philosophical compatibility scoring
- Personalized book recommendations based on user profile

### 📚 **Extensive Philosophy Database**
- **11 Major Philosophical Traditions** - From Stoicism to Utilitarianism
- **6 Curated Philosophy Books** - Classic works with detailed analysis
- **Interactive Traditions Explorer** - Browse philosophical traditions with detailed information

### 🎯 **Personalized Journey**
- **Introspective Assessment** - Share your challenges and philosophical interests
- **Interactive Quiz** - Answer questions about meaning, knowledge, ethics, and reality
- **Personalized Results** - Get matched with philosophical traditions and book recommendations

### 🎨 **Beautiful, Responsive Design**
- Retro-inspired aesthetic with modern functionality
- Glass panel design with golden color scheme
- Fully responsive across all devices
- Smooth animations and transitions

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/tcemgebes/philo-palette.git
   cd philo-palette
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env
   ```
   Add your API keys to the `.env` file:
   ```
   VITE_OPENAI_API_KEY=your_openai_api_key
   VITE_ANTHROPIC_API_KEY=your_anthropic_api_key
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:8080`

## 🏗️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + Custom CSS
- **UI Components**: shadcn/ui + Radix UI
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **State Management**: TanStack Query
- **AI Integration**: OpenAI GPT-4 + Anthropic Claude

## 📁 Project Structure

```
philo-palette/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── ui/             # shadcn/ui components
│   │   ├── Header.tsx      # Navigation header
│   │   ├── Footer.tsx      # Site footer
│   │   └── ...
│   ├── pages/              # Main application pages
│   │   ├── Index.tsx       # Home page
│   │   ├── Introduction.tsx # Intro page with navigation
│   │   ├── Introspection.tsx # Personality assessment
│   │   ├── Quiz.tsx        # Philosophical quiz
│   │   ├── Results.tsx     # Personalized results
│   │   └── Traditions.tsx  # Philosophy traditions explorer
│   ├── utils/              # Utility functions and data
│   │   ├── philosophyData.ts # Philosophy books and traditions
│   │   ├── aiService.ts    # AI integration services
│   │   └── ...
│   └── hooks/              # Custom React hooks
├── public/
│   └── images/             # Book cover images
└── ...
```

## 🎯 Key Features Explained

### **Philosophical Traditions Explorer**
- Browse 11 major philosophical traditions
- Each tradition includes key philosophers, core themes, and historical context
- Beautiful card-based layout with color-coded icons

### **AI-Powered Matching**
- Advanced personality analysis using multiple AI models
- Sophisticated compatibility scoring algorithm
- Personalized book recommendations with reasoning

### **Interactive Assessment**
- Multi-step personality assessment
- Philosophical preference quiz
- Context-aware question generation

## 🎨 Design Philosophy

The application features a **retro-inspired aesthetic** that pays homage to classical philosophy while maintaining modern usability:

- **Color Scheme**: Deep backgrounds with golden accents (`#e8da99`, `#c3b17f`)
- **Typography**: Monospace fonts for a scholarly feel
- **Layout**: Glass panels with subtle borders and shadows
- **Interactions**: Smooth transitions and hover effects

## 🔧 Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Code Style
- TypeScript for type safety
- ESLint for code quality
- Prettier for code formatting
- Component-based architecture

## 📚 Philosophy Database

### **Included Traditions**
1. **Stoicism** - Marcus Aurelius, Epictetus, Seneca
2. **Existentialism** - Sartre, Beauvoir, Camus, Nietzsche
3. **Buddhism** - Siddhartha Gautama, mindfulness, compassion
4. **Analytical Philosophy** - Russell, Wittgenstein, logic
5. **Platonism** - Plato, Forms, ideal reality
6. **Pragmatism** - James, Dewey, practical consequences
7. **Phenomenology** - Husserl, Heidegger, consciousness
8. **Feminist Philosophy** - Beauvoir, Butler, gender studies
9. **Confucianism** - Confucius, social harmony
10. **Taoism** - Lao Tzu, naturalness, balance
11. **Utilitarianism** - Bentham, Mill, greatest happiness

### **Featured Books**
- **Meditations** by Marcus Aurelius
- **Beyond Good and Evil** by Friedrich Nietzsche
- **The Second Sex** by Simone de Beauvoir
- **The Myth of Sisyphus** by Albert Camus
- **Enchiridion** by Epictetus
- **The Republic** by Plato

## 🤝 Contributing

We welcome contributions! Please feel free to:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **Philosophical Inspiration**: All the great philosophers whose works continue to guide us
- **AI Technology**: OpenAI and Anthropic for their powerful language models
- **Open Source Community**: React, Vite, Tailwind CSS, and all the amazing open source tools
- **Collaborative Development**: Built through iterative collaboration and user feedback

## 📞 Support

If you have any questions or need help getting started, please open an issue on GitHub.

---

**Built with ❤️ for philosophy enthusiasts and curious minds**

*"The unexamined life is not worth living." - Socrates*
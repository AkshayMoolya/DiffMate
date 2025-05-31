# 🔄 DiffMate - Advanced Text Comparison Tool

DiffMate is a powerful text comparison tool built with Next.js that allows users to easily identify differences between text snippets, documents, or code segments. With its sleek sci-fi-inspired interface and advanced comparison algorithms, DiffMate provides a professional-grade solution for developers, writers, and teams.

## 🎯 Purpose

DiffMate was created to solve common challenges in text and file comparison:

- **🧩 Code Review Efficiency**: Quickly identify and visualize code changes between versions
- **👥 Document Collaboration**: Track changes in collaborative writing and editing processes
- **🔍 Error Identification**: Easily spot differences in expected vs. actual outputs
- **📚 Version Management**: Compare different file versions to track evolution and changes

## ✨ Key Features

- **🔄 Multiple Comparison Modes**:

  - Text-to-text comparison with character-level diff highlighting
  - Single file comparison with side-by-side or unified views
  - Folder comparison for directory structure analysis
  - GitHub integration for commit and PR comparisons

- **📊 Advanced Visualization**:

  - Line-by-line highlighting of additions, deletions, and modifications
  - Character-level inline changes within modified lines
  - Comprehensive diff statistics and summary
  - Code syntax highlighting for 20+ programming languages

- **🚀 User Experience**:

  - Sci-Fi-inspired UI with modern, sleek design
  - Light/Dark mode toggling for comfortable viewing
  - Responsive design for mobile and desktop use
  - Copy and download diff results for sharing

- **⚙️ Technical Features**:
  - Efficient diff algorithm for large files
  - Option to ignore whitespace changes
  - Line number display toggles
  - Multiple view modes (side-by-side or unified)

## 🛠 Technologies Used

- [Next.js](https://nextjs.org) - React framework
- [TailwindCSS](https://tailwindcss.com) - Styling
- [Framer Motion](https://www.framer.com/motion/) - Animations
- [Lucide Icons](https://lucide.dev/) - Icon library
- [shadcn/ui](https://ui.shadcn.com/) - UI components

## 📚 Use Cases

### For Developers

- Compare code versions before and after changes
- Review pull requests and code submissions
- Debug by comparing expected vs. actual outputs
- Analyze algorithm optimizations

### For Writers & Editors

- Compare document drafts and revisions
- Track changes in collaborative documents
- Review editorial changes before publishing
- Analyze content versions for improvements

### For Teams & Organizations

- Facilitate code reviews and document approvals
- Maintain quality control through version comparison
- Document historical changes for compliance
- Streamline communication about specific changes

## 🚀 Getting Started

First, install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## 📁 Project Structure

- `app/page.tsx`: Main landing page
- `app/compare`: Text comparison page
- `app/_Components`: Reusable UI components specific to this project
- `components`: General UI components from shadcn/ui
- `utils/diff-calculator.ts`: Core diff algorithm implementation
- `types/diff.ts`: TypeScript type definitions for diff operations

## ⚙️ How It Works

DiffMate uses a specialized diff algorithm to:

1. Break down content into lines
2. Find common lines between documents
3. Identify added, removed, and changed content
4. Process character-level differences for modified lines
5. Generate statistical data about changes
6. Render visual representations of the differences

## 📖 Learn More

To learn more about the technologies used in this project:

- [Next.js Documentation](https://nextjs.org/docs)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [Framer Motion Documentation](https://www.framer.com/motion/introduction/)

## 🚀 Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new) from the creators of Next.js.

## 👤 Made By

DiffMate is created and maintained by [Akshay Moolya](https://akshay33.vercel.app/).

# UI Component Generator

This project is a Next.js application that generates UI components using DaisyUI classes based on user input. It leverages OpenAI's GPT model to create HTML components dynamically.

## Features

- Generate UI components using natural language instructions
- Real-time component preview
- Chat history display
- Light and dark theme support
- Responsive design

## Technologies Used

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- DaisyUI
- OpenAI API
- Zod for schema validation

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/ui_engine.git
   cd ui_engine
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env.local` file in the root directory and add your OpenAI API key:
   ```
   OPENAI_API_KEY=your_api_key_here
   ```

## Usage

1. Start the development server:
   ```
   npm run dev
   ```

2. Open [http://localhost:3000](http://localhost:3000) in your browser.

3. Enter your component instructions in the textarea.

4. Click the "Generate Components" button.

5. View the generated component and its HTML code.

## Project Structure

- `src/app`: Contains the main page and API route
- `src/components`: React components used in the application
- `src/context`: React context for managing chat history
- `src/lib`: Utility classes and functions

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [DaisyUI](https://daisyui.com/)
- [OpenAI](https://openai.com/)
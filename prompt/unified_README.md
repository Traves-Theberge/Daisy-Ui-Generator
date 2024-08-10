# UnifiedApis: A Comprehensive Multi-Provider Chat API Wrapper

## Overview

UnifiedApis is a sophisticated Python class designed to provide a unified interface for interacting with multiple language model providers, including OpenAI, Anthropic, and OpenRouter. This versatile wrapper simplifies the complexities of working with different AI models by offering a consistent API across providers, handling both synchronous and asynchronous operations, and managing chat history and system messages efficiently.

## Key Features

1. **Multi-Provider Support**: Seamlessly integrates with OpenAI, Anthropic, and OpenRouter APIs.
2. **Flexible Model Selection**: Allows specifying different models for each provider, with intelligent defaults.
3. **Asynchronous and Synchronous Operations**: Supports both async and sync API calls for versatile application integration.
4. **Stream Mode**: Enables streaming responses for real-time output, enhancing user experience.
5. **Chat History Management**: Automatically manages and trims chat history to maintain context within limits.
6. **System Message Customization**: Allows setting custom system messages to guide AI behavior in each conversation.
7. **JSON Mode**: Supports JSON output format for OpenAI models, facilitating structured data handling.
8. **Retry Mechanism**: Implements automatic retries on API failures to improve reliability.
9. **Max Message Words**: Limits the number of words per message for more concise interactions and efficient token usage.
10. **History Clearing**: Provides methods to clear chat history when needed.

## Detailed Functionality

### Initialization

The `UnifiedApis` class is initialized with a range of parameters for fine-tuned control:

- `provider`: Specifies the AI provider (e.g., "openai", "anthropic", "openrouter").
- `model`: Selects the specific model to use. Defaults are:
  - OpenAI: "gpt-4o"
  - Anthropic: "claude-3-5-sonnet-20240620"
  - OpenRouter: "google/gemini-pro-1.5"
- `api_key`: API key for authentication (can be set via environment variables for security).
- `max_history_words`: Limits the total number of words in the chat history (default: 10000).
- `max_words_per_message`: Restricts the number of words in each message (optional).
- `json_mode`: Enables JSON output format for OpenAI models (default: False).
- `stream`: Toggles streaming mode for real-time responses (default: True).
- `use_async`: Enables asynchronous API calls (default: False).
- `max_retry`: Sets the maximum number of retry attempts for API calls (default: 10).

### Core Functionality

1. **API Client Initialization**:
   - `_initialize_client()`: Sets up the appropriate client (OpenAI, Anthropic, or OpenRouter) based on the chosen provider and async mode.
   - Handles different base URLs and configurations for each provider.

2. **Message Management**:
   - `add_message(role, content)`: Adds user or assistant messages to the history.
     - If `max_words_per_message` is set, it appends a request to limit the response length.
   - `trim_history()`: Keeps the chat history within the `max_history_words` limit by removing oldest messages first.
   - `clear_history()`: Completely clears the chat history, resetting the conversation.

3. **Chat Interaction**:
   - `chat(user_input, **kwargs)` / `chat_async(user_input, **kwargs)`: 
     - Handles user input, adds it to history, and retrieves AI responses.
   - `get_response(**kwargs)` / `get_response_async(**kwargs)`:
     - Communicates with the AI provider's API.
     - Handles streaming if enabled.
     - Processes and returns the response.
     - Implements retry logic for API failures.

4. **System Message Handling**:
   - `set_system_message(message)`: Customizes the system message for the conversation.
   - Automatically appends JSON instructions for OpenAI when in JSON mode.

5. **Max Words Per Message**:
   - When `max_words_per_message` is set, it modifies the user's message to request a limited response length.
   - Example: If set to 100, it appends "please use 100 words or less" to the user's message.

6. **History Management**:
   - `print_history_length()`: Displays the current word count of the chat history.
   - `clear_history()`: Empties the entire chat history, allowing for a fresh start in the conversation.
   - Both methods have asynchronous counterparts: `print_history_length_async()` and `clear_history_async()`.

### Advanced Features

- **Retry Mechanism**: 
  - Automatically retries API calls on failure, up to `max_retry` times.
  - Implements exponential backoff for more efficient retrying.

- **JSON Mode**: 
  - For OpenAI, can request responses in JSON format.
  - Automatically parses JSON responses for easier data handling.

- **Streaming**:
  - Allows for real-time display of AI responses as they are generated.
  - Improves user experience for longer responses.

### Asynchronous Support

The class provides both synchronous and asynchronous methods for all major operations:
- `chat()` vs `chat_async()`
- `get_response()` vs `get_response_async()`
- `add_message()` vs `add_message_async()`
- `set_system_message()` vs `set_system_message_async()`
- `clear_history()` vs `clear_history_async()`
- `print_history_length()` vs `print_history_length_async()`

This dual support allows for efficient integration in various application types, from simple scripts to complex asynchronous web applications.

## Usage Example




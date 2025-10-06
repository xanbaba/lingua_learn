
# Lingua Learn API

[![Project Status](https://img.shields.io/badge/status-active-success.svg)](https://github.com/your-username/lingua-learn-api)
[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)](https://github.com/your-username/lingua-learn-api/actions/workflows/main.yml)

Lingua Learn API is a FastAPI-based backend designed to facilitate language learning through interactive exercises. It provides an API for processing user input, such as images or text, and returning relevant language-related data. This API includes a WebSocket endpoint for real-time communication and data streaming, making it suitable for applications requiring immediate feedback.

### Prerequisites

- Python 3.10+
- `uv` package manager. Install via:

bash
git clone https://github.com/your-username/lingua-learn-api.git
cd lingua-learn-api
> Note: Ensure you have the latest version of `uv`.  If you encounter issues, try upgrading `uv` using `pip install --upgrade uv`.

### Usage

Run the application using `uvicorn` with hot-reloading for development:

- **`/` (GET)**:  A simple health check endpoint to verify the API is running.
- **`/ws` (WebSocket)**:  A WebSocket endpoint for real-time communication.

json
    {
        "type": "frame",
        "data": "data:image/jpeg;base64,/9j/4AAQSkZJRgABA..."
    }
        - **Server Responses:**
        - `{"type": "prediction", "data": { "A": 0.123, ... } }`:  The server returns a prediction result with associated confidence scores for different categories.
        - `{"type": "error", "message": "Error details"}`: The server returns an error message if something goes wrong during processing. The `message` field provides details about the error.

### Testing

Run tests using `pytest`:

bash
uv run ruff check .
We welcome contributions to the Lingua Learn API! To contribute, please follow these steps:

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Implement your changes, ensuring they adhere to the project's coding standards.
4.  Write tests to cover your changes.
5.  Run linters and formatters to ensure code quality.
6.  Commit your changes with clear, concise commit messages.
7.  Push your branch to your forked repository.
8.  Submit a pull request to the main repository.

> Before submitting a pull request, please ensure that all tests pass and that your code is properly linted.  Also, provide a clear description of the changes you've made and the problem they solve.

### License

> [Specify the project license here, e.g., MIT License]

### Acknowledgements

> [Acknowledge any third-party libraries, datasets, or individuals who contributed to the project.]

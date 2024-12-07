# Elysia XSS

A plugin for Elysia.js that provides XSS (Cross-Site Scripting) protection by sanitizing request body data.

## Features

- 🛡️ Automatic XSS protection for request body data
- 🔄 Recursive sanitization of nested objects and arrays
- 🎯 Configurable scope options
- 🪶 Lightweight with minimal dependencies
- 🚀 Built for Elysia.js and Bun

## Installation

```bash
bun add elysia-xss
```

## Usage

```typescript
import { Elysia } from 'elysia'
import { elysiaXSS } from 'elysia-xss'

const app = new Elysia()
    .use(elysiaXSS({}))
    .get("/", () => "Hello World!")
    .listen(3000)
```

### Configuration

The plugin accepts a configuration object with the following options:

```
{
    as?: "global" | "scoped" | "local" // Default: "global"
}
```

### Example with Configuration

```typescript
import { Elysia } from 'elysia'
import { elysiaXSS } from 'elysia-xss'

const app = new Elysia()
    .use(elysiaXSS({ as: "scoped" }))
    .post("/submit", ({ body }) => {
        // body is automatically sanitized
        return { message: "Data received", data: body }
    })
    .listen(3000)
```

## How it Works

The plugin automatically sanitizes all string values in the request body, including nested objects and arrays. It uses the [xss](https://www.npmjs.com/package/xss) package under the hood for sanitization.

## Dependencies

- [Elysia](https://elysiajs.com/) - The web framework
- [xss](https://www.npmjs.com/package/xss) - XSS sanitizer

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
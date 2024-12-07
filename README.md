# Gmail Email Reader

A Node.js CLI application for reading Gmail emails using the Gmail API.

## Installation

```bash
npm install
```

## Usage

### Start Server

Start the authentication server:

```bash
npx read-server
```

### Read Emails

Fetch your latest emails:

```bash
npx get-emails
```

Options:

- `-c, --count <number>`: Number of emails to fetch (default: 3)
- `-p, --preview`: Show preview of email body instead of full content
- `-s, --socket <path>`: Socket path (default: /tmp/gmail-debug.sock)

### Send Custom Code

Execute custom code against the server:

```bash
npx debug-send <code>
```

## Features

- OAuth 2.0 authentication with Gmail
- Read emails from your inbox
- Display email headers and content
- Preview mode for long emails
- Custom code execution via socket

## Requirements

- Node.js
- google app with Gmail read permissions
- Gmail API credentials in `credentials.json`

## Dependencies

- @google-cloud/local-auth
- googleapis
- commander
- inquirer
- dotenv

## Security

- OAuth tokens are handled securely
- Credentials are stored locally
- Communications via Unix socket

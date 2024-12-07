Disgustingly annoying to work with outlook

# Email Reader Application Design

## Project Overview

A Node.js not typescrit CLI application to read Gmail emails using the Gmail API.

## Features

- Gmail authentication using OAuth 2.0
- Read emails from Gmail inbox
- Display email subjects, senders, and content
- Command-line interface using `npx read-email`

## Technical Stack

- Node.js
- Gmail API
- OAuth 2.0
- Commander.js (CLI framework)
- Inquirer.js (Interactive prompts)

## Implementation Steps

1. Project Setup

   - Initialize npm project
   - Install required dependencies
   - Set up Gmail API credentials

2. Authentication Flow

   - Implement OAuth 2.0 authentication
   - Store user credentials securely
   - Handle token refresh

3. Email Reading Logic

   - Connect to Gmail API
   - Fetch emails from inbox
   - Parse email content
   - Display in formatted output

4. CLI Interface
   - Create command-line options
   - Implement interactive mode
   - Add filtering capabilities

## File Structure

```
read-email/
├── bin/
│   └── index.js
├── src/
│   ├── auth/
│   │   └── gmail-auth.js
│   ├── email/
│   │   └── email-reader.js
│   └── cli/
│       └── commands.js
├── package.json
└── README.md
```

## Required Dependencies

- `@google-cloud/local-auth`
- `googleapis`
- `commander`
- `inquirer`

## Security Considerations

- Secure storage of OAuth tokens
- Handle API rate limiting
- Protect user credentials

## Usage

1. Installation

```bash
npm install
```

2. Authentication

```bash
npx read-email auth
```

3. Read Emails

```bash
# Read latest emails
npx read-email list
```

4. Help

```bash
npx read-email --help
```

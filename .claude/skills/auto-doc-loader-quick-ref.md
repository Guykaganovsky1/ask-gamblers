# Auto Doc Loader - Quick Reference

## What This Skill Does

Automatically fetches official documentation the moment you mention a software/framework, so Claude has complete knowledge before helping you.

## When It Activates

You mention you're working with:
- A framework: React, Django, Node.js, Flutter
- A tool: Docker, Kubernetes, Terraform
- A database: PostgreSQL, MongoDB, Redis
- A cloud service: AWS, GCP, Azure
- Any other recognized software/library

## How It Works

```
You mention software
         ↓
Skill detects it
         ↓
Skill finds official docs URL
         ↓
Skill fetches key documentation sections
         ↓
Documentation added to Claude's context
         ↓
Claude responds with full product knowledge
```

## Result

Instead of:
- You: "Help me with React"
- Claude: "What version? What do you want to do with React?"
- You: [explains further, maybe pastes docs]

You get:
- You: "Help me with React"
- Claude: [Immediately knows React 18+, latest hooks, current best practices, fetched from react.dev]

## Key Benefits

| Before | After |
|--------|-------|
| "Do you know this library?" | Skill auto-fetches docs |
| Copy-paste documentation | Skill handles it |
| Claude asks clarifying questions | Already knows the product |
| Answers based on training data | Based on latest official docs |
| Need to explain your tech stack | Skill identifies it automatically |

## What Gets Fetched

For each software:
- Getting Started guide
- Installation instructions
- Core concepts & architecture
- API reference
- Best practices
- Common troubleshooting

## Supported Software

**JavaScript/Frontend:**
React • Next.js • Vue • Angular • Svelte • Express • Remix

**Python:**
Django • FastAPI • Flask • Pandas • TensorFlow • PyTorch

**Databases:**
PostgreSQL • MongoDB • MySQL • Redis • Elasticsearch

**DevOps:**
Docker • Kubernetes • Terraform • Git

**Cloud:**
AWS • Google Cloud • Azure • Vercel • Netlify

**Mobile:**
Flutter • React Native • Swift • Kotlin

**And many more** - skill recognizes 100+ popular tools

## Example Workflows

### Frontend Development
```
You: "I'm building a Next.js app with authentication"
↓ [Skill fetches Next.js docs]
Claude: "I see you're using Next.js. Based on the current docs,
for auth I recommend using the App Router pattern with
middleware, like this: [specific Next.js approach]"
```

### Backend API
```
You: "Having trouble with my FastAPI endpoints"
↓ [Skill fetches FastAPI docs]
Claude: "Let me help. Based on FastAPI's structure,
the issue is likely [explains using official FastAPI patterns]"
```

### Data Science
```
You: [Upload Pandas code]
↓ [Skill detects Pandas from imports]
↓ [Skill fetches Pandas docs]
Claude: "I see you're using Pandas. Based on the docs,
here's a more efficient approach using [latest Pandas features]"
```

## In Your Conversation

**You won't see much difference** - it works in the background:
- Skill fetches docs while you're typing
- Documentation is silently added to Claude's context
- Claude responds faster with more accurate information
- No delays, no extra steps

**Optionally, you can control it:**
- "Skip auto-docs this session" - Disables it
- "Fetch version X docs" - Get specific version
- "I need just the API reference" - Focus docs
- "Use this documentation instead" - Provide custom docs

## How the Skill Identifies Software

Detects software from:
- **Explicit mention**: "I'm using React"
- **Code files**: package.json, requirements.txt, go.mod
- **Code imports**: "import React", "from django"
- **Error messages**: "ModuleNotFoundError: FastAPI"
- **Project description**: "Building a REST API with"

## Performance

- **Speed**: Docs fetched in 2-3 seconds (doesn't delay conversation)
- **Scope**: Fetches key sections, not entire documentation
- **Caching**: Documentation cached for the session (no re-fetching)
- **Fallback**: If fetch fails, conversation continues normally

## What Makes It Powerful

✨ **No context switching** - Documentation is built in, not something you have to search for

✨ **Always current** - Uses latest official docs, not training data from months ago

✨ **Version awareness** - Knows deprecations, breaking changes, new features

✨ **Best practices** - Recommendations align with official guides

✨ **Deep expertise** - Claude isn't just guessing; it's reading the official manual

✨ **Saves time** - No "let me look that up", no copy-paste, no back-and-forth

## Limitations

- Can't fetch documentation behind login/authentication
- Large documentation sites: fetches key sections, not everything
- Private/internal APIs: only fetches public documentation
- Real-time data: documentation snapshot at fetch time

## For Skill Creators

**To implement this skill in your own Claude instance:**

1. Add detection logic for software mentions
2. Create a map of known documentation URLs
3. Implement web_fetch for documentation retrieval
4. Add context formatting to make fetched docs useful
5. Handle errors gracefully (continue if fetch fails)
6. Cache documentation within session

See `/auto-doc-loader-implementation.md` for technical details.

## Example: What Documentation Gets Fetched for React

```
REACT:
├── Overview & Getting Started
├── Installation & Setup
├── Hooks documentation
├── State & Props concepts
├── Component patterns
├── Performance optimization
├── Troubleshooting common errors
└── Latest version features

Result: Claude knows React comprehensively before you ask
```

## Future Ideas

- Multi-language documentation support
- Changelog scanning for recent changes
- Stack Overflow + GitHub integration for community patterns
- Interactive documentation search
- Real-time version tracking
- Documentation version comparison

---

**The core idea**: Why wait for Claude to figure out your tech stack when the official manual can be loaded in seconds?

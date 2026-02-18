---
name: auto-doc-loader
description: Automatically fetch official documentation from software products on first load, giving Claude complete understanding of how the software works before assisting with development tasks.
---

# Auto Doc Loader

## Purpose

When you start working on a software project, this skill automatically fetches the official documentation from the product's website or documentation portal. This gives Claude instant, comprehensive knowledge about how the software works before you ask any questions.

## When It Activates

This skill automatically engages when you:
- Mention starting work on a specific software/framework/tool
- Upload code files from a known project
- Ask for help with a specific software you haven't discussed yet
- Say something like "I'm working on..." or "Help me with [software name]"

## What It Does

1. **Identifies the software** - Recognizes what product/framework/tool you're working with
2. **Locates official resources** - Finds the official documentation URL for that software
3. **Fetches documentation** - Retrieves the main documentation pages (guides, API references, tutorials)
4. **Builds knowledge base** - Creates a comprehensive understanding of the software's features, architecture, and usage patterns
5. **Provides context** - Uses this knowledge to give more accurate and helpful responses

## Documentation Sources Priority

The skill prioritizes official sources in this order:
1. **Official documentation sites** (docs.framework.com, documentation.software.io)
2. **GitHub README and wiki** (for open-source projects)
3. **Official API reference** (for libraries and services)
4. **Getting Started guides** (for quick context)
5. **Release notes/Changelog** (for version-specific information)

## What Gets Fetched

For each software, the skill attempts to retrieve:
- Main documentation homepage (overview)
- Getting Started / Quick Start guide
- Installation/Setup instructions
- Core concepts and architecture documentation
- API/Configuration reference
- Common patterns or best practices
- Troubleshooting guide (if available)

## How It Works in Practice

**Example Scenario:**

You: "I'm building a React application and need help with state management"

Claude (with skill):
1. Recognizes "React"
2. Automatically fetches from https://react.dev/
3. Retrieves: React fundamentals, hooks documentation, state management patterns
4. Now responds to your question with deep knowledge of React's current best practices

**Without needing you to:**
- Paste documentation
- Describe what you're working on in detail
- Wait while Claude asks clarifying questions

## Implementation Details

### Recognition Pattern

The skill recognizes software by:
- Explicit mention: "I'm working with Node.js"
- File uploads: Detects package.json, requirements.txt, go.mod, etc.
- Code snippets: Identifies imports/requires (React, Django, Vue, etc.)
- Project types: "web app", "API", "data pipeline"

### Documentation Fetching Strategy

For each identified software:
```
1. Check if docs URL is known (maintained lookup table)
2. If unknown, search for "[software] official documentation"
3. Fetch primary documentation pages
4. Extract key sections using semantic understanding
5. Store summary in context for the session
```

### Known Software Mappings

Pre-configured for quick lookup:
- **JavaScript/Node**: React (react.dev), Next.js, Vue, Angular, Express, NestJS, etc.
- **Python**: Django, FastAPI, Flask, Pandas, PyTorch, TensorFlow, etc.
- **Backend**: Node.js, Go, Rust, Java, C#/.NET
- **Databases**: PostgreSQL, MongoDB, MySQL, Redis, etc.
- **Cloud**: AWS, GCP, Azure, Vercel, Netlify
- **Mobile**: Flutter, React Native, Swift, Kotlin
- **DevOps**: Docker, Kubernetes, Terraform, etc.

## Limitations & Safeguards

- **Large documentation sites** - Fetches key sections, not entire docs (respects performance)
- **Behind login walls** - Can't access private/authenticated documentation
- **Real-time changes** - Documentation is fetched at the start of conversation; assume it's current but verify for rapidly changing APIs
- **Rate limiting** - Respectful of server resources; batches requests efficiently
- **Private packages** - Can only fetch public documentation

## Configuration Options

You can customize the skill's behavior by mentioning:
- **"Only fetch quick start"** - Limits to beginner documentation
- **"I need advanced API reference"** - Prioritizes technical/reference docs
- **"Check version X.X docs"** - Fetches docs for specific version
- **"Skip this and just help me"** - Disables auto-fetch for this session

## Benefits

✅ **Instant expertise** - Claude starts with complete product knowledge
✅ **No context switching** - You don't have to copy-paste docs
✅ **Accurate answers** - Based on latest official documentation
✅ **Version awareness** - Knows deprecations and breaking changes
✅ **Best practices** - Understands recommended patterns from official sources
✅ **Saves time** - No "Let me search the docs" delays

## Example Workflows

### Workflow 1: New Project Start
```
You: "I'm starting a new Next.js project"
↓
Skill: Auto-fetches Next.js documentation
↓
Claude: Provides setup advice based on latest Next.js docs, understands App Router vs Pages Router, etc.
```

### Workflow 2: Code Upload
```
You: [Upload Django project files]
↓
Skill: Detects Django from requirements.txt
↓
Skill: Fetches Django documentation
↓
Claude: Reviews your code with Django best practices in mind
```

### Workflow 3: Troubleshooting
```
You: "Getting ModuleNotFoundError with my FastAPI project"
↓
Skill: Already has FastAPI docs loaded
↓
Claude: Suggests solutions based on FastAPI's module structure and installation
```

## Technical Notes for Implementation

The skill should:
1. Trigger automatically on conversation start when software is mentioned
2. Run in parallel with initial response (doesn't block conversation)
3. Cache documentation for the session (don't re-fetch)
4. Gracefully handle fetch failures (continue conversation anyway)
5. Include fetched URL in context (user can verify sources)
6. Format documentation in a way Claude can effectively use

## What This Enables

With this skill active:

- **More accurate code reviews** - Based on latest best practices
- **Better debugging** - Understands framework-specific error patterns
- **Fewer clarifying questions** - Claude already knows your tech stack
- **Smarter suggestions** - Recommendations match official patterns
- **Version-aware help** - Knows about deprecations and migrations
- **API expertise** - Understands correct syntax and parameters

---

## Future Enhancements

- Multi-language documentation support
- Documentation version selection (fetch specific version docs)
- Interactive documentation search within fetched docs
- Changelog scanning for recent breaking changes
- Community pattern recognition (Stack Overflow, GitHub issues)

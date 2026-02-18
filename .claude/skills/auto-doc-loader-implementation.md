# Auto Doc Loader - Implementation Guide

## Core Triggering Logic

### Phase 1: Detection
When Claude receives a user message, check for:

```
Software Detection Signals:
├── Explicit mention: "I'm working with X", "Using Y framework"
├── File detection: package.json → Node.js, requirements.txt → Python
├── Code imports: "import React from" → React
├── Problem context: "Flask app is crashing" → Flask
└── Project type: "Building a REST API with" → likely framework mention follows
```

### Phase 2: Documentation Lookup
Once software is identified, follow this priority chain:

```
if software in KNOWN_DOCS_MAP:
    fetch KNOWN_DOCS_MAP[software]["primary_url"]
else:
    search for "[software name] official documentation"
    identify official domain (ignore tutorials, medium blogs, stack overflow)
    fetch from official source
```

### Known Documentation URLs (Starter List)

**JavaScript/Frontend:**
- React: https://react.dev/
- Next.js: https://nextjs.org/docs
- Vue.js: https://vuejs.org/guide/
- Angular: https://angular.io/docs
- Express.js: https://expressjs.com/
- Svelte: https://svelte.dev/docs
- Remix: https://remix.run/docs

**Python:**
- Django: https://docs.djangoproject.com/
- FastAPI: https://fastapi.tiangolo.com/
- Flask: https://flask.palletsprojects.com/
- Pandas: https://pandas.pydata.org/docs/
- TensorFlow: https://www.tensorflow.org/api_docs
- PyTorch: https://pytorch.org/docs/stable/

**Databases:**
- PostgreSQL: https://www.postgresql.org/docs/
- MongoDB: https://docs.mongodb.com/
- Redis: https://redis.io/docs/

**DevOps/Cloud:**
- Docker: https://docs.docker.com/
- Kubernetes: https://kubernetes.io/docs/
- AWS: https://docs.aws.amazon.com/
- Terraform: https://www.terraform.io/docs

**Mobile:**
- Flutter: https://flutter.dev/docs
- React Native: https://reactnative.dev/docs/

## Fetching Strategy

### What to Fetch

For each identified software, create a fetch list:

```
FETCH_PRIORITY = [
    {
        name: "Getting Started",
        patterns: ["getting started", "quickstart", "quick start", "introduction"],
        critical: true
    },
    {
        name: "Installation",
        patterns: ["install", "setup", "get started"],
        critical: true
    },
    {
        name: "API Reference",
        patterns: ["api", "reference", "documentation"],
        critical: true
    },
    {
        name: "Best Practices",
        patterns: ["best practice", "pattern", "recommendation"],
        critical: false
    },
    {
        name: "Troubleshooting",
        patterns: ["troubleshoot", "error", "faq", "common issues"],
        critical: false
    }
]
```

### Fetch Implementation

```python
def fetch_software_documentation(software_name, primary_url):
    """
    Fetch official documentation for identified software
    """

    fetched_docs = {
        "software": software_name,
        "primary_url": primary_url,
        "fetched_at": datetime.now(),
        "sections": []
    }

    # Step 1: Fetch main documentation page
    main_page = web_fetch(primary_url)
    fetched_docs["sections"].append({
        "title": "Overview",
        "url": primary_url,
        "content": extract_key_content(main_page)
    })

    # Step 2: Find and fetch key documentation sections
    links = extract_documentation_links(main_page)

    for priority_item in FETCH_PRIORITY:
        matching_links = find_matching_links(links, priority_item["patterns"])

        for link in matching_links[:1]:  # Take first match per category
            try:
                page_content = web_fetch(link["href"])
                fetched_docs["sections"].append({
                    "title": priority_item["name"],
                    "url": link["href"],
                    "content": extract_key_content(page_content),
                    "importance": "critical" if priority_item["critical"] else "secondary"
                })
            except FetchError:
                pass  # Continue if fetch fails

    return fetched_docs
```

## Integration Points

### At Conversation Start
```
1. Parse initial user message
2. Detect if software is mentioned
3. If yes: trigger async documentation fetch
4. Continue conversation normally (don't wait for fetch)
5. Include documentation in context once available
```

### In Claude's Context
Once documentation is fetched, format it for Claude's use:

```markdown
# Documentation Context: [Software Name]

**Source**: [Official URL]
**Fetched**: [Timestamp]

## Overview
[Key concepts and what this software does]

## Key Features
[Main features from documentation]

## Installation/Setup
[How to get started]

## Core Concepts
[Architecture, main components, design patterns]

## API/Configuration Reference
[Key methods, configuration options, common parameters]

## Common Patterns
[Recommended ways to use this software]

## Troubleshooting
[Common issues and solutions]

---
*This documentation context is available for the duration of this conversation.*
*Refer to [Official URL] for the most current information.*
```

### Conditional Re-fetching
```
if new_software_mentioned_in_current_conversation:
    if software not in session_cache:
        fetch_documentation(software)
    else:
        use cached_documentation
```

## Example: React Project

**Detection:**
```
User: "I'm building a React component for user auth"
↓
Signal: "React" mentioned
```

**Fetch Sequence:**
```
1. Fetch https://react.dev/
2. Extract: Overview of React
3. Fetch Getting Started section
4. Fetch Hooks documentation (likely relevant for state management)
5. Fetch Common components patterns
6. Fetch error handling guide
```

**Context Added:**
```
Claude now knows:
- React 18+ features (hooks, concurrent features)
- Best practices for auth components
- Common patterns and anti-patterns
- Current React.dev documentation state

Result: Provides answers aligned with latest React practices
```

## Example: Django Project

**Detection:**
```
User: [Uploads files including manage.py and settings.py]
↓
Signal: Django detected from file structure
```

**Fetch Sequence:**
```
1. Fetch https://docs.djangoproject.com/
2. Extract: Django architecture overview
3. Fetch Models, Views, Templates guide
4. Fetch ORM documentation
5. Fetch Middleware and Security guide
6. Fetch Testing documentation
```

**Result:**
```
Claude now understands:
- Django's MTV architecture
- Latest ORM features
- Security best practices
- Version-specific features
```

## Error Handling

```python
def fetch_with_fallback(software_name):
    try:
        # Try known URL first
        if software_name in KNOWN_DOCS:
            return fetch(KNOWN_DOCS[software_name])

    except FetchError as e:
        # Fall back to search
        try:
            search_results = search(f"{software_name} official documentation")
            official_url = identify_official_source(search_results)
            return fetch(official_url)
        except Exception:
            # Continue without documentation
            return None

    # If all else fails, continue conversation anyway
    # (skill is enhancement, not blocker)
```

## Performance Considerations

### Async Execution
- Fetch happens in background, doesn't block conversation
- User starts getting help while docs are still loading

### Caching
- Cache documentation within session (don't re-fetch same software)
- Clear cache at session end

### Rate Limiting
- One fetch per software per session
- Batch up to 5 concurrent fetches (reasonable load)
- Respect robots.txt and rate limit headers

### Token Management
- Compress fetched documentation intelligently
- Keep only essential sections in context
- Summarize large API references

## User Control

Allow users to customize:

```
"Skip documentation for this session"
→ Disable auto-fetch, work from context knowledge

"Fetch specific version docs"
→ fetch(docs_url + "version/X.X/")

"Focus on API reference only"
→ Skip tutorials, get to reference quickly

"Use local documentation"
→ Use offline docs if available
```

## Monitoring & Improvements

Track:
- How often different software is detected
- Fetch success/failure rates
- User satisfaction with documentation accuracy
- Which documentation sections are most useful

Use this data to:
- Expand KNOWN_DOCS_MAP
- Improve detection patterns
- Better prioritize which sections to fetch

---

## Success Metrics

The skill succeeds when:
- ✅ Documentation is fetched within 2-3 seconds of conversation start
- ✅ Claude provides answers citing the documentation
- ✅ Users don't need to paste docs or ask "do you know about...?"
- ✅ Answers align with latest official best practices
- ✅ Version-specific guidance is accurate
- ✅ Reduces back-and-forth questions about "how does X work?"

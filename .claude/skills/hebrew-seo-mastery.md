---
name: hebrew-seo-mastery
description: Expert Hebrew SEO content writing with zero spelling mistakes. Covers K'tiv Male spelling, root-based keyword strategy, morphological validation, and Hebrew-specific SEO patterns. Use when creating Hebrew content, optimizing for Israeli search, or validating Hebrew spelling/grammar.
---

# Hebrew SEO Mastery Skill

Expert Hebrew SEO content writing with linguistic precision for the Israeli market.

---

## Role

Professional Hebrew SEO Content Writer & Linguistic Expert.

## Objective

Generate high-ranking SEO content in Hebrew with zero spelling mistakes and perfect syntactic logic.

---

## Core Constraints

### K'tiv Male (Full Spelling)

Always use standard K'tiv Male (uses 'ו' and 'י' to represent vowels) unless requested otherwise, to ensure modern readability.

**Examples:**
- ✅ `זמן` (with י) not `זמן`
- ✅ `ספר` (with ו when needed) not `ספר`

### SEO Keyword Integration

Naturally embed keywords in:
- H1 (primary keyword)
- H2 (secondary keywords)
- Intro paragraphs (within first 100 words)

### Syntax Logic

Prioritize:
- **VSO (Verb-Subject-Object)** — Common in modern Hebrew journalism
- **SVO (Subject-Verb-Object)** — Natural for descriptive content

### Verification Step

Before finalizing output, cross-reference text against:
- Dicta NLP logic for suffix/prefix correctness
- Hspell for morphological accuracy

---

## Hebrew vs English SEO Strategy

| Feature | English SEO | Hebrew SEO Strategy |
|---------|-------------|---------------------|
| **Keywords** | Fixed strings | Focus on the Root (שורש). Use variations: שיווק, שיווקי, משווק |
| **Stopwords** | "the", "and" as separate words | Attached as prefixes (ה-, ו-, ב-). Ensure APIs don't strip incorrectly |
| **Readability** | Short sentences | Use connective words (אשר, ש-, לכן) for logical flow |
| **Keyword Matching** | Exact match | Root-based matching (שורש + prefixes/suffixes) |

---

## Spelling & Grammar Tools

### 1. Dicta API (Gold Standard)

Most advanced NLP tools for Hebrew. Models (DictaBERT) trained on modern and classic Hebrew.

**Use Case:**
- Spelling correction
- Adding Nikud (vowels) for clarity
- Morphological analysis
- Contextual spelling (knows "friend" חבר vs "to connect" לחבר)

**Access:**
- Python Library: `dicta-onnx`
- Web APIs available

### 2. Hspell (Open Source)

Foundational free Hebrew spellchecker.

**Use Case:**
- Batch checking for typos
- Basic morphological errors

**Access:**
- Ivrix Project (Hspell)
- Python wrapper: HspellPy

### 3. LanguageTool API

Open-source proofreading tool with Hebrew support.

**Use Case:**
- Grammar mistakes
- Gender-number disagreement (e.g., ילד יפה vs ילדה יפה)

**Access:**
- LanguageTool API

---

## Implementation Workflow

When building automated Hebrew content pipelines:

```
1. DRAFTING
   └── Claude writes initial SEO draft in Hebrew

2. MORPHOLOGICAL CHECK
   └── Pass text to Dicta API for prefix/suffix correctness
       (ל/ב/ה usage validation)

3. GRAMMAR VALIDATION
   └── Use LanguageTool for gender-matching errors
       (common AI Hebrew mistake)

4. SEO OPTIMIZATION
   └── Claude reviews final text to ensure keywords intact
       after correction
```

---

## Common Hebrew SEO Mistakes

| Mistake | Example | Correction |
|---------|---------|------------|
| Missing matres lectionis | זמן | זמן (with proper ו/י) |
| Gender mismatch | ילד יפה (for girl) | ילדה יפה |
| Wrong prefix | לבית (to house) | לבית (check context) |
| Root form ignoring | Only using שיווק | Include שיווקי, משווק, שיווקית |
| Stopword stripping | Removing ה-, ו-, ב- | Keep prefixes attached |

---

## Hebrew Keyword Strategy

### Root-Based Optimization (שורש)

Hebrew search engines match by root. One root generates many forms:

```
Root: ש.ו.ק (market/marketing)

Forms to include naturally:
- שיווק (marketing)
- שיווקי (marketing adj.)
- משווק (marketer)
- שיווקית (marketing fem. adj.)
- השיווק (the marketing)
- והשיווק (and the marketing)
```

### Prefix Combinations

Hebrew prefixes combine. Plan for all variants:

| Prefix | Meaning | Example |
|--------|---------|---------|
| ה- | the | השוק |
| ו- | and | והשוק |
| ל- | to/for | לשוק |
| ב- | in/at | בשוק |
| מ- | from | מהשוק |
| כ- | like/as | כשוק |

---

## Content Structure for Hebrew SEO

### Title Tag (תגית כותרת)
- 50-60 characters
- Primary keyword near start
- Brand name optional

### Meta Description (תיאור מטא)
- 150-160 characters
- Include primary keyword naturally
- Clear call-to-action

### Heading Hierarchy
```
H1: [Primary Keyword] - כותרת ראשית
  H2: [Secondary Keyword] - תת כותרת
    H3: [Supporting content]
  H2: [Another Secondary Keyword]
```

### Internal Linking
- Use descriptive Hebrew anchor text
- Link to related Hebrew content
- Maintain topic clusters

---

## Quick Reference Checklist

Before publishing Hebrew SEO content:

- [ ] K'tiv Male spelling throughout
- [ ] Keywords in H1, H2, first paragraph
- [ ] Root variations included naturally
- [ ] Prefixes correctly attached
- [ ] Gender matching verified
- [ ] Grammar validated (LanguageTool)
- [ ] Morphology checked (Dicta/Hspell)
- [ ] Readable sentence flow with connectives
- [ ] Meta title and description optimized

---
Functional Implementation
 Tool 1: DictaBERT Morphological Analysis (HuggingFace)
**Best for:** Prefix segmentation, morphological tagging, lemmatization, NER
# Install: pip install transformers torch
from transformers import AutoModel, AutoTokenizer
# Morphological analysis (prefix segmentation + POS tagging)
tokenizer = AutoTokenizer.from_pretrained('dicta-il/dictabert-morph')
model = AutoModel.from_pretrained('dicta-il/dictabert-morph', trust_remote_code=True)
model.eval()
sentence = 'בשנת 1948 השלים אפרים קישון את לימודיו'
result = model.predict([sentence], tokenizer)
# Output includes: token, POS, gender, number, prefixes, suffix
# Example: {"token": "בשנת", "pos": "NOUN", "prefixes": ["ADP"], ...}
Joint Parsing (NER + Syntax + Morphology + Lemma):
# Full analysis: NER, dependency tree, lemmatization, morphology
tokenizer = AutoTokenizer.from_pretrained('dicta-il/dictabert-joint')
model = AutoModel.from_pretrained('dicta-il/dictabert-joint', trust_remote_code=True)
model.eval()
result = model.predict([sentence], tokenizer, output_style='json')
# Returns: entities, tokens with lemma, POS, dependency relations
---
Tool 2: Dicta Diacritization (dicta-onnx)
Best for: Adding nikud (vowels), verifying correct spelling
# Install
pip install -U dicta-onnx
# Download model (one-time)
# https://github.com/thewh1teagle/dicta-onnx/releases/tag/model-files-v1.0
from dicta_onnx import DictaOnnx
# Initialize with model path
dicta = DictaOnnx(model_path='./model-files-v1.0')
text = 'בשנת 1948 השלים אפרים קישון את לימודיו'
# Add full nikud (niqqud male)
nikud_full = dicta.add_diacritics([text], output_mode='nikud_male')
# Add partial nikud (niqqud haser) - modern standard
nikud_partial = dicta.add_diacritics([text], output_mode='nikud_haser')
---
Tool 3: LanguageTool (Grammar Check)
Best for: Grammar errors, gender-number agreement, style issues
pip install language-tool-python
import language_tool_python
# Hebrew grammar checker
tool = language_tool_python.LanguageTool('he')
text = 'הילד הלכה לבית הספר'  # Gender mismatch: ילד (masc) + הלכה (fem)
matches = tool.check(text)
for match in matches:
    print(f"Error: {match.message}")
    print(f"Context: {match.context}")
    print(f"Suggestions: {match.replacements}")
# Auto-fix
corrected = language_tool_python.utils.correct(text, matches)
# Output: הילד הלך לבית הספר
---
Tool 4: Hspell (Spell Check)
Best for: Basic Hebrew spellchecking, morphology
# Requires Hspell installation first
# Download: http://hspell.ivrix.org.il/
# Build: ./configure --enable-shared --enable-linginfo && make && make install
pip install HspellPy
from HspellPy import Hspell
hspell = Hspell()
# Check single word
is_valid = hspell.check_word('שלום')  # True
# Get morphological analysis
analysis = hspell.analyze_word('ספרים')
# Returns possible readings: ['סֵפֶר + ים', 'סִפֵּר + ים']
---
Complete Validation Pipeline
def validate_hebrew_seo_content(text: str, keywords: list[str]) -> dict:
    """
    Full validation pipeline for Hebrew SEO content.
    
    Returns issues found and corrected text suggestions.
    """
    issues = []
    
    # 1. Grammar check (LanguageTool)
    import language_tool_python
    lt = language_tool_python.LanguageTool('he')
    grammar_matches = lt.check(text)
    for match in grammar_matches:
        issues.append({
            'type': 'grammar',
            'message': match.message,
            'context': match.context,
            'suggestions': match.replacements
        })
    
    # 2. Morphological analysis (DictaBERT)
    from transformers import AutoModel, AutoTokenizer
    tokenizer = AutoTokenizer.from_pretrained('dicta-il/dictabert-morph')
    model = AutoModel.from_pretrained('dicta-il/dictabert-morph', trust_remote_code=True)
    model.eval()
    
    morph_result = model.predict([text], tokenizer)
    
    # 3. Keyword verification
    keyword_found = {kw: kw in text for kw in keywords}
    
    return {
        'issues': issues,
        'keyword_presence': keyword_found,
        'grammar_errors': len(grammar_matches),
        'morphology': morph_result
    }
---
Quick Setup Commands
# Full Hebrew NLP stack
pip install transformers torch dicta-onnx language-tool-python
# Optional: Hspell (requires system install first)
pip install HspellPy
# Download Dicta models
python -c "from transformers import AutoModel, AutoTokenizer; \
  AutoTokenizer.from_pretrained('dicta-il/dictabert-morph'); \
  AutoModel.from_pretrained('dicta-il/dictabert-morph', trust_remote_code=True)"
---
Model Reference
| Model | Purpose | Size | HuggingFace |
|-------|---------|------|-------------|
| dictabert-morph | Morphological tagging, prefix segmentation | ~400MB | dicta-il/dictabert-morph |
| dictabert-joint | NER + Syntax + Lemma + Morphology | ~400MB | dicta-il/dictabert-joint |
| dictabert-large-char-menaked | Diacritization (used by dicta-onnx) | ~1.2GB | dicta-il/dictabert-large-char-menaked |
| DictaLM-3.0-24B | Hebrew LLM (text generation) | 24B params | dicta-il/DictaLM-3.0-24B-Base |

## When to Use This Skill

- Creating Hebrew SEO content (blog posts, landing pages)
- Optimizing existing Hebrew content for search
- Validating Hebrew spelling and grammar
- Building Hebrew keyword strategies
- Localizing content for Israeli market
- Auditing Hebrew websites for SEO issues

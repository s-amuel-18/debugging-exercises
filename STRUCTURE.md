# Project Structure Documentation

This document provides detailed information about how the JavaScript Debugging Exercises project is organized, including naming conventions, folder hierarchies, and file purposes.

## Directory Tree

```
debugging-exercises/
│
├── exercises/                          # All debugging exercises
│   │
│   ├── 01-calculator-error/            # Individual exercise
│   │   ├── README.md                   # Exercise description
│   │   ├── buggy-code.js               # Broken code
│   │   ├── solution.js                 # Fixed code
│   │   └── test.js                     # Test cases
│   │
│   ├── 02-next-exercise/               # Additional exercise
│   │   ├── README.md
│   │   ├── buggy-code.js
│   │   ├── solution.js
│   │   └── test.js
│   │
│   └── ...                             # More exercises
│
├── base-prompt.md                      # Complete project context
├── README.md                           # Main project documentation
├── STRUCTURE.md                        # This file
├── LLM_GUIDE.md                        # Guide for LLMs
├── EXERCISE_TEMPLATE.md                # Template for new exercises
├── TESTING.md                          # Jest testing guide
├── package.json                        # Node.js project configuration
└── .gitignore                          # Git ignore rules
```

## Naming Conventions

### Exercise Folders

Format: `##-exercise-name/`

- Start with a two-digit number for ordering: `01-`, `02-`, etc.
- Use lowercase letters
- Separate words with hyphens
- Use descriptive, memorable names (2-4 words ideal)
- Examples: `01-calculator-error/`, `02-array-filter-bug/`, `03-promise-chain-issue/`

**Why this format?**

- Numbers ensure consistent ordering across systems
- Sequential numbering allows for progressive difficulty
- Lowercase prevents case-sensitivity issues
- Hyphens improve readability while being filesystem-safe

### File Naming

| File Type     | Naming Convention | Example          |
| ------------- | ----------------- | ---------------- |
| Exercise Code | `buggy-code.js`   | Always the same  |
| Solution Code | `solution.js`     | Always the same  |
| Tests         | `test.js`         | Always the same  |
| Documentation | `README.md`       | Always uppercase |

**Why standardized names?**

- Predictable structure makes navigation easy
- Scripts can programmatically work with exercises
- Students always know where to find specific files

## Folder Purposes

### Root Level

#### `exercises/`

The main container for all debugging exercises. Each exercise is numbered sequentially and contains all necessary files for that specific debugging challenge.

#### Documentation Files

- **base-prompt.md**: Comprehensive project context for LLMs and developers
- **README.md**: User-facing project overview and getting started guide
- **STRUCTURE.md**: This file - explains organization
- **LLM_GUIDE.md**: Instructions for LLMs to generate new exercises
- **EXERCISE_TEMPLATE.md**: Reusable template for creating exercises
- **TESTING.md**: Jest testing guide for developers

#### Configuration Files

- **package.json**: Node.js project metadata and scripts (includes Jest configuration)
- **.gitignore**: Files/folders to exclude from version control

### Exercise Level

Each exercise folder (e.g., `01-calculator-error/`) contains exactly these **4 files**:

#### `README.md`

**Purpose**: Complete exercise documentation

**Format**: Scrum-style with NO hints section

**Contains**:

- **Bug type tag**: Logical Error, Syntax Error, Runtime Error, or Async Error
- **Historia de Usuario**: User story describing needed functionality
- **Criterios de Aceptación**: Acceptance criteria
- **Problema Reportado**: Clear problem description with examples (NO solution hints)
- **Archivos**: List of files
- **Verificación**: How to run tests
- **Dificultad**: Difficulty level and estimated time

**Language**: Spanish (all documentation)

#### `buggy-code.js`

**Purpose**: The intentionally broken code students must debug

**Characteristics**:

- Contains realistic, educational bugs
- Should look like code someone might actually write
- Includes comments for context (in Spanish, explaining intent NOT pointing to bug)
- Self-contained (doesn't require external files)
- Can be run with Node.js

**Language**: Code in English, comments in Spanish

#### `solution.js`

**Purpose**: The corrected version of the code

**Characteristics**:

- Fixes all bugs
- Includes inline comments explaining changes (CORREGIDO: ...)
- Demonstrates best practices
- Same structure as buggy-code for easy comparison

**Comment format**:

```javascript
// CORREGIDO: [explicación de qué estaba mal y cómo se corrigió]
const result = correctCode();
```

**Language**: Code in English, comments in Spanish

#### `test.js`

**Purpose**: Automated validation using Jest

**Characteristics**:

- Uses Jest framework (`describe`, `test`, `expect`)
- Well-organized with descriptive test names (in Spanish)
- Configured to test `buggy-code.js` by default
- Covers normal cases, edge cases, and error conditions
- Clear expectations using appropriate matchers

**Language**: Code in English, descriptions in Spanish

**Run with**: `npm test exercises/##-exercise-name`

## Exercise Organization by Type

While exercises are numbered sequentially, each exercise is tagged by bug type in its README:

### Bug Types

#### Logical Errors

**Focus**: Bugs where code runs but produces wrong results

**Examples**:

- Off-by-one errors in loops
- Incorrect operators (`=` vs `==` vs `===`)
- Wrong conditional logic
- Mathematical calculation errors
- Order of operations mistakes

**Current exercises**: `01-calculator-error`

#### Syntax Errors

**Focus**: Code that won't parse or run

**Examples**:

- Missing/extra brackets, parentheses, braces
- Incorrect function/variable declarations
- Misplaced semicolons
- Invalid use of keywords

**Current exercises**: None yet

#### Runtime Errors

**Focus**: Code that crashes during execution

**Examples**:

- Null/undefined reference errors
- Type errors
- Range errors
- Reference errors

**Current exercises**: None yet

#### Async Errors

**Focus**: Issues with asynchronous code

**Examples**:

- Unhandled promise rejections
- Callback hell problems
- Race conditions
- Incorrect async/await usage

**Current exercises**: None yet

## Scalability

### Adding New Exercises

To add a new exercise:

1. Determine the next number: Look at existing exercises, use next sequential number
2. Create folder: `exercises/##-exercise-name/`
3. Use EXERCISE_TEMPLATE.md as a guide
4. Create all required files (README, buggy-code, solution, test)
5. Tag the exercise type in the README
6. Test thoroughly with Jest
7. Update main README.md to list the new exercise

### Numbering System

- **01-09**: Beginner exercises (start here)
- **10-19**: Intermediate exercises
- **20-29**: Advanced exercises
- **30+**: Expert/special exercises

This allows for flexible ordering while maintaining difficulty progression.

## File Size Guidelines

To keep exercises focused and manageable:

- **buggy-code.js**: 20-100 lines ideal
- **solution.js**: Similar to buggy-code.js
- **README.md**: 50-150 lines (includes problem description and solution approach)
- **test.js**: 30-100 lines (Jest tests are more descriptive)

These are guidelines, not strict rules. Complexity of the bug should drive file size.

## Consistency Checklist

When creating a new exercise, ensure:

- [ ] Folder name follows convention (##-lowercase-with-hyphens)
- [ ] All 4 required files are present
- [ ] File names are exactly as specified
- [ ] README.md in Spanish with Scrum-style format (NO hints)
- [ ] README.md includes bug type tag
- [ ] Comments in Spanish, code in English
- [ ] solution.js includes CORREGIDO comments
- [ ] test.js uses Jest framework
- [ ] test.js imports buggy-code.js by default
- [ ] Bug is realistic and educational
- [ ] Documentation is clear and thorough
- [ ] Main README.md is updated with new exercise

## Version Control Organization

### .gitignore Considerations

Excluded from version control:

- `node_modules/` (Jest and dependencies)
- OS-specific files (.DS_Store, Thumbs.db)
- IDE files (.vscode/, .idea/)
- Temporary test files users might create

Included in version control:

- All exercise files
- All documentation
- package.json and package-lock.json
- Configuration files

## Summary

This structure prioritizes:

- **Simplicity**: Flat structure, 4 files per exercise, easy to navigate
- **Sequential Learning**: Numbered exercises for progression
- **Consistency**: Every exercise follows the same pattern
- **Flexibility**: Easy to add exercises in any order
- **Clarity**: README contains all documentation needed
- **Scalability**: Can grow to hundreds of exercises
- **Automation**: LLMs and scripts can work with the structure
- **Professional Testing**: Jest framework for robust validation

By maintaining this structure, the project remains organized, professional, and easy to extend.

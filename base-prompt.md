# JavaScript Debugging Exercises - Project Context

## Project Overview

This is an educational project designed to teach JavaScript debugging skills through practical, hands-on exercises. Each exercise contains intentional bugs that students must identify, understand, and fix, developing critical debugging skills essential for professional software development.

## Project Purpose

### Primary Goals

1. **Teach Debugging Skills**: Provide structured exercises that progressively develop debugging capabilities
2. **Build Problem-Solving Mindset**: Train developers to think critically about code behavior
3. **Practice Real-World Scenarios**: Simulate common bugs encountered in production environments
4. **Develop Best Practices**: Instill habits that prevent bugs before they occur

### Target Audience

- JavaScript beginners learning to debug code
- Intermediate developers wanting to sharpen debugging skills
- Educators teaching JavaScript programming
- LLMs generating educational coding exercises

## **CRITICAL PROJECT STANDARDS**

### Language Requirements

1. **ALL documentation in Spanish**: README, EXPLANATION, comments, test descriptions
2. **ALL code in English**: variable names, function names, code syntax
3. **NO language mixing**: Keep documentation purely Spanish, code purely English

### README Format Requirements

1. **Scrum-style**: User story + acceptance criteria + reported problem
2. **NO hints section**: Debugging is 100% the student's responsibility
3. **Show the problem**: Describe expected behavior vs. actual behavior with examples
4. **No solution clues**: Do NOT give hints about how to fix the bug

## Project Scope

### What This Project Includes

- **Categorized Exercises**: Organized by bug type (logical errors, syntax errors, runtime errors, async errors)
- **Progressive Difficulty**: Exercises range from beginner to advanced
- **Complete Solutions**: Each exercise includes detailed explanations and fixed code
- **Test Validation**: Automated tests to verify solutions
- **Comprehensive Documentation**: Clear instructions for students and exercise creators

### Bug Categories

#### 1. Logical Errors (01-logical-errors)

Bugs where code runs without errors but produces incorrect results due to flawed logic.

- Off-by-one errors
- Incorrect operator usage
- Wrong conditional logic
- Mathematical calculation errors
- Loop logic mistakes

#### 2. Syntax Errors (02-syntax-errors)

Code that fails to parse due to incorrect JavaScript syntax.

- Missing brackets, parentheses, or braces
- Incorrect use of keywords
- Invalid function declarations
- Misplaced semicolons

#### 3. Runtime Errors (03-runtime-errors)

Errors that occur during code execution.

- Null/undefined reference errors
- Type errors
- Range errors
- Reference errors (undefined variables)

#### 4. Async Errors (04-async-errors)

Errors specific to asynchronous JavaScript code.

- Promise handling issues
- Callback problems
- Async/await mistakes
- Race conditions
- Timing issues

## Exercise Structure

Each exercise follows a standardized structure:

```
exercises/
├── 01-exercise-name/
│   ├── README.md           # Exercise description and instructions
│   ├── buggy-code.js       # Code with intentional bug(s)
│   ├── solution.js         # Corrected code
│   └── test.js             # Test cases for validation
├── 02-another-exercise/
│   ├── README.md
│   ├── buggy-code.js
│   ├── solution.js
│   └── test.js
└── ...
```

### File Purposes

- **README.md**: Provides context, learning objectives, and hints for students
- **buggy-code.js**: Contains the intentionally broken code for students to debug
- **solution.js**: Shows the corrected version with inline comments explaining changes
- **EXPLANATION.md**: Deep dive into the bug, why it occurs, how to identify it, and prevention strategies
- **test.js**: Automated tests that fail with buggy code and pass with the solution

## Key Principles

### 1. Realistic Bugs

All bugs should be:

- Representative of real-world mistakes
- Something a developer might actually write
- Not artificially convoluted or overly obvious
- Teaching a valuable lesson

### 2. Clear Learning Objectives

Each exercise must:

- Have specific, measurable learning outcomes
- Focus on one primary concept (though may involve multiple skills)
- Build upon previous exercises when part of a sequence
- Include hints that guide without giving away the answer

### 3. Comprehensive Documentation

Documentation should:

- Be clear and accessible to beginners
- Include examples and analogies where helpful
- Explain both the "what" and the "why"
- Provide best practices and prevention strategies

### 4. Testable Solutions

All exercises must:

- Include automated tests that validate correctness
- Cover edge cases and common scenarios
- Provide clear feedback when tests fail
- Be runnable with simple Node.js commands

## LLM Integration

This project is designed to be LLM-friendly, enabling AI assistants to:

- Generate new exercises following established patterns
- Maintain consistency across the project
- Create appropriate difficulty progressions
- Document exercises thoroughly
- Ensure quality and educational value

The `LLM_GUIDE.md` provides specific instructions for LLMs to autonomously create new exercises that align with project standards.

## Educational Philosophy

### Discovery Learning

Exercises encourage students to:

- Experiment with the code
- Form hypotheses about the bug
- Test their theories
- Learn through trial and error

### Scaffolded Support

Each exercise provides:

- **Context**: Real-world scenario for the code
- **Hints**: Progressive clues without spoiling the solution
- **Tests**: Immediate feedback on attempts
- **Explanations**: Deep understanding after solving

### Growth Mindset

The project emphasizes:

- Bugs are learning opportunities, not failures
- Debugging is a skill that improves with practice
- Understanding the "why" is more important than just fixing the code
- Best practices emerge from understanding common pitfalls

## Technical Requirements

### Runtime Environment

- **Node.js**: Version 14.x or higher
- **No external dependencies**: Exercises use vanilla JavaScript
- **Simple execution**: All exercises run with `node` command

### Code Standards

- **ES6+ Syntax**: Modern JavaScript practices
- **Clear naming**: Self-documenting variable and function names
- **Comments**: Explain intent, not obvious code
- **Consistent style**: Follow standard JavaScript conventions

## Project Evolution

### Current State

- Foundation and structure established
- Documentation framework complete
- First example exercise (logical error in calculator)
- Template for creating new exercises

### Future Expansion

- Add more exercises to each category
- Create difficulty levels (beginner, intermediate, advanced)
- Add visual debugging exercises (DOM manipulation bugs)
- Include debugging tool tutorials (console, debugger, browser DevTools)
- Create video walkthroughs for complex exercises

## Usage Scenarios

### For Students

1. Read the exercise README
2. Examine the buggy code
3. Run tests to see failures
4. Debug and fix the code
5. Run tests to verify solution
6. Read explanation to deepen understanding

### For Educators

1. Use exercises in curriculum
2. Assign as homework or lab work
3. Create new exercises using the template
4. Customize difficulty for student level
5. Track progress through test results

### For LLMs

1. Read LLM_GUIDE.md for instructions
2. Follow EXERCISE_TEMPLATE.md structure
3. Generate new exercises in appropriate categories
4. Ensure tests validate the exercise
5. Document thoroughly for student learning

## Success Criteria

An exercise is successful when:

- Students can identify the bug through debugging
- The bug teaches a valuable, transferable lesson
- Tests accurately validate the solution
- Documentation enables independent learning
- The exercise feels realistic and practical

## Contribution Guidelines

When adding new exercises:

1. Follow the EXERCISE_TEMPLATE.md structure
2. Ensure bug is realistic and educational
3. Write comprehensive tests
4. Document thoroughly
5. Place in appropriate category
6. Maintain consistent difficulty progression
7. Review against existing exercises for quality

## Conclusion

This project serves as a comprehensive resource for learning JavaScript debugging through practical experience. By combining realistic bugs, clear documentation, automated testing, and LLM-friendly structure, it creates an effective learning environment that scales from individual study to classroom instruction.

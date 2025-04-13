# Introduction

Welcome to the Firebase Rules Learning Assistant! This guide will help you understand and master Firebase Rules for **Cloud Firestore**.

:::tip
We will include `storage` rules soon ⚒️
:::

## What are Firebase Rules?

Firebase Rules are the primary way to secure your **Cloud Firestore** data. They allow you to control:

- **Who** can read data
- **Who** can write data
- **What** kind of data can be written
- **When** data can be accessed

## Why is this tool useful?

Firebase documentation is generally hard to navigate, even for experienced users (I’ve been using Firebase for about 4 years). I can’t imagine how challenging the process must be for non-coders.

I’ve confirmed this need through discussions with multiple non-coder users who often get stuck when Bolt generates complex rules for them to copy and paste—without understanding what those rules are supposed to do. In 95% of cases, these rules end up blocking the entire app.

I find Firebase incredibly easy to set up and powerful to use, so I believe anyone should be able to understand, write, and test their own rules.

This tool provides:

1. Interactive examples
2. Real-time explanations
3. Live testing capabilities
4. Best practices guidance

## Core Concepts

Before diving in, familiarize yourself with these key concepts:  

- **Authentication** – Verifying user identity.  
- **Authorization** – Controlling access rights.  
- **Validation** – Ensuring data integrity.  
- **Path Matching** – Targeting specific documents.  

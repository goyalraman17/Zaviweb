'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  staggerContainerSlow,
  fadeUp,
  fadeUpLarge,
} from '@/lib/animations';

type CohortType = 'developers' | 'teams' | 'students' | 'creators' | 'sales' | 'support' | 'lawyers' | 'leaders' | 'accessibility' | 'better';

interface CohortContent {
  title: string;
  rawInput: string;
  polishedOutput: {
    title?: string;
    summary?: string;
    description?: string;
    assignee?: string;
    priority?: string;
    body?: string;
  };
  icons: JSX.Element[];
}

const cohortData: Record<CohortType, CohortContent> = {
  developers: {
    title: 'Capture complex technical context without breaking flow.',
    rawInput: 'Bug in auth service. The JWT isn\'t refreshing properly on mobile endpoints. Check Redis cache implementation. Assign to Sarah.',
    polishedOutput: {
      title: '[Jira Ticket-852]',
      summary: 'Summary: Fix JWT Refresh Issue on Mobile Auth',
      description: 'Description: Investigate Redis cache layer integration preventing token refresh.',
      assignee: 'Assignee: @Sarah',
      priority: 'Priority: High',
    },
    icons: [
      <svg key="github" className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor" aria-label="GitHub">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>,
      <svg key="jira" className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor" aria-label="Jira">
        <path d="M11.571 11.513H0a5.218 5.218 0 0 0 5.232 5.215h2.13v2.057A5.215 5.215 0 0 0 12.575 24V12.518a1.005 1.005 0 0 0-1.005-1.005zm5.723-5.756H5.736a5.215 5.215 0 0 0 5.215 5.214h2.129v2.058a5.218 5.218 0 0 0 5.215 5.214V6.758a1.001 1.001 0 0 0-1.001-1.001zM23.013 0H11.455a5.215 5.215 0 0 0 5.215 5.215h2.129v2.057A5.215 5.215 0 0 0 24 12.483V1.005A1.001 1.001 0 0 0 23.013 0Z" fill="#2684FF"/>
      </svg>,
      <svg key="vscode" className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor" aria-label="Visual Studio Code">
        <path d="M23.15 2.587L18.21.21a1.494 1.494 0 0 0-1.705.29l-9.46 8.63-4.12-3.128a.999.999 0 0 0-1.276.057L.327 7.261A1 1 0 0 0 .326 8.74L3.899 12 .326 15.26a1 1 0 0 0 .001 1.479L1.65 17.94a.999.999 0 0 0 1.276.057l4.12-3.128 9.46 8.63a1.492 1.492 0 0 0 1.704.29l4.942-2.377A1.5 1.5 0 0 0 24 20.06V3.939a1.5 1.5 0 0 0-.85-1.352zm-5.146 14.861L10.826 12l7.178-5.448v10.896z" fill="#007ACC"/>
      </svg>,
    ],
  },
  teams: {
    title: 'Keep everyone aligned without endless meetings.',
    rawInput: 'So we need to push the Q2 roadmap review to next week because marketing needs more time with the messaging and uh we should probably loop in sales too.',
    polishedOutput: {
      body: 'Team Update: Q2 roadmap review rescheduled to next week to allow marketing additional time for messaging refinement. Sales team will be included in the discussion.',
    },
    icons: [
      <svg key="slack" className="w-8 h-8" viewBox="0 0 24 24" fill="none" aria-label="Slack">
        <path d="M6 15a2 2 0 01-2 2 2 2 0 01-2-2 2 2 0 012-2h2v2zm1 0a2 2 0 012-2 2 2 0 012 2v5a2 2 0 01-2 2 2 2 0 01-2-2v-5z" fill="#E01E5A"/>
        <path d="M9 6a2 2 0 01-2-2 2 2 0 012-2 2 2 0 012 2v2H9zm0 1a2 2 0 012 2 2 2 0 01-2 2H4a2 2 0 01-2-2 2 2 0 012-2h5z" fill="#36C5F0"/>
        <path d="M18 9a2 2 0 012-2 2 2 0 012 2 2 2 0 01-2 2h-2V9zm-1 0a2 2 0 01-2 2 2 2 0 01-2-2V4a2 2 0 012-2 2 2 0 012 2v5z" fill="#2EB67D"/>
        <path d="M15 18a2 2 0 012 2 2 2 0 01-2 2 2 2 0 01-2-2v-2h2zm0-1a2 2 0 01-2-2 2 2 0 012-2h5a2 2 0 012 2 2 2 0 01-2 2h-5z" fill="#ECB22E"/>
      </svg>,
      <svg key="teams" className="w-8 h-8" viewBox="0 0 24 24" fill="none" aria-label="Microsoft Teams">
        <rect x="4" y="4" width="7" height="7" rx="1" fill="#5B5FC7"/>
        <rect x="13" y="4" width="7" height="7" rx="1" fill="#5B5FC7"/>
        <rect x="4" y="13" width="7" height="7" rx="1" fill="#5B5FC7"/>
        <circle cx="16.5" cy="16.5" r="3.5" fill="#7B83EB"/>
        <path d="M16.5 15v3M15 16.5h3" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>,
      <svg key="notion" className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor" aria-label="Notion">
        <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.981-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.887l-15.177.887c-.56.047-.747.327-.747.933zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952L12.21 19s0 .84-1.168.84l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.139c-.093-.514.28-.887.747-.933zM1.936 1.035l13.31-.98c1.634-.14 2.055-.047 3.082.7l4.249 2.986c.7.513.934.653.934 1.213v16.378c0 1.026-.373 1.634-1.68 1.726l-15.458.934c-.98.047-1.448-.093-1.962-.747l-3.129-4.06c-.56-.747-.793-1.306-.793-1.96V2.667c0-.839.374-1.54 1.447-1.632z" fill="#000"/>
      </svg>,
    ],
  },
  students: {
    title: 'Turn lecture notes into study guides instantly.',
    rawInput: 'Professor talked about photosynthesis today um the light dependent reactions happen in the thylakoid and then the Calvin cycle is in the stroma I think.',
    polishedOutput: {
      body: 'Lecture Notes - Photosynthesis:\n\nLight-dependent reactions occur in the thylakoid membrane, while the Calvin cycle takes place in the stroma. The light-dependent reactions capture energy from sunlight, producing ATP and NADPH, which are then used in the Calvin cycle to synthesize glucose.',
    },
    icons: [
      <svg key="notion" className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor" aria-label="Notion">
        <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.981-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.887l-15.177.887c-.56.047-.747.327-.747.933zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952L12.21 19s0 .84-1.168.84l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.139c-.093-.514.28-.887.747-.933zM1.936 1.035l13.31-.98c1.634-.14 2.055-.047 3.082.7l4.249 2.986c.7.513.934.653.934 1.213v16.378c0 1.026-.373 1.634-1.68 1.726l-15.458.934c-.98.047-1.448-.093-1.962-.747l-3.129-4.06c-.56-.747-.793-1.306-.793-1.96V2.667c0-.839.374-1.54 1.447-1.632z" fill="#000"/>
      </svg>,
      <svg key="docs" className="w-8 h-8" viewBox="0 0 24 24" fill="none">
        <path d="M14.5 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V7.5L14.5 2z" fill="#4285F4"/>
        <path d="M14 2v6h6" fill="#fff" fillOpacity="0.5"/>
      </svg>,
      <svg key="evernote" className="w-8 h-8" viewBox="0 0 24 24" fill="#00A82D">
        <path d="M18.5 2h-13C4.119 2 3 3.119 3 4.5v15C3 20.881 4.119 22 5.5 22h13c1.381 0 2.5-1.119 2.5-2.5v-15C21 3.119 19.881 2 18.5 2zm-1 16h-11v-1h11v1zm0-3h-11v-1h11v1zm0-3h-11V8h11v4z"/>
      </svg>,
    ],
  },
  creators: {
    title: 'Create content faster without sacrificing quality.',
    rawInput: 'Hey everyone so today I wanna talk about like the best tips for growing on social media and um basically you need to be consistent and engage with your audience you know.',
    polishedOutput: {
      body: 'Today\'s Video: Essential Social Media Growth Strategies\n\nKey points to cover:\n• Maintain consistent posting schedule\n• Actively engage with your audience\n• Respond to comments and messages\n• Create valuable, authentic content\n• Analyze performance metrics',
    },
    icons: [
      <svg key="youtube" className="w-8 h-8" viewBox="0 0 24 24" fill="#FF0000">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>,
      <svg key="tiktok" className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
      </svg>,
      <svg key="instagram" className="w-8 h-8" viewBox="0 0 24 24" fill="url(#instagram-gradient)">
        <defs>
          <linearGradient id="instagram-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FD5949"/>
            <stop offset="50%" stopColor="#D6249F"/>
            <stop offset="100%" stopColor="#285AEB"/>
          </linearGradient>
        </defs>
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>,
    ],
  },
  sales: {
    title: 'Close deals faster with perfect follow-ups.',
    rawInput: 'Need to follow up with the client about the proposal we sent last week and see if they have any questions about pricing or implementation timeline.',
    polishedOutput: {
      body: 'Hi [Client Name],\n\nI wanted to follow up on the proposal we shared last week. Do you have any questions about our pricing structure or implementation timeline?\n\nI\'m happy to schedule a call to discuss any details.\n\nBest regards,\n[Your Name]',
    },
    icons: [
      <svg key="salesforce" className="w-8 h-8" viewBox="0 0 24 24" fill="#00A1E0">
        <path d="M10.006 5.412a4.275 4.275 0 0 1 6.47-1.218 5.918 5.918 0 0 1 7.684 5.317 4.224 4.224 0 0 1 .618 8.09 4.277 4.277 0 0 1-6.47 1.217 5.918 5.918 0 0 1-7.684-5.317 4.224 4.224 0 0 1-.618-8.09z"/>
      </svg>,
      <svg key="hubspot" className="w-8 h-8" viewBox="0 0 24 24" fill="#FF7A59">
        <path d="M18.164 7.93V5.084a2.198 2.198 0 1 0-2.868-2.083L12.922 5.12a4.986 4.986 0 1 0 .998 7.097l2.374 2.123a2.199 2.199 0 1 0 1.868-1.058V7.93z"/>
      </svg>,
      <svg key="gmail" className="w-8 h-8" viewBox="0 0 24 24" fill="none">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" fill="#EA4335"/>
        <path d="M22 6l-10 7L2 6" stroke="white" strokeWidth="2" fill="none"/>
      </svg>,
    ],
  },
  support: {
    title: 'Turn customer issues into clear tickets instantly.',
    rawInput: 'Customer is having trouble logging in says the password reset email isn\'t coming through checked their spam folder already might be an issue with our email service provider.',
    polishedOutput: {
      body: 'Support Ticket #3847\n\nIssue: Customer unable to receive password reset email\n\nSteps taken:\n• Verified spam folder checked\n• Potential email delivery issue\n\nNext action: Investigate email service provider delivery status',
    },
    icons: [
      <svg key="zendesk" className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
        <path d="M10.536 0L0 19.651h10.536V0zm2.928 0v19.651H24L13.464 0zM0 21.511V24h10.536v-2.489H0zm13.464 0V24H24v-2.489H13.464z"/>
      </svg>,
      <svg key="intercom" className="w-8 h-8" viewBox="0 0 24 24" fill="#1F8DED">
        <path d="M18.64 23.072L13.2 19.656v-8.928L18.64 7.32v15.752zM20.4 6V18c0 .528.24 1.032.648 1.368l.024.024c1.224 1.032 3.096.192 3.096-1.392V6c0-1.584-1.872-2.424-3.096-1.392l-.024.024A1.726 1.726 0 0 0 20.4 6zM3.36.928L8.8 4.344v8.928L3.36 16.68V.928zM1.6 18V6c0-.528-.24-1.032-.648-1.368l-.024-.024C-.296 3.576-2.168 4.416-2.168 6v12c0 1.584 1.872 2.424 3.096 1.392l.024-.024A1.726 1.726 0 0 0 1.6 18zm9.6 3.36V2.64L12 0l.8 2.64v18.72L12 24l-.8-2.64z"/>
      </svg>,
      <svg key="freshdesk" className="w-8 h-8" viewBox="0 0 24 24" fill="#34C759">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/>
      </svg>,
    ],
  },
  lawyers: {
    title: 'Draft legal documents with precision and speed.',
    rawInput: 'Client wants to negotiate the non-compete clause and extend the notice period from 30 to 60 days also asking about intellectual property rights on work product created during employment.',
    polishedOutput: {
      body: 'Contract Amendment Summary:\n\n1. Non-Compete Clause: Requires revision per client request\n\n2. Notice Period: Extend from 30 to 60 days\n\n3. Intellectual Property: Clarify ownership rights for work product created during employment term\n\nNext steps: Draft amendments for client review',
    },
    icons: [
      <svg key="clio" className="w-8 h-8" viewBox="0 0 24 24" fill="#0033A0">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22C6.486 22 2 17.514 2 12S6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z"/>
        <path d="M12 6c-3.309 0-6 2.691-6 6s2.691 6 6 6 6-2.691 6-6-2.691-6-6-6zm0 10c-2.206 0-4-1.794-4-4s1.794-4 4-4 4 1.794 4 4-1.794 4-4 4z"/>
      </svg>,
      <svg key="document" className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
        <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/>
      </svg>,
      <svg key="docusign" className="w-8 h-8" viewBox="0 0 24 24" fill="#FF3B3B">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.5 16.5h-11v-9h11v9z"/>
      </svg>,
    ],
  },
  leaders: {
    title: 'Lead with clarity. Communicate with confidence.',
    rawInput: 'Team performance this quarter has been strong but we need to focus on improving cross functional collaboration and making sure everyone understands the new strategic priorities going forward.',
    polishedOutput: {
      body: 'Q4 Leadership Update:\n\nStrengths:\n• Strong team performance this quarter\n• Solid execution on key initiatives\n\nFocus Areas:\n• Enhance cross-functional collaboration\n• Communicate strategic priorities clearly\n• Ensure team alignment on goals',
    },
    icons: [
      <svg key="linkedin" className="w-8 h-8" viewBox="0 0 24 24" fill="#0A66C2">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>,
      <svg key="asana" className="w-8 h-8" viewBox="0 0 24 24" fill="#F06A6A">
        <circle cx="12" cy="6" r="4.5"/>
        <circle cx="6" cy="16" r="4.5"/>
        <circle cx="18" cy="16" r="4.5"/>
      </svg>,
      <svg key="monday" className="w-8 h-8" viewBox="0 0 24 24" fill="#FF3D57">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-1.5 17c-.828 0-1.5-.672-1.5-1.5v-7c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5v7c0 .828-.672 1.5-1.5 1.5zm4 0c-.828 0-1.5-.672-1.5-1.5v-7c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5v7c0 .828-.672 1.5-1.5 1.5z"/>
      </svg>,
    ],
  },
  accessibility: {
    title: 'Make communication accessible for everyone.',
    rawInput: 'The new accessibility features should include keyboard navigation screen reader support and high contrast mode for visually impaired users.',
    polishedOutput: {
      body: 'Accessibility Requirements:\n\n• Keyboard Navigation: Full keyboard control without mouse dependency\n\n• Screen Reader Support: ARIA labels and semantic HTML structure\n\n• High Contrast Mode: Enhanced visibility for visually impaired users\n\n• WCAG 2.1 AA Compliance',
    },
    icons: [
      <svg key="accessibility" className="w-8 h-8" viewBox="0 0 24 24" fill="none" aria-label="Accessibility">
        <circle cx="12" cy="12" r="10" stroke="#0066CC" strokeWidth="2" fill="none"/>
        <circle cx="12" cy="6" r="1.5" fill="#0066CC"/>
        <path d="M8 10h8M10 10v6c0 1.5-0.5 2-1 2M14 10v6c0 1.5 0.5 2 1 2" stroke="#0066CC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>,
      <svg key="voiceover" className="w-8 h-8" viewBox="0 0 24 24" fill="none" aria-label="Voice Over">
        <rect x="8" y="3" width="8" height="10" rx="4" fill="#4CAF50"/>
        <path d="M12 13v3M9 16h6" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round"/>
        <path d="M6 9c0-3.31 2.69-6 6-6s6 2.69 6 6" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" fill="none"/>
        <path d="M4 9c0-4.42 3.58-8 8-8s8 3.58 8 8" stroke="#4CAF50" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.5"/>
      </svg>,
      <svg key="text-to-speech" className="w-8 h-8" viewBox="0 0 24 24" fill="none" aria-label="Text to Speech">
        <path d="M3 9v6h4l5 5V4L7 9H3z" fill="#FF9800" stroke="#FF9800" strokeWidth="1"/>
        <path d="M15.5 12a3.5 3.5 0 0 0 0-7" stroke="#FF9800" strokeWidth="2" strokeLinecap="round" fill="none"/>
        <path d="M18 12a6 6 0 0 0 0-12" stroke="#FF9800" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.6"/>
      </svg>,
    ],
  },
  better: {
    title: 'Work smarter, not harder, everywhere you type.',
    rawInput: 'Basically we just need to get this done asap and make sure it\'s good quality and everyone is on the same page about what we\'re doing.',
    polishedOutput: {
      body: 'Action Items:\n\n• Prioritize completion with high quality standards\n• Ensure team alignment on objectives and approach\n• Establish clear communication channels\n• Set realistic timeline expectations',
    },
    icons: [
      <svg key="productivity" className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 1a3 3 0 0 0 3 3 3 3 0 0 0-3 3 3 3 0 0 0-3-3 3 3 0 0 0 3-3z"/>
        <path d="M19 11a3 3 0 0 0 3 3 3 3 0 0 0-3 3 3 3 0 0 0-3-3 3 3 0 0 0 3-3z"/>
        <path d="M5 17a3 3 0 0 0 3 3 3 3 0 0 0-3 3 3 3 0 0 0-3-3 3 3 0 0 0 3-3z"/>
      </svg>,
      <svg key="rocket" className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
      </svg>,
      <svg key="check" className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10"/>
        <path d="M9 12l2 2 4-4"/>
      </svg>,
    ],
  },
};

export default function AdaptsToYourRole() {
  const [selectedCohort, setSelectedCohort] = useState<CohortType>('developers');

  const cohorts = [
    { id: 'teams' as CohortType, label: 'Teams', icon: '👥' },
    { id: 'students' as CohortType, label: 'Students', icon: '🎓' },
    { id: 'developers' as CohortType, label: 'Developers', icon: '</>' },
    { id: 'creators' as CohortType, label: 'Creators', icon: '🎬' },
    { id: 'sales' as CohortType, label: 'Sales', icon: '🤝' },
    { id: 'support' as CohortType, label: 'Customer Support', icon: '🎧' },
    { id: 'lawyers' as CohortType, label: 'Lawyers', icon: '⚖️' },
    { id: 'leaders' as CohortType, label: 'Leaders', icon: '📊' },
    { id: 'accessibility' as CohortType, label: 'Accessibility', icon: '♿' },
    { id: 'better' as CohortType, label: 'Better', icon: '📈' },
  ];

  const currentContent = cohortData[selectedCohort];

  return (
    <section className="relative py-12 md:py-20 lg:py-32 overflow-hidden" style={{ background: 'linear-gradient(135deg, #f5f7fa 0%, #e8ecf4 100%)' }}>
      <div className="container-large relative z-10">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainerSlow}
          className="text-center mb-16"
        >
          {/* Main Heading */}
          <motion.h2
            className="text-display text-[#1a1a1a] mb-4"
            variants={fadeUpLarge}
          >
            Zavi adapts to your role.
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            className="text-body-xl text-gray-700 mb-12"
            variants={fadeUp}
          >
            Streamline any workflow instantly.
          </motion.p>

          {/* Cohort Buttons Grid */}
          <motion.div
            variants={fadeUp}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 max-w-5xl mx-auto mb-16"
          >
            {cohorts.map((cohort) => (
              <button
                key={cohort.id}
                onClick={() => setSelectedCohort(cohort.id)}
                aria-label={`View ${cohort.label} use case`}
                aria-pressed={selectedCohort === cohort.id}
                className={`
                  relative px-6 py-4 rounded-xl font-semibold text-sm md:text-base
                  transition-all duration-300 shadow-md hover:shadow-lg
                  focus:outline-none focus:ring-2 focus:ring-[#7B68EE] focus:ring-offset-2
                  ${selectedCohort === cohort.id
                    ? 'bg-gradient-to-br from-[#7B68EE] to-[#9370DB] text-white scale-105'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                  }
                `}
              >
                <div className="flex flex-col items-center gap-2">
                  <span className="text-2xl" aria-hidden="true">{cohort.icon}</span>
                  <span>{cohort.label}</span>
                </div>
              </button>
            ))}
          </motion.div>
        </motion.div>

        {/* Dynamic Content Area */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCohort}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="relative"
          >
            {/* Title */}
            <h3 className="text-3xl md:text-4xl font-semibold text-center mb-12 text-[#1a1a1a]">
              {currentContent.title}
            </h3>

            {/* Demo Container */}
            <div className="relative max-w-6xl mx-auto">
              {/* Audio Wave Left */}
              <div className="absolute -left-8 md:-left-16 top-1/2 transform -translate-y-1/2 opacity-40 hidden lg:block">
                <div className="flex items-end gap-1 h-48">
                  {[2, 4, 3, 6, 5, 7, 4, 5, 3, 6, 4, 5, 3, 4, 2].map((height, i) => (
                    <motion.div
                      key={i}
                      className="w-1.5 rounded-full"
                      style={{
                        background: 'linear-gradient(to top, #5381d2, #7B68EE)',
                        height: `${height * 12}%`,
                      }}
                      animate={{
                        height: [`${height * 12}%`, `${height * 16}%`, `${height * 12}%`],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay: i * 0.1,
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Audio Wave Right */}
              <div className="absolute -right-8 md:-right-16 top-1/2 transform -translate-y-1/2 opacity-40 hidden lg:block">
                <div className="flex items-end gap-1 h-48">
                  {[3, 5, 4, 6, 7, 5, 4, 6, 3, 5, 4, 3, 6, 4, 3].map((height, i) => (
                    <motion.div
                      key={i}
                      className="w-1.5 rounded-full"
                      style={{
                        background: 'linear-gradient(to top, #7B68EE, #9370DB)',
                        height: `${height * 12}%`,
                      }}
                      animate={{
                        height: [`${height * 12}%`, `${height * 16}%`, `${height * 12}%`],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay: i * 0.1,
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Main Content Box */}
              <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200 p-8 md:p-12">
                <div className="grid md:grid-cols-2 gap-8 md:gap-12">
                  {/* Raw Input */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                      Raw Input
                    </h4>
                    <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-100 relative">
                      {/* Audio Wave Visualization */}
                      <div className="flex items-center gap-1 mb-4 h-12">
                        {Array.from({ length: 40 }).map((_, i) => (
                          <motion.div
                            key={i}
                            className="flex-1 rounded-full"
                            style={{
                              background: 'linear-gradient(to top, #7B68EE, #9370DB)',
                            }}
                            animate={{
                              height: [`${Math.random() * 30 + 10}%`, `${Math.random() * 60 + 20}%`, `${Math.random() * 30 + 10}%`],
                            }}
                            transition={{
                              duration: 1 + Math.random(),
                              repeat: Infinity,
                              delay: i * 0.05,
                            }}
                          />
                        ))}
                      </div>
                      <p className="text-gray-700 text-base leading-relaxed">
                        {currentContent.rawInput}
                      </p>
                    </div>
                  </div>

                  {/* Polished Output */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                      Polished Output
                    </h4>
                    <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-6 border border-green-100">
                      {currentContent.polishedOutput.body ? (
                        <p className="text-gray-700 text-base leading-relaxed whitespace-pre-line">
                          {currentContent.polishedOutput.body}
                        </p>
                      ) : (
                        <div className="space-y-3 text-gray-700 text-base">
                          {currentContent.polishedOutput.title && (
                            <p className="font-semibold">{currentContent.polishedOutput.title}</p>
                          )}
                          {currentContent.polishedOutput.summary && (
                            <p>{currentContent.polishedOutput.summary}</p>
                          )}
                          {currentContent.polishedOutput.description && (
                            <p>{currentContent.polishedOutput.description}</p>
                          )}
                          {currentContent.polishedOutput.assignee && (
                            <p>{currentContent.polishedOutput.assignee}</p>
                          )}
                          {currentContent.polishedOutput.priority && (
                            <p className="font-semibold text-[#7B68EE]">{currentContent.polishedOutput.priority}</p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Platform Icons */}
                <div className="flex items-center justify-center gap-6 mt-10 pt-8 border-t border-gray-200" role="list" aria-label="Supported platforms">
                  {currentContent.icons.map((icon, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="text-gray-600 hover:text-gray-900 transition-colors"
                      role="listitem"
                    >
                      {icon}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

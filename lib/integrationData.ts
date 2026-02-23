export interface Integration {
    id: string;
    name: string;
    slug: string;
    color: string;
    category: string;
    shortDesc: string;
    fullDesc: string;
    keyFeatures: string[];
    useCases: string[];
    faqs: { question: string; answer: string }[];
    metaTitle: string;
    metaDesc: string;
}

export const integrations: Integration[] = [
    {
        id: "web-search",
        name: "Web Search",
        slug: "web-search",
        color: "bg-blue-50 text-blue-600 border-blue-100",
        category: "Utility",
        shortDesc: "Search the web for real-time news, facts, and current events by voice.",
        fullDesc: "Access the entire internet without opening a browser. Zavi AI allows you to instantly search the web using natural voice commands across macOS, Windows, Linux, Android, and iOS. Get immediate answers, latest news, and real-time facts effortlessly.",
        keyFeatures: [
            "Real-time web crawling and summarization.",
            "Instant answers delivered directly in your current app.",
            "Cross-platform support for Mac, PC, and mobile."
        ],
        useCases: [
            "Asking 'What's the current price of Bitcoin?' while formatting an email.",
            "Checking 'Who won the game last night?' without breaking focus.",
            "Researching 'latest AI news' directly from your keyboard."
        ],
        faqs: [
            { question: "Do I need to leave my current app?", answer: "No, Zavi pulls the information directly to you." }
        ],
        metaTitle: "Web Search via Voice Dictation | Zavi AI",
        metaDesc: "Search the web instantly using your voice across macOS, Windows, iOS, and Android with Zavi AI."
    },
    {
        id: "macos-system",
        name: "macOS System",
        slug: "macos-system",
        color: "bg-slate-50 text-slate-800 border-slate-200",
        category: "System",
        shortDesc: "Control your Mac hands-free — apps, volume, timers, and more.",
        fullDesc: "Turn your Mac into a fully voice-controlled workstation. Zavi AI integrates deeply with macOS, allowing you to launch applications, adjust system settings, set timers, and interact with the clipboard entirely hands-free.",
        keyFeatures: [
            "Launch and quit applications instantly.",
            "Control volume, brightness, and system settings.",
            "Read out clipboard contents and set quick timers."
        ],
        useCases: [
            "Saying 'Open Safari' or 'Set the volume to 50'.",
            "Asking 'What's my battery level?' without checking the menu bar.",
            "Setting quick reminders like 'Set a timer for 5 minutes'."
        ],
        faqs: [
            { question: "Does this require special accessibility permissions?", answer: "Yes, Zavi uses standard macOS accessibility APIs to control the system." }
        ],
        metaTitle: "Control macOS with Your Voice | Zavi AI Voice Commands",
        metaDesc: "Open apps, set timers, and control your Mac hands-free with Zavi AI's native macOS system integration."
    },
    {
        id: "gmail",
        name: "Gmail",
        slug: "gmail",
        color: "bg-red-50 text-red-600 border-red-100",
        category: "Communication",
        shortDesc: "Read, reply, and send emails by voice.",
        fullDesc: "Zavi AI transforms how you use Gmail across all devices. Instant transcription and smart routing mean you can read, reply to, and draft complex emails without touching your keyboard. Zavi understands context and auto-formats your professional correspondence.",
        keyFeatures: [
            "Draft full emails via conversational voice commands.",
            "Read incoming emails out loud.",
            "Cross-platform compatibility (macOS, iOS, Android, Windows)."
        ],
        useCases: [
            "Commanding: 'Send an email to John about the meeting'.",
            "Listening to updates: 'Read my latest emails'.",
            "Quick replies: 'Reply to Sarah's email'."
        ],
        faqs: [
            { question: "Is my email data secure?", answer: "Yes, Zavi uses secure OAuth integrations and does not store your private emails." }
        ],
        metaTitle: "Voice Typing for Gmail | Zavi AI",
        metaDesc: "Draft, read, and reply to Gmail messages using advanced voice commands across Mac, PC, and Mobile."
    },
    {
        id: "slack",
        name: "Slack",
        slug: "slack",
        color: "bg-purple-50 text-purple-600 border-purple-100",
        category: "Communication",
        shortDesc: "Post messages, send DMs, and manage channels by voice.",
        fullDesc: "Stay connected with your team at lightning speed. Zavi AI connects to Slack to let you post updates, send direct messages, and read active channels using natural speech from anywhere.",
        keyFeatures: [
            "Post directly to specific channels.",
            "Send private direct messages instantly.",
            "Have Zavi read unread messages in important threads."
        ],
        useCases: [
            "Saying 'Post an update to #general' during a commute.",
            "Commanding 'Send a DM to Sarah'.",
            "Catching up: 'Read messages in #team'."
        ],
        faqs: [
            { question: "Does Zavi support Slack threads?", answer: "Yes, you can dictate replies directly into active threads." }
        ],
        metaTitle: "Voice to Text for Slack | Zavi AI",
        metaDesc: "Send Slack DMs and manage channels using your voice. Cross-platform dictation for macOS, Windows, and mobile."
    },
    {
        id: "github",
        name: "GitHub",
        slug: "github",
        color: "bg-slate-50 text-slate-800 border-slate-200",
        category: "Development",
        shortDesc: "Manage issues, PRs, and notifications by voice.",
        fullDesc: "Streamline your development workflow. Zavi AI allows developers to interact with GitHub repositories, create issues, review PR statuses, and handle notifications seamlessly using voice commands.",
        keyFeatures: [
            "Create and assign issues rapidly.",
            "Check Pull Request statuses without opening the browser.",
            "Read out GitHub notifications."
        ],
        useCases: [
            "Commanding 'Create an issue for the login bug'.",
            "Checking 'What PRs need my review?' before a standup.",
            "Listening to recent repository alerts."
        ],
        faqs: [
            { question: "Can it understand code vocabulary?", answer: "Yes, our custom dictionary handles programming languages flawlessly." }
        ],
        metaTitle: "GitHub Voice Commands & Dictation | Zavi AI",
        metaDesc: "Manage GitHub PRs, issues, and workflow entirely by voice across Mac, Windows, and Mobile."
    },
    {
        id: "notion",
        name: "Notion",
        slug: "notion",
        color: "bg-gray-50 text-gray-900 border-gray-200",
        category: "Productivity",
        shortDesc: "Search pages, read docs, and query databases by voice.",
        fullDesc: "Turn your Notion workspace into a voice-activated second brain. Create pages, search for meeting notes, and query complex databases instantly from any device.",
        keyFeatures: [
            "Instantly search across all Notion workspaces.",
            "Create new pages and databases hands-free.",
            "Read out specific documentation blocks."
        ],
        useCases: [
            "Commanding 'Search Notion for meeting notes'.",
            "Asking 'Read my Notion page about the project'.",
            "Saying 'Create a Notion page called Ideas'."
        ],
        faqs: [
            { question: "Does it support Notion databases?", answer: "Yes, you can query and add items to your Notion databases via voice." }
        ],
        metaTitle: "Voice Dictation for Notion | Zavi AI",
        metaDesc: "Create Notion pages, search notes, and manage databases using your voice on Mac, Windows, iOS, and Android."
    },
    {
        id: "imessage",
        name: "iMessage",
        slug: "imessage",
        color: "bg-green-50 text-green-600 border-green-100",
        category: "Messaging",
        shortDesc: "Send and read iMessages hands-free, right from your Mac.",
        fullDesc: "Stay in flow while messaging. Zavi AI connects securely with the native Messages app on macOS allowing you to dictate, send, and read iMessages without breaking your focus.",
        keyFeatures: [
            "Send SMS and iMessages via macOS natively.",
            "Read incoming texts out loud.",
            "Hands-free conversational replies."
        ],
        useCases: [
            "Commanding 'Text Mom I'll be home by 7'.",
            "Asking 'Read my latest iMessages'.",
            "Saying 'Send an iMessage to Sarah saying let's grab coffee'."
        ],
        faqs: [
            { question: "Does this require my phone?", answer: "It works directly through the Messages app on your macOS device." }
        ],
        metaTitle: "Voice Control for iMessage on Mac | Zavi AI",
        metaDesc: "Send, read, and reply to iMessages completely hands-free using Zavi AI on macOS."
    },
    {
        id: "telegram",
        name: "Telegram",
        slug: "telegram",
        color: "bg-blue-50 text-blue-500 border-blue-100",
        category: "Messaging",
        shortDesc: "Send messages and manage chats by voice.",
        fullDesc: "Experience seamless Telegram communication. Zavi AI allows you to send direct messages, blast updates to groups, and read unread chats across all your devices.",
        keyFeatures: [
            "Send messages to contacts and groups.",
            "Read unread Telegram notifications.",
            "Zero-latency transcription for fast replies."
        ],
        useCases: [
            "Saying 'Send a Telegram to the group'.",
            "Asking 'Read my unread Telegram messages' while commuting."
        ],
        faqs: [
            { question: "Can it handle Telegram channels?", answer: "Yes, depending on your bot and admin permissions." }
        ],
        metaTitle: "Telegram Voice Typing & Automation | Zavi AI",
        metaDesc: "Send messages and read Telegram chats using advanced cross-platform voice control."
    },
    {
        id: "linkedin",
        name: "LinkedIn",
        slug: "linkedin",
        color: "bg-blue-50 text-blue-700 border-blue-100",
        category: "Social",
        shortDesc: "Create posts, share articles, and access your profile by voice.",
        fullDesc: "Network efficiently with Zavi AI. Post updates, share articles, and retrieve your LinkedIn profile information via natural voice commands without manual typing.",
        keyFeatures: [
            "Draft and publish LinkedIn posts natively.",
            "Share URLs and articles directly to your feed.",
            "Retrieve connection and profile info."
        ],
        useCases: [
            "Commanding 'Post on LinkedIn about our new product launch'.",
            "Saying 'Share this article on LinkedIn'.",
            "Asking 'What's my LinkedIn profile info?'"
        ],
        faqs: [
            { question: "Are posts formatting optimally?", answer: "Yes, Zavi applies professional tone and spacing for LinkedIn automatically." }
        ],
        metaTitle: "LinkedIn Voice Posting & Networking | Zavi AI",
        metaDesc: "Post to LinkedIn, share articles, and network using your voice across macOS, Windows, and mobile."
    },
    {
        id: "google-calendar",
        name: "Google Calendar",
        slug: "google-calendar",
        color: "bg-indigo-50 text-indigo-600 border-indigo-100",
        category: "Productivity",
        shortDesc: "Check your schedule and create events by voice.",
        fullDesc: "Manage your time effortlessly. Zavi AI connects to Google Calendar so you can check your daily agenda, schedule new meetings, and reschedule conflicts entirely hands-free.",
        keyFeatures: [
            "Read out daily agendas and upcoming meetings.",
            "Create complex calendar invites with guests.",
            "Reschedule and manage time blocks."
        ],
        useCases: [
            "Asking 'What's on my calendar today?'.",
            "Commanding 'Create a meeting with Sarah on Friday at 2pm'.",
            "Saying 'Reschedule my 3pm to 4pm'."
        ],
        faqs: [
            { question: "Does it work with multiple calendars?", answer: "Yes, Zavi accesses your authenticated Google Calendar scopes." }
        ],
        metaTitle: "Google Calendar Voice Commands | Zavi AI",
        metaDesc: "Create events, check your schedule, and manage Google Calendar via voice on any device."
    },
    {
        id: "google-docs",
        name: "Google Docs",
        slug: "google-docs",
        color: "bg-blue-50 text-blue-600 border-blue-100",
        category: "Productivity",
        shortDesc: "Read and create documents by voice.",
        fullDesc: "Accelerate your writing workflow. Use Zavi AI to instantly create new Google Docs or have existing documents read out to you without breaking your stride.",
        keyFeatures: [
            "Create blank documents instantly.",
            "Read out document contents and summaries.",
            "Cross-platform dictation straight into the Doc."
        ],
        useCases: [
            "Commanding 'Read my project proposal doc'.",
            "Saying 'Create a new document' before brainstorming."
        ],
        faqs: [
            { question: "Can I dictate directly into the document?", answer: "Yes, Zavi acts as a universal keyboard input." }
        ],
        metaTitle: "Voice Dictation for Google Docs | Zavi AI",
        metaDesc: "Create and read Google Docs hands-free using Zavi AI's cross-platform voice keyboard."
    },
    {
        id: "google-drive",
        name: "Google Drive",
        slug: "google-drive",
        color: "bg-green-50 text-green-600 border-green-100",
        category: "Productivity",
        shortDesc: "Search and find files by voice.",
        fullDesc: "Never lose a file again. Zavi AI integrates with Google Drive, allowing you to search for spreadsheets, proposals, and folders via voice, and instantly share them with colleagues.",
        keyFeatures: [
            "Rapidly search for files by name or content.",
            "Share files with contacts via voice command."
        ],
        useCases: [
            "Asking 'Find the budget spreadsheet'.",
            "Commanding 'Share the proposal with Sarah'."
        ],
        faqs: [
            { question: "Is my Drive data secure?", answer: "Zavi respects OAuth scopes and does not index your drive externally." }
        ],
        metaTitle: "Google Drive File Search via Voice | Zavi AI",
        metaDesc: "Search for files and share folders in Google Drive using your voice with Zavi AI."
    },
    {
        id: "google-contacts",
        name: "Google Contacts",
        slug: "google-contacts",
        color: "bg-blue-50 text-blue-500 border-blue-100",
        category: "Utility",
        shortDesc: "Look up emails and phone numbers by name.",
        fullDesc: "Retrieve contact information instantly. Zavi AI connects to Google Contacts, letting you pull phone numbers and email addresses naturally during a conversation or workflow.",
        keyFeatures: [
            "Look up contact details instantly.",
            "Seamlessly insert contact info into your current text field."
        ],
        useCases: [
            "Asking 'What's Sarah's email address?'.",
            "Commanding 'Find John's phone number'."
        ],
        faqs: [
            { question: "Can it inject the email into my current app?", answer: "Yes, Zavi retrieves the info and types it out for you." }
        ],
        metaTitle: "Voice Search for Google Contacts | Zavi AI",
        metaDesc: "Find phone numbers and emails instantly via voice using Zavi AI for Google Contacts."
    },
    {
        id: "youtube",
        name: "YouTube",
        slug: "youtube",
        color: "bg-red-50 text-red-600 border-red-100",
        category: "Media",
        shortDesc: "Search videos and browse playlists by voice.",
        fullDesc: "Control your entertainment and research. Zavi AI links with YouTube to let you search for videos, pull up tutorials, and browse your playlists hands-free.",
        keyFeatures: [
            "Voice search for specific videos or topics.",
            "Access and list current playlists."
        ],
        useCases: [
            "Saying 'Search YouTube for Go tutorials'.",
            "Asking 'Show my YouTube playlists'."
        ],
        faqs: [
            { question: "Does it play the video?", answer: "It will open the video directly in your default browser or YouTube app." }
        ],
        metaTitle: "YouTube Voice Search | Zavi AI",
        metaDesc: "Search YouTube videos and browse playlists with your voice across Mac, Windows, and mobile."
    },
    {
        id: "google-sheets",
        name: "Google Sheets",
        slug: "google-sheets",
        color: "bg-emerald-50 text-emerald-600 border-emerald-100",
        category: "Productivity",
        shortDesc: "Read, create, and update spreadsheets by voice.",
        fullDesc: "Handle data without touching the keyboard. Zavi AI makes Google Sheets accessible via voice. Create new spreadsheets, read out specific cells, or pull budget data instantly.",
        keyFeatures: [
            "Create new spreadsheets on the fly.",
            "Read out specific file contents.",
            "Filter and find specific Sheets in your Drive."
        ],
        useCases: [
            "Asking 'Show my spreadsheets'.",
            "Commanding 'Create a spreadsheet called Expenses'.",
            "Saying 'Read the budget spreadsheet'."
        ],
        faqs: [
            { question: "Can it do complex formulas?", answer: "Zavi is best for data entry and file management, formulas require manual setup." }
        ],
        metaTitle: "Voice Commands for Google Sheets | Zavi AI",
        metaDesc: "Manage, read, and create Google Sheets spreadsheets using advanced voice commands."
    },
    {
        id: "reminders",
        name: "Reminders",
        slug: "reminders",
        color: "bg-blue-50 text-blue-600 border-blue-100",
        category: "Utility",
        shortDesc: "Create reminders and manage your to-do list by voice.",
        fullDesc: "Stay on top of your tasks. Zavi AI natively integrates with the Reminders app to capture your to-dos instantly, no matter what application you are currently using.",
        keyFeatures: [
            "Instantly add tasks to your lists.",
            "Set time-based or location-based reminders.",
            "Native OS integration."
        ],
        useCases: [
            "Commanding 'Remind me to buy groceries at 6pm'.",
            "Saying 'Add pick up laundry to my tasks'."
        ],
        faqs: [
            { question: "Does this sync to iCloud?", answer: "Yes, as it uses the native OS Reminders application." }
        ],
        metaTitle: "Voice Reminders and Tasks | Zavi AI",
        metaDesc: "Create and manage tasks hands-free with Zavi AI's native Reminders integration."
    },
    {
        id: "notes",
        name: "Notes",
        slug: "notes",
        color: "bg-amber-50 text-amber-600 border-amber-100",
        category: "Utility",
        shortDesc: "Quickly capture and search notes by voice.",
        fullDesc: "Your thoughts, instantly saved. Zavi AI integrates with your system Notes so you can rapidly dictate meeting recaps or search old notes without switching context.",
        keyFeatures: [
            "Create new notes instantly.",
            "Search existing notes via semantic voice queries.",
            "Always active system-level integration."
        ],
        useCases: [
            "Saying 'Save a note about the meeting recap'.",
            "Commanding 'Search my notes for meeting recap'."
        ],
        faqs: [
            { question: "Can it format the notes?", answer: "Yes, Zavi applies smart capitalization and logical formatting." }
        ],
        metaTitle: "Dictate System Notes via Voice | Zavi AI",
        metaDesc: "Capture and search your system notes instantly using Zavi AI cross-platform dictation."
    },
    {
        id: "location",
        name: "Location",
        slug: "location",
        color: "bg-indigo-50 text-indigo-600 border-indigo-100",
        category: "Utility",
        shortDesc: "Use local data for weather, directions, and nearby results.",
        fullDesc: "Make your AI context-aware. Enabling the Location superpower allows Zavi AI to give highly targeted answers for finding coffee shops, getting directions, or checking the forecast.",
        keyFeatures: [
            "Provides contextual, local search results.",
            "Enables Maps and Weather routing.",
            "Privacy-first: on-demand location checking."
        ],
        useCases: [
            "Asking 'What's the weather?' without specifying a city.",
            "Commanding 'Find coffee shops near me'."
        ],
        faqs: [
            { question: "Is my location tracked constantly?", answer: "No, location is only pulled when a specific prompt requires local context." }
        ],
        metaTitle: "Location-Aware Voice AI | Zavi AI",
        metaDesc: "Enable location services in Zavi AI for smart, local voice queries and navigation."
    },
    {
        id: "maps",
        name: "Maps",
        slug: "maps",
        color: "bg-green-50 text-green-600 border-green-100",
        category: "Utility",
        shortDesc: "Get directions and find places by voice.",
        fullDesc: "Navigate seamlessly. With Zavi AI, you can launch native Map routing for the airport, restaurants, or client offices entirely hands-free.",
        keyFeatures: [
            "Launch immediate turn-by-turn navigation.",
            "Search for nearby POIs."
        ],
        useCases: [
            "Saying 'Navigate to the airport'.",
            "Commanding 'Find the nearest coffee shop'."
        ],
        faqs: [
            { question: "Which maps app does it use?", answer: "It integrates with the system default mapping application." }
        ],
        metaTitle: "Voice Navigation & Maps | Zavi AI",
        metaDesc: "Get directions and navigate to places hands-free using Zavi AI Maps integration."
    },
    {
        id: "weather",
        name: "Weather",
        slug: "weather",
        color: "bg-cyan-50 text-cyan-500 border-cyan-100",
        category: "Utility",
        shortDesc: "Check the forecast and weather conditions by voice.",
        fullDesc: "Stay ahead of the cloud. Zavi AI retrieves real-time weather forecasting for your local area or any global city in milliseconds.",
        keyFeatures: [
            "Global weather tracking.",
            "Immediate voice readouts of temperature and conditions."
        ],
        useCases: [
            "Asking 'What's the weather in Delhi?'.",
            "Saying 'How's the weather in San Francisco?'"
        ],
        faqs: [
            { question: "Do I need the location superpower enabled?", answer: "Only if you want 'local' weather without specifying the city name." }
        ],
        metaTitle: "Voice Weather Forecasts | Zavi AI",
        metaDesc: "Check local and global weather forecasts instantly using voice commands with Zavi AI."
    },
    {
        id: "claude",
        name: "Claude",
        slug: "claude",
        color: "bg-[#D97757]/10 text-[#D97757] border-[#D97757]/20",
        category: "AI Mode",
        shortDesc: "Use Claude for code review, analysis, writing, and intelligent conversations.",
        fullDesc: "Bring Anthropic's Claude directly to your operating system. Connect your Claude API key to execute deep reasoning loops, analyze code, and draft high-quality responses from any text field on your device.",
        keyFeatures: [
            "BYOK (Bring Your Own Key) for Anthropic Claude.",
            "Deep linguistic analysis and coding reviews.",
            "Zero limitations on context window (based on your tier)."
        ],
        useCases: [
            "Saying 'Ask Claude to review this code'.",
            "Commanding 'Have Claude explain quantum computing'.",
            "Dictating 'Use Claude to draft a professional email'."
        ],
        faqs: [
            { question: "Do I pay for Claude through Zavi?", answer: "No, you securely connect your own Anthropic API key." }
        ],
        metaTitle: "Connect Claude AI to System Keyboard | Zavi AI",
        metaDesc: "Integrate Anthropic's Claude AI dynamically across Mac, Windows, iOS, and Android using Zavi AI."
    },
    {
        id: "chatgpt",
        name: "ChatGPT",
        slug: "chatgpt",
        color: "bg-[#10A37F]/10 text-[#10A37F] border-[#10A37F]/20",
        category: "AI Mode",
        shortDesc: "Use ChatGPT and your custom GPTs for creative writing, brainstorming, and more.",
        fullDesc: "Connect OpenAI directly to your workflow. Zavi AI lets you utilize ChatGPT and your specialized Custom GPTs seamlessly across all apps to brainstorm, rewrite, and automate text generation.",
        keyFeatures: [
            "Direct API integration with OpenAI.",
            "Access and utilize Custom GPT instructions.",
            "Fast, high-quality text generation."
        ],
        useCases: [
            "Commanding 'Ask ChatGPT to brainstorm startup ideas'.",
            "Saying 'Use my marketing GPT to write a tweet'.",
            "Asking 'List my custom GPTs'."
        ],
        faqs: [
            { question: "Can I use GPT-4?", answer: "Yes, you can configure the exact OpenAI model you wish to route your voice commands through." }
        ],
        metaTitle: "Voice Control ChatGPT Across OS | Zavi AI",
        metaDesc: "Bring ChatGPT and Custom GPTs to any app on macOS, Windows, Linux, iOS, and Android."
    },
    {
        id: "gemini",
        name: "Gemini",
        slug: "gemini",
        color: "bg-blue-50 text-blue-600 border-blue-100",
        category: "AI Mode",
        shortDesc: "Use Google Gemini for multimodal tasks, research, and content generation.",
        fullDesc: "Leverage Google's premier AI model instantly. Zavi AI routes your voice commands through Gemini for complex research, summarization, and data analysis natively on your device.",
        keyFeatures: [
            "Connects to Google Gemini API.",
            "Excellent for high-speed summarization and web-based context.",
            "BYOK ensures absolute data privacy."
        ],
        useCases: [
            "Commanding 'Ask Gemini to summarize this article'.",
            "Saying 'Have Gemini analyze this data'."
        ],
        faqs: [
            { question: "Is this included for free?", answer: "Zavi supports basic models natively, but bringing your own Gemini key unlocks limitless usage." }
        ],
        metaTitle: "Integrate Google Gemini Voice Control | Zavi AI",
        metaDesc: "Use Google Gemini natively across all your devices using Zavi AI's voice infrastructure."
    },
    {
        id: "whatsapp",
        name: "WhatsApp",
        slug: "whatsapp",
        color: "bg-green-50 text-green-600 border-green-100",
        category: "Messaging",
        shortDesc: "Send messages and check conversations by voice. (Coming Soon)",
        fullDesc: "Stop sending annoying voice notes. Zavi AI will soon allow you to dictate perfectly punctuated text into WhatsApp, read incoming messages, and translate live conversations across OS borders.",
        keyFeatures: [
            "Convert voice perfectly to text instead of audio notes.",
            "Read out WhatsApp notifications.",
            "Multi-lingual live translation."
        ],
        useCases: [
            "Saying 'Send a WhatsApp to Mom saying I'll be late'.",
            "Asking 'Read my latest WhatsApp messages'."
        ],
        faqs: [
            { question: "Is this feature live?", answer: "The WhatsApp superpower API is currently rolling out into 'Coming Soon' early access." }
        ],
        metaTitle: "WhatsApp Voice Typing & Commands | Zavi AI",
        metaDesc: "Send perfectly transcribed text messages in WhatsApp using Zavi AI voice dictation."
    },
    {
        id: "spotify",
        name: "Spotify",
        slug: "spotify",
        color: "bg-green-50 text-green-600 border-green-100",
        category: "Media",
        shortDesc: "Control music playback and search for songs by voice. (Coming Soon)",
        fullDesc: "Be the ultimate DJ. Zavi AI's upcoming Spotify integration will allow you to play tracks, manage playlists, and like songs without breaking your application focus.",
        keyFeatures: [
            "Voice search for tracks and artists.",
            "Control playback and volume.",
            "Manage 'Liked' songs on the fly."
        ],
        useCases: [
            "Commanding 'Play some chill music'.",
            "Saying 'Add this song to my liked songs'."
        ],
        faqs: [
            { question: "Does it work with free Spotify?", answer: "It will require Spotify Premium for API architectural limits." }
        ],
        metaTitle: "Control Spotify via Voice Commands | Zavi AI",
        metaDesc: "Control Spotify playback and manage playlists using voice commands across your devices."
    },
    {
        id: "linear",
        name: "Linear",
        slug: "linear",
        color: "bg-indigo-50 text-indigo-500 border-indigo-100",
        category: "Development",
        shortDesc: "Manage tasks and track projects by voice. (Coming Soon)",
        fullDesc: "Project management at the speed of sound. Zavi AI's upcoming Linear integration lets engineering and design teams create tasks, move ticketing states, and review cycles entirely hands-free.",
        keyFeatures: [
            "Create complex Linear issues via voice.",
            "Move tickets across Kanban columns.",
            "Assign PRs and tasks instantly."
        ],
        useCases: [
            "Commanding 'Move PROJ-123 to done'.",
            "Saying 'Create a task for the API refactor'."
        ],
        faqs: [
            { question: "When will this be available?", answer: "Linear integration is currently in private beta testing." }
        ],
        metaTitle: "Linear Voice Ticket Management | Zavi AI",
        metaDesc: "Create, move, and manage Linear tasks using developer-focused voice commands."
    },
    {
        id: "jira",
        name: "Jira",
        slug: "jira",
        color: "bg-blue-50 text-blue-600 border-blue-100",
        category: "Development",
        shortDesc: "Create tickets, update issues, and check sprint status by voice. (Coming Soon)",
        fullDesc: "Enterprise workflow made easy. Zavi AI is building a Jira integration to let product managers and developers create bug tickets, assign sprints, and manage enterprise workloads at 3x the speed.",
        keyFeatures: [
            "Create bug tickets using complex vocabulary.",
            "Query active sprint commitments.",
            "Update issue statuses globally."
        ],
        useCases: [
            "Commanding 'Create a bug ticket for the login crash'.",
            "Asking 'What's assigned to me this sprint?'"
        ],
        faqs: [
            { question: "Will this support custom fields?", answer: "Yes, Zavi will map voice entities to your custom Jira schema." }
        ],
        metaTitle: "Jira Voice Commands & Ticket Dictation | Zavi AI",
        metaDesc: "Manage Jira sprints and quickly generate detailed bug tickets using Zavi AI."
    }
];

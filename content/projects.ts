import type { Project } from '@/lib/types';

export const projects: Project[] = [
  {
    slug: 'bedrock-shadow-engine',
    title: 'Bedrock Shadow Engine',
    shortDescription:
      'A modular FastAPI system for Amazon Bedrock that automates cache eligibility detection and prompt optimization.',
    logo: '/logos/bedrock-shadow-engine.svg',
    domainTags: [
      'Cloud / AI Infrastructure',
      'Software Engineering / Full-Stack',
    ],
    skillTags: ['Python', 'AWS / Cloud'],
    fullToolList: [
      'Python 3.12',
      'FastAPI',
      'Pydantic',
      'AWS Bedrock (Runtime + Mantle endpoints)',
      'CloudWatch Model Invocation Logs',
      'Amazon Nova',
      'Anthropic Claude model family',
      'Python ast module',
      'tiktoken',
      'JSON/JSONL/NDJSON/CSV/Excel export',
      'Vanilla HTML/CSS/JS frontend',
      'Deliberate git branching strategy',
    ],
    body: {
      problem:
        'LLM inference platforms like Bedrock cache prompts internally, but developers have no visibility into cache eligibility or cost implications until after the fact.',
      role: 'Designed and built the full system solo — backend architecture, the custom Segment Forest algorithm, and API design.',
      challenges:
        "Reverse-engineering cache eligibility rules from observable behavior rather than documented specs; building a tree-based algorithm that reasons about prompt segmentation without executing untrusted code (solved via Python's ast module for safe static analysis).",
      results: '',
    },
    images: [],
    links: {},
  },
  {
    slug: 'blockchain-self-healing-iot-aviation',
    title: 'Blockchain-Enabled Self-Healing IoT Framework for Aviation Systems',
    shortDescription:
      'Published research (Springer, ICTCS) on a blockchain-secured, self-healing avionics IoT architecture with ML-based fault detection.',
    logo: '/logos/aviation-iot.svg',
    domainTags: ['IoT / Embedded Systems', 'Machine Learning'],
    skillTags: ['Python', 'Machine Learning tools'],
    fullToolList: [
      'Scikit-learn Decision Tree Classifier',
      'Feature engineering (mean/RMS/slope)',
      'Stratified train/test split',
      'Solidity',
      'Remix IDE',
      'MetaMask',
      'Ganache',
      'Web3.py',
      'Multi-threaded Python architecture',
      'Synthetic sensor data generation',
      'Gaussian noise modeling',
      'Phase-aware fault injection',
      'Chart.js dashboard',
      'joblib',
    ],
    body: {
      problem:
        'Safety-critical avionics IoT systems need fault tolerance, integrity, and forensic auditability — but most predictive-maintenance systems lack tamper-proof logging.',
      role: 'Co-authored the peer-reviewed paper; built the ML fault-detection pipeline and blockchain logging layer.',
      challenges:
        'Coordinating real-time, multi-threaded sensor/healing/phase-controller logic while keeping smart-contract writes performant enough not to bottleneck fault response time.',
      results: 'Published and presented at ICTCS, 10th iteration.',
    },
    images: [],
    links: { paper: '' },
  },
  {
    slug: 'edge-anomaly-detection',
    title: 'Real-Time Edge-Based Anomaly Detection System',
    shortDescription:
      'An edge-cloud anomaly detection architecture using Kafka, Spark Structured Streaming, and EWMA-based online learning.',
    logo: '/logos/edge-anomaly.svg',
    domainTags: [
      'Data Engineering',
      'Machine Learning',
      'IoT / Embedded Systems',
    ],
    skillTags: ['Python', 'Machine Learning tools'],
    fullToolList: [
      'Apache Kafka (producer/broker/consumer groups, topic design)',
      'Apache Spark Structured Streaming',
      'Apache Parquet (columnar, partitioned)',
      'EWMA (Exponential Weighted Moving Average)',
      'Online/incremental learning',
      'Phase-stratified baselines',
      'Feature weighting',
      'Precision/Recall/F1/AUC-ROC',
      'Latency/throughput benchmarking (time.perf_counter())',
    ],
    body: {
      problem:
        'Structural health monitoring needs low-latency anomaly detection at scale, but most anomaly detection assumes batch processing, not streaming.',
      role: 'Designed the streaming architecture end-to-end — topic design, Spark job structure, and the online-learning statistical model.',
      challenges:
        'Building fault-tolerant, decoupled infrastructure while keeping the anomaly-detection logic adaptive to phase-dependent sensor baselines rather than a single static threshold.',
      results: '',
    },
    images: [],
    links: {},
  },
  {
    slug: 'waste-management-system',
    title: 'Waste Management System',
    shortDescription:
      'A full-stack relational database system automating campus waste collection scheduling with a normalized 13-table schema.',
    logo: '/logos/waste-management.svg',
    domainTags: ['Data Engineering', 'Software Engineering / Full-Stack'],
    skillTags: ['SQL / Databases', 'Python'],
    fullToolList: [
      'MySQL 8.0',
      'Streamlit',
      'mysql-connector-python',
      'pandas',
      'MySQL Workbench',
      'Miro',
    ],
    body: {
      problem:
        'Campus waste collection scheduling had no automated system for driver assignment, tracking, or role-based access.',
      role: 'Designed the full schema from ER modeling through implementation, and built the RBAC frontend.',
      challenges:
        'Applying the formal 7-step ER-to-relational mapping algorithm correctly for multivalued attributes and many-to-many relationships, and choosing CASCADE vs SET NULL deliberately per relationship rather than defaulting to one.',
      skillBreakdown: {
        high: [
          'ER-to-Relational Mapping using the formal 7-step algorithm',
          'Stored Procedures & Functions (parameterized, DETERMINISTIC)',
          'Triggers with NEW/OLD row references (BEFORE INSERT/UPDATE)',
          'Nested & Correlated Subqueries',
          'Referential Integrity Design (deliberate CASCADE vs SET NULL choices)',
        ],
        solid: [
          'Relational schema normalization',
          'Many-to-many resolution via junction tables',
          'Aggregate queries with GROUP BY / HAVING',
          'Full CRUD application logic',
          'Role-based multi-view application architecture',
        ],
        basic: ['Streamlit UI construction'],
        limitations: [
          'Plaintext password storage — no hashing implemented in this prototype.',
        ],
      },
    },
    images: [],
    links: {},
  },
  {
    slug: 'smart-prosthetic-system',
    title: 'Smart Prosthetic System with Real-Time Terrain & Fall Detection',
    shortDescription:
      'An ESP32-based smart prosthetic foot with real-time terrain classification, fall detection, and wireless telemetry.',
    logo: '/logos/smart-prosthetic.svg',
    domainTags: ['IoT / Embedded Systems'],
    skillTags: ['C / C++ (Embedded)'],
    fullToolList: [
      'ESP-WROOM-32',
      'Embedded C/C++ (Arduino framework)',
      'FSR402 (x3)',
      'MPU-6050',
      'SW-420',
      'DS18B20',
      'OLED SSD1306',
      'WiFi (HTTPClient.h)',
      'Flask backend',
      'Li-Ion battery + boost converter',
      'Logic level converter',
    ],
    body: {
      problem:
        'Amputees need real-time terrain awareness and fall detection, but most prosthetic sensor systems either block on delay()-based timing or lack multi-sensor fusion.',
      role: 'Designed and built the full embedded system solo — firmware, sensor fusion, and power electronics.',
      challenges:
        'Managing simultaneous I2C, ADC, and GPIO sensor reads on a single MCU without blocking, and safely bridging mixed-voltage components (3.3V logic vs 5V sensors).',
      skillBreakdown: {
        high: [
          'Multi-sensor fusion via I2C + ADC + GPIO on a single MCU',
          'Real-time, non-blocking firmware design using millis() timing',
          'Rule-based sensor classification logic (terrain + fall detection state machine)',
          'End-to-end power system design (boost conversion + logic-level shifting)',
          'Wireless telemetry integration (embedded → Flask backend)',
        ],
        solid: [
          'GPIO/ADC pin mapping and hardware abstraction',
          'I2C multi-device bus sharing',
          'Modular firmware functions',
        ],
        basic: ['Reading library-provided sensor APIs', 'OLED text rendering'],
        limitations: [
          'Hardcoded WiFi credentials and an unauthenticated HTTP endpoint — a known prototype-stage security gap.',
        ],
      },
    },
    images: [],
    links: {},
  },
  {
    slug: 'blockchain-secure-dns',
    title: 'Blockchain-Enhanced Secure DNS System',
    shortDescription:
      'A blockchain-backed DNS architecture providing tamper-evident domain–IP mappings and verifiable name resolution.',
    logo: '/logos/secure-dns.svg',
    domainTags: ['Cybersecurity'],
    // TODO: confirm actual implementation language before finalizing this tag
    skillTags: ['Python'],
    fullToolList: [
      'API-key authentication',
      'RSA digital signatures',
      'SHA-256 integrity checks',
      'Secure UDP-based cross-platform communication (Linux ↔ Windows)',
    ],
    body: {
      problem:
        'Standard DNS has no built-in integrity guarantee — responses can be spoofed or tampered with in transit.',
      role: 'Designed and implemented the full system solo.',
      challenges:
        'Building reliable cross-platform (Linux/Windows) secure communication over UDP, which is connectionless by design and required custom integrity/auth handling at the application layer.',
      results: '',
    },
    images: [],
    links: {},
  },
  {
    slug: 'this-website',
    title: 'This Website',
    shortDescription:
      'The portfolio site itself — built with a focus on performance, accessibility, and production-grade engineering practices.',
    logo: '/logos/this-website.svg',
    domainTags: ['Software Engineering / Full-Stack'],
    skillTags: ['JavaScript / TypeScript'],
    fullToolList: [
      'Next.js (App Router)',
      'TypeScript',
      'Tailwind CSS v4',
      'Lenis smooth scroll',
      'IntersectionObserver-based motion hooks',
      'Husky + lint-staged',
      'ESLint + Prettier',
      'Vercel CI/CD with automatic PR previews',
    ],
    body: {
      problem:
        'Most portfolio sites default to a generic template look and skip the engineering practices that would actually demonstrate skill to a technical reviewer.',
      role: 'Designed and built the entire site solo, including the design system, motion utilities, and CI/CD pipeline.',
      challenges:
        "Adapting a reference design's techniques (Lenis internals, element-relative parallax math, IntersectionObserver-based reveal) into idiomatic React/Next.js patterns rather than porting raw DOM-manipulation code directly.",
      results: '',
    },
    images: [],
    links: { github: 'https://github.com/SakthiSaraniS/SakthiSaraniS_Website' },
  },
];

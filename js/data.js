/* ============================================================
 * 简历数据（冯敬晗 / Jinghan Feng）
 * ------------------------------------------------------------
 *  - skills:  技术栈（增删数组项即可自动更新页面）
 *  - works:   作品集（增删数组项即可自动更新页面）
 *  - records: 教育 / 荣誉 / 证书 / 其他经历（新闻式时间线）
 * ============================================================ */

const RESUME_DATA = {
    name: '冯敬晗',
    nameEn: 'Jinghan Feng',
    role: 'AI Agent 开发实习生',
    city: '现居沈阳',
    phone: '15940235849',
    email: 'jinghanvon@gmail.com',
    qq: '2787515776@qq.com',
    github: 'https://github.com/JinghanFeng123',
    bilibili: 'https://space.bilibili.com/430570218',
    education: '沈阳建筑大学 · 计算机科学与技术（本科 · 2023–2027）',

    /* ---------- 技术栈：分组建卡片，组内每行是一个技能标签 ---------- */
    skills: [
        {
            group: 'Agent 核心技能',
            icon: 'AI',
            items: [
                'Prompt Engineering',
                'Context Engineering',
                'Harness Engineering',
                'Loop Engineering',
                'RAG 检索增强',
                'MCP',
                'Eval 评估',
                'Tool Calling',
                'Agent Runtime',
                'Memory 策略'
            ]
        },
        {
            group: '框架与生态',
            icon: 'FW',
            items: [
                'LangChain',
                'LangGraph',
                'OpenAI SDK',
                'CC Switch',
                'LangSmith / LangFlow',
                'Dify / Coze / n8n',
                'Claude Code',
                'OpenCode',
                'Codex',
                'DeepSeek Harness',
                'OpenClaw 源码研究'
            ]
        },
        {
            group: '语言与工程',
            icon: 'CODE',
            items: [
                'Python',
                'TypeScript / JavaScript',
                'HTML / CSS',
                'C++（C++11+）',
                'Java / Spring Boot',
                'Vue3 / React',
                'Flutter',
                'Git & GitHub',
                'CI/CD（GitHub Actions）',
                'Docker / Podman / K8s',
                'REST API'
            ]
        },
        {
            group: '数据与检索',
            icon: 'DB',
            items: [
                'Embedding / 向量数据库',
                'Chroma',
                'PostgreSQL',
                'MySQL',
                'Redis',
                '语义搜索',
                '数据清洗',
                '多线程与并发'
            ]
        },
        {
            group: '基础与拓展',
            icon: 'MORE',
            items: [
                'Transformer / 注意力机制 / LLM 原理',
                '机器学习基础',
                'LeetCode 100+',
                'TCP/IP / HTTP',
                'UE5 游戏开发',
                '游戏美术设计',
                '英文论文阅读'
            ]
        }
    ],

    /* ---------- 作品集：主项目，每条渲染为 SHIFT UP 式项目展示 ---------- */
    works: [
        {
            title: 'AzumaClaw 自扩展 Coding Agent',
            status: '进行中 · 项目负责人（基于开源 pi 深度二次开发）',
            period: '2026.08 – 至今',
            badge: 'CODING AGENT',
            description: '基于开源 Coding Agent 深度二次开发的自扩展 Agent 运行时与交互式终端（TUI）编码助手，专注 TypeScript / Python 生态：内置 read / bash / edit / write 编码工具与 SQLite 会话持久化，统一接入 OpenAI / Anthropic / Google 等多提供商模型；维护 10 个子包 monorepo，支持 Skills 技能、扩展机制与多 Agent 编排，沉淀 Docker / Gondolin / OpenShell 三种容器化沙箱方案。',
            image: '',
            tags: ['TypeScript', 'Node.js', 'Agent Runtime', 'TUI', 'SQLite', 'CBOR', 'Docker'],
            links: {
                github: 'https://github.com/JinghanFeng123/AzumaClaw',
                demo: ''
            }
        },
        {
            title: 'ShizukuClaw',
            status: '进行中 · 全栈开发工程师',
            period: '2026.01 – 至今',
            badge: 'FULL-STACK',
            description: '多模式 AI 聊天机器人的核心成员项目。在对话能力之上扩展自主 Agent 能力（工具调用、短期/长期记忆、任务规划、受限代码沙箱），参与工具编排与权限分级，保障 QQ Bot 等非受信入口的安全边界；交付完整 Web 控制台生态（聊天、监控、配置、日志、数据库管理），实现多角色在线热切换，单实例后端承载多个虚拟人设。',
            image: '',
            tags: ['Python', 'FastAPI', 'Flask', 'OpenAI SDK', 'MySQL', 'LangChain', 'HTML/CSS/JS'],
            links: {
                github: 'https://github.com/JinghanFeng123/ShizukuClaw',
                demo: ''
            }
        },
        {
            title: '机器人智能客服系统',
            status: '独立开发 · Agent 开发工程师',
            period: '2026.07 – 2026.08',
            badge: 'AGENT DEV',
            description: '独立完成整体架构设计与实现：基于 LangChain / LangGraph 搭建 ReAct 智能体，集成知识库检索、天气、用户信息、使用记录查询等 7 个工具；设计基于 MD5 指纹的知识库增量加载机制，避免重复向量化；基于中间件实现提示词动态切换与工具调用监控；同时支持 Docker 一键部署与独立 exe 打包。',
            image: '',
            tags: ['LangChain', 'LangGraph', 'Streamlit', 'Chroma', 'DashScope', 'Docker', 'PyInstaller'],
            links: {
                github: 'https://github.com/JinghanFeng123/zhisaotong',
                demo: ''
            }
        },
        {
            title: 'RAG 智能客服系统',
            status: '独立开发 · Python 开发工程师',
            period: '2026.06 – 2026.07',
            badge: 'PYTHON DEV',
            description: '面向服饰电商场景的 RAG 客服系统。基于 LangChain LCEL 编排「检索—上下文增强—生成」链路，支持流式输出与多轮上下文；检索片段携带来源、时间、操作人元数据，回答可追溯；基于内容 MD5 去重增量入库，节省 Embedding 调用成本；配置全环境变量化并提供 Docker 一键部署。',
            image: '',
            tags: ['LangChain LCEL', 'ChromaDB', 'DashScope', 'Streamlit', 'Docker'],
            links: {
                github: 'https://github.com/JinghanFeng123/RAG',
                demo: ''
            }
        },
        {
            title: '霓殇',
            status: '其他方向 · 游戏开发',
            period: '2024.07 – 至今',
            badge: 'UE5 GAME',
            description: '开放世界游戏实践项目：跟随主角的脚步，用情感拯救无色的世界。作为非 Agent 方向的创作，用于展示 C++ / UE5 游戏开发与美术设计能力。',
            image: '',
            tags: ['UE5', 'C++', '开放世界', '游戏开发'],
            links: {
                github: '',
                demo: ''
            }
        }
    ],

    /* ---------- 荣誉与经历：新闻式卡片 ---------- */
    records: [
        {
            category: 'EDUCATION',
            title: '沈阳建筑大学',
            desc: '本科 · 计算机科学与技术（省部共建），专业排名前 3%，多次获院级奖学金、学习优秀奖学金。',
            date: '2023 – 2027',
            accent: 'green'
        },
        {
            category: 'AWARD',
            title: '中软国际大数据挑战赛 · 省级一等奖',
            desc: '基于 K-Means 聚类与肘部法则的麦当劳顾客满意度分析与用户画像项目。',
            date: '2024',
            accent: 'green'
        },
        {
            category: 'AWARD',
            title: '中软国际大数据挑战赛 · 三等奖',
            desc: '持续参与大数据分析赛道，保持省级奖项水平。',
            date: '2025',
            accent: 'dark'
        },
        {
            category: 'AWARD',
            title: '挑战杯 · 校级三等奖',
            desc: '校级创新创业竞赛奖项。',
            date: '2023',
            accent: 'dark'
        },
        {
            category: 'CERT',
            title: '大学英语六级 / 四级',
            desc: 'CET-6 / CET-4，具备阅读英文论文与项目文档的能力。',
            date: 'CET-6 · CET-4',
            accent: 'green'
        },
        {
            category: 'PROJECT',
            title: '跨平台校园导航 App',
            desc: 'Flutter 开发，集成高德 / 百度地图 SDK，覆盖双端。',
            date: '2025.11 – 2026.02',
            accent: 'dark'
        },
        {
            category: 'PROJECT',
            title: '天气预报平台',
            desc: 'Spring Boot + MySQL + Redis 后端，Vue3 / React 前后端分离。',
            date: '2026.05 – 2026.06',
            accent: 'dark'
        },
        {
            category: 'PROJECT',
            title: 'C++17 高性能工具库',
            desc: '自定义内存分配器、智能指针、线程安全容器。',
            date: '2024.10 – 2025.02',
            accent: 'dark'
        },
        {
            category: 'ACTIVITY',
            title: '大学生创新创业协会 · 干事',
            desc: '组织并协助举办多场活动，累计志愿时长 22 小时；另有「返家乡」志愿活动等服务经历。',
            date: '2023.09 – 至今',
            accent: 'green'
        }
    ]
};

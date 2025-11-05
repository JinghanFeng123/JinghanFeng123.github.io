// 主要功能类
class RustyNightWebsite {
    constructor() {
        this.currentSlide = 0;
        this.totalSlides = 3;
        this.isMenuOpen = false;
        this.currentLang = 'zh';
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupScrollEffects();
        this.setupTeamSlider();
        this.setupLanguageToggle();
        this.setupSmoothScroll();
    }

    // 设置事件监听器
    setupEventListeners() {
        // 汉堡菜单
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('nav-menu');
        
        if (hamburger && navMenu) {
            hamburger.addEventListener('click', () => this.toggleMobileMenu());
        }

        // 团队滑块按钮
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');
        
        if (prevBtn && nextBtn) {
            prevBtn.addEventListener('click', () => this.prevSlide());
            nextBtn.addEventListener('click', () => this.nextSlide());
        }

        // 点击菜单项关闭移动端菜单
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (this.isMenuOpen) {
                    this.toggleMobileMenu();
                }
            });
        });

        // 点击外部关闭菜单
        document.addEventListener('click', (e) => {
            if (this.isMenuOpen && !e.target.closest('.nav-container')) {
                this.toggleMobileMenu();
            }
        });
    }

    // 设置滚动效果
    setupScrollEffects() {
        let lastScrollTop = 0;
        const navbar = document.getElementById('navbar');
        
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // 导航栏隐藏/显示逻辑
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                navbar.classList.add('hidden');
            } else {
                navbar.classList.remove('hidden');
            }
            
            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        });

        // 滚动动画观察器
        this.setupScrollAnimations();
    }

    // 设置滚动动画
    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
                }
            });
        }, observerOptions);

        // 观察需要动画的元素
        const animatedElements = document.querySelectorAll('.team-card, .project-card, .contact-item');
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            observer.observe(el);
        });
    }

    // 设置团队滑块
    setupTeamSlider() {
        const slider = document.getElementById('team-slider');
        if (!slider) return;

        // 响应式滑块逻辑
        const updateSliderPosition = () => {
            const isMobile = window.innerWidth <= 768;
            const cardWidth = isMobile ? 280 : 300;
            const gap = 30;
            const translateX = -this.currentSlide * (cardWidth + gap);
            slider.style.transform = `translateX(${translateX}px)`;
        };

        // 窗口大小改变时更新位置
        window.addEventListener('resize', updateSliderPosition);

        // 自动播放（可选）
        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
        }, 5000);

        // 鼠标悬停暂停自动播放
        const sliderContainer = document.querySelector('.team-slider-container');
        if (sliderContainer) {
            sliderContainer.addEventListener('mouseenter', () => {
                clearInterval(this.autoPlayInterval);
            });

            sliderContainer.addEventListener('mouseleave', () => {
                this.autoPlayInterval = setInterval(() => {
                    this.nextSlide();
                }, 5000);
            });
        }

        // 触摸滑动支持
        this.setupTouchSlider(slider);
    }

    // 触摸滑动支持
    setupTouchSlider(slider) {
        let startX = 0;
        let currentX = 0;
        let isDragging = false;

        slider.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
            clearInterval(this.autoPlayInterval);
        });

        slider.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            currentX = e.touches[0].clientX;
        });

        slider.addEventListener('touchend', () => {
            if (!isDragging) return;
            
            const diffX = startX - currentX;
            const threshold = 50;

            if (Math.abs(diffX) > threshold) {
                if (diffX > 0) {
                    this.nextSlide();
                } else {
                    this.prevSlide();
                }
            }

            isDragging = false;
            this.autoPlayInterval = setInterval(() => {
                this.nextSlide();
            }, 5000);
        });
    }

    // 切换到上一张
    prevSlide() {
        this.currentSlide = this.currentSlide > 0 ? this.currentSlide - 1 : this.totalSlides - 1;
        this.updateSliderPosition();
    }

    // 切换到下一张
    nextSlide() {
        this.currentSlide = this.currentSlide < this.totalSlides - 1 ? this.currentSlide + 1 : 0;
        this.updateSliderPosition();
    }

    // 更新滑块位置
    updateSliderPosition() {
        const slider = document.getElementById('team-slider');
        if (!slider) return;

        // 根据屏幕宽度动态计算卡片宽度
        const isMobile = window.innerWidth <= 768;
        const cardWidth = isMobile ? 280 : 300;
        const gap = 30;
        const translateX = -this.currentSlide * (cardWidth + gap);
        slider.style.transform = `translateX(${translateX}px)`;
    }

    // 设置语言切换
    setupLanguageToggle() {
        const langToggle = document.getElementById('language-toggle');
        if (!langToggle) return;

        langToggle.addEventListener('click', () => this.toggleLanguage());
    }

    // 切换语言
    toggleLanguage() {
        const langText = document.querySelector('.lang-text');
        if (!langText) {
            console.log('语言切换按钮未找到');
            return;
        }

        console.log('语言切换被触发，当前语言:', this.currentLang);

        // 添加旋转动画
        langText.style.transform = 'rotate(360deg)';
        langText.style.transition = 'transform 0.5s ease-in-out';
        
        setTimeout(() => {
            if (this.currentLang === 'zh') {
                this.currentLang = 'en';
                langText.textContent = '中文';
                this.translateToEnglish();
                console.log('切换到英文');
            } else {
                this.currentLang = 'zh';
                langText.textContent = 'EN';
                this.translateToChinese();
                console.log('切换到中文');
            }
            langText.style.transform = 'rotate(0deg)';
        }, 250);
    }

    // 翻译到英文
    translateToEnglish() {
        const translations = {
            '首页': 'Home',
            '关于我们': 'About Us',
            '项目展示': 'Projects',
            '联系我们': 'Contact',
            '创新游戏开发 · 技术驱动未来': 'Innovative Game Development · Technology Driven Future',
            '我们是一家专注于游戏开发和创新技术的公司，致力于创造令人难忘的游戏体验。': 'We are a company focused on game development and innovative technology, committed to creating unforgettable gaming experiences.',
            '了解更多': 'Learn More',
            '我们的团队': 'Our Team',
            '专业的游戏开发团队，用心创造每一个作品': 'Professional game development team, creating every work with care',
            '首席技术官': 'Chief Technology Officer',
            '热爱游戏开发，致力于UE5游戏开发': 'Enthusiastic about game development, dedicated to UE5 game development',
            '美术总监': 'Art Director',
            '专注于美学设计与概念表达': 'Focus on aesthetic design and concept expression',
            '虚位以待': 'Waiting for your participation',
            '还没招到人': "Still haven't recruited anyone",
            '项目展示': 'Project Showcase',
            '我们的最新作品和技术成果': 'Our latest works and technical achievements',
            '霓殇（开发中）': 'Colourless(In Development)',
            '一款开放世界游戏，跟随主角的脚步，用情感拯救无色的世界。': 'An open-world game that uses emotions to save the colorless world.',
            '游戏开发': 'Game Development',
            '虚幻引擎': 'Unreal Engine',
            '开放世界': 'Open World',
            '未知的惊喜': 'Unknown Surprise',
            '即将揭幕。': 'Coming soon.',
            // '移动应用': 'Mobile App',
            '基于AI技术的移动应用，提供个性化的用户体验。': 'Mobile application based on AI technology, providing personalized user experience.',
            '移动应用': 'Mobile App',
            'AI': 'AI',
            '用户体验': 'User Experience',
            '联系我们': 'Contact Us',
            '欢迎与我们交流合作': 'Welcome to communicate and cooperate with us',
            '查看我们的开源项目': 'View our open source projects',
            '观看我们的技术分享': 'Watch our technical sharing',
            '&copy; 2024 RustyNight. 保留所有权利。': '&copy; 2024 RustyNight. All rights reserved.'
        };

        this.applyTranslations(translations);
    }

    // 翻译到中文
    translateToChinese() {
        const translations = {
            'Home': '首页',
            'About Us': '关于我们',
            'Projects': '项目展示',
            'Contact': '联系我们',
            'Innovative Game Development · Technology Driven Future': '创新游戏开发 · 技术驱动未来',
            'We are a company focused on game development and innovative technology, committed to creating unforgettable gaming experiences.': '我们是一家专注于游戏开发和创新技术的公司，致力于创造令人难忘的游戏体验。',
            'Learn More': '了解更多',
            'Our Team': '我们的团队',
            'Professional game development team, creating every work with care': '专业的游戏开发团队，用心创造每一个作品',
            'Chief Technology Officer': '首席技术官',
            'Enthusiastic about game development, dedicated to UE5 game development': '热爱游戏开发，致力于UE5游戏开发',
            'Art Director': '美术总监',
            'Focus on aesthetic design and concept expression': '专注于美学设计与概念表达',
            'Waiting for your participation': '虚位以待',
            '还没招到人': "Still haven't recruited anyone",            
            'Project Showcase': '项目展示',
            'Our latest works and technical achievements': '我们的最新作品和技术成果',
            'Colourless(In Development)': '霓殇（开发中）',
            'An open-world game that uses emotions to save the colorless world.': '一款开放世界游戏，跟随主角的脚步，用情感拯救无色的世界。',
            'Game Development': '游戏开发',
            'Unreal Engine': '虚幻引擎',
            'Open World': '开放世界',
            'Unknown Surprise': '未知的惊喜',
            'Coming soon.': '即将揭幕。',
            'Mobile application based on AI technology, providing personalized user experience.': '基于AI技术的移动应用，提供个性化的用户体验。',
            'Mobile App': '移动应用',
            'AI': 'AI',
            'User Experience': '用户体验',
            'Contact Us': '联系我们',
            'Welcome to communicate and cooperate with us': '欢迎与我们交流合作',
            'View our open source projects': '查看我们的开源项目',
            'Watch our technical sharing': '观看我们的技术分享',
            '&copy; 2024 RustyNight. All rights reserved.': '&copy; 2024 RustyNight. 保留所有权利。'
        };

        this.applyTranslations(translations);
    }

    // 应用翻译
    applyTranslations(translations) {
        // 翻译所有文本节点
        const walker = document.createTreeWalker(
            document.body,
            NodeFilter.SHOW_TEXT,
            null,
            false
        );
        
        const textNodes = [];
        let node;
        
        while (node = walker.nextNode()) {
            textNodes.push(node);
        }
        
        textNodes.forEach(textNode => {
            const text = textNode.textContent.trim();
            if (translations[text]) {
                textNode.textContent = translations[text];
            }
        });
        
        // 特殊处理一些属性
        const titleElements = document.querySelectorAll('[title]');
        titleElements.forEach(element => {
            const title = element.getAttribute('title').trim();
            if (translations[title]) {
                element.setAttribute('title', translations[title]);
            }
        });
    }

    // 设置平滑滚动
    setupSmoothScroll() {
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80; // 减去导航栏高度
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // 切换移动端菜单
    toggleMobileMenu() {
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('nav-menu');
        
        this.isMenuOpen = !this.isMenuOpen;
        
        hamburger.classList.toggle('active', this.isMenuOpen);
        navMenu.classList.toggle('active', this.isMenuOpen);
        
        // 防止背景滚动
        if (this.isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }

    // 销毁方法
    destroy() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
        }
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    const website = new RustyNightWebsite();
    
    // 页面卸载时清理
    window.addEventListener('beforeunload', () => {
        website.destroy();
    });
});

// 工具函数
const utils = {
    // 防抖函数
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // 节流函数
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    // 检测设备类型
    isMobile() {
        return window.innerWidth <= 768;
    },

    // 检测触摸支持
    isTouchDevice() {
        return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    }
};

// 性能监控
const performance = {
    init() {
        // 监控页面加载性能
        window.addEventListener('load', () => {
            if (typeof performance !== 'undefined' && performance.now) {
                const loadTime = performance.now();
                console.log(`页面加载时间: ${loadTime.toFixed(2)}ms`);
            }
        });

        // 监控滚动性能
        let scrollStartTime = 0;
        window.addEventListener('scroll', utils.throttle(() => {
            if (scrollStartTime === 0 && typeof performance !== 'undefined' && performance.now) {
                scrollStartTime = performance.now();
            }
        }, 16));
    }
};

// 初始化性能监控
performance.init();
/* ==========================================
   Alisa个人博客 - 交互脚本
   玻璃态动效与用户体验优化
   ========================================== */

// DOM加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    initializeScrollEffects();
    initializeSocialLinks();
    initializeAccessibility();
});

/* ==========================================
   页面加载动画
   ========================================== */

function initializeAnimations() {
    // 为所有元素添加初始隐藏状态
    const animatedElements = document.querySelectorAll('.about-card, .social-grid, .footer');
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
    });

    // 滚动时触发动画
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.style.transition = 'opacity 600ms ease-out, transform 600ms ease-out';
            }
        });
    }, observerOptions);

    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

/* ==========================================
   滚动效果
   ========================================== */

function initializeScrollEffects() {
    // 滚动指示器点击事件
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            const aboutSection = document.querySelector('.about');
            if (aboutSection) {
                aboutSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
        
        // 添加鼠标悬停效果
        scrollIndicator.style.cursor = 'pointer';
    }

    // 滚动时隐藏/显示滚动指示器
    let lastScrollTop = 0;
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollIndicator) {
            if (scrollTop > 100) {
                scrollIndicator.style.opacity = '0';
                scrollIndicator.style.transition = 'opacity 300ms ease-out';
            } else {
                scrollIndicator.style.opacity = '1';
            }
        }
        
        lastScrollTop = scrollTop;
    });
}

/* ==========================================
   社交链接增强
   ========================================== */

function initializeSocialLinks() {
    const socialLinks = document.querySelectorAll('.social-link');
    
    socialLinks.forEach(link => {
        // 添加点击波纹效果
        link.addEventListener('click', function(e) {
            createRippleEffect(e, this);
        });

        // 键盘导航支持
        link.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });

        // 添加焦点样式
        link.addEventListener('focus', function() {
            this.style.outline = '2px solid #007AFF';
            this.style.outlineOffset = '2px';
        });

        link.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });
}

/* ==========================================
   波纹效果
   ========================================== */

function createRippleEffect(event, element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(0, 122, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 600ms ease-out;
        pointer-events: none;
        z-index: 1;
    `;
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    // 清理波纹元素
    setTimeout(() => {
        if (ripple.parentNode) {
            ripple.parentNode.removeChild(ripple);
        }
    }, 600);
}

// 添加波纹动画样式
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

/* ==========================================
   无障碍功能
   ========================================== */

function initializeAccessibility() {
    // 跳转到主内容链接
    const skipLink = document.createElement('a');
    skipLink.href = '#about';
    skipLink.textContent = '跳转到主内容';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: #007AFF;
        color: white;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 1000;
        transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', () => {
        skipLink.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', () => {
        skipLink.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);

    // 为图片添加alt属性（如果缺失）
    const images = document.querySelectorAll('img:not([alt])');
    images.forEach(img => {
        img.alt = 'Alisa的个人头像';
    });

    // 为社交链接添加aria-label（如果缺失label）
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        const label = link.querySelector('.social-label');
        if (label && !link.getAttribute('aria-label')) {
            link.setAttribute('aria-label', `访问${label.textContent}`);
        }
    });

    // 检测用户偏好
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const prefersHighContrast = window.matchMedia('(prefers-contrast: high)');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

    // 根据用户偏好调整动画
    if (prefersReducedMotion.matches) {
        document.body.classList.add('reduced-motion');
    }

    if (prefersHighContrast.matches) {
        document.body.classList.add('high-contrast');
    }

    if (prefersDarkScheme.matches) {
        document.body.classList.add('dark-theme');
    }
}

/* ==========================================
   性能优化
   ========================================== */

// 防抖函数
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 节流函数
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// 优化的滚动监听
const optimizedScrollHandler = throttle(() => {
    // 滚动相关的性能敏感操作
    const scrollTop = window.pageYOffset;
    
    // 可选：添加滚动时的视差效果
    const hero = document.querySelector('.hero');
    if (hero && scrollTop < window.innerHeight) {
        const parallaxSpeed = 0.5;
        hero.style.transform = `translateY(${scrollTop * parallaxSpeed}px)`;
    }
}, 16); // 约60fps

window.addEventListener('scroll', optimizedScrollHandler);

/* ==========================================
   错误处理
   ========================================== */

// 全局错误处理
window.addEventListener('error', function(e) {
    console.warn('页面加载出现问题，但不影响基本功能:', e.error);
});

// Promise错误处理
window.addEventListener('unhandledrejection', function(e) {
    console.warn('异步操作失败，但不影响基本功能:', e.reason);
});

/* ==========================================
   调试信息（开发环境）
   ========================================== */

// 开发模式下显示调试信息
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    console.log('🎨 Alisa个人博客 - 玻璃态现代风格');
    console.log('✨ 设计系统已加载');
    console.log('🔧 交互功能已初始化');
    console.log('♿ 无障碍功能已启用');
}

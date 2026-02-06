// ========================================
// VALENTINE'S DAY WEBSITE - JAVASCRIPT
// For Devika ❤️ From Thejas
// ========================================

// Wait for DOM to Load
document.addEventListener('DOMContentLoaded', function() {
    initFloatingHearts();
    initCountdown();
    initQuiz();
    observeAnimations();
});

// ========================================
// FLOATING HEARTS BACKGROUND
// ========================================

function initFloatingHearts() {
    const container = document.getElementById('heartsContainer');
    const hearts = ['❤️', '💕', '💖', '💗', '💝', '💘', '🩷'];
    
    // Create initial hearts
    for (let i = 0; i < 20; i++) {
        createHeart(container, hearts);
    }
    
    // Continuously add hearts
    setInterval(() => {
        if (container.children.length < 30) {
            createHeart(container, hearts);
        }
    }, 2000);
}

function createHeart(container, hearts) {
    const heart = document.createElement('div');
    heart.className = 'floating-bg-heart';
    heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.left = Math.random() * 100 + '%';
    heart.style.animationDuration = (Math.random() * 10 + 10) + 's';
    heart.style.animationDelay = Math.random() * 5 + 's';
    heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
    
    container.appendChild(heart);
    
    // Remove heart after animation
    setTimeout(() => {
        heart.remove();
    }, 20000);
}

// ========================================
// NAVIGATION
// ========================================

function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
    
    const hamburger = document.querySelector('.hamburger');
    hamburger.classList.toggle('active');
}

// Close menu on link click (mobile)
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        const navLinks = document.querySelector('.nav-links');
        navLinks.classList.remove('active');
    });
});

// ========================================
// COUNTDOWN TIMER
// ========================================

function initCountdown() {
    // Set Valentine's Day 2026
    const valentinesDay = new Date('February 14, 2026 00:00:00').getTime();
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = valentinesDay - now;
        
        if (distance > 0) {
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            animateValue('days', days);
            animateValue('hours', hours);
            animateValue('minutes', minutes);
            animateValue('seconds', seconds);
        } else {
            // It's Valentine's Day!
            document.getElementById('days').textContent = '💕';
            document.getElementById('hours').textContent = 'It\'s';
            document.getElementById('minutes').textContent = 'Valentine\'s';
            document.getElementById('seconds').textContent = 'Day!';
        }
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

function animateValue(id, value) {
    const element = document.getElementById(id);
    const current = parseInt(element.textContent);
    
    if (current !== value) {
        element.style.transform = 'scale(1.2)';
        element.textContent = value;
        setTimeout(() => {
            element.style.transform = 'scale(1)';
        }, 200);
    }
}

// ========================================
// LOVE QUIZ
// ========================================

const quizData = [
    {
        question: "What makes Thejas smile the most? 😊",
        options: [
            "Seeing Devika happy",
            "Playing video games",
            "Eating pizza",
            "Watching movies"
        ],
        correct: 0
    },
    {
        question: "What does Thejas admire most about Devika? 💕",
        options: [
            "Her cooking skills",
            "Her dedication to nursing and caring nature",
            "Her fashion sense",
            "Her dancing skills"
        ],
        correct: 1
    },
    {
        question: "What's Thejas's dream date with Devika? 🌹",
        options: [
            "A fancy restaurant",
            "An adventure park",
            "A quiet sunset together, just talking",
            "A shopping spree"
        ],
        correct: 2
    },
    {
        question: "What does 'T & D' stand for on this website? 💝",
        options: [
            "Today & Dance",
            "True & Divine",
            "Thejas & Devika",
            "Together & Dedicated"
        ],
        correct: 2
    },
    {
        question: "What does Thejas want to say to Devika? 💖",
        options: [
            "Let's be friends",
            "You're my forever Valentine",
            "Let's study together",
            "Nice to meet you"
        ],
        correct: 1
    }
];

let currentQuestion = 0;
let score = 0;

function initQuiz() {
    showQuestion();
    document.getElementById('totalQ').textContent = quizData.length;
}

function showQuestion() {
    const quiz = quizData[currentQuestion];
    document.getElementById('currentQ').textContent = currentQuestion + 1;
    document.getElementById('question').textContent = quiz.question;
    
    const optionsContainer = document.getElementById('options');
    optionsContainer.innerHTML = '';
    
    quiz.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'option-btn';
        button.textContent = option;
        button.onclick = () => selectAnswer(index);
        optionsContainer.appendChild(button);
    });
    
    // Update progress bar
    const progress = ((currentQuestion + 1) / quizData.length) * 100;
    document.getElementById('progressBar').style.width = progress + '%';
}

function selectAnswer(selectedIndex) {
    const quiz = quizData[currentQuestion];
    const buttons = document.querySelectorAll('.option-btn');
    
    // Disable all buttons
    buttons.forEach((btn, index) => {
        btn.disabled = true;
        if (index === quiz.correct) {
            btn.classList.add('correct');
        } else if (index === selectedIndex) {
            btn.classList.add('wrong');
        }
    });
    
    if (selectedIndex === quiz.correct) {
        score++;
    }
    
    // Move to next question after delay
    setTimeout(() => {
        currentQuestion++;
        if (currentQuestion < quizData.length) {
            showQuestion();
        } else {
            showResult();
        }
    }, 1500);
}

function showResult() {
    document.getElementById('quizContainer').classList.add('hidden');
    document.getElementById('quizResult').classList.remove('hidden');
    
    const percentage = (score / quizData.length) * 100;
    let title, message;
    
    if (percentage === 100) {
        title = "Perfect Score! 💯💕";
        message = "You know Thejas perfectly! You two are truly meant to be! 💕";
    } else if (percentage >= 60) {
        title = "Amazing! 💖";
        message = "You know Thejas so well! Your bond is beautiful! 💗";
    } else {
        title = "Sweet Start! 💝";
        message = "Every day is a chance to know each other better! 💕";
    }
    
    document.getElementById('resultTitle').textContent = title;
    document.getElementById('resultMessage').textContent = `You got ${score} out of ${quizData.length} correct! ${message}`;
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    document.getElementById('quizContainer').classList.remove('hidden');
    document.getElementById('quizResult').classList.add('hidden');
    showQuestion();
}

// ========================================
// LOVE LETTER
// ========================================

function openLetter() {
    document.getElementById('envelope').classList.add('hidden');
    document.getElementById('letter').classList.remove('hidden');
}

function closeLetter() {
    document.getElementById('letter').classList.add('hidden');
    document.getElementById('envelope').classList.remove('hidden');
}

// ========================================
// PROPOSAL SECTION
// ========================================

function handleYes() {
    // Show celebration
    document.getElementById('celebration').classList.remove('hidden');
    document.getElementById('proposalButtons').classList.add('hidden');
    
    // Create confetti
    createConfetti();
    
    // Play celebration sound (if available)
    try {
        const audio = new Audio();
        audio.src = 'celebration.mp3';
        audio.play().catch(() => {});
    } catch (e) {}
}

function moveButton() {
    const noBtn = document.getElementById('noBtn');
    const container = document.querySelector('.proposal-buttons');
    
    const maxX = container.offsetWidth - noBtn.offsetWidth - 100;
    const maxY = 100;
    
    const randomX = Math.random() * maxX - maxX/2;
    const randomY = Math.random() * maxY - maxY/2;
    
    noBtn.style.transform = `translate(${randomX}px, ${randomY}px)`;
    
    // Change text after few attempts
    const attempts = parseInt(noBtn.dataset.attempts || 0) + 1;
    noBtn.dataset.attempts = attempts;
    
    if (attempts >= 3) {
        noBtn.querySelector('span:last-child').textContent = "Fine, I'll say yes! 💕";
        noBtn.onclick = handleYes;
    } else if (attempts >= 2) {
        noBtn.querySelector('span:last-child').textContent = "Can't escape love! 💗";
    }
}

function createConfetti() {
    const container = document.getElementById('confettiContainer');
    const confettiEmojis = ['💕', '💖', '💗', '❤️', '💝', '🎉', '✨', '🌹', '💘', '🩷'];
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confetti = document.createElement('span');
            confetti.className = 'confetti';
            confetti.textContent = confettiEmojis[Math.floor(Math.random() * confettiEmojis.length)];
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
            confetti.style.animationDelay = Math.random() * 0.5 + 's';
            container.appendChild(confetti);
            
            // Remove after animation
            setTimeout(() => confetti.remove(), 5000);
        }, i * 50);
    }
    
    // Continuous confetti
    setInterval(() => {
        for (let i = 0; i < 5; i++) {
            const confetti = document.createElement('span');
            confetti.className = 'confetti';
            confetti.textContent = confettiEmojis[Math.floor(Math.random() * confettiEmojis.length)];
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
            container.appendChild(confetti);
            setTimeout(() => confetti.remove(), 5000);
        }
    }, 2000);
}

// ========================================
// MUSIC TOGGLE
// ========================================

let isMusicPlaying = false;

function toggleMusic() {
    const music = document.getElementById('bgMusic');
    const icon = document.getElementById('musicIcon');
    
    if (isMusicPlaying) {
        music.pause();
        icon.textContent = '🎵';
        isMusicPlaying = false;
    } else {
        music.play().then(() => {
            icon.textContent = '🔊';
            isMusicPlaying = true;
        }).catch(() => {
            alert('Please add a love-song.mp3 file to enable music! 🎶');
        });
    }
}

// ========================================
// SCROLL ANIMATIONS
// ========================================

function observeAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-visible');
            }
        });
    }, {
        threshold: 0.1
    });
    
    // Observe elements
    document.querySelectorAll('.timeline-item, .reason-card, .gallery-item, .counter-card').forEach(el => {
        observer.observe(el);
    });
}

// ========================================
// SMOOTH SCROLL FOR NAVIGATION
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ========================================
// NAVBAR SCROLL EFFECT
// ========================================

window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 5px 30px rgba(255, 77, 109, 0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(255, 77, 109, 0.1)';
    }
});

// ========================================
// EASTER EGG - KONAMI CODE
// ========================================

const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            // Easter egg activated!
            alert('🎉 Secret unlocked! Thejas loves Devika to infinity! 💕∞');
            konamiIndex = 0;
            
            // Super confetti
            for (let i = 0; i < 100; i++) {
                setTimeout(() => {
                    const heart = document.createElement('div');
                    heart.textContent = '💕';
                    heart.style.cssText = `
                        position: fixed;
                        top: -50px;
                        left: ${Math.random() * 100}%;
                        font-size: ${Math.random() * 30 + 20}px;
                        z-index: 9999;
                        pointer-events: none;
                        animation: confettiFall ${Math.random() * 3 + 2}s linear forwards;
                    `;
                    document.body.appendChild(heart);
                    setTimeout(() => heart.remove(), 5000);
                }, i * 30);
            }
        }
    } else {
        konamiIndex = 0;
    }
});

// ========================================
// TYPING EFFECT FOR HERO SUBTITLE
// ========================================

window.addEventListener('load', () => {
    const subtitle = document.querySelector('.hero-subtitle');
    const originalText = subtitle.textContent;
    subtitle.textContent = '';
    
    let charIndex = 0;
    
    function typeText() {
        if (charIndex < originalText.length) {
            subtitle.textContent += originalText[charIndex];
            charIndex++;
            setTimeout(typeText, 50);
        }
    }
    
    setTimeout(typeText, 1000);
});

// ========================================
// PARALLAX EFFECT FOR HERO
// ========================================

window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const scrolled = window.scrollY;
    
    if (scrolled < window.innerHeight) {
        hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
        
        const heroContent = document.querySelector('.hero-content');
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        heroContent.style.opacity = 1 - (scrolled / 700);
    }
});

console.log('💕 Made with love for Devika by Thejas 💕');
console.log('🩺 To my future nurse - you already heal my heart! 👩‍⚕️');

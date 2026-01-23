/*
 * Modern Portfolio JavaScript
 * Handles dark/light mode, animations, particles, and hidden features
 */

(function() {
	'use strict';

	// Theme Management
	const ThemeManager = {
		init: function() {
			// Check for saved theme preference or default to dark
			const savedTheme = localStorage.getItem('theme') || 'dark';
			this.setTheme(savedTheme);
			this.initToggle();
		},

		setTheme: function(theme) {
			document.documentElement.setAttribute('data-theme', theme);
			localStorage.setItem('theme', theme);
			const toggle = document.getElementById('theme-toggle');
			if (toggle) {
				const isLight = theme === 'light';
				toggle.setAttribute('aria-pressed', isLight ? 'true' : 'false');

				const icon = document.querySelector('.theme-switch__icon');
				if (icon) icon.textContent = isLight ? '☾' : '☀';

				// Update thumb position via data attribute
				document.documentElement.toggleAttribute('data-theme-is-light', isLight);
			}
		},

		toggleTheme: function() {
			const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
			const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
			this.setTheme(newTheme);
			
			// Add transition effect
			document.body.style.transition = 'background-color 0.5s ease, color 0.5s ease';
			setTimeout(() => {
				document.body.style.transition = '';
			}, 500);
		},

		initToggle: function() {
			const toggle = document.getElementById('theme-toggle');
			if (toggle) {
				toggle.addEventListener('click', () => this.toggleTheme());
			}
		},
	};

	// Typing Animation
	const TypingAnimation = {
		init: function() {
			const texts = [
				'AI/ML + Cloud Technical Lead',
				'RAG + NLP + Agentic Systems',
				'AWS • Docker • Kubernetes',
				'Full‑Stack Developer',
				'Stevens CS (May 2026)'
			];
			let currentIndex = 0;
			let charIndex = 0;
			let isDeleting = false;
			const element = document.getElementById('typing-text');

			if (!element) return;

			function type() {
				const currentText = texts[currentIndex];
				
				if (isDeleting) {
					element.textContent = currentText.substring(0, charIndex - 1);
					charIndex--;
				} else {
					element.textContent = currentText.substring(0, charIndex + 1);
					charIndex++;
				}

				let typeSpeed = isDeleting ? 50 : 100;

				if (!isDeleting && charIndex === currentText.length) {
					typeSpeed = 2000; // Pause at end
					isDeleting = true;
				} else if (isDeleting && charIndex === 0) {
					isDeleting = false;
					currentIndex = (currentIndex + 1) % texts.length;
					typeSpeed = 500;
				}

				setTimeout(type, typeSpeed);
			}

			type();
		}
	};

	// Particle System
	const ParticleSystem = {
		init: function() {
			const container = document.getElementById('particles');
			if (!container) return;

			const particleCount = 50;
			const particles = [];

			for (let i = 0; i < particleCount; i++) {
				const particle = document.createElement('div');
				particle.className = 'particle';
				particle.style.left = Math.random() * 100 + '%';
				particle.style.top = Math.random() * 100 + '%';
				particle.style.animationDelay = Math.random() * 20 + 's';
				particle.style.animationDuration = (15 + Math.random() * 10) + 's';
				container.appendChild(particle);
				particles.push(particle);
			}
		}
	};

	// Scroll Animations
	const ScrollAnimations = {
		init: function() {
			const observerOptions = {
				threshold: 0.1,
				rootMargin: '0px 0px -50px 0px'
			};

			const observer = new IntersectionObserver((entries) => {
				entries.forEach(entry => {
					if (entry.isIntersecting) {
						entry.target.classList.add('fade-in-up');
						observer.unobserve(entry.target);
					}
				});
			}, observerOptions);

			// Observe all section cards and project cards
			document.querySelectorAll('.section-card, .project-card').forEach(el => {
				observer.observe(el);
			});
		}
	};

	// Easter Eggs & Hidden Features
	const EasterEggs = {
		init: function() {
			this.initKonamiCode();
			this.initSecretClick();
		},

		initKonamiCode: function() {
			const konamiCode = [
				'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
				'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
				'KeyB', 'KeyA'
			];
			let konamiIndex = 0;

			document.addEventListener('keydown', (e) => {
				if (e.code === konamiCode[konamiIndex]) {
					konamiIndex++;
					if (konamiIndex === konamiCode.length) {
						this.activateKonami();
						konamiIndex = 0;
					}
				} else {
					konamiIndex = 0;
				}
			});
		},

		activateKonami: function() {
			// Rainbow mode!
			document.body.style.animation = 'rainbow 3s linear infinite';
			const style = document.createElement('style');
			style.textContent = `
				@keyframes rainbow {
					0% { filter: hue-rotate(0deg); }
					100% { filter: hue-rotate(360deg); }
				}
			`;
			document.head.appendChild(style);
			
			setTimeout(() => {
				document.body.style.animation = '';
				style.remove();
			}, 10000);
		},

		initSecretClick: function() {
			// Triple click on hero image for surprise
			const heroImage = document.querySelector('.hero-image');
			if (heroImage) {
				let clickCount = 0;
				let clickTimer;

				heroImage.addEventListener('click', function() {
					clickCount++;
					
					if (clickCount === 1) {
						clickTimer = setTimeout(() => {
							clickCount = 0;
						}, 500);
					} else if (clickCount === 3) {
						clearTimeout(clickTimer);
						clickCount = 0;
						EasterEggs.showSurprise();
					}
				});
			}
		},

		showSurprise: function() {
			const messages = [
				'🎉 You found a hidden feature!',
				'💻 Keep coding!',
				'🚀 Thanks for exploring!',
				'⭐ You\'re awesome!'
			];
			const message = messages[Math.floor(Math.random() * messages.length)];
			
			const toast = document.createElement('div');
			toast.style.cssText = `
				position: fixed;
				top: 100px;
				right: 30px;
				background: var(--accent-gradient);
				color: white;
				padding: 20px 30px;
				border-radius: 12px;
				box-shadow: 0 8px 32px rgba(0,0,0,0.3);
				z-index: 10000;
				font-weight: 600;
				font-size: 16px;
				animation: slideIn 0.3s ease;
			`;
			toast.textContent = message;
			
			const style = document.createElement('style');
			style.textContent = `
				@keyframes slideIn {
					from { transform: translateX(400px); opacity: 0; }
					to { transform: translateX(0); opacity: 1; }
				}
			`;
			document.head.appendChild(style);
			
			document.body.appendChild(toast);
			
			setTimeout(() => {
				toast.style.animation = 'slideIn 0.3s ease reverse';
				setTimeout(() => {
					toast.remove();
					style.remove();
				}, 300);
			}, 3000);
		}
	};

	// Company Deck - Card Flip on Hover
	const CompanyDeck = {
		cards: [],
		currentIndex: 0,
		hoverTimeout: null,
		isHovering: false,

		init: function() {
			const deck = document.querySelector('.company-deck');
			if (!deck) return;

			this.cards = Array.from(document.querySelectorAll('.company-card'));
			if (this.cards.length === 0) return;

			// Set initial active card
			this.cards[0].classList.add('active');

			// Hover effect - shuffle to next card
			deck.addEventListener('mouseenter', () => {
				this.isHovering = true;
				this.startShuffle();
			});

			deck.addEventListener('mouseleave', () => {
				this.isHovering = false;
				this.stopShuffle();
			});

			// Touch support for mobile
			let touchStartTime = 0;
			deck.addEventListener('touchstart', () => {
				touchStartTime = Date.now();
			});

			deck.addEventListener('touchend', () => {
				const touchDuration = Date.now() - touchStartTime;
				if (touchDuration < 300) {
					this.flipToNext();
				}
			});
		},

		flipToNext: function() {
			// Remove active class from current card
			this.cards[this.currentIndex].classList.remove('active', 'next', 'prev');
			
			// Calculate next index
			this.currentIndex = (this.currentIndex + 1) % this.cards.length;
			
			// Add active class to next card with animation
			const nextCard = this.cards[this.currentIndex];
			nextCard.classList.remove('next', 'prev');
			nextCard.classList.add('active');
			
			// Update other cards
			this.cards.forEach((card, index) => {
				if (index !== this.currentIndex) {
					card.classList.remove('active', 'next', 'prev');
					if (index === (this.currentIndex + 1) % this.cards.length) {
						card.classList.add('next');
					} else {
						card.classList.add('prev');
					}
				}
			});
		},

		startShuffle: function() {
			// Initial flip after a short delay
			this.hoverTimeout = setTimeout(() => {
				if (this.isHovering) {
					this.flipToNext();
					// Continue shuffling while hovering
					this.shuffleInterval = setInterval(() => {
						if (this.isHovering) {
							this.flipToNext();
						} else {
							this.stopShuffle();
						}
					}, 2000); // Flip every 2 seconds while hovering
				}
			}, 500); // Initial delay of 500ms
		},

		stopShuffle: function() {
			if (this.hoverTimeout) {
				clearTimeout(this.hoverTimeout);
				this.hoverTimeout = null;
			}
			if (this.shuffleInterval) {
				clearInterval(this.shuffleInterval);
				this.shuffleInterval = null;
			}
		}
	};

	// Initialize everything when DOM is ready
	function init() {
		ThemeManager.init();
		TypingAnimation.init();
		ParticleSystem.init();
		ScrollAnimations.init();
		EasterEggs.init();
		CompanyDeck.init();
	}

	// Run on DOM ready
	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', init);
	} else {
		init();
	}

})();

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Functionality
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const navLinks = document.querySelector('.nav-links');
    const menuIcon = document.getElementById('menuIcon');
    
    // Create X icon element
    const closeIcon = document.createElement('i');
    closeIcon.className = 'fas fa-times';
    closeIcon.id = 'menuIconClose';
    closeIcon.style.display = 'none';
    mobileMenuBtn.appendChild(closeIcon);
    
    function handleResponsiveMenu() {
        if (window.innerWidth <= 768) {
            navLinks.style.display = 'none';
            mobileMenuBtn.style.display = 'block';
            
            mobileMenuBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                mobileMenu.classList.toggle('active');
                mobileMenuBtn.classList.toggle('active');
                
                // Toggle between three dots and X
                if (mobileMenu.classList.contains('active')) {
                    menuIcon.style.display = 'none';
                    closeIcon.style.display = 'inline-block';
                } else {
                    menuIcon.style.display = 'inline-block';
                    closeIcon.style.display = 'none';
                }
            });
            
            document.addEventListener('click', function(e) {
                if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                    mobileMenu.classList.remove('active');
                    mobileMenuBtn.classList.remove('active');
                    menuIcon.style.display = 'inline-block';
                    closeIcon.style.display = 'none';
                }
            });
            
            mobileMenu.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', function() {
                    mobileMenu.classList.remove('active');
                    mobileMenuBtn.classList.remove('active');
                    menuIcon.style.display = 'inline-block';
                    closeIcon.style.display = 'none';
                });
            });
        } else {
            navLinks.style.display = 'flex';
            mobileMenuBtn.style.display = 'none';
            mobileMenu.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
            menuIcon.style.display = 'inline-block';
            closeIcon.style.display = 'none';
        }
    }
    
    handleResponsiveMenu();
    window.addEventListener('resize', handleResponsiveMenu);

    // Quiz Implementation
    class Quiz {
        constructor(questions) {
            this.questions = questions;
            this.currentIndex = 0;
            this.score = 0;
            this.quizElement = document.getElementById('quiz');
            this.resultElement = document.getElementById('result');
        }

        renderQuestion() {
            this.quizElement.innerHTML = '';
            const currentQuestion = this.questions[this.currentIndex];
            const questionElement = document.createElement('div');
            questionElement.className = 'question active';
            questionElement.innerHTML = `
                <h3 style="color: var(--blue4); margin-bottom: 1rem;">${currentQuestion.question}</h3>
                <div class="options">
                    ${currentQuestion.options.map(option => `
                        <button data-correct="${option.correct}">${option.text}</button>
                    `).join('')}
                </div>
            `;
            this.quizElement.appendChild(questionElement);
            
            questionElement.querySelectorAll('button').forEach(button => {
                button.addEventListener('click', (e) => this.checkAnswer(e));
            });
        }

        checkAnswer(event) {
            const button = event.target;
            const correct = button.dataset.correct === 'true';
            
            button.style.background = correct ? 'var(--blue2)' : 'var(--pink1)';
            button.style.color = correct ? 'white' : '#5A5A5A';
            button.style.borderColor = correct ? 'var(--blue4)' : 'var(--pink1)';

            if (correct) this.score++;

            setTimeout(() => {
                this.currentIndex++;
                if (this.currentIndex < this.questions.length) {
                    this.renderQuestion();
                } else {
                    this.showResult();
                }
            }, 1000);
        }

        showResult() {
            this.quizElement.innerHTML = '';
            this.resultElement.innerHTML = `
                <h3 style="color: var(--pink1); margin: 2rem 0;">
                    Your Score: ${this.score}/${this.questions.length}
                </h3>
                <button onclick="location.reload()" 
                        style="background: var(--blue4); 
                               color: white;
                               padding: 1rem 2rem;
                               border: none;
                               border-radius: 2rem;
                               cursor: pointer;">
                    Restart Quiz
                </button>
            `;
        }
    }

    // Quiz Questions (10 programming questions)
    const quizQuestions = [
        {
            question: "What does HTML stand for?",
            options: [
                { text: "Hyper Text Markup Language", correct: true },
                { text: "Home Tool Markup Language", correct: false },
                { text: "Hyperlinks and Text Markup Language", correct: false }
            ]
        },
        {
            question: "Which language runs in a web browser?",
            options: [
                { text: "Java", correct: false },
                { text: "C", correct: false },
                { text: "JavaScript", correct: true }
            ]
        },
        {
            question: "What does CSS stand for?",
            options: [
                { text: "Creative Style Sheets", correct: false },
                { text: "Cascading Style Sheets", correct: true },
                { text: "Computer Style Sheets", correct: false }
            ]
        },
        {
            question: "Which of these is not a JavaScript framework?",
            options: [
                { text: "React", correct: false },
                { text: "Laravel", correct: true },
                { text: "Angular", correct: false }
            ]
        },
        
        {
            question: "How do you create a function in JavaScript?",
            options: [
                { text: "function = myFunction()", correct: false },
                { text: "function myFunction()", correct: true },
                { text: "create myFunction()", correct: false }
            ]
        },
        {
            question: "Which operator is used to assign a value to a variable?",
            options: [
                { text: "*", correct: false },
                { text: "=", correct: true },
                { text: "-", correct: false }
            ]
        },
        {
            question: "What will this return: Boolean(10 > 9)?",
            options: [
                { text: "NaN", correct: false },
                { text: "false", correct: false },
                { text: "true", correct: true }
            ]
        },
        {
            question: "Which event occurs when the user clicks on an HTML element?",
            options: [
                { text: "onchange", correct: false },
                { text: "onclick", correct: true },
                { text: "onmouseclick", correct: false }
            ]
        },
        {
            question: "How do you declare a JavaScript variable?",
            options: [
                { text: "variable carName;", correct: false },
                { text: "v carName;", correct: false },
                { text: "let carName;", correct: true }
            ]
        }
    ];

    // Initialize Quiz
    const myQuiz = new Quiz(quizQuestions);
    myQuiz.renderQuestion();

    // Joke API Integration
    document.getElementById('fetchJoke').addEventListener('click', fetchJoke);

    async function fetchJoke() {
        try {
            const response = await fetch('https://official-joke-api.appspot.com/random_joke');
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            displayJoke(data);
        } catch (error) {
            console.error('Error fetching joke:', error);
            document.getElementById('jokeContainer').innerHTML = 
                '<p>😅 Oops! Couldn\'t fetch a joke. Try again!</p>';
        }
    }

    function displayJoke(joke) {
        const jokeHTML = `
            <p style="margin-bottom: 0.5rem;"><strong>${joke.setup}</strong></p>
            <p style="color: var(--blue4);">${joke.punchline}</p>
        `;
        document.getElementById('jokeContainer').innerHTML = jokeHTML;
    }

    // Initial joke load
    fetchJoke();

    // Course Card Interactions
    document.querySelectorAll('.course-card').forEach(card => {
        card.addEventListener('click', (e) => {
            if (window.innerWidth > 768) { // Only flip on desktop
                e.preventDefault();
                card.classList.toggle('flipped');
            }
        });

        card.addEventListener('mousemove', (e) => {
            if (window.innerWidth > 768) { // Only apply hover effect on desktop
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                card.style.setProperty('--x', `${x}px`);
                card.style.setProperty('--y', `${y}px`);
            }
        });
    });
});
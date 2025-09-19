document.addEventListener('DOMContentLoaded', () => {
    const toggleTheme = document.getElementById('themeToggle');
    const html = document.documentElement;

    const savedTheme = localStorage.getItem('theme') || 'light';
    html.setAttribute('data-theme', savedTheme);
    updateIconTheme(savedTheme);

    toggleTheme.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateIconTheme(newTheme);
    });

    function updateIconTheme(theme){
        const icon = toggleTheme.querySelector('i');
        icon.classList.remove(theme === 'dark'? 'fa-sun' : 'fa-moon');
        icon.classList.add(theme === 'dark' ? 'fa-moon' : 'fa-sun');
    }

    const menuToggle = document.getElementById('menuToggle');
    const closeMenu = document.getElementById('closeMenu');
    const mobileMenu = document.getElementById('mobileMenu');

    if(menuToggle && closeMenu && mobileMenu)
    {
        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.remove('translate-x-full');
            document.body.classList.add('overflow-hidden');
        });

        closeMenu.addEventListener('click', () => {
            mobileMenu.classList.add('translate-x-full');
            document.body.classList.remove('overflow-hidden');
        });

        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('translate-x-full');
                document.body.classList.remove('overflow-hidden');
            });
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();

            const targetId = anchor.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement){
                const headeroffset = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headeroffset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    const contractForm = document.getElementById('contractForm');
    if(contractForm){
        contractForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            window.alert('Thank you for your submission, ' + name + '! We will get back to you at ' + email + '.');
            console.log('Form submitted:', { name, email, message });

            const button = contractForm.querySelector('button[type="submit"]');
            const originalText = button.textContent;
            button.textContent = 'Submitting...';
            button.classList.add('bg-green-500');

            contractForm.reset();

            setTimeout(() => {
                button.textContent = originalText;
                button.classList.remove('bg-green-500');
            }, 3000);
        });
    }

    const header = document.querySelector('header');
    const sections = document.querySelectorAll('section');
    function checkScroll(){
        if(window.scrollY > 0){
            header.classList.add('shadow-md');
            header.classList.remove('bg-transparent');
        }
        else {
            header.classList.remove('shadow-md');
            header.classList.add('bg-transparent');
        }

        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if(sectionTop < windowHeight * 0.85){
                section.classList.add('opacity-100', 'translate-y-0');
                section.classList.remove('opacity-0', 'translate-y-4');
            }
        });
    }
    window.addEventListener('scroll', checkScroll);
    checkScroll();

    // add intersection observer for sections
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting){
                entry.target.classList.add('opacity-100', 'translate-y-0');
                entry.target.classList.remove('opacity-0', 'translate-y-4');

                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Terminal animation

    const terminalContainer = document.getElementById('terminal-container');
    const terminalContent = terminalContainer.querySelector('.terminal-content');
    const commandSpan = terminalContent.querySelector('.command-text');

    if(terminalContainer && terminalContent && commandSpan){
        const commandText = "git clone https://github.com/Emon3469/ && cd Emon3469 && code.🗺 ヅ";

        let i = 0;
        const typeCommand = () => {
            if(i < commandText.length){
                commandSpan.textContent += commandText.charAt(i);
                i++;
                setTimeout(typeCommand, 50);
            }
            else {
                const cursor = document.createElement('span');
                cursor.className = 'inline-block w-2 h-5 bg-gray-900 dark:bg-white ml-1 animate-blink align-middle';
                terminalContent.appendChild(cursor);
            }
        };

        setTimeout(typeCommand, 1000);
    }
    else {
        const terminal = document.querySelector('.terminal-body');
        if(terminal){
            const commandText = document.querySelector('.command').textContent;
            terminal.querySelector('.command').textContent = '';

            let i = 0;
            const typeCommand = () => {
                if(i < commandSpan.length){
                    terminal.querySelector('.command').textContent += commandText.charAt(i);
                    i++;
                    setTimeout(typeCommand, 50);
                }
                else {
                    terminal.querySelector('.command').insertAdjacentHTML('afterend', '<span class="animate-blink">_</span>');
                }
            };

            setImmeout(typeCommand, 1000);
        }
    }

});
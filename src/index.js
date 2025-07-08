import './styles/styles.scss';
import './styles/menu.scss';
import './styles/swiper.scss';
import './styles/uslogui.scss';
import './styles/price.scss';
import './styles/footer.scss';
import './styles/feedback.scss';
import './styles/768.scss';
import './styles/1120.scss';
import './styles/menu-transitions.scss'
import Swiper from 'swiper'; // Import Swiper directly
import { Pagination, Navigation } from 'swiper/modules'; // Import required modules

// Helper functions to manage body scrolling
const disableBodyScroll = () => {
    // Store the current scroll position
    const scrollY = window.scrollY;
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';
    document.body.dataset.scrollY = scrollY;
};

const enableBodyScroll = () => {
    // Restore the scroll position
    const scrollY = document.body.dataset.scrollY || '0';
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    window.scrollTo(0, parseInt(scrollY || '0'));
    delete document.body.dataset.scrollY;
};

// Register Swiper modules
Swiper.use([Pagination, Navigation]);

document.addEventListener("DOMContentLoaded", () => {
    // Initialize all swipers
    const additionalInfo = document.getElementById('additional-info');
    const additionalInfoLabel = document.getElementById('additional-info-label');
    const lable1120 = document.getElementById('lable1120');
    const for76128 = document.getElementById('for76128');
    const lable768 = document.getElementById('lable768');
    if (additionalInfo) {
        additionalInfo.addEventListener('click', () => {
            if (additionalInfoLabel.textContent === " Читать далее") {
                lable1120.style.display = 'inline';
                lable768.style.display = 'inline';
                for76128.style.display = 'block';
                additionalInfoLabel.textContent = "Читать меньше";
            }
            else {
                lable1120.style.display = 'none';
                lable768.style.display = 'none';
                for76128.style.display = 'none';
                additionalInfoLabel.textContent = " Читать далее";
            }
        });
    };

    function initializeSwipers() {
        // Initialize any swiper with class 'mySwiper'
        const mySwipers = document.querySelectorAll('.mySwiper');
        if (mySwipers.length > 0) {
            mySwipers.forEach(element => {
                new Swiper(element, {
                    direction: 'horizontal',
                    slidesPerView: 'auto',
                    spaceBetween: 16, // Match margin-right from CSS
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true,
                    }
                });
            });
        }

        // Initialize services slider with specific settings for price slides
        const servicesSliders = document.querySelectorAll('.services-slider');
        if (servicesSliders.length > 0) {
            servicesSliders.forEach(element => {
                new Swiper(element, {
                    direction: 'horizontal',
                    slidesPerView: 'auto',
                    spaceBetween: 16,  // Changed from default to 16px
                    pagination: {
                        el: '.services-slider__pagination',
                        clickable: true,
                    },
                    slideToClickedSlide: true,
                    watchSlidesProgress: true,
                    on: {
                        init: function () {
                            // Force exact width for slides
                            const slides = element.querySelectorAll('.swiper-slide');
                            slides.forEach(slide => {
                                slide.style.width = '260px';
                            });
                        }
                    }
                });
            });
        }
    }

    // Call the function to initialize all swipers
    initializeSwipers();

    // Load initial menu for large screens
    const mediaQuery = window.matchMedia('(min-width: 1120px)');
    const myFeedbackDialog = document.getElementById('myFeedbackDialog');
    const myFeedbackDialog2 = document.getElementById('myFeedbackDialog2');
    const feedbackContainer = document.getElementById('feedbackContainer');
    const feedbackContainer2 = document.getElementById('feedbackContainer2');

    const handleMenuForLargeScreens = (e) => {
        if (e.matches) {
            document.body.style.position = 'static';

            // Screen size increased to ≥1120px
            const menuContainer = document.getElementById('menuContainer');

            // Always enable scrolling for desktop view
            enableBodyScroll();

            // Check if menu already exists
            if (menuContainer && menuContainer.innerHTML.trim() !== '') {
                const sideMenu = document.getElementById('sideMenu');

                if (sideMenu) {
                    // If menu exists but is closed, animate it open
                    if (!sideMenu.hasAttribute('open')) {
                        const dialogWrapper = document.getElementById('dialogWrapper');
                        if (dialogWrapper) {
                            dialogWrapper.classList.add('active');
                        }

                        // Use setTimeout to ensure the transition is visible
                        setTimeout(() => {
                            sideMenu.setAttribute('open', '');
                        }, 10);
                    }
                    // If menu is already open, do nothing
                } else {
                    // If sideMenu doesn't exist but container does, load menu
                    loadMenu(true, true);
                }
            } else {
                // If menu container doesn't exist or is empty, load it with animation
                loadMenu(true, true);
            }
        } else {
            // Screen size decreased to <1120px
            const menuContainer = document.getElementById('menuContainer');
            const sideMenu = document.getElementById('sideMenu');

            if (sideMenu) {
                // Start slide-out animation if menu is open
                if (sideMenu.hasAttribute('open')) {
                    const dialogWrapper = document.getElementById('dialogWrapper');

                    // Remove open attribute to trigger animation
                    sideMenu.removeAttribute('open');

                    // Wait for animation to complete before clearing the menu
                    setTimeout(() => {
                        if (dialogWrapper) {
                            dialogWrapper.classList.remove('active');
                        }

                        // Clear the menu container after animation completes
                        if (menuContainer) {
                            menuContainer.innerHTML = '';
                        }

                        // Enable scrolling when menu is removed
                        enableBodyScroll();
                    }, 300); // Match this with your CSS transition time
                } else {
                    // Menu is already closed, just clear it
                    if (menuContainer) {
                        menuContainer.innerHTML = '';
                    }
                }
            } else {
                // Fallback if elements don't exist
                if (menuContainer) {
                    menuContainer.innerHTML = '';
                }
            }
        }
    };



    const loadMenu = (isLargeScreen = false, autoOpen = true) => {
        console.log('Loading menu, isLargeScreen:', isLargeScreen, 'autoOpen:', autoOpen);
        fetch('menu.html')
            .then(response => {
                if (!response.ok) throw new Error("Network response was not ok");
                return response.text();
            })
            .then(html => {
                const menuContainer = document.getElementById('menuContainer');
                menuContainer.innerHTML = html;

                const sideMenu = document.getElementById('sideMenu');
                const dialogWrapper = document.getElementById('dialogWrapper');
                const feedbackChatButton = document.getElementById('feedbackChatButton');
                const feedbackButton = document.getElementById('feedbackButton');

                // Disable scrolling when menu opens (only for mobile)
                if (!isLargeScreen) {
                    disableBodyScroll();
                    document.body.style.position = 'fixed';
                }

                if (feedbackChatButton) {
                    feedbackChatButton.addEventListener('click', () => {
                        myFeedbackDialog2.style.boxShadow = '16px -52px 52px -1px rgba(14, 24, 80, 0.2)';
                        myFeedbackDialog2.showModal();
                        fetch('feedback2.html')
                            .then(response => {
                                if (!response.ok) throw new Error("Network response was not ok");
                                return response.text();
                            })
                            .then(feedback_html => {
                                feedbackContainer2.innerHTML = feedback_html;
                                const feedbckCacelbutton2 = document.getElementById('feedbckCacelbutton2');
                                if (feedbckCacelbutton2) {
                                    feedbckCacelbutton2.addEventListener('click', () => {
                                        myFeedbackDialog2.close();
                                        myFeedbackDialog.style.boxShadow = 'none';
                                        feedbckCacelbutton2.style.display = 'none';
                                    });
                                }
                            })
                            .catch(error => {
                                console.error("Error fetching feedback:", error);
                            });
                    });
                }

                if (feedbackButton) {
                    feedbackButton.addEventListener('click', () => {
                        myFeedbackDialog.style.boxShadow = '16px -52px 52px -1px rgba(14, 24, 80, 0.2)';
                        myFeedbackDialog.showModal();
                        fetch('feedback.html')
                            .then(response => {
                                if (!response.ok) throw new Error("Network response was not ok");
                                return response.text();
                            })
                            .then(feedback_html => {
                                feedbackContainer.innerHTML = feedback_html;
                                const feedbckCacelbutton = document.getElementById('feedbckCacelbutton');
                                if (feedbckCacelbutton) {
                                    feedbckCacelbutton.addEventListener('click', () => {
                                        myFeedbackDialog.close();
                                        myFeedbackDialog.style.boxShadow = 'none';
                                        feedbckCacelbutton.style.display = 'none';
                                    });
                                }
                            })
                            .catch(error => {
                                console.error("Error fetching feedback:", error);
                            });
                    });
                }


                if (!isLargeScreen) {
                    console.log('Setting up mobile menu');

                    // Set up event listeners for mobile menu
                    const closeBtn = document.getElementById('closeMenu');
                    if (closeBtn) {
                        closeBtn.addEventListener('click', () => {
                            // Slide out animation
                            sideMenu.removeAttribute('open');

                            // Wait for animation to complete before hiding backdrop
                            setTimeout(() => {
                                if (dialogWrapper) {
                                    dialogWrapper.classList.remove('active');
                                }
                                enableBodyScroll(); // Enable body scroll when menu closes
                            }, 300); // Match this with your CSS transition time
                        });
                    }

                    if (dialogWrapper) {
                        dialogWrapper.addEventListener('click', (e) => {
                            if (e.target === dialogWrapper) {
                                // Slide out animation
                                sideMenu.removeAttribute('open');

                                // Wait for animation to complete before hiding backdrop
                                setTimeout(() => {
                                    dialogWrapper.classList.remove('active');
                                    enableBodyScroll(); // Enable body scroll when menu closes
                                }, 300); // Match this with your CSS transition time
                            }
                        });
                    }
                }

                // Handle menu opening animation for both mobile and desktop
                if (autoOpen && sideMenu && dialogWrapper) {
                    console.log('Auto-opening menu with animation');

                    // First add the active class to show backdrop
                    dialogWrapper.classList.add('active');

                    // Use setTimeout to ensure the transition is visible
                    setTimeout(() => {
                        sideMenu.setAttribute('open', '');
                    }, 10);
                }
            })
            .catch(error => {
                console.error("Error fetching menu:", error);
                // Make sure to re-enable scrolling if there's an error
                enableBodyScroll();
            });
    };


    // Initial check for large screens
    if (mediaQuery.matches) {
        loadMenu(false, true);
    }

    // Listen for screen size changes
    mediaQuery.addEventListener('change', handleMenuForLargeScreens);

    // Handle menu button click for mobile
    const menuButton = document.getElementById('menuButton');
    const OpenButton768 = document.getElementById('OpenButton768');
    const openButtons = [OpenButton768, menuButton].filter(button => button !== null);
    openButtons.forEach(myButton => {
        myButton.addEventListener('click', () => {
            if (!mediaQuery.matches) {
                loadMenu();
            }
        });
    });
    // Load swiper content
    fetch('swiper.html')
        .then(response => response.text())
        .then(html => {
            const swiperContainer = document.getElementById('container-for-swiper');

            if (swiperContainer) {
                swiperContainer.innerHTML = html;
                const f_bodyimages = document.getElementById("f_body--images");
                // Initialize Swiper after content is loaded
                setTimeout(() => {
                    try {
                        const swiperElements = swiperContainer.querySelectorAll('.mySwiper');
                        swiperElements.forEach(element => {
                            if (!element.swiper) {
                                new Swiper(element, {
                                    slidesPerView: 'auto',
                                    spaceBetween: 14,
                                    pagination: {
                                        el: element.querySelector('.swiper-pagination'),
                                        clickable: true,
                                    },
                                    on: {
                                        init: function () {
                                            // Remove margin from active slide on init
                                            this.slides.forEach(slide => {
                                                if (slide.classList.contains('swiper-slide-active')) {
                                                    slide.style.marginRight = '0';
                                                }
                                            });
                                        },
                                    }
                                });

                            }
                        });
                    } catch (error) {
                        console.error('Error initializing Swiper:', error);
                    }
                }, 100);

                // Your existing code for click handlers
                const addition = document.getElementById("addition");
                const click = document.getElementById("click_footer");

                if (click) {
                    click.addEventListener("click", () => {
                        if (addition.textContent === "Показать все") {
                            f_bodyimages.style.height = "auto";
                            f_bodyimages.style.overflow = "auto";
                            addition.textContent = "Скрыть";
                        }
                        else {
                            f_bodyimages.style.height = "166px";
                            f_bodyimages.style.overflow = "hidden";
                            addition.textContent = "Показать все";
                        }
                    });
                }
            }
        })
        .catch(error => {
            console.error('Error loading swiper content:', error);
        });

    // Load uslogui content
    fetch('uslogui.html')
        .then(response => response.text())
        .then(html => {
            const usloguiContainer = document.getElementById('usloguiContent');
            if (usloguiContainer) {
                usloguiContainer.innerHTML = html;

                // Initialize Swiper after content is loaded
                setTimeout(() => {
                    try {
                        const swiperElements = usloguiContainer.querySelectorAll('.mySwiper');
                        swiperElements.forEach(element => {
                            if (!element.swiper) {
                                new Swiper(element, {
                                    slidesPerView: 'auto',
                                    a11y: { clicked: true },
                                    spaceBetween: 14,
                                    pagination: {
                                        el: element.querySelector('.swiper-pagination'),
                                        clickable: true,
                                    },
                                });
                            }
                        });
                    } catch (error) {
                        console.error('Error initializing uslogui Swiper:', error);
                    }
                }, 100);

                // Existing click handler code
                const addition = document.getElementById("addition2");
                const click = document.getElementById("click_footer2");
                const wrapper2 = document.getElementById("swiper-wrapper2");

                if (click && addition && wrapper2) {
                    click.addEventListener("click", () => {
                        if (addition.textContent === "Показать все") {
                            wrapper2.style.height = "auto";
                            wrapper2.style.overflow = "auto";
                            wrapper2.style.overflowX = "hidden";
                            addition.textContent = "Скрыть";
                        } else {
                            wrapper2.style.height = "172px";
                            wrapper2.style.overflow = "hidden";
                            addition.textContent = "Показать все";
                        }
                    });
                }
            }
        })
        .catch(error => {
            console.error('Error loading uslogui content:', error);
        });

    fetch('price.html')
        .then(response => response.text())
        .then(html => {
            const priceContainer = document.getElementById('priceContainer');
            if (priceContainer) {
                priceContainer.innerHTML = html;

                // Initialize Swiper for services-slider after content is loaded
                setTimeout(() => {
                    try {
                        const servicesSliders = priceContainer.querySelectorAll('.services-slider');
                        servicesSliders.forEach(element => {
                            if (!element.swiper) {
                                new Swiper(element, {
                                    slidesPerView: 'auto',
                                    spaceBetween: 14,
                                    pagination: {
                                        el: element.querySelector('.swiper-pagination'),
                                        clickable: true,
                                    },
                                });
                            }
                        });
                    } catch (error) {
                        console.error('Error initializing services-slider Swiper:', error);
                    }
                }, 100);
            }
        })
        .catch(error => {
            console.error('Error loading price content:', error);
        });

    fetch('footer.html')
        .then(response => response.text())
        .then(html => {
            const myFooter = document.getElementById('myFooter');
            if (myFooter) {
                myFooter.innerHTML = html;
            }
        })
        .catch(error => {
            console.error('Error loading footer content:', error);
        });

    // Function to handle responsive price section
    function handlePriceSection() {
        const mediaQuery = window.matchMedia('(min-width: 768px)');

        function togglePriceView() {
            const servicesSlider = document.querySelector('.services-slider');
            const priceTable = document.querySelector('.price-table');

            if (servicesSlider && priceTable) {
                if (mediaQuery.matches) {
                    // Desktop view
                    servicesSlider.style.display = 'none';
                    priceTable.style.display = 'table';
                } else {
                    // Mobile view
                    servicesSlider.style.display = 'flex';
                    priceTable.style.display = 'none';

                    // Reinitialize Swiper for mobile
                    initializeServiceSlider();
                }
            }
        }

        // Initialize on load
        togglePriceView();

        // Listen for screen size changes
        mediaQuery.addEventListener('change', togglePriceView);
    }

    // Function to initialize service slider
    function initializeServiceSlider() {
        const servicesSliders = document.querySelectorAll('.services-slider');
        if (servicesSliders.length > 0 && window.innerWidth < 768) {
            servicesSliders.forEach(element => {
                // Check if Swiper is already initialized
                if (element.swiper) {
                    element.swiper.update();
                } else {
                    new Swiper(element, {
                        direction: 'horizontal',
                        slidesPerView: 'auto',
                        spaceBetween: 16,
                        pagination: {
                            el: '.services-slider__pagination',
                            clickable: true,
                        },
                    });
                }
            });
        }
    }

    // Call the function to handle responsive price section
    handlePriceSection();
});

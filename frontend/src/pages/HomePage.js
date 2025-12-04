const HomePage = () => {
  
    return (
        <div className="page-container">
        
        <section className="hero-section" style={{ backgroundImage: `url('/img/hero-homepage.gif')` }}>
            <h2>fashion&beauty diary</h2>
        </section>

        <h2 className="section-title">LAST POSTS</h2>

        <section className="instagram-articles-section">
            <a
            href="https://www.instagram.com/cyberangeldiary/"
            target="_blank"
            rel="noopener noreferrer"
            title="Open CyberAngelDiary on Instagram"
            >
            <img
                src="/img/thetennisprincess.png"
                alt="The Tennis Princess Article"
            />
            </a>

            <a
            href="https://www.instagram.com/cyberangeldiary/"
            target="_blank"
            rel="noopener noreferrer"
            title="Open CyberAngelDiary on Instagram"
            >
            <img
                src="/img/moodboard_thetennisprincess.png"
                alt="The Tennis Princess Moodboard"
            />
            </a>
        </section>


        <h2 className="section-title">FOLLOW US ON INSTAGRAM</h2>
        
        <section className="instagram-feed-section">
            <a
                href="https://www.instagram.com/cyberangeldiary/"
                target="_blank"
                rel="noopener noreferrer"
            >
                <img src="/img/blog_post1.jpg" alt="Instagram 1" />
            </a>

            <a
                href="https://www.instagram.com/cyberangeldiary/"
                target="_blank"
                rel="noopener noreferrer"
            >
                <img src="/img/blog_post2.jpg" alt="Instagram 2" />
            </a>

            <a
                href="https://www.instagram.com/cyberangeldiary/"
                target="_blank"
                rel="noopener noreferrer"
            >
                <img src="/img/blog_post3.jpg" alt="Instagram 3" />
            </a>

            <a
                href="https://www.instagram.com/cyberangeldiary/"
                target="_blank"
                rel="noopener noreferrer"
            >
                <img src="/img/blog_post4.jpg" alt="Instagram 4" />
            </a>

            <a
                href="https://www.instagram.com/cyberangeldiary/"
                target="_blank"
                rel="noopener noreferrer"
            >
                <img src="/img/blog_post5.jpg" alt="Instagram 5" />
            </a>

            <a
                href="https://www.instagram.com/cyberangeldiary/"
                target="_blank"
                rel="noopener noreferrer"
            >
                <img src="/img/blog_post6.jpg" alt="Instagram 6" />
            </a>
        </section>

        </div>
    );
};

export default HomePage;
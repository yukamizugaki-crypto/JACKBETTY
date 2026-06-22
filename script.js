document.addEventListener('DOMContentLoaded', () => {


    // ==========================================
    // 2. 🎶 背景の浮遊音符パーティクル
    // ==========================================
    const particleContainer = document.getElementById('particle-container');
    const musicNotes = ['🎵', '🎶', '🎤', '🎸', '🌟', '✨', '🥂', '🍹'];
    
    if (particleContainer) {
        const particleCount = 35; 
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
            // ランダムに音符やキラキラを選択
            const note = musicNotes[Math.floor(Math.random() * musicNotes.length)];
            particle.textContent = note;
            
            const posX = Math.random() * 100;           // 横位置(vw)
            const delay = Math.random() * 10;           // 遅延秒
            const duration = Math.random() * 8 + 8;      // 浮遊にかける時間（遅め・ゆったり）
            const size = Math.random() * 0.8 + 0.8;      // スケール
            
            particle.style.left = `${posX}vw`;
            particle.style.animationDelay = `${delay}s`;
            particle.style.animationDuration = `${duration}s`;
            particle.style.transform = `scale(${size})`;
            
            particleContainer.appendChild(particle);
        }
    }

    // ==========================================
    // 3. 👀 スクロールフェードイン（IntersectionObserver）
    // ==========================================
    const faders = document.querySelectorAll('.fade-in');
    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    // ==========================================
    // 4. 🎠 ギャラリーカルーセルの無限ループ化
    // ==========================================
    const track = document.getElementById('carouselTrack');
    
    if (track) {
        // カルーセル内の画像を複製して並べ、途切れない無限ループにする
        const cloneContent = track.innerHTML;
        track.innerHTML += cloneContent;
    }

    // ==========================================
    // 5. 🍔 ハンバーガーメニューの開閉制御
    // ==========================================
    const menuToggle = document.getElementById('menuToggle');
    const menuOverlay = document.getElementById('menuOverlay');
    const menuLinks = document.querySelectorAll('.menu-link');

    if (menuToggle && menuOverlay) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('open');
            menuOverlay.classList.toggle('open');
            // メニュー開閉時に背後のスクロールを制御
            document.body.style.overflow = menuOverlay.classList.contains('open') ? 'hidden' : '';
        });

        // リンククリック時にメニューを閉じる
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('open');
                menuOverlay.classList.remove('open');
                document.body.style.overflow = '';
            });
        });
    }

});

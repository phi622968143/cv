        function toggleExperience(section) {
            const experienceSection = document.getElementById(section);
            if (experienceSection.classList.contains('show')) {
                experienceSection.classList.remove('show');  // 隐藏经验
            } else {
                experienceSection.classList.add('show');  // 显示经验
            }
        }

        function toggleAudio(audioId, imgId, rotate = false) {
            let audio = document.getElementById(audioId);
            let img = document.getElementById(imgId);

            if (audio.paused) {
                audio.play();
                if (rotate) img.classList.add("playing");
            } else {
                audio.pause();
                audio.currentTime = 0;
                if (rotate) img.classList.remove("playing");
            }
        }

        // 監聽點擊事件
        document.getElementById("playAudio").addEventListener("click", function() {
            toggleAudio("audio", "playAudio", true);
        });

        document.getElementById("playSunset").addEventListener("click", function() {
            toggleAudio("music", "playSunset", true);
        });

        // 讓 h2 滑鼠懸停時變大
        document.querySelectorAll("h2").forEach(h2 => {
            h2.addEventListener("mouseover", () => h2.style.fontSize = "1.8em");
            h2.addEventListener("mouseout", () => h2.style.fontSize = "1.5em");
        });
        //cat gallery
        document.addEventListener('DOMContentLoaded', () => {
            const gallery = document.getElementById('catGallery');
            const images = Array.from(gallery.getElementsByTagName('img'));
            const totalImages = images.length;
            const prevBtn = document.getElementById('prevBtn');
            const nextBtn = document.getElementById('nextBtn');
        
            let currentIndex = 1; // 預設從真正的第一張開始
            let isTransitioning = false; // 防止動畫未完成時多次點擊
        
            // **1. 複製第一張和最後一張，放到兩端**
            const firstClone = images[0].cloneNode(true);
            const lastClone = images[totalImages - 1].cloneNode(true);
            gallery.appendChild(firstClone);
            gallery.insertBefore(lastClone, images[0]);
        
            // **2. 更新圖片陣列**
            const updatedImages = Array.from(gallery.getElementsByTagName('img'));
            const updatedTotalImages = updatedImages.length;
        
            // **3. 設定 gallery 的寬度**
            gallery.style.width = `${updatedTotalImages * 100}%`;
            gallery.style.display = 'flex';
        
            // **4. 初始化圖片大小**
            updatedImages.forEach(img => {
                img.style.width = `${100 / updatedTotalImages}%`;
                img.style.flexShrink = '0';
            });
        
            // **5. 設定初始位置**
            gallery.style.transition = 'none';
            gallery.style.transform = `translateX(-${(currentIndex * 100) / updatedTotalImages}%)`;
        
            function updatePosition(useTransition = true) {
                if (useTransition) {
                    gallery.style.transition = 'transform 0.5s ease';
                } else {
                    gallery.style.transition = 'none';
                }
                gallery.style.transform = `translateX(-${(currentIndex * 100) / updatedTotalImages}%)`;
            }
        
            function nextImage() {
                if (isTransitioning) return;
                isTransitioning = true;
                currentIndex++;
                updatePosition();
        
                // **6. 監聽過渡結束，瞬間跳回**
                gallery.addEventListener('transitionend', function resetPosition() {
                    if (currentIndex === updatedTotalImages - 1) {
                        currentIndex = 1;
                        updatePosition(false); // 取消動畫，瞬間跳轉
                    }
                    isTransitioning = false;
                    gallery.removeEventListener('transitionend', resetPosition);
                });
            }
        
            function prevImage() {
                if (isTransitioning) return;
                isTransitioning = true;
                currentIndex--;
                updatePosition();
        
                // **7. 監聽過渡結束，瞬間跳回**
                gallery.addEventListener('transitionend', function resetPosition() {
                    if (currentIndex === 0) {
                        currentIndex = updatedTotalImages - 2;
                        updatePosition(false); // 取消動畫，瞬間跳轉
                    }
                    isTransitioning = false;
                    gallery.removeEventListener('transitionend', resetPosition);
                });
            }
        
            nextBtn.addEventListener('click', nextImage);
            prevBtn.addEventListener('click', prevImage);
        });

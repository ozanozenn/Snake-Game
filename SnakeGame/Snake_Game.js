/*Canvas websitesinde grafik, animasyon, geçişler, web tabanlı oyunlar
   hazırlayabileceğiniz HTML5 ve Javascript tabanlı web aracıdır.*/
   //Oyun için gerekli olan main classımızı oluşturuyoruz.
   class SnakeGame { 
    constructor() {
      this.canvas = document.getElementById('game'); //Construcktor üzerinden canvsı id ile buluyoruz.
      this.context = this.canvas.getContext('2d'); //Canvas üzerinden contextimizi alıyoruz iki boyutlu bir çizim yapacağımız için 2d yazıyoruz.
      
      // Basılan tuşları algılıyoruz:
      document.addEventListener('keydown', this.onKeyPress.bind(this));
    }
    
    StartGame() {
      // Yeni oyun için ilk değer atamaları:
      this.Position_X = this.Position_Y = 10; //yılanın x ve y kordinatı
      this.Apple_x = this.Apple_y = 5;// elmanın kordinatı
      this.snake_size = 5; //yılanın boyu
      this.trail = [];// yılanın kordinatlarını tutuğumuz array
      this.gridSize = this.tileCount = 20; //alanımızı 20 ye 20 ye böldüğümüz fonksiyon
      this.velocityX = this.velocityY = 0; //ivmenin hangi yönde olduğunu takip edeceğimiz değişken
      
      // Oyun döngümüz çalışmaya başlıyor.
      // Her saniyede 15 kez çalışacak, yani 15 FPS olacak.
      this.timer = setInterval(this.loop.bind(this), 1000 / 12); //kısaca bu kısım yılanın hızını ayarlıyoruz
    }
    reset() {
      // Oyun göngüsünü durdur:
      clearInterval(this.timer); //clearInterval fonksiyonu ile timer ı sıfırlıyoruz.
      
      // Oyun ile alakalı detayları en baştaki haline geri döndür:
     this.StartGame();
    }
  
    // Oyun döngümüz. Her saniye 15 kez çağırılacak
    loop() {
      // Matematiksel hesaplamaları yap:
      this.update();
      
      // Sonrasında ekrana çizimi gerçekleştir
      this.draw();
    }
  
    update() {
      // Yılanın başını X ve Y koordinat düzleminde gittiği yöne hareket ettir
      this.Position_X += this.velocityX;
      this.Position_Y += this.velocityY;
  
      // Yılan sağ, sol, üst ya da alt kenarlara değdi mi?
      // Değdiyse ekranın diğer tarafından devam ettir
      if (this.Position_X < 0) {
        this.Position_X = this.tileCount - 1;
      } else if (this.Position_Y < 0) {
        this.Position_Y = this.tileCount - 1;
      } else if (this.Position_X > this.tileCount - 1) {
        this.Position_X = 0;
      } else if (this.Position_Y > this.tileCount - 1) {
        this.Position_Y = 0;
      }
  
      // Yılan kendi üstüne bastıp basmadığını kontrol ediyoruz.
      this.trail.forEach(t => {
        if (this.Position_X === t.Position_X && this.Position_Y === t.Position_Y) {
          // Bastıysa game over olduk, oyunu resetle:
          this.reset();
        }
      });
  
      // Yılanın başını yılanın herbir karesini hafızada tuttuğumuz diziye koy
      this.trail.push({Position_X: this.Position_X, Position_Y: this.Position_Y});
  
      // Yılanın başını hareket ettirdik, şimdi kuyruktan kırpmamız gerekiyor
      while (this.trail.length > this.snake_size) {
        this.trail.shift();
      }
  
      // Yılan elma yedi mi?
      if (this.Apple_x === this.Position_X && this.Apple_y === this.Position_Y) {
        // Yediyse yılanın boyutu uzat:
        this.snake_size++;
        
        // Ekrana yeni bir elma koymak lazım.
        // Rasgele X ve Y koordinatı üretip oraya elmayı atalım:
        this.Apple_x = Math.floor(Math.random() * this.tileCount);
        this.Apple_y = Math.floor(Math.random() * this.tileCount);
      }
    }
    
  
   
    // Ekrana çizim gerçekleştiriyor:
    draw() {
      // İlk olarak siyah arkaplanı çiziyoruz
      this.context.fillStyle = 'black';
      this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
  
      // Skoru ekranın sol üst köşesine yazdıralım
      this.context.fillStyle = 'white';
      this.context.font = '20px Arial';
      this.context.fillText(this.snake_size - 5, 20, 40);
  
      // Yılanın herbir karesini sırayla ekrana çiziyoruz
      this.context.fillStyle = 'blue';
      this.trail.forEach(t => {
        this.context.fillRect(t.Position_X * this.gridSize, t.Position_Y * this.gridSize, this.gridSize - 3, this.gridSize - 3);
      });
  
      // Son olarak elmayı ekrana çizdirelim:
      this.context.fillStyle = 'red';
      this.context.fillRect(this.Apple_x * this.gridSize, this.Apple_y * this.gridSize, this.gridSize - 3, this.gridSize - 3);
    }
  
    // Kullanıcı websayfasındayken bir tuşa bastığında çağrılıyor:
    onKeyPress(e) {
      // Kullanıcı sol oka bastı, yılan sağa gitmiyorsa yılanı sola döndür
      if (e.keyCode === 37 && this.velocityX !== 1) {
        this.velocityX = -1;
        this.velocityY = 0;
      }
      
      // Kullanıcı yukarı oka bastı, yılan aşağı gitmiyorsa yılanı yukarı döndür
      else if (e.keyCode === 38 && this.velocityY !== 1) {
        this.velocityX = 0;
        this.velocityY = -1;
      }
      
      // Kullanıcı sağ oka bastı, yılan sola gitmiyorsa yılanı sağa döndür
      else if (e.keyCode === 39 && this.velocityX !== -1) {
        this.velocityX = 1;
        this.velocityY = 0;
      }
      
      // Kullanıcı aşağı oka bastı, yılan yukarı gitmiyorsa yılanı aşağı döndür
      if (e.keyCode === 40 && this.velocityY !== -1) {
        this.velocityX = 0
        this.velocityY = 1;
      }
    }
  }
  
  // Yeni oyun oluştur:
  const game = new SnakeGame();
    
  // Sayfa yüklendiğinde oyunu oynanabilir hale getir:
  window.onload = () => game.StartGame();
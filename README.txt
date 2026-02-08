===============================================================
PROJE RAPORU: CineGold Premium
===============================================================

1. PROJE ADI VE KONUSU:
---------------------------------------------------------------
Proje Adı: CineGold Premium - Çok Dilli Sinema Bilet Rezervasyon Sistemi.
Konu: React.js kütüphanesi kullanılarak geliştirilmiş; Türkçe, İngilizce ve Arapça dil desteği sunan, modern arayüze sahip, kullanıcıların vizyondaki filmleri inceleyebildiği, üye olup giriş yapabildiği ve dinamik olarak koltuk seçip bilet rezervasyonu yapabildiği interaktif bir web uygulamasıdır.

2. KULLANILAN COMPONENT'LER VE MODÜLER YAPI:
---------------------------------------------------------------
Proje, "Modüler Programlama" prensibine uygun olarak aşağıdaki temel bileşenlere (Components) ayrılmıştır:

1.  App.js: 
    Uygulamanın ana kök bileşenidir. Sayfa yönlendirmelerini (Routing) ve ana yapılandırmayı yönetir.

2.  LanguageContext.js (Context API): 
    Uygulama genelinde çoklu dil desteğini (TR/EN/AR) yöneten ve veriyi tüm bileşenlere dağıtan yapıdır.

3.  Navbar.js: 
    - Mobil uyumlu (Responsive).
    - Dinamik dil değiştirme özelliği.
    - Anlık film arama (Real-time Search) fonksiyonu.
    - Kullanıcı oturum durumuna göre değişen menü yapısı.

4.  Home.js: 
    Ana sayfa bileşenidir. Vitrin (Hero Slider) ve filmlerin kategorilere göre listelendiği alandır.

5.  MovieCard.js: 
    Her bir filmin özet bilgilerini gösteren, "Favorilere Ekle" ve "Detay" butonlarını içeren tekrar kullanılabilir kart yapısıdır.

6.  MovieDetails.js: 
    - Seçilen filmin detaylı bilgilerini ve fragmanını gösterir.
    - Dinamik koltuk seçimi ve bilet satın alma (Checkout) işlemleri burada gerçekleşir.

7.  MyTickets.js: 
    Kullanıcının satın aldığı biletleri listelediği ve dilerse iptal edebildiği (Delete işlemi) sayfadır.

8.  MyFavorites.js: 
    Kullanıcının beğendiği filmleri sakladığı kişisel liste sayfasıdır.

9.  Login.js / Signup.js: 
    Kullanıcı giriş ve kayıt işlemlerinin form validasyonları ile yapıldığı sayfalardır.

10. Footer.js: 
    Site alt bilgi alanı, sosyal medya linkleri ve kurumsal bağlantılar.

3. TEKNİK ŞARTLARIN SAĞLANMASI:
---------------------------------------------------------------
Bu proje, ders yönergesinde belirtilen teknik gereksinimleri şu şekilde karşılamaktadır:

A) React Component Yapısı:
   Proje tek bir dosya yerine anlamlı parçalara (Navbar, Footer, Card vb.) bölünerek yönetilebilir hale getirilmiştir.

B) Props, State ve Context Kullanımı:
   - useState: Anlık verilerin (Seçilen koltuk, arama metni, bilet listesi) yönetimi için kullanıldı.
   - Props: Bileşenler arası veri aktarımı (Parent -> Child) sağlandı.
   - Context API: Dil verisinin (Language) tüm uygulama ağacında "Prop Drilling" olmadan taşınması sağlandı.

C) Event Yönetimi:
   - onClick: Buton tıklamaları (Bilet alma, Silme, Dil değiştirme).
   - onChange: Form girişleri (Arama kutusu, Login formu).
   - onSubmit: Form gönderme işlemleri.

D) API ve Veri Kaynağı (Mock API):
   - Proje, harici bir backend bağımlılığını ortadan kaldırmak için yerel JSON dosyaları (movies.json, cinemas.json) kullanır.
   - Veriler "Fetch API" ve "useEffect" hook'u kullanılarak asenkron olarak çekilir. Bu sayede proje Vercel vb. platformlarda sunucu kurulumu gerektirmeden çalışabilir.

E) CRUD İşlemleri (Create, Read, Update, Delete):
   - Read: Film listesi ve Biletlerim sayfasının görüntülenmesi.
   - Create: Yeni bilet satın alma ve Kullanıcı kaydı.
   - Delete: Satın alınan biletin iptal edilerek listeden silinmesi.
   - Update: Dil seçimi ile arayüz metinlerinin güncellenmesi.

F) Tasarım ve Responsive Yapı:
   - React-Bootstrap kütüphanesi kullanılarak Grid sistemi (Row/Col) kurulmuştur.
   - Mobil cihazlarda menü (Hamburger Menu) ve kart yapıları otomatik olarak ekran boyutuna uyum sağlar.

4. KURULUM VE ÇALIŞTIRMA ADIMLARI:
---------------------------------------------------------------
Projeyi kendi bilgisayarınızda çalıştırmak için aşağıdaki adımları izleyebilirsiniz:

Adım 1: Gerekli paketlerin yüklenmesi
Proje klasöründe terminali açın ve şu komutu yazın:
> npm install

Adım 2: Uygulamanın başlatılması
Paketler yüklendikten sonra uygulamayı başlatmak için:
> npm start

Not: Veriler "public" klasöründeki yerel JSON dosyalarından çekildiği için ekstra bir API sunucusu başlatmaya gerek yoktur. Tarayıcınızda http://localhost:3000 adresine giderek projeyi test edebilirsiniz.
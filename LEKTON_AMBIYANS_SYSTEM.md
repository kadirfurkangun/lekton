# LEKTON — AMBİYANS SİSTEMİ MASTER DOKÜMANI

## MİMARİ MANTIK

Kitap okuma modunda (bizim render ettiğimiz HTML metin) aktif olur.
Belge modunda (orijinal PDF canvas) ambiyans kapalıdır.

Sistem 5 katmandan oluşur — bunlar üst üste bindirilir:

```
DUYGU MODU     → ana renk, partikül, ses
+ ORTAM        → arka plan dokusu, partikül tipi
+ ZAMAN        → ışık tonu, karanlık seviyesi
+ TEMPO        → animasyon hızı, geçiş süresi
+ FİZİKSEL HİS → renk sıcaklığı, yoğunluk
= ÖZGÜN AMBİYANS KOMBİNASYONU
```

---

## KOORDİNAT SİSTEMİ (Otomatik Geçiş Hesabı)

Her duygu modu 3 boyutlu koordinata sahiptir:

```
valans:    -100 (negatif/acı) → +100 (pozitif/keyifli)
uyarılma:  -100 (sakin/yavaş) → +100 (enerjik/kaotik)
karanlık:  -100 (aydınlık)    → +100 (karanlık/ağır)
```

Geçiş süresi iki mod arasındaki Öklid mesafesine göre hesaplanır:

```javascript
mesafe = Math.sqrt(
  Math.pow(v1 - v2, 2) +
  Math.pow(u1 - u2, 2) +
  Math.pow(k1 - k2, 2)
)

// mesafe → geçiş süresi
// 0-50   → 0.5s  (çok yakın, fark etmez)
// 50-100 → 1.5s  (yakın)
// 100-180 → 3s   (orta)
// 180-250 → 5s   (uzak)
// 250+   → 7s    (zıt kutuplar, uzun erime)
```

Hard cut durumları (mesafeye bakılmaksızın 0.3s):
- Şok anı
- Ölüm anı
- Patlayan öfke başlangıcı
- Donmuş an

---

## SCROLL / SAYFA MODU

**Sayfa sayfa mod:**
- Sayfa değişince analiz tetiklenir
- Geçiş süresi koordinat mesafesine göre

**Scroll mod (web):**
- Ekran ortasındaki paragraf = aktif paragraf
- Parmak/mouse durduğunda 1.5s debounce → analiz
- Scroll sırasında ambiyans dondurulur

**Scroll mod (mobil — ileride):**
- Parmak ekranda = dondur
- Parmak kalktı + 1s = güncelle
- Partikül sayısı: masaüstü 200 → mobil 50

---

## DUYGU MOD KATALOĞU

Her mod şu parametrelere sahip:

```
id, label, koordinat [valans, uyarılma, karanlık],
renkler { arkaplan, vurgu, nabız },
partikül { tip, hız, yön, yoğunluk, boyut },
ses { tip, frekans, ritim, yoğunluk },
ışık { seviye, kontrast, odak },
geçiş { hardCut: bool }
```

---

### ÖFKE

#### ofke_soguk — Soğuk Öfke
```json
{
  "id": "ofke_soguk",
  "label": "Soğuk Öfke",
  "koordinat": [-75, -20, 70],
  "renkler": {
    "arkaplan": "#0d0000",
    "vurgu": "#8b0000",
    "nabız": "#cc0000"
  },
  "partikul": {
    "tip": "kor",
    "hiz": 0.3,
    "yon": "yukari_yavas",
    "yogunluk": 15,
    "boyut": "kucuk"
  },
  "ses": {
    "tip": "cello_tek_nota",
    "frekans": "dusuk",
    "ritim": "nabiz_yavas",
    "yogunluk": 0.4
  },
  "isik": {
    "seviye": 0.2,
    "kontrast": "yuksek",
    "odak": "merkez_damar"
  }
}
```

#### ofke_patlayan — Patlayan Öfke
```json
{
  "id": "ofke_patlayan",
  "label": "Patlayan Öfke",
  "koordinat": [-85, 95, 65],
  "renkler": {
    "arkaplan": "#1a0000",
    "vurgu": "#ff1a00",
    "nabız": "#ff6600"
  },
  "partikul": {
    "tip": "kor_savrulan",
    "hiz": 8,
    "yon": "her_yon",
    "yogunluk": 180,
    "boyut": "karisik"
  },
  "ses": {
    "tip": "distortion",
    "frekans": "yuksek_karisik",
    "ritim": "duzensiz",
    "yogunluk": 0.9
  },
  "isik": {
    "seviye": 0.7,
    "kontrast": "maksimum",
    "odak": "flas_ani"
  },
  "gecis": { "hardCut": true }
}
```

#### ofke_intikam — İntikam
```json
{
  "id": "ofke_intikam",
  "label": "İntikam",
  "koordinat": [-70, 30, 80],
  "renkler": {
    "arkaplan": "#050005",
    "vurgu": "#6600cc",
    "nabız": "#9900ff"
  },
  "partikul": {
    "tip": "ok_tek_yon",
    "hiz": 1.5,
    "yon": "hedefe_dogru",
    "yogunluk": 20,
    "boyut": "uzun_ince"
  },
  "ses": {
    "tip": "drone_derin",
    "frekans": "cok_dusuk",
    "ritim": "metronom",
    "yogunluk": 0.5
  },
  "isik": {
    "seviye": 0.15,
    "kontrast": "yuksek",
    "odak": "tek_nokta_merkez"
  }
}
```

#### ofke_kutsal — Kutsal Öfke
```json
{
  "id": "ofke_kutsal",
  "label": "Kutsal Öfke",
  "koordinat": [-50, 60, 30],
  "renkler": {
    "arkaplan": "#0a0500",
    "vurgu": "#cc8800",
    "nabız": "#ffcc00"
  },
  "partikul": {
    "tip": "alev_dili",
    "hiz": 2,
    "yon": "yukari_dikey",
    "yogunluk": 40,
    "boyut": "orta_uzun"
  },
  "ses": {
    "tip": "koro_derin",
    "frekans": "orta_yukari",
    "ritim": "yukselen",
    "yogunluk": 0.7
  },
  "isik": {
    "seviye": 0.5,
    "kontrast": "orta",
    "odak": "yukari_altin"
  }
}
```

#### ofke_caresiz — Çaresiz Öfke
```json
{
  "id": "ofke_caresiz",
  "label": "Çaresiz Öfke",
  "koordinat": [-80, 50, 60],
  "renkler": {
    "arkaplan": "#0f0505",
    "vurgu": "#993333",
    "nabız": "#cc4444"
  },
  "partikul": {
    "tip": "duvara_carpan",
    "hiz": 4,
    "yon": "rastgele_geri_donen",
    "yogunluk": 60,
    "boyut": "kucuk_orta"
  },
  "ses": {
    "tip": "nefes_titrek",
    "frekans": "orta",
    "ritim": "duzensiz_hizlanan",
    "yogunluk": 0.6
  },
  "isik": {
    "seviye": 0.25,
    "kontrast": "orta",
    "odak": "titreyen"
  }
}
```

#### ofke_bastirilan — Bastırılmış Öfke
```json
{
  "id": "ofke_bastirilan",
  "label": "Bastırılmış Öfke",
  "koordinat": [-65, -30, 55],
  "renkler": {
    "arkaplan": "#080808",
    "vurgu": "#550000",
    "nabız": "#880000"
  },
  "partikul": {
    "tip": "damar_titreyen",
    "hiz": 0.1,
    "yon": "yerinde_titreme",
    "yogunluk": 8,
    "boyut": "ince_uzun"
  },
  "ses": {
    "tip": "ugultu_dusuk",
    "frekans": "cok_dusuk",
    "ritim": "nabiz_baskili",
    "yogunluk": 0.3
  },
  "isik": {
    "seviye": 0.1,
    "kontrast": "dusuk",
    "odak": "ic_damar"
  }
}
```

#### ofke_nefret — Nefret
```json
{
  "id": "ofke_nefret",
  "label": "Nefret",
  "koordinat": [-90, -10, 90],
  "renkler": {
    "arkaplan": "#030003",
    "vurgu": "#330000",
    "nabız": "#660000"
  },
  "partikul": {
    "tip": "duman_agir",
    "hiz": 0.2,
    "yon": "yukari_agir",
    "yogunluk": 10,
    "boyut": "buyuk_bulanik"
  },
  "ses": {
    "tip": "sessizlik_agir",
    "frekans": "sub_bass",
    "ritim": "nabiz_yok_sadece_agirlik",
    "yogunluk": 0.2
  },
  "isik": {
    "seviye": 0.05,
    "kontrast": "minimum",
    "odak": "yok"
  }
}
```

---

### KORKU

#### korku_beklenti — Beklenti Korkusu
```json
{
  "id": "korku_beklenti",
  "label": "Beklenti Korkusu",
  "koordinat": [-50, -40, 70],
  "renkler": {
    "arkaplan": "#050510",
    "vurgu": "#1a1a4a",
    "nabız": "#3333aa"
  },
  "partikul": {
    "tip": "toz_asili",
    "hiz": 0.05,
    "yon": "havada_asili",
    "yogunluk": 12,
    "boyut": "cok_kucuk"
  },
  "ses": {
    "tip": "nefes_tutulmus",
    "frekans": "orta_dusuk",
    "ritim": "nabiz_yavas_giderek_hizlanan",
    "yogunluk": 0.35
  },
  "isik": {
    "seviye": 0.15,
    "kontrast": "yuksek",
    "odak": "uzaktan_bir_isik"
  }
}
```

#### korku_panik — Panik
```json
{
  "id": "korku_panik",
  "label": "Panik",
  "koordinat": [-60, 90, 75],
  "renkler": {
    "arkaplan": "#050510",
    "vurgu": "#ffffff",
    "nabız": "#aaaaff"
  },
  "partikul": {
    "tip": "flas_beyaz",
    "hiz": 10,
    "yon": "her_yon_ani",
    "yogunluk": 150,
    "boyut": "kucuk_keskin"
  },
  "ses": {
    "tip": "kalp_hizli",
    "frekans": "yuksek_orta",
    "ritim": "cok_hizli_duzensiz",
    "yogunluk": 0.8
  },
  "isik": {
    "seviye": 0.6,
    "kontrast": "maksimum_flas",
    "odak": "her_yer"
  },
  "gecis": { "hardCut": true }
}
```

#### korku_varoluşsal — Varoluşsal Korku
```json
{
  "id": "korku_varoluşsal",
  "label": "Varoluşsal Korku",
  "koordinat": [-55, -60, 95],
  "renkler": {
    "arkaplan": "#000000",
    "vurgu": "#050510",
    "nabız": "#0a0a20"
  },
  "partikul": {
    "tip": "yildiz_sonen",
    "hiz": 0.02,
    "yon": "icine_cekilen",
    "yogunluk": 5,
    "boyut": "kucuk_uzak"
  },
  "ses": {
    "tip": "boşluk_sessizligi",
    "frekans": "sub_bass_cok_uzak",
    "ritim": "yok",
    "yogunluk": 0.1
  },
  "isik": {
    "seviye": 0.02,
    "kontrast": "yok",
    "odak": "yok_her_yer_karanlik"
  }
}
```

#### korku_travma — Travma Korkusu
```json
{
  "id": "korku_travma",
  "label": "Travma / Flashback",
  "koordinat": [-65, -50, 60],
  "renkler": {
    "arkaplan": "#0a0a0a",
    "vurgu": "#cccccc",
    "nabız": "#ffffff"
  },
  "partikul": {
    "tip": "film_tanesi",
    "hiz": 0.0,
    "yon": "yerinde_titreme",
    "yogunluk": 30,
    "boyut": "kucuk_granul"
  },
  "ses": {
    "tip": "beyaz_gurultu",
    "frekans": "tum_frekans_esit",
    "ritim": "statik",
    "yogunluk": 0.25
  },
  "isik": {
    "seviye": 0.3,
    "kontrast": "soluk",
    "odak": "donmus_an"
  }
}
```

#### korku_paranoya — Paranoya
```json
{
  "id": "korku_paranoya",
  "label": "Paranoya",
  "koordinat": [-60, 20, 75],
  "renkler": {
    "arkaplan": "#050808",
    "vurgu": "#003322",
    "nabız": "#005533"
  },
  "partikul": {
    "tip": "golge_kayan",
    "hiz": 0.8,
    "yon": "kenarlarda_kayan",
    "yogunluk": 20,
    "boyut": "belirsiz_buyuk"
  },
  "ses": {
    "tip": "fisiltı_belirsiz",
    "frekans": "orta",
    "ritim": "duzensiz_ani_duraksama",
    "yogunluk": 0.3
  },
  "isik": {
    "seviye": 0.12,
    "kontrast": "orta",
    "odak": "kenarlarda_golge"
  }
}
```

---

### ÜZÜNTÜ

#### uzuntu_melankolik — Melankolik Hüzün
```json
{
  "id": "uzuntu_melankolik",
  "label": "Melankolik Hüzün",
  "koordinat": [-40, -50, 45],
  "renkler": {
    "arkaplan": "#050810",
    "vurgu": "#2233aa",
    "nabız": "#4455cc"
  },
  "partikul": {
    "tip": "yagmur_yavas",
    "hiz": 1.2,
    "yon": "asagi_hafif_capraz",
    "yogunluk": 40,
    "boyut": "ince_uzun"
  },
  "ses": {
    "tip": "piyano_tek_el",
    "frekans": "orta_dusuk",
    "ritim": "yavas_duraksamali",
    "yogunluk": 0.45
  },
  "isik": {
    "seviye": 0.2,
    "kontrast": "dusuk_yumusak",
    "odak": "mavi_sis"
  }
}
```

#### uzuntu_kayip — Kayıp Acısı
```json
{
  "id": "uzuntu_kayip",
  "label": "Kayıp Acısı",
  "koordinat": [-70, -40, 65],
  "renkler": {
    "arkaplan": "#060608",
    "vurgu": "#222233",
    "nabız": "#333355"
  },
  "partikul": {
    "tip": "yaprak_dusen",
    "hiz": 0.6,
    "yon": "asagi_agir",
    "yogunluk": 25,
    "boyut": "orta"
  },
  "ses": {
    "tip": "viyola_agit",
    "frekans": "dusuk",
    "ritim": "agir_soluk",
    "yogunluk": 0.5
  },
  "isik": {
    "seviye": 0.12,
    "kontrast": "dusuk",
    "odak": "aşağı_çeken"
  }
}
```

#### uzuntu_yalnizlik — Yalnızlık
```json
{
  "id": "uzuntu_yalnizlik",
  "label": "Yalnızlık",
  "koordinat": [-45, -65, 55],
  "renkler": {
    "arkaplan": "#050810",
    "vurgu": "#0a1525",
    "nabız": "#1a2a40"
  },
  "partikul": {
    "tip": "tek_nokta_uzak",
    "hiz": 0.02,
    "yon": "uzakta_sabit",
    "yogunluk": 3,
    "boyut": "cok_kucuk_uzak"
  },
  "ses": {
    "tip": "ruzgar_uzak",
    "frekans": "dusuk_orta",
    "ritim": "gelen_giden",
    "yogunluk": 0.2
  },
  "isik": {
    "seviye": 0.08,
    "kontrast": "yok_gibi",
    "odak": "uzakta_tek_isik"
  }
}
```

#### uzuntu_cokus — Çöküş
```json
{
  "id": "uzuntu_cokus",
  "label": "Çöküş / Umutsuzluk",
  "koordinat": [-85, -70, 85],
  "renkler": {
    "arkaplan": "#020202",
    "vurgu": "#080808",
    "nabız": "#0f0f0f"
  },
  "partikul": {
    "tip": "sonen_partikul",
    "hiz": 0.01,
    "yon": "asagi_kayboluyor",
    "yogunluk": 5,
    "boyut": "kucuk_soluyor"
  },
  "ses": {
    "tip": "sessizlik_mutlak",
    "frekans": "yok",
    "ritim": "yok",
    "yogunluk": 0.05
  },
  "isik": {
    "seviye": 0.03,
    "kontrast": "yok",
    "odak": "yok"
  }
}
```

#### uzuntu_ozlem — Özlem
```json
{
  "id": "uzuntu_ozlem",
  "label": "Özlem / Nostalji",
  "koordinat": [-30, -35, 30],
  "renkler": {
    "arkaplan": "#0f0a05",
    "vurgu": "#7a5a30",
    "nabız": "#aa8850"
  },
  "partikul": {
    "tip": "toz_altin",
    "hiz": 0.3,
    "yon": "yukari_yavas_dagilan",
    "yogunluk": 20,
    "boyut": "kucuk_parlak"
  },
  "ses": {
    "tip": "melodi_uzak_eski",
    "frekans": "orta",
    "ritim": "yavas_nostaljik",
    "yogunluk": 0.4
  },
  "isik": {
    "seviye": 0.3,
    "kontrast": "sepia_yumusak",
    "odak": "altin_sis"
  }
}
```

#### uzuntu_depresif — Depresif Boşluk
```json
{
  "id": "uzuntu_depresif",
  "label": "Depresif Boşluk",
  "koordinat": [-60, -80, 50],
  "renkler": {
    "arkaplan": "#080808",
    "vurgu": "#111111",
    "nabız": "#1a1a1a"
  },
  "partikul": {
    "tip": "yok_neredeyse",
    "hiz": 0.0,
    "yon": "yok",
    "yogunluk": 0,
    "boyut": "yok"
  },
  "ses": {
    "tip": "beyaz_gurultu_cok_uzak",
    "frekans": "tum_esit_zayif",
    "ritim": "yok",
    "yogunluk": 0.08
  },
  "isik": {
    "seviye": 0.06,
    "kontrast": "yok",
    "odak": "duzluk"
  }
}
```

---

### NEŞE

#### nese_cosku — Coşku
```json
{
  "id": "nese_cosku",
  "label": "Coşku",
  "koordinat": [85, 90, -70],
  "renkler": {
    "arkaplan": "#0a0800",
    "vurgu": "#ffaa00",
    "nabız": "#ffcc44"
  },
  "partikul": {
    "tip": "kivircim_yukari",
    "hiz": 7,
    "yon": "yukari_patlayan",
    "yogunluk": 160,
    "boyut": "karisik_parlak"
  },
  "ses": {
    "tip": "orkestra_yukselen",
    "frekans": "genis_spektrum",
    "ritim": "hizli_ritmik",
    "yogunluk": 0.8
  },
  "isik": {
    "seviye": 0.8,
    "kontrast": "yuksek_parlak",
    "odak": "her_yer_aydinlik"
  }
}
```

#### nese_huzur — Huzur
```json
{
  "id": "nese_huzur",
  "label": "Huzur",
  "koordinat": [70, -60, -75],
  "renkler": {
    "arkaplan": "#050f0a",
    "vurgu": "#2a6a4a",
    "nabız": "#4a9a6a"
  },
  "partikul": {
    "tip": "atesboceleri",
    "hiz": 0.4,
    "yon": "rastgele_yavas_salinan",
    "yogunluk": 18,
    "boyut": "kucuk_parlayan"
  },
  "ses": {
    "tip": "doga_sesi",
    "frekans": "orta",
    "ritim": "nefes_gibi",
    "yogunluk": 0.35
  },
  "isik": {
    "seviye": 0.35,
    "kontrast": "yumusak",
    "odak": "yesil_altin_sis"
  }
}
```

#### nese_zafer — Zafer
```json
{
  "id": "nese_zafer",
  "label": "Zafer",
  "koordinat": [80, 70, -50],
  "renkler": {
    "arkaplan": "#080600",
    "vurgu": "#cc9900",
    "nabız": "#ffdd00"
  },
  "partikul": {
    "tip": "altin_fiskirma",
    "hiz": 5,
    "yon": "yukari_fiskiran",
    "yogunluk": 100,
    "boyut": "orta_parlak"
  },
  "ses": {
    "tip": "fanfar_guclu",
    "frekans": "yuksek_genis",
    "ritim": "ritmik_yukselen",
    "yogunluk": 0.85
  },
  "isik": {
    "seviye": 0.7,
    "kontrast": "yuksek",
    "odak": "yukari_altin"
  }
}
```

#### nese_aydinlanma — Aydınlanma
```json
{
  "id": "nese_aydinlanma",
  "label": "Aydınlanma / Anlayış Anı",
  "koordinat": [75, 20, -80],
  "renkler": {
    "arkaplan": "#050508",
    "vurgu": "#ffffcc",
    "nabız": "#ffffff"
  },
  "partikul": {
    "tip": "isik_genisleme",
    "hiz": 0.5,
    "yon": "merkezden_dis",
    "yogunluk": 30,
    "boyut": "kucuk_parlak_iz"
  },
  "ses": {
    "tip": "tek_nota_rezonans",
    "frekans": "yuksek_temiz",
    "ritim": "tek_vurus_uzun_rezonans",
    "yogunluk": 0.5
  },
  "isik": {
    "seviye": 0.9,
    "kontrast": "merkez_parlak_kenar_karanlik",
    "odak": "merkezden_dis_isik"
  }
}
```

---

### AŞK

#### ask_gerilim — Romantik Gerilim
```json
{
  "id": "ask_gerilim",
  "label": "Romantik Gerilim",
  "koordinat": [40, 30, 20],
  "renkler": {
    "arkaplan": "#0f0508",
    "vurgu": "#aa2255",
    "nabız": "#dd4488"
  },
  "partikul": {
    "tip": "birbirine_cekilen",
    "hiz": 0.8,
    "yon": "merkeze_yaklasan_uzaklasan",
    "yogunluk": 25,
    "boyut": "kucuk_orta"
  },
  "ses": {
    "tip": "piyano_yavas_gerilimli",
    "frekans": "orta",
    "ritim": "nabiz_bekleyis",
    "yogunluk": 0.4
  },
  "isik": {
    "seviye": 0.25,
    "kontrast": "orta_sicak",
    "odak": "pembe_sis"
  }
}
```

#### ask_sehvet — Şehvet
```json
{
  "id": "ask_sehvet",
  "label": "Şehvet / Arzu",
  "koordinat": [30, 50, 40],
  "renkler": {
    "arkaplan": "#0f0300",
    "vurgu": "#aa3300",
    "nabız": "#dd5500"
  },
  "partikul": {
    "tip": "duman_sicak",
    "hiz": 0.6,
    "yon": "yukari_kivrilarak",
    "yogunluk": 20,
    "boyut": "buyuk_yumusak"
  },
  "ses": {
    "tip": "bas_nabiz",
    "frekans": "dusuk_sicak",
    "ritim": "yavas_nabiz",
    "yogunluk": 0.55
  },
  "isik": {
    "seviye": 0.2,
    "kontrast": "dusuk_sicak",
    "odak": "kirmizi_amber_sis"
  }
}
```

#### ask_kavusma — Kavuşma
```json
{
  "id": "ask_kavusma",
  "label": "Kavuşma",
  "koordinat": [85, 40, -40],
  "renkler": {
    "arkaplan": "#080500",
    "vurgu": "#cc8800",
    "nabız": "#ffbb33"
  },
  "partikul": {
    "tip": "altin_yukselen",
    "hiz": 2,
    "yon": "yukari_genisleyen",
    "yogunluk": 50,
    "boyut": "kucuk_parlak"
  },
  "ses": {
    "tip": "keman_yukselen",
    "frekans": "orta_yuksek",
    "ritim": "yukselen_dolu",
    "yogunluk": 0.65
  },
  "isik": {
    "seviye": 0.6,
    "kontrast": "sicak_yuksek",
    "odak": "altin_merkez"
  }
}
```

#### ask_ayrilik — Ayrılık Acısı
```json
{
  "id": "ask_ayrilik",
  "label": "Ayrılık Acısı",
  "koordinat": [-60, -30, 55],
  "renkler": {
    "arkaplan": "#080510",
    "vurgu": "#442255",
    "nabız": "#664488"
  },
  "partikul": {
    "tip": "yaprak_dusen_yavas",
    "hiz": 0.5,
    "yon": "asagi_hafif_savrulan",
    "yogunluk": 20,
    "boyut": "orta"
  },
  "ses": {
    "tip": "keman_agit",
    "frekans": "orta_dusuk",
    "ritim": "agir_titrek",
    "yogunluk": 0.5
  },
  "isik": {
    "seviye": 0.15,
    "kontrast": "dusuk_mor",
    "odak": "mor_gri_sis"
  }
}
```

#### ask_yasak — Yasak Aşk
```json
{
  "id": "ask_yasak",
  "label": "Yasak Aşk",
  "koordinat": [10, 40, 60],
  "renkler": {
    "arkaplan": "#080005",
    "vurgu": "#880033",
    "nabız": "#aa0044"
  },
  "partikul": {
    "tip": "manyetik_itme_cekme",
    "hiz": 1.2,
    "yon": "yaklasip_uzaklasan",
    "yogunluk": 30,
    "boyut": "orta"
  },
  "ses": {
    "tip": "piyano_yanlis_nota",
    "frekans": "orta_gerilimli",
    "ritim": "duzensiz_nabiz",
    "yogunluk": 0.45
  },
  "isik": {
    "seviye": 0.18,
    "kontrast": "yuksek_karanlik",
    "odak": "kirmizi_mor_baskili"
  }
}
```

---

### ORTAM KATMANI

```json
{
  "ortamlar": {
    "orman_gunduz":    { "dokü": "yaprak_filtre", "renk_tonu": "+yesil_sicak", "ses_katman": "kuslar_hafif" },
    "orman_gece":      { "doku": "karanlik_agac", "renk_tonu": "+koyu_yesil",  "ses_katman": "bobrek_uzak" },
    "okyanus_sakin":   { "doku": "su_yuzey",      "renk_tonu": "+mavi_derin",  "ses_katman": "dalga_yavas" },
    "okyanus_firtina": { "doku": "kaotik_su",     "renk_tonu": "+gri_mavi",    "ses_katman": "firtina" },
    "sehir_gece":      { "doku": "isik_yansima",  "renk_tonu": "+mor_sari",    "ses_katman": "sehir_uzak" },
    "ev_sicak":        { "doku": "tahta_doku",    "renk_tonu": "+amber_sicak", "ses_katman": "odun_atesi" },
    "zindan":          { "doku": "tas_nemli",     "renk_tonu": "+gri_yesil",   "ses_katman": "damlayan_su" },
    "coel_gunduz":     { "doku": "kum_doku",      "renk_tonu": "+sari_turuncu","ses_katman": "ruzgar_kuru" },
    "dag_kar":         { "doku": "kar_doku",      "renk_tonu": "+mavi_beyaz",  "ses_katman": "ruzgar_sert" }
  }
}
```

---

### ZAMAN KATMANI

```json
{
  "zamanlar": {
    "gece":           { "karanlık_katsayi": 1.4, "renk_kayma": "-sicaklik_20" },
    "gunduz":         { "karanlık_katsayi": 0.6, "renk_kayma": "+sicaklik_15" },
    "safak":          { "karanlık_katsayi": 0.8, "renk_kayma": "+turuncu_pembe" },
    "alacakaranlik":  { "karanlık_katsayi": 1.1, "renk_kayma": "+mor_turuncu" },
    "belirsiz":       { "karanlık_katsayi": 1.0, "renk_kayma": "degismez" }
  }
}
```

---

### TEMPO KATMANI

```json
{
  "tempolar": {
    "yavas":    { "animasyon_hiz": 0.4, "partikul_hiz_katsayi": 0.5, "ses_ritim": "agir" },
    "orta":     { "animasyon_hiz": 1.0, "partikul_hiz_katsayi": 1.0, "ses_ritim": "normal" },
    "hizli":    { "animasyon_hiz": 2.5, "partikul_hiz_katsayi": 2.0, "ses_ritim": "hizli" },
    "donmus":   { "animasyon_hiz": 0.0, "partikul_hiz_katsayi": 0.0, "ses_ritim": "yok" }
  }
}
```

---

### FİZİKSEL HİS KATMANI

```json
{
  "fiziksel_his": {
    "sicak":   { "renk_sicaklik": +30, "partikul_opaklık": 1.2 },
    "soguk":   { "renk_sicaklik": -30, "partikul_opaklık": 0.8, "mavi_kayma": +20 },
    "boguc":   { "partikul_yogunluk": 1.5, "sis_katman": true },
    "kuru":    { "partikul_yogunluk": 0.6, "keskinlik": +20 },
    "ruzgar":  { "partikul_yon_sapma": 30, "hiz_artis": 1.4 }
  }
}
```

---

## BLOK TESPİT ALGORİTMASI

```javascript
// Kitap ilk yüklenince arka planda çalışır
async function kitabiTara(sayfalar) {
  const skorlar = []
  
  for (const sayfa of sayfalar) {
    const metin = sayfa.metin
    const hash = md5(metin)
    
    // Önbellekte var mı?
    if (onbellek[hash]) {
      skorlar.push(onbellek[hash])
      continue
    }
    
    // Analiz et
    const skor = await analizEt(metin) // HuggingFace veya keyword
    onbellek[hash] = skor
    skorlar.push(skor)
  }
  
  // Blokları tespit et
  return bloklariCikar(skorlar)
}

function bloklariCikar(skorlar) {
  const bloklar = []
  let mevcutBlok = { baslangic: 0, mod: skorlar[0] }
  
  for (let i = 1; i < skorlar.length; i++) {
    const mesafe = koordinatMesafesi(skorlar[i-1], skorlar[i])
    
    if (mesafe > 80) { // Yeni blok eşiği
      bloklar.push({ ...mevcutBlok, bitis: i-1 })
      mevcutBlok = { baslangic: i, mod: skorlar[i] }
    }
  }
  
  bloklar.push({ ...mevcutBlok, bitis: skorlar.length - 1 })
  return bloklar
}
```

---

## CURSOR PROMPT

Aşağıdaki metni Cursor'a ver — olduğu gibi kopyala yapıştır:

---

```
Sen Lekton okuma uygulamasının Ambiyans Motoru'nu yazacaksın.
Referans olarak LEKTON_AMBIYANS_SYSTEM.md dosyasını kullan.
Bu dosyada tüm sistem mimarisi, mod kataloğu ve parametreler mevcut.

Yapacakların sırasıyla:

1. src/lib/emotionTree.js
   LEKTON_AMBIYANS_SYSTEM.md'deki tüm mod JSON'larını
   tek bir JavaScript objesi olarak export et.
   Her modun id, label, koordinat, renkler, partikul, ses, isik
   alanları eksiksiz olacak.

2. src/lib/ambianceEngine.js
   - koordinatMesafesi(mod1, mod2) fonksiyonu
     Öklid mesafesi hesapla, geçiş süresini döndür
   - gecisHesapla(mod1, mod2) fonksiyonu
     hardCut varsa 0.3s, yoksa mesafeye göre süre
   - sayfaAnalizEt(metin) fonksiyonu
     Önce Zustand önbelleğini kontrol et (hash ile)
     Sonra HuggingFace sentiment API'ye gönder
     Sonucu koordinata dönüştür, en yakın modu bul
     Debounce: 1500ms
   - kitabiTara(sayfalar) fonksiyonu
     Tüm kitabı arka planda tara, blokları çıkar
     Blok eşiği: koordinat mesafesi > 80

3. src/components/AmbianceLayer.jsx
   - Aktif moda göre canvas'ta partikül render et
   - Renk geçişleri CSS transition ile (gecisHesapla'dan gelen süre)
   - Scroll modda: debounce 1500ms, parmak kalktıktan 1s sonra güncelle
   - Sayfa modda: sayfa değişince tetikle
   - Partikül sayısı: isMobile ? 50 : 200
   - Ortam + zaman + tempo + fiziksel his katmanlarını
     duygu modunun üstüne uygula

4. src/store/ambianceStore.js (Zustand)
   - aktifMod, bloklar, onbellek state'leri
   - setMod, updateOnbellek action'ları

Her dosyayı ayrı yaz. Birbirine bağımlılıkları import ile kur.
Ambiyansı kapattığında hiçbir şey çökmemeli —
AmbianceLayer sadece null return etmeli.
```

---

*Bu dosya Lekton Ambiyans Sistemi'nin tek referans kaynağıdır.*
*Kod değişse bile bu dosya güncel kalır.*

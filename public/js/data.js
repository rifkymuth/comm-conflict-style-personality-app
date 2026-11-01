/* ---------- BUTIR ---------- */
const B5=[
 ['b1','E',0,'Saya menjadi penghidup suasana dalam pertemuan kelompok.'],
 ['b2','A',0,'Saya ikut merasakan perasaan orang lain.'],
 ['b3','C',0,'Saya segera menyelesaikan pekerjaan rutin, tidak menunda.'],
 ['b4','N',0,'Suasana hati saya mudah berubah-ubah.'],
 ['b5','O',0,'Saya memiliki imajinasi yang hidup.'],
 ['b6','E',1,'Saya tidak banyak bicara.'],
 ['b7','A',1,'Saya tidak terlalu tertarik pada masalah orang lain.'],
 ['b8','C',1,'Saya sering lupa mengembalikan barang ke tempatnya.'],
 ['b9','N',1,'Sebagian besar waktu saya merasa tenang.'],
 ['b10','O',1,'Saya tidak tertarik pada gagasan-gagasan abstrak.'],
 ['b11','E',0,'Dalam acara atau pertemuan, saya berbicara dengan banyak orang yang berbeda.'],
 ['b12','A',0,'Saya peka terhadap emosi orang lain.'],
 ['b13','C',0,'Saya menyukai keteraturan.'],
 ['b14','N',0,'Saya mudah merasa kesal.'],
 ['b15','O',1,'Saya sulit memahami gagasan-gagasan abstrak.'],
 ['b16','E',1,'Saya lebih suka berada di belakang layar.'],
 ['b17','A',1,'Sejujurnya, saya kurang tertarik pada orang lain.'],
 ['b18','C',1,'Saya sering membuat pekerjaan menjadi berantakan.'],
 ['b19','N',1,'Saya jarang merasa murung.'],
 ['b20','O',1,'Imajinasi saya kurang berkembang.']
];
const SS=[
 ['s1','a',0,'Dalam rapat, saya cepat menyampaikan pendapat dan mengambil posisi.'],
 ['s2','r',0,'Saya mudah menunjukkan perasaan dan antusiasme saat berbicara.'],
 ['s3','a',0,'Saya lebih suka mengarahkan pembicaraan daripada mengikuti alurnya.'],
 ['s4','r',0,'Saya membangun hubungan pribadi dulu sebelum membahas pekerjaan.'],
 ['s5','a',1,'Saya cenderung mendengarkan dan bertanya dulu sebelum menyatakan sikap.'],
 ['s6','r',1,'Saya lebih suka pembicaraan yang langsung ke pokok tugas, tanpa basa-basi.'],
 ['s7','a',0,'Saya mengambil keputusan dengan cepat, meski informasinya belum lengkap.'],
 ['s8','r',0,'Dalam memutuskan, dampak pada orang lain sama pentingnya dengan data.'],
 ['s9','a',0,'Saat tidak setuju, saya langsung mengatakannya.'],
 ['s10','r',0,'Saya sering memakai cerita atau pengalaman pribadi untuk meyakinkan orang.'],
 ['s11','a',1,'Saya nyaman membiarkan orang lain memimpin diskusi.'],
 ['s12','r',1,'Orang menilai saya tenang, formal, dan sulit ditebak perasaannya.']
];
const CF=[
 ['c1','comp','Berusaha keras agar posisi saya yang diterima.'],
 ['c2','coll','Mengajak semua pihak membuka kepentingan masing-masing secara terbuka.'],
 ['c3','compr','Mengusulkan jalan tengah agar kesepakatan cepat tercapai.'],
 ['c4','avoid','Menunda pembahasan isu sensitif sampai situasinya lebih tenang.'],
 ['c5','acc','Mengalah demi menjaga hubungan baik.'],
 ['c6','comp','Menggunakan argumen, data, atau kewenangan untuk memenangkan pendapat.'],
 ['c7','coll','Mencari solusi baru yang memenuhi kebutuhan kedua pihak sepenuhnya.'],
 ['c8','compr','Bersedia melepas sebagian tuntutan jika pihak lain juga melakukannya.'],
 ['c9','avoid','Menghindari pembicaraan yang berpotensi menimbulkan ketegangan.'],
 ['c10','acc','Mendahulukan kebutuhan pihak lain dibanding kebutuhan saya.'],
 ['c11','comp','Enggan mundur dari tuntutan awal saya.'],
 ['c12','coll','Meluangkan waktu lebih lama demi solusi yang benar-benar disepakati bersama.'],
 ['c13','compr','Mencari pembagian yang adil: masing-masing mendapat sebagian.'],
 ['c14','avoid','Membiarkan orang lain menangani konflik bila memungkinkan.'],
 ['c15','acc','Mengikuti keinginan pihak lain agar suasana tetap harmonis.']
];
const VAK=[
 ['v1','Saat mempelajari prosedur baru, saya paling cepat paham melalui…',[['v','Diagram, gambar, atau alur tertulis'],['a','Penjelasan lisan dan diskusi'],['k','Mencoba langsung']]],
 ['v2','Saat mengingat rapat penting, yang paling melekat adalah…',[['v','Tampilan slide, ruangan, ekspresi wajah'],['a','Kata-kata dan nada bicara orang'],['k','Suasana dan apa yang saya rasakan']]],
 ['v3','Saat meyakinkan orang lain, saya cenderung…',[['v','Menunjukkan peta, grafik, atau foto'],['a','Menjelaskan dengan cerita dan argumen'],['k','Mengajak ke lapangan agar mereka mengalami sendiri']]],
 ['v4','Ungkapan yang sering saya pakai…',[['v','"Kelihatannya…", "Dari yang saya lihat…"'],['a','"Kedengarannya…", "Saya dengar…"'],['k','"Rasanya…", "Saya merasa…"']]],
 ['v5','Dalam rapat, saya paling terganggu oleh…',[['v','Presentasi yang berantakan atau sulit dibaca'],['a','Suara bising atau orang bicara bersamaan'],['k','Ruangan tidak nyaman atau duduk terlalu lama']]],
 ['v6','Saat memberi arahan kepada tim lapangan, saya biasanya…',[['v','Menggambar sketsa atau menunjukkan contoh visual'],['a','Menjelaskan langkah demi langkah secara lisan'],['k','Memperagakan atau mendampingi langsung']]]
];
const MP=[
 ['m1','mot','Dalam negosiasi, yang paling mendorong saya adalah…',[['A','Mencapai target dan hasil yang diinginkan'],['B','Mencegah kerugian dan risiko']]],
 ['m2','ref','Saya tahu saya bernegosiasi dengan baik ketika…',[['A','Saya sendiri merasa yakin hasilnya tepat'],['B','Atasan, tim, atau pihak lain memberi umpan balik positif']]],
 ['m3','opt','Saat perundingan buntu, saya cenderung…',[['A','Mencari alternatif kreatif yang belum terpikirkan'],['B','Kembali ke langkah atau SOP yang sudah terbukti']]],
 ['m4','scope','Saat membaca draf perjanjian, saya…',[['A','Memahami gambaran besar dan tujuannya dulu'],['B','Memeriksa klausul dan angka satu per satu']]],
 ['m5','mot','Kesepakatan yang baik menurut saya adalah yang…',[['A','Membuka peluang dan manfaat baru'],['B','Tidak menimbulkan masalah di kemudian hari']]],
 ['m6','ref','Sebelum mengambil keputusan penting, saya…',[['A','Mengandalkan penilaian sendiri'],['B','Meminta pendapat orang lain terlebih dahulu']]],
 ['m7','opt','Saya lebih nyaman bekerja dengan…',[['A','Banyak pilihan yang terbuka'],['B','Alur yang jelas tahap demi tahap']]],
 ['m8','scope','Saat menjelaskan posisi saya, saya mulai dari…',[['A','Prinsip dan gambaran besar'],['B','Fakta dan rincian']]]
];
const SECTIONS=[
 {id:'S1',title:'Kepribadian',tag:'Big Five',intro:'Seberapa sesuai pernyataan berikut menggambarkan diri Anda pada umumnya?',type:'lik',items:B5.map(x=>({id:x[0],q:x[3]})),lab:['Sangat tidak sesuai','Tidak sesuai','Netral','Sesuai','Sangat sesuai']},
 {id:'S2',title:'Gaya komunikasi',tag:'Social Styles',intro:'Pikirkan cara Anda berbicara dan memutuskan dalam rapat kerja.',type:'lik',items:SS.map(x=>({id:x[0],q:x[3]})),lab:['Sangat tidak sesuai','Tidak sesuai','Netral','Sesuai','Sangat sesuai']},
 {id:'S3',title:'Gaya menghadapi konflik',tag:'Dual concern',intro:'Ketika ada perbedaan kepentingan dengan pihak lain (warga, mitra, kontraktor, atasan), seberapa sering Anda…',type:'lik',items:CF.map(x=>({id:x[0],q:x[2]})),lab:['Hampir tidak pernah','Jarang','Kadang-kadang','Sering','Hampir selalu']},
 {id:'S4',title:'Cara menangkap informasi',tag:'NLP · VAK',intro:'Pilih satu jawaban yang paling menggambarkan Anda.',type:'opt',items:VAK.map(x=>({id:x[0],q:x[1],o:x[2]}))},
 {id:'S5',title:'Pola berpikir',tag:'NLP · Meta-program',intro:'Pilih satu jawaban yang paling menggambarkan Anda.',type:'opt',items:MP.map(x=>({id:x[0],q:x[2],o:x[3]}))}
];
const ALL=SECTIONS.flatMap(s=>s.items.map(i=>i.id));

/* ---------- INTERPRETASI ---------- */
const COMM={
 tiger:{en:'Tiger',id:'Harimau',mono:'Ti',col:'--tiger',tag:'Pengarah: tegas dan berorientasi hasil',
  str:'Cepat mengambil keputusan, berani membuka tawaran, fokus pada target, tidak gentar menghadapi tekanan.',
  risk:'Terkesan memaksa dan kurang mendengar. Dalam negosiasi dengan masyarakat atau tokoh adat, gaya ini mudah dibaca sebagai arogansi korporasi.',
  tip:'Latih pertanyaan terbuka dan jeda tiga detik sebelum merespons. Rangkum kepentingan pihak lain sebelum mengajukan tawaran.',
  deal:'Langsung ke pokok persoalan, tawarkan pilihan beserta konsekuensinya, hormati waktunya, hindari bertele-tele.'},
 peacock:{en:'Peacock',id:'Merak',mono:'Pe',col:'--peacock',tag:'Ekspresif: persuasif dan membangun suasana',
  str:'Mudah membangun rapport, mencairkan ketegangan, persuasif, kaya ide, nyaman tampil di forum terbuka.',
  risk:'Cenderung berjanji berlebihan, kurang detail, bosan pada data, dan berimprovisasi di luar mandat.',
  tip:'Bawa angka, batas mandat, dan BATNA secara tertulis. Pasangkan dengan rekan pencatat. Konfirmasi setiap janji sebelum diucapkan.',
  deal:'Beri ruang bicara, apresiasi idenya, gunakan cerita, lalu kunci kesepakatan secara tertulis.'},
 dolphin:{en:'Dolphin',id:'Lumba-lumba',mono:'Do',col:'--dolphin',tag:'Ramah: pendengar dan penjaga hubungan',
  str:'Pendengar yang baik, mudah dipercaya, sabar, menjaga hubungan jangka panjang. Sangat cocok untuk dialog dengan pihak terdampak.',
  risk:'Sulit berkata tidak, mengalah terlalu cepat, menghindari isu keras, dan tidak nyaman dengan tekanan.',
  tip:'Tetapkan batas bawah (walk-away point) sebelum masuk ruangan. Latih kalimat penolakan yang santun: "Saya paham, tapi itu di luar kewenangan kami. Yang bisa kami tawarkan adalah…"',
  deal:'Bangun kepercayaan lebih dulu, jangan menekan, beri waktu berpikir, tunjukkan kepedulian yang tulus.'},
 owl:{en:'Owl',id:'Burung Hantu',mono:'Ow',col:'--owl',tag:'Analitis: teliti dan berbasis data',
  str:'Persiapan matang, logika runtut, teliti terhadap klausul dan angka, sulit dikecoh.',
  risk:'Lambat memutuskan, terkesan dingin dan kaku, terjebak analisis berlebihan, dan menyampaikan terlalu banyak data.',
  tip:'Tetapkan tenggat keputusan. Ucapkan empati secara eksplisit. Sederhanakan data menjadi tiga poin utama untuk audiens non-teknis.',
  deal:'Kirim data dan dokumen lebih awal, jangan terburu-buru, susun argumen secara runtut, hindari klaim tanpa bukti.'}
};
const CONF={
 comp:{en:'Shark',id:'Hiu',mono:'Sh',col:'--shark',name:'Kompetisi',verb:'mengutamakan kemenangan posisi',
  when:'Keputusan darurat, isu keselamatan, prinsip hukum yang tidak bisa ditawar, atau melindungi diri dari eksploitasi.',
  risk:'Merusak hubungan, memicu eskalasi, dan menimbulkan perlawanan masyarakat yang lebih mahal di kemudian hari.',
  dev:'Tanyakan kepentingan di balik posisi lawan bicara sebelum mempertahankan posisi Anda.'},
 coll:{en:'Eagle',id:'Elang',mono:'Ea',col:'--eagle',name:'Kolaborasi',verb:'mencari solusi menang-menang',
  when:'Isu kompleks dan hubungan jangka panjang: FPIC, kompensasi lahan, kesepakatan pemanfaatan bersama.',
  risk:'Memakan waktu dan energi, tidak efisien untuk isu kecil, dan bisa dimanfaatkan pihak yang bermain kompetitif.',
  dev:'Kenali kapan solusi "cukup baik" sudah memadai, dan siapkan BATNA bila pihak lain tidak berniat berkolaborasi.'},
 compr:{en:'Fox',id:'Rubah',mono:'Fo',col:'--fox',name:'Kompromi',verb:'cepat mencari jalan tengah',
  when:'Tenggat ketat, kekuatan kedua pihak seimbang, atau perlu solusi sementara.',
  risk:'"Bagi dua" sering meninggalkan nilai di meja; semua pihak hanya setengah puas dan isu dapat muncul kembali.',
  dev:'Gali kepentingan dulu sebelum membagi. Tanyakan: "Apa yang paling penting bagi Anda dari tuntutan ini?"'},
 avoid:{en:'Turtle',id:'Kura-kura',mono:'Tu',col:'--turtle',name:'Menghindar',verb:'menunda atau menghindari konfrontasi',
  when:'Isu sepele, emosi sedang memuncak sehingga perlu jeda, atau informasi belum cukup.',
  risk:'Masalah membesar, Anda dianggap tidak peduli, dan kepercayaan warga atau mitra menurun.',
  dev:'Jika menunda, beri jadwal yang jelas: "Kami bahas lagi Kamis pukul 10 dengan data lengkap."'},
 acc:{en:'Teddy Bear',id:'Beruang',mono:'TB',col:'--bear',name:'Akomodasi',verb:'mengalah demi menjaga hubungan',
  when:'Kita memang keliru, hubungan lebih penting daripada isu, atau sedang membangun goodwill.',
  risk:'Dieksploitasi, menciptakan preseden buruk, dan kepentingan organisasi tidak terlindungi.',
  dev:'Jangan beri konsesi gratis. Gunakan pola "jika… maka…": "Jika kami memenuhi ini, maka kami minta Bapak/Ibu…"'}
};
const B5INFO={
 E:{n:'Ekstraversi',hi:'Nyaman membuka percakapan dan membangun jaringan. Waspadai kebiasaan lebih banyak bicara daripada mendengar.',lo:'Pendengar dan pengamat yang cermat, kuat dalam persiapan. Mintalah jeda atau caucus saat butuh waktu berpikir, dan siapkan pernyataan pembuka secara tertulis.',mid:'Ambivert: luwes berpindah antara tampil dan mendengar sesuai situasi.'},
 A:{n:'Keramahan',hi:'Membangun kepercayaan dengan mudah, cocok untuk negosiasi integratif. Riset menunjukkan orang dengan skor tinggi rentan mengalah dalam tawar-menawar distributif; tetapkan batas sebelum berunding.',lo:'Tegas mempertahankan kepentingan dan tidak mudah ditekan. Waspadai kesan dingin atau konfrontatif.',mid:'Seimbang antara menjaga hubungan dan mempertahankan kepentingan.'},
 C:{n:'Ketelitian',hi:'Persiapan, dokumentasi, dan tindak lanjut yang kuat. Waspadai kekakuan saat situasi berubah cepat.',lo:'Fleksibel dan spontan. Risiko utama: persiapan kurang dan komitmen tidak terdokumentasi.',mid:'Cukup terstruktur tanpa kehilangan keluwesan.'},
 S:{n:'Stabilitas emosi',hi:'Tenang di bawah tekanan dan tidak mudah terpancing provokasi.',lo:'Lebih reaktif terhadap tekanan; kecemasan dapat mendorong tawaran awal yang terlalu rendah. Latih teknik napas, jeda, dan susun skenario terburuk sebelumnya.',mid:'Umumnya stabil, tetapi bisa terpengaruh pada tekanan tinggi.'},
 O:{n:'Keterbukaan',hi:'Kreatif menemukan opsi baru dan nyaman dengan gagasan tak lazim; aset dalam negosiasi integratif.',lo:'Praktis dan konsisten pada cara yang terbukti. Ajak rekan untuk curah gagasan saat negosiasi buntu.',mid:'Terbuka pada gagasan baru selama relevan dan realistis.'}
};
const VAKINFO={v:{n:'Visual',t:'Gunakan peta, infografis, foto lokasi, dan ringkasan satu halaman. Dengarkan kata seperti "kelihatannya" atau "jelas" dari lawan bicara.'},
 a:{n:'Auditori',t:'Andalkan dialog, cerita, dan rangkuman lisan. Perhatikan nada dan pilihan kata; ulangi kesepakatan dengan suara jelas.'},
 k:{n:'Kinestetik',t:'Ajak kunjungan lapangan, simulasi, atau peragaan. Bangun suasana nyaman; perhatikan bahasa tubuh dan "rasa" pertemuan.'}};
const MPINFO={
 mot:{a:'Menuju (toward)',b:'Menjauhi (away from)',ta:'Termotivasi oleh tujuan dan manfaat; bingkai tawaran sebagai peluang.',tb:'Termotivasi menghindari masalah; tonjolkan mitigasi risiko dan jaminan.'},
 ref:{a:'Internal',b:'Eksternal',ta:'Menilai dari keyakinan sendiri; berikan data lalu biarkan ia menyimpulkan.',tb:'Butuh pengakuan pihak lain; gunakan testimoni, preseden, dan dukungan tokoh.'},
 opt:{a:'Opsi',b:'Prosedur',ta:'Senang menjajaki alternatif; berguna saat buntu, tetapi perlu disiplin menutup kesepakatan.',tb:'Nyaman dengan tahapan jelas; berikan peta jalan negosiasi langkah demi langkah.'},
 scope:{a:'Global',b:'Detail',ta:'Mulai dari gambaran besar; pasangkan dengan rekan yang teliti klausul.',tb:'Kuat pada rincian; sampaikan dulu tujuan besar agar tidak tenggelam dalam detail.'}
};

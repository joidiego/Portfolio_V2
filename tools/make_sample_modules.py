from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib import colors
from reportlab.lib.units import cm
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Preformatted, PageBreak
ss=getSampleStyleSheet()
H=ParagraphStyle('H',parent=ss['Heading1'],fontName='Helvetica-Bold',fontSize=22,textColor=colors.HexColor('#1d2f6f'),spaceAfter=6)
H2=ParagraphStyle('H2',parent=ss['Heading2'],fontName='Helvetica-Bold',fontSize=13.5,textColor=colors.HexColor('#3c55e0'),spaceBefore=12,spaceAfter=4)
B=ParagraphStyle('B',parent=ss['BodyText'],fontName='Helvetica',fontSize=10.5,leading=15,spaceAfter=6)
C=ParagraphStyle('C',fontName='Courier',fontSize=9,leading=12,backColor=colors.HexColor('#eef1fb'),borderPadding=6,spaceAfter=10,leftIndent=4)
M={
"modul-fastapi.pdf":("Backend dengan FastAPI","Dari endpoint pertama sampai deploy dengan Docker.",[
("Tujuan","Setelah membaca modul ini Anda bisa membuat API REST dengan FastAPI, memvalidasi data dengan Pydantic, menyimpan data ke PostgreSQL lewat SQLAlchemy, mengelola perubahan skema dengan Alembic, mengujinya dengan pytest, lalu membungkusnya dengan Docker."),
("1. Struktur proyek","Pisahkan kode menurut tanggung jawab agar mudah diuji dan dirawat.",
"app/\n  main.py        # instance FastAPI dan router\n  models.py      # model SQLAlchemy\n  schemas.py     # skema Pydantic\n  db.py          # engine dan session\ntests/\nalembic/\nDockerfile"),
("2. Routing dan validasi","Pydantic menolak data yang salah sebelum menyentuh logika bisnis.",
"from fastapi import FastAPI\nfrom pydantic import BaseModel, Field\n\napp = FastAPI()\n\nclass SaleIn(BaseModel):\n    item: str = Field(min_length=1, max_length=80)\n    qty: int = Field(gt=0)\n    price: float = Field(gt=0)\n\n@app.post('/sales', status_code=201)\ndef create_sale(body: SaleIn):\n    return {'total': body.qty * body.price}"),
("3. Database dan migrasi","Jangan mengubah tabel produksi secara manual. Catat setiap perubahan sebagai migrasi.",
"alembic init alembic\nalembic revision --autogenerate -m 'add sales'\nalembic upgrade head"),
("4. Pengujian","Uji endpoint dengan TestClient agar bug tertangkap sebelum rilis.",
"from fastapi.testclient import TestClient\nfrom app.main import app\n\ndef test_create_sale():\n    r = TestClient(app).post('/sales', json={'item':'ring','qty':2,'price':10})\n    assert r.status_code == 201 and r.json()['total'] == 20"),
("5. Deploy","Gunakan satu image Docker yang sama untuk tes di CI dan produksi. Jalankan pytest di GitHub Actions pada setiap push, dan deploy hanya jika tes lulus.")]),
"modul-sql.pdf":("SQL untuk analisis data","Dari JOIN sampai laporan penjualan harian.",[
("Tujuan","Modul ini mengajarkan SQL yang dipakai sehari-hari untuk laporan: menggabungkan tabel, meringkas data, membandingkan periode, dan memeriksa kecepatan query."),
("1. Tabel contoh","Misalkan ada dua tabel: sales(id, product_id, qty, price, sold_at) dan products(id, name, category)."),
("2. JOIN","JOIN menggabungkan baris dari dua tabel berdasarkan kunci yang sama.",
"SELECT p.name, s.qty, s.price\nFROM sales s\nJOIN products p ON p.id = s.product_id\nWHERE s.sold_at >= DATE '2026-01-01';"),
("3. GROUP BY dan ORDER BY","Ringkas data per kategori lalu urutkan dari yang terbesar.",
"SELECT p.category, SUM(s.qty * s.price) AS revenue\nFROM sales s JOIN products p ON p.id = s.product_id\nGROUP BY p.category\nORDER BY revenue DESC;"),
("4. Window function","Bandingkan setiap hari dengan hari sebelumnya tanpa menghilangkan baris detail.",
"SELECT d, revenue,\n       revenue - LAG(revenue) OVER (ORDER BY d) AS diff\nFROM daily_revenue;"),
("5. Index dan EXPLAIN","Index mempercepat pencarian pada kolom yang sering difilter. Periksa rencana eksekusi sebelum dan sesudahnya.",
"CREATE INDEX idx_sales_sold_at ON sales (sold_at);\nEXPLAIN ANALYZE SELECT * FROM sales WHERE sold_at >= '2026-01-01';"),
("Tips","Tulis kolom yang dibutuhkan saja (hindari SELECT *), beri alias yang jelas, dan simpan query laporan sebagai view agar konsisten.")]),
"modul-ml.pdf":("Machine learning terapan","Alur kerja dari data mentah sampai model yang bisa dievaluasi.",[
("Tujuan","Modul ini merangkum alur kerja machine learning yang saya pakai di proyek prediksi dan analisis kausal: menyiapkan data, memilih model, mengevaluasi dengan jujur, dan menjelaskan hasilnya."),
("1. Alur kerja","Tentukan pertanyaan bisnis, kumpulkan data, bersihkan, buat fitur, latih model, evaluasi, lalu pantau setelah dipakai. Mulai dari baseline sederhana sebelum mencoba model rumit."),
("2. Pembersihan dan fitur","Tangani nilai kosong, duplikat, dan pencilan. Gabungkan kolom menjadi fitur baru yang bermakna, misalnya rasio atau rata-rata bergulir."),
("3. Validasi","Pisahkan data latih dan uji. Untuk data deret waktu, jangan acak urutan: latih pada masa lalu dan uji pada masa depan, agar tidak terjadi kebocoran data.",
"from sklearn.model_selection import TimeSeriesSplit\nfor tr, te in TimeSeriesSplit(n_splits=5).split(X):\n    model.fit(X[tr], y[tr])\n    score = model.score(X[te], y[te])"),
("4. Metrik","Klasifikasi: akurasi, presisi, recall, F1. Regresi dan prediksi: RMSE dan MAPE. Pilih metrik sesuai biaya kesalahan, bukan sesuai angka yang paling bagus."),
("5. Deret waktu","LSTM dan N-BEATS belajar pola musiman dan tren dari riwayat data. Normalisasi data, atur panjang jendela, dan bandingkan selalu dengan baseline naif."),
("6. Inferensi kausal","Korelasi bukan sebab-akibat. Double Machine Learning memakai model terpisah untuk perancu, perlakuan, dan hasil dengan cross-fitting, sehingga efek perlakuan (misalnya diskon terhadap profit) bisa diperkirakan lebih adil.")]),
"modul-keamanan.pdf":("Dasar keamanan web","Menjaga data dan akun tetap aman sejak desain.",[
("Tujuan","Modul ini memperkenalkan kebiasaan keamanan dasar untuk aplikasi web dan API agar celah umum tidak masuk ke produksi."),
("1. Validasi input","Anggap semua input tidak tepercaya. Validasi tipe, panjang, dan rentang di server, bukan hanya di browser."),
("2. SQL injection","Jangan menyambung string untuk membuat query. Gunakan parameter.",
"# salah\ndb.execute(f\"SELECT * FROM users WHERE name = '{name}'\")\n# benar\ndb.execute(text('SELECT * FROM users WHERE name = :n'), {'n': name})"),
("3. Autentikasi","Simpan kata sandi sebagai hash lambat bersalt (bcrypt atau argon2), tidak pernah sebagai teks biasa. Batasi percobaan login dan beri masa berlaku pada token."),
("4. XSS dan CORS","Escape semua teks pengguna sebelum ditampilkan. Pada CORS, izinkan hanya origin yang memang Anda kelola, bukan tanda bintang."),
("5. Rahasia dan dependensi","Simpan kunci API di variabel lingkungan, bukan di repositori. Kunci versi dependensi dan perbarui secara berkala setelah dites."),
("6. Integritas data","Hash kriptografis (misalnya SHA-256) memungkinkan Anda mendeteksi perubahan data. Ide ini dipakai pada ledger bergaya blockchain: setiap catatan menyimpan hash catatan sebelumnya, sehingga perubahan di tengah rantai langsung terlihat.")])}
def foot(c,d):
    c.saveState();c.setFont('Helvetica',8);c.setFillColor(colors.grey);c.drawString(2*cm,1.2*cm,"Joi Diego Napitupulu - Modul Pembelajaran");c.drawRightString(A4[0]-2*cm,1.2*cm,"Hal. %d"%d.page);c.restoreState()
import json;meta={}
for f,(t,sub,secs) in M.items():
    st=[Paragraph(t,H),Paragraph(sub,B),Spacer(1,6)]
    for s in secs:
        st.append(Paragraph(s[0],H2));st.append(Paragraph(s[1],B))
        if len(s)>2:st.append(Preformatted(s[2],C))
    d=SimpleDocTemplate(f,pagesize=A4,leftMargin=2*cm,rightMargin=2*cm,topMargin=2*cm,bottomMargin=2*cm,title=t,author="Joi Diego Napitupulu")
    d.build(st,onFirstPage=foot,onLaterPages=foot)
    from pypdf import PdfReader
    meta[f]=len(PdfReader(f).pages)
print(meta)

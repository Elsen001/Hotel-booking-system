Task link -  https://shimmering-bienenstitch-392eab.netlify.app/


Hotel Booking App
🏨 Layihə Haqqında

Bu layihə istifadəçilərə səyahət destinasyonlarını seçmək, otel və yemək planlarını (board type) təyin etmək və ümumi xərcləri hesablamaq imkanı verən dinamik bir hotel rezervasiya tətbiqidir.

İstifadəçilər:

Vətəndaşlıq seçə bilər

Səyahət tarixi və müddətini müəyyən edə bilər

Gedəcəkləri ölkəni seçə bilər

Board type (Full Board, Half Board, No Board) seçə bilər

Hər gün üçün otel və yemək seçimlərini edə bilər

Seçimlərə əsasən gündəlik və ümumi məbləğ avtomatik hesablanır.

🛠 Texniki Stack

Frontend: React.js + TypeScript

State Management: Redux Toolkit

Styling: Tailwind CSS

Build Tool: Vite

⚡ Əsas Funksionallıqlar

İlkin Konfiqurasiya Formu:

Vətəndaşlıq, başlanğıc tarixi, gün sayı, destinasiya və board type seçimi

Tarix sahəsi yalnız bugünkü və sonrakı tarixləri qəbul edir

Form submit edildikdə toast mesajı göstərilir və form sıfırlanır

Gündəlik Konfiqurasiya Cədvəli:

Seçilmiş gün sayına uyğun satırlar yaradılır

Otel və yemək seçimləri edilə bilər

Board type qaydaları tətbiq olunur:

FB (Full Board): Lunch və Dinner seçilə bilər

HB (Half Board): Lunch və ya Dinner seçilə bilər (bir-birini istisna edən)

NB (No Board): Yemək seçimi deaktiv edilir

Ümumi Baxış və Qiymət Hesablanması:

Seçilmiş konfiqurasiya göstərilir

Hər günün seçimləri və günlük məbləğ göstərilir

Ümumi məbləğ (Grand Total) hesablanır

Submit & Reset:

Booking submit edildikdə toast mesajı göstərilir

Form sıfırlanır və bütün Redux state resetlənir (resetBooking action)

UX Təkmilləşdirmələri:

Tailwind CSS ilə responsive və müasir dizayn

Focus və hover effektləri

Button və inputlar istifadəçi dostu dizaynla hazırlanıb

📝 Fayl Strukturu
src/
├─ components/
│  ├─ InitialForm.tsx
│  ├─ DailyTable.tsx
│  └─ Summary.tsx
├─ store/
│  ├─ slices/
│  │  └─ bookingSlice.ts
│  └─ index.ts
├─ data/
│  ├─ data.ts
│  └─ data.types.ts
├─ App.tsx
└─ main.tsx

📌 Redux Slice (bookingSlice)

State: citizenship, startDate, days, destination, boardType, daily

Actions:

setConfig

setDays

setDestination

setBoardType

setDailyHotel

setDailyMeal

resetBooking ✅ (submit sonrası formu sıfırlamaq üçün)

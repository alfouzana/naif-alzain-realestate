import "./style.css";

const WA = "966564487574";

const listings = [
  { title: "شقة فاخرة بإطلالة بحرية", district: "الشاطئ", type: "sale", price: "1,350,000 ريال", rooms: 4, baths: 3, area: 210, img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=900&q=70" },
  { title: "فيلا دورين مع ملحق ومسبح", district: "أبحر الشمالية", type: "sale", price: "3,200,000 ريال", rooms: 6, baths: 5, area: 450, img: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=900&q=70" },
  { title: "شقة عائلية جديدة", district: "النعيم", type: "rent", price: "55,000 ريال / سنويًا", rooms: 3, baths: 2, area: 160, img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=900&q=70" },
  { title: "دور أرضي مع حوش خاص", district: "الروضة", type: "rent", price: "70,000 ريال / سنويًا", rooms: 4, baths: 3, area: 240, img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=70" },
  { title: "أرض سكنية على شارعين", district: "الياقوت", type: "sale", price: "1,050,000 ريال", rooms: null, baths: null, area: 625, img: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=900&q=70" },
  { title: "شقة مفروشة قريبة من الكورنيش", district: "الحمراء", type: "rent", price: "6,500 ريال / شهريًا", rooms: 2, baths: 2, area: 120, img: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=900&q=70" },
];

const grid = document.querySelector("[data-listings]");

function render(filter) {
  grid.innerHTML = listings
    .filter((l) => filter === "all" || l.type === filter)
    .map((l) => {
      const msg = encodeURIComponent(`السلام عليكم، أستفسر عن: ${l.title} - حي ${l.district}`);
      const specs = l.rooms
        ? `<span>${l.rooms} غرف</span><span>${l.baths} دورات مياه</span><span>${l.area} م²</span>`
        : `<span>المساحة ${l.area} م²</span>`;
      const badge = l.type === "sale" ? "bg-brand" : "bg-amber-500";
      return `
      <article class="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100">
        <div class="relative aspect-[4/3]">
          <img src="${l.img}" alt="${l.title}" loading="lazy" class="h-full w-full object-cover" />
          <span class="absolute top-3 right-3 rounded-full ${badge} px-3 py-1 text-xs font-bold text-white">${l.type === "sale" ? "للبيع" : "للإيجار"}</span>
        </div>
        <div class="p-5">
          <p class="text-sm text-slate-500">جدة - حي ${l.district}</p>
          <h3 class="mt-1 text-lg font-bold">${l.title}</h3>
          <div class="mt-3 flex flex-wrap gap-3 text-sm text-slate-600">${specs}</div>
          <div class="mt-4 flex items-center justify-between gap-2">
            <p class="text-lg font-extrabold text-brand">${l.price}</p>
            <a href="https://wa.me/${WA}?text=${msg}" target="_blank" class="shrink-0 rounded-full bg-[#25D366] px-4 py-2 text-sm font-bold text-white hover:opacity-90">استفسر واتساب</a>
          </div>
        </div>
      </article>`;
    })
    .join("");
}
render("all");

document.querySelectorAll("[data-filter]").forEach((b) =>
  b.addEventListener("click", () => {
    document.querySelectorAll("[data-filter]").forEach((x) => x.classList.remove("bg-brand", "text-white"));
    b.classList.add("bg-brand", "text-white");
    render(b.dataset.filter);
  })
);

// mobile nav toggle
const btn = document.querySelector("[data-nav-toggle]");
const menu = document.querySelector("[data-nav-menu]");
btn?.addEventListener("click", () => menu?.classList.toggle("hidden"));

// current year in footer
document.querySelectorAll("[data-year]").forEach((el) => (el.textContent = String(new Date().getFullYear())));

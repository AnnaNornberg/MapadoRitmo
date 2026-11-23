const GUIA_DATA = {
  creator: "Eduardo Ferreira",
  priceLabel: "R$ 47",
  whatsapp: "5553999999999",
  checkoutUrl: "",
  modules: [
    {
      code: "Parte 01",
      title: "O mapa que ninguém te mostra",
      desc: "Como enxergar o braço além da 5ª casa e localizar notas e intervalos sem depender de colar no papel."
    },
    {
      code: "Parte 02",
      title: "Pentatônica com pegada de verdade",
      desc: "Como sair do desenho quadrado, adicionar notas de passagem e dar cara de improviso real em cima de bases."
    },
    {
      code: "Parte 03",
      title: "Riffs e levadas que grudam",
      desc: "Como combinar ritmo, acentuação e pequenos intervalos para criar ideias próprias em vez de ficar só em covers."
    },
    {
      code: "Parte 04",
      title: "Rotina curta que cabe no dia a dia",
      desc: "Exercícios práticos de 15 a 20 minutos para manter constância mesmo nos dias corridos de aula ou trabalho."
    }
  ],
  reviews: [
    {
      text: "Eu já tocava há anos, mas sempre ficava preso no mesmo trecho da pentatônica. Em duas semanas aplicando os exercícios de intervalo já mudou meu jeito de puxar frase.",
      name: "Diego Silveira",
      detail: "Toca guitarra há 4 anos • Rock e Blues"
    },
    {
      text: "Sem enrolação de livro chato. É direto no braço e fácil de praticar no quarto mesmo com um amp simples.",
      name: "Marina Tavares",
      detail: "Estudante e guitarrista amadora"
    }
  ],
  faqs: [
    {
      q: "Preciso saber ler partitura para aproveitar o material?",
      a: "Não. Todo o material usa diagramas visuais do braço, cifras/tablaturas e explicações simples do som de cada intervalo."
    },
    {
      q: "Serve para quem toca há pouco tempo ou já tem alguma bagagem?",
      a: "Funciona melhor para quem já segura o instrumento, faz acordes básicos e já tirou algumas músicas, mas sente que falta liberdade para criar e improvisar."
    },
    {
      q: "Preciso de pedaleira ou equipamento caro?",
      a: "De jeito nenhum. Você pode praticar com guitarra elétrica limpa, com drive do amplificador ou até no violão."
    },
    {
      q: "Como recebo o material após o pagamento?",
      a: "O envio é feito logo após a confirmação pelo canal combinado (WhatsApp ou link de entrega digital)."
    }
  ]
};

function getInitials(name) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");
}

function buildWhatsUrl(msg) {
  const digits = GUIA_DATA.whatsapp.replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(msg)}`;
}

document.getElementById("creator-name").textContent = GUIA_DATA.creator;
document.getElementById("creator-initials").textContent = getInitials(GUIA_DATA.creator);
document.getElementById("footer-copy").textContent = `© ${new Date().getFullYear()} ${GUIA_DATA.creator} — Mapa do Ritmo.`;
document.getElementById("footer-contact").href = buildWhatsUrl(
  `Olá, ${GUIA_DATA.creator}! Tenho uma dúvida sobre o guia Mapa do Ritmo.`
);

const modulesEl = document.getElementById("modules-list");
const moduleFragment = document.createDocumentFragment();

GUIA_DATA.modules.forEach((mod, i) => {
  const card = document.createElement("article");
  card.className = "module-card glass-card reveal";
  card.style.transitionDelay = `${i * 70}ms`;

  const tag = document.createElement("span");
  tag.className = "module-tag";
  tag.textContent = mod.code;

  const title = document.createElement("h3");
  title.textContent = mod.title;

  const desc = document.createElement("p");
  desc.textContent = mod.desc;

  card.append(tag, title, desc);
  moduleFragment.appendChild(card);
});
modulesEl.appendChild(moduleFragment);

const reviewsEl = document.getElementById("reviews-list");
const reviewFragment = document.createDocumentFragment();

GUIA_DATA.reviews.forEach((rev, i) => {
  const card = document.createElement("article");
  card.className = "review-card glass-card reveal";
  card.style.transitionDelay = `${i * 90}ms`;

  const quote = document.createElement("p");
  quote.textContent = `"${rev.text}"`;

  const authorBox = document.createElement("div");
  authorBox.className = "review-author";

  const authorName = document.createElement("strong");
  authorName.textContent = rev.name;

  const authorDetail = document.createElement("span");
  authorDetail.textContent = rev.detail;

  authorBox.append(authorName, authorDetail);
  card.append(quote, authorBox);
  reviewFragment.appendChild(card);
});
reviewsEl.appendChild(reviewFragment);

const faqEl = document.getElementById("faq-container");
const faqFragment = document.createDocumentFragment();

GUIA_DATA.faqs.forEach((item, idx) => {
  const isDefaultOpen = idx === 0;
  const wrapper = document.createElement("div");
  wrapper.className = `faq-item glass-card reveal${isDefaultOpen ? " is-open" : ""}`;

  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "faq-btn";
  btn.setAttribute("aria-expanded", String(isDefaultOpen));

  const questionSpan = document.createElement("span");
  questionSpan.textContent = item.q;

  const plusSpan = document.createElement("span");
  plusSpan.className = "faq-plus";
  plusSpan.setAttribute("aria-hidden", "true");
  plusSpan.textContent = "+";

  btn.append(questionSpan, plusSpan);

  const collapse = document.createElement("div");
  collapse.className = "faq-collapse";

  const collapseInner = document.createElement("div");
  collapseInner.className = "faq-collapse-inner";

  const body = document.createElement("div");
  body.className = "faq-body";

  const answerP = document.createElement("p");
  answerP.textContent = item.a;

  body.appendChild(answerP);
  collapseInner.appendChild(body);
  collapse.appendChild(collapseInner);

  btn.addEventListener("click", () => {
    const opened = wrapper.classList.toggle("is-open");
    btn.setAttribute("aria-expanded", String(opened));
  });

  wrapper.append(btn, collapse);
  faqFragment.appendChild(wrapper);
});
faqEl.appendChild(faqFragment);

const buyBtn = document.getElementById("buy-now-btn");
buyBtn.addEventListener("click", () => {
  if (GUIA_DATA.checkoutUrl) {
    window.open(GUIA_DATA.checkoutUrl, "_blank", "noopener,noreferrer");
    return;
  }
  const msg = `Olá, ${GUIA_DATA.creator}! Vi a página do Mapa do Ritmo e quero garantir o meu acesso por ${GUIA_DATA.priceLabel}.`;
  window.open(buildWhatsUrl(msg), "_blank", "noopener,noreferrer");
});

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const revealTargets = document.querySelectorAll(".reveal");

if (prefersReducedMotion || !("IntersectionObserver" in window)) {
  revealTargets.forEach((el) => el.classList.add("is-visible"));
} else {
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        obs.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -30px 0px" }
  );

  revealTargets.forEach((el) => observer.observe(el));
}
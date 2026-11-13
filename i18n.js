// Переводы и выбор языка.
// Порядок выбора: ?lang=xx в URL → ранее выбранный вручную → язык браузера → en.
// Языки: en, es, fr, zh (упрощённый китайский), ru, be.
(function () {
  const STORAGE_KEY = "startap_lang";
  const SUPPORTED = ["en", "es", "fr", "zh", "ru", "be"];
  // Локали, для которых по умолчанию показываем русскую версию.
  const RU_LOCALES = ["ru", "kk", "ky"];

  const dict = {
    ru: {
      "meta.title": "Startap — Start. App. Easy. Платежи для ваших идей без юрлица",
      "meta.description": "Реквизиты для приёма платежей в ваших приложениях и SaaS за пару кликов. Без регистрации юрлица и открытия счетов. Платите только процент с дохода.",
      "nav.cta": "Хочу ранний доступ",
      "hero.badge": "Скоро запуск · собираем ранних пользователей",
      "hero.headline": "Навайбкодили идею?<br /><span class=\"grad\">Принимайте оплату уже завтра.</span>",
      "hero.lead": "Реквизиты для приёма платежей в ваших приложениях и SaaS — за пару кликов. Без регистрации юрлица, без отдельного счёта под каждый проект и без бухгалтерии. Вы платите только процент с того, что заработали.",
      "form.placeholder": "you@email.com",
      "form.submit": "Подписаться",
      "form.sending": "Отправляем…",
      "form.ok": "Готово! Напишем, как только откроем доступ 🎉",
      "form.invalid": "Похоже, в адресе опечатка — проверьте email.",
      "form.error": "Не получилось отправить. Попробуйте ещё раз или подпишитесь в Telegram.",
      "tg.button": "Подписаться в Telegram",
      "email.label": "Нет Telegram? Оставьте email — напишем один раз, когда откроем доступ.",
      "term.created": "Проект создан",
      "term.issued": "Реквизиты выданы",
      "term.link": "Платёжная ссылка:",
      "term.wait": "→ Ждём первых клиентов 🚀",
      "pain.title": "Идей много. Юрлиц на всех не напасёшься.",
      "pain.1.t": "Регистрация компании",
      "pain.1.d": "Недели бумажной волокиты и расходы — ради идеи, которая может не взлететь.",
      "pain.2.t": "Счёт и эквайринг",
      "pain.2.d": "Банк, проверки, договор с платёжкой. И так — под каждый новый проект.",
      "pain.3.t": "Отчётность",
      "pain.3.d": "Налоги, бухгалтер, декларации — даже когда выручка пока нулевая.",
      "how.title": "Как это будет работать",
      "how.1.t": "Добавьте проект",
      "how.1.d": "Название, ссылка на продукт и короткое описание. Пара минут — и всё.",
      "how.2.t": "Получите реквизиты",
      "how.2.d": "Платёжная ссылка, виджет оплаты и API для подписок — сразу после проверки проекта.",
      "how.3.t": "Получайте выплаты",
      "how.3.d": "Мы принимаем платежи от вашего имени и выплачиваем вам доход за вычетом комиссии.",
      "feat.title": "Что вы получите",
      "feat.1.t": "⚡ Запуск за минуты",
      "feat.1.d": "Тестируйте монетизацию в тот же день, когда написали первую строчку кода.",
      "feat.2.t": "🧩 Сколько угодно проектов",
      "feat.2.d": "Каждой идее — свои реквизиты и своя статистика. Не взлетела — просто закройте.",
      "feat.3.t": "🔁 Разовые платежи и подписки",
      "feat.3.d": "Ссылки на оплату, рекуррентные платежи и вебхуки для вашего бэкенда.",
      "feat.4.t": "🧾 Без бухгалтерии",
      "feat.4.d": "Документы, чеки и работу с платёжными провайдерами мы берём на себя.",
      "price.title": "Платите, только когда зарабатываете",
      "price.d": "Никакой абонентской платы и стартовых взносов. Мы берём фиксированный процент с поступлений — нет выручки, нет расходов.",
      "price.1": "0 ₽ за подключение",
      "price.2": "0 ₽ в месяц",
      "price.3": "% только с полученных платежей",
      "price.4": "Ранним пользователям — сниженная комиссия",
      "faq.title": "Вопросы",
      "faq.1.q": "Мне правда не нужно регистрировать юрлицо или ИП?",
      "faq.1.a": "Для старта — нет. Платежи принимаем мы, а вам выплачиваем доход. Когда проект вырастет, вы сможете перейти на собственное юрлицо — поможем с переездом.",
      "faq.2.q": "Какой будет комиссия?",
      "faq.2.a": "Точный процент объявим перед запуском. Все, кто в листе ожидания, получат его первыми — и на более выгодных условиях.",
      "faq.3.q": "Какие проекты можно подключить?",
      "faq.3.a": "Цифровые продукты: SaaS, приложения, AI-сервисы, боты, шаблоны, онлайн-курсы. Каждый проект проходит быструю проверку на соответствие правилам.",
      "faq.4.q": "Когда запуск?",
      "faq.4.a": "Мы сейчас в разработке. Подпишитесь — пришлём одно письмо или сообщение в Telegram, когда откроем доступ.",
      "cta.title": "Будьте первыми в очереди",
      "cta.d": "Ранний доступ, сниженная комиссия и возможность повлиять на продукт.",
      "footer.note": "Сервис находится в разработке",
    },
    en: {
      "meta.title": "Startap — Start. App. Easy. Accept payments for your ideas, no company needed",
      "meta.description": "Get payment details for your apps and SaaS in a couple of clicks. No company registration, no bank accounts to open. You only pay a share of your revenue.",
      "nav.cta": "Get early access",
      "hero.badge": "Launching soon · early access waitlist is open",
      "hero.headline": "Vibe-coded an idea?<br /><span class=\"grad\">Start taking payments tomorrow.</span>",
      "hero.lead": "Get payment details for your apps and SaaS in a couple of clicks. No company to register, no separate bank account for every project, no accounting. You only pay a share of what you earn.",
      "form.placeholder": "you@email.com",
      "form.submit": "Notify me",
      "form.sending": "Sending…",
      "form.ok": "You're in! We'll let you know as soon as we open access 🎉",
      "form.invalid": "Looks like there's a typo — please check your email.",
      "form.error": "Couldn't send that. Please try again or follow us on Telegram.",
      "tg.button": "Follow us on Telegram",
      "email.label": "Not on Telegram? Leave your email — we'll write once, when access opens.",
      "term.created": "Project created",
      "term.issued": "Payment details issued",
      "term.link": "Payment link:",
      "term.wait": "→ Waiting for the first customers 🚀",
      "pain.title": "Plenty of ideas. You can't start a company for each one.",
      "pain.1.t": "Registering a company",
      "pain.1.d": "Weeks of paperwork and fees — for an idea that might never take off.",
      "pain.2.t": "Bank account & acquiring",
      "pain.2.d": "Banks, KYC, a contract with a payment provider. And all over again for every new project.",
      "pain.3.t": "Reporting",
      "pain.3.d": "Taxes, accountants, filings — even while your revenue is still zero.",
      "how.title": "How it will work",
      "how.1.t": "Add a project",
      "how.1.d": "A name, a link to your product and a short description. A couple of minutes and you're done.",
      "how.2.t": "Get payment details",
      "how.2.d": "A payment link, a checkout widget and a subscriptions API — right after a quick project review.",
      "how.3.t": "Get paid out",
      "how.3.d": "We accept payments on your behalf and pay out your revenue minus our fee.",
      "feat.title": "What you get",
      "feat.1.t": "⚡ Live in minutes",
      "feat.1.d": "Test monetization the same day you write your first line of code.",
      "feat.2.t": "🧩 As many projects as you like",
      "feat.2.d": "Every idea gets its own payment details and stats. Didn't take off? Just close it.",
      "feat.3.t": "🔁 One-off payments & subscriptions",
      "feat.3.d": "Payment links, recurring billing and webhooks for your backend.",
      "feat.4.t": "🧾 No accounting",
      "feat.4.d": "We handle the paperwork, receipts and payment providers.",
      "price.title": "Pay only when you earn",
      "price.d": "No monthly fees, no setup costs. We take a fixed percentage of incoming payments — no revenue, no cost.",
      "price.1": "$0 to get started",
      "price.2": "$0 per month",
      "price.3": "% only on payments received",
      "price.4": "Lower fee for early users",
      "faq.title": "FAQ",
      "faq.1.q": "Do I really not need to register a company?",
      "faq.1.a": "Not to get started. We accept the payments and pay your revenue out to you. Once your project grows, you can move to your own company — we'll help with the migration.",
      "faq.2.q": "What will the fee be?",
      "faq.2.a": "We'll announce the exact percentage before launch. Everyone on the waitlist hears it first — and gets better terms.",
      "faq.3.q": "What kinds of projects can I connect?",
      "faq.3.a": "Digital products: SaaS, apps, AI services, bots, templates, online courses. Every project goes through a quick compliance review.",
      "faq.4.q": "When do you launch?",
      "faq.4.a": "We're in development right now. Subscribe and we'll send you a single email or Telegram message when access opens.",
      "cta.title": "Be first in line",
      "cta.d": "Early access, a lower fee and a chance to shape the product.",
      "footer.note": "The service is under development",
    },
    es: {
      "meta.title": "Startap — Start. App. Easy. Cobra por tus ideas sin crear una empresa",
      "meta.description": "Datos de cobro para tus apps y SaaS en un par de clics. Sin registrar una empresa ni abrir cuentas bancarias. Solo pagas un porcentaje de lo que ingresas.",
      "nav.cta": "Quiero acceso anticipado",
      "hero.badge": "Muy pronto · lista de espera abierta",
      "hero.headline": "¿Has creado una idea con vibe coding?<br /><span class=\"grad\">Empieza a cobrar mañana mismo.</span>",
      "hero.lead": "Datos de cobro para tus apps y SaaS en un par de clics. Sin registrar una empresa, sin una cuenta bancaria para cada proyecto y sin contabilidad. Solo pagas un porcentaje de lo que ganas.",
      "form.placeholder": "tu@email.com",
      "form.submit": "Avísame",
      "form.sending": "Enviando…",
      "form.ok": "¡Listo! Te avisaremos en cuanto abramos el acceso 🎉",
      "form.invalid": "Parece que hay un error en el email. Revísalo, por favor.",
      "form.error": "No se pudo enviar. Inténtalo de nuevo o síguenos en Telegram.",
      "tg.button": "Síguenos en Telegram",
      "email.label": "¿No usas Telegram? Déjanos tu email: te escribiremos una sola vez, cuando abramos el acceso.",
      "term.created": "Proyecto creado",
      "term.issued": "Datos de cobro emitidos",
      "term.link": "Enlace de pago:",
      "term.wait": "→ Esperando a los primeros clientes 🚀",
      "pain.title": "Muchas ideas. No puedes crear una empresa para cada una.",
      "pain.1.t": "Registrar una empresa",
      "pain.1.d": "Semanas de papeleo y gastos, para una idea que quizá nunca despegue.",
      "pain.2.t": "Cuenta bancaria y pasarela de pago",
      "pain.2.d": "Bancos, verificaciones, contrato con un proveedor de pagos. Y vuelta a empezar con cada proyecto nuevo.",
      "pain.3.t": "Contabilidad y declaraciones",
      "pain.3.d": "Impuestos, gestoría, declaraciones… aunque todavía no factures nada.",
      "how.title": "Cómo funcionará",
      "how.1.t": "Añade un proyecto",
      "how.1.d": "Un nombre, un enlace a tu producto y una breve descripción. En un par de minutos, listo.",
      "how.2.t": "Recibe tus datos de cobro",
      "how.2.d": "Enlace de pago, widget de checkout y API de suscripciones, justo después de una revisión rápida del proyecto.",
      "how.3.t": "Recibe tus pagos",
      "how.3.d": "Cobramos en tu nombre y te transferimos los ingresos menos nuestra comisión.",
      "feat.title": "Qué obtienes",
      "feat.1.t": "⚡ En marcha en minutos",
      "feat.1.d": "Prueba la monetización el mismo día en que escribes la primera línea de código.",
      "feat.2.t": "🧩 Todos los proyectos que quieras",
      "feat.2.d": "Cada idea tiene sus propios datos de cobro y estadísticas. ¿No despegó? Simplemente ciérrala.",
      "feat.3.t": "🔁 Pagos únicos y suscripciones",
      "feat.3.d": "Enlaces de pago, cobros recurrentes y webhooks para tu backend.",
      "feat.4.t": "🧾 Sin contabilidad",
      "feat.4.d": "Nos encargamos de los documentos, los recibos y los proveedores de pago.",
      "price.title": "Paga solo cuando ganes",
      "price.d": "Sin cuotas mensuales ni costes de alta. Cobramos un porcentaje fijo de los pagos recibidos: sin ingresos, sin gastos.",
      "price.1": "Alta gratuita",
      "price.2": "Sin cuota mensual",
      "price.3": "% solo de los pagos recibidos",
      "price.4": "Comisión reducida para los primeros usuarios",
      "faq.title": "Preguntas frecuentes",
      "faq.1.q": "¿De verdad no necesito registrar una empresa?",
      "faq.1.a": "Para empezar, no. Nosotros recibimos los pagos y te transferimos los ingresos. Cuando tu proyecto crezca, podrás pasarte a tu propia empresa y te ayudaremos con la migración.",
      "faq.2.q": "¿Cuál será la comisión?",
      "faq.2.a": "Anunciaremos el porcentaje exacto antes del lanzamiento. Quienes estén en la lista de espera lo sabrán primero, y con mejores condiciones.",
      "faq.3.q": "¿Qué tipo de proyectos puedo conectar?",
      "faq.3.a": "Productos digitales: SaaS, apps, servicios de IA, bots, plantillas, cursos online. Cada proyecto pasa una revisión rápida de cumplimiento.",
      "faq.4.q": "¿Cuándo es el lanzamiento?",
      "faq.4.a": "Estamos en desarrollo. Suscríbete y te enviaremos un único email o mensaje de Telegram cuando abramos el acceso.",
      "cta.title": "Sé de los primeros",
      "cta.d": "Acceso anticipado, comisión reducida y la oportunidad de dar forma al producto.",
      "footer.note": "El servicio está en desarrollo",
    },
    fr: {
      "meta.title": "Startap — Start. App. Easy. Encaissez des paiements pour vos idées, sans créer de société",
      "meta.description": "Des coordonnées d'encaissement pour vos apps et SaaS en quelques clics. Sans créer de société ni ouvrir de compte bancaire. Vous ne payez qu'un pourcentage de vos revenus.",
      "nav.cta": "Accès anticipé",
      "hero.badge": "Bientôt disponible · liste d'attente ouverte",
      "hero.headline": "Vous avez codé une idée en mode vibe coding ?<br /><span class=\"grad\">Encaissez vos premiers paiements dès demain.</span>",
      "hero.lead": "Des coordonnées d'encaissement pour vos apps et SaaS en quelques clics. Pas de société à créer, pas de compte bancaire pour chaque projet, pas de comptabilité. Vous ne payez qu'un pourcentage de ce que vous gagnez.",
      "form.placeholder": "vous@email.com",
      "form.submit": "Me prévenir",
      "form.sending": "Envoi…",
      "form.ok": "C'est noté ! Nous vous préviendrons dès l'ouverture de l'accès 🎉",
      "form.invalid": "Il semble y avoir une faute de frappe : vérifiez votre adresse e-mail.",
      "form.error": "L'envoi a échoué. Réessayez ou suivez-nous sur Telegram.",
      "tg.button": "Suivez-nous sur Telegram",
      "email.label": "Pas sur Telegram ? Laissez votre e-mail : nous vous écrirons une seule fois, à l'ouverture.",
      "term.created": "Projet créé",
      "term.issued": "Coordonnées de paiement émises",
      "term.link": "Lien de paiement :",
      "term.wait": "→ En attente des premiers clients 🚀",
      "pain.title": "Plein d'idées. Impossible de créer une société pour chacune.",
      "pain.1.t": "Créer une société",
      "pain.1.d": "Des semaines de paperasse et de frais, pour une idée qui ne décollera peut-être jamais.",
      "pain.2.t": "Compte bancaire et solution de paiement",
      "pain.2.d": "Banque, vérifications, contrat avec un prestataire de paiement. Et rebelote pour chaque nouveau projet.",
      "pain.3.t": "Comptabilité et déclarations",
      "pain.3.d": "Impôts, comptable, déclarations… même quand le chiffre d'affaires est encore nul.",
      "how.title": "Comment ça va marcher",
      "how.1.t": "Ajoutez un projet",
      "how.1.d": "Un nom, un lien vers votre produit et une courte description. Deux minutes, et c'est fait.",
      "how.2.t": "Recevez vos coordonnées",
      "how.2.d": "Lien de paiement, widget de checkout et API d'abonnements, juste après une vérification rapide du projet.",
      "how.3.t": "Recevez vos versements",
      "how.3.d": "Nous encaissons les paiements en votre nom et vous reversons vos revenus, moins notre commission.",
      "feat.title": "Ce que vous obtenez",
      "feat.1.t": "⚡ En ligne en quelques minutes",
      "feat.1.d": "Testez la monétisation le jour même où vous écrivez votre première ligne de code.",
      "feat.2.t": "🧩 Autant de projets que vous voulez",
      "feat.2.d": "Chaque idée a ses propres coordonnées de paiement et ses statistiques. Elle ne décolle pas ? Fermez-la, tout simplement.",
      "feat.3.t": "🔁 Paiements ponctuels et abonnements",
      "feat.3.d": "Liens de paiement, prélèvements récurrents et webhooks pour votre backend.",
      "feat.4.t": "🧾 Zéro comptabilité",
      "feat.4.d": "Nous gérons les documents, les reçus et les prestataires de paiement.",
      "price.title": "Ne payez que lorsque vous gagnez",
      "price.d": "Ni abonnement, ni frais d'inscription. Nous prélevons un pourcentage fixe sur les paiements reçus : pas de revenus, pas de frais.",
      "price.1": "Inscription gratuite",
      "price.2": "Aucun abonnement mensuel",
      "price.3": "% uniquement sur les paiements reçus",
      "price.4": "Commission réduite pour les premiers utilisateurs",
      "faq.title": "Questions fréquentes",
      "faq.1.q": "Je n'ai vraiment pas besoin de créer de société ?",
      "faq.1.a": "Pas pour démarrer. Nous encaissons les paiements et vous reversons vos revenus. Quand votre projet grandira, vous pourrez passer à votre propre société, et nous vous aiderons à migrer.",
      "faq.2.q": "Quelle sera la commission ?",
      "faq.2.a": "Nous annoncerons le pourcentage exact avant le lancement. Les inscrits sur la liste d'attente le sauront en premier, avec de meilleures conditions.",
      "faq.3.q": "Quels projets puis-je connecter ?",
      "faq.3.a": "Les produits numériques : SaaS, applications, services d'IA, bots, templates, formations en ligne. Chaque projet passe une vérification de conformité rapide.",
      "faq.4.q": "Quand a lieu le lancement ?",
      "faq.4.a": "Nous sommes en plein développement. Inscrivez-vous et nous vous enverrons un seul e-mail ou message Telegram à l'ouverture de l'accès.",
      "cta.title": "Soyez parmi les premiers",
      "cta.d": "Accès anticipé, commission réduite et la possibilité de façonner le produit.",
      "footer.note": "Le service est en cours de développement",
    },
    zh: {
      "meta.title": "Startap — Start. App. Easy. 无需注册公司，即可为你的创意收款",
      "meta.description": "点几下即可为你的应用和 SaaS 获取收款账户。无需注册公司，无需开设银行账户。只按收入的一定比例付费。",
      "nav.cta": "抢先体验",
      "hero.badge": "即将上线 · 抢先体验名单开放中",
      "hero.headline": "Vibe Coding 做了个点子？<br /><span class=\"grad\">明天就能开始收款。</span>",
      "hero.lead": "点几下，即可为你的应用和 SaaS 获取收款账户。无需注册公司，无需为每个项目单独开户，也不用操心记账。你只需按实际收入的一定比例付费。",
      "form.placeholder": "you@email.com",
      "form.submit": "通知我",
      "form.sending": "发送中…",
      "form.ok": "订阅成功！开放后我们会第一时间通知你 🎉",
      "form.invalid": "邮箱地址似乎有误，请检查一下。",
      "form.error": "发送失败。请重试，或在 Telegram 上关注我们。",
      "tg.button": "在 Telegram 上关注我们",
      "email.label": "没有 Telegram？留下邮箱，开放时我们只会给你发一封邮件。",
      "term.created": "项目已创建",
      "term.issued": "收款账户已开通",
      "term.link": "支付链接：",
      "term.wait": "→ 等待第一批客户 🚀",
      "pain.title": "点子很多，但不可能为每个点子都注册一家公司。",
      "pain.1.t": "注册公司",
      "pain.1.d": "数周的文书工作和费用，只为一个可能根本做不起来的点子。",
      "pain.2.t": "银行账户与收单",
      "pain.2.d": "银行开户、资质审核、与支付机构签约。每个新项目都要再来一遍。",
      "pain.3.t": "财务与报税",
      "pain.3.d": "税务、会计、申报……即使收入还是零。",
      "how.title": "使用流程",
      "how.1.t": "添加项目",
      "how.1.d": "填写名称、产品链接和简短介绍。几分钟就能搞定。",
      "how.2.t": "获取收款账户",
      "how.2.d": "项目快速审核通过后，立即获得支付链接、收银台组件和订阅 API。",
      "how.3.t": "接收打款",
      "how.3.d": "我们代你收款，并在扣除手续费后将收入打给你。",
      "feat.title": "你将获得",
      "feat.1.t": "⚡ 几分钟即可上线",
      "feat.1.d": "写下第一行代码的当天，就能开始测试变现。",
      "feat.2.t": "🧩 项目数量不限",
      "feat.2.d": "每个点子都有独立的收款账户和数据统计。没做起来？直接关掉就好。",
      "feat.3.t": "🔁 单次付款与订阅",
      "feat.3.d": "支付链接、周期性扣款，以及供后端使用的 Webhook。",
      "feat.4.t": "🧾 无需记账",
      "feat.4.d": "单据、收据以及与支付机构的对接，都由我们负责。",
      "price.title": "赚到钱才付费",
      "price.d": "没有月费，也没有开通费。我们只从到账款项中收取固定比例：没有收入，就没有费用。",
      "price.1": "零开通费",
      "price.2": "零月费",
      "price.3": "仅对已到账款项收取比例费用",
      "price.4": "早期用户享受更低费率",
      "faq.title": "常见问题",
      "faq.1.q": "我真的不需要注册公司吗？",
      "faq.1.a": "起步阶段不需要。由我们收款，再把收入打给你。等项目做大了，你可以转到自己的公司名下，我们会协助迁移。",
      "faq.2.q": "手续费是多少？",
      "faq.2.a": "具体比例会在上线前公布。等候名单中的用户会最先知道，并享受更优惠的条件。",
      "faq.3.q": "可以接入哪些项目？",
      "faq.3.a": "数字产品：SaaS、应用、AI 服务、机器人、模板、在线课程。每个项目都会经过快速的合规审核。",
      "faq.4.q": "什么时候上线？",
      "faq.4.a": "我们正在开发中。订阅后，开放时我们只会给你发一封邮件或一条 Telegram 消息。",
      "cta.title": "抢先排队",
      "cta.d": "抢先体验、更低费率，还能参与塑造产品。",
      "footer.note": "服务正在开发中",
    },
    be: {
      "meta.title": "Startap — Start. App. Easy. Плацяжы для вашых ідэй без юрасобы",
      "meta.description": "Рэквізіты для прыёму плацяжоў у вашых праграмах і SaaS за пару клікаў. Без рэгістрацыі юрасобы і адкрыцця рахункаў. Плаціце толькі адсотак з даходу.",
      "nav.cta": "Хачу ранні доступ",
      "hero.badge": "Хутка запуск · збіраем першых карыстальнікаў",
      "hero.headline": "Навайбкодзілі ідэю?<br /><span class=\"grad\">Прымайце аплату ўжо заўтра.</span>",
      "hero.lead": "Рэквізіты для прыёму плацяжоў у вашых праграмах і SaaS — за пару клікаў. Без рэгістрацыі юрасобы, без асобнага рахунку пад кожны праект і без бухгалтарыі. Вы плаціце толькі адсотак з таго, што зарабілі.",
      "form.placeholder": "you@email.com",
      "form.submit": "Падпісацца",
      "form.sending": "Адпраўляем…",
      "form.ok": "Гатова! Напішам, як толькі адкрыем доступ 🎉",
      "form.invalid": "Здаецца, у адрасе памылка — праверце email.",
      "form.error": "Не атрымалася адправіць. Паспрабуйце яшчэ раз або падпішыцеся ў Telegram.",
      "tg.button": "Падпісацца ў Telegram",
      "email.label": "Няма Telegram? Пакіньце email — напішам адзін раз, калі адкрыем доступ.",
      "term.created": "Праект створаны",
      "term.issued": "Рэквізіты выдадзены",
      "term.link": "Плацежная спасылка:",
      "term.wait": "→ Чакаем першых кліентаў 🚀",
      "pain.title": "Ідэй шмат. Юрасоб на ўсе не напасешся.",
      "pain.1.t": "Рэгістрацыя кампаніі",
      "pain.1.d": "Тыдні папяровай цяганіны і выдаткі — дзеля ідэі, якая можа і не ўзляцець.",
      "pain.2.t": "Рахунак і эквайрынг",
      "pain.2.d": "Банк, праверкі, дагавор з плацежным сэрвісам. І так — пад кожны новы праект.",
      "pain.3.t": "Справаздачнасць",
      "pain.3.d": "Падаткі, бухгалтар, дэкларацыі — нават калі выручка пакуль нулявая.",
      "how.title": "Як гэта будзе працаваць",
      "how.1.t": "Дадайце праект",
      "how.1.d": "Назва, спасылка на прадукт і кароткае апісанне. Пара хвілін — і ўсё.",
      "how.2.t": "Атрымайце рэквізіты",
      "how.2.d": "Плацежная спасылка, віджэт аплаты і API для падпісак — адразу пасля праверкі праекта.",
      "how.3.t": "Атрымлівайце выплаты",
      "how.3.d": "Мы прымаем плацяжы ад вашага імя і выплачваем вам даход за вылікам камісіі.",
      "feat.title": "Што вы атрымаеце",
      "feat.1.t": "⚡ Запуск за хвіліны",
      "feat.1.d": "Тэстуйце манетызацыю ў той жа дзень, калі напісалі першы радок кода.",
      "feat.2.t": "🧩 Колькі заўгодна праектаў",
      "feat.2.d": "Кожнай ідэі — свае рэквізіты і свая статыстыка. Не ўзляцела — проста закрыйце.",
      "feat.3.t": "🔁 Разавыя плацяжы і падпіскі",
      "feat.3.d": "Спасылкі на аплату, рэкурэнтныя плацяжы і вэбхукі для вашага бэкенда.",
      "feat.4.t": "🧾 Без бухгалтарыі",
      "feat.4.d": "Дакументы, чэкі і працу з плацежнымі правайдарамі мы бярэм на сябе.",
      "price.title": "Плаціце, толькі калі зарабляеце",
      "price.d": "Ніякай абаненцкай платы і ўступных узносаў. Мы бярэм фіксаваны адсотак з паступленняў — няма выручкі, няма выдаткаў.",
      "price.1": "Бясплатнае падключэнне",
      "price.2": "Без абаненцкай платы",
      "price.3": "% толькі з атрыманых плацяжоў",
      "price.4": "Першым карыстальнікам — зніжаная камісія",
      "faq.title": "Пытанні",
      "faq.1.q": "Мне сапраўды не трэба рэгістраваць юрасобу ці ІП?",
      "faq.1.a": "Для старту — не. Плацяжы прымаем мы, а вам выплачваем даход. Калі праект вырасце, вы зможаце перайсці на ўласную юрасобу — дапаможам з пераездам.",
      "faq.2.q": "Якой будзе камісія?",
      "faq.2.a": "Дакладны адсотак абвесцім перад запускам. Усе, хто ў спісе чакання, даведаюцца пра яго першымі — і на больш выгадных умовах.",
      "faq.3.q": "Якія праекты можна падключыць?",
      "faq.3.a": "Лічбавыя прадукты: SaaS, праграмы, AI-сэрвісы, боты, шаблоны, анлайн-курсы. Кожны праект праходзіць хуткую праверку на адпаведнасць правілам.",
      "faq.4.q": "Калі запуск?",
      "faq.4.a": "Зараз мы ў распрацоўцы. Падпішыцеся — дашлём адзін ліст або паведамленне ў Telegram, калі адкрыем доступ.",
      "cta.title": "Будзьце першымі ў чарзе",
      "cta.d": "Ранні доступ, зніжаная камісія і магчымасць паўплываць на прадукт.",
      "footer.note": "Сэрвіс знаходзіцца ў распрацоўцы",
    },
  };

  function detect() {
    const ALIASES = { by: "be" }; // ?lang=by → белорусский
    const rawUrl = new URLSearchParams(location.search).get("lang");
    const fromUrl = ALIASES[rawUrl] || rawUrl;
    if (SUPPORTED.includes(fromUrl)) return fromUrl;

    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (SUPPORTED.includes(saved)) return saved;
    } catch (_) {}

    const langs = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || "en"];
    for (const l of langs) {
      const base = String(l).toLowerCase().split("-")[0];
      if (RU_LOCALES.includes(base)) return "ru";
      if (SUPPORTED.includes(base)) return base;
    }
    return "en";
  }

  // Значение атрибута lang у <html> (для китайского — регион, чтобы браузер взял нужный шрифт).
  const HTML_LANG = { zh: "zh-CN" };
  const htmlLang = (l) => HTML_LANG[l] || l;

  let current = detect();
  // Прячем страницу до подстановки перевода, чтобы не мигал другой язык.
  document.documentElement.lang = htmlLang(current);
  document.documentElement.classList.add("i18n-pending");

  function t(key) {
    return (dict[current] && dict[current][key]) ?? dict.en[key] ?? key;
  }

  function apply(lang) {
    current = lang;
    document.documentElement.lang = htmlLang(lang);
    document.title = t("meta.title");
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.content = t("meta.description");

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      el.innerHTML = t(el.dataset.i18n);
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      el.placeholder = t(el.dataset.i18nPlaceholder);
    });
    document.querySelectorAll("[data-lang-btn]").forEach((btn) => {
      const active = btn.dataset.langBtn === lang;
      btn.classList.toggle("active", active);
      btn.setAttribute("aria-checked", String(active));
      if (active) {
        document.querySelectorAll("[data-lang-current]").forEach((el) => {
          el.textContent = btn.dataset.short || lang.toUpperCase();
        });
      }
    });
    // Сообщения формы на прежнем языке убираем.
    document.querySelectorAll("[data-form-note]").forEach((n) => {
      n.textContent = "";
      n.className = "form-note";
    });
    document.documentElement.classList.remove("i18n-pending");
    document.dispatchEvent(new CustomEvent("i18n:change", { detail: { lang } }));
  }

  function set(lang) {
    if (!SUPPORTED.includes(lang)) return;
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (_) {}
    const url = new URL(location.href);
    if (url.searchParams.has("lang")) {
      url.searchParams.set("lang", lang);
      history.replaceState(null, "", url);
    }
    apply(lang);
  }

  window.I18N = { t, set, get lang() { return current; } };

  // Выпадающий список языков.
  function initDropdown(root) {
    const toggle = root.querySelector("[data-lang-toggle]");
    const menu = root.querySelector("[data-lang-menu]");
    const items = () => [...menu.querySelectorAll("[data-lang-btn]")];

    const open = () => {
      menu.hidden = false;
      toggle.setAttribute("aria-expanded", "true");
      (menu.querySelector(".active") || items()[0]).focus();
    };
    const close = (focusToggle) => {
      menu.hidden = true;
      toggle.setAttribute("aria-expanded", "false");
      if (focusToggle) toggle.focus();
    };

    toggle.addEventListener("click", () => (menu.hidden ? open() : close()));
    toggle.addEventListener("keydown", (e) => {
      if (e.key === "ArrowDown" || e.key === "ArrowUp") { e.preventDefault(); open(); }
    });
    menu.addEventListener("keydown", (e) => {
      const list = items();
      const i = list.indexOf(document.activeElement);
      if (e.key === "ArrowDown") { e.preventDefault(); list[(i + 1) % list.length].focus(); }
      else if (e.key === "ArrowUp") { e.preventDefault(); list[(i - 1 + list.length) % list.length].focus(); }
      else if (e.key === "Home") { e.preventDefault(); list[0].focus(); }
      else if (e.key === "End") { e.preventDefault(); list[list.length - 1].focus(); }
      else if (e.key === "Escape") { close(true); }
      else if (e.key === "Tab") { close(); }
    });
    items().forEach((btn) =>
      btn.addEventListener("click", () => { set(btn.dataset.langBtn); close(true); })
    );
    document.addEventListener("click", (e) => {
      if (!menu.hidden && !root.contains(e.target)) close();
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    apply(current);
    document.querySelectorAll("[data-lang-dd]").forEach(initDropdown);
  });
})();

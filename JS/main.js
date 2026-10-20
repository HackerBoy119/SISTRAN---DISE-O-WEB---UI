// 0. CONFIGURACIÓN TAILWIND V4
const styleTag = document.createElement('style');
styleTag.type = 'text/tailwindcss';
styleTag.innerHTML = `
  @custom-variant dark (&:where(.dark, .dark *));
  .scrollbar-hide::-webkit-scrollbar { display: none; }
  .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
`;
document.head.appendChild(styleTag);

// ESTADO GLOBAL PERSISTENTE ENTRE PÁGINAS HTML (SOLES Y DÓLARES)
let saldoSoles = parseFloat(localStorage.getItem("saldo_integra")) || 14250.00;
let saldoDolares = parseFloat(localStorage.getItem("saldo_integra_usd")) || 3420.50;
let nombreUsuarioActivo = localStorage.getItem("usuario_integra") || "Andy Benites";
let saldosOcultos = false;
let plazoSeleccionado = 12;
let idiomaActual = localStorage.getItem("idioma_banco") || "es";

// DICCIONARIO MULTI-IDIOMA COMPLETO (ESPAÑOL / INGLÉS / QUECHUA)
const traducciones = {
  es: {
    top_security: "<strong>Zona Segura:</strong> Cifrado SSL 256-bit activo. INTEGRA-BANK jamás te pedirá contraseñas ni token por correo, llamada o WhatsApp.",
    top_emergency: "Emergencias 24/7:",
    top_help: "Centro de Ayuda",
    nav_subtitle: "Banca por Internet",
    nav_accounts: "Inicio y Cuentas",
    nav_payments: "Pagos y Seguridad",
    nav_loans: "Simulador Préstamos",
    nav_form: "Formulario Solicitudes",
    btn_login: "Iniciar Sesión",
    btn_register: "Abrir Cuenta",
    session_active: "Sesión Activa ✓",
    welcome_public_title: "¡Bienvenido a <span class='text-[#064e3b] dark:text-[#a3e635]'>INTEGRA-BANK PE</span>!",
    welcome_public_sub: "Explora nuestros servicios digitales o inicia sesión para ver tus cuentas.",
    guest_badge: "Banca Digital 24/7",
    guest_protected: "Acceso Protegido",
    guest_box_title: "Consulta tus saldos y realiza operaciones sin comisiones",
    guest_box_desc: "Inicia sesión con tu Clave Digital o vincula tu cuenta con Google, Facebook, Instagram, Microsoft o Apple para visualizar tus cuentas en Soles y Dólares.",
    hero_hello: "Hola,",
    hero_online: "En línea",
    hero_last_login: "Sesión segura verificada • Trujillo, PE",
    btn_hide_balance: "Ocultar Saldos",
    btn_show_balance: "Mostrar Saldos",
    card_subtitle: "Signature Edition",
    card_holder: "Titular",
    card_expires: "Vence",
    acc_main_soles: "Cuenta de Ahorros Principal (Soles)",
    acc_usd: "Cuenta de Ahorros (Dólares)",
    btn_copy: "Copiar",
    btn_transfer: "Transferir",
    fx_title: "Tipo de Cambio",
    fx_buy: "Compra",
    fx_sell: "Venta",
    fx_receive: "Recibes aprox:",
    fx_btn: "Operar en Línea",
    slide1_badge: "Campaña Ahorro Seguro",
    slide1_title: "Haz crecer tus fondos con Tasa Anual de 7.50% TREA",
    slide1_btn: "Solicitar Plazo Fijo",
    slide2_badge: "Exclusivo Clientes",
    slide2_title: "Tarjeta de Crédito Visa Signature sin membresía",
    slide2_btn: "Solicitar Ahora",
    slide3_badge: "Tasa Preferencial",
    slide3_title: "Préstamos Personales con desembolso inmediato",
    slide3_btn: "Ir al Simulador",
    mov_row1_date: "Hoy, 10:30 a.m.",
    mov_row1_desc: "Transferencia a Carlos López (PEN)",
    mov_row1_chan: "Banca Móvil",
    mov_row2_date: "Ayer, 15:45 p.m.",
    mov_row2_desc: "Pago de Recibo Luz del Sur (PEN)",
    mov_row2_chan: "Pago Automático",
    mov_row3_date: "10 May, 09:15 a.m.",
    mov_row3_desc: "Abono de Planilla - Empresa S.A.C",
    mov_row3_chan: "Interbancario",
    status_processed: "Procesado",
    pub_sec_title: "Tu Banca por Internet INTEGRA-BANK PE",
    pub_sec_sub: "Para ver tus movimientos, estado de cuenta y contactos frecuentes, inicia sesión en tu cuenta.",
    pub_btn_login_now: "Iniciar Sesión Ahora",
    pub_btn_reg: "Registrarme",
    pub_card1_title: "Transferencias Interbancarias",
    pub_card1_desc: "Envía dinero a todo el Perú con CCI o mediante Yape y Plin sin comisiones adicionales.",
    pub_card2_title: "Control Total de Tarjetas",
    pub_card2_desc: "Activa o apaga las compras por internet y el uso en el extranjero en tiempo real.",
    pub_card3_title: "Préstamos al Instante",
    pub_card3_desc: "Simula tu crédito personal o solicita tu adelanto de sueldo con desembolso inmediato.",
    promo_title: "¡Adelanto de Sueldo disponible para clientes!",
    promo_badge: "0% Interés Mes 1",
    promo_desc: "Disfruta de hasta S/ 1,500.00 al instante en tu cuenta sin trámites presenciales.",
    promo_btn: "Desembolsar Ahora",
    mov_title: "Últimos Movimientos",
    mov_subtitle: "Transacciones en tiempo real de tus cuentas",
    filter_all: "Todos",
    filter_in: "Ingresos",
    filter_out: "Gastos",
    th_date: "Fecha y Hora",
    th_desc: "Descripción / Beneficiario",
    th_channel: "Canal",
    th_status: "Estado",
    th_amount: "Monto",
    bal_title: "Balance Mensual",
    bal_net: "Flujo Neto del Período",
    contacts_title: "Contactos Frecuentes",
    sec_title: "Controles de Seguridad de Tarjeta",
    sec_realtime: "En Tiempo Real",
    sec_item1_title: "Compras por Internet y Apps",
    sec_item1_desc: "Habilitado para comercio electrónico con Token",
    sec_item2_title: "Uso en el Extranjero (Viajes)",
    sec_item2_desc: "Desactivado por seguridad preventiva",
    sec_item3_title: "Retiro en Cajeros Automáticos",
    sec_item3_desc: "Límite diario: S/ 3,000.00 / $ 800.00",
    sec_fraud_q: "¿Pérdida o sospecha de fraude?",
    sec_freeze_btn: "Congelar Tarjeta",
    sim_title: "Simulador de Préstamo Personal",
    sim_subtitle: "Calcula tu cuota mensual estimada con desembolso inmediato a tu cuenta.",
    sim_lbl_amount: "Monto solicitado:",
    sim_min: "Mínimo S/ 1,000",
    sim_max: "Máximo S/ 50,000",
    sim_lbl_term: "Plazo de pago:",
    sim_est_installment: "Cuota Mensual Estimada",
    sim_total_pay: "Total a devolver:",
    sim_btn: "Solicitar Evaluación Inmediata",
    quick_title: "Operaciones Frecuentes",
    quick_sub: "Atajos seguros para tus transacciones diarias sin comisiones",
    op_avail_bal: "Saldos Disponibles:",
    op_card1_title: "Transferir Dinero",
    op_card1_desc: "A cualquier banco nacional en Soles o Dólares mediante CCI o cuenta.",
    op_card1_link: "Operar ahora →",
    op_card2_title: "Pago de Servicios",
    op_card2_desc: "Luz, agua, telefonía móvil, universidades y tributos SUNAT.",
    op_card2_link: "Pagar recibo →",
    op_card3_title: "Yape & Plin Integrado",
    op_card3_desc: "Envía a cualquier número de celular al instante sin comisión.",
    op_card3_link: "Enviar saldo →",
    op_card4_title: "Estado de Cuenta",
    op_card4_desc: "Consulta y descarga tus comprobantes y resúmenes en formato digital.",
    op_card4_link: "Obtener PDF →",
    form_badge: "Atención Preferencial",
    form_title: "Formulario de Solicitud de Productos y Asesoría",
    form_subtitle: "Completa tus datos para solicitar una nueva Tarjeta de Crédito, Apertura de Cuenta en Dólares o agendar una llamada con tu ejecutivo de cuenta en Trujillo.",
    form_Check1: "Evaluación crediticia en línea sin afectar tu score SBS.",
    form_Check2: "Respuesta garantizada en menos de 15 minutos hábiles.",
    form_Check3: "Protección de Datos Personales conforme a la Ley N° 29733.",
    form_imm_q: "¿Prefieres atención inmediata?",
    form_wa_link: "Escribir por WhatsApp →",
    lbl_fullname: "Nombres y Apellidos *",
    ph_fullname: "Ej: Andy Benites",
    lbl_dni: "DNI / Documento de Identidad *",
    ph_dni: "8 dígitos (Ej: 72849102)",
    lbl_email: "Correo Electrónico *",
    ph_email: "cliente@correo.com",
    lbl_phone: "Teléfono Celular *",
    ph_phone: "987654321",
    lbl_product: "Producto Financiero a Solicitar *",
    opt_select_prod: "-- Selecciona una opción --",
    opt_prod_1: "Tarjeta de Crédito Visa Signature",
    opt_prod_2: "Préstamo Personal Inmediato",
    opt_prod_3: "Depósito a Plazo Fijo (7.50% TREA)",
    opt_prod_4: "Portabilidad de Cuenta Sueldo",
    opt_prod_5: "Crédito Hipotecario / Vehicular",
    lbl_branch: "Sede / Canal de Atención *",
    opt_branch_1: "100% Digital (Videollamada / App)",
    opt_branch_2: "Agencia Centro Histórico - Trujillo",
    opt_branch_3: "Agencia Mall Plaza - Trujillo",
    opt_branch_4: "Agencia El Golf - Trujillo",
    lbl_message: "Comentarios o Consulta Adicional",
    ph_message: "Indica el horario en que prefieres ser contactado o detalles de tu solicitud...",
    lbl_terms: "Acepto el tratamiento de mis datos personales conforme a la <strong>Ley N° 29733</strong> y autorizo a INTEGRA-BANK PE a enviarme la propuesta comercial.",
    btn_submit_form: "Enviar Solicitud Bancaria",
    btn_clear_form: "Limpiar",
    footer_rights: "© 2026 Todos los derechos reservados.",
    footer_follow: "Síguenos:",
    modal_tr_title: "Nueva Transferencia Bancaria",
    modal_tr_origin: "Cuenta de Origen (Soles o Dólares)",
    modal_tr_ben: "Beneficiario / Contacto",
    ph_tr_ben: "Ej: Carlos López",
    modal_tr_dest: "Cuenta Destino / CCI / Celular Yape-Plin",
    ph_tr_dest: "193-49210-0-14",
    modal_tr_amount: "Monto a Enviar",
    btn_cancel: "Cancelar",
    btn_confirm_send: "Confirmar Envío",
    tr_prefix_today: "Hoy",
    tr_prefix_to: "Transferencia a",
    tr_channel_web: "Banca por Internet"
  },
  en: {
    top_security: "<strong>Secure Zone:</strong> 256-bit SSL encryption active. INTEGRA-BANK will never ask for passwords or tokens via email, call, or WhatsApp.",
    top_emergency: "24/7 Helpline:",
    top_help: "Help Center",
    nav_subtitle: "Online Banking",
    nav_accounts: "Home & Accounts",
    nav_payments: "Payments & Security",
    nav_loans: "Loan Simulator",
    nav_form: "Application Form",
    btn_login: "Sign In",
    btn_register: "Open Account",
    session_active: "Active Session ✓",
    welcome_public_title: "Welcome to <span class='text-[#064e3b] dark:text-[#a3e635]'>INTEGRA-BANK PE</span>!",
    welcome_public_sub: "Explore our digital banking services or sign in to view your accounts.",
    guest_badge: "24/7 Digital Banking",
    guest_protected: "Protected Access",
    guest_box_title: "Check your balances and make fee-free transactions",
    guest_box_desc: "Sign in with your Digital Key or link your Google, Facebook, Instagram, Microsoft, or Apple account to view your PEN and USD accounts.",
    hero_hello: "Hello,",
    hero_online: "Online",
    hero_last_login: "Verified secure session • Trujillo, PE",
    btn_hide_balance: "Hide Balances",
    btn_show_balance: "Show Balances",
    card_subtitle: "Signature Edition",
    card_holder: "Cardholder",
    card_expires: "Expires",
    acc_main_soles: "Main Savings Account (Soles)",
    acc_usd: "Savings Account (US Dollars)",
    btn_copy: "Copy",
    btn_transfer: "Transfer",
    fx_title: "Exchange Rate",
    fx_buy: "Buy",
    fx_sell: "Sell",
    fx_receive: "You receive approx:",
    fx_btn: "Trade Online",
    slide1_badge: "Secure Savings Campaign",
    slide1_title: "Grow your funds with a 7.50% APY Annual Rate",
    slide1_btn: "Apply for Fixed-Term",
    slide2_badge: "Exclusive for Clients",
    slide2_title: "Visa Signature Credit Card with zero annual fee",
    slide2_btn: "Apply Now",
    slide3_badge: "Preferential Rate",
    slide3_title: "Personal Loans with immediate disbursement",
    slide3_btn: "Go to Simulator",
    mov_row1_date: "Today, 10:30 a.m.",
    mov_row1_desc: "Transfer to Carlos López (PEN)",
    mov_row1_chan: "Mobile Banking",
    mov_row2_date: "Yesterday, 15:45 p.m.",
    mov_row2_desc: "Electricity Bill Payment - Luz del Sur (PEN)",
    mov_row2_chan: "Auto-Pay",
    mov_row3_date: "May 10, 09:15 a.m.",
    mov_row3_desc: "Payroll Deposit - Empresa S.A.C",
    mov_row3_chan: "Interbank",
    status_processed: "Processed",
    pub_sec_title: "Your INTEGRA-BANK PE Online Banking",
    pub_sec_sub: "To view your transactions, bank statements, and frequent contacts, please sign in to your account.",
    pub_btn_login_now: "Sign In Now",
    pub_btn_reg: "Register",
    pub_card1_title: "Interbank Transfers",
    pub_card1_desc: "Send money across Peru with CCI or via Yape and Plin with zero extra fees.",
    pub_card2_title: "Total Card Control",
    pub_card2_desc: "Enable or disable online shopping and international use in real time.",
    pub_card3_title: "Instant Personal Loans",
    pub_card3_desc: "Simulate your personal credit or request your salary advance with immediate disbursement.",
    promo_title: "Salary Advance available for clients!",
    promo_badge: "0% Interest Month 1",
    promo_desc: "Get up to S/ 1,500.00 instantly in your account with zero paperwork.",
    promo_btn: "Disburse Now",
    mov_title: "Recent Transactions",
    mov_subtitle: "Real-time movements from your accounts",
    filter_all: "All",
    filter_in: "Income",
    filter_out: "Expenses",
    th_date: "Date & Time",
    th_desc: "Description / Beneficiary",
    th_channel: "Channel",
    th_status: "Status",
    th_amount: "Amount",
    bal_title: "Monthly Balance",
    bal_net: "Net Period Cashflow",
    contacts_title: "Frequent Contacts",
    sec_title: "Card Security Controls",
    sec_realtime: "Real-Time",
    sec_item1_title: "Online & App Purchases",
    sec_item1_desc: "Enabled for e-commerce with Digital Token",
    sec_item2_title: "International Use (Travel)",
    sec_item2_desc: "Disabled for preventive security",
    sec_item3_title: "ATM Cash Withdrawal",
    sec_item3_desc: "Daily limit: S/ 3,000.00 / $ 800.00",
    sec_fraud_q: "Lost card or suspected fraud?",
    sec_freeze_btn: "Freeze Card",
    sim_title: "Personal Loan Simulator",
    sim_subtitle: "Calculate your estimated monthly payment with immediate disbursement.",
    sim_lbl_amount: "Requested amount:",
    sim_min: "Min S/ 1,000",
    sim_max: "Max S/ 50,000",
    sim_lbl_term: "Payment term:",
    sim_est_installment: "Estimated Monthly Payment",
    sim_total_pay: "Total to repay:",
    sim_btn: "Request Instant Evaluation",
    quick_title: "Frequent Operations",
    quick_sub: "Secure shortcuts for your daily fee-free transactions",
    op_avail_bal: "Available Balances:",
    op_card1_title: "Transfer Money",
    op_card1_desc: "To any national bank in Soles or Dollars via CCI or account number.",
    op_card1_link: "Operate now →",
    op_card2_title: "Bill Payments",
    op_card2_desc: "Electricity, water, mobile phone, universities, and SUNAT taxes.",
    op_card2_link: "Pay bill →",
    op_card3_title: "Integrated Yape & Plin",
    op_card3_desc: "Send money to any mobile phone number instantly with zero fees.",
    op_card3_link: "Send balance →",
    op_card4_title: "Bank Statement",
    op_card4_desc: "Check and download your receipts and monthly summaries in digital PDF.",
    op_card4_link: "Get PDF →",
    form_badge: "Priority Banking",
    form_title: "Product Application & Advisory Form",
    form_subtitle: "Fill in your details to apply for a new Credit Card, USD Savings Account, or schedule a call with your executive in Trujillo.",
    form_Check1: "Online credit evaluation without affecting your SBS score.",
    form_Check2: "Guaranteed response in under 15 business minutes.",
    form_Check3: "Personal Data Protection compliant with Peruvian Law N° 29733.",
    form_imm_q: "Prefer immediate assistance?",
    form_wa_link: "Chat on WhatsApp →",
    lbl_fullname: "Full Name *",
    ph_fullname: "Ex: Andy Benites",
    lbl_dni: "National ID / Document *",
    ph_dni: "8 digits (Ex: 72849102)",
    lbl_email: "Email Address *",
    ph_email: "client@email.com",
    lbl_phone: "Mobile Phone *",
    ph_phone: "987654321",
    lbl_product: "Financial Product to Request *",
    opt_select_prod: "-- Select an option --",
    opt_prod_1: "Visa Signature Credit Card",
    opt_prod_2: "Instant Personal Loan",
    opt_prod_3: "Fixed-Term Deposit (7.50% APY)",
    opt_prod_4: "Payroll Account Portability",
    opt_prod_5: "Mortgage / Auto Loan Advisory",
    lbl_branch: "Branch / Service Channel *",
    opt_branch_1: "100% Digital (Video Call / App)",
    opt_branch_2: "Historic Center Branch - Trujillo",
    opt_branch_3: "Mall Plaza Branch - Trujillo",
    opt_branch_4: "El Golf Branch - Trujillo",
    lbl_message: "Additional Comments or Inquiry",
    ph_message: "Enter your preferred contact time or specific details about your request...",
    lbl_terms: "I accept the processing of my personal data in accordance with <strong>Law N° 29733</strong> and authorize INTEGRA-BANK PE to send me commercial proposals.",
    btn_submit_form: "Submit Banking Request",
    btn_clear_form: "Clear",
    footer_rights: "© 2026 All rights reserved.",
    footer_follow: "Follow us:",
    modal_tr_title: "New Bank Transfer",
    modal_tr_origin: "Source Account (PEN or USD)",
    modal_tr_ben: "Beneficiary / Contact",
    ph_tr_ben: "Ex: Carlos López",
    modal_tr_dest: "Destination Account / CCI / Yape-Plin",
    ph_tr_dest: "193-49210-0-14",
    modal_tr_amount: "Amount to Send",
    btn_cancel: "Cancel",
    btn_confirm_send: "Confirm Transfer",
    tr_prefix_today: "Today",
    tr_prefix_to: "Transfer to",
    tr_channel_web: "Online Banking"
  },
  qu: {
    top_security: "<strong>Waqaychasqa Suyu:</strong> SSL 256-bit hark'aywan. INTEGRA-BANK mana hayk'aqpas pakasqa yupaykikunata mañakusunkichu.",
    top_emergency: "Yanapay 24/7:",
    top_help: "Yanapay Wasi",
    nav_subtitle: "Internetpi Qullqi Wasi",
    nav_accounts: "Qallariy & Yupaykuna",
    nav_payments: "Pagokuna & Waqaychay",
    nav_loans: "Manukuy Tupachina",
    nav_form: "Mañakuy Raphi",
    btn_login: "Yaykuy",
    btn_register: "Yupayta Kichay",
    session_active: "Kichasqa Sesión ✓",
    welcome_public_title: "¡Allinllachu hamusqayki <span class='text-[#064e3b] dark:text-[#a3e635]'>INTEGRA-BANK PE</span>!",
    welcome_public_sub: "Internetpi qullqi yanapakuykunata qhaway utaq yaykuy qullqiykita rikunaykipaq.",
    guest_badge: "Banca Digital 24/7",
    guest_protected: "Waqaychasqa Yaykuy",
    guest_box_title: "Qullqiykita qhaway hinaspa mana qullqiwan apachiy",
    guest_box_desc: "Clave Digital nisqawan yaykuy utaq Google, Facebook, Instagram, Microsoft, Apple yupaykiwan tinkiy Soles hinaspa Dólares qullqiykita qhawanaykipaq.",
    hero_hello: "Allinllachu,",
    hero_online: "Llikapi",
    hero_last_login: "Waqaychasqa yaykuy • Trujillo, PE",
    btn_hide_balance: "Qullqita Pakay",
    btn_show_balance: "Qullqita Rikuchiy",
    card_subtitle: "Signature Edition",
    card_holder: "Kaqniyuq",
    card_expires: "Tukukun",
    acc_main_soles: "Hatun Waqaychasqa Yupay (Soles)",
    acc_usd: "Waqaychasqa Yupay (Dólares)",
    btn_copy: "Kikinchanay",
    btn_transfer: "Apachiy",
    fx_title: "Qullqi Tikray",
    fx_buy: "Rantiy",
    fx_sell: "Qhatuy",
    fx_receive: "Chaskinki:",
    fx_btn: "Llikapi Tikray",
    slide1_badge: "Waqaychasqa Qullqi Huñuy",
    slide1_title: "Qullqiykita wiñachiy 7.50% TREA Wata Tasa nisqawan",
    slide1_btn: "Plazo Fijo Mañakuy",
    slide2_badge: "Rantiqkunallapaq",
    slide2_title: "Tarjeta de Crédito Visa Signature mana membresíayuq",
    slide2_btn: "Kunan Mañakuy",
    slide3_badge: "Allin Tasa",
    slide3_title: "Runapaq Qullqi Manukuy chaylla chaskinapaq",
    slide3_btn: "Tupachinaman Riy",
    mov_row1_date: "Kunan, 10:30 a.m.",
    mov_row1_desc: "Carlos López runaman apachisqa (PEN)",
    mov_row1_chan: "Celular Banca",
    mov_row2_date: "Qayna, 15:45 p.m.",
    mov_row2_desc: "K'anchay Recibo Pagasqa - Luz del Sur (PEN)",
    mov_row2_chan: "Kikinmanta Pago",
    mov_row3_date: "10 May, 09:15 a.m.",
    mov_row3_desc: "Llamk'ay Qullqi Yaykumuq - Empresa S.A.C",
    mov_row3_chan: "Huk Bancomanta",
    status_processed: "Ruwasqaña",
    pub_sec_title: "INTEGRA-BANK PE Internetpi Qullqi Wasiyki",
    pub_sec_sub: "Qullqi kuyuykunata, estado de cuenta nisqata hinaspa masikunata qhawanapaq, yupaykiman yaykuy.",
    pub_btn_login_now: "Kunan Yaykuy",
    pub_btn_reg: "Qillqakuy",
    pub_card1_title: "Huk Bancokunaman Apachiy",
    pub_card1_desc: "Tukuy Perú suyuman qullqita apachiy CCI nisqawan utaq Yape, Plin nisqawan mana yapasqa chaninwan.",
    pub_card2_title: "Tarjetaykita Kamachiy",
    pub_card2_desc: "Internetpi rantiyta utaq hawa llaqtakunapi llamk'achiyta kichay utaq wichq'ay.",
    pub_card3_title: "Utqaylla Qullqi Manukuy",
    pub_card3_desc: "Manukuyniykita tupachiy utaq llamk'ay qullqi ñawpaqchayta utqaylla mañakuy.",
    promo_title: "¡Sueldo Ñawpaqchay suyachkasunki!",
    promo_badge: "0% Interés Killa 1",
    promo_desc: "S/ 1,500.00 kama chaylla yupaykipi chaskiy mana tramitayuq.",
    promo_btn: "Kunan Chaskiy",
    mov_title: "Qhipa Qullqi Kuyuykuna",
    mov_subtitle: "Kunan pacha yupaykipi qullqi purisqan",
    filter_all: "Llapan",
    filter_in: "Yaykumuq",
    filter_out: "Lluqsiq",
    th_date: "P'unchaw & Hora",
    th_desc: "Willakuy / Chaskiq",
    th_channel: "Ñan",
    th_status: "Imayna Kashan",
    th_amount: "Hayk'a Qullqi",
    bal_title: "Killapa Tupachiynin",
    bal_net: "Killapi Qullqi Puchuq",
    contacts_title: "Sapa Kuti Apachisqakuna",
    sec_title: "Tarjeta Waqaychay Kamachikuna",
    sec_realtime: "Kunan Pacha",
    sec_item1_title: "Internetpi & Apps Rantiykuna",
    sec_item1_desc: "Token Digital nisqawan rantiykuna kichasqa",
    sec_item2_title: "Hawa Llaqtapi Llamk'achiy",
    sec_item2_desc: "Hark'ayrayku wichq'asqa",
    sec_item3_title: "Cajero Automático nisqamanta Hurquy",
    sec_item3_desc: "P'unchawpi tupuy: S/ 3,000.00 / $ 800.00",
    sec_fraud_q: "¿Chinkachikunkichu utaq suwayta maliciankichu?",
    sec_freeze_btn: "Tarjetata Hark'ay",
    sim_title: "Runapaq Qullqi Manukuy Tupachina",
    sim_subtitle: "Sapa killa paganaykita yupay chaylla qullqi chaskinaykipaq.",
    sim_lbl_amount: "Mañasqa qullqi:",
    sim_min: "Pisi S/ 1,000",
    sim_max: "Askha S/ 50,000",
    sim_lbl_term: "Hayk'a killapi kutichiy:",
    sim_est_installment: "Sapa Killa Yupasqa Pago",
    sim_total_pay: "Llapan kutichina:",
    sim_btn: "Utqaylla Qhawayta Mañakuy",
    quick_title: "Sapa Kuti Ruwaykuna",
    quick_sub: "P'unchawpi qullqi ruwaynikikunapaq utqaylla ñankuna",
    op_avail_bal: "Kachkaq Qullqikuna:",
    op_card1_title: "Qullqita Apachiy",
    op_card1_desc: "Mayqin Perú suyupi bancomanpas Soles utaq Dólares qullqipi CCI nisqawan.",
    op_card1_link: "Kunan ruway →",
    op_card2_title: "Servicios nisqata Pagay",
    op_card2_desc: "K'anchay, yaku, celular, hatun yachay wasikuna hinaspa SUNAT.",
    op_card2_link: "Recibota pagay →",
    op_card3_title: "Yape & Plin Huñusqa",
    op_card3_desc: "Mayqin celular yupaymanpas chaylla qullqita apachiy mana chaninwan.",
    op_card3_link: "Qullqita apachiy →",
    op_card4_title: "Estado de Cuenta Raphi",
    op_card4_desc: "Qullqi raphikunata qhaway hinaspa PDF nisqapi uraykachiy.",
    op_card4_link: "PDF chaskiy →",
    form_badge: "Ñawpaq Yanapay",
    form_title: "Rurukuna Mañakuy hinaspa Yanapay Raphi",
    form_subtitle: "Sutiykita hunt'achiy musuq Tarjeta de Crédito, Dólares Yupay kichanapaq utaq Trujillo llaqtapi qullqi yachaqwan rimanapaq.",
    form_Check1: "Llikapi qhaway mana SBS yupaykita waqllichispa.",
    form_Check2: "15 minutollapi kutichiy.",
    form_Check3: "Kamachiy N° 29733 nisqawan sapalla willakuykuna waqaychasqa.",
    form_imm_q: "¿Chaylla yanapaytachu munanki?",
    form_wa_link: "WhatsApp nisqapi qillqay →",
    lbl_fullname: "Sutikuna hinaspa Ayllu Sutikuna *",
    ph_fullname: "Qhaway: Andy Benites",
    lbl_dni: "DNI / Riqsichikuy Yupay *",
    ph_dni: "8 yupaykuna (Qhaway: 72849102)",
    lbl_email: "Correo Electrónico *",
    ph_email: "rantiq@correo.com",
    lbl_phone: "Celular Yupay *",
    ph_phone: "987654321",
    lbl_product: "Mañasqa Qullqi Ruru *",
    opt_select_prod: "-- Hukta akllay --",
    opt_prod_1: "Tarjeta de Crédito Visa Signature",
    opt_prod_2: "Utqaylla Qullqi Manukuy",
    opt_prod_3: "Plazo Fijo Waqaychay (7.50% TREA)",
    opt_prod_4: "Sueldo Yupay Apamuy",
    opt_prod_5: "Wasi / Antawa Manukuy Yanapay",
    lbl_branch: "Wasi / Yanapay Ñan *",
    opt_branch_1: "100% Digital (Videollamada / App)",
    opt_branch_2: "Centro Histórico Wasi - Trujillo",
    opt_branch_3: "Mall Plaza Wasi - Trujillo",
    opt_branch_4: "El Golf Wasi - Trujillo",
    lbl_message: "Yapay Willakuy utaq Tapukuy",
    ph_message: "Ima horapi waqyanaykuta munanki utaq mañakuyniykimanta willakuyta qillqay...",
    lbl_terms: "Willakuyniykunata <strong>Kamachiy N° 29733</strong> nisqawan apaykachanankuta chaskini.",
    btn_submit_form: "Mañakuyta Apachiy",
    btn_clear_form: "Pichay",
    footer_rights: "© 2026 Tukuy hayñikuna waqaychasqa.",
    footer_follow: "Qatiwayku:",
    modal_tr_title: "Musuq Qullqi Apachiy",
    modal_tr_origin: "Maymanta Qullqi Lluqsin (Soles utaq Dólares)",
    modal_tr_ben: "Chaskiq / Masi",
    ph_tr_ben: "Qhaway: Carlos López",
    modal_tr_dest: "Chaskiq Yupay / CCI / Yape-Plin",
    ph_tr_dest: "193-49210-0-14",
    modal_tr_amount: "Apachina Qullqi",
    btn_cancel: "Saqiy",
    btn_confirm_send: "Apachiyta Takyachiy",
    tr_prefix_today: "Kunan",
    tr_prefix_to: "Apachisqa:",
    tr_channel_web: "Internetpi Banca"
  }
};

function estaAutenticado() {
  return sessionStorage.getItem("autenticado_integrabank") === "true";
}

function formatearSoles(monto) {
  return "S/ " + monto.toLocaleString('es-PE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function formatearDolares(monto) {
  return "$ " + monto.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function obtenerFechaFormateada() {
  const opciones = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const locale = idiomaActual === "en" ? "en-US" : "es-PE";
  return new Date().toLocaleDateString(locale, opciones);
}

function obtenerHoraActual() {
  const ahora = new Date();
  let horas = ahora.getHours();
  const minutos = ahora.getMinutes().toString().padStart(2, '0');
  const ampm = horas >= 12 ? 'p.m.' : 'a.m.';
  horas = horas % 12 || 12;
  return `${horas}:${minutos} ${ampm}`;
}

function mostrarToast(mensaje) {
  const toast = document.getElementById("toast-notificacion");
  const mensajeSpan = document.getElementById("toast-mensaje");
  if (!toast || !mensajeSpan) return;
  mensajeSpan.textContent = mensaje;
  toast.classList.remove("translate-y-24", "opacity-0", "pointer-events-none");
  toast.classList.add("translate-y-0", "opacity-100");
  setTimeout(() => {
    toast.classList.remove("translate-y-0", "opacity-100");
    toast.classList.add("translate-y-24", "opacity-0", "pointer-events-none");
  }, 3500);
}

function copiarAlPortapapeles(texto, mensaje) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(texto).then(() => mostrarToast(mensaje));
  }
}

// TRADUCTOR INTEGRAL: TRADUCE TEXTOS, PLACEHOLDERS DE INPUTS Y OPCIONES
function cambiarIdioma(lang) {
  idiomaActual = lang;
  localStorage.setItem("idioma_banco", lang);
  document.documentElement.lang = lang;

  document.querySelectorAll("[data-i18n]").forEach(el => {
    const clave = el.getAttribute("data-i18n");
    if (traducciones[lang] && traducciones[lang][clave]) {
      el.innerHTML = traducciones[lang][clave];
    }
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
    const clave = el.getAttribute("data-i18n-placeholder");
    if (traducciones[lang] && traducciones[lang][clave]) {
      el.setAttribute("placeholder", traducciones[lang][clave]);
    }
  });

  const displayFecha = document.getElementById("fechaActualDisplay");
  if (displayFecha) displayFecha.textContent = obtenerFechaFormateada();

  actualizarSelectCuentasModal();
}

// INYECCIÓN DE MODALES (CON LOGOS SOCIALES OFICIALES Y SELECTOR SOLES/DÓLARES)
function inyectarComponentesGlobales() {
  const contenedor = document.createElement("div");
  contenedor.innerHTML = `
    <!-- MODAL DE INICIAR SESIÓN / CREAR CUENTA -->
    <div id="pantalla-auth-inicial" class="fixed inset-0 z-50 bg-[#041611]/80 backdrop-blur-sm hidden flex items-center justify-center p-4 overflow-y-auto">
      <div class="bg-white dark:bg-[#12171d] rounded-3xl shadow-2xl max-w-md w-full p-6 sm:p-8 border border-zinc-200 dark:border-emerald-950 my-auto relative">
        
        <button type="button" onclick="cerrarModalAuth()" class="absolute top-5 right-5 w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 hover:text-zinc-800 dark:hover:text-white flex items-center justify-center font-bold cursor-pointer">
          ✕
        </button>

        <div class="text-center mb-5">
          <img src="img/Logo2.jpg" alt="Logo IntegraBank" class="w-12 h-12 rounded-2xl mx-auto mb-2 object-cover shadow-md ring-4 ring-[#a3e635]/30" />
          <div class="text-[#063327] dark:text-white font-extrabold text-xl tracking-tight">
            INTEGRA<span class="text-emerald-600 dark:text-[#a3e635]">BANK</span> PE
          </div>
          <p class="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">Banca Digital Segura • Acceso de Clientes</p>
        </div>

        <div class="grid grid-cols-2 gap-2 bg-zinc-100 dark:bg-zinc-800 p-1 rounded-xl mb-5 text-xs font-bold">
          <button type="button" id="tab-btn-login" onclick="alternarTabAuth('login')" class="py-2 rounded-lg bg-white dark:bg-[#12171d] text-[#064e3b] dark:text-[#a3e635] shadow-xs cursor-pointer" data-i18n="btn_login">
            Iniciar Sesión
          </button>
          <button type="button" id="tab-btn-registro" onclick="alternarTabAuth('registro')" class="py-2 rounded-lg text-zinc-600 dark:text-zinc-300 cursor-pointer" data-i18n="btn_register">
            Abrir Cuenta
          </button>
        </div>

        <!-- FORMULARIO 1: INICIAR SESIÓN -->
        <form id="vista-form-login" onsubmit="procesarLoginInicial(event)" class="space-y-3.5 text-xs">
          <div>
            <label class="block font-bold text-zinc-700 dark:text-zinc-300 mb-1" data-i18n="lbl_dni">DNI / Documento de Identidad *</label>
            <input type="text" id="auth-login-dni" required data-i18n-placeholder="ph_dni" placeholder="8 dígitos (Ej: 72849102)" class="w-full bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 rounded-xl py-2.5 px-3 focus:outline-none focus:ring-2 focus:ring-[#84cc16]" />
          </div>
          <div>
            <label class="block font-bold text-zinc-700 dark:text-zinc-300 mb-1" data-i18n="lbl_fullname">Nombres y Apellidos *</label>
            <input type="text" id="auth-login-nombre" required data-i18n-placeholder="ph_fullname" placeholder="Ej: Andy Benites" class="w-full bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 rounded-xl py-2.5 px-3 focus:outline-none focus:ring-2 focus:ring-[#84cc16]" />
          </div>
          <div>
            <label class="block font-bold text-zinc-700 dark:text-zinc-300 mb-1">Clave Digital Web (6 dígitos)</label>
            <input type="password" required maxlength="6" placeholder="••••••" class="w-full bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 rounded-xl py-2.5 px-3 focus:outline-none focus:ring-2 focus:ring-[#84cc16]" />
          </div>
          <button type="submit" class="w-full bg-[#a3e635] hover:bg-[#bef264] text-zinc-950 font-extrabold py-3 rounded-xl shadow-md transition-all cursor-pointer" data-i18n="btn_login">
            Iniciar Sesión
          </button>
        </form>

        <!-- FORMULARIO 2: REGISTRARSE -->
        <form id="vista-form-registro" onsubmit="procesarRegistroInicial(event)" class="hidden space-y-3.5 text-xs">
          <div>
            <label class="block font-bold text-zinc-700 dark:text-zinc-300 mb-1" data-i18n="lbl_fullname">Nombres y Apellidos *</label>
            <input type="text" id="auth-reg-nombre" required data-i18n-placeholder="ph_fullname" placeholder="Ej: Andy Benites" class="w-full bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 rounded-xl py-2.5 px-3" />
          </div>
          <div class="grid grid-cols-2 gap-2">
            <div>
              <label class="block font-bold text-zinc-700 dark:text-zinc-300 mb-1" data-i18n="lbl_dni">DNI *</label>
              <input type="text" id="auth-reg-dni" required maxlength="8" placeholder="72849102" class="w-full bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 rounded-xl py-2.5 px-3" />
            </div>
            <div>
              <label class="block font-bold text-zinc-700 dark:text-zinc-300 mb-1" data-i18n="lbl_phone">Teléfono Celular *</label>
              <input type="tel" required maxlength="9" placeholder="987654321" class="w-full bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 rounded-xl py-2.5 px-3" />
            </div>
          </div>
          <div>
            <label class="block font-bold text-zinc-700 dark:text-zinc-300 mb-1" data-i18n="lbl_email">Correo Electrónico *</label>
            <input type="email" required data-i18n-placeholder="ph_email" placeholder="cliente@correo.com" class="w-full bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 rounded-xl py-2.5 px-3" />
          </div>
          <div>
            <label class="block font-bold text-zinc-700 dark:text-zinc-300 mb-1">Crear Clave Digital (6 dígitos) *</label>
            <input type="password" required maxlength="6" placeholder="••••••" class="w-full bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 rounded-xl py-2.5 px-3" />
          </div>
          <button type="submit" class="w-full bg-[#064e3b] hover:bg-emerald-800 text-[#a3e635] font-extrabold py-3 rounded-xl shadow-md transition-all cursor-pointer" data-i18n="btn_register">
            Abrir Cuenta
          </button>
        </form>

        <!-- SECCIÓN DE LOGIN SOCIAL CON LOGOS OFICIALES SVG -->
        <div class="relative flex py-4 items-center">
          <div class="flex-grow border-t border-zinc-200 dark:border-zinc-700"></div>
          <span class="flex-shrink mx-3 text-[10px] font-bold text-zinc-400 uppercase">Login Social Oficial</span>
          <div class="flex-grow border-t border-zinc-200 dark:border-zinc-700"></div>
        </div>

        <div class="grid grid-cols-5 gap-2 text-xs font-bold">
          <button type="button" onclick="iniciarSesionSocial('Google', 'Andy Benites')" title="Google" class="py-2.5 px-2 rounded-xl border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800 flex flex-col items-center justify-center gap-1 cursor-pointer transition-all">
            <svg class="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.4 1 3.5 3.6 1.6 7.4l3.7 2.8C6.2 7.2 8.9 5 12 5z"/>
              <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.6l3.7 2.9c2.2-2 3.7-5 3.7-8.7z"/>
              <path fill="#FBBC05" d="M5.3 14.8c-.2-.8-.4-1.6-.4-2.5s.2-1.7.4-2.5L1.6 7C.6 9 0 11.2 0 13.5s.6 4.5 1.6 6.5l3.7-2.9z"/>
              <path fill="#34A853" d="M12 24c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3.1 0-5.8-2.1-6.7-5l-3.7 2.9C3.5 21.4 7.4 24 12 24z"/>
            </svg>
            <span class="text-[10px]">Google</span>
          </button>

          <button type="button" onclick="iniciarSesionSocial('Facebook', 'Andy Benites')" title="Facebook" class="py-2.5 px-2 rounded-xl border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800 flex flex-col items-center justify-center gap-1 cursor-pointer transition-all">
            <svg class="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#1877F2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            <span class="text-[10px]">Facebook</span>
          </button>

          <button type="button" onclick="iniciarSesionSocial('Instagram', 'Andy Benites')" title="Instagram" class="py-2.5 px-2 rounded-xl border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800 flex flex-col items-center justify-center gap-1 cursor-pointer transition-all">
            <svg class="w-5 h-5" viewBox="0 0 24 24">
              <defs>
                <radialGradient id="ig-grad" r="150%" cx="30%" cy="107%">
                  <stop stop-color="#fdf497" offset="0"/>
                  <stop stop-color="#fdf497" offset="0.05"/>
                  <stop stop-color="#fd5949" offset="0.45"/>
                  <stop stop-color="#d6249f" offset="0.6"/>
                  <stop stop-color="#285AEB" offset="0.9"/>
                </radialGradient>
              </defs>
              <path fill="url(#ig-grad)" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            <span class="text-[10px]">Instagram</span>
          </button>

          <button type="button" onclick="iniciarSesionSocial('Microsoft', 'Andy Benites')" title="Microsoft" class="py-2.5 px-2 rounded-xl border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800 flex flex-col items-center justify-center gap-1 cursor-pointer transition-all">
            <svg class="w-5 h-5" viewBox="0 0 23 23">
              <path fill="#f35325" d="M1 1h10v10H1z"/>
              <path fill="#81bc06" d="M12 1h10v10H12z"/>
              <path fill="#05a6f0" d="M1 12h10v10H1z"/>
              <path fill="#ffba08" d="M12 12h10v10H12z"/>
            </svg>
            <span class="text-[10px]">Microsoft</span>
          </button>

          <button type="button" onclick="iniciarSesionSocial('Apple ID', 'Andy Benites')" title="Apple ID" class="py-2.5 px-2 rounded-xl bg-zinc-900 text-white hover:bg-zinc-800 flex flex-col items-center justify-center gap-1 cursor-pointer transition-all">
            <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M16.365 1.43c0 1.14-.493 2.27-1.177 3.08-.744.9-1.99 1.57-2.987 1.57-.12 0-.23-.02-.3-.03-.01-.06-.04-.22-.04-.39 0-1.15.572-2.27 1.206-2.98.804-.94 2.142-1.64 3.248-1.68.03.13.05.28.05.43zm4.565 15.71c-.03.07-.463 1.58-1.518 3.12-.945 1.34-1.94 2.71-3.43 2.71-1.517 0-1.9-.88-3.63-.88-1.698 0-2.302.91-3.67.91-1.377 0-2.332-1.26-3.428-2.8-1.287-1.82-2.323-4.63-2.323-7.28 0-4.28 2.797-6.55 5.552-6.55 1.448 0 2.675.95 3.6.95.865 0 2.222-1.01 3.902-1.01.613 0 2.886.06 4.374 2.19-.13.09-2.383 1.37-2.383 4.19 0 3.26 2.854 4.42 2.955 4.45z"/>
            </svg>
            <span class="text-[10px]">Apple</span>
          </button>
        </div>

      </div>
    </div>

    <!-- MODAL DE TRANSFERENCIA COMPARTIDO -->
    <div id="modal-transferencia" class="fixed inset-0 bg-[#041611]/75 backdrop-blur-sm z-50 hidden flex items-center justify-center p-4">
      <div class="bg-white dark:bg-[#12171d] rounded-2xl shadow-2xl max-w-md w-full p-6 border border-zinc-200 dark:border-emerald-950">
        <div class="flex justify-between items-center mb-4 pb-2 border-b border-zinc-100 dark:border-zinc-800">
          <h3 class="text-base font-bold text-zinc-900 dark:text-white" data-i18n="modal_tr_title">Nueva Transferencia Bancaria</h3>
          <button onclick="cerrarModalTransferencia()" class="text-zinc-400 hover:text-zinc-600 cursor-pointer">✕</button>
        </div>
        <form id="form-transferencia" class="space-y-3.5 text-xs">
          <div>
            <label class="block font-bold mb-1 text-zinc-700 dark:text-zinc-300" data-i18n="modal_tr_origin">Cuenta de Origen (Soles o Dólares)</label>
            <select id="select-cuenta-origen" class="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl py-2.5 px-3 font-bold text-[#064e3b] dark:text-[#a3e635] cursor-pointer">
              <option value="PEN" id="opt-origen-pen">Cuenta Soles (S/ 14,250.00)</option>
              <option value="USD" id="opt-origen-usd">Cuenta Dólares ($ 3,420.50)</option>
            </select>
          </div>
          <div>
            <label class="block font-bold mb-1 text-zinc-700 dark:text-zinc-300" data-i18n="modal_tr_ben">Beneficiario / Contacto</label>
            <input type="text" id="input-beneficiario" required data-i18n-placeholder="ph_tr_ben" placeholder="Ej: Carlos López" class="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl py-2 px-3" />
          </div>
          <div>
            <label class="block font-bold mb-1 text-zinc-700 dark:text-zinc-300" data-i18n="modal_tr_dest">Cuenta Destino / CCI / Celular Yape-Plin</label>
            <input type="text" id="input-cuenta-destino" required data-i18n-placeholder="ph_tr_dest" placeholder="193-49210-0-14" class="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl py-2 px-3" />
          </div>
          <div>
            <label class="block font-bold mb-1 text-zinc-700 dark:text-zinc-300"><span data-i18n="modal_tr_amount">Monto a Enviar</span> (<span id="simbolo-moneda-modal">S/</span>)</label>
            <input type="number" id="input-monto-transferir" required min="1" step="0.5" placeholder="0.00" class="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl py-2 px-3 font-bold" />
          </div>
          <div class="pt-2 flex gap-2">
            <button type="button" onclick="cerrarModalTransferencia()" class="flex-1 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 font-bold cursor-pointer" data-i18n="btn_cancel">Cancelar</button>
            <button type="submit" class="flex-1 py-2.5 rounded-xl bg-[#a3e635] hover:bg-[#bef264] text-zinc-950 font-extrabold cursor-pointer" data-i18n="btn_confirm_send">Confirmar Envío</button>
          </div>
        </form>
      </div>
    </div>
  `;
  document.body.appendChild(contenedor);

  const selectOrigen = document.getElementById("select-cuenta-origen");
  const simboloModal = document.getElementById("simbolo-moneda-modal");
  if (selectOrigen && simboloModal) {
    selectOrigen.addEventListener("change", () => {
      simboloModal.textContent = selectOrigen.value === "USD" ? "$" : "S/";
    });
  }
}

function actualizarSelectCuentasModal() {
  const optPen = document.getElementById("opt-origen-pen");
  const optUsd = document.getElementById("opt-origen-usd");
  if (optPen) optPen.textContent = `PEN - Soles (${formatearSoles(saldoSoles)})`;
  if (optUsd) optUsd.textContent = `USD - Dólares (${formatearDolares(saldoDolares)})`;
}

// SINCRONIZA LA INTERFAZ ENTRE MODO VISITANTE PÚBLICO Y MODO CLIENTE LOGUEADO
function actualizarVistaAutenticacion() {
  const logueado = estaAutenticado();

  const navInvitado = document.getElementById("nav-zona-invitado");
  const navUsuario = document.getElementById("nav-zona-usuario");
  if (navInvitado && navUsuario) {
    navInvitado.classList.toggle("hidden", logueado);
    navUsuario.classList.toggle("hidden", !logueado);
    navUsuario.classList.toggle("flex", logueado);
  }

  const saludoInvitado = document.getElementById("hero-saludo-invitado");
  const saludoCliente = document.getElementById("hero-saludo-cliente");
  const btnPrivacidad = document.getElementById("contenedor-btn-privacidad");
  if (saludoInvitado && saludoCliente) {
    saludoInvitado.classList.toggle("hidden", logueado);
    saludoCliente.classList.toggle("hidden", !logueado);
  }
  if (btnPrivacidad) {
    btnPrivacidad.classList.toggle("hidden", !logueado);
  }

  const numTarjeta = document.getElementById("numero-tarjeta-display");
  const titularTarjeta = document.getElementById("titular-tarjeta-display");
  if (numTarjeta && titularTarjeta) {
    if (logueado) {
      numTarjeta.innerHTML = `<span class="text-zinc-500">••••</span><span class="text-zinc-500">••••</span><span class="text-zinc-500">••••</span><span class="text-[#a3e635]">4589</span>`;
      titularTarjeta.textContent = nombreUsuarioActivo.toUpperCase();
    } else {
      numTarjeta.innerHTML = `<span class="text-zinc-500">••••</span><span class="text-zinc-500">••••</span><span class="text-zinc-500">••••</span><span class="text-[#a3e635]">••••</span>`;
      titularTarjeta.textContent = "CLIENTE PREFERENCIAL";
    }
  }

  const panelInvitado = document.getElementById("panel-saldos-invitado");
  const panelCliente = document.getElementById("panel-saldos-cliente");
  if (panelInvitado && panelCliente) {
    panelInvitado.classList.toggle("hidden", logueado);
    panelCliente.classList.toggle("hidden", !logueado);
    panelCliente.classList.toggle("flex", logueado);
  }

  const secPublica = document.getElementById("seccion-publica-beneficios");
  const secPrivada = document.getElementById("seccion-privada-movimientos");
  if (secPublica && secPrivada) {
    secPublica.classList.toggle("hidden", logueado);
    secPrivada.classList.toggle("hidden", !logueado);
    secPrivada.classList.toggle("flex", logueado);
  }

  const badgeSaldoOp = document.getElementById("badge-saldo-operaciones");
  if (badgeSaldoOp) {
    badgeSaldoOp.classList.toggle("hidden", !logueado);
  }

  if (logueado) {
    document.querySelectorAll(".nombre-usuario-dinamico").forEach(el => {
      el.textContent = nombreUsuarioActivo;
    });
    const avatar = document.getElementById("avatar-usuario");
    if (avatar) {
      const iniciales = nombreUsuarioActivo.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase();
      avatar.textContent = iniciales || "AB";
    }

    const elemSaldoSoles = document.getElementById("saldo-principal-display");
    if (elemSaldoSoles) {
      const montoFormat = formatearSoles(saldoSoles);
      elemSaldoSoles.setAttribute("data-monto", montoFormat);
      if (!saldosOcultos) elemSaldoSoles.textContent = montoFormat;
    }

    const elemSaldoUsd = document.getElementById("saldo-dolares-display");
    if (elemSaldoUsd) {
      const montoUsdFormat = formatearDolares(saldoDolares);
      elemSaldoUsd.setAttribute("data-monto", montoUsdFormat);
      if (!saldosOcultos) elemSaldoUsd.textContent = montoUsdFormat;
    }

    actualizarSelectCuentasModal();
  }
}

function abrirModalAuth(modo = "login") {
  const modal = document.getElementById("pantalla-auth-inicial");
  if (!modal) return;
  modal.classList.remove("hidden");
  alternarTabAuth(modo);
}

function cerrarModalAuth() {
  const modal = document.getElementById("pantalla-auth-inicial");
  if (modal) modal.classList.add("hidden");
}

function abrirModalLogin() {
  abrirModalAuth("login");
}

function alternarTabAuth(modo) {
  const formLogin = document.getElementById("vista-form-login");
  const formReg = document.getElementById("vista-form-registro");
  const btnLogin = document.getElementById("tab-btn-login");
  const btnReg = document.getElementById("tab-btn-registro");

  if (modo === "registro") {
    formLogin.classList.add("hidden");
    formReg.classList.remove("hidden");
    btnReg.className = "py-2 rounded-lg bg-white dark:bg-[#12171d] text-[#064e3b] dark:text-[#a3e635] shadow-xs cursor-pointer";
    btnLogin.className = "py-2 rounded-lg text-zinc-600 dark:text-zinc-300 cursor-pointer";
  } else {
    formReg.classList.add("hidden");
    formLogin.classList.remove("hidden");
    btnLogin.className = "py-2 rounded-lg bg-white dark:bg-[#12171d] text-[#064e3b] dark:text-[#a3e635] shadow-xs cursor-pointer";
    btnReg.className = "py-2 rounded-lg text-zinc-600 dark:text-zinc-300 cursor-pointer";
  }
}

function procesarLoginInicial(e) {
  e.preventDefault();
  const nombre = document.getElementById("auth-login-nombre").value.trim() || "Andy Benites";
  nombreUsuarioActivo = nombre;
  localStorage.setItem("usuario_integra", nombre);
  sessionStorage.setItem("autenticado_integrabank", "true");
  cerrarModalAuth();
  actualizarVistaAutenticacion();
  mostrarToast(`¡Sesión iniciada! Bienvenido, ${nombre}`);
}

function procesarRegistroInicial(e) {
  e.preventDefault();
  const nombre = document.getElementById("auth-reg-nombre").value.trim() || "Nuevo Cliente";
  nombreUsuarioActivo = nombre;
  localStorage.setItem("usuario_integra", nombre);
  sessionStorage.setItem("autenticado_integrabank", "true");
  cerrarModalAuth();
  actualizarVistaAutenticacion();
  mostrarToast(`¡Cuenta creada con éxito! Bienvenido, ${nombre}`);
}

function iniciarSesionSocial(proveedor, usuarioDefault) {
  nombreUsuarioActivo = usuarioDefault;
  localStorage.setItem("usuario_integra", nombreUsuarioActivo);
  sessionStorage.setItem("autenticado_integrabank", "true");
  cerrarModalAuth();
  actualizarVistaAutenticacion();
  const estadoSocial = document.getElementById("estado-social-nav");
  if (estadoSocial) estadoSocial.textContent = `${proveedor} ✓`;
  mostrarToast(`Autenticado correctamente con ${proveedor}`);
}

// AGREGAR MOVIMIENTO EN SOLES O DÓLARES A LA TABLA (CON SOPORTE MULTI-IDIOMA)
function agregarMovimientoTabla(beneficiario, monto, moneda = "PEN") {
  const lista = document.getElementById("lista-movimientos");
  if (!lista) return;

  const t = traducciones[idiomaActual] || traducciones.es;
  const tr = document.createElement("tr");
  tr.className = "item-movimiento hover:bg-zinc-50 dark:hover:bg-zinc-800/40 transition-colors";
  tr.setAttribute("data-tipo", "gastos");

  const montoFormateado = moneda === "USD" ? formatearDolares(monto) : formatearSoles(monto);

  tr.innerHTML = `
    <td class="py-3 px-3 text-zinc-500">${t.tr_prefix_today}, ${obtenerHoraActual()}</td>
    <td class="py-3 px-3 font-semibold text-zinc-800 dark:text-zinc-200">${t.tr_prefix_to} ${beneficiario} (${moneda})</td>
    <td class="py-3 px-3 text-zinc-500">${t.tr_channel_web}</td>
    <td class="py-3 px-3"><span class="bg-emerald-100 text-emerald-800 dark:bg-[#a3e635]/15 dark:text-[#a3e635] text-[10px] px-2 py-0.5 rounded-full font-bold" data-i18n="status_processed">${t.status_processed}</span></td>
    <td class="py-3 px-3 text-right font-bold text-rose-600">- ${montoFormateado}</td>
  `;

  lista.insertBefore(tr, lista.firstChild);
}

document.addEventListener("DOMContentLoaded", () => {
  inyectarComponentesGlobales();
  actualizarVistaAutenticacion();

  const selectorIdioma = document.getElementById("selector-idioma");
  if (selectorIdioma) {
    selectorIdioma.value = idiomaActual;
    selectorIdioma.addEventListener("change", (e) => {
      cambiarIdioma(e.target.value);
      const msgs = { es: "Idioma: Español 🇵🇪", en: "Language: English 🇺🇸", qu: "Rimay: Runasimi (Quechua) 🏔️" };
      mostrarToast(msgs[e.target.value] || msgs.es);
    });
  }
  cambiarIdioma(idiomaActual);

  const btnDarkMode = document.getElementById("btn-dark-mode");
  const htmlElement = document.documentElement;
  if (localStorage.getItem("tema") === "dark") htmlElement.classList.add("dark");

  if (btnDarkMode) {
    btnDarkMode.addEventListener("click", () => {
      htmlElement.classList.toggle("dark");
      localStorage.setItem("tema", htmlElement.classList.contains("dark") ? "dark" : "light");
    });
  }

  const btnMenuMovil = document.getElementById("btn-menu-movil");
  const menuPrincipal = document.getElementById("menu-principal");
  if (btnMenuMovil && menuPrincipal) {
    btnMenuMovil.addEventListener("click", () => {
      menuPrincipal.classList.toggle("hidden");
      menuPrincipal.classList.toggle("flex");
    });
  }

  const btnCerrarSesion = document.getElementById("btn-cerrar-sesion");
  if (btnCerrarSesion) {
    btnCerrarSesion.addEventListener("click", () => {
      sessionStorage.removeItem("autenticado_integrabank");
      actualizarVistaAutenticacion();
      mostrarToast("Has cerrado tu sesión bancaria. Modo visitante activo.");
    });
  }

  const btnToggleSaldos = document.getElementById("btn-toggle-saldos");
  if (btnToggleSaldos) {
    btnToggleSaldos.addEventListener("click", () => {
      saldosOcultos = !saldosOcultos;
      document.querySelectorAll(".valor-monetario").forEach(el => {
        el.textContent = saldosOcultos ? "••••••••" : el.getAttribute("data-monto");
      });
      const spanTexto = document.getElementById("texto-toggle-saldos");
      if (spanTexto) {
        spanTexto.textContent = saldosOcultos ? traducciones[idiomaActual].btn_show_balance : traducciones[idiomaActual].btn_hide_balance;
      }
    });
  }

  const carruselTrack = document.getElementById("carrusel-track");
  const indicadores = document.querySelectorAll(".indicador-carrusel");
  if (carruselTrack && indicadores.length > 0) {
    let slideActual = 0;
    setInterval(() => {
      slideActual = (slideActual + 1) % indicadores.length;
      carruselTrack.style.transform = `translateX(-${slideActual * 100}%)`;
    }, 5000);
  }

  // MESA DE CAMBIO CON 8 MONEDAS MUNDIALES
  const selectorMoneda = document.getElementById("selector-moneda");
  const inputMontoCambio = document.getElementById("input-monto-cambio");
  const tasas = {
    USD: { c: 3.750, v: 3.785 },
    EUR: { c: 4.050, v: 4.120 },
    GBP: { c: 4.820, v: 4.900 },
    JPY: { c: 0.025, v: 0.027 },
    CHF: { c: 4.280, v: 4.350 },
    CAD: { c: 2.740, v: 2.790 },
    CNY: { c: 0.520, v: 0.540 },
    BRL: { c: 0.670, v: 0.710 }
  };
  function calcCambio() {
    if (!selectorMoneda || !inputMontoCambio) return;
    const t = tasas[selectorMoneda.value] || tasas.USD;
    document.getElementById("valor-compra").textContent = t.c.toFixed(3);
    document.getElementById("valor-venta").textContent = t.v.toFixed(3);
    document.getElementById("label-moneda-origen").textContent = selectorMoneda.value;
    document.getElementById("resultado-cambio").textContent = `S/ ${( (parseFloat(inputMontoCambio.value)||0) * t.c ).toFixed(2)}`;
  }
  if (selectorMoneda) selectorMoneda.addEventListener("change", calcCambio);
  if (inputMontoCambio) inputMontoCambio.addEventListener("input", calcCambio);

  const sliderPrestamo = document.getElementById("slider-prestamo");
  const botonesPlazo = document.querySelectorAll(".btn-plazo");
  function calcularCuota() {
    if (!sliderPrestamo) return;
    const monto = parseFloat(sliderPrestamo.value);
    document.getElementById("display-monto-prestamo").textContent = formatearSoles(monto);
    const i = 0.0115;
    const cuota = monto * (i * Math.pow(1 + i, plazoSeleccionado)) / (Math.pow(1 + i, plazoSeleccionado) - 1);
    document.getElementById("display-cuota-mensual").textContent = formatearSoles(cuota);
    document.getElementById("display-total-devolver").textContent = formatearSoles(cuota * plazoSeleccionado);
  }
  if (sliderPrestamo) {
    sliderPrestamo.addEventListener("input", calcularCuota);
    calcularCuota();
  }
  botonesPlazo.forEach(btn => {
    btn.addEventListener("click", () => {
      plazoSeleccionado = parseInt(btn.getAttribute("data-meses"));
      calcularCuota();
    });
  });

  ["switch-compras-web", "switch-exterior", "switch-cajeros"].forEach(id => {
    const sw = document.getElementById(id);
    if (sw) {
      sw.addEventListener("click", () => {
        if (!estaAutenticado()) {
          mostrarToast("Inicia sesión para modificar la seguridad de tu tarjeta");
          abrirModalAuth("login");
          return;
        }
        const bolita = sw.querySelector("div");
        bolita.classList.toggle("translate-x-6");
        bolita.classList.toggle("translate-x-0");
        sw.classList.toggle("bg-[#84cc16]");
        sw.classList.toggle("bg-zinc-300");
        mostrarToast("Configuración de seguridad actualizada");
      });
    }
  });

  // PROCESAR TRANSFERENCIAS DESCONTANDO DE SOLES (PEN) O DÓLARES (USD)
  const formTransferencia = document.getElementById("form-transferencia");
  if (formTransferencia) {
    formTransferencia.addEventListener("submit", (e) => {
      e.preventDefault();
      const monedaElegida = document.getElementById("select-cuenta-origen").value;
      const ben = document.getElementById("input-beneficiario").value.trim();
      const monto = parseFloat(document.getElementById("input-monto-transferir").value);

      if (monto <= 0) return alert("Ingresa un monto válido.");

      if (monedaElegida === "USD") {
        if (monto > saldoDolares) {
          return alert("Saldo insuficiente en tu Cuenta de Ahorros en Dólares.");
        }
        saldoDolares -= monto;
        localStorage.setItem("saldo_integra_usd", saldoDolares);
        agregarMovimientoTabla(ben, monto, "USD");
        mostrarToast(`Transferencia de ${formatearDolares(monto)} a ${ben} exitosa`);
      } else {
        if (monto > saldoSoles) {
          return alert("Saldo insuficiente en tu Cuenta Principal en Soles.");
        }
        saldoSoles -= monto;
        localStorage.setItem("saldo_integra", saldoSoles);
        agregarMovimientoTabla(ben, monto, "PEN");
        mostrarToast(`Transferencia de ${formatearSoles(monto)} a ${ben} exitosa`);
      }

      actualizarVistaAutenticacion();
      cerrarModalTransferencia();
      formTransferencia.reset();
      document.getElementById("simbolo-moneda-modal").textContent = "S/";
    });
  }

  const formSolicitud = document.getElementById("form-solicitud-bancaria");
  if (formSolicitud) {
    formSolicitud.addEventListener("submit", (e) => {
      e.preventDefault();
      const prod = document.getElementById("sol-producto").value;
      mostrarToast(`Solicitud de "${prod}" enviada con éxito.`);
      formSolicitud.reset();
    });
  }
});

function abrirModalTransferencia(ben = "", cta = "", moneda = "PEN") {
  if (!estaAutenticado()) {
    mostrarToast("Inicia sesión para realizar una transferencia");
    abrirModalAuth("login");
    return;
  }
  const m = document.getElementById("modal-transferencia");
  if (!m) return;
  m.classList.remove("hidden");
  actualizarSelectCuentasModal();

  const selectOrigen = document.getElementById("select-cuenta-origen");
  const simboloModal = document.getElementById("simbolo-moneda-modal");
  if (selectOrigen && simboloModal) {
    selectOrigen.value = moneda;
    simboloModal.textContent = moneda === "USD" ? "$" : "S/";
  }
  if (ben) document.getElementById("input-beneficiario").value = ben;
  if (cta) document.getElementById("input-cuenta-destino").value = cta;
}

function cerrarModalTransferencia() {
  const m = document.getElementById("modal-transferencia");
  if (m) m.classList.add("hidden");
}

function abrirModalServicios() {
  abrirModalTransferencia("Servicio Luz / Agua", "002-849102-0-12", "PEN");
}

function confirmarBloqueo() {
  if (!estaAutenticado()) {
    mostrarToast("Inicia sesión para bloquear tu tarjeta");
    abrirModalAuth("login");
    return;
  }
  mostrarToast("Tarjeta **** 4589 congelada preventivamente.");
}

function solicitarAdelantoSueldo() {
  if (!estaAutenticado()) {
    mostrarToast("Inicia sesión para desembolsar tu Adelanto de Sueldo");
    abrirModalAuth("login");
    return;
  }
  saldoSoles += 1500;
  localStorage.setItem("saldo_integra", saldoSoles);
  actualizarVistaAutenticacion();
  mostrarToast("¡S/ 1,500.00 abonados a tu cuenta principal!");
}

function solicitarEvaluacionCredito() {
  if (!estaAutenticado()) {
    mostrarToast("Inicia sesión o regístrate para solicitar este préstamo");
    abrirModalAuth("login");
    return;
  }
  mostrarToast("Evaluación aprobada. Revisa tu correo electrónico.");
}

function ejecutarCambioMoneda() {
  if (!estaAutenticado()) {
    mostrarToast("Inicia sesión para operar divisas en línea");
    abrirModalAuth("login");
    return;
  }
  const moneda = document.getElementById("selector-moneda").value;
  const monto = parseFloat(document.getElementById("input-monto-cambio").value) || 0;
  mostrarToast(`Operación de cambio por ${monto} ${moneda} procesada con éxito.`);
}

function descargarEstadoCuenta() {
  if (!estaAutenticado()) {
    mostrarToast("Inicia sesión para descargar tu Estado de Cuenta");
    abrirModalAuth("login");
    return;
  }
  mostrarToast("Descargando EstadoCuenta_2026.pdf...");
}

function filtrarMovimientos(tipo) {
  document.querySelectorAll(".item-movimiento").forEach(item => {
    item.classList.toggle("hidden", tipo !== "todos" && item.getAttribute("data-tipo") !== tipo);
  });
}
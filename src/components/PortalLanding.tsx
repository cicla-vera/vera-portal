import type { ReactNode } from 'react';
import {
  ArrowRight,
  Bot,
  BrainCircuit,
  Download,
  EyeOff,
  FileCheck2,
  Fingerprint,
  LockKeyhole,
  MapPin,
  Mic,
  Moon,
  Radio,
  Server,
  ShieldCheck,
  Smartphone,
  TimerReset,
  Users,
} from 'lucide-react';

const apkDownloadUrl = import.meta.env.VITE_VERA_APK_URL as string | undefined;

const heroBadges = [
  { icon: <Fingerprint size={15} />, label: 'Hash SHA-256 em cada evidencia' },
  { icon: <BrainCircuit size={15} />, label: 'IA analisa antes de salvar' },
  { icon: <Radio size={15} />, label: 'Rede de apoio notificada' },
  { icon: <EyeOff size={15} />, label: 'Acesso discreto e protegido' },
];

const impactStats = [
  {
    tone: 'pink',
    value: '≈87%',
    text: 'dos feminicidios no Brasil ocorreram sem que a vitima tivesse medida protetiva.',
  },
  {
    tone: 'plum',
    value: '≈35%',
    text: 'dos casos de violencia domestica sao arquivados por insuficiencia de provas.',
  },
];

const differentials = [
  {
    number: '01',
    problem: 'Dificuldade de agir na crise',
    title: 'Sentinela de audio',
    text: 'O Modo Seguranca Vera monitora audio em blocos. A IA tria cada trecho e so preserva o que configura ameaca, ofensa ou agressao.',
  },
  {
    number: '02',
    problem: 'Autenticidade dificil de demonstrar',
    title: 'Localizacao, timestamp e hash',
    text: 'Cada evidencia recebe hash SHA-256, coordenadas, data, hora e trilha de auditoria para apoiar a cadeia de custodia.',
  },
  {
    number: '03',
    problem: 'Risco de destruicao local',
    title: 'Retencao minima no aparelho',
    text: 'Arquivos temporarios existem apenas para triagem e envio. Evidencias confirmadas sao enviadas ao backend e removidas da fila local quando concluidas.',
  },
  {
    number: '04',
    problem: 'Acesso indesejado ao recurso',
    title: 'Camada discreta dentro do Cicla',
    text: 'O Vera funciona como modulo protegido do ecossistema Cicla, com acesso separado e fluxo pensado para nao chamar atencao.',
  },
];

const howSteps = [
  {
    icon: <Mic size={22} />,
    tone: 'blue',
    title: 'Gravacao em blocos',
    text: 'O audio e capturado em chunks durante o Modo Seguranca. O conteudo comum e descartado.',
  },
  {
    icon: <Bot size={22} />,
    tone: 'pink',
    title: 'Triagem por IA',
    text: 'O ai-service detecta ofensa, ameaca ou agressao e retorna risco, comentario e recomendacao.',
  },
  {
    icon: <ShieldCheck size={22} />,
    tone: 'plum',
    title: 'Hash e custodia',
    text: 'O backend calcula hash seguro, encadeia chunks e registra eventos de auditoria.',
  },
  {
    icon: <TimerReset size={22} />,
    tone: 'coffee',
    title: 'Janela de pos-alerta',
    text: 'Quando ha deteccao, o app preserva contexto anterior e os proximos 2 minutos.',
  },
];

const supportFeatures = [
  {
    icon: <Users size={20} />,
    title: 'Contatos por prioridade',
    text: 'Defina quem deve ser acionado primeiro e acompanhe o status de envio.',
  },
  {
    icon: <MapPin size={20} />,
    title: 'Localizacao automatica',
    text: 'Locais de risco podem ativar o monitoramento quando a usuaria entra na area.',
  },
  {
    icon: <FileCheck2 size={20} />,
    title: 'Status em tempo real',
    text: 'Sessao ativa, nivel de alerta, pendencias e falhas ficam visiveis na central.',
  },
];

const architectureCards = [
  {
    tag: 'mobile',
    icon: <Smartphone size={22} />,
    title: 'App Vera',
    text: 'React Native/Expo com Modo Seguranca, audio em chunks, localizacao e envio de evidencias.',
  },
  {
    tag: 'backend',
    icon: <Server size={22} />,
    title: 'Backend API',
    text: 'NestJS com autenticacao, sessoes, contatos, evidencias, hashes, auditoria e relatorio.',
  },
  {
    tag: 'ai',
    icon: <BrainCircuit size={22} />,
    title: 'Servico de IA',
    text: 'FastAPI para analise de audio, risco, comentarios da IA e transcricao quando configurada.',
  },
  {
    tag: 'portal',
    icon: <LockKeyhole size={22} />,
    title: 'Portal Vera',
    text: 'Central web para provas, comentarios da IA, integridade, localizacao e PDF.',
  },
];

const portalFeatures = [
  'Sessoes e provas com timestamps, localizacao e historico completo.',
  'Comentarios da IA com nivel de risco e recomendacao por evidencia.',
  'Hash SHA-256 visivel para verificacao tecnica e cadeia de custodia.',
  'Relatorio exportavel em PDF para apoiar atendimento e medida protetiva.',
  'Acesso restrito: a central operacional so abre com login e senha.',
];

const faqs = [
  {
    question: 'O Vera grava tudo o tempo todo?',
    answer:
      'Nao. O audio e capturado em blocos apenas com o Modo Seguranca ativo. Cada bloco passa pela triagem da IA antes de ser salvo. So ameaca, ofensa ou agressao relevante vira evidencia.',
  },
  {
    question: 'E se alguem pegar meu celular?',
    answer:
      'O Vera foi pensado para funcionar de forma discreta dentro do Cicla. As evidencias confirmadas sao enviadas ao backend, e o acesso ao modulo protegido exige fluxo separado.',
  },
  {
    question: 'Como demonstrar que uma evidencia e legitima?',
    answer:
      'Cada evidencia recebe hash SHA-256, timestamp, metadados e eventos de auditoria. O portal apresenta essa trilha tecnica no relatorio.',
  },
  {
    question: 'O Portal e diferente do app?',
    answer:
      'Sim. O app protege e envia os registros. O portal e a central de acompanhamento, revisao das provas, analises e exportacao do relatorio.',
  },
  {
    question: 'Quem consegue acessar o Portal Vera?',
    answer:
      'Somente usuarios autenticados com login e senha. A landing e publica, mas a central de evidencias nao e carregada antes da autenticacao.',
  },
];

export function PortalLanding({ onOpenAccess }: { onOpenAccess: () => void }) {
  return (
    <div className="portal-landing no-print">
      <LandingNav onOpenAccess={onOpenAccess} />
      <HeroSection onOpenAccess={onOpenAccess} />
      <ImpactSection />
      <CiclaVeraSection />
      <DifferentialsSection />
      <HowItWorksSection />
      <SupportNetworkSection />
      <ArchitectureSection />
      <DownloadSection />
      <PortalAccessSection onOpenAccess={onOpenAccess} />
      <FaqSection />
      <LandingFooter />
    </div>
  );
}

function LandingNav({ onOpenAccess }: { onOpenAccess: () => void }) {
  return (
    <nav className="landing-nav" aria-label="Navegacao da landing Vera">
      <a className="landing-nav-logo" href="#topo">
        <img src="/cicla-vera-logo.png" alt="Cicla Vera" />
      </a>
      <div className="landing-nav-links">
        <a href="#ciclavera">Cicla + Vera</a>
        <a href="#diferenciais">Diferenciais</a>
        <a href="#download">App</a>
        <a href="#faq">Duvidas</a>
        <button className="landing-nav-cta" type="button" onClick={onOpenAccess}>
          Portal Vera
        </button>
      </div>
    </nav>
  );
}

function HeroSection({ onOpenAccess }: { onOpenAccess: () => void }) {
  return (
    <section className="landing-hero landing-grid-bg" id="topo">
      <div className="landing-rings" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </div>
      <p className="landing-eyebrow">Zona de Seguranca</p>
      <h1>
        Uma ajuda na
        <br />
        <em>palma da mao.</em>
      </h1>
      <p className="landing-hero-sub">
        Vera monitora, preserva evidencias com integridade tecnica e mantem sua
        rede de apoio acionavel, com a central protegida por login e senha.
      </p>
      <div className="landing-actions">
        <a className="landing-button primary" href="#download">
          <Download size={18} />
          <span>Ver app</span>
        </a>
        <button className="landing-button secondary" type="button" onClick={onOpenAccess}>
          <LockKeyhole size={18} />
          <span>Acessar portal</span>
        </button>
      </div>
      <div className="landing-badges">
        {heroBadges.map((badge) => (
          <span className="landing-badge" key={badge.label}>
            {badge.icon}
            {badge.label}
          </span>
        ))}
      </div>
    </section>
  );
}

function ImpactSection() {
  return (
    <section className="landing-section impact landing-grid-bg" id="impacto">
      <SectionIntro
        label="O problema"
        title={
          <>
            Por que isso <em>importa.</em>
          </>
        }
        text="No Brasil, vitimas de violencia domestica enfrentam dois obstaculos recorrentes: a falta de protecao formal e a ausencia de provas na hora certa."
      />
      <div className="landing-stat-grid">
        {impactStats.map((stat) => (
          <article className={`landing-stat ${stat.tone}`} key={stat.value}>
            <strong>{stat.value}</strong>
            <p>{stat.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function CiclaVeraSection() {
  return (
    <section className="landing-section ciclavera landing-grid-bg" id="ciclavera">
      <SectionIntro label="Ecossistema" title="Saude e seguranca. No mesmo lugar." />
      <div className="ciclavera-body">
        <div className="ciclavera-copy">
          <Pill icon={<Moon size={16} />} tone="pink">
            Cicla
          </Pill>
          <h3>O app que ja cuida do seu ciclo</h3>
          <p>
            Cicla acompanha calendario menstrual, registros diarios, humor,
            sintomas e bem-estar para entender diferentes fases do mes.
          </p>
          <div className="landing-divider" />
          <Pill icon={<LockKeyhole size={16} />} tone="blue">
            Vera
          </Pill>
          <h3>A camada de protecao integrada</h3>
          <p>
            Vera e o modulo de seguranca pessoal dentro do ecossistema Cicla:
            ativa monitoramento, preserva evidencias e organiza provas sem
            separar saude de seguranca.
          </p>
        </div>
        <div className="ciclavera-brand">
          <img src="/cicla-vera-logo.png" alt="Cicla Vera" />
          <p>Uma ajuda na palma da mao</p>
        </div>
      </div>
    </section>
  );
}

function DifferentialsSection() {
  return (
    <section className="landing-section landing-grid-bg" id="diferenciais">
      <SectionIntro
        label="O que o Vera resolve"
        title="Quatro respostas para quatro obstaculos reais."
        text="Cada funcionalidade foi projetada para um problema concreto antes, durante e depois de uma situacao de violencia."
      />
      <div className="landing-card-grid">
        {differentials.map((item) => (
          <article className="landing-diff-card" key={item.number}>
            <span>{item.number}</span>
            <small>{item.problem}</small>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function HowItWorksSection() {
  return (
    <section className="landing-section how" id="como-funciona">
      <SectionIntro label="Como funciona" title="Simples de ativar. Rigoroso nas provas." />
      <div className="landing-step-grid">
        {howSteps.map((step) => (
          <article className="landing-step" key={step.title}>
            <div className={`landing-step-icon ${step.tone}`}>{step.icon}</div>
            <h3>{step.title}</h3>
            <p>{step.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function SupportNetworkSection() {
  return (
    <section className="landing-section support">
      <SectionIntro
        label="Rede de apoio"
        title="Voce nao precisa passar por isso sozinha."
        text="Contatos de confianca podem ser acionados discretamente quando uma sessao de alerta e ativada."
      />
      <div className="support-grid">
        {supportFeatures.map((feature) => (
          <article className="support-item" key={feature.title}>
            <div>{feature.icon}</div>
            <span>
              <strong>{feature.title}</strong>
              <p>{feature.text}</p>
            </span>
          </article>
        ))}
      </div>
    </section>
  );
}

function ArchitectureSection() {
  return (
    <section className="landing-section landing-grid-bg" id="ecossistema">
      <SectionIntro
        label="Arquitetura"
        title="Quatro camadas. Uma protecao continua."
        text="Do celular ao portal, cada componente trabalha junto para transformar deteccao em registro verificavel."
      />
      <div className="architecture-grid">
        {architectureCards.map((card) => (
          <article className={`architecture-card ${card.tag}`} key={card.tag}>
            <div>{card.icon}</div>
            <span>{card.tag}</span>
            <h3>{card.title}</h3>
            <p>{card.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function DownloadSection() {
  return (
    <section className="landing-section download landing-grid-bg" id="download">
      <div className="download-copy">
        <SectionIntro
          label="Baixar o app"
          title="Seu escudo. No bolso."
          text="O app Vera roda em Android. O link publico do APK sera configurado aqui quando a validacao final for concluida."
        />
        <p>
          Enquanto isso, o acesso operacional ao portal segue restrito a usuarios
          com login e senha cadastrados no backend.
        </p>
      </div>
      <div className="download-card">
        <div className="download-icon">
          <Smartphone size={26} />
        </div>
        <h3>Vera para Android</h3>
        <p>Link direto em breve via VITE_VERA_APK_URL.</p>
        {apkDownloadUrl ? (
          <a className="download-button" href={apkDownloadUrl}>
            <Download size={18} />
            Baixar APK
          </a>
        ) : (
          <button className="download-button disabled" disabled type="button">
            <Download size={18} />
            Em breve
          </button>
        )}
        <code>// VITE_VERA_APK_URL</code>
      </div>
    </section>
  );
}

function PortalAccessSection({ onOpenAccess }: { onOpenAccess: () => void }) {
  return (
    <section className="landing-section portal-access landing-grid-bg" id="portal-access-section">
      <SectionIntro
        label="Portal Vera"
        title="Tudo visivel. Nada perdido."
        text="A central consolida evidencias, comentarios da IA, integridade dos dados e relatorios. O conteudo real so e carregado apos login e senha."
      />
      <div className="portal-feature-grid">
        <div>
          {portalFeatures.map((feature) => (
            <p className="portal-feature" key={feature}>
              <span />
              {feature}
            </p>
          ))}
        </div>
        <button className="portal-login-button" type="button" onClick={onOpenAccess}>
          <LockKeyhole size={18} />
          Entrar com login e senha
          <ArrowRight size={18} />
        </button>
      </div>
    </section>
  );
}

function FaqSection() {
  return (
    <section className="landing-section faq landing-grid-bg" id="faq">
      <SectionIntro label="Duvidas frequentes" title="Perguntas e respostas." />
      <div className="faq-list">
        {faqs.map((item) => (
          <details className="faq-item" key={item.question}>
            <summary>
              <h3>{item.question}</h3>
              <span>+</span>
            </summary>
            <p>{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

function LandingFooter() {
  return (
    <footer className="landing-footer">
      <img src="/cicla-vera-logo.png" alt="Cicla Vera" />
      <p>2026 Cicla Vera. Central protegida por autenticacao.</p>
      <div>
        <a href="#ciclavera">Cicla + Vera</a>
        <a href="#portal-access-section">Portal</a>
        <a href="#download">App</a>
        <a href="#faq">Duvidas</a>
      </div>
    </footer>
  );
}

function SectionIntro({
  label,
  text,
  title,
}: {
  label: string;
  text?: string;
  title: ReactNode;
}) {
  return (
    <div className="landing-section-intro">
      <span>{label}</span>
      <h2>{title}</h2>
      {text ? <p>{text}</p> : null}
    </div>
  );
}

function Pill({
  children,
  icon,
  tone,
}: {
  children: ReactNode;
  icon: ReactNode;
  tone: 'blue' | 'pink';
}) {
  return (
    <span className={`landing-pill ${tone}`}>
      {icon}
      {children}
    </span>
  );
}

export type StepType = 'single' | 'multi' | 'info' | 'custom';

export interface QuizStepConfig {
    id: number;
    type: StepType;
    title?: string;
    subtitle?: string;
    options?: { label: string; value: any; icon?: string; image?: string }[];
    validation?: { required: boolean; min?: number };
    component?: string;
    autoAdvance?: boolean;
    showProgress?: boolean;
}

export const quizSteps: Record<number, QuizStepConfig> = {
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // BLOCO 1 - DADOS BÁSICOS (1-9)
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    // ETAPA 1: Gênero
    1: {
        id: 1,
        type: 'custom',
        component: 'GenderStep',
        showProgress: false,
    },

    // ETAPA 2: Idade
    2: {
        id: 2,
        type: 'custom',
        component: 'AgeSelector',
        title: 'Quantos anos você tem?',
        subtitle: 'Isso me ajuda a ajustar a dose mais precisa para o SEU corpo.',
        options: [
            { label: '18-29 anos', value: '18-29', image: 'https://i.imgur.com/jLepSKu.png' },
            { label: '30-49 anos', value: '30-49', image: 'https://i.imgur.com/bpy4PHN.png' },
            { label: '50-59 anos', value: '50-59', image: 'https://i.imgur.com/5N9aVyz.png' },
            { label: '60+ anos', value: '60+', image: 'https://i.imgur.com/hPUJ5i2.png' },
        ],
        autoAdvance: true,
        showProgress: true,
    },

    // ETAPA 3: Social Proof Idade
    3: {
        id: 3,
        type: 'info',
        component: 'SocialProofAge',
        showProgress: true,
    },

    // ETAPA 4: Altura e Peso
    4: {
        id: 4,
        type: 'custom',
        component: 'WeightHeightSliders',
        showProgress: true,
    },

    // ETAPA 5: Corpo Atual
    5: {
        id: 5,
        type: 'custom',
        title: 'Como você vê o seu corpo hoje?',
        component: 'BodyImageSelector',
        options: [
            { label: 'Levemente acima do peso', value: 'levemente', image: 'https://i.imgur.com/F8yoaDY.png' },
            { label: 'Acima do peso', value: 'acima', image: 'https://i.imgur.com/gkIYfbo.png' },
            { label: 'Muito acima do peso', value: 'muito', image: 'https://i.imgur.com/vy36eXX.png' },
            { label: 'Extremamente acima do peso', value: 'obesidade', image: 'https://i.imgur.com/ktQe2u2.png' },
        ],
        showProgress: true,
    },

    // ETAPA 6: Meta de Peso
    6: {
        id: 6,
        type: 'custom',
        component: 'WeightGoalSelector',
        title: 'Quantos quilos você PRECISA perder para se sentir bem?',
        subtitle: 'Baseado no seu corpo atual, estas são metas realistas:',
        showProgress: true,
    },

    // ETAPA 7: Corpo dos Sonhos
    7: {
        id: 7,
        type: 'custom',
        title: 'Qual é o corpo dos seus SONHOS?',
        component: 'DreamBodySelector',
        options: [
            { label: 'Apenas sem barriga', value: 'sem_barriga', image: 'https://i.imgur.com/fEZChDm.png' },
            { label: 'Curvilíneo', value: 'curvilineo', image: 'https://i.imgur.com/to5ozKe.png' },
            { label: 'Definida', value: 'definido', image: 'https://i.imgur.com/BehLSX4.png' },
            { label: 'Magrinha', value: 'magro', image: 'https://i.imgur.com/ypwpb9D.png' },
        ],
        showProgress: true,
    },

    // ETAPA 8: IMC Resultado
    8: {
        id: 8,
        type: 'custom',
        component: 'BMIResult',
        showProgress: true,
    },

    // ETAPA 9: Peso Ideal (Target)
    9: {
        id: 9,
        type: 'custom',
        component: 'TargetWeightInput',
        showProgress: true,
    },

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // BLOCO 2 - PROBLEMA + DOR AGRUPADA (10-20)
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    // ETAPA 10: Zonas-alvo
    10: {
        id: 10,
        type: 'custom',
        component: 'BodyAreasSelector',
        title: 'Quais áreas você mais se incomoda?',
        subtitle: '(Selecione todas que se aplicam)',
        options: [
            { label: 'Barriga (abdômen)', value: 'barriga', image: 'https://i.imgur.com/LIi5YMv.png' },
            { label: 'Culotes (Pneuzinho)', value: 'culotes', image: 'https://i.imgur.com/FMLszpQ.png' },
            { label: 'Braço', value: 'braco', image: 'https://i.imgur.com/Z3fTvcU.png' },
            { label: 'Queixo Duplo (Papada)', value: 'papada', image: 'https://i.imgur.com/5JZ2vT5.png' },
            { label: 'Seios Caídos', value: 'seios', image: 'https://i.imgur.com/SdpXHXs.png' },
            { label: 'Corpo Todo', value: 'corpo_todo', image: 'https://i.imgur.com/z9RXLtJ.png' },
        ],
        validation: { required: true, min: 1 },
        showProgress: true,
    },

    // ETAPA 11: Como se sente espelho
    11: {
        id: 11,
        type: 'single',
        title: 'Como você se sente se olhando no espelho ?',
        options: [
            { label: 'Fico mal por não estar satisfeita com o meu corpo', value: 'pessima' },
            { label: 'Não gosto, quero mudar', value: 'nao_gosto' },
            { label: 'Gosto um pouco, mas quero melhorar', value: 'gosto_melhorar' },
            { label: 'Eu odeio meu corpo, tenho que mudar', value: 'odeio' },
        ],
        autoAdvance: true,
        showProgress: true,
    },

    // ETAPA 12: Última vez bem
    12: {
        id: 12,
        type: 'single',
        title: 'Quando foi a última vez que você se sentiu bem com seu peso?',
        options: [
            { label: 'Menos de 1 ano', value: '<1y' },
            { label: '1 a 2 anos atrás', value: '1-2y' },
            { label: '3 a 5 anos atrás', value: '3-5y' },
            { label: 'Mais de 5 anos atrás', value: '>5y' },
            { label: 'Nunca estive como eu queria', value: 'never' },
        ],
        autoAdvance: true,
        showProgress: true,
    },

    // ETAPA 13: Variação peso
    13: {
        id: 13,
        type: 'single',
        title: 'Como seu peso costuma variar?',
        options: [
            { label: 'Ganho peso MUITO rápido, mas perco MUITO devagar', value: 'ganho_rapido' },
            { label: 'Ganho e perco peso com facilidade', value: 'facil' },
            { label: 'Tenho muita dificuldade em perder peso', value: 'dificuldade' },
            { label: 'Meu peso não muda NADA (travado)', value: 'travado' },
        ],
        autoAdvance: true,
        showProgress: true,
    },

    // ETAPA 14: Eventos ganho peso
    14: {
        id: 14,
        type: 'multi',
        title: 'Algum desses eventos abaixo fez você ganhar peso nos últimos anos?',
        options: [
            { label: 'Menopausa ou Gravidez', value: 'gravidez' },
            { label: 'Casamento ou relacionamento', value: 'relacionamento' },
            { label: 'Trabalho agitado ou vida familiar corrida', value: 'rotina' },
            { label: 'Estresse, ansiedade ou depressão', value: 'estresse' },
            { label: 'Parei de fumar ou beber', value: 'fumar' },
            { label: 'Cirurgia ou problema físico', value: 'lesao' },
            { label: 'Pandemia', value: 'pandemia' },
            { label: 'Nenhuma das acima', value: 'nenhum' },
        ],
        validation: { required: true, min: 1 },
        showProgress: true,
    },

    // ETAPA 15: O que tentou
    15: {
        id: 15,
        type: 'multi',
        title: 'O que você JÁ tentou mas não teve resultados expressivos?',
        options: [
            { label: 'Academia/Dieta', value: 'academia' },
            { label: 'Dietas da Moda', value: 'dieta_moda' },
            { label: 'Jejum Intermitente', value: 'jejum' },
            { label: 'Remédios/Suplementos para emagrecer', value: 'remedios' },
            { label: 'Nutricionista/Endócrino/Psiquiatra', value: 'nutricionista' },
        ],
        validation: { required: true, min: 1 },
        showProgress: true,
    },

    // ETAPA 16: Social Proof Método
    16: {
        id: 16,
        type: 'custom',
        component: 'SocialProofMethod',
        showProgress: true,
    },

    // ETAPA 17: Sintomas frequentes
    17: {
        id: 17,
        type: 'multi',
        title: 'Quais sintomas você sente COM FREQUÊNCIA?',
        subtitle: '(Escolha quantas quiser)',
        options: [
            { label: 'Falta de ar ao fazer esforço', value: 'falta_ar' },
            { label: 'Suor excessivo', value: 'suor' },
            { label: 'Inchaço/Retenção Abdominal', value: 'retencao' },
            { label: 'Cansaço constante', value: 'cansaco' },
            { label: 'Dores Articulares', value: 'dores' },
            { label: 'Inchaço nas pernas/pés', value: 'inchaco' },
            { label: 'Intestino preso/irregular', value: 'intestino' },
            { label: 'Insônia ou Ronco', value: 'sono' },
        ],
        validation: { required: true, min: 1 },
        showProgress: true,
    },

    // ETAPA 18: Dores emocionais
    18: {
        id: 18,
        type: 'multi',
        title: 'Quais DORES o excesso de peso causa na sua vida?',
        subtitle: '(Selecione TODAS que se aplicam)',
        options: [
            { label: 'Evito tirar fotos porque não me sinto bonita', value: 'evito_fotos' },
            { label: 'Sinto que meu parceiro(a)/homens não me desejam como antes', value: 'parceiro' },
            { label: 'Perco eventos importantes por não encontrar roupas que me deixem bonita', value: 'eventos' },
            { label: 'Sinto que todos ao redor ficam me julgando', value: 'julgando' },
            { label: 'Fico usando roupas longas no verão/praia', value: 'roupas_longas' },
            { label: 'Não consigo fazer atividades físicas', value: 'atividades_fisicas' },
        ],
        validation: { required: true, min: 1 },
        showProgress: true,
    },

    // ETAPA 19: Autosabotagem
    19: {
        id: 19,
        type: 'multi',
        title: 'Quais fatores VOCÊ acredita que mais contribuem para seu excesso de peso?',
        subtitle: '(Escolha quantas quiser)',
        options: [
            { label: 'Comer quando estou triste/ansiosa (Compulsão alimentar)', value: 'emocional' },
            { label: 'Meu cérebro me sabota (Compulsão alimentar)', value: 'compulsao' },
            { label: 'Efeito sanfona de dietas repetidas', value: 'sanfona' },
            { label: 'Digestão ruim/intestino preso', value: 'digestao' },
            { label: 'Metabolismo lento/travado', value: 'metabolismo' },
            { label: 'Métodos anteriores sem eficácia', value: 'metodos' },
        ],
        validation: { required: true, min: 1 },
        showProgress: true,
    },

    // ETAPA 20: Problemas saúde
    20: {
        id: 20,
        type: 'multi',
        title: 'Você tem algum desses problemas de saúde?',
        subtitle: '(Pode selecionar quantos quiser)',
        options: [
            { label: 'Ansiedade, depressão ou baixa motivação', value: 'ansiedade_depressao' },
            { label: 'Insônia ou sono ruim', value: 'insonia' },
            { label: 'Dores no corpo', value: 'dores' },
            { label: 'Pressão alta', value: 'pressao_alta' },
            { label: 'Colesterol alto', value: 'colesterol' },
            { label: 'Diabetes ou pré-diabetes', value: 'diabetes' },
            { label: 'Nenhum desses', value: 'nenhum' },
        ],
        validation: { required: true, min: 1 },
        showProgress: true,
    },

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // BLOCO 3 - VALIDAÇÃO + SOLUÇÃO
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    // ETAPA 21: BADGE TOP 11%
    21: {
        id: 21,
        type: 'info',
        component: 'ValidationSocial',
        showProgress: true,
    },

    // ETAPA 22: Método definitivo intro
    22: {
        id: 22,
        type: 'custom',
        component: 'MethodDefinitiveIntro',
        showProgress: true,
    },

    // ETAPA 23: Histórias reais
    23: {
        id: 23,
        type: 'custom',
        component: 'RealStories',
        showProgress: true,
    },

    // ETAPA 24: Método científico
    24: {
        id: 24,
        type: 'info',
        component: 'ScientificMethod',
        showProgress: true,
    },


    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // BLOCO 4 - LIFESTYLE (25-31)
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    // ETAPA 25: Rotina diária
    25: {
        id: 25,
        type: 'custom',
        component: 'DailyRoutineStep',
        title: 'Como é seu dia a dia?',
        subtitle: 'Vou adaptar para que se encaixe na sua rotina.',
        showProgress: true,
    },

    // ETAPA 26: Consumo água
    26: {
        id: 26,
        type: 'single',
        title: 'Quanto de água você bebe por dia?',
        subtitle: 'Seu nível de hidratação influencia o processo.',
        options: [
            { label: 'Bebo quase nada, mais café ou chá', value: 'quase_nada' },
            { label: 'Menos de 1 litro', value: '<1L' },
            { label: 'De 1 a 2 litros', value: '1-2L' },
            { label: 'Mais de 2 litros', value: '>2L' },
        ],
        autoAdvance: true,
        showProgress: true,
    },

    // ETAPA 27: Horas sono
    27: {
        id: 27,
        type: 'single',
        title: 'Quantas horas de sono você tem por noite?',
        subtitle: 'A qualidade do sono impacta diretamente no emagrecimento.',
        options: [
            { label: 'Menos de 5 horas', value: '<5h' },
            { label: 'Entre 5 e 7 horas', value: '5-7h' },
            { label: 'Entre 7 e 9 horas', value: '7-9h' },
            { label: 'Mais de 9 horas', value: '>9h' },
        ],
        autoAdvance: true,
        showProgress: true,
    },

    // ETAPA 28: Fome momento dia
    28: {
        id: 28,
        type: 'single',
        title: 'Em que momento do dia você sente mais fome?',
        subtitle: 'Vou ajustar seu protocolo para controlar os picos de fome exatamente quando você mais precisa.',
        options: [
            { label: 'Pela manhã (6h-12h)', value: 'manha', image: 'https://i.imgur.com/0U09W13.png' },
            { label: 'À tarde (12h-18h)', value: 'tarde', image: 'https://i.imgur.com/LjH7OKi.png' },
            { label: 'À noite (18h-22h)', value: 'noite', image: 'https://i.imgur.com/hITp9QE.png' },
            { label: 'Madrugada (23h+)', value: 'madrugada', image: 'https://i.imgur.com/Ar0GOoo.png' },
            { label: '<br><span class="text-sm font-normal">Sinto fome ou vontade de comer constantemente, em qualquer horário</span>', value: 'dia_inteiro', image: 'https://i.imgur.com/q8U2ZfI.png' },
        ],
        autoAdvance: true,
        showProgress: true,
    },

    // ETAPA 29 (NOVA): Horário Café da Manhã
    29: {
        id: 29,
        type: 'single',
        title: 'Que horas você costuma tomar café da manhã?',
        subtitle: 'Vou me adequar aos SEUS horários.',
        options: [
            { label: 'Entre 6h e 8h', value: '6-8', icon: '☕' },
            { label: 'Entre 8h e 10h', value: '8-10', icon: '☕' },
            { label: 'Entre 10h e 12h', value: '10-12', icon: '☕' },
            { label: 'Normalmente pulo o café da manhã', value: 'skip', icon: '☕' },
        ],
        autoAdvance: true,
        showProgress: true,
    },

    // ETAPA 30 (NOVA): Horário Almoço
    30: {
        id: 30,
        type: 'single',
        title: 'Que horas você costuma almoçar?',
        options: [
            { label: 'Entre 11h e 13h', value: '11-13', icon: '🍽️' },
            { label: 'Entre 12h e 14h', value: '12-14', icon: '🍽️' },
            { label: 'Entre 14h e 16h', value: '14-16', icon: '🍽️' },
            { label: 'Normalmente pulo o almoço', value: 'skip', icon: '🍽️' },
        ],
        autoAdvance: true,
        showProgress: true,
    },

    // ETAPA 31 (NOVA): Horário Jantar
    31: {
        id: 31,
        type: 'single',
        title: 'Que horas você costuma jantar?',
        options: [
            { label: 'Entre 18h e 20h', value: '18-20', icon: '🌙' },
            { label: 'Entre 20h e 22h', value: '20-22', icon: '🌙' },
            { label: 'Entre 22h e 00h', value: '22-00', icon: '🌙' },
            { label: 'Normalmente pulo o jantar', value: 'skip', icon: '🌙' },
        ],
        autoAdvance: true,
        showProgress: true,
    },

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // BLOCO 5 - MOTIVAÇÃO + URGÊNCIA (32-34)
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    // ETAPA 32: Maior medo
    32: {
        id: 32,
        type: 'multi',
        title: 'Qual é o seu MAIOR MEDO sobre emagrecer?',
        subtitle: 'Seja honesta. É normal ter medo.',
        options: [
            { label: 'Não conseguir mais emagrecer', value: 'falhar' },
            { label: 'Ser trocada ou se sentir indesejada', value: 'trocado' },
            { label: 'Continuar tendo vergonha do meu corpo', value: 'nunca_alcancar' },
            { label: 'Depender de remédios ou dietas restritivas', value: 'dependencia' },
            { label: 'Desenvolver Diabetes/Doenças Cardiovasculares', value: 'saude' },
            { label: 'Ter que recorrer a cirurgia bariátrica', value: 'cirurgia' },
            { label: 'Não tenho medo, só quero começar', value: 'sem_medo' },
        ],
        validation: { required: true, min: 1 },
        showProgress: true,
    },

    // ETAPA 33: Gatilho emocional
    33: {
        id: 33,
        type: 'single',
        title: 'Quando você come MAIS (mesmo sem fome)?',
        subtitle: 'Identifique seu gatilho principal.',
        options: [
            { label: 'Sem ocasião específica, só sinto vontade de comer', value: 'estresse' },
            { label: 'Quando fico triste ou ansiosa', value: 'emocional' },
            { label: 'Quando me recompenso por um dia cansativo', value: 'recompensa' },
            { label: 'Após discussões ou brigas', value: 'conflito' },
            { label: 'Não tenho compulsão emocional', value: 'nenhum' },
        ],
        autoAdvance: true,
        showProgress: true,
    },

    // ETAPA 34: Futuro Desejado
    34: {
        id: 34,
        type: 'multi',
        title: 'Daqui a 60 dias, quando você olhar no espelho... O que você MAIS quer sentir?',
        options: [
            { label: 'Recuperar minha autoestima', value: 'confiante' },
            { label: 'Ter disposição para aproveitar o dia com minha família', value: 'energia' },
            { label: 'Usar as ROUPAS que eu quero sem me sentir julgada', value: 'roupas' },
            { label: 'Melhorar minha SAÚDE e prevenir doenças', value: 'saude' },
            { label: 'Me sentir desejada e admirada pelo meu Marido/Parceiro', value: 'desejada' },
            { label: 'Estar no CONTROLE total do meu peso e corpo', value: 'controle' },
        ],
        validation: { required: true, min: 1 },
        showProgress: true,
    },

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // GAMIFICAÇÃO FINAL (35-40)
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    // ETAPA 35: Empathy Message (Moved to start of Gamification)
    35: {
        id: 35,
        type: 'custom',
        component: 'EmpathyMessage',
        showProgress: true,
    },

    // ETAPA 36: Name Capture
    36: {
        id: 36,
        type: 'custom',
        component: 'NameCapture',
        showProgress: true,
    },

    // ETAPA 37: Loading
    37: {
        id: 37,
        type: 'custom',
        component: 'TimelineVisual',
        showProgress: true,
    },

    // ETAPA 38: Processing
    38: {
        id: 38,
        type: 'custom',
        component: 'ProcessingStep',
        showProgress: true,
    },

    // ETAPA 39: Comparison Step
    39: {
        id: 39,
        type: 'custom',
        component: 'ComparisonStep',
        showProgress: true,
    },

    // ETAPA 40: Timeline Step (Final)
    40: {
        id: 40,
        type: 'custom',
        component: 'TimelineStep',
        showProgress: true,
    },
};

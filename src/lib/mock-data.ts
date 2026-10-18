import { Candidate, MockTest, TestAttempt } from '@/types';

export const INITIAL_MOCK_TESTS: MockTest[] = [
  {
    id: 'bubt-mock-01',
    title: 'Full Mock With Speaking - 1',
    badge: 'ONE SITTING',
    duration: '2h 45m',
    sectionsCount: 4,
    type: 'academic',
    description: 'Complete 4-module authentic computer-delivered IELTS Academic simulation including interactive audio Speaking evaluation.',
  },
  {
    id: 'cambridge-01-t1',
    title: 'Cambridge 01 - Test 1',
    badge: 'STANDARD',
    duration: '2h 30m',
    sectionsCount: 4,
    type: 'academic',
    description: 'Classic Cambridge IELTS Academic mock covering Listening, Reading, Writing, and Speaking modules.',
  },
  {
    id: 'cambridge-01-t2',
    title: 'Cambridge 01 - Test 2',
    badge: 'ONE SITTING',
    duration: '2h 45m',
    sectionsCount: 4,
    type: 'academic',
    description: 'Comprehensive IELTS test battery with updated Academic Reading passages and real-time timer.',
  },
  {
    id: 'bubt-mock-02',
    title: 'Academic Mock 02 — AI & Future Technologies',
    badge: 'INNOVATION',
    duration: '2h 45m',
    sectionsCount: 4,
    type: 'academic',
    description: 'Contemporary academic mock analyzing artificial intelligence, autonomous robotics, renewable energies, and automated economies.',
  },
  {
    id: 'cambridge-02-t1',
    title: 'Cambridge 02 — Environmental Science & Global Climate',
    badge: 'CLIMATE FOCUS',
    duration: '2h 45m',
    sectionsCount: 4,
    type: 'academic',
    description: 'Rigorous 4-skill examination exploring deep ocean ecosystems, polar ice-sheet dynamics, and sustainable urban design.',
  },
  {
    id: 'bubt-writing-intensive',
    title: 'BUBT Academic Writing Masterclass Mock',
    badge: 'WRITING FOCUS',
    duration: '1h 00m',
    sectionsCount: 2,
    type: 'academic',
    description: 'Intensive evaluation for Task 1 report data synthesis and Task 2 complex argumentative essay development.',
  },
];

export const LISTENING_QUESTIONS = [
  // Section 1: Customer Accommodation Booking (Questions 1-10)
  { id: 'l1', questionNumber: 1, type: 'text_input', prompt: 'Customer Last Name: Mr. Arthur ________', correctAnswer: 'Pendleton' },
  { id: 'l2', questionNumber: 2, type: 'text_input', prompt: 'Preferred Room Type: Single room with ________ view', correctAnswer: 'garden' },
  { id: 'l3', questionNumber: 3, type: 'text_input', prompt: 'Arrival Date: 24th of ________', correctAnswer: 'October' },
  { id: 'l4', questionNumber: 4, type: 'text_input', prompt: 'Length of Stay: ________ nights', correctAnswer: '4' },
  { id: 'l5', questionNumber: 5, type: 'text_input', prompt: 'Contact Phone: 07892-________', correctAnswer: '445210' },
  { id: 'l6', questionNumber: 6, type: 'multiple_choice', prompt: 'What dietary requirement does the customer mention?', options: ['Gluten-free meals only', 'Vegetarian breakfast', 'No dairy products', 'Halal certified meals'], correctAnswer: 'Vegetarian breakfast' },
  { id: 'l7', questionNumber: 7, type: 'text_input', prompt: 'Payment Method: Visa ________ card', correctAnswer: 'credit' },
  { id: 'l8', questionNumber: 8, type: 'text_input', prompt: 'Special request: Needs quiet room on the ________ floor', correctAnswer: 'third' },
  { id: 'l9', questionNumber: 9, type: 'text_input', prompt: 'Airport shuttle pickup required at: ________ AM', correctAnswer: '08:30' },
  { id: 'l10', questionNumber: 10, type: 'text_input', prompt: 'Total deposit paid: £________', correctAnswer: '150' },

  // Section 2: City Botanical Gardens Orientation (Questions 11-20)
  { id: 'l11', questionNumber: 11, type: 'multiple_choice', prompt: 'When was the North Wing greenhouse originally established?', options: ['1842', '1888', '1912', '1935'], correctAnswer: '1888' },
  { id: 'l12', questionNumber: 12, type: 'multiple_choice', prompt: 'Which exhibition requires advance booking?', options: ['The Tropical Fern Gallery', 'The Nocturnal Orchid Pavilion', 'The Alpine Rockery', 'The Heritage Rose Walk'], correctAnswer: 'The Nocturnal Orchid Pavilion' },
  { id: 'l13', questionNumber: 13, type: 'text_input', prompt: 'Guided tours depart every ________ minutes from the Visitor Center.', correctAnswer: '45' },
  { id: 'l14', questionNumber: 14, type: 'text_input', prompt: 'Children under age 12 receive free entrance on ________.', correctAnswer: 'Sundays' },
  { id: 'l15', questionNumber: 15, type: 'text_input', prompt: 'The garden cafe sources ingredients exclusively from local ________ farms.', correctAnswer: 'organic' },
  { id: 'l16', questionNumber: 16, type: 'multiple_choice', prompt: 'What is prohibited inside the conservatory area?', options: ['Photography with tripods', 'Mobile phones on silent', 'Drinking bottled water', 'Sketching pads'], correctAnswer: 'Photography with tripods' },
  { id: 'l17', questionNumber: 17, type: 'text_input', prompt: 'Educational workshops for students are held in the ________ Hall.', correctAnswer: 'Darwin' },
  { id: 'l18', questionNumber: 18, type: 'text_input', prompt: 'Annual membership includes complimentary admission to ________ partner gardens.', correctAnswer: '12' },
  { id: 'l19', questionNumber: 19, type: 'text_input', prompt: 'The rare Amazon water lily blooms primarily during the month of ________.', correctAnswer: 'August' },
  { id: 'l20', questionNumber: 20, type: 'text_input', prompt: 'Visitor inquiries should contact extension: ________', correctAnswer: '304' },

  // Section 3: University Academic Tutorial (Questions 21-30)
  { id: 'l21', questionNumber: 21, type: 'multiple_choice', prompt: 'What was the students’ main criticism of the literature review sample?', options: ['Lacked empirical statistical data', 'Overlooked recent European studies', 'Relied excessively on qualitative case studies', 'Used obsolete terminology'], correctAnswer: 'Overlooked recent European studies' },
  { id: 'l22', questionNumber: 22, type: 'multiple_choice', prompt: 'Which research methodology did Professor Howard recommend for their dissertation?', options: ['Longitudinal cohort tracking', 'Triangulated mixed methods', 'Double-blind laboratory experiments', 'Archival historical analysis'], correctAnswer: 'Triangulated mixed methods' },
  { id: 'l23', questionNumber: 23, type: 'text_input', prompt: 'The target sample size must include at least ________ participants.', correctAnswer: '250' },
  { id: 'l24', questionNumber: 24, type: 'text_input', prompt: 'Ethics committee approval application deadline is Friday, ________ 14th.', correctAnswer: 'November' },
  { id: 'l25', questionNumber: 25, type: 'text_input', prompt: 'Statistical analysis software required for the cohort data: ________', correctAnswer: 'SPSS' },
  { id: 'l26', questionNumber: 26, type: 'multiple_choice', prompt: 'Why is the pilot test considered essential?', options: ['To test survey question clarity and response latency', 'To fulfill minimum grant prerequisites', 'To verify laboratory apparatus calibrations', 'To recruit permanent research fellows'], correctAnswer: 'To test survey question clarity and response latency' },
  { id: 'l27', questionNumber: 27, type: 'text_input', prompt: 'Student presentation scheduled duration is ________ minutes.', correctAnswer: '20' },
  { id: 'l28', questionNumber: 28, type: 'text_input', prompt: 'Peer feedback forms will be submitted via the university ________ portal.', correctAnswer: 'Moodle' },
  { id: 'l29', questionNumber: 29, type: 'text_input', prompt: 'Required referencing format for this submission: ________ 7th Edition.', correctAnswer: 'APA' },
  { id: 'l30', questionNumber: 30, type: 'text_input', prompt: 'Dissertation preliminary draft word limit: ________ words.', correctAnswer: '5000' },

  // Section 4: Academic Lecture - Marine Bioluminescence (Questions 31-40)
  { id: 'l31', questionNumber: 31, type: 'text_input', prompt: 'Bioluminescence is defined as light emitted through a ________ reaction inside an organism.', correctAnswer: 'chemical' },
  { id: 'l32', questionNumber: 32, type: 'text_input', prompt: 'The primary substrate molecule responsible is called ________.', correctAnswer: 'luciferin' },
  { id: 'l33', questionNumber: 33, type: 'text_input', prompt: 'The catalytic enzyme accelerating this oxidation is ________.', correctAnswer: 'luciferase' },
  { id: 'l34', questionNumber: 34, type: 'multiple_choice', prompt: 'What percentage of deep-sea species exhibit some form of bioluminescence?', options: ['Around 35%', 'Approximately 50%', 'Exceeding 75%', 'Nearly 90%'], correctAnswer: 'Exceeding 75%' },
  { id: 'l35', questionNumber: 35, type: 'text_input', prompt: 'Primary ecological function: Counter-illumination for ________ camouflage.', correctAnswer: 'predator' },
  { id: 'l36', questionNumber: 36, type: 'text_input', prompt: 'Anglerfish utilize a luminous lure termed an ________ to attract prey.', correctAnswer: 'esca' },
  { id: 'l37', questionNumber: 37, type: 'text_input', prompt: 'Deep ocean light wavelengths travel farthest in the blue-________ spectrum.', correctAnswer: 'green' },
  { id: 'l38', questionNumber: 38, type: 'text_input', prompt: 'Medical researchers use bioluminescent markers to monitor the growth of ________ cells.', correctAnswer: 'cancer' },
  { id: 'l39', questionNumber: 39, type: 'text_input', prompt: 'Dinoflagellates create glowing waves as a defense mechanism against ________ grazers.', correctAnswer: 'zooplankton' },
  { id: 'l40', questionNumber: 40, type: 'text_input', prompt: 'Deep-sea exploration submersible equipped with low-light camera: ________ IV.', correctAnswer: 'Nautilus' },
];

export const READING_PASSAGES = [
  {
    passageNumber: 1,
    title: 'The Evolution of High-Speed Rail & Sustainable Urban Mobility',
    content: `High-speed rail (HSR) represents one of the most transformative engineering feats in modern terrestrial transport. Initiated systematically in Japan with the 1964 debut of the Tokaido Shinkansen between Tokyo and Osaka, bullet trains demonstrated that electrified passenger rail could outpace both conventional automobiles and regional aviation over medium distances (300 to 800 kilometers).

Over subsequent decades, France’s TGV (Train à Grande Vitesse), Germany’s ICE, and more recently, the colossal high-speed rail network of China—which accounts for more than two-thirds of the world's total high-speed trackage—have redesigned national economic geographies. By linking secondary cities to megalopolis economic hubs, travel times plummeted by up to 70%, catalyzing labor mobility and regional revitalization.

From an environmental standpoint, high-speed rail is among the most energy-efficient modes of mass transport. Emitting between 80% to 90% fewer greenhouse gases per passenger-kilometer compared to short-haul aviation, electrified rail operates as a central pillar in worldwide decarbonization strategies. Aerodynamic train designs, regenerative braking systems that recapture up to 15% of kinetic energy back into the electrical grid, and ballastless track infrastructure have mitigated both acoustic disturbance and lifecycle maintenance costs.

Nevertheless, the capital expenditure required to construct dedicated high-speed corridors remains astronomical. Land acquisition, tunnel excavation through challenging geological strata, and bridge viaducts across wetlands demand billions in state subsidies. Financial viability invariably depends upon passenger density: routes connecting populous metropolitan corridors achieve operational profitability, whereas peripheral lines frequently operate at substantial fiscal deficits.`,
    questions: [
      { id: 'r1', questionNumber: 1, type: 'true_false_ng', prompt: 'The Japanese Tokaido Shinkansen was the first commercial high-speed railway in operation.', correctAnswer: 'TRUE' },
      { id: 'r2', questionNumber: 2, type: 'true_false_ng', prompt: 'China possesses less than half of the planet’s operational high-speed rail lines.', correctAnswer: 'FALSE' },
      { id: 'r3', questionNumber: 3, type: 'true_false_ng', prompt: 'Regenerative braking systems can return a portion of kinetic energy directly to the grid.', correctAnswer: 'TRUE' },
      { id: 'r4', questionNumber: 4, type: 'true_false_ng', prompt: 'Peripheral rural lines generate more profit than metropolitan city-to-city lines.', correctAnswer: 'FALSE' },
      { id: 'r5', questionNumber: 5, type: 'true_false_ng', prompt: 'Private insurance companies funded the majority of France’s initial TGV network.', correctAnswer: 'NOT GIVEN' },
      { id: 'r6', questionNumber: 6, type: 'text_input', prompt: 'Medium travel distances ideal for high-speed rail range from 300 to ________ kilometers.', correctAnswer: '800' },
      { id: 'r7', questionNumber: 7, type: 'text_input', prompt: 'Compared to regional air travel, high-speed rail reduces greenhouse emissions by up to ________ percent.', correctAnswer: '90' },
      { id: 'r8', questionNumber: 8, type: 'text_input', prompt: 'Electrified trains can recapture up to ________ percent of kinetic energy through regenerative brakes.', correctAnswer: '15' },
      { id: 'r9', questionNumber: 9, type: 'multiple_choice', prompt: 'What is highlighted as a primary geographic benefit of high-speed rail networks?', options: ['Linking secondary cities to metropolitan economic hubs', 'Eliminating all long-distance cargo trucks', 'Completely replacing intra-city subways', 'Reducing urban land values'], correctAnswer: 'Linking secondary cities to metropolitan economic hubs' },
      { id: 'r10', questionNumber: 10, type: 'multiple_choice', prompt: 'What remains the most substantial barrier to expanding high-speed rail corridors?', options: ['Astronomical capital expenditure for land and infrastructure', 'Public refusal to ride electrified trains', 'Shortage of electrical power generation', 'Severe acoustic damage to passenger hearing'], correctAnswer: 'Astronomical capital expenditure for land and infrastructure' },
      { id: 'r11', questionNumber: 11, type: 'text_input', prompt: 'Ballastless track infrastructure was engineered to lower both acoustic disturbance and ________ costs.', correctAnswer: 'maintenance' },
      { id: 'r12', questionNumber: 12, type: 'text_input', prompt: 'The first Shinkansen line linked the cities of Tokyo and ________.', correctAnswer: 'Osaka' },
      { id: 'r13', questionNumber: 13, type: 'text_input', prompt: 'Travel times between interconnected urban centres plummeted by up to ________ percent.', correctAnswer: '70' },
    ],
  },
  {
    passageNumber: 2,
    title: 'The Neurobiology of Bilingualism and Cognitive Reserve',
    content: `For much of the twentieth century, pedagogical dogma suggested that raising children in a bilingual environment would confuse language acquisition and impair cognitive development. Contemporary neuroscience and developmental psychology have thoroughly debunked this misconception. Empirical neuroimaging studies demonstrate that active multilingualism profoundly alters both structural and functional brain architecture.

At the core of the bilingual advantage is executive function—the suite of cognitive mechanisms governed by the prefrontal cortex, including working memory, cognitive flexibility, attentional inhibition, and task switching. Because both languages remain active simultaneously in the mind of a bilingual individual, the brain must continually resolve linguistic competition. Selecting words in Language A while suppressing intrusive interference from Language B demands relentless inhibitory control. Over years of practice, this mental gymnastics strengthens the brain's dorsal anterior cingulate cortex and basal ganglia.

Crucially, the benefits of bilingualism extend far into senescence. In groundbreaking clinical trials led by cognitive psychologists, lifelong bilingual patients diagnosed with neurodegenerative disorders such as Alzheimer's disease manifested clinical symptoms of dementia four to five years later than monolingual peers with identical levels of physical brain pathology. Multilingualism constructs what neuroscientists term "cognitive reserve"—an enriched neural network that permits the brain to compensate for anatomical degeneration by recruiting alternate neural pathways.`,
    questions: [
      { id: 'r14', questionNumber: 14, type: 'multiple_choice', prompt: 'What outdated 20th-century view regarding bilingual childhood was disproven?', options: ['That dual languages impair cognitive development and cause confusion', 'That children acquire accents faster than adults', 'That reading speed is superior in polyglots', 'That memory capacity decreases with age'], correctAnswer: 'That dual languages impair cognitive development and cause confusion' },
      { id: 'r15', questionNumber: 15, type: 'multiple_choice', prompt: 'Which anatomical region governs executive functions such as attentional control?', options: ['The prefrontal cortex', 'The occipital lobe', 'The cerebellum', 'The auditory cortex'], correctAnswer: 'The prefrontal cortex' },
      { id: 'r16', questionNumber: 16, type: 'true_false_ng', prompt: 'In bilingual individuals, inactive languages are completely powered down in the brain.', correctAnswer: 'FALSE' },
      { id: 'r17', questionNumber: 17, type: 'true_false_ng', prompt: 'Bilingual patients with dementia exhibit symptoms approximately 4 to 5 years later than monolinguals.', correctAnswer: 'TRUE' },
      { id: 'r18', questionNumber: 18, type: 'true_false_ng', prompt: 'Learning a third language provides greater neurological benefits than learning a second.', correctAnswer: 'NOT GIVEN' },
      { id: 'r19', questionNumber: 19, type: 'text_input', prompt: 'Suppressing interference between competing languages requires continuous ________ control.', correctAnswer: 'inhibitory' },
      { id: 'r20', questionNumber: 20, type: 'text_input', prompt: 'The protective buffer against neural degeneration built by bilingualism is called cognitive ________.', correctAnswer: 'reserve' },
      { id: 'r21', questionNumber: 21, type: 'text_input', prompt: 'Executive function includes working memory, task switching, and cognitive ________.', correctAnswer: 'flexibility' },
      { id: 'r22', questionNumber: 22, type: 'multiple_choice', prompt: 'How does cognitive reserve function in compensating for brain pathology?', options: ['By recruiting alternate neural pathways', 'By reversing cellular apoptosis', 'By preventing all physical tau protein tangles', 'By increasing skull bone density'], correctAnswer: 'By recruiting alternate neural pathways' },
      { id: 'r23', questionNumber: 23, type: 'text_input', prompt: 'Brain regions strengthened by linguistic control include the basal ganglia and anterior ________ cortex.', correctAnswer: 'cingulate' },
      { id: 'r24', questionNumber: 24, type: 'true_false_ng', prompt: 'Neuroimaging technologies confirmed alterations in both structural and functional brain networks.', correctAnswer: 'TRUE' },
      { id: 'r25', questionNumber: 25, type: 'text_input', prompt: 'Bilingual patients retained clinical independence despite having equivalent levels of brain ________.', correctAnswer: 'pathology' },
      { id: 'r26', questionNumber: 26, type: 'text_input', prompt: 'Executive functions are continuously trained through mental ________.', correctAnswer: 'gymnastics' },
    ],
  },
  {
    passageNumber: 3,
    title: 'Artificial Intelligence and Supercomputing in Planetary Climate Forecasting',
    content: `Numerical climate forecasting has historically relied upon deterministic physical equations governing thermodynamics, hydrodynamics, and radiation transfer across discretized atmospheric grids. Global Circulation Models (GCMs) divide the planet into three-dimensional grid cells, commonly spanning 50 to 100 square kilometers. However, localized atmospheric phenomena—such as cumulonimbus cloud convection, aerosol nucleation, and microclimatic precipitation—operate at spatial scales far smaller than conventional grid resolutions, forcing climatologists to approximate these variables through parameterizations.

Enter machine learning and deep neural networks. By training on petabytes of satellite telemetry, ocean sensor buoys, and century-long reanalysis datasets, modern artificial intelligence models (such as Fourier Neural Operators and diffusion forecasting models) can simulate atmospheric trajectories at speedups exceeding 1,000 to 10,000 times that of traditional supercomputer solvers. Where standard ensemble simulations once required days of high-performance computing clusters, neural models produce 15-day extreme weather outlooks in mere seconds.

Nonetheless, leading meteorologists caution against discarding physical principles entirely. Deep neural networks remain "black boxes" vulnerable to out-of-distribution hallucinations when presented with unprecedented climate tipping points, such as the sudden collapse of the Atlantic Meridional Overturning Circulation (AMOC). Consequently, the vanguard of climate science is hybrid physics-informed neural networks (PINNs), which embed thermodynamic conservation laws directly into neural loss functions, safeguarding forecasting integrity.`,
    questions: [
      { id: 'r27', questionNumber: 27, type: 'multiple_choice', prompt: 'What traditional limitation exists in Global Circulation Models (GCMs)?', options: ['Grid cells are too coarse to resolve microscale phenomena directly', 'They refuse to use differential equations', 'They only measure atmospheric radiation, not moisture', 'They operate solely on satellite photographs'], correctAnswer: 'Grid cells are too coarse to resolve microscale phenomena directly' },
      { id: 'r28', questionNumber: 28, type: 'multiple_choice', prompt: 'How much faster can certain AI climate simulators operate compared to traditional numerical solvers?', options: ['10 to 50 times', '100 to 500 times', '1,000 to 10,000 times', 'Over 1,000,000 times'], correctAnswer: '1,000 to 10,000 times' },
      { id: 'r29', questionNumber: 29, type: 'true_false_ng', prompt: 'Neural climate models generate 15-day medium-range weather predictions within seconds.', correctAnswer: 'TRUE' },
      { id: 'r30', questionNumber: 30, type: 'true_false_ng', prompt: 'Pure deep neural networks never experience hallucinations during unprecedented weather events.', correctAnswer: 'FALSE' },
      { id: 'r31', questionNumber: 31, type: 'true_false_ng', prompt: 'The AMOC is expected to shut down before the year 2030.', correctAnswer: 'NOT GIVEN' },
      { id: 'r32', questionNumber: 32, type: 'text_input', prompt: 'Standard GCM grid cells commonly span 50 to ________ square kilometers.', correctAnswer: '100' },
      { id: 'r33', questionNumber: 33, type: 'text_input', prompt: 'Sub-grid phenomena that cannot be directly modeled are approximated via ________.', correctAnswer: 'parameterizations' },
      { id: 'r34', questionNumber: 34, type: 'text_input', prompt: 'Modern neural architectures used include diffusion models and Fourier ________ Operators.', correctAnswer: 'Neural' },
      { id: 'r35', questionNumber: 35, type: 'text_input', prompt: 'Hybrid models that combine physics with machine learning are abbreviated as ________.', correctAnswer: 'PINNs' },
      { id: 'r36', questionNumber: 36, type: 'text_input', prompt: 'In PINNs, thermodynamic conservation laws are embedded directly into neural ________ functions.', correctAnswer: 'loss' },
      { id: 'r37', questionNumber: 37, type: 'multiple_choice', prompt: 'Why are pure machine learning models considered risky for climate tipping points?', options: ['They lack physical constraints and may hallucinate out-of-distribution events', 'They consume too much electricity during inference', 'They cannot process ocean buoy measurements', 'They are prohibited by international meteorological treaties'], correctAnswer: 'They lack physical constraints and may hallucinate out-of-distribution events' },
      { id: 'r38', questionNumber: 38, type: 'true_false_ng', prompt: 'Deep neural networks were trained using over a century of historical meteorological reanalysis data.', correctAnswer: 'TRUE' },
      { id: 'r39', questionNumber: 39, type: 'text_input', prompt: 'AMOC stands for Atlantic Meridional ________ Circulation.', correctAnswer: 'Overturning' },
      { id: 'r40', questionNumber: 40, type: 'text_input', prompt: 'Cumulonimbus cloud convection is categorized as a ________ atmospheric phenomenon.', correctAnswer: 'localized' },
    ],
  },
];

export const WRITING_TASKS = {
  task1: {
    title: 'Academic Writing Task 1',
    instructions: 'You should spend about 20 minutes on this task. Write at least 150 words.',
    prompt: `The chart below illustrates the proportion of international tertiary students enrolled across five leading host destinations (United Kingdom, Australia, Canada, Germany, and the United States) between 2015 and 2025.

Summarise the information by selecting and reporting the main features, and make comparisons where relevant.`,
    chartDescription: `Data Summary:
- United States: 2015 (28%), 2020 (24%), 2025 (22%) - Steady moderate decline
- United Kingdom: 2015 (18%), 2020 (19%), 2025 (21%) - Gradual steady growth
- Australia: 2015 (12%), 2020 (16%), 2025 (17%) - Notable expansion
- Canada: 2015 (8%), 2020 (14%), 2025 (18%) - Rapid continuous surge
- Germany: 2015 (6%), 2020 (8%), 2025 (9%) - Consistent moderate growth`,
    minimumWords: 150,
    timeMinutes: 20,
  },
  task2: {
    title: 'Academic Writing Task 2',
    instructions: 'You should spend about 40 minutes on this task. Write at least 250 words.',
    prompt: `Some educational commentators argue that university curricula should strictly focus on delivering vocational skills that directly prepare graduates for employment. Others believe that the fundamental purpose of higher education is to cultivate critical thinking, intellectual curiosity, and broad academic knowledge regardless of direct career utility.

Discuss both views and give your own opinion. Include relevant examples from your knowledge or experience.`,
    minimumWords: 250,
    timeMinutes: 40,
  },
};

export const SPEAKING_PROMPTS = {
  part1: {
    title: 'Part 1: Introduction and Interview (4-5 minutes)',
    description: 'The examiner will ask you general questions about yourself and a range of familiar topics such as your studies, hometown, daily habits, and technology.',
    questions: [
      'Could you tell me your full name and what university or subject you are currently studying?',
      'Why did you choose this field of study, and what do you find most fascinating about it?',
      'Do you prefer studying alone in a quiet room or collaborating with study groups? Why?',
      'How has technology changed the way students in Bangladesh prepare for international examinations?',
    ],
  },
  part2: {
    title: 'Part 2: Long Turn / Cue Card (3-4 minutes)',
    prepTimeSeconds: 60,
    speakingTimeSeconds: 120,
    cueCard: {
      topic: 'Describe a significant academic or personal challenge you encountered and successfully overcame.',
      bulletPoints: [
        'What the challenge was and when it happened',
        'Why it was particularly difficult or stressful for you',
        'What specific steps or strategies you took to overcome it',
        'And explain what valuable lesson you learned from that experience.',
      ],
    },
  },
  part3: {
    title: 'Part 3: Two-Way Discussion (4-5 minutes)',
    description: 'The examiner will ask broader, abstract questions linked to the theme in Part 2.',
    questions: [
      'In your opinion, what qualities distinguish individuals who handle academic adversity well from those who give up easily?',
      'How significant is the role of mentors or academic advisors in helping university students navigate setbacks?',
      'Do you think modern educational institutions focus sufficiently on teaching resilience and problem-solving, or is the emphasis still largely on memorization?',
      'How might workplace challenges in the next decade differ from those faced by graduates today?',
    ],
  },
};

export const LISTENING_AUDIO_SCRIPTS: Record<number, string> = {
  1: `You will hear a telephone conversation between a student accommodation officer and a student named Arthur. First, you have some time to look at questions 1 to 10.
Officer: Good morning, University Accommodation Office. How may I help you today?
Arthur: Good morning. My name is Arthur Pendleton. That is spelt P-E-N-D-L-E-T-O-N. I am joining the postgraduate program next month, and I need to book a university residence room.
Officer: Certainly, Mr. Pendleton. What type of room are you looking for?
Arthur: I would prefer a single room with a garden view so it is quiet for study.
Officer: Let me check our availability. Yes, we have a room in North Hall. The minimum tenancy period is 6 months, and the weekly rental rate is 145 pounds, which includes high-speed internet and utility bills.
Arthur: That sounds excellent. When would the room be ready for move-in?
Officer: Our official check-in date is September 18th.
Arthur: September 18th suits me well. Is there a security deposit?
Officer: Yes, a refundable security deposit of 200 pounds is required, payable by credit card.
Arthur: Great, I will pay the deposit by credit card now. My contact mobile is 01827459921.
Officer: Thank you Mr. Pendleton. When you arrive on campus, please bring your student ID and this confirmation slip to Office Room 307, Building 01.`,

  2: `You will hear a guide welcoming visitors to the National Botanical Conservatory. First, you have some time to look at questions 11 to 20.
Guide: Good afternoon everyone, and welcome to the National Botanical Conservatory. Our glasshouses were originally designed in 1924, housing rare plant species from around the world.
Guide: We are open daily from 9:00 AM to 5:00 PM. Guided walking tours depart every hour from the central pavilion.
Guide: For safety and visitor flow, please note that photography with tripods is strictly prohibited inside the main conservatory walkway. Please keep mobile phones on silent, and do not touch the exotic floral displays. If you have any questions, our staff members are stationed throughout the garden to assist you.`,

  3: `You will hear two engineering students, Mark and Sarah, discussing their renewable energy project with their tutor Dr. Anderson. First, look at questions 21 to 30.
Advisor: Welcome Mark and Sarah. Let us examine your comparative data on offshore wind farms and solar thermal installations.
Sarah: Thank you professor. We found that modern offshore wind installations achieve a 34 percent higher capacity factor due to consistent coastal wind speeds.
Mark: However, marine corrosion and offshore maintenance logistics present notable engineering challenges that require autonomous robotic inspections.
Advisor: Excellent observation. Make sure you highlight the lifecycle carbon reduction metrics in Section 3 of your submitted report.`,

  4: `You will hear an academic lecture on high-speed rail systems and sustainable transportation. First, look at questions 31 to 40.
Lecturer: Good morning class. Today we evaluate high-speed passenger rail networks, initiated systematically in Japan with the 1964 debut of the Tokaido Shinkansen between Tokyo and Osaka.
Lecturer: Bullet trains demonstrated that electrified passenger rail provides the most energy-efficient transit over medium intercity distances between 300 and 800 kilometers.
Lecturer: Modern high-speed rail corridors reduce greenhouse gas emissions by up to 75 percent per passenger-kilometer compared to regional aviation, while fostering economic decentralization across secondary urban clusters.`
};

// Wire full question batteries into all mock tests
INITIAL_MOCK_TESTS.forEach((test) => {
  test.listeningQuestions = LISTENING_QUESTIONS;
  test.readingPassages = READING_PASSAGES;
  test.writingTasks = WRITING_TASKS;
  test.speakingSections = SPEAKING_PROMPTS;
  test.listeningAudioScripts = LISTENING_AUDIO_SCRIPTS;
});

/**
 * Generates a valid RIFF WAVE PCM 8kHz mono audio Base64 Data URL.
 * Enables in-browser native <audio> playback and animated progress without external MP3 assets.
 */
export function generateSampleAudio(durationSec = 3, baseFreq = 260): string {
  const sampleRate = 8000;
  const numSamples = Math.floor(sampleRate * durationSec);
  const totalBytes = 44 + numSamples;
  const buffer = new Uint8Array(totalBytes);

  // RIFF header
  buffer[0] = 0x52; buffer[1] = 0x49; buffer[2] = 0x46; buffer[3] = 0x46;
  const fileSize = totalBytes - 8;
  buffer[4] = fileSize & 0xff;
  buffer[5] = (fileSize >> 8) & 0xff;
  buffer[6] = (fileSize >> 16) & 0xff;
  buffer[7] = (fileSize >> 24) & 0xff;

  // WAVE format
  buffer[8] = 0x57; buffer[9] = 0x41; buffer[10] = 0x56; buffer[11] = 0x45;
  buffer[12] = 0x66; buffer[13] = 0x6d; buffer[14] = 0x74; buffer[15] = 0x20;
  buffer[16] = 16; buffer[17] = 0; buffer[18] = 0; buffer[19] = 0;
  buffer[20] = 1; buffer[21] = 0; // PCM
  buffer[22] = 1; buffer[23] = 0; // Mono

  buffer[24] = sampleRate & 0xff;
  buffer[25] = (sampleRate >> 8) & 0xff;
  buffer[26] = (sampleRate >> 16) & 0xff;
  buffer[27] = (sampleRate >> 24) & 0xff;

  buffer[28] = sampleRate & 0xff;
  buffer[29] = (sampleRate >> 8) & 0xff;
  buffer[30] = (sampleRate >> 16) & 0xff;
  buffer[31] = (sampleRate >> 24) & 0xff;

  buffer[32] = 1; buffer[33] = 0;
  buffer[34] = 8; buffer[35] = 0; // 8-bit

  // data chunk
  buffer[36] = 0x64; buffer[37] = 0x61; buffer[38] = 0x74; buffer[39] = 0x61;
  buffer[40] = numSamples & 0xff;
  buffer[41] = (numSamples >> 8) & 0xff;
  buffer[42] = (numSamples >> 16) & 0xff;
  buffer[43] = (numSamples >> 24) & 0xff;

  for (let i = 0; i < numSamples; i++) {
    const t = i / sampleRate;
    const s1 = Math.sin(2 * Math.PI * baseFreq * t);
    const s2 = 0.4 * Math.sin(2 * Math.PI * (baseFreq * 1.5) * t);
    const s3 = 0.2 * Math.sin(2 * Math.PI * (baseFreq * 2.0) * t);
    const envelope = Math.min(1, Math.min(t * 3, (durationSec - t) * 3));
    const sample = 128 + Math.round(45 * (s1 + s2 + s3) * envelope);
    buffer[44 + i] = Math.max(0, Math.min(255, sample));
  }

  let binary = '';
  for (let i = 0; i < totalBytes; i++) {
    binary += String.fromCharCode(buffer[i]);
  }
  const b64 = typeof window !== 'undefined' ? window.btoa(binary) : Buffer.from(binary, 'binary').toString('base64');
  return 'data:audio/wav;base64,' + b64;
}

export const DUMMY_RECORDINGS = {
  masruf: {
    part1AudioUrl: generateSampleAudio(4, 240),
    part2AudioUrl: generateSampleAudio(6, 260),
    part3AudioUrl: generateSampleAudio(5, 280),
  },
  sadia: {
    part1AudioUrl: generateSampleAudio(4, 340),
    part2AudioUrl: generateSampleAudio(5, 360),
    part3AudioUrl: generateSampleAudio(5, 350),
  },
  tanvir: {
    part1AudioUrl: generateSampleAudio(4, 220),
    part2AudioUrl: generateSampleAudio(6, 230),
    part3AudioUrl: generateSampleAudio(5, 240),
  },
  farhana: {
    part1AudioUrl: generateSampleAudio(4, 320),
    part2AudioUrl: generateSampleAudio(5, 330),
    part3AudioUrl: generateSampleAudio(5, 340),
  },
  nusrat: {
    part1AudioUrl: generateSampleAudio(4, 310),
    part2AudioUrl: generateSampleAudio(6, 330),
    part3AudioUrl: generateSampleAudio(5, 320),
  },
  mahmudul: {
    part1AudioUrl: generateSampleAudio(4, 210),
    part2AudioUrl: generateSampleAudio(5, 220),
    part3AudioUrl: generateSampleAudio(4, 230),
  },
};

export const INITIAL_CANDIDATES: Candidate[] = [
  {
    id: 'BUBT-2026-1042',
    name: 'Masruf Rahman',
    email: 'mmrhridoy99@gmail.com',
    mobile: '01827459921',
    university: 'BUBT (Bangladesh University of Business and Technology)',
    address: 'Room 307, Building 01, BUBT Campus, Mirpur-2, Dhaka',
    targetBand: 8.0,
    registeredAt: '2026-10-18T09:30:00Z',
  },
  {
    id: 'BUBT-2026-1043',
    name: 'Sadia Islam',
    email: 'sadia.islam@gmail.com',
    mobile: '+8801823456789',
    university: 'University of Dhaka (Department of English)',
    address: 'Curzon Hall Road, Nilkhet, Dhaka',
    targetBand: 7.5,
    registeredAt: '2026-10-17T14:15:00Z',
  },
  {
    id: 'BUBT-2026-1044',
    name: 'Tanvir Ahmed Chowdhury',
    email: 'tanvir.chowdhury@yahoo.com',
    mobile: '+8801934567890',
    university: 'BUBT (CSE Department)',
    address: 'Section 6, Mirpur, Dhaka-1216',
    targetBand: 7.0,
    registeredAt: '2026-10-16T11:00:00Z',
  },
  {
    id: 'BUBT-2026-1045',
    name: 'Farhana Akter',
    email: 'farhana.akter@outlook.com',
    mobile: '+8801545678901',
    university: 'North South University',
    address: 'Bashundhara R/A, Block C, Dhaka',
    targetBand: 7.5,
    registeredAt: '2026-10-15T16:45:00Z',
  },
  {
    id: 'BUBT-2026-1046',
    name: 'Shahriar Kabir',
    email: 'shahriar.kabir@gmail.com',
    mobile: '+8801656789012',
    university: 'BUBT (BBA Department)',
    address: 'Pallabi, Mirpur-11, Dhaka',
    targetBand: 6.5,
    registeredAt: '2026-10-14T10:20:00Z',
  },
  {
    id: 'BUBT-2026-1047',
    name: 'Nusrat Jahan Mim',
    email: 'nusrat.mim@bubt.edu.bd',
    mobile: '+8801712345678',
    university: 'BUBT (Department of English)',
    address: 'Rupnagar R/A, Mirpur-2, Dhaka',
    targetBand: 8.0,
    registeredAt: '2026-10-18T08:10:00Z',
  },
  {
    id: 'BUBT-2026-1048',
    name: 'Mahmudul Hasan',
    email: 'mahmudul.hasan@bubt.edu.bd',
    mobile: '+8801987654321',
    university: 'BUBT (Faculty of Business Studies)',
    address: 'Dhanmondi 27, Dhaka-1209',
    targetBand: 7.0,
    registeredAt: '2026-10-18T11:05:00Z',
  },
  {
    id: 'BUBT-2026-1049',
    name: 'Anika Tabassum',
    email: 'anika.tabassum@gmail.com',
    mobile: '+8801734567891',
    university: 'BUBT (Dept of EEE)',
    address: 'Uttara Sector 11, Dhaka',
    targetBand: 8.0,
    registeredAt: '2026-10-18T13:40:00Z',
  },
];

export const INITIAL_TEST_ATTEMPTS: TestAttempt[] = [
  // ATTEMPT 1: Masruf Rahman (EVALUATED - Band 8.0)
  {
    id: 'ATT-2026-001',
    candidateId: 'BUBT-2026-1042',
    testId: 'bubt-mock-01',
    testTitle: 'Full Mock With Speaking - 1',
    testType: 'academic',
    startedAt: '2026-10-18T10:00:00Z',
    completedAt: '2026-10-18T12:45:00Z',
    status: 'evaluated',
    overallBandScore: 8.0,
    cefrLevel: 'C1 Advanced',
    scores: {
      listening: {
        rawScore: 36,
        bandScore: 8.0,
        answers: { l1: 'Pendleton', l2: 'garden', l3: 'October', l4: '4', l5: '445210' },
        completedAt: '2026-10-18T10:32:00Z',
      },
      reading: {
        rawScore: 35,
        bandScore: 8.0,
        answers: { r1: 'TRUE', r2: 'FALSE', r3: 'TRUE', r4: 'FALSE' },
        completedAt: '2026-10-18T11:32:00Z',
      },
      writing: {
        task1Response: 'The provided multi-period bar chart delineates the distribution and shifting proportions of international students choosing five prominent academic destination nations between 2015 and 2025. Overall, while the United States maintained the largest single cohort throughout the initial period, its global market share underwent a consistent and measurable contraction. In stark contrast, Canada demonstrated the most pronounced surge, more than doubling its enrollment proportion over the decade. Concurrently, the United Kingdom, Australia, and Germany registered varying degrees of upward mobility.',
        task2Response: 'In contemporary higher education discourse, whether universities should function as pragmatic training institutions for immediate workforce readiness or as intellectual sanctuaries dedicated to holistic critical inquiry remains intensely debated. While career-oriented curricula undeniably furnish graduates with tangible technical competences, I firmly contend that the true hallmark of higher learning resides in fostering intellectual agility, ethical contemplation, and rigorous problem-solving capacities that transcend specific vocational frameworks.',
        task1WordCount: 184,
        task2WordCount: 312,
        bandScore: 7.5,
        task1Band: 7.5,
        task2Band: 7.5,
        feedback: 'Excellent lexical resource with sophisticated academic vocabulary. Task 1 offers comprehensive comparative synthesis. Task 2 exhibits strong progression with cohesive topic sentences.',
        completedAt: '2026-10-18T12:32:00Z',
      },
      speaking: {
        mode: 'audio_record',
        recordings: DUMMY_RECORDINGS.masruf,
        fcScore: 8.5,
        lrScore: 8.0,
        graScore: 8.0,
        prScore: 8.0,
        bandScore: 8.0,
        feedback: 'Fluency is natural and articulate with smooth transitions. Pronunciation is clear and intelligible with natural intonation. Expressed complex ideas on resilience effortlessly.',
        completedAt: '2026-10-18T12:45:00Z',
      },
    },
  },

  // ATTEMPT 2: Sadia Islam (EVALUATED - Band 7.5)
  {
    id: 'ATT-2026-002',
    candidateId: 'BUBT-2026-1043',
    testId: 'bubt-mock-01',
    testTitle: 'Full Mock With Speaking - 1',
    testType: 'academic',
    startedAt: '2026-10-17T14:30:00Z',
    completedAt: '2026-10-17T17:15:00Z',
    status: 'evaluated',
    overallBandScore: 7.5,
    cefrLevel: 'C1 Advanced',
    scores: {
      listening: {
        rawScore: 33,
        bandScore: 7.5,
        answers: {},
        completedAt: '2026-10-17T15:02:00Z',
      },
      reading: {
        rawScore: 34,
        bandScore: 7.5,
        answers: {},
        completedAt: '2026-10-17T16:02:00Z',
      },
      writing: {
        task1Response: 'The chart gives information about the percentage of overseas tertiary students studying in five host countries from 2015 to 2025. Canada experienced rapid growth, reaching approximately 21 percent by 2025.',
        task2Response: 'People have different views about the primary goal of university education. Some think it should provide job skills, while others believe intellectual breadth is more important. In my opinion, balancing academic theory with experiential learning produces the most resilient graduates.',
        task1WordCount: 162,
        task2WordCount: 275,
        bandScore: 7.0,
        task1Band: 7.0,
        task2Band: 7.0,
        feedback: 'Well-structured essays with clear paragraphing and accurate grammatical structures. Minor errors in complex subordinate clauses.',
        completedAt: '2026-10-17T17:02:00Z',
      },
      speaking: {
        mode: 'audio_record',
        recordings: DUMMY_RECORDINGS.sadia,
        fcScore: 7.5,
        lrScore: 7.5,
        graScore: 7.0,
        prScore: 7.5,
        bandScore: 7.5,
        feedback: 'Candidate speaks at length without noticeable effort. Good range of idioms and collocation. Minor hesitations during abstract Part 3 discussion.',
        completedAt: '2026-10-17T17:15:00Z',
      },
    },
  },

  // ATTEMPT 3: Tanvir Ahmed Chowdhury (PENDING EVALUATION - Audio & Essays Ready For Examiner Grading!)
  {
    id: 'ATT-2026-003',
    candidateId: 'BUBT-2026-1044',
    testId: 'bubt-mock-01',
    testTitle: 'Full Mock With Speaking - 1',
    testType: 'academic',
    startedAt: '2026-10-18T07:15:00Z',
    completedAt: '2026-10-18T10:00:00Z',
    status: 'pending',
    overallBandScore: 0,
    cefrLevel: 'Pending Moderation',
    scores: {
      listening: {
        rawScore: 32,
        bandScore: 7.5,
        answers: { l1: 'Pendleton', l2: 'garden', l3: 'October', l4: '4', l6: 'Vegetarian breakfast' },
        completedAt: '2026-10-18T07:47:00Z',
      },
      reading: {
        rawScore: 31,
        bandScore: 7.0,
        answers: { r1: 'TRUE', r2: 'FALSE', r3: 'NOT GIVEN' },
        completedAt: '2026-10-18T08:47:00Z',
      },
      writing: {
        task1Response: 'The line chart outlines the shifting proportions of international students across major host nations over a ten-year duration. Noticeably, Canada displayed an uninterrupted upward trajectory, whilst the United States experienced a measured decline despite remaining the market leader initially.',
        task2Response: 'It is often argued that the primary purpose of higher education should strictly be preparing students for professional careers, whereas others maintain it serves to expand broader intellectual capacities. In my perspective, vocational readiness and intellectual enlightenment are mutually reinforcing rather than contradictory.',
        task1WordCount: 178,
        task2WordCount: 286,
        bandScore: 0,
        task1Band: 0,
        task2Band: 0,
        feedback: 'Submission received — awaiting Room 307 Faculty Examiner scoring.',
        completedAt: '2026-10-18T09:47:00Z',
      },
      speaking: {
        mode: 'audio_record',
        recordings: DUMMY_RECORDINGS.tanvir,
        fcScore: 0,
        lrScore: 0,
        graScore: 0,
        prScore: 0,
        bandScore: 0,
        feedback: 'Candidate voice audio captured for Parts 1, 2, and 3. Awaiting Cambridge rubric moderation in Room 307 Speaking Evaluation Lab.',
        completedAt: '2026-10-18T10:00:00Z',
      },
    },
  },

  // ATTEMPT 4: Farhana Akter (EVALUATED - Band 7.5)
  {
    id: 'ATT-2026-004',
    candidateId: 'BUBT-2026-1045',
    testId: 'cambridge-01-t1',
    testTitle: 'Cambridge 01 - Test 1',
    testType: 'academic',
    startedAt: '2026-10-15T17:00:00Z',
    completedAt: '2026-10-15T19:40:00Z',
    status: 'evaluated',
    overallBandScore: 7.5,
    cefrLevel: 'C1 Advanced',
    scores: {
      listening: {
        rawScore: 35,
        bandScore: 8.0,
        answers: {},
        completedAt: '2026-10-15T17:32:00Z',
      },
      reading: {
        rawScore: 33,
        bandScore: 7.5,
        answers: {},
        completedAt: '2026-10-15T18:32:00Z',
      },
      writing: {
        task1Response: 'The visual representation depicts the international student proportion across five countries from 2015 to 2025.',
        task2Response: 'Whether institutions of higher learning should emphasize vocational preparedness or broad academic horizons is a multifaceted issue that impacts global economic productivity.',
        task1WordCount: 170,
        task2WordCount: 290,
        bandScore: 7.0,
        task1Band: 7.0,
        task2Band: 7.0,
        feedback: 'Strong cohesive devices and clear thesis statement. Satisfies all key criteria.',
        completedAt: '2026-10-15T19:32:00Z',
      },
      speaking: {
        mode: 'audio_record',
        recordings: DUMMY_RECORDINGS.farhana,
        fcScore: 7.5,
        lrScore: 7.5,
        graScore: 7.0,
        prScore: 7.5,
        bandScore: 7.5,
        feedback: 'Speaks fluently with very few pauses. Well-developed cue card response with accurate pronunciation.',
        completedAt: '2026-10-15T19:40:00Z',
      },
    },
  },

  // ATTEMPT 5: Nusrat Jahan Mim (PENDING EVALUATION - Audio & Essays Ready For Examiner Grading!)
  {
    id: 'ATT-2026-005',
    candidateId: 'BUBT-2026-1047',
    testId: 'bubt-mock-02',
    testTitle: 'Academic Mock 02 — AI & Future Technologies',
    testType: 'academic',
    startedAt: '2026-10-18T08:30:00Z',
    completedAt: '2026-10-18T11:15:00Z',
    status: 'pending',
    overallBandScore: 0,
    cefrLevel: 'Pending Moderation',
    scores: {
      listening: {
        rawScore: 36,
        bandScore: 8.0,
        answers: { l1: 'Pendleton', l2: 'garden', l3: 'October', l4: '4', l5: '445210', l6: 'Vegetarian breakfast' },
        completedAt: '2026-10-18T09:02:00Z',
      },
      reading: {
        rawScore: 37,
        bandScore: 8.5,
        answers: { r1: 'TRUE', r2: 'FALSE', r3: 'TRUE', r4: 'FALSE', r5: 'NOT GIVEN' },
        completedAt: '2026-10-18T10:02:00Z',
      },
      writing: {
        task1Response: 'The provided data highlights the comparative adoption rates of automated logistics systems across European port facilities between 2018 and 2026. A striking trend is the exponential transition towards autonomous electric cranes in Rotterdam and Hamburg, which reduced turnaround times by over 45 percent.',
        task2Response: 'As artificial intelligence and automated decision systems penetrate essential civic and financial sectors, the ethical responsibility of algorithmic accountability has transitioned from a theoretical concern into an urgent regulatory necessity. I strongly advocate for transparent algorithmic auditing to prevent systemic societal biases.',
        task1WordCount: 195,
        task2WordCount: 320,
        bandScore: 0,
        task1Band: 0,
        task2Band: 0,
        feedback: 'Awaiting Room 307 Examiner evaluation for Writing Task 1 & Task 2.',
        completedAt: '2026-10-18T11:02:00Z',
      },
      speaking: {
        mode: 'audio_record',
        recordings: DUMMY_RECORDINGS.nusrat,
        fcScore: 0,
        lrScore: 0,
        graScore: 0,
        prScore: 0,
        bandScore: 0,
        feedback: 'High-quality audio submitted for Parts 1, 2, and 3. Ready for examiner scoring across FC, LR, GRA, PR.',
        completedAt: '2026-10-18T11:15:00Z',
      },
    },
  },

  // ATTEMPT 6: Mahmudul Hasan (PENDING EVALUATION - Audio & Essays Ready For Examiner Grading!)
  {
    id: 'ATT-2026-006',
    candidateId: 'BUBT-2026-1048',
    testId: 'cambridge-02-t1',
    testTitle: 'Cambridge 02 — Environmental Science & Global Climate',
    testType: 'academic',
    startedAt: '2026-10-18T11:30:00Z',
    completedAt: '2026-10-18T14:15:00Z',
    status: 'pending',
    overallBandScore: 0,
    cefrLevel: 'Pending Moderation',
    scores: {
      listening: {
        rawScore: 28,
        bandScore: 6.5,
        answers: {},
        completedAt: '2026-10-18T12:02:00Z',
      },
      reading: {
        rawScore: 29,
        bandScore: 6.5,
        answers: {},
        completedAt: '2026-10-18T13:02:00Z',
      },
      writing: {
        task1Response: 'The chart illustrates carbon emission reductions achieved by introducing electric public bus fleets in three metropolitan cities...',
        task2Response: 'Global climate change necessitates urgent collaborative policy between industrialized nations and emerging economies. While economic growth remains vital, environmental preservation must take precedence.',
        task1WordCount: 165,
        task2WordCount: 260,
        bandScore: 0,
        task1Band: 0,
        task2Band: 0,
        feedback: 'Awaiting examiner marking.',
        completedAt: '2026-10-18T14:02:00Z',
      },
      speaking: {
        mode: 'audio_record',
        recordings: DUMMY_RECORDINGS.mahmudul,
        fcScore: 0,
        lrScore: 0,
        graScore: 0,
        prScore: 0,
        bandScore: 0,
        feedback: 'Speaking recording submitted. Ready for examiner evaluation in Room 307 lab.',
        completedAt: '2026-10-18T14:15:00Z',
      },
    },
  },
];

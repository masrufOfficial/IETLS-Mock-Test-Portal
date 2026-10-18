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
    sectionsCount: 3,
    type: 'academic',
    description: 'Classic Cambridge IELTS Academic mock covering Listening, Reading, and Writing modules.',
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

// Wire full question battery into default test
if (INITIAL_MOCK_TESTS.length > 0) {
  INITIAL_MOCK_TESTS[0].listeningQuestions = LISTENING_QUESTIONS;
  INITIAL_MOCK_TESTS[0].readingPassages = READING_PASSAGES;
  INITIAL_MOCK_TESTS[0].writingTasks = WRITING_TASKS;
  INITIAL_MOCK_TESTS[0].speakingSections = SPEAKING_PROMPTS;
  INITIAL_MOCK_TESTS[0].listeningAudioScripts = LISTENING_AUDIO_SCRIPTS;
}

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
    university: 'University of Dhaka',
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
];

export const INITIAL_TEST_ATTEMPTS: TestAttempt[] = [
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
        task1Response: 'The chart gives information about the percentage of overseas tertiary students studying in five host countries from 2015 to 2025.',
        task2Response: 'People have different views about the primary goal of university education. Some think it should provide job skills, while others believe general knowledge is more important.',
        task1WordCount: 162,
        task2WordCount: 275,
        bandScore: 7.0,
        task1Band: 7.0,
        task2Band: 7.0,
        feedback: 'Well-structured essays with clear paragraphing and accurate grammatical structures. Minor errors in complex subordinate clauses.',
        completedAt: '2026-10-17T17:02:00Z',
      },
      speaking: {
        mode: 'examiner_interview',
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
  {
    id: 'ATT-2026-003',
    candidateId: 'BUBT-2026-1044',
    testId: 'bubt-mock-01',
    testTitle: 'Full Mock With Speaking - 1',
    testType: 'academic',
    startedAt: '2026-10-16T11:15:00Z',
    completedAt: '2026-10-16T14:00:00Z',
    status: 'evaluated',
    overallBandScore: 7.0,
    cefrLevel: 'C1 Advanced',
    scores: {
      listening: {
        rawScore: 31,
        bandScore: 7.0,
        answers: {},
        completedAt: '2026-10-16T11:47:00Z',
      },
      reading: {
        rawScore: 30,
        bandScore: 7.0,
        answers: {},
        completedAt: '2026-10-16T12:47:00Z',
      },
      writing: {
        task1Response: 'This chart illustrates the trends of international student distribution...',
        task2Response: 'In modern society, education plays a vital role in determining career success...',
        task1WordCount: 155,
        task2WordCount: 260,
        bandScore: 6.5,
        task1Band: 6.5,
        task2Band: 6.5,
        feedback: 'Good task achievement. Needs more varied complex sentence linkages.',
        completedAt: '2026-10-16T13:47:00Z',
      },
      speaking: {
        mode: 'audio_record',
        fcScore: 7.0,
        lrScore: 7.0,
        graScore: 7.0,
        prScore: 7.0,
        bandScore: 7.0,
        feedback: 'Clear pronunciation, responds comfortably to all prompts. Good vocabulary on academic topics.',
        completedAt: '2026-10-16T14:00:00Z',
      },
    },
  },
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
        task1Response: 'The visual representation depicts the international student proportion across five countries...',
        task2Response: 'Whether institutions of higher learning should emphasize vocational preparedness or broad academic horizons is a multifaceted issue...',
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
        fcScore: 7.5,
        lrScore: 7.5,
        graScore: 7.0,
        prScore: 7.5,
        bandScore: 7.5,
        feedback: 'Speaks fluently with very few pauses. Well-developed cue card response.',
        completedAt: '2026-10-15T19:40:00Z',
      },
    },
  },
];

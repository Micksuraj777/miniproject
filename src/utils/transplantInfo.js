// Eye Tissue Transplantation Information

export const transplantProcedures = [
  {
    id: 'corneal',
    title: 'Corneal Transplantation',
    description: 'Replacement of damaged or diseased corneal tissue with healthy donor tissue.',
    steps: [
      'Pre-operative evaluation and measurements',
      'Removal of the damaged corneal tissue',
      'Placement of the donor corneal tissue',
      'Securing the new cornea with fine sutures',
      'Application of eye shield for protection'
    ],
    recoveryTime: '1-2 weeks for initial healing, full recovery in 6-12 months',
    successRate: '95-98%'
  },
  {
    id: 'amniotic',
    title: 'Amniotic Membrane Transplantation',
    description: 'Placement of processed amniotic membrane to promote healing of the ocular surface.',
    steps: [
      'Preparation of the amniotic membrane graft',
      'Cleaning and preparation of the eye surface',
      'Placement of the membrane over the affected area',
      'Securing with sutures or tissue adhesive',
      'Application of a bandage contact lens'
    ],
    recoveryTime: '2-4 weeks',
    successRate: '85-90%'
  },
  {
    id: 'limbal',
    title: 'Limbal Stem Cell Transplantation',
    description: 'Transplantation of limbal stem cells to restore the corneal surface in cases of limbal stem cell deficiency.',
    steps: [
      'Harvesting of limbal tissue from donor or unaffected eye',
      'Preparation of the recipient eye',
      'Transplantation of the limbal tissue',
      'Securing with sutures',
      'Post-operative immunosuppression if allogeneic'
    ],
    recoveryTime: '4-8 weeks for initial healing, continued improvement over 6-12 months',
    successRate: '70-80%'
  }
];

export const eligibilityCriteria = [
  {
    category: 'Medical Conditions',
    criteria: [
      "Corneal diseases such as keratoconus, Fuchs' dystrophy, or corneal scarring",
      "Severe dry eye or ocular surface disease",
      "Chemical or thermal injuries to the eye",
      "Failed previous transplants",
      "Limbal stem cell deficiency"
    ]
  },
  {
    category: 'General Health Requirements',
    criteria: [
      'Stable overall health status',
      'No active eye infections',
      'Well-controlled diabetes or hypertension (if present)',
      'No untreated autoimmune disorders',
      'Ability to follow post-operative care instructions'
    ]
  },
  {
    category: 'Contraindications',
    criteria: [
      'Active eye infection or inflammation',
      'Severe dry eye that cannot be managed',
      'Uncontrolled glaucoma',
      'Retinal detachment or severe retinal disease',
      'Inability to comply with post-operative care'
    ]
  }
];

export const postOperativeCare = [
  {
    phase: 'Immediate (1-2 weeks)',
    instructions: [
      'Use prescribed eye drops as directed',
      'Wear eye shield when sleeping',
      'Avoid rubbing or touching the eye',
      'Avoid strenuous activities and heavy lifting',
      'Keep water out of the operated eye'
    ]
  },
  {
    phase: 'Short-term (1-3 months)',
    instructions: [
      'Continue medications as prescribed',
      'Attend all follow-up appointments',
      'Gradually resume normal activities as advised',
      'Wear sunglasses outdoors',
      'Use artificial tears for dryness'
    ]
  },
  {
    phase: 'Long-term (3+ months)',
    instructions: [
      'Maintain regular check-ups',
      'Protect eyes from injury',
      'Report any changes in vision immediately',
      'Follow a healthy lifestyle to support eye health',
      'Consider vision rehabilitation if needed'
    ]
  }
];

export const donorTissueStandards = [
  'Donors aged 2-75 years',
  'No history of infectious diseases (HIV, hepatitis, etc.)',
  'No previous eye surgery that would affect the quality of the tissue',
  'Tissue harvested within 12-24 hours after death',
  'Thorough screening and testing of donor tissue',
  'Proper preservation and storage of tissue',
  'Compliance with Eye Bank Association standards'
];

export const faqs = [
  {
    question: 'How long is the waiting period for eye tissue transplantation?',
    answer: 'The waiting period varies depending on the type of transplant and tissue availability. For emergency cases, tissue may be available within days. For routine cases, the wait can be a few weeks to a few months.'
  },
  {
    question: 'Will my vision be completely restored after transplantation?',
    answer: 'Vision improvement varies by individual and condition. Many patients experience significant improvement, but complete restoration to perfect vision is not guaranteed. Your doctor will discuss realistic expectations based on your specific case.'
  },
  {
    question: 'How long does the transplant procedure take?',
    answer: 'Most eye tissue transplant procedures take 30-90 minutes, depending on the type and complexity. The procedure is typically performed on an outpatient basis under local or general anesthesia.'
  },
  {
    question: 'Will I need to take medications after the transplant?',
    answer: 'Yes, you will need to use antibiotic eye drops to prevent infection and steroid eye drops to prevent rejection. Some patients may need these medications for several months or even years after transplantation.'
  },
  {
    question: 'What are the signs of transplant rejection?',
    answer: 'Signs of rejection include redness, sensitivity to light, decreased vision, pain, and increased tearing. If you experience any of these symptoms, contact your doctor immediately as early treatment can often reverse rejection.'
  },
  {
    question: 'When can I return to normal activities after transplantation?',
    answer: 'Most patients can resume light activities within a week, but should avoid strenuous activities, heavy lifting, and swimming for at least a month. Your doctor will provide specific guidelines based on your healing progress.'
  }
];

export const patientRights = [
  'Right to detailed information about the procedure, risks, and benefits',
  'Right to know the source and quality standards of donor tissue',
  'Right to privacy and confidentiality of medical information',
  'Right to informed consent before any procedure',
  'Right to receive appropriate post-operative care and follow-up',
  'Right to access your medical records',
  'Right to seek a second opinion'
];

export const supportResources = [
  {
    name: 'Eye Bank Association',
    description: 'National organization that sets standards for eye banking and promotes donation awareness',
    website: 'www.eyebankassociation.org'
  },
  {
    name: 'Cornea Society',
    description: 'Professional organization dedicated to the study of cornea and external eye diseases',
    website: 'www.corneasociety.org'
  },
  {
    name: 'Vision Support Groups',
    description: 'Local and online communities for patients undergoing eye tissue transplantation',
    website: 'www.visionsupport.org'
  },
  {
    name: 'Financial Assistance Programs',
    description: 'Resources for patients needing help with transplantation costs',
    website: 'www.eyecareamerica.org'
  }
]; 
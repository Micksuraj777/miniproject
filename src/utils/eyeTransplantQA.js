// Predefined Q&A for eye tissue transplantation
const qaDatabase = {
  // General Questions
  "what is eye tissue transplantation": {
    answer: "Eye tissue transplantation is a surgical procedure where damaged or diseased corneal tissue is replaced with healthy donor tissue. This procedure helps restore vision and reduce pain in patients with corneal problems. The most common type is corneal transplantation, which can be either full-thickness or partial-thickness depending on the patient's condition.",
    category: "general"
  },
  "what are the different types of corneal transplants": {
    answer: "There are several types of corneal transplants: 1) Penetrating Keratoplasty (PKP) - full-thickness transplant 2) DMEK (Descemet's Membrane Endothelial Keratoplasty) - inner layer replacement 3) DSAEK (Descemet's Stripping Automated Endothelial Keratoplasty) - partial thickness 4) ALK (Anterior Lamellar Keratoplasty) - outer layer replacement. The choice depends on which layers of the cornea are damaged.",
    category: "general"
  },
  "how long does the surgery take": {
    answer: "A typical corneal transplant surgery takes between 30 minutes to 2 hours, depending on the specific technique used and complexity of the case. The procedure is usually performed under local anesthesia on an outpatient basis.",
    category: "procedure"
  },

  // Donor-related Questions
  "who can donate eye tissue": {
    answer: "Most people can donate their corneas. Unlike other organ donations, age, eye color, or quality of vision don't matter. However, donors with certain infectious diseases or conditions like HIV, hepatitis, or active cancer may not be eligible. The corneas must be harvested within 12 hours of death and can be stored for up to 14 days.",
    category: "donor"
  },
  "how are donor tissues screened": {
    answer: "Donor tissues undergo rigorous screening processes including: 1) Medical history review 2) Blood tests for infectious diseases 3) Physical examination of the tissue 4) Evaluation of tissue quality and viability. This ensures the safety and suitability of the tissue for transplantation.",
    category: "donor"
  },
  "how long can eye tissue be preserved": {
    answer: "Eye tissue (corneas) can be preserved for up to 14 days after harvesting when stored properly in specialized preservation medium at 4°C. However, most transplants are performed within 5-7 days of preservation for optimal results. The tissue bank regularly evaluates the quality of stored corneas through endothelial cell counts and other metrics.",
    category: "donor"
  },
  "what is tissue matching in eye transplant": {
    answer: "Unlike other organ transplants, tissue matching for corneal transplants doesn't require exact blood type or HLA matching. However, doctors consider: 1) Size of the donor cornea 2) Quality of the endothelial cells 3) Overall health of the tissue 4) Age of the donor tissue. This flexibility makes corneal transplants more readily available than other organ transplants.",
    category: "donor"
  },

  // Recipient Questions
  "who needs eye tissue transplant": {
    answer: "Eye tissue transplants are typically needed by patients with: 1) Corneal scarring from injury or infection 2) Keratoconus (thinning/bulging cornea) 3) Fuchs' dystrophy 4) Failed previous transplants 5) Severe corneal ulcers. The specific condition determines the type of transplant procedure required.",
    category: "recipient"
  },
  "what are the success rates": {
    answer: "Corneal transplant success rates are generally high: 90% of transplants remain clear after 1 year, and about 75% after 5 years. Success rates vary based on the underlying condition, type of procedure, and post-operative care. Regular follow-up and medication compliance are crucial for long-term success.",
    category: "statistics"
  },
  "what conditions disqualify someone from receiving a transplant": {
    answer: "Factors that might disqualify someone from receiving a corneal transplant include: 1) Active eye infection 2) Severe dry eye syndrome 3) Uncontrolled glaucoma 4) Retinal or optic nerve damage 5) Inability to follow post-operative care 6) Certain autoimmune conditions. Each case is evaluated individually by the surgical team.",
    category: "recipient"
  },
  "how long is the waiting list": {
    answer: "Unlike other organ transplants, the waiting time for corneal transplants is relatively short, usually between 2-4 weeks in most developed countries. This is because: 1) Tissue matching is less strict 2) More people can donate corneas 3) Tissues can be preserved longer 4) There's a good donation rate for corneas.",
    category: "recipient"
  },

  // Pre-surgery Questions
  "how to prepare for surgery": {
    answer: "Preparation for eye tissue transplant includes: 1) Complete medical evaluation 2) Eye examination and measurements 3) Review of current medications 4) Fasting 8 hours before surgery 5) Arranging post-operative care and transportation. Your surgeon will provide specific instructions based on your case.",
    category: "preparation"
  },
  "what tests are needed before surgery": {
    answer: "Pre-surgery tests typically include: 1) Comprehensive eye examination 2) Corneal topography 3) Blood tests 4) Physical examination 5) ECG for older patients. These tests help ensure you're healthy enough for surgery and help plan the procedure.",
    category: "preparation"
  },
  "what medications should be stopped before surgery": {
    answer: "You may need to stop or adjust: 1) Blood thinners (consult your doctor) 2) Anti-inflammatory medications 3) Certain eye drops 4) Some herbal supplements. Always provide a complete list of medications to your surgical team, and never stop prescription medications without consulting your doctor.",
    category: "preparation"
  },
  "what happens during the pre-operative consultation": {
    answer: "During the pre-operative consultation: 1) Your medical history is reviewed 2) Detailed eye measurements are taken 3) Surgery type is determined 4) Risks and benefits are discussed 5) Post-operative care plan is created 6) Questions are answered 7) Consent forms are signed 8) Surgery date is scheduled.",
    category: "preparation"
  },

  // Post-surgery Care
  "what is the recovery process": {
    answer: "Recovery after eye tissue transplant involves: 1) Using prescribed eye drops regularly 2) Wearing an eye shield while sleeping 3) Avoiding eye rubbing 4) Regular follow-up visits 5) Gradual return to activities. Full recovery typically takes 6-12 months, with vision improving gradually.",
    category: "recovery"
  },
  "what are the post-surgery restrictions": {
    answer: "Post-surgery restrictions include: 1) No swimming for 2-3 months 2) No heavy lifting for several weeks 3) No eye makeup for at least 1 month 4) Limited bending or straining 5) No contact sports. Your surgeon will provide a timeline for returning to specific activities.",
    category: "recovery"
  },
  "when can I return to work": {
    answer: "Return to work timing varies by occupation: 1) Office work: 1-2 weeks 2) Light physical work: 2-4 weeks 3) Heavy physical work: 4-6 weeks or more. Factors include: type of surgery, healing progress, work environment, and physical demands. Always get clearance from your surgeon before returning to work.",
    category: "recovery"
  },
  "what eye drops are needed after surgery": {
    answer: "Post-surgery eye drops typically include: 1) Antibiotic drops to prevent infection 2) Steroid drops to reduce inflammation 3) Lubricating drops for comfort. You'll need to follow a strict schedule, and some drops may be needed for several months or even long-term to prevent rejection.",
    category: "recovery"
  },
  "how often are follow-up visits needed": {
    answer: "Follow-up schedule typically includes: 1) First day after surgery 2) One week post-op 3) One month post-op 4) Three months post-op 5) Six months post-op 6) Yearly thereafter. More frequent visits may be needed if complications arise or healing is delayed.",
    category: "recovery"
  },

  // Complications and Risks
  "what are the risks": {
    answer: "Potential risks include: 1) Rejection of donor tissue 2) Infection 3) Bleeding 4) Increased eye pressure 5) Vision problems. While complications are possible, most can be treated if caught early. Regular follow-up helps monitor for and prevent complications.",
    category: "risks"
  },
  "what are signs of rejection": {
    answer: "Signs of corneal transplant rejection include: 1) Increased sensitivity to light 2) Eye redness 3) Vision changes 4) Eye pain 5) Excessive tearing. If you experience these symptoms, contact your doctor immediately as early treatment is crucial.",
    category: "risks"
  },
  "how common is transplant rejection": {
    answer: "Rejection rates vary by procedure type: 1) PKP: 5-30% rejection risk 2) DMEK: 1-3% rejection risk 3) DSAEK: 5-10% rejection risk. Risk factors include: younger age, previous rejections, active inflammation, and poor medication compliance. Most rejections can be successfully treated if caught early.",
    category: "risks"
  },
  "what happens if the transplant fails": {
    answer: "If a transplant fails: 1) The cause is evaluated 2) Treatment options are assessed 3) Re-transplantation may be considered 4) Alternative treatments might be explored. Success rates for repeat transplants are lower than first-time procedures, but many patients still achieve good outcomes.",
    category: "risks"
  },

  // Vision and Quality of Life
  "when will my vision improve": {
    answer: "Vision improvement timeline varies: 1) Initial healing: 1-2 weeks 2) Basic vision return: 1-3 months 3) Stability: 6-12 months 4) Final prescription: 12-18 months. Factors affecting improvement include: surgery type, healing rate, and underlying condition. Some patients may need glasses or contact lenses for best vision.",
    category: "vision"
  },
  "will I need glasses after surgery": {
    answer: "Most patients need some vision correction after transplant: 1) Glasses: Often needed for best vision 2) Contact lenses: May be required for irregular astigmatism 3) Timing: Final prescription usually after 12-18 months 4) LASIK: Might be an option later for residual refractive errors.",
    category: "vision"
  },

  // Cost and Insurance
  "is the surgery covered by insurance": {
    answer: "Most insurance plans cover corneal transplantation when medically necessary. Coverage typically includes: surgery costs, donor tissue fees, and follow-up care. However, out-of-pocket expenses vary by insurance plan. Check with your insurance provider for specific coverage details.",
    category: "insurance"
  },
  "what are the total costs involved": {
    answer: "Total costs typically include: 1) Surgical facility fees 2) Surgeon's fees 3) Anesthesia fees 4) Donor tissue costs 5) Pre-operative testing 6) Post-operative medications 7) Follow-up visits. Costs vary by location and procedure type. Insurance coverage significantly reduces out-of-pocket expenses.",
    category: "insurance"
  },
  "what if I don't have insurance": {
    answer: "Options for uninsured patients include: 1) Payment plans offered by hospitals 2) Medical financing programs 3) Financial assistance programs 4) Charitable organizations supporting eye surgery 5) Clinical trials 6) Teaching hospitals with reduced fees 7) Government assistance programs 8) Crowdfunding platforms for medical expenses.",
    category: "insurance"
  },
  "does medicare cover corneal transplants": {
    answer: "Medicare coverage for corneal transplants: 1) Part A covers facility fees if done in hospital 2) Part B covers surgeon fees and outpatient care 3) Part D helps with prescription medications 4) Supplemental insurance can cover additional costs 5) Pre-authorization may be required 6) Copayments and deductibles apply 7) Coverage includes necessary follow-up care.",
    category: "insurance"
  },
  "what expenses aren't covered by insurance": {
    answer: "Common out-of-pocket expenses may include: 1) Insurance deductibles 2) Copayments for visits 3) Some medications 4) Non-prescription eye drops 5) Protective eyewear 6) Travel expenses for treatment 7) Time off work 8) Long-term vision aids 9) Some testing procedures. Always verify coverage details with your insurance provider.",
    category: "insurance"
  },
  "are post surgery medications covered": {
    answer: "Medication coverage varies: 1) Most insurance plans cover essential medications 2) Prescription drug coverage depends on your plan 3) Generic alternatives may have better coverage 4) Some specialty drops may need pre-authorization 5) Pharmacy discount programs available 6) Long-term medications may have different coverage 7) Work with your doctor to find covered alternatives if needed.",
    category: "insurance"
  },
  "how to appeal insurance denial": {
    answer: "Steps to appeal insurance denial: 1) Get detailed reason for denial in writing 2) Gather supporting medical documentation 3) Get letter of medical necessity from surgeon 4) Submit appeal within deadline 5) Include research supporting procedure necessity 6) Consider external review if initial appeal fails 7) Work with hospital's financial counselors 8) Document all communications.",
    category: "insurance"
  },

  // Alternative Treatments
  "are there alternatives to transplant": {
    answer: "Alternatives to eye tissue transplant may include: 1) Medications for early-stage conditions 2) Contact lenses for keratoconus 3) Laser therapy for certain conditions 4) Partial thickness transplants. The best option depends on your specific condition and its severity.",
    category: "alternatives"
  },
  "what are the latest advances": {
    answer: "Recent advances include: 1) Artificial corneas (keratoprosthesis) 2) DMEK/DSAEK techniques for faster recovery 3) Stem cell therapy for certain conditions 4) Collagen cross-linking for keratoconus 5) Advanced imaging for better surgical planning 6) New preservation methods for donor tissue.",
    category: "alternatives"
  },
  "tell me about artificial corneas": {
    answer: "Artificial cornea (keratoprosthesis) information: 1) Option for patients unsuitable for donor tissue 2) Made from biocompatible materials 3) May be permanent solution 4) Success rates improving with new technologies 5) Requires specific surgical expertise 6) Different types available for various conditions 7) Regular monitoring needed 8) May be covered by insurance if medically necessary.",
    category: "alternatives"
  },
  "what is collagen cross linking": {
    answer: "Collagen cross-linking treatment: 1) Strengthens corneal tissue 2) Primarily for keratoconus 3) Uses UV light and riboflavin drops 4) Can prevent need for transplant 5) Outpatient procedure 6) Minimal recovery time 7) Best results in early disease stages 8) May be combined with other treatments 9) FDA-approved procedure.",
    category: "alternatives"
  },
  "are there stem cell treatments": {
    answer: "Stem cell therapy options: 1) Used for certain corneal conditions 2) Can help repair damaged tissue 3) May reduce scarring 4) Clinical trials ongoing 5) Combined with traditional treatments 6) Not suitable for all conditions 7) Availability varies by location 8) Research showing promising results 9) Discuss eligibility with your doctor.",
    category: "alternatives"
  },
  "what about laser treatments": {
    answer: "Laser treatment possibilities: 1) PTK (Phototherapeutic Keratectomy) for surface irregularities 2) Custom ablation for certain corneal conditions 3) Combined with other procedures 4) May delay/prevent need for transplant 5) Minimal recovery time 6) Not suitable for all conditions 7) Success depends on corneal thickness 8) Regular monitoring needed.",
    category: "alternatives"
  },
  "non surgical treatment options": {
    answer: "Non-surgical options include: 1) Specialized contact lenses 2) Medications for inflammation 3) Eye drops for specific conditions 4) Dietary supplements for eye health 5) Vision therapy exercises 6) Lifestyle modifications 7) Regular monitoring 8) Combination treatments. Success varies based on condition severity and type.",
    category: "alternatives"
  },
  "what about clinical trials": {
    answer: "Clinical trial information: 1) New treatments being researched 2) May provide access to cutting-edge options 3) Often at reduced/no cost 4) Strict eligibility criteria 5) Regular monitoring provided 6) Contributes to medical research 7) Available at major medical centers 8) Discuss participation with your doctor 9) Search clinicaltrials.gov for opportunities.",
    category: "alternatives"
  },

  // Lifestyle and Long-term Care
  "can I play sports after recovery": {
    answer: "Return to sports guidelines: 1) Non-contact sports: 3-4 months 2) Swimming: After 3 months 3) Contact sports: At least 6 months 4) Protective eyewear recommended. Always get clearance from your surgeon and follow protective measures to prevent injury.",
    category: "lifestyle"
  },
  "how long does a corneal transplant last": {
    answer: "Transplant longevity varies: 1) Many last 10+ years 2) Some last a lifetime 3) Success factors include: proper care, regular check-ups, medication compliance 4) Signs of aging may occur naturally. Regular monitoring helps identify any issues early.",
    category: "lifestyle"
  },
  "can I drive after surgery": {
    answer: "Driving restrictions vary: 1) No driving for at least 1-2 weeks 2) Must pass vision test before resuming driving 3) Night driving may be restricted longer 4) Some patients need 1-3 months before driving 5) Always get clearance from your doctor before driving. Your vision must meet legal requirements for driving.",
    category: "lifestyle"
  },
  "when can I use computers and phones": {
    answer: "Screen use guidelines: 1) Limited use after 1-2 weeks 2) Start with short periods (15-20 minutes) 3) Use artificial tears frequently 4) Adjust screen brightness and contrast 5) Take regular breaks using the 20-20-20 rule (every 20 minutes, look 20 feet away for 20 seconds) 6) Position screens at eye level or slightly below.",
    category: "lifestyle"
  },
  "can I travel after transplant": {
    answer: "Travel considerations: 1) No air travel for 1-2 weeks after surgery 2) Carry all medications and eye drops 3) Take artificial tears for dry airplane cabins 4) Have a copy of your medical records 5) Know local eye care facilities at your destination 6) Avoid dusty or sandy environments initially 7) Wear good UV-protective sunglasses outdoors.",
    category: "lifestyle"
  },
  "what about makeup and skincare": {
    answer: "Beauty product guidelines: 1) No eye makeup for at least 1 month 2) New, unopened products when resuming makeup 3) Avoid oil-based products near eyes 4) Be gentle when washing face 5) Never sleep with makeup on 6) Use hypoallergenic products 7) Keep all brushes and applicators clean 8) Avoid false eyelashes for several months.",
    category: "lifestyle"
  },
  "can I exercise after surgery": {
    answer: "Exercise timeline: 1) Light walking: After 1 week 2) No bending or lifting for 2-4 weeks 3) Moderate exercise: After 1 month 4) Weight training: After 2-3 months 5) Always wear protective eyewear 6) Avoid exercises that strain eyes 7) Stop if you feel discomfort 8) Build up gradually with doctor's approval.",
    category: "lifestyle"
  },
  "what about work environment considerations": {
    answer: "Workplace adaptations: 1) Use good lighting 2) Take regular breaks 3) Adjust computer/screen settings 4) Avoid dusty environments 5) Use protective eyewear if needed 6) Keep artificial tears handy 7) Consider an anti-glare screen 8) Maintain good posture to reduce eye strain 9) Inform colleagues about your condition if comfortable.",
    category: "lifestyle"
  },
  "how to protect eyes in daily life": {
    answer: "Daily protection tips: 1) Always wear UV-protective sunglasses outdoors 2) Use protective eyewear for activities/sports 3) Keep eyes lubricated with prescribed drops 4) Avoid rubbing eyes 5) Maintain good hygiene 6) Protect eyes from wind and dust 7) Get adequate sleep 8) Stay hydrated 9) Eat a healthy diet rich in vitamins A, C, and E.",
    category: "lifestyle"
  },
  "what activities should I avoid permanently": {
    answer: "Long-term precautions: 1) Contact sports without proper protection 2) Swimming without goggles 3) Hot tubs/saunas without eye protection 4) Dusty/smoky environments 5) Rubbing eyes vigorously 6) Using old/shared eye makeup 7) Sleeping in contact lenses 8) Activities with high risk of eye injury. Always prioritize eye protection in any activity.",
    category: "lifestyle"
  },

  // Emotional Support and Motivation
  "i am scared of surgery": {
    answer: "I understand that feeling scared is completely normal. Many successful transplant recipients felt the same way. Remember: 1) You have a skilled medical team supporting you 2) The success rates are very high (90%) 3) Modern techniques make the procedure safer than ever 4) This is your chance to improve your vision and quality of life 5) You are stronger than you think. Take one step at a time, and we're here to support you through every stage.",
    category: "emotional"
  },
  "i am afraid of the procedure": {
    answer: "It's natural to feel afraid, dear. Let me reassure you: 1) You'll be in the caring hands of experienced doctors 2) The procedure is done under anesthesia, so you won't feel any pain 3) Thousands of people have successfully gone through this journey 4) Your doctors will explain everything and answer all your questions 5) Think about the beautiful moments waiting for you when your vision improves. You're taking a brave step toward a better future.",
    category: "emotional"
  },
  "what if something goes wrong": {
    answer: "I hear your concern, and it's completely valid to worry. But let me share some reassuring facts: 1) Corneal transplants have one of the highest success rates of any transplant procedure 2) Your surgical team is highly trained to handle any situation 3) Most complications can be treated effectively if they occur 4) You'll have regular check-ups to ensure everything is healing well 5) Remember, this surgery has helped countless people regain their vision and joy in life. You're making a positive choice for your future.",
    category: "emotional"
  },
  "i feel nervous about transplant": {
    answer: "Just like a mother would say, feeling nervous shows you care about your health. Let's focus on the positive: 1) This surgery is a gift of better vision 2) Your medical team has extensive experience 3) You'll have support every step of the way 4) Many patients say their fears disappeared after speaking with their doctor 5) Think about all the wonderful things you'll be able to see more clearly. You're not alone in this journey, and we believe in your strength.",
    category: "emotional"
  },
  "i dont think i can do this": {
    answer: "My dear, you are stronger than you realize. Like a mother, I want you to know: 1) It's okay to feel uncertain, but don't let fear hold you back 2) This procedure has helped thousands of people just like you 3) Your doctors wouldn't recommend this if they weren't confident in your success 4) Think of all the beautiful things waiting for you after recovery 5) You have support from your medical team, family, and all of us. Take a deep breath - you've already shown courage by considering this step.",
    category: "emotional"
  },
  "will it hurt": {
    answer: "Let me ease your mind, just like a mother would: 1) During surgery, you'll be under anesthesia and won't feel any pain 2) After surgery, any discomfort can be managed with prescribed medications 3) Most patients describe it as mild discomfort rather than pain 4) Your doctors will ensure you're comfortable throughout recovery 5) Remember, temporary discomfort leads to long-term improvement in your vision. You'll be well taken care of, dear.",
    category: "emotional"
  },
  "feeling depressed about surgery": {
    answer: "I understand these feelings, and I want you to know they're valid. Let me offer some motherly encouragement: 1) This surgery is a step toward better days 2) Many patients report feeling much happier after their vision improves 3) You have a whole team of people supporting your journey 4) Consider talking to others who've had successful transplants 5) Focus on the positive changes this will bring to your life. Remember, it's okay to feel down, but don't let it stop you from moving forward. You're making a brave choice for your health.",
    category: "emotional"
  },
  "need motivation for surgery": {
    answer: "Like a mother's warm hug, let me share some encouraging thoughts: 1) You're taking a powerful step toward improving your life 2) Think of all the beautiful moments you'll see more clearly - sunsets, loved ones' smiles, and precious memories 3) Your courage in facing this challenge is admirable 4) Thousands of successful patients once stood where you are now 5) You have the strength within you, even if you don't feel it right now. We believe in you, and you're not walking this path alone.",
    category: "emotional"
  },
  "feeling anxious about transplant": {
    answer: "Dearest, your anxiety is natural, but let me comfort you like a mother would: 1) This anxiety shows you care about your health - that's a good thing! 2) The medical team has helped many anxious patients through successful surgeries 3) You'll be surrounded by caring professionals who understand your fears 4) Consider this a journey toward better days, not just a medical procedure 5) Remember, courage isn't about not being scared - it's about moving forward despite your fears. You've got this, and we're here for you.",
    category: "emotional"
  },
  "worried about recovery": {
    answer: "Like a mother holding your hand, let me reassure you about recovery: 1) You'll have clear guidelines and support every step of the way 2) Many patients find recovery easier than they expected 3) Each day of healing brings you closer to better vision 4) You'll have regular check-ups to ensure everything is going well 5) Remember, this temporary period of recovery leads to long-lasting benefits. Take it one day at a time, and be gentle with yourself. You're doing something wonderful for your health.",
    category: "emotional"
  },

  // Follow-up Questions - General Category
  "what types of eye transplants are available": {
    answer: "There are several types of eye transplants available:\n\n1. Penetrating Keratoplasty (PKP):\n• Full-thickness corneal transplant\n• Used for severe corneal damage\n• Traditional and most common method\n\n2. DMEK (Descemet's Membrane Endothelial Keratoplasty):\n• Ultra-thin layer transplant\n• Faster recovery\n• Better visual outcomes\n\n3. DSAEK (Descemet's Stripping Automated Endothelial Keratoplasty):\n• Partial thickness transplant\n• Less invasive than PKP\n• Shorter recovery time\n\n4. ALK (Anterior Lamellar Keratoplasty):\n• Front portion replacement\n• Preserves healthy inner layers\n• Lower rejection risk",
    category: "general"
  },
  "how successful are eye transplants": {
    answer: "Eye transplant success rates are very encouraging:\n\n• Overall Success Rate: 90-95% at one year\n• Long-term Success: 75-80% at five years\n\nFactors affecting success:\n1. Type of procedure\n2. Underlying condition\n3. Patient compliance with medication\n4. Post-operative care\n5. Surgeon experience\n\nSuccess metrics include:\n• Vision improvement\n• Graft clarity\n• Patient satisfaction\n• Complication rates\n\nModern techniques and improved post-operative care continue to enhance success rates.",
    category: "general"
  },
  "how common are eye transplants": {
    answer: "Eye transplants are one of the most common and successful transplant procedures:\n\n• Annual Procedures:\n- Worldwide: Over 185,000 corneal transplants\n- United States: Approximately 47,000 annually\n\n• Availability:\n- Minimal waiting time compared to other organs\n- Good donor tissue availability\n- High donation rates\n\n• Demographics:\n- Most common in 50-70 age group\n- Increasing in younger patients due to keratoconus\n- Available in most major medical centers",
    category: "general"
  },

  // Follow-up Questions - Procedure Category
  "how long does the surgery take": {
    answer: "The duration of eye transplant surgery varies by procedure type:\n\n1. Penetrating Keratoplasty (PKP):\n• 60-90 minutes\n• Most complex procedure\n\n2. DMEK:\n• 30-45 minutes\n• Technically challenging but faster\n\n3. DSAEK:\n• 45-60 minutes\n• Moderate complexity\n\n4. ALK:\n• 45-75 minutes\n• Varies with complexity\n\nFactors affecting duration:\n• Surgeon experience\n• Patient factors\n• Complications\n• Type of anesthesia used",
    category: "procedure"
  },
  "is the procedure painful": {
    answer: "Eye transplant surgery is performed under anesthesia and pain management is well-controlled:\n\n During Surgery:\n• Local or general anesthesia used\n• No pain during procedure\n• Completely numb eye area\n\nAfter Surgery:\n• Mild to moderate discomfort\n• Feeling of foreign body sensation\n• Manageable with prescribed pain medication\n• Discomfort typically peaks at 24-48 hours\n• Gradually improves over 1-2 weeks\n\nPain Management:\n• Prescribed eye drops\n• Oral pain medication if needed\n• Cold compresses for comfort\n• Regular follow-up to monitor healing",
    category: "procedure"
  },
  "what anesthesia is used for eye transplants": {
    answer: "Anesthesia for eye transplants is carefully chosen based on several factors:\n\n1. Types of Anesthesia:\n• Local anesthesia with sedation (most common)\n• General anesthesia (less common)\n• Regional nerve blocks\n\n2. Local Anesthesia Benefits:\n• Faster recovery\n• Fewer side effects\n• Outpatient procedure\n• Lower risks\n\n3. General Anesthesia Cases:\n• Young patients\n• Anxiety issues\n• Complex procedures\n• Medical necessity\n\n4. Pre-anesthesia Evaluation:\n• Medical history review\n• Current medications check\n• Physical examination\n• Airway assessment",
    category: "procedure"
  },

  // Follow-up Questions - Donor Category
  "how is donor tissue screened": {
    answer: "Donor tissue screening is a rigorous multi-step process:\n\n1. Medical Screening:\n• Detailed medical history review\n• Blood-borne disease testing\n• Cancer screening\n• Infectious disease testing\n\n2. Physical Examination:\n• Tissue quality assessment\n• Endothelial cell count\n• Corneal clarity check\n• Size and shape evaluation\n\n3. Laboratory Testing:\n• HIV testing\n• Hepatitis B and C\n• Syphilis\n• Other transmissible diseases\n\n4. Quality Measures:\n• Microscopic examination\n• Cell density measurement\n• Tissue preservation assessment\n• Contamination testing",
    category: "donor"
  },
  "how long after death can tissue be donated": {
    answer: "Time constraints for eye tissue donation are specific:\n\n1. Optimal Timeframe:\n• Within 6-12 hours of death\n• Best tissue quality\n• Highest success rate\n\n2. Maximum Limits:\n• Up to 24 hours in some cases\n• Depends on preservation conditions\n• Environmental factors matter\n\n3. Storage Duration:\n• Up to 14 days in preservation medium\n• Optimal use within 7 days\n• Regular quality checks\n\n4. Factors Affecting Viability:\n• Temperature control\n• Storage conditions\n• Preservation method\n• Initial tissue quality",
    category: "donor"
  },
  "can i specify that i want to donate my eyes": {
    answer: "Yes, you can specify eye donation through several methods:\n\n1. Official Registration:\n• State donor registry\n• Driver's license designation\n• Online registration\n• Advance directives\n\n2. Documentation Required:\n• Written consent\n• Donor card\n• Living will inclusion\n• Medical directive\n\n3. Important Steps:\n• Inform family of wishes\n• Designate in legal documents\n• Contact eye bank for information\n• Update medical records\n\n4. Additional Considerations:\n• Age not a barrier\n• Most medical conditions acceptable\n• No cost to donor family\n• Doesn't affect funeral arrangements",
    category: "donor"
  },

  // Follow-up Questions - Risks Category
  "what is the rejection rate": {
    answer: "Rejection rates vary by procedure type and patient factors:\n\n1. Overall Rates:\n• PKP: 5-30% rejection risk\n• DMEK: 1-3% rejection risk\n• DSAEK: 5-10% rejection risk\n\n2. Risk Factors:\n• Young age\n• Previous rejections\n• Vascularized corneas\n• Active inflammation\n• Poor medication compliance\n\n3. Timeline:\n• Most common in first year\n• Can occur years later\n• Early detection crucial\n• Treatable if caught early\n\n4. Prevention Strategies:\n• Regular medication use\n• Frequent check-ups\n• Prompt reporting of symptoms\n• Lifestyle modifications",
    category: "risks"
  },
  "what complications are most common": {
    answer: "Common complications after eye transplantation include:\n\n1. Early Complications (0-3 months):\n• Infection (1-2%)\n• Wound leak\n• High eye pressure\n• Epithelial defects\n\n2. Intermediate (3-12 months):\n• Rejection episodes\n• Astigmatism\n• Suture problems\n• Vision fluctuation\n\n3. Late Complications (>1 year):\n• Graft failure\n• Glaucoma\n• Cataracts\n• Irregular astigmatism\n\n4. Prevention and Management:\n• Regular follow-up\n• Medication compliance\n• Prompt intervention\n• Lifestyle modifications",
    category: "risks"
  },
  "how is rejection treated if it occurs": {
    answer: "Rejection treatment involves prompt and aggressive intervention:\n\n1. Immediate Actions:\n• Intensive steroid therapy\n• Frequent monitoring\n• Medication adjustment\n• Hospitalization if severe\n\n2. Treatment Protocol:\n• Topical steroids\n• Oral medications\n• Injectable steroids\n• Immunosuppressants if needed\n\n3. Monitoring:\n• Daily initially\n• Weekly follow-up\n• Regular testing\n• Vision checks\n\n4. Long-term Management:\n• Adjusted medication schedule\n• Prevention strategies\n• Regular check-ups\n• Patient education",
    category: "risks"
  },

  // Follow-up Questions - Vision Category
  "how much vision improvement can i expect": {
    answer: "Vision improvement varies by condition and procedure:\n\n1. Typical Outcomes:\n• 20/20 to 20/40: 60% of cases\n• 20/40 to 20/100: 30% of cases\n• Limited improvement: 10% of cases\n\n2. Timeline:\n• Initial clarity: 1-3 months\n• Stable vision: 6-12 months\n• Final results: 12-18 months\n\n3. Factors Affecting Improvement:\n• Original condition\n• Procedure type\n• Healing response\n• Compliance with care\n\n4. Additional Considerations:\n• May need glasses/contacts\n• Astigmatism common\n• Regular check-ups important\n• Vision can continue improving",
    category: "vision"
  },
  "when will my vision stabilize after surgery": {
    answer: "Vision stabilization follows a typical timeline:\n\n1. Early Phase (1-4 weeks):\n• Initial healing\n• Fluctuating vision\n• Gradual improvement\n• Light sensitivity\n\n2. Intermediate Phase (1-6 months):\n• Increasing clarity\n• Reduced fluctuation\n• Suture adjustments\n• Astigmatism management\n\n3. Late Phase (6-18 months):\n• Vision stabilization\n• Final prescription\n• Optimal clarity\n• Long-term results\n\n4. Factors Affecting Timeline:\n• Healing rate\n• Procedure type\n• Compliance with care\n• Individual variations",
    category: "vision"
  },
  "will i need glasses after the transplant": {
    answer: "Most patients require vision correction after transplant:\n\n1. Types of Correction:\n• Glasses (most common)\n• Contact lenses\n• Specialty lenses\n• Hybrid solutions\n\n2. Timeline for Prescription:\n• Temporary glasses: 3-4 months\n• Permanent prescription: 12-18 months\n• Regular updates needed\n• Gradual adjustment\n\n3. Factors Affecting Need:\n• Procedure type\n• Pre-existing conditions\n• Astigmatism\n• Healing pattern\n\n4. Special Considerations:\n• Custom fitting may be needed\n• Multiple prescriptions possible\n• Regular updates\n• Professional fitting important",
    category: "vision"
  },

  // Follow-up Questions - Insurance Category
  "what is the average cost without insurance": {
    answer: "Costs for eye transplantation without insurance vary:\n\n1. Procedure Costs:\n• Surgery: $13,000 - $20,000\n• Donor tissue: $2,000 - $4,000\n• Facility fees: $3,000 - $5,000\n• Anesthesia: $1,000 - $2,000\n\n2. Additional Expenses:\n• Pre-op testing: $500 - $1,500\n• Medications: $200 - $500/month\n• Follow-up visits: $100 - $300 each\n• Vision correction: $200 - $1,000\n\n3. Payment Options:\n• Payment plans\n• Medical financing\n• Charity programs\n• Sliding scale fees\n\n4. Cost-Saving Strategies:\n• Teaching hospitals\n• Clinical trials\n• Financial assistance\n• Negotiated rates",
    category: "insurance"
  },
  "does medicare cover eye transplants": {
    answer: "Medicare coverage for eye transplants is comprehensive:\n\n1. Medicare Part A (Hospital):\n• Inpatient facility fees\n• Hospital stays if needed\n• Nursing care\n• Related services\n\n2. Medicare Part B (Medical):\n• Surgeon fees\n• Outpatient care\n• Follow-up visits\n• Medical supplies\n\n3. Medicare Part D (Prescription):\n• Post-operative medications\n• Anti-rejection drugs\n• Eye drops\n• Pain medications\n\n4. Coverage Details:\n• 80% of approved charges\n• Deductibles apply\n• Copayments required\n• Prior authorization needed",
    category: "insurance"
  },
  "are there financial assistance programs": {
    answer: "Multiple financial assistance options are available:\n\n1. Government Programs:\n• Medicaid\n• State assistance\n• Veterans benefits\n• Disability programs\n\n2. Private Organizations:\n• Lions Club\n• Eye banks\n• Hospital foundations\n• Patient advocacy groups\n\n3. Healthcare Options:\n• Sliding scale fees\n• Payment plans\n• Medical credit cards\n• Crowdfunding platforms\n\n4. Application Process:\n• Income verification\n• Medical necessity\n• Documentation needed\n• Application deadlines",
    category: "insurance"
  },

  // Follow-up Questions - Alternatives Category
  "what are alternatives to transplantation": {
    answer: "Several alternatives to eye transplantation exist:\n\n1. Medical Treatments:\n• Prescription eye drops\n• Oral medications\n• Contact lenses\n• Vision therapy\n\n2. Surgical Options:\n• Artificial corneas\n• Partial thickness procedures\n• Laser treatments\n• Collagen cross-linking\n\n3. Emerging Technologies:\n• Stem cell therapy\n• Bioengineered tissue\n• Gene therapy\n• Novel drug delivery\n\n4. Conservative Management:\n• Vision aids\n• Lifestyle modifications\n• Regular monitoring\n• Supportive care",
    category: "alternatives"
  },
  "can artificial corneas be used instead": {
    answer: "Artificial corneas (keratoprostheses) are viable alternatives:\n\n1. Types Available:\n• Boston KPro\n• AlphaCor\n• OsteoKPro\n• Custom devices\n\n2. Ideal Candidates:\n• Multiple failed transplants\n• Chemical injuries\n• Autoimmune diseases\n• Severe dry eye\n\n3. Advantages:\n• No tissue rejection\n• Immediate vision\n• Long-term solution\n• Available on demand\n\n4. Considerations:\n• Higher complication rate\n• Regular monitoring needed\n• Specialized care required\n• Cost implications",
    category: "alternatives"
  },
  "what if i decide not to get a transplant": {
    answer: "Understanding life without transplantation:\n\n1. Vision Impact:\n• Progressive deterioration possible\n• Vision aids needed\n• Adaptation strategies\n• Quality of life changes\n\n2. Management Options:\n• Regular monitoring\n• Supportive treatment\n• Vision rehabilitation\n• Assistive devices\n\n3. Lifestyle Adjustments:\n• Modified activities\n• Safety considerations\n• Support services\n• Mobility training\n\n4. Future Considerations:\n• Option remains open\n• Regular evaluation\n• New treatments\n• Support resources",
    category: "alternatives"
  },

  // Follow-up Questions - Lifestyle Category
  "can i play sports after recovery": {
    answer: "Sports participation after transplant requires careful consideration:\n\n1. Timeline for Return:\n• Non-contact sports: 3-4 months\n• Swimming: 3 months minimum\n• Contact sports: 6+ months\n• Individual assessment needed\n\n2. Protective Measures:\n• Sports goggles required\n• Impact protection\n• UV protection\n• Regular monitoring\n\n3. Recommended Activities:\n• Walking\n• Swimming (with goggles)\n• Stationary cycling\n• Light jogging\n\n4. Activities to Avoid:\n• Boxing\n• Martial arts\n• Full-contact sports\n• High-impact activities",
    category: "lifestyle"
  },
  "are there activities i should avoid": {
    answer: "Certain activities should be avoided or modified:\n\n1. High-Risk Activities:\n• Contact sports\n• Water sports without protection\n• Dusty environments\n• Heavy lifting\n\n2. Workplace Considerations:\n• Computer screen limits\n• Protective eyewear\n• Regular breaks\n• Proper lighting\n\n3. Daily Activities:\n• Eye makeup restrictions\n• Swimming precautions\n• Gardening safety\n• DIY project care\n\n4. General Precautions:\n• Avoid eye rubbing\n• Protect from UV\n• Prevent injury\n• Maintain hygiene",
    category: "lifestyle"
  },
  "how will this affect my daily life": {
    answer: "Impact on daily life varies by individual:\n\n1. Short-term Changes:\n• Time off work/school\n• Activity restrictions\n• Medication schedule\n• Regular check-ups\n\n2. Long-term Adjustments:\n• Vision correction needs\n• Protective measures\n• Lifestyle modifications\n• Ongoing care\n\n3. Quality of Life:\n• Vision improvement\n• Independence level\n• Activity adaptation\n• Social interaction\n\n4. Practical Considerations:\n• Driving restrictions\n• Work modifications\n• Home safety\n• Support needs",
    category: "lifestyle"
  },

  // Follow-up Questions - Emotional Category
  "how can i cope with anxiety before surgery": {
    answer: "Managing pre-surgery anxiety effectively:\n\n1. Professional Support:\n• Counseling services\n• Support groups\n• Medical team consultation\n• Mental health resources\n\n2. Coping Strategies:\n• Deep breathing exercises\n• Meditation techniques\n• Positive visualization\n• Regular exercise\n\n3. Information Management:\n• Ask questions\n• Research success rates\n• Meet surgical team\n• Understand procedure\n\n4. Practical Steps:\n• Prepare recovery space\n• Arrange support system\n• Plan activities\n• Set realistic expectations",
    category: "emotional"
  },
  "are there support groups for recipients": {
    answer: "Various support options are available:\n\n1. Types of Groups:\n• In-person meetings\n• Online communities\n• Social media groups\n• Mentoring programs\n\n2. Resources Available:\n• Educational materials\n• Shared experiences\n• Emotional support\n• Practical advice\n\n3. Finding Support:\n• Eye bank referrals\n• Hospital programs\n• Online platforms\n• Local organizations\n\n4. Benefits:\n• Shared experiences\n• Practical tips\n• Emotional connection\n• Recovery guidance",
    category: "emotional"
  },
  "how can i thank my donor's family": {
    answer: "Ways to express gratitude to donor families:\n\n1. Communication Options:\n• Anonymous letters\n• Thank you cards\n• Through eye bank\n• Support organizations\n\n2. Writing Guidelines:\n• Maintain anonymity\n• Share impact\n• Express gratitude\n• Respect privacy\n\n3. Additional Ways:\n• Volunteer work\n• Advocacy\n• Memorial contributions\n• Awareness raising\n\n4. Important Considerations:\n• Timing sensitivity\n• Cultural respect\n• Privacy rules\n• Emotional impact",
    category: "emotional"
  }
};

// Category-specific keywords mapping
const categoryKeywords = {
  general: ['what', 'explain', 'tell', 'about', 'overview', 'basics', 'understand'],
  procedure: ['surgery', 'operation', 'procedure', 'process', 'surgical', 'operating'],
  donor: ['donate', 'donor', 'tissue', 'donation', 'screening', 'matching', 'preserve'],
  recipient: ['receive', 'recipient', 'qualify', 'eligible', 'candidacy', 'waiting'],
  preparation: ['prepare', 'before', 'pre', 'ready', 'preparation', 'test', 'consultation'],
  recovery: ['recover', 'healing', 'after', 'post', 'follow-up', 'rehabilitation'],
  risks: ['risk', 'complication', 'danger', 'problem', 'issue', 'safety', 'concern'],
  vision: ['see', 'vision', 'sight', 'visual', 'clarity', 'improvement', 'quality'],
  insurance: ['cost', 'cover', 'insurance', 'payment', 'expense', 'financial', 'medicare', 'medicaid'],
  alternatives: ['alternative', 'option', 'different', 'instead', 'other', 'choice'],
  lifestyle: ['life', 'activity', 'daily', 'work', 'sport', 'exercise', 'routine'],
  emotional: ['scared', 'afraid', 'nervous', 'anxious', 'worried', 'fear', 'stress', 'concerned']
};

// Function to find the best matching question
function findBestMatch(userQuestion) {
  userQuestion = userQuestion.toLowerCase().trim();
  
  // Direct match check
  if (qaDatabase[userQuestion]) {
    return qaDatabase[userQuestion];
  }

  // Category detection
  let detectedCategory = null;
  let maxCategoryScore = 0;

  // Check for category keywords
  for (const [category, keywords] of Object.entries(categoryKeywords)) {
    let categoryScore = 0;
    for (const keyword of keywords) {
      if (userQuestion.includes(keyword)) {
        categoryScore++;
      }
    }
    if (categoryScore > maxCategoryScore) {
      maxCategoryScore = categoryScore;
      detectedCategory = category;
    }
  }

  // If category detected, find best match within that category
  if (detectedCategory) {
    let bestCategoryMatch = null;
    let highestScore = 0;

    for (const [question, answer] of Object.entries(qaDatabase)) {
      if (answer.category === detectedCategory) {
        const words = question.split(' ');
        let matchScore = 0;

        for (const word of words) {
          if (userQuestion.includes(word)) {
            matchScore++;
          }
        }

        if (matchScore > highestScore) {
          highestScore = matchScore;
          bestCategoryMatch = answer;
        }
      }
    }

    if (bestCategoryMatch) {
      return bestCategoryMatch;
    }
  }

  // Partial match as fallback
  let bestMatch = null;
  let highestMatchScore = 0;

  for (const [question, answer] of Object.entries(qaDatabase)) {
    const words = question.split(' ');
    let matchScore = 0;

    for (const word of words) {
      if (userQuestion.includes(word)) {
        matchScore++;
      }
    }

    if (matchScore > highestMatchScore) {
      highestMatchScore = matchScore;
      bestMatch = answer;
    }
  }

  if (highestMatchScore >= 2) {
    return bestMatch;
  }

  // Default response if no good match found
  return {
    answer: "I understand you have a question about eye tissue transplantation. Could you please rephrase your question or ask about specific aspects like the procedure, recovery, risks, or eligibility?",
    category: "general"
  };
}

// Function to get chat response
export function getChatResponse(userInput) {
  try {
    if (!userInput?.trim()) {
      throw new Error('Empty input received');
    }

    const response = findBestMatch(userInput);
    return response.answer;
  } catch (error) {
    console.error('Error processing question:', error);
    return "I apologize, but I couldn't process your question. Please try asking again with more specific details about eye tissue transplantation.";
  }
} 
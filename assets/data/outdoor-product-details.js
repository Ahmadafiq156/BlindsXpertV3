// Owner-transcribed Product Detail (Outdoor) note. Measurements are product-level notes,
// not certification that every method/variant shares the same dimensions.
window.BLINDSXPERT_OUTDOOR_DETAILS = {
    'wooden-outdoor': {
        heading:'Choose Meranti Binding Method', enquiryLabel:'Binding Method', navLabel:'Binding methods',
        intro:'The supplied outdoor note lists these binding methods for Meranti. Confirm the material and method for your wooden blind with our team.',
        options:[{name:'Benang (Thread)'},{name:'Tangsi (Fishing Line)'},{name:'Dawai (Wire)'}],
        specs:{'Thickness':'3 mm','Width':'25 mm'},
        specNote:'Meranti measurements recorded in the supplied outdoor note. These do not describe every wooden blind or confirm identical dimensions for each binding method.',
        enquiryNote:'Binding method and measurements are noted for Meranti; confirm the material and method for the wooden blind.',
        source:{title:'Product Detail (Outdoor)', evidence:'Owner transcription and existing-record mapping confirmed on 14 October 2026'}
    },
    'bamboo-outdoor': {
        heading:'Choose Bamboo Variant', enquiryLabel:'Variant', navLabel:'Bamboo variants',
        options:[
            {name:'Bamboo (Normal) — DB838', code:'DB838', requiresSupplierVerification:true, reviewNote:'Handwritten DB838 is not fully confirmed. Do not substitute another code.', enquiryNote:'DB838 is the handwritten code and requires supplier verification.'},
            {name:'Bamboo — DB833', code:'DB833'},
            {name:'Bamboo (Timber Lux)'}
        ],
        specs:{'Single Blind Width':'10 mm', 'Thickness':'3 mm'},
        specNote:'Single-blind measurements recorded in the supplied outdoor note. Applicability to each variant requires confirmation.',
        reviewNotice:'DB838 is the code recorded in the handwritten note and requires supplier verification.',
        source:{title:'Product Detail (Outdoor)', evidence:'Owner transcription in the 14 October 2026 outdoor configurator request'}
    },
    'ziptrak-outdoor': {
        heading:'Choose Outdoor Roller System', enquiryLabel:'Selected System', navLabel:'Outdoor systems',
        intro:'This page also lists other outdoor roller systems from the supplied note. Guided (Cable) and Straight Drop are separate systems, not Ziptrak mechanisms. Confirm your chosen system with our team.',
        options:[
            {name:'Zip Tracks', description:'Zip-track option listed in the outdoor note. Confirm the available system and branding.', enquiryNote:'Zip-track system and branding require confirmation.'},
            {name:'Guided (Cable)', description:'A separate outdoor roller system; not a Ziptrak mechanism.', enquiryNote:'Guided (Cable) is a separate outdoor roller system, not a Ziptrak mechanism.'},
            {name:'Straight Drop', description:'A separate outdoor roller system; not a Ziptrak mechanism.', enquiryNote:'Straight Drop is a separate outdoor roller system, not a Ziptrak mechanism.'}
        ],
        printingOptions:['Full Surface','Slat Printing'],
        printingCompatibilityVerified:false,
        source:{title:'Product Detail (Outdoor)', evidence:'Owner transcription and existing-record mapping confirmed on 14 October 2026'}
    }
};

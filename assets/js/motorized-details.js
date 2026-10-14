// Dedicated Motorized page; original media and all other product layouts stay intact.
window.createBlindsXpertMotorizedDetails = ({main, node, imageFigure, onChange}) => {
    const $ = selector => main.querySelector(selector);
    const systems = [
        {id:'roller', name:'Motorized Roller Blinds', description:'Explore motorized roller blinds, shown in our supplied product images and demonstrations.'},
        {id:'zebra', name:'Motorized Zebra Blinds', description:'See the supplied demonstration of zebra blinds operated with a handheld control.'},
        {id:'ziptrak-outdoor', name:'Ziptrak Motorized Outdoor Blinds', description:'Explore the motorized options listed for our track-guided outdoor blind system. Confirm the combination for your installation.'}
    ];
    const brands = [
        {src:'assets/img/products/motorized/brands/motorized%20brand%20(1).png', alt:'Supplied window covering and motorization brand logo sheet', caption:'Window covering & motorization brands'},
        {src:'assets/img/products/motorized/brands/motorized%20brand%20(1).jpg', alt:'Somfy motor and handheld remote promotional image', caption:'Somfy · motor & remote'},
        {src:'assets/img/products/motorized/brands/motorized%20brand%20(2).png', alt:'Somfy motorization devices promotional poster', caption:'Somfy · motorization products'}
    ];
    // Subjects were checked against start and middle frames, not inferred from poster names.
    const titles = ['Living room roller blinds','Roller blind motor demonstration','Venetian blind demonstration','Vertical blind demonstration','Outdoor roller shade demonstration','Outdoor shade demonstration','Zebra blinds with handheld control'];
    const posters = ['bright-open-plan-living-space','oceanview-boardroom-motorized-blinds','sunlit-reading-nook-venetian-blinds','bedroom-corner-window-vertical-blinds','tropical-patio-roller-shades','tropical-retreat-remote-control','corner-living-room-zebra-blinds'];
    const videos = titles.map((title,i) => ({id:i, title, src:`assets/video/motorized/motorized-demo-${String(i+1).padStart(2,'0')}.mp4`, poster:`assets/img/products/video-thumbnails/${posters[i]}.png`}));
    let root, fields, video, preferred = '', select, switchFeatured;
    const section = (id,title,intro,soft=false) => {
        const wrapper = node('section', 'pd-section'+(soft?' pd-soft':'')); wrapper.id=id;
        const container=node('div','container'); const heading=node('h2','',title); heading.id=id+'-title'; wrapper.setAttribute('aria-labelledby',heading.id);
        container.append(heading); if(intro)container.append(node('p','pd-section-intro',intro)); wrapper.append(container); root.append(wrapper); return container;
    };
    const icon = shape => {
        const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');svg.setAttribute('viewBox','0 0 24 24');svg.setAttribute('aria-hidden','true');
        const path=document.createElementNS('http://www.w3.org/2000/svg','path');path.setAttribute('d',shape);svg.append(path);return svg;
    };
    function chooseSystem(id) {
        preferred=systems.some(system=>system.id===id)?id:''; if(select)select.value=preferred;
        root.querySelectorAll('[data-motor-system]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.motorSystem===preferred)));onChange();
    }
    function build() {
        root=node('div','pd-motorized-content'); root.dataset.motorizedContent=''; $('[data-gallery-section]').before(root);
        const solutions=section('motorized-solutions','Explore Motorized Solutions','Explore motorized window covering options designed for convenient light and privacy control.',true);
        const grid=node('div','pd-motor-grid');grid.setAttribute('role','group');grid.setAttribute('aria-label','Preferred motorized system');
        for(const system of systems){const button=node('button','pd-motor-system');button.type='button';button.dataset.motorSystem=system.id;button.setAttribute('aria-pressed','false');
            if(system.image){const img=node('img');img.src=system.image;img.alt='Supplied motorized roller blind illustration';img.loading='lazy';button.append(img);}
            else button.append(icon('M5 3h14v18H5zM5 8h14M5 12h14M5 16h14'));
            button.append(node('strong','',system.name),node('span','',system.description),node('span','pd-motor-action','Select for enquiry'));button.onclick=()=>chooseSystem(system.id);grid.append(button);}
        solutions.append(grid,node('p','pd-small','System and motor suitability depend on your opening. Our team will confirm the available combination.'));
        const related=node('p','pd-small');related.append(document.createTextNode('Explore related products: '));
        for(const [label,id] of [['Roller Blinds','roller'],['Venetian Blinds','venetian'],['Ziptrak Outdoor Blinds','ziptrak-outdoor']]){const a=node('a','pd-text-link',label);a.href=`product-details.html?product=${id}`;related.append(a,document.createTextNode(' · '));}solutions.append(related);
        const brandSection=section('motor-brands','Motor Systems & Brands','Explore the supplied window covering and motorization brand images. Our catalogue lists Somfy and Dooya ranges; availability depends on the system.');
        const brandGrid=node('div','pd-motor-grid pd-motor-brands');for(const photo of brands)brandGrid.append(imageFigure(photo,false,brands));brandSection.append(brandGrid);
        const catalogue=node('a','pd-text-link','View the motorized catalogue →');catalogue.href='products.html#motorized-solutions';brandSection.append(catalogue);
        const work=section('motor-operation','How Motorized Blinds Work','Control methods and movement vary by system. Confirm the setup for your installation.',true);
        const workGrid=node('div','pd-motor-work-grid');
        for(const [title,copy,shape] of [
            ['Convenient Operation','The supplied images and demonstrations show handheld controls. Ask which control is suitable for your chosen system.','M8 2h8v20H8zM11 6h2M11 10h2M11 14h2'],
            ['Blind Movement','Our demonstrations show blinds raising, lowering or adjusting. The movement depends on the blind mechanism.','M12 3v18M7 8l5-5 5 5M7 16l5 5 5-5'],
            ['Light & Privacy Control','Adjust the blind position to change light and privacy for your space.','M12 3v2M12 19v2M3 12h2M19 12h2M6 6l1 1M17 17l1 1M6 18l1-1M17 7l1-1M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0'],
            ['Professional Installation','Share your window dimensions and installation location so our team can discuss a suitable system.','M4 4h16v16H4zM8 4v4M12 4v3M16 4v4']
        ]){const card=node('article','pd-motor-info');card.append(icon(shape),node('h3','',title),node('p','',copy));workGrid.append(card);}work.append(workGrid);
        const watch=section('motor-videos','Watch Motorized Blinds in Action','Choose a demonstration below. Each clip keeps its original content; functions shown vary by system.');
        const feature=node('div','pd-motor-feature');const playerFrame=node('div','pd-motor-player-frame');video=node('video');video.controls=true;video.playsInline=true;video.preload='none';video.setAttribute('aria-label','Motorized blinds demonstration');playerFrame.append(video);
        const status=node('p','pd-motor-video-status');status.setAttribute('aria-live','polite');
        const caption=node('h3','pd-motor-video-title');caption.setAttribute('aria-live','polite');
        const back=node('button','pd-motor-return','Return to first demonstration');back.type='button';back.hidden=true;
        const thumbs=node('div','pd-motor-thumbnails');thumbs.setAttribute('role','group');thumbs.setAttribute('aria-label','Motorized video demonstrations');
        function switchVideo(index){video.pause();const clip=videos[index];video.poster=clip.poster;video.src=clip.src;video.setAttribute('aria-label',clip.title);video.hidden=false;video.load();status.textContent='';status.removeAttribute('role');caption.textContent=clip.title;back.hidden=index===0;
            thumbs.querySelectorAll('button').forEach(button=>button.setAttribute('aria-pressed',String(Number(button.dataset.motorVideo)===index)));}
        switchFeatured = switchVideo;
        video.addEventListener('error',()=>{video.pause();video.hidden=true;status.textContent='This demonstration could not be loaded or is unsupported. Please choose another video.';status.setAttribute('role','alert');});
        video.addEventListener('loadedmetadata',()=>status.removeAttribute('role'));
        back.onclick=()=>{switchVideo(0);thumbs.querySelector('button')?.focus({preventScroll:true});};
        feature.append(playerFrame,status,caption,back);watch.append(feature);
        for(const clip of videos.slice(1)){const button=node('button','pd-motor-thumb');button.type='button';button.dataset.motorVideo=clip.id;button.setAttribute('aria-pressed','false');
            const frame=node('span','pd-motor-thumb-frame');const img=node('img');img.src=clip.poster;img.alt='';img.loading='lazy';frame.append(img,node('span','pd-motor-play','▶'));button.append(frame,node('span','',clip.title));button.onclick=()=>switchVideo(clip.id);thumbs.append(button);}watch.append(thumbs);switchVideo(0);
        const applications=section('motor-applications','Suitable Applications','Discuss a system for your space with our team.',true);const apps=node('div','pd-motor-app-grid');
        for(const [title,copy] of [['Residential Windows','Explore motorized blinds for your home.'],['Office Spaces','Discuss light and privacy control for office windows.']]){const card=node('article','pd-motor-info');card.append(icon('M4 3h16v18H4zM12 3v18M4 12h16'),node('h3','',title),node('p','',copy));apps.append(card);}applications.append(apps);
        fields=node('fieldset','pd-quotation-fields');fields.dataset.motorizedFields='';fields.append(node('legend','','Motorized installation details (optional)'));
        const label=node('label','','Preferred Motorized System (optional)');label.htmlFor='motor-preferred-system';select=node('select');select.id='motor-preferred-system';select.name='motorPreferredSystem';select.add(new Option('Discuss with our team',''));for(const system of systems)select.add(new Option(system.name,system.id));select.onchange=()=>chooseSystem(select.value);fields.append(label,select);
        for(const [id,title,placeholder] of [['motor-dimensions','Approximate Window Dimensions','Width × height, including units'],['motor-location','Installation Location','Room or installation area']]){const label=node('label','',title+' (optional)');label.htmlFor=id;const input=node('input');input.id=id;input.name=id;input.placeholder=placeholder;fields.append(label,input);}
        $('#productEnquiryForm').querySelector('label[for="enquiryMessage"]').before(fields);
        const nav=node('a','','Motorized solutions');nav.href='#motorized-solutions';nav.dataset.motorizedNav='';$('[data-nav-gallery]').before(nav);
        document.addEventListener('visibilitychange',()=>{if(document.hidden)video.pause();});
    }
    return {
        render(product){const active=product.id==='motorized';if(!root&&active)build();if(!root)return;root.hidden=!active;fields.hidden=!active;fields.disabled=!active;$('[data-motorized-nav]').hidden=!active;
            if(!active){video.pause();video.removeAttribute('src');video.load();preferred='';select.value='';fields.querySelectorAll('input').forEach(input=>input.value='');}
            else{if(!video.getAttribute('src'))switchFeatured(0);chooseSystem(preferred);
                $('#product-enquiry h2').textContent='Get a Custom Quotation';$('#product-enquiry h2').nextElementSibling.textContent='Tell us about your windows and preferred motorized system. Our team can help you explore suitable options and prepare a quotation.';}
        },
        preferredLabel:()=>systems.find(system=>system.id===preferred)?.name || '',
        enquiryLines:()=>[preferred?`Preferred System: ${systems.find(system=>system.id===preferred).name}`:'',...['motor-dimensions','motor-location'].map(id=>{const value=$('#'+id)?.value.trim();return value?`${id==='motor-dimensions'?'Approximate Window Dimensions':'Installation Location'}: ${value}`:''})].filter(Boolean)
    };
};

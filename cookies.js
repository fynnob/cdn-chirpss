/**
 * cookies.js - 2026 Edition (GTM Updated)
 * Hosted at: https://cdn.fynn.qzz.io/cookies.js
 */

(function() {
    'use strict';
    
    const CONFIG = {
        key: 'chirpss_analytics_consent',
        gtm_id: 'GTM-T4GHNF47', // New GTM ID
        consent_types: {
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
            analytics_storage: 'denied',
        }
    };
    
    const isGerman = window.location.href.includes('/De/') || document.documentElement.lang === 'de';
    
    const TEXT = isGerman ? {
        msg: 'Wir verwenden Cookies, um dein Spielerlebnis zu verbessern und zu analysieren.',
        learn: 'Mehr erfahren.',
        link: 'https://chirpss.github.io/De/cookies',
        decline: 'Ablehnen',
        accept: 'Akzeptieren'
    } : {
        msg: 'We use cookies to improve and analyze your gaming experience.',
        learn: 'Learn more.',
        link: 'https://gc.fynn.qzz.io/En/cookies',
        decline: 'Decline',
        accept: 'Accept'
    };
    
    // 1. Initialize dataLayer & Default Consent
    window.dataLayer = window.dataLayer || [];
    
    function gtag() { dataLayer.push(arguments); }
    
    // Set default consent to 'denied' immediately
    gtag('consent', 'default', CONFIG.consent_types);
    
    // 2. Load Google Tag Manager (Replaces direct GA load)
    (function(w, d, s, l, i) {
        w[l] = w[l] || [];
        w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
        var f = d.getElementsByTagName(s)[0],
            j = d.createElement(s),
            dl = l != 'dataLayer' ? '&l=' + l : '';
        j.async = true;
        j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
        f.parentNode.insertBefore(j, f);
    })(window, document, 'script', 'dataLayer', CONFIG.gtm_id);
    
    // 3. Inject GTM NoScript (Body)
    function injectNoScript() {
        if (document.getElementById('gtm-noscript')) return;
        const ns = document.createElement('noscript');
        ns.id = 'gtm-noscript';
        const iframe = document.createElement('iframe');
        iframe.src = `https://www.googletagmanager.com/ns.html?id=${CONFIG.gtm_id}`;
        iframe.height = "0";
        iframe.width = "0";
        iframe.style.display = "none";
        iframe.style.visibility = "hidden";
        ns.appendChild(iframe);
        document.body.insertBefore(ns, document.body.firstChild);
    }
    
    // Ensure NoScript is loaded when body is ready
    if (document.body) injectNoScript();
    else document.addEventListener('DOMContentLoaded', injectNoScript);
    
    // 4. UI Generator
    function injectStyles() {
        if (document.getElementById('chirpss-cookie-style')) return;
        const style = document.createElement('style');
        style.id = 'chirpss-cookie-style';
        style.innerHTML = `
            #cookie-banner {
                position: fixed; bottom: 20px; right: 20px; z-index: 9999;
                background-color: #1e293b; color: #F5F1E6;
                padding: 1.5rem; box-shadow: 0 10px 30px rgba(0,0,0,0.5);
                border: 1px solid rgba(255,255,255,0.1); border-radius: 12px;
                max-width: 350px; font-family: 'Plus Jakarta Sans', sans-serif;
                transform: translateY(150%); transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            }
            #cookie-banner.visible { transform: translateY(0); }
            .cb-text { font-size: 0.9rem; line-height: 1.4; margin-bottom: 1rem; }
            .cb-text a { color: #F97316; text-decoration: underline; }
            .cb-buttons { display: flex; gap: 0.5rem; }
            button.cb-btn {
                flex: 1; padding: 0.5rem 0; border-radius: 8px; cursor: pointer; 
                font-weight: 700; font-size: 0.85rem; transition: all 0.2s;
            }
            button.cb-accept { background: linear-gradient(to right, #F97316, #F59E0B); color: white; border: none; }
            button.cb-accept:hover { opacity: 0.9; transform: translateY(-1px); }
            button.cb-decline { background: transparent; color: #94A3B8; border: 1px solid #334155; }
            button.cb-decline:hover { border-color: #94A3B8; color: white; }
        `;
        document.head.appendChild(style);
    }
    
    function createBanner() {
        injectStyles();
        if (document.getElementById('cookie-banner')) return;
        const banner = document.createElement('div');
        banner.id = 'cookie-banner';
        banner.innerHTML = `
            <div class="cb-text">
                ${TEXT.msg} <a href="${TEXT.link}">${TEXT.learn}</a>
            </div>
            <div class="cb-buttons">
                <button id="cb-decline" class="cb-btn cb-decline">${TEXT.decline}</button>
                <button id="cb-accept" class="cb-btn cb-accept">${TEXT.accept}</button>
            </div>
        `;
        document.body.appendChild(banner);
        setTimeout(() => banner.classList.add('visible'), 500);
        
        document.getElementById('cb-accept').addEventListener('click', () => updateConsent('granted'));
        document.getElementById('cb-decline').addEventListener('click', () => updateConsent('denied'));
    }
    
    function updateConsent(state) {
        localStorage.setItem(CONFIG.key, state);
        const banner = document.getElementById('cookie-banner');
        if (banner) banner.classList.remove('visible');
        
        // Push the update to GTM
        if (state === 'granted') {
            gtag('consent', 'update', {
                'ad_storage': 'granted',
                'ad_user_data': 'granted',
                'ad_personalization': 'granted',
                'analytics_storage': 'granted'
            });
            // Push a custom event to signal GTM that consent was updated
            dataLayer.push({ 'event': 'consent_updated' });
        }
    }
    
    // 5. Check Logic
    const savedStatus = localStorage.getItem(CONFIG.key);
    
    // If no choice made yet, show banner
    if (!savedStatus) {
        if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', createBanner);
        else createBanner();
    }
    // If choice was granted previously, restore it
    else if (savedStatus === 'granted') {
        updateConsent('granted');
    }
    
})();
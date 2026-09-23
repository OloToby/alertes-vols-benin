export function legalPage() {
  const today = new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Conditions Générales de Vente &amp; Mentions Légales | Alertes Vols Bénin</title>
  <meta name="robots" content="noindex">
  <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='6' fill='%23008751'/%3E%3Ctext x='16' y='24' text-anchor='middle' font-size='22'%3E✈%3C/text%3E%3C/svg%3E">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
  <style>
    :root{--deep:#1B2B3C;--accent:#008751;--muted:#667888;--line:rgba(27,43,60,0.10);--bg:#F8F6F1;--flag-green:#008751;--flag-yellow:#FCD116;--flag-red:#E8112D;--font-display:'Sora',sans-serif;--font-body:'Inter',sans-serif}
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
    html{scroll-behavior:smooth;overflow-x:hidden}
    body{font-family:var(--font-body);background:var(--bg);color:var(--deep);line-height:1.75;font-size:15px;overflow-x:hidden}
    a{color:var(--accent);text-decoration:none}
    a:hover{text-decoration:underline}

    .topbar{background:#fff;border-bottom:1px solid var(--line);padding:14px clamp(16px,4vw,48px);display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:100}
    .wordmark{display:inline-flex;align-items:center;gap:10px;color:var(--deep);text-decoration:none;font-family:var(--font-display);font-size:15px;font-weight:600}
    .wordmark-icon{width:32px;height:32px;border-radius:7px;background:var(--flag-green);display:flex;align-items:center;justify-content:center;font-size:16px}
    .back-btn{font-size:13px;color:var(--muted);display:flex;align-items:center;gap:5px}
    .back-btn:hover{color:var(--deep);text-decoration:none}
    .flag-bar{display:flex;height:4px}
    .flag-bar div:nth-child(1){flex:1;background:var(--flag-green)}
    .flag-bar div:nth-child(2){flex:2;background:var(--flag-yellow)}
    .flag-bar div:nth-child(3){flex:1;background:var(--flag-red)}

    .layout{display:grid;grid-template-columns:260px 1fr;min-height:calc(100vh - 53px)}

    .sidebar{position:sticky;top:53px;height:calc(100vh - 53px);overflow-y:auto;border-right:1px solid var(--line);background:#fff;padding:28px 20px}
    .sidebar h3{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:var(--muted);margin-bottom:16px}
    .sidebar ol{padding-left:0;list-style:none;display:flex;flex-direction:column;gap:4px}
    .sidebar li a{display:block;padding:8px 12px;border-radius:8px;font-size:13px;color:var(--muted);font-weight:500;transition:background .15s,color .15s;line-height:1.4}
    .sidebar li a:hover{background:rgba(0,135,81,0.08);color:var(--accent);text-decoration:none}
    .sidebar li a.active{background:rgba(0,135,81,0.10);color:var(--accent);font-weight:600}
    .sidebar-contact{margin-top:24px;padding:14px;background:rgba(0,135,81,0.06);border:1px solid rgba(0,135,81,0.14);border-radius:10px;font-size:12px;color:#1a5a3a;line-height:1.7}
    .sidebar-contact a{color:var(--accent);font-weight:600}

    .main-content{padding:40px clamp(24px,4vw,64px) 80px}
    .page-header{margin-bottom:48px;padding-bottom:28px;border-bottom:1px solid var(--line)}
    .page-header h1{font-family:var(--font-display);font-size:clamp(24px,3vw,36px);font-weight:800;margin-bottom:10px;color:var(--deep);line-height:1.1}
    .page-header .meta{font-size:13px;color:var(--muted);display:flex;gap:20px;flex-wrap:wrap;margin-top:10px}
    .page-header .meta span{display:flex;align-items:center;gap:5px}

    section{margin-bottom:56px;scroll-margin-top:70px}
    .section-header{display:flex;align-items:center;gap:14px;margin-bottom:24px;padding-bottom:16px;border-bottom:2px solid var(--line)}
    .section-num{width:32px;height:32px;border-radius:50%;background:var(--flag-green);color:#fff;font-size:13px;font-weight:700;display:flex;align-items:center;justify-content:center;flex-shrink:0}
    .section-header h2{font-family:var(--font-display);font-size:20px;font-weight:700;color:var(--deep)}
    .prose{display:flex;flex-direction:column;gap:18px}
    .prose p{color:#374a5a;font-size:15px;line-height:1.8}
    .prose h3{font-size:15px;font-weight:700;color:var(--deep);margin-top:6px;padding-bottom:6px;border-bottom:1px solid var(--line)}
    .prose ul,.prose ol{padding-left:22px;color:#374a5a;font-size:15px;line-height:1.8;display:flex;flex-direction:column;gap:7px}
    .prose li{padding-left:4px}
    .highlight{background:rgba(0,135,81,0.06);border-left:3px solid var(--flag-green);border-radius:0 10px 10px 0;padding:16px 20px;font-size:14.5px;color:#1a5a3a;line-height:1.75}
    .highlight strong{color:#0d3d22}
    .warn{background:rgba(232,17,45,0.05);border-left:3px solid var(--flag-red);border-radius:0 10px 10px 0;padding:16px 20px;font-size:14.5px;color:#7a1220;line-height:1.75}
    .warn strong{color:var(--deep)}
    .info-box{background:#fff;border:1px solid var(--line);border-radius:12px;padding:18px 20px;font-size:14.5px;color:#374a5a;line-height:1.75}
    table{width:100%;border-collapse:collapse;font-size:14px;background:#fff;border-radius:10px;overflow:hidden;border:1px solid var(--line)}
    table th{text-align:left;padding:12px 14px;background:var(--bg);font-weight:600;color:var(--deep);border-bottom:1px solid var(--line);font-size:13px;word-break:break-word}
    table td{padding:12px 14px;border-bottom:1px solid var(--line);color:#374a5a;vertical-align:top;line-height:1.65;word-break:break-word}
    table tr:last-child td{border-bottom:none}
    .sub-section{background:#fff;border:1px solid var(--line);border-radius:12px;padding:20px 22px;display:flex;flex-direction:column;gap:12px}
    .sub-section-title{font-size:14px;font-weight:700;color:var(--deep);display:flex;align-items:center;gap:8px}
    .sub-section-title::before{content:'';width:8px;height:8px;border-radius:50%;background:var(--flag-green);flex-shrink:0}

    @media(max-width:800px){
      .layout{grid-template-columns:1fr}
      .sidebar{display:none}
      .main-content{padding:24px 16px 60px}

      /* Table → stacked cards on mobile */
      table,table tbody,table tr{display:block}
      table{border-radius:10px;overflow:hidden;border:1px solid var(--line)}
      table tr{border-bottom:1px solid var(--line);padding:12px 0}
      table tr:last-child{border-bottom:none;padding-bottom:6px}
      table th{display:block;background:transparent;border:none;padding:0 14px 3px;font-size:11px;text-transform:uppercase;letter-spacing:.07em;color:var(--muted);font-weight:700;line-height:1.4}
      table td{display:block;border:none;padding:0 14px;line-height:1.7;word-break:break-word}

      .topbar{padding:12px 16px}
      .page-header h1{word-break:break-word;font-size:clamp(20px,6vw,28px)}
      .section-header h2{font-size:17px}
      .prose p,.prose ul,.prose ol{font-size:14px}
      .highlight,.warn,.info-box{font-size:13.5px;padding:13px 15px}
      .sub-section{padding:16px}
    }
  </style>
</head>
<body>

<div class="flag-bar"><div></div><div></div><div></div></div>
<nav class="topbar">
  <a href="/" class="wordmark">
    <span class="wordmark-icon">✈</span>
    Alertes Vols Bénin
  </a>
  <a href="/" class="back-btn">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" fill="currentColor"/></svg>
    Retour à l'accueil
  </a>
</nav>

<div class="layout">

  <aside class="sidebar">
    <h3>Sommaire</h3>
    <ol>
      <li><a href="#mentions">1. Mentions légales</a></li>
      <li><a href="#service">2. Description du service</a></li>
      <li><a href="#prix">3. Prix et paiement</a></li>
      <li><a href="#retractation">4. Rétractation &amp; remboursements</a></li>
      <li><a href="#responsabilite">5. Limitation de responsabilité</a></li>
      <li><a href="#confidentialite">6. Politique de confidentialité</a></li>
      <li><a href="#rgpd">7. Vos droits RGPD</a></li>
      <li><a href="#cookies">8. Cookies &amp; traceurs</a></li>
      <li><a href="#resiliation">9. Désinscription</a></li>
      <li><a href="#droit">10. Droit applicable &amp; litiges</a></li>
    </ol>
    <div class="sidebar-contact">
      <strong>Contact</strong><br>
      Pour toute question :<br>
      <a href="mailto:alertesvolsbenin@gmail.com">alertesvolsbenin@gmail.com</a>
    </div>
  </aside>

  <main class="main-content">
    <div class="page-header">
      <h1>Conditions Générales de Vente, d'Utilisation &amp; Politique de Confidentialité</h1>
      <div class="meta">
        <span>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15v-2h2v2h-2zm0-4V7h2v6h-2z" fill="currentColor"/></svg>
          Dernière mise à jour : ${today}
        </span>
        <span>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" stroke-width="2" fill="none"/></svg>
          alertesvolsbenin.com
        </span>
      </div>
      <p style="margin-top:14px;color:#374a5a;font-size:15px;line-height:1.75">Les présentes conditions régissent l'ensemble des relations contractuelles entre <strong>Alertes Vols Bénin</strong> (ci-après « le Service ») et toute personne utilisant le site <strong>alertesvolsbenin.com</strong> ou souscrivant à l'alerte proposée (ci-après « l'Utilisateur »). En accédant au site et en procédant à l'inscription, l'Utilisateur reconnaît avoir lu, compris et accepté sans réserve les présentes conditions dans leur intégralité. Si l'Utilisateur n'accepte pas ces conditions, il lui est demandé de ne pas procéder à l'inscription et de ne pas utiliser le Service.</p>
    </div>

    <!-- 1. MENTIONS LÉGALES -->
    <section id="mentions">
      <div class="section-header">
        <div class="section-num">1</div>
        <h2>Mentions légales</h2>
      </div>
      <div class="prose">
        <table>
          <tr><th>Éditeur du service</th><td><strong>Alertes Vols Bénin</strong>, service numérique exploité par un particulier</td></tr>
          <tr><th>Site web</th><td><a href="https://alertesvolsbenin.com">alertesvolsbenin.com</a>, également accessible via <a href="https://www.alertesvolsbenin.com">www.alertesvolsbenin.com</a></td></tr>
          <tr><th>Contact</th><td><a href="mailto:alertesvolsbenin@gmail.com">alertesvolsbenin@gmail.com</a> · réponse sous 72h ouvrées maximum</td></tr>
          <tr><th>Hébergement</th><td>Cloudflare, Inc., 101 Townsend St, San Francisco, CA 94107, USA. Site : <a href="https://www.cloudflare.com" target="_blank" rel="noopener">cloudflare.com</a><br>Infrastructure distribuée mondialement, conforme aux standards de sécurité SOC 2 Type II et ISO 27001.</td></tr>
          <tr><th>Non-affiliation</th><td>Alertes Vols Bénin est un service <strong>totalement indépendant</strong>, non affilié à Bénin Tours S.A., au Gouvernement de la République du Bénin, au Ministère des Affaires Étrangères du Bénin, ni à aucune autre entité publique ou privée officielle. Le logo, le nom commercial et les contenus du présent site n'ont aucun lien avec ces organisations.</td></tr>
          <tr><th>Déclaration CNIL</th><td>Conformément à la réglementation applicable, les traitements de données personnelles mis en œuvre par ce service sont soumis au Règlement Général sur la Protection des Données (RGPD, Règlement UE 2016/679).</td></tr>
        </table>

        <div class="highlight">
          <strong>Avertissement important :</strong> Alertes Vols Bénin surveille automatiquement le site <em>voyage.benin.bj</em> afin d'en détecter l'ouverture. Ce site tiers est géré par Bénin Tours S.A. sous l'autorité du Gouvernement du Bénin. Alertes Vols Bénin n'a aucun contrôle sur ce site tiers, ses dates d'ouverture, la disponibilité des places ou les conditions de réservation qui y sont appliquées.
        </div>
      </div>
    </section>

    <!-- 2. DESCRIPTION DU SERVICE -->
    <section id="service">
      <div class="section-header">
        <div class="section-num">2</div>
        <h2>Description du service</h2>
      </div>
      <div class="prose">
        <p><strong>Alertes Vols Bénin</strong> est un service numérique d'alerte automatisée dont l'objet exclusif est de surveiller en temps quasi-réel le site officiel des vols spéciaux à destination et en provenance du Bénin (<a href="https://www.voyage.benin.bj" target="_blank" rel="noopener">voyage.benin.bj</a>), et d'informer ses abonnés dès que l'ouverture des réservations est techniquement détectée.</p>

        <div class="sub-section">
          <div class="sub-section-title">Ce que comprend votre abonnement</div>
          <ul>
            <li><strong>Surveillance continue :</strong> le site cible est sondé automatiquement toutes les minutes, 24h/24, 7j/7, sans interruption programmée.</li>
            <li><strong>Détection multi-critères :</strong> l'ouverture est confirmée par la disparition de marqueurs textuels indiquant l'indisponibilité des réservations, croisée avec le retour en état actif (HTTP 200) des pages de réservation profondes. Un double check consécutif est effectué avant tout envoi afin d'éliminer les faux positifs.</li>
            <li><strong>Alerte email :</strong> dès la confirmation de l'ouverture, un email personnalisé est envoyé à l'adresse fournie lors de l'inscription. Cet email contient un lien direct vers le site de réservation.</li>
            <li><strong>Alerte SMS (optionnelle) :</strong> si vous avez explicitement coché la case de consentement SMS lors de votre inscription, un SMS d'alerte est également envoyé au numéro fourni. Les numéros internationaux sont acceptés (format <code>+indicatif numéro</code>, ex : <code>+33 6 12 34 56 78</code> ou <code>+229 97 00 00 00</code>).</li>
            <li><strong>Email de bienvenue :</strong> immédiatement après la confirmation de votre paiement, un email de bienvenue vous est adressé pour confirmer que votre alerte est bien active.</li>
          </ul>
        </div>

        <div class="sub-section">
          <div class="sub-section-title">Caractéristiques et limitations techniques</div>
          <ul>
            <li><strong>Notification unique par cycle :</strong> l'alerte est envoyée une seule fois par cycle d'ouverture. Alertes Vols Bénin ne procède pas à des rappels répétés.</li>
            <li><strong>Numéros internationaux :</strong> les numéros de téléphone de tous pays sont acceptés au format international (<code>+indicatif</code> suivi du numéro, entre 7 et 15 chiffres). Exemple : <code>+33 6 12 34 56 78</code> (France), <code>+229 97 00 00 00</code> (Bénin), <code>+1 212 555 0100</code> (USA).</li>
            <li><strong>Délai d'envoi :</strong> le délai entre la détection de l'ouverture et l'envoi effectif des notifications peut varier de quelques secondes à quelques minutes selon la charge des infrastructures d'envoi (Resend pour les emails, Twilio pour les SMS) et la file d'attente de traitement.</li>
            <li><strong>Aléa d'infrastructure :</strong> les emails peuvent être filtrés par les systèmes anti-spam de votre fournisseur de messagerie. Il est fortement recommandé d'ajouter <strong>alertesvolsbenin@gmail.com</strong> à votre carnet d'adresses dès votre inscription.</li>
          </ul>
        </div>

        <div class="warn">
          <strong>Obligation de moyens, non de résultat.</strong> Alertes Vols Bénin s'engage à mettre en œuvre tous les moyens techniques raisonnables pour détecter l'ouverture et envoyer l'alerte dans les meilleurs délais. Toutefois, le Service ne peut garantir ni l'ouverture des réservations sur voyage.benin.bj, ni la disponibilité de places au moment où vous consultez le site, ni le succès de votre réservation. Ces éléments dépendent exclusivement des décisions et de l'infrastructure de Bénin Tours S.A. et du Gouvernement du Bénin, qui sont totalement indépendants d'Alertes Vols Bénin.
        </div>
      </div>
    </section>

    <!-- 3. PRIX ET PAIEMENT -->
    <section id="prix">
      <div class="section-header">
        <div class="section-num">3</div>
        <h2>Prix et paiement</h2>
      </div>
      <div class="prose">
        <div class="highlight">
          <strong>Prix unique : 5,99 € TTC</strong><br>
          Paiement en une seule fois, non récurrent. Aucun abonnement mensuel, aucun prélèvement automatique, aucune reconduction tacite.
        </div>

        <h3>Modalités de paiement</h3>
        <ul>
          <li>Le paiement est intégralement traité par <strong>Stripe</strong>, prestataire de paiement tiers. Alertes Vols Bénin ne collecte, ne stocke et n'a jamais accès à vos données de carte bancaire.</li>
          <li>Le paiement est exigible immédiatement à la finalisation du formulaire d'inscription, avant l'activation du Service.</li>
          <li>Le prix est affiché et débité en euros (EUR), toutes taxes comprises. Aucune taxe supplémentaire n'est appliquée par Alertes Vols Bénin.</li>
          <li>En cas de frais de change appliqués par votre banque ou Stripe pour une transaction en devise étrangère, ceux-ci sont à votre charge et ne peuvent être imputés au Service.</li>
          <li>L'activation de votre inscription intervient dès la confirmation du paiement par Stripe, généralement dans les secondes qui suivent la transaction.</li>
        </ul>

        <h3>Preuve d'achat</h3>
        <p>Un email de confirmation vous est envoyé automatiquement à l'adresse fournie lors de l'inscription dès que votre paiement est confirmé. Cet email fait office de preuve d'achat. Conservez-le précieusement. En cas de non-réception, vérifiez votre dossier spam ou contactez-nous à <a href="mailto:alertesvolsbenin@gmail.com">alertesvolsbenin@gmail.com</a>.</p>

        <div class="info-box">
          <strong>Important :</strong> En finalisant votre paiement et en soumettant le formulaire d'inscription, vous reconnaissez avoir pris connaissance des présentes Conditions Générales de Vente et les accepter sans réserve. Cette acceptation est enregistrée avec horodatage dans notre base de données.
        </div>
      </div>
    </section>

    <!-- 4. DROIT DE RÉTRACTATION ET REMBOURSEMENTS -->
    <section id="retractation">
      <div class="section-header">
        <div class="section-num">4</div>
        <h2>Droit de rétractation &amp; remboursements</h2>
      </div>
      <div class="prose">
        <h3>Droit de rétractation légal (14 jours)</h3>
        <p>Conformément aux articles L.221-18 et suivants du Code de la consommation, vous disposez d'un délai de <strong>14 jours calendaires</strong> à compter de la date de souscription pour exercer votre droit de rétractation, <strong>à condition que l'alerte n'ait pas encore été envoyée</strong>.</p>
        <p>Si, au cours de ce délai, le service a été pleinement exécuté (c'est-à-dire que l'alerte a été détectée et que les notifications ont été envoyées), le droit de rétractation ne peut s'exercer conformément à l'article L.221-28 du Code de la consommation relatif aux contenus numériques dont l'exécution a commencé avec l'accord préalable du consommateur.</p>
        <p>Pour exercer votre droit de rétractation, envoyez un email à <a href="mailto:alertesvolsbenin@gmail.com">alertesvolsbenin@gmail.com</a> avec l'objet « Rétractation » et en mentionnant l'adresse email utilisée lors de l'inscription. Le remboursement interviendra dans les 14 jours suivant la réception de votre demande, via le même moyen de paiement que celui utilisé lors de l'achat (Stripe).</p>

        <h3>Remboursement si voyage.benin.bj n'ouvre pas</h3>
        <div class="highlight">
          <strong>Garantie de remboursement au-delà de 18 mois :</strong> Si le site voyage.benin.bj n'a pas ouvert ses réservations de vols spéciaux dans un délai de <strong>18 mois</strong> à compter de la date de votre inscription, vous êtes en droit de demander le remboursement intégral de votre paiement (5,99 €). Il vous suffit d'envoyer un email à <a href="mailto:alertesvolsbenin@gmail.com">alertesvolsbenin@gmail.com</a> en mentionnant votre adresse email d'inscription. Le remboursement sera effectué via Stripe dans un délai de 14 jours ouvrés à compter de la réception de votre demande.
        </div>

        <h3>Autres cas de remboursement intégral</h3>
        <ul>
          <li><strong>Double paiement ou facturation erronée :</strong> si vous avez été débité à plusieurs reprises pour une même inscription, ou si le montant débité ne correspond pas au prix affiché de 5,99 €, le trop-perçu vous est remboursé intégralement sur simple demande, sans condition.</li>
          <li><strong>Défaillance technique imputable au Service :</strong> si une panne ou une erreur technique d'Alertes Vols Bénin a empêché l'envoi de votre alerte alors que l'ouverture des réservations avait bien eu lieu et a été détectée par le système, un remboursement intégral vous est accordé sur présentation d'une demande motivée.</li>
          <li><strong>Fermeture définitive du site cible :</strong> si le site voyage.benin.bj est définitivement fermé, désactivé ou que Bénin Tours S.A. cesse toute activité de vols spéciaux de manière permanente et officielle, les abonnés dont l'alerte n'a pas encore été envoyée sont remboursés intégralement sur simple demande.</li>
          <li><strong>Force majeure :</strong> en cas d'événement imprévisible, irrésistible et extérieur (catastrophe naturelle, conflit armé, décision gouvernementale empêchant définitivement l'exploitation du service cible) rendant le service définitivement inexécutable, les abonnés non encore alertés sont remboursés intégralement.</li>
        </ul>

        <h3>Cas pour lesquels aucun remboursement n'est accordé</h3>
        <div class="warn">
          <strong>Exclusions :</strong>
          <ul style="margin-top:8px;padding-left:20px;display:flex;flex-direction:column;gap:6px">
            <li>L'alerte a été envoyée avec succès sur les coordonnées (email et/ou téléphone) fournies lors de l'inscription, indépendamment du fait que vous ayez consulté l'alerte, pu accéder au site de réservation, ou obtenu une place.</li>
            <li>Vous n'avez pas pu accéder au site voyage.benin.bj après réception de l'alerte en raison d'une surcharge du site ou de l'épuisement des places ; ces éléments sont hors du contrôle d'Alertes Vols Bénin.</li>
            <li>Vous avez fourni une adresse email ou un numéro de téléphone erroné lors de l'inscription. Il vous appartient de vérifier l'exactitude de vos coordonnées avant de valider votre inscription.</li>
            <li>Votre fournisseur de messagerie a classé l'email d'alerte en spam ou l'a bloqué.</li>
            <li>Vous avez procédé à une désinscription volontaire avant l'envoi de l'alerte.</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- 5. LIMITATION DE RESPONSABILITÉ -->
    <section id="responsabilite">
      <div class="section-header">
        <div class="section-num">5</div>
        <h2>Limitation de responsabilité</h2>
      </div>
      <div class="prose">
        <p>Alertes Vols Bénin est un service automatisé de surveillance et d'alerte. Sa responsabilité est strictement limitée à l'exécution technique de cette mission. Le Service ne peut en aucun cas être tenu responsable des éléments suivants :</p>

        <div class="sub-section">
          <div class="sub-section-title">Indépendance vis-à-vis du site surveillé</div>
          <ul>
            <li>L'ouverture, le maintien, la fermeture ou la suppression des réservations sur voyage.benin.bj, qui relèvent exclusivement de Bénin Tours S.A. et du Gouvernement du Bénin.</li>
            <li>Les changements techniques apportés à voyage.benin.bj (refonte du site, modification des marqueurs, changement d'URL, passage derrière un système de file d'attente virtuelle, etc.) susceptibles de retarder ou d'empêcher la détection de l'ouverture par le système automatisé.</li>
            <li>La disponibilité ou l'indisponibilité de voyage.benin.bj, ses pannes, ses erreurs, ou tout problème d'accès à ce site tiers.</li>
            <li>La disponibilité des places, les conditions tarifaires appliquées sur voyage.benin.bj, les modalités de paiement ou toute autre condition contractuelle propre à Bénin Tours S.A.</li>
          </ul>
        </div>

        <div class="sub-section">
          <div class="sub-section-title">Infrastructures d'envoi tierces</div>
          <ul>
            <li>Les délais ou échecs de livraison des emails liés aux systèmes de <strong>Resend</strong> (prestataire d'envoi d'emails) ou aux filtres anti-spam des fournisseurs de messagerie des destinataires.</li>
            <li>Les délais ou échecs d'acheminement des SMS liés aux systèmes de <strong>Twilio</strong> (prestataire SMS) ou aux opérateurs de téléphonie mobile.</li>
            <li>Toute interruption de service chez les prestataires tiers utilisés (Cloudflare, Resend, Twilio, Stripe).</li>
          </ul>
        </div>

        <div class="sub-section">
          <div class="sub-section-title">Utilisation du Service par l'Utilisateur</div>
          <ul>
            <li>Les coordonnées incorrectes, incomplètes ou invalides fournies par l'Utilisateur lors de l'inscription.</li>
            <li>L'impossibilité pour l'Utilisateur d'accéder à voyage.benin.bj après réception de l'alerte, en raison d'une saturation du serveur ou de tout autre problème technique indépendant de la volonté d'Alertes Vols Bénin.</li>
            <li>Toute décision de l'Utilisateur prise sur la base des informations transmises par le Service.</li>
          </ul>
        </div>

        <div class="warn">
          <strong>Plafond de responsabilité :</strong> Dans tous les cas où la responsabilité d'Alertes Vols Bénin serait reconnue, le montant maximal de l'indemnisation est limité au montant effectivement payé par l'Utilisateur, soit <strong>5,99 € TTC</strong>. Aucune indemnisation au titre d'un préjudice indirect, d'une perte de chance, d'un préjudice moral ou de tout autre dommage immatériel ne pourra être réclamée au Service.
        </div>
      </div>
    </section>

    <!-- 6. POLITIQUE DE CONFIDENTIALITÉ -->
    <section id="confidentialite">
      <div class="section-header">
        <div class="section-num">6</div>
        <h2>Politique de confidentialité</h2>
      </div>
      <div class="prose">
        <p>La présente politique de confidentialité décrit de manière exhaustive la façon dont Alertes Vols Bénin collecte, utilise, stocke et protège les données personnelles de ses utilisateurs, conformément au <strong>Règlement Général sur la Protection des Données (RGPD, Règlement UE 2016/679)</strong> et à la <strong>loi française Informatique et Libertés</strong> modifiée.</p>

        <p><strong>Responsable du traitement :</strong> Alertes Vols Bénin · <a href="mailto:alertesvolsbenin@gmail.com">alertesvolsbenin@gmail.com</a></p>

        <h3>Données collectées et bases légales</h3>
        <table>
          <tr>
            <th>Donnée</th>
            <th>Finalité du traitement</th>
            <th>Base légale (RGPD)</th>
            <th>Durée de conservation</th>
          </tr>
          <tr>
            <td><strong>Prénom et nom</strong></td>
            <td>Personnalisation de l'email d'alerte et des communications transactionnelles</td>
            <td>Exécution du contrat (art. 6.1.b)</td>
            <td>Durée de l'inscription + 12 mois après désinscription</td>
          </tr>
          <tr>
            <td><strong>Adresse email</strong></td>
            <td>Envoi de l'alerte, des emails transactionnels (confirmation, bienvenue) et des communications de service</td>
            <td>Exécution du contrat (art. 6.1.b)</td>
            <td>Durée de l'inscription + 12 mois après désinscription</td>
          </tr>
          <tr>
            <td><strong>Numéro de téléphone</strong> (format +33)</td>
            <td>Envoi du SMS d'alerte (uniquement si consentement SMS donné)</td>
            <td>Consentement explicite (art. 6.1.a)</td>
            <td>Durée de l'inscription + 12 mois après désinscription</td>
          </tr>
          <tr>
            <td><strong>Consentement SMS</strong> (oui/non)</td>
            <td>Preuve juridique du consentement à la réception de communications commerciales par SMS</td>
            <td>Obligation légale (art. 6.1.c)</td>
            <td>5 ans (obligation légale de conservation des preuves de consentement)</td>
          </tr>
          <tr>
            <td><strong>Date et heure d'inscription</strong></td>
            <td>Gestion du droit de rétractation (fenêtre de 14 jours), traitement des demandes de remboursement, prévention des fraudes</td>
            <td>Obligation légale (art. 6.1.c) et intérêt légitime (art. 6.1.f)</td>
            <td>5 ans (prescription légale des obligations commerciales)</td>
          </tr>
          <tr>
            <td><strong>Statut d'inscription</strong> (en attente, confirmé, désinscrit)</td>
            <td>Gestion de la liste d'envoi, contrôle de l'idempotence des notifications, audit interne</td>
            <td>Exécution du contrat (art. 6.1.b)</td>
            <td>Durée de l'inscription + 12 mois après désinscription</td>
          </tr>
        </table>

        <h3>Données NON collectées</h3>
        <div class="info-box">
          Alertes Vols Bénin ne collecte pas et n'a jamais accès aux données suivantes :
          <ul style="margin-top:10px;padding-left:20px;display:flex;flex-direction:column;gap:6px;font-size:14.5px">
            <li>Données de carte bancaire ou de compte bancaire (entièrement gérées par Stripe)</li>
            <li>Données de navigation et d'historique de navigation</li>
            <li>Localisation géographique précise</li>
            <li>Données biométriques ou de santé</li>
            <li>Données de mineurs (le service est exclusivement destiné aux personnes majeures)</li>
          </ul>
        </div>

        <h3>Sous-traitants et transferts de données</h3>
        <p>Alertes Vols Bénin fait appel aux sous-traitants suivants pour l'exécution du service. Chacun d'entre eux traite uniquement les données strictement nécessaires à sa mission et est lié par des engagements contractuels de confidentialité et de sécurité :</p>
        <table>
          <tr><th>Sous-traitant</th><th>Mission</th><th>Données transmises</th><th>Politique de confidentialité</th></tr>
          <tr>
            <td><strong>Cloudflare, Inc.</strong><br>(USA)</td>
            <td>Hébergement du Worker, base de données D1, réseau CDN, protection anti-DDoS, Cloudflare Turnstile (anti-bot)</td>
            <td>Ensemble des données d'inscription stockées en D1 ; adresses IP (logs transitoires uniquement)</td>
            <td><a href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noopener">cloudflare.com/privacypolicy</a></td>
          </tr>
          <tr>
            <td><strong>Resend</strong><br>(USA)</td>
            <td>Envoi des emails transactionnels (confirmation, bienvenue, alerte)</td>
            <td>Prénom, nom, adresse email</td>
            <td><a href="https://resend.com/privacy" target="_blank" rel="noopener">resend.com/privacy</a></td>
          </tr>
          <tr>
            <td><strong>Twilio, Inc.</strong><br>(USA)</td>
            <td>Envoi des SMS d'alerte</td>
            <td>Numéro de téléphone, message d'alerte</td>
            <td><a href="https://www.twilio.com/en-us/legal/privacy" target="_blank" rel="noopener">twilio.com/legal/privacy</a></td>
          </tr>
          <tr>
            <td><strong>Stripe, Inc.</strong><br>(USA)</td>
            <td>Traitement du paiement</td>
            <td>Données de paiement (gérées directement par Stripe, sans intermédiation d'Alertes Vols Bénin)</td>
            <td><a href="https://stripe.com/fr/privacy" target="_blank" rel="noopener">stripe.com/fr/privacy</a></td>
          </tr>
        </table>
        <p>Les sous-traitants basés aux États-Unis opèrent dans le cadre des mécanismes de transfert approuvés par la Commission européenne (clauses contractuelles types, dites Standard Contractual Clauses), garantissant un niveau de protection adéquat pour vos données personnelles.</p>

        <h3>Sécurité des données</h3>
        <p>Alertes Vols Bénin met en œuvre les mesures techniques et organisationnelles suivantes pour protéger vos données personnelles contre tout accès non autorisé, divulgation, altération ou destruction :</p>
        <ul>
          <li>Chiffrement des données en transit via HTTPS (TLS 1.3) sur l'ensemble du service</li>
          <li>Accès à la base de données restreint par token Bearer confidentiel</li>
          <li>Tokens d'inscription et de désinscription uniques générés par UUID cryptographique</li>
          <li>Infrastructure hébergée chez Cloudflare, certifiée SOC 2 Type II et ISO 27001</li>
          <li>Aucun mot de passe utilisateur stocké (le service ne nécessite pas de compte)</li>
          <li>Revue régulière des accès et des configurations de sécurité</li>
        </ul>

        <p>En cas de violation de données personnelles susceptible d'engendrer un risque élevé pour vos droits et libertés, Alertes Vols Bénin s'engage à vous en informer dans les meilleurs délais conformément à l'article 34 du RGPD, et à notifier l'incident à la CNIL dans les 72 heures conformément à l'article 33 du RGPD.</p>
      </div>
    </section>

    <!-- 7. VOS DROITS RGPD -->
    <section id="rgpd">
      <div class="section-header">
        <div class="section-num">7</div>
        <h2>Vos droits RGPD</h2>
      </div>
      <div class="prose">
        <p>Conformément au RGPD (articles 15 à 22) et à la loi Informatique et Libertés, vous disposez des droits suivants sur vos données personnelles. Pour exercer l'un de ces droits, envoyez un email à <a href="mailto:alertesvolsbenin@gmail.com">alertesvolsbenin@gmail.com</a> en précisant votre adresse email d'inscription. Une réponse vous sera apportée dans un délai maximum de <strong>30 jours calendaires</strong>.</p>

        <table>
          <tr><th>Droit</th><th>Ce que vous pouvez demander</th></tr>
          <tr>
            <td><strong>Droit d'accès</strong> (art. 15)</td>
            <td>Obtenir une copie de l'ensemble des données personnelles vous concernant que nous détenons, ainsi que des informations sur leur traitement.</td>
          </tr>
          <tr>
            <td><strong>Droit de rectification</strong> (art. 16)</td>
            <td>Faire corriger des données inexactes ou incomplètes vous concernant (ex : faute dans le prénom, adresse email incorrecte).</td>
          </tr>
          <tr>
            <td><strong>Droit à l'effacement</strong> (art. 17)</td>
            <td>Demander la suppression de vos données personnelles. Ce droit s'exerce sous réserve de nos obligations légales de conservation (notamment les 5 ans pour les preuves de consentement et les données de facturation).</td>
          </tr>
          <tr>
            <td><strong>Droit d'opposition</strong> (art. 21)</td>
            <td>Vous opposer au traitement de vos données personnelles pour un motif légitime lié à votre situation particulière.</td>
          </tr>
          <tr>
            <td><strong>Droit à la portabilité</strong> (art. 20)</td>
            <td>Recevoir vos données personnelles dans un format structuré, couramment utilisé et lisible par machine (JSON ou CSV), afin de les transmettre à un autre responsable de traitement.</td>
          </tr>
          <tr>
            <td><strong>Droit à la limitation</strong> (art. 18)</td>
            <td>Demander que le traitement de vos données soit temporairement suspendu, notamment pendant la durée de vérification d'une demande de rectification ou d'opposition.</td>
          </tr>
          <tr>
            <td><strong>Retrait du consentement</strong> (art. 7)</td>
            <td>Retirer à tout moment votre consentement à la réception de SMS. Ce retrait ne remet pas en cause la licéité du traitement effectué avant ce retrait.</td>
          </tr>
        </table>

        <div class="info-box">
          <strong>Réclamation auprès de la CNIL :</strong> Si vous estimez que vos droits ne sont pas respectés, vous avez le droit d'introduire une réclamation auprès de la Commission Nationale de l'Informatique et des Libertés (CNIL) via <a href="https://www.cnil.fr/fr/vous-souhaitez-contacter-la-cnil" target="_blank" rel="noopener">cnil.fr</a>, ou auprès de toute autre autorité de contrôle compétente dans votre pays de résidence.
        </div>
      </div>
    </section>

    <!-- 8. COOKIES -->
    <section id="cookies">
      <div class="section-header">
        <div class="section-num">8</div>
        <h2>Cookies &amp; traceurs</h2>
      </div>
      <div class="prose">
        <p>Alertes Vols Bénin adopte une politique de collecte de données minimaliste. Le site n'utilise <strong>aucun cookie de tracking, de mesure d'audience ou publicitaire</strong>.</p>

        <h3>Cookies techniques strictement nécessaires</h3>
        <p>Le site peut utiliser des cookies de session techniques strictement nécessaires au bon fonctionnement du service (par exemple, pour la protection anti-bot via Cloudflare Turnstile). Ces cookies ne nécessitent pas votre consentement préalable conformément à l'article 82 de la loi Informatique et Libertés, car ils sont indispensables au service expressément demandé.</p>

        <h3>Cloudflare Turnstile</h3>
        <p>Le formulaire d'inscription utilise <strong>Cloudflare Turnstile</strong>, un système de protection anti-bot qui vérifie de manière non intrusive que l'utilisateur est bien un être humain. Turnstile peut poser un cookie ou utiliser des techniques de stockage local à des fins de vérification d'intégrité uniquement. Aucune donnée personnelle identifiante n'est collectée par ce mécanisme à des fins de ciblage publicitaire.</p>

        <h3>Analyse d'audience — outil interne, sans tiers</h3>
        <p>Alertes Vols Bénin utilise un système d'analyse <strong>entièrement interne</strong>, hébergé sur notre propre infrastructure Cloudflare. Aucun outil tiers (Google Analytics, Matomo, Hotjar, Facebook Pixel, etc.) n'est utilisé.</p>
        <p><strong>Mécanisme d'anonymisation :</strong> l'adresse IP n'est jamais stockée. Elle est combinée avec la date du jour et un sel secret quotidien, puis transformée via SHA-256 en un identifiant de session non réversible qui se réinitialise chaque jour. Il est impossible de retrouver l'adresse IP à partir de cet identifiant.</p>
        <p><strong>Données enregistrées côté serveur :</strong> page visitée, type d'appareil (mobile/tablette/ordinateur), navigateur, pays d'origine (code ISO-2 fourni par Cloudflare, sans stockage d'IP), source de trafic (ex. : accès direct, Facebook, WhatsApp).</p>
        <p><strong>Script léger côté navigateur :</strong> un script JavaScript minimal s'exécute sur la page d'accueil uniquement. Il enregistre, sans cookie et sans identifiant persistant : la profondeur de défilement atteinte (25 %, 50 %, 75 %, 100 %), les clics sur les boutons d'inscription, et les clics sur les boutons de partage (WhatsApp, Facebook, Copier le lien). Ces données sont transmises à notre propre serveur via une requête HTTP vers <code>/track</code> et ne sont jamais envoyées à des tiers.</p>
        <p>Aucune donnée de navigation n'est transmise à des tiers à des fins commerciales ou publicitaires.</p>
      </div>
    </section>

    <!-- 9. DÉSINSCRIPTION -->
    <section id="resiliation">
      <div class="section-header">
        <div class="section-num">9</div>
        <h2>Désinscription</h2>
      </div>
      <div class="prose">
        <p>Vous pouvez vous désinscrire du service à tout moment et sans frais. La désinscription met fin immédiatement à votre inscription et supprime votre compte de la liste d'envoi active.</p>

        <h3>Comment vous désinscrire</h3>
        <ul>
          <li><strong>Par lien de désinscription :</strong> chaque email envoyé par Alertes Vols Bénin (email de bienvenue, email d'alerte) contient un lien de désinscription en bas du message. Un clic suffit ; aucune confirmation ni formulaire supplémentaire n'est requis.</li>
          <li><strong>Par email :</strong> envoyez un email à <a href="mailto:alertesvolsbenin@gmail.com">alertesvolsbenin@gmail.com</a> avec l'objet « Désinscription » en précisant votre adresse email d'inscription. La désinscription sera traitée dans les 72 heures.</li>
        </ul>

        <h3>Conséquences de la désinscription</h3>
        <ul>
          <li>Vous ne recevrez plus aucune communication de la part d'Alertes Vols Bénin.</li>
          <li>Vos données personnelles sont conservées selon les durées légales décrites à l'article 6, puis supprimées.</li>
          <li>Si l'alerte n'avait pas encore été envoyée au moment de votre désinscription, et que celle-ci intervient après le délai de rétractation légal de 14 jours, aucun remboursement n'est dû au titre de la désinscription volontaire (sauf application des cas de remboursement décrits à l'article 4).</li>
          <li>Si vous souhaitez à nouveau être alerté lors d'un prochain cycle d'ouverture, une nouvelle inscription payante sera nécessaire.</li>
        </ul>

        <h3>Résiliation à l'initiative d'Alertes Vols Bénin</h3>
        <p>Alertes Vols Bénin se réserve le droit de résilier une inscription en cas de : fraude avérée, utilisation abusive du service (tentatives d'inscription multiples, fourniture de données frauduleuses), ou demande expresse d'une autorité compétente. Dans ce cas, l'abonné en est informé par email et remboursé intégralement si l'alerte n'a pas encore été envoyée.</p>
      </div>
    </section>

    <!-- 10. DROIT APPLICABLE -->
    <section id="droit">
      <div class="section-header">
        <div class="section-num">10</div>
        <h2>Droit applicable &amp; litiges</h2>
      </div>
      <div class="prose">
        <p>Les présentes conditions générales sont rédigées en langue française et soumises au <strong>droit français</strong>. En cas de contradiction entre une version traduite et la version française, la version française prévaut.</p>

        <h3>Résolution amiable</h3>
        <p>En cas de litige relatif à l'interprétation ou à l'exécution des présentes conditions, une solution amiable sera systématiquement recherchée en priorité. Nous vous invitons à nous contacter en premier lieu par email à <a href="mailto:alertesvolsbenin@gmail.com">alertesvolsbenin@gmail.com</a>. Nous nous engageons à répondre dans un délai de 72 heures ouvrées et à tout mettre en œuvre pour trouver une issue satisfaisante.</p>

        <h3>Médiation de la consommation</h3>
        <p>Conformément aux articles L.616-1 et R.616-1 du Code de la consommation, en cas d'échec de la résolution amiable, vous pouvez avoir recours gratuitement à un médiateur de la consommation. Vous pouvez également utiliser la plateforme européenne de résolution en ligne des litiges (RLL) accessible à l'adresse : <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener">ec.europa.eu/consumers/odr</a>.</p>

        <h3>Juridiction compétente</h3>
        <p>À défaut de résolution amiable ou par médiation, tout litige sera soumis aux juridictions françaises compétentes. Pour les litiges de consommation, la juridiction compétente est celle du lieu de domicile du consommateur ou, au choix de ce dernier, celle du lieu d'exécution de la prestation de service.</p>

        <h3>Modification des conditions</h3>
        <p>Alertes Vols Bénin se réserve le droit de modifier les présentes conditions à tout moment. Les modifications entrent en vigueur dès leur publication sur le site. Les abonnés actifs sont informés par email de toute modification substantielle. La date de dernière mise à jour est indiquée en haut de la page. L'utilisation continue du service après notification des modifications vaut acceptation de celles-ci.</p>

        <div class="highlight">
          <strong>Pour toute question :</strong><br>
          Email : <a href="mailto:alertesvolsbenin@gmail.com">alertesvolsbenin@gmail.com</a><br>
          Site : <a href="https://alertesvolsbenin.com">alertesvolsbenin.com</a><br>
          Réponse garantie sous 72 heures ouvrées.
        </div>
      </div>
    </section>

  </main>
</div>

<div class="flag-bar"><div></div><div></div><div></div></div>

<script>
  // Highlight active section in sidebar on scroll
  const sections = document.querySelectorAll('section[id]');
  const links = document.querySelectorAll('.sidebar a');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        links.forEach(l => l.classList.remove('active'));
        const link = document.querySelector('.sidebar a[href="#' + e.target.id + '"]');
        if (link) link.classList.add('active');
      }
    });
  }, { rootMargin: '-20% 0px -70% 0px' });
  sections.forEach(s => obs.observe(s));
</script>

</body>
</html>`;
}

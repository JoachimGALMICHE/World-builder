/* ============================================================
   CODEX — données partagées (schémas, stockage, CRUD)
   Chargé par toutes les pages avant shared/app.js
   ============================================================ */

/* Les données sont maintenant stockées dans Firestore (voir shared/firebase-init.js) */

const COLOR_MAP = {
  gold:     { text: 'text-amber-700',   border: 'border-amber-200',   ring: 'focus:border-amber-400',   bgSoft: 'bg-amber-50',   bgActive: 'bg-amber-100/70',   left: 'border-amber-400' },
  jade:     { text: 'text-emerald-700', border: 'border-emerald-200', ring: 'focus:border-emerald-400', bgSoft: 'bg-emerald-50', bgActive: 'bg-emerald-100/70', left: 'border-emerald-400' },
  silver:   { text: 'text-slate-600',   border: 'border-slate-200',   ring: 'focus:border-slate-400',   bgSoft: 'bg-slate-50',   bgActive: 'bg-slate-100/70',   left: 'border-slate-300' },
  garnet:   { text: 'text-rose-800',    border: 'border-rose-200',    ring: 'focus:border-rose-400',    bgSoft: 'bg-rose-50',    bgActive: 'bg-rose-100/70',    left: 'border-rose-400' },
  ink:      { text: 'text-stone-700',   border: 'border-stone-300',   ring: 'focus:border-stone-500',   bgSoft: 'bg-stone-100',  bgActive: 'bg-stone-200/70',   left: 'border-stone-400' },
  bronze:   { text: 'text-orange-800',  border: 'border-orange-200',  ring: 'focus:border-orange-400',  bgSoft: 'bg-orange-50',  bgActive: 'bg-orange-100/70',  left: 'border-orange-400' },
};

const RELIEF_TYPES = ['Montagnes', 'Chaînes montagneuses', 'Volcans', 'Plaines', 'Déserts', 'Forêts', 'Marécages', 'Vallées', 'Falaises', 'Grottes', 'Cavernes', 'Plateaux', 'Glaciers'];
const EAU_TYPES = ['Océans', 'Mers', 'Lacs', 'Fleuves', 'Rivières', 'Sources', 'Cascades', 'Marais', 'Baies', 'Détroits'];
const LIEU_TYPES = ['Ville', 'Village', 'Capitale', 'Forteresse', 'Ruines', 'Temple', 'Donjon', 'Sanctuaire', 'Monument', 'Port', 'Mine', 'Château', 'Site naturel', 'Lieu surnaturel'];
const VARIANTE_TYPES = ['Individu', 'Jeune', 'Adulte', 'Ancien', 'Alpha', 'Variante régionale', 'Variante magique', 'Mutation', 'Forme légendaire'];
const MAGIE_TYPES = ['Élémentaire', 'Spirituelle', 'Astrale', 'Temporelle', 'Mentale', 'Corporelle', 'Naturelle', 'Divine', 'Sombre'];
const UTILISATEUR_TYPES = ['Mage', 'Sorcier', 'Prêtre', 'Chaman', 'Druide', 'Invocateur'];
const ORGANISATION_TYPES = ['Royaume', 'Empire', 'République', 'Cité-État', 'Tribu', 'Clan', 'Guilde', 'Ordre', 'Religion', 'Secte', 'Corporation', 'Résistance', 'Organisation criminelle', 'Académie'];
const RELATION_TYPES = ['Alliance', 'Neutralité', 'Commerce', 'Rivalité', 'Guerre', 'Vassalité', 'Haine', 'Secret', 'Dette', 'Trahison'];
const EVENT_TYPES = ['Guerre', 'Bataille', 'Naissance', 'Mort', 'Catastrophe', 'Découverte', 'Fondation', 'Chute', 'Révolution', 'Traité', 'Migration', 'Apparition surnaturelle', 'Extinction'];
const STATUT_TYPES = ['Vivant', 'Mort', 'Disparu', 'Inconnu'];

const EPOQUE_FIELDS = [
  { key: 'date_debut', label: 'Date de début' }, { key: 'date_fin', label: 'Date de fin' },
  { key: 'description', label: 'Description', area: true }, { key: 'evenements_majeurs', label: 'Événements majeurs', area: true },
  { key: 'civilisations', label: 'Civilisations dominantes' }, { key: 'technologies', label: 'Technologies' },
  { key: 'magie', label: 'Magie' }, { key: 'factions', label: 'Factions' },
];
const EVENEMENT_FIELDS = [
  { key: 'date', label: 'Date' }, { key: 'type', label: 'Type', select: EVENT_TYPES }, { key: 'lieu', label: 'Lieu' },
  { key: 'participants', label: 'Participants' }, { key: 'cause', label: 'Cause', area: true }, { key: 'deroulement', label: 'Déroulement', area: true },
  { key: 'consequences', label: 'Conséquences', area: true }, { key: 'personnages_impliques', label: 'Personnages impliqués' }, { key: 'factions_impliquees', label: 'Factions impliquées' },
];
const PERSONNAGE_HISTORIQUE_FIELDS = [
  { key: 'naissance', label: 'Naissance' }, { key: 'mort', label: 'Mort' }, { key: 'faction', label: 'Faction' }, { key: 'fonction', label: 'Fonction' },
  { key: 'actions', label: 'Actions', area: true }, { key: 'relations', label: 'Relations', area: true },
  { key: 'evenements_associes', label: 'Événements associés' }, { key: 'heritage', label: 'Héritage', area: true },
];
const PERSONNAGE_FIELDS = [
  { key: 'prenom', label: 'Prénom', section: 'Identité' }, { key: 'surnom', label: 'Surnom', section: 'Identité' }, { key: 'titre', label: 'Titre', section: 'Identité' },
  { key: 'age', label: 'Âge', section: 'Identité' }, { key: 'date_naissance', label: 'Date de naissance', section: 'Identité' }, { key: 'date_mort', label: 'Date de mort', section: 'Identité' },
  { key: 'sexe', label: 'Sexe', section: 'Identité' }, { key: 'race', label: 'Race / espèce', section: 'Identité' }, { key: 'sous_espece', label: 'Sous-espèce', section: 'Identité' },
  { key: 'nationalite', label: 'Nationalité', section: 'Identité' }, { key: 'origine', label: 'Origine', section: 'Identité' }, { key: 'statut', label: 'Statut', select: STATUT_TYPES, section: 'Identité' },
  { key: 'portrait', label: 'Portrait', image: true, section: '🧬 Apparence' }, { key: 'taille_app', label: 'Taille', section: '🧬 Apparence' }, { key: 'poids', label: 'Poids', section: '🧬 Apparence' },
  { key: 'corpulence', label: 'Corpulence', section: '🧬 Apparence' }, { key: 'couleur_yeux', label: 'Couleur des yeux', section: '🧬 Apparence' }, { key: 'couleur_cheveux', label: 'Couleur des cheveux', section: '🧬 Apparence' },
  { key: 'peau', label: 'Peau / fourrure / écailles', section: '🧬 Apparence' }, { key: 'traits_particuliers', label: 'Traits particuliers', area: true, section: '🧬 Apparence' },
  { key: 'cicatrices', label: 'Cicatrices', section: '🧬 Apparence' }, { key: 'tatouages', label: 'Tatouages', section: '🧬 Apparence' }, { key: 'vetements', label: 'Vêtements', section: '🧬 Apparence' },
  { key: 'armure', label: 'Armure', section: '🧬 Apparence' }, { key: 'accessoires', label: 'Accessoires', section: '🧬 Apparence' }, { key: 'apparence_alternative', label: 'Apparence alternative', area: true, section: '🧬 Apparence' },
  { key: 'personnalite', label: 'Personnalité', area: true, section: '🧠 Personnalité' }, { key: 'temperament', label: 'Tempérament', section: '🧠 Personnalité' },
  { key: 'qualites', label: 'Qualités', section: '🧠 Personnalité' }, { key: 'defauts', label: 'Défauts', section: '🧠 Personnalité' }, { key: 'peurs', label: 'Peurs', section: '🧠 Personnalité' },
  { key: 'desirs', label: 'Désirs', section: '🧠 Personnalité' }, { key: 'motivations', label: 'Motivations', area: true, section: '🧠 Personnalité' }, { key: 'valeurs', label: 'Valeurs', section: '🧠 Personnalité' },
  { key: 'croyances', label: 'Croyances', section: '🧠 Personnalité' }, { key: 'secrets', label: 'Secrets', area: true, section: '🧠 Personnalité' }, { key: 'habitudes', label: 'Habitudes', section: '🧠 Personnalité' },
  { key: 'manierismes', label: 'Maniérismes', section: '🧠 Personnalité' }, { key: 'phobies', label: 'Phobies', section: '🧠 Personnalité' },
  { key: 'aime', label: "Ce qu'il aime", section: '🧠 Personnalité' }, { key: 'deteste', label: "Ce qu'il déteste", section: '🧠 Personnalité' },
  { key: 'resume', label: 'Résumé', area: true, section: '📖 Histoire' }, { key: 'enfance', label: 'Enfance', area: true, section: '📖 Histoire' },
  { key: 'famille_histoire', label: 'Famille', section: '📖 Histoire' }, { key: 'education', label: 'Éducation', section: '📖 Histoire' },
  { key: 'evenements_importants', label: 'Événements importants', area: true, section: '📖 Histoire' }, { key: 'traumatismes', label: 'Traumatismes', area: true, section: '📖 Histoire' },
  { key: 'rencontres_importantes', label: 'Rencontres importantes', section: '📖 Histoire' }, { key: 'accomplissements', label: 'Accomplissements', section: '📖 Histoire' },
  { key: 'echecs', label: 'Échecs', section: '📖 Histoire' }, { key: 'situation_actuelle', label: 'Situation actuelle', section: '📖 Histoire' },
  { key: 'destin', label: 'Destin', section: '📖 Histoire' }, { key: 'heritage_perso', label: 'Héritage', area: true, section: '📖 Histoire' },
  { key: 'classe_profession', label: 'Classe / profession', section: '⚔️ Capacités' }, { key: 'niveau', label: 'Niveau', section: '⚔️ Capacités' },
  { key: 'competences', label: 'Compétences', area: true, section: '⚔️ Capacités' }, { key: 'forces', label: 'Forces', section: '⚔️ Capacités' }, { key: 'faiblesses', label: 'Faiblesses', section: '⚔️ Capacités' },
  { key: 'armes', label: 'Armes', section: '⚔️ Capacités' }, { key: 'style_combat', label: 'Style de combat', section: '⚔️ Capacités' }, { key: 'pouvoirs', label: 'Pouvoirs', section: '⚔️ Capacités' },
  { key: 'magies_maitrisees', label: 'Magies maîtrisées', section: '⚔️ Capacités' }, { key: 'techniques_speciales', label: 'Techniques spéciales', section: '⚔️ Capacités' }, { key: 'equipement', label: 'Équipement', section: '⚔️ Capacités' },
  { key: 'affinites', label: 'Affinités', section: '✨ Magie personnelle' }, { key: 'type_magie_perso', label: 'Type de magie', section: '✨ Magie personnelle' },
  { key: 'pouvoir_principal', label: 'Pouvoir principal', section: '✨ Magie personnelle' }, { key: 'pouvoirs_secondaires', label: 'Pouvoirs secondaires', section: '✨ Magie personnelle' },
  { key: 'limites_magie', label: 'Limites', area: true, section: '✨ Magie personnelle' }, { key: 'cout_magie', label: 'Coût', section: '✨ Magie personnelle' },
  { key: 'risques_magie', label: 'Risques', section: '✨ Magie personnelle' }, { key: 'sorts_connus', label: 'Sorts connus', section: '✨ Magie personnelle' }, { key: 'artefacts_lies', label: 'Artefacts liés', section: '✨ Magie personnelle' },
  { key: 'famille_rel', label: 'Famille', section: '🏛️ Relations' }, { key: 'amis', label: 'Amis', section: '🏛️ Relations' }, { key: 'allies_perso', label: 'Alliés', section: '🏛️ Relations' },
  { key: 'rivaux', label: 'Rivaux', section: '🏛️ Relations' }, { key: 'ennemis_perso', label: 'Ennemis', section: '🏛️ Relations' }, { key: 'mentor', label: 'Mentor', section: '🏛️ Relations' },
  { key: 'eleves', label: 'Élèves', section: '🏛️ Relations' }, { key: 'amour', label: 'Amour', section: '🏛️ Relations' }, { key: 'relations_politiques', label: 'Relations politiques', section: '🏛️ Relations' },
  { key: 'relations_factions', label: 'Relations avec des factions', section: '🏛️ Relations' }, { key: 'relations_creatures', label: 'Relations avec des créatures', section: '🏛️ Relations' },
  { key: 'faction_appartenance', label: 'Faction', section: '🌍 Appartenance' }, { key: 'organisation', label: 'Organisation', section: '🌍 Appartenance' }, { key: 'royaume', label: 'Royaume', section: '🌍 Appartenance' },
  { key: 'ville', label: 'Ville', section: '🌍 Appartenance' }, { key: 'clan', label: 'Clan', section: '🌍 Appartenance' }, { key: 'religion_perso', label: 'Religion', section: '🌍 Appartenance' },
  { key: 'profession', label: 'Profession', section: '🌍 Appartenance' }, { key: 'grade', label: 'Grade', section: '🌍 Appartenance' }, { key: 'fonction', label: 'Fonction', section: '🌍 Appartenance' },
  { key: 'reputation', label: 'Réputation', section: '🌍 Appartenance' },
];
const POLITIQUE_FIELDS = [
  { key: 'type', label: 'Type', select: ORGANISATION_TYPES, section: 'Faction' }, { key: 'ideologie', label: 'Idéologie', area: true, section: 'Faction' },
  { key: 'objectifs', label: 'Objectifs', area: true, section: 'Faction' }, { key: 'dirigeant', label: 'Dirigeant', section: 'Faction' }, { key: 'membres', label: 'Membres', section: 'Faction' },
  { key: 'territoire', label: 'Territoire', section: 'Faction' }, { key: 'capitale_qg', label: 'Capitale / QG', section: 'Faction' }, { key: 'ressources', label: 'Ressources', section: 'Faction' },
  { key: 'armee', label: 'Armée', section: 'Faction' }, { key: 'economie', label: 'Économie', section: 'Faction' }, { key: 'religion', label: 'Religion', section: 'Faction' },
  { key: 'technologie', label: 'Technologie', section: 'Faction' }, { key: 'magie', label: 'Magie', section: 'Faction' }, { key: 'allies', label: 'Alliés', section: 'Faction' },
  { key: 'ennemis', label: 'Ennemis', section: 'Faction' }, { key: 'relations_diplomatiques', label: 'Relations diplomatiques', area: true, section: 'Faction' },
  { key: 'gouvernement', label: 'Gouvernement', section: 'Politique interne' }, { key: 'lois', label: 'Lois', area: true, section: 'Politique interne' },
  { key: 'classes_sociales', label: 'Classes sociales', section: 'Politique interne' }, { key: 'droits', label: 'Droits', area: true, section: 'Politique interne' },
  { key: 'crimes', label: 'Crimes', area: true, section: 'Politique interne' }, { key: 'punitions', label: 'Punitions', area: true, section: 'Politique interne' },
  { key: 'succession', label: 'Succession', section: 'Politique interne' }, { key: 'elections', label: 'Élections', section: 'Politique interne' }, { key: 'corruption', label: 'Corruption', section: 'Politique interne' },
  { key: 'revoltes', label: 'Révoltes', section: 'Politique interne' }, { key: 'conflits_internes', label: 'Conflits internes', area: true, section: 'Politique interne' },
];
const SYSTEME_FIELDS = [
  { key: 'origine', label: 'Origine' }, { key: 'source', label: 'Source de la magie' }, { key: 'nature_energie', label: "Nature de l'énergie" },
  { key: 'lois', label: 'Lois', area: true }, { key: 'limites', label: 'Limites', area: true }, { key: 'cout', label: 'Coût' },
  { key: 'risques', label: 'Risques', area: true }, { key: 'consequences', label: 'Conséquences', area: true },
];
const ECOLE_FIELDS = [
  { key: 'domaine', label: 'Domaine', select: MAGIE_TYPES }, { key: 'principes', label: 'Principes', area: true }, { key: 'sorts', label: 'Sorts' },
  { key: 'utilisateurs', label: 'Utilisateurs', select: UTILISATEUR_TYPES }, { key: 'difficulte', label: 'Difficulté' },
  { key: 'limites', label: 'Limites', area: true }, { key: 'contre_magies', label: 'Contre-magies', area: true },
];
const SORT_FIELDS = [
  { key: 'niveau', label: 'Niveau' }, { key: 'cout', label: 'Coût' }, { key: 'temps_incantation', label: "Temps d'incantation" }, { key: 'portee', label: 'Portée' },
  { key: 'duree', label: 'Durée' }, { key: 'effet', label: 'Effet', area: true }, { key: 'conditions', label: 'Conditions', area: true }, { key: 'risques', label: 'Risques', area: true },
  { key: 'composants', label: 'Composants' }, { key: 'contre_sort', label: 'Contre-sort' }, { key: 'utilisateurs', label: 'Utilisateurs', select: UTILISATEUR_TYPES },
];
const ARTEFACT_FIELDS = [
  { key: 'type', label: 'Type' }, { key: 'createur', label: 'Créateur' }, { key: 'pouvoir', label: 'Pouvoir', area: true }, { key: 'origine', label: 'Origine' },
  { key: 'histoire', label: 'Histoire', area: true }, { key: 'malediction', label: 'Malédiction', area: true }, { key: 'proprietaire_actuel', label: 'Propriétaire actuel' }, { key: 'localisation', label: 'Localisation' },
];
const ENTITE_FIELDS = [
  { key: 'nature', label: 'Nature' }, { key: 'origine', label: 'Origine' }, { key: 'pouvoir', label: 'Pouvoir', area: true }, { key: 'domaine', label: 'Domaine' },
  { key: 'apparence', label: 'Apparence', area: true }, { key: 'personnalite', label: 'Personnalité', area: true }, { key: 'relations', label: 'Relations', area: true },
  { key: 'culte', label: 'Culte' }, { key: 'faiblesses', label: 'Faiblesses', area: true },
];
const CREATURE_FIELDS = [
  { key: 'espece', label: 'Espèce', section: 'Créature' }, { key: 'sous_espece', label: 'Sous-espèce', section: 'Créature' }, { key: 'classification', label: 'Classification', section: 'Créature' },
  { key: 'taille', label: 'Taille', section: 'Créature' }, { key: 'poids', label: 'Poids', section: 'Créature' }, { key: 'apparence', label: 'Apparence', area: true, section: 'Créature' },
  { key: 'habitat', label: 'Habitat', section: 'Créature' }, { key: 'regime_alimentaire', label: 'Régime alimentaire', section: 'Créature' }, { key: 'comportement', label: 'Comportement', area: true, section: 'Créature' },
  { key: 'intelligence', label: 'Intelligence', section: 'Créature' }, { key: 'cycle_de_vie', label: 'Cycle de vie', section: 'Créature' }, { key: 'reproduction', label: 'Reproduction', section: 'Créature' },
  { key: 'esperance_de_vie', label: 'Espérance de vie', section: 'Créature' }, { key: 'predateurs', label: 'Prédateurs', section: 'Créature' }, { key: 'proies', label: 'Proies', section: 'Créature' },
  { key: 'relations_peuples', label: 'Relations avec les peuples', area: true, section: 'Créature' },
  { key: 'capacites_physiques', label: 'Capacités physiques', area: true, section: 'Capacités' }, { key: 'capacites_magiques', label: 'Capacités magiques', area: true, section: 'Capacités' },
  { key: 'pouvoirs_particuliers', label: 'Pouvoirs particuliers', area: true, section: 'Capacités' }, { key: 'resistances', label: 'Résistances', section: 'Capacités' }, { key: 'faiblesses', label: 'Faiblesses', section: 'Capacités' },
  { key: 'attaques', label: 'Attaques', area: true, section: 'Capacités' }, { key: 'defenses', label: 'Défenses', area: true, section: 'Capacités' }, { key: 'capacites_passives', label: 'Capacités passives', area: true, section: 'Capacités' },
  { key: 'territoire', label: 'Territoire', section: 'Écologie' }, { key: 'chaine_alimentaire', label: 'Chaîne alimentaire', section: 'Écologie' }, { key: 'migration', label: 'Migration', section: 'Écologie' },
  { key: 'activite', label: 'Activité diurne/nocturne', section: 'Écologie' }, { key: 'relations_especes', label: "Relations avec d'autres espèces", area: true, section: 'Écologie' },
  { key: 'impact_environnement', label: "Impact sur l'environnement", area: true, section: 'Écologie' },
  { key: 'legendes', label: 'Légendes', area: true, section: 'Culture' }, { key: 'symbolisme', label: 'Symbolisme', section: 'Culture' }, { key: 'utilisation_peuples', label: 'Utilisation par les peuples', area: true, section: 'Culture' },
  { key: 'domestication', label: 'Domestication', section: 'Culture' }, { key: 'chasse', label: 'Chasse', section: 'Culture' }, { key: 'elevage', label: 'Élevage', section: 'Culture' },
  { key: 'culte', label: 'Culte', section: 'Culture' }, { key: 'peur_superstition', label: 'Peur / superstition', section: 'Culture' }, { key: 'importance_economique', label: 'Importance économique', section: 'Culture' },
];
const VARIANTE_FIELDS = [
  { key: 'type', label: 'Type', select: VARIANTE_TYPES }, { key: 'description', label: 'Description', area: true }, { key: 'image', label: 'Image', image: true },
];

const GEO_LEVELS = {
  monde: { label: 'Monde', icon: 'globe', childTypes: ['continent'], fields: [
    { key: 'description', label: 'Description générale', area: true }, { key: 'taille', label: 'Taille' }, { key: 'forme', label: 'Forme' },
    { key: 'continents', label: 'Continents' }, { key: 'oceans', label: 'Océans / mers' }, { key: 'equateur', label: 'Équateur' }, { key: 'poles', label: 'Pôles' },
    { key: 'climat', label: 'Climat global' }, { key: 'surnaturel', label: 'Particularités surnaturelles', area: true }, { key: 'astres', label: 'Astres / lunes / soleil' },
    { key: 'plans', label: 'Plans ou dimensions' }, { key: 'connaissance', label: 'Niveau de connaissance du monde' },
  ]},
  continent: { label: 'Continent', icon: 'map', childTypes: ['region'], fields: [
    { key: 'description', label: 'Description', area: true }, { key: 'taille', label: 'Taille' }, { key: 'position', label: 'Position' }, { key: 'climat', label: 'Climat' },
    { key: 'relief_general', label: 'Relief général' }, { key: 'biomes', label: 'Biomes' }, { key: 'population', label: 'Population' }, { key: 'civilisations', label: 'Civilisations' },
    { key: 'factions', label: 'Factions' }, { key: 'histoire', label: 'Histoire', area: true }, { key: 'ressources', label: 'Ressources' }, { key: 'menaces', label: 'Menaces' },
  ]},
  region: { label: 'Région', icon: 'layers', childTypes: ['relief', 'eau', 'lieu'], fields: [
    { key: 'type', label: 'Type' }, { key: 'climat', label: 'Climat' }, { key: 'biome', label: 'Biome' }, { key: 'relief', label: 'Relief' }, { key: 'faune', label: 'Faune' },
    { key: 'flore', label: 'Flore' }, { key: 'ressources', label: 'Ressources' }, { key: 'population', label: 'Population' }, { key: 'villes', label: 'Villes' },
    { key: 'lieux_remarquables', label: 'Lieux remarquables' }, { key: 'dangers', label: 'Dangers' }, { key: 'factions_presentes', label: 'Factions présentes' },
  ]},
  relief: { label: 'Relief', icon: 'mountain', childTypes: [], fields: [
    { key: 'type', label: 'Type', select: RELIEF_TYPES }, { key: 'emplacement', label: 'Emplacement' }, { key: 'description', label: 'Description', area: true },
    { key: 'ressources', label: 'Ressources' }, { key: 'dangers', label: 'Dangers' },
  ]},
  eau: { label: 'Eau', icon: 'waves', childTypes: [], fields: [
    { key: 'type', label: 'Type', select: EAU_TYPES }, { key: 'emplacement', label: 'Emplacement' }, { key: 'description', label: 'Description', area: true },
    { key: 'ressources', label: 'Ressources' }, { key: 'dangers', label: 'Dangers' },
  ]},
  lieu: { label: 'Lieu', icon: 'map-pin', childTypes: [], fields: [
    { key: 'type', label: 'Type', select: LIEU_TYPES }, { key: 'emplacement', label: 'Emplacement' }, { key: 'description', label: 'Description', area: true },
    { key: 'population', label: 'Population' }, { key: 'faction', label: 'Faction' }, { key: 'histoire', label: 'Histoire', area: true },
    { key: 'ressources', label: 'Ressources' }, { key: 'dangers', label: 'Dangers' },
  ]},
  creature: { label: 'Créature', icon: 'paw-print', childTypes: ['variante'], fields: CREATURE_FIELDS },
  variante: { label: 'Variante', icon: 'shuffle', childTypes: [], fields: VARIANTE_FIELDS },
  systeme: { label: 'Système magique', icon: 'sparkles', childTypes: ['ecole', 'artefact', 'entite'], fields: SYSTEME_FIELDS },
  ecole: { label: 'École', icon: 'book-open', childTypes: ['sort'], fields: ECOLE_FIELDS },
  sort: { label: 'Sort', icon: 'wand-2', childTypes: [], fields: SORT_FIELDS },
  artefact: { label: 'Artefact', icon: 'gem', childTypes: [], fields: ARTEFACT_FIELDS },
  entite: { label: 'Entité', icon: 'eye', childTypes: [], fields: ENTITE_FIELDS },
  epoque: { label: 'Époque', icon: 'clock', childTypes: ['evenement', 'personnage_historique'], fields: EPOQUE_FIELDS },
  evenement: { label: 'Événement', icon: 'flag', childTypes: [], fields: EVENEMENT_FIELDS },
  personnage_historique: { label: 'Personnage historique', icon: 'users', childTypes: [], fields: PERSONNAGE_HISTORIQUE_FIELDS },
};
const GEO_ADD_LABEL = { monde: 'Monde', continent: 'Continent', region: 'Région', relief: 'Relief', eau: 'Eau', lieu: 'Lieu', creature: 'Créature', variante: 'Variante', systeme: 'Système magique', ecole: 'École', sort: 'Sort', artefact: 'Artefact', entite: 'Entité', epoque: 'Époque', evenement: 'Événement', personnage_historique: 'Personnage historique' };
const GEO_DEFAULT_NAME = { monde: 'Nouveau monde', continent: 'Nouveau continent', region: 'Nouvelle région', relief: 'Nouveau relief', eau: "Nouvelle étendue d'eau", lieu: 'Nouveau lieu', creature: 'Nouvelle créature', variante: 'Nouvelle variante', systeme: 'Nouveau système magique', ecole: 'Nouvelle école', sort: 'Nouveau sort', artefact: 'Nouvel artefact', entite: 'Nouvelle entité', epoque: 'Nouvelle époque', evenement: 'Nouvel événement', personnage_historique: 'Nouveau personnage historique' };
const HIERARCHY_ROOT = { monde: 'monde', bestiaire: 'creature', magie: 'systeme', chronologie: 'epoque' };
const HIERARCHY_ROOT_LABEL = { monde: 'Mondes', bestiaire: 'Créatures', magie: 'Systèmes magiques', chronologie: 'Époques' };

const CATEGORIES = [
  { key: 'monde', label: 'Monde & Géographie', page: 'monde.html', icon: 'map', color: 'gold', fields: [] },
  { key: 'bestiaire', label: 'Bestiaire', page: 'bestiaire.html', icon: 'paw-print', color: 'jade', fields: [] },
  { key: 'magie', label: 'Magie', page: 'magie.html', icon: 'sparkles', color: 'silver', fields: [] },
  { key: 'politique', label: 'Politique & Factions', page: 'politique.html', icon: 'crown', color: 'garnet', fields: POLITIQUE_FIELDS },
  { key: 'chronologie', label: 'Chronologie', page: 'chronologie.html', icon: 'clock', color: 'ink', fields: [] },
  { key: 'personnages', label: 'Personnages', page: 'personnages.html', icon: 'users', color: 'bronze', fields: PERSONNAGE_FIELDS },
];

function catOf(key) { return CATEGORIES.find((c) => c.key === key); }
function uid() { return Math.random().toString(36).slice(2, 10); }

function seedEntities() {
  const mondeId = uid(), continentId = uid(), regionId = uid(), reliefId = uid(), eauId = uid(), lieuId = uid();
  const kaela = uid(), conseil = uid(), contrebandiers = uid();
  const epoqueFondations = uid(), fondationSylenor = uid(), epoqueCendres = uid(), incendie = uid(), amaraFenn = uid();
  const dracaine = uid(), dracaineAlpha = uid(), chant = uid(), ecoleId = uid(), sortId = uid();

  return [
    { id: mondeId, category: 'monde', geoLevel: 'monde', parentId: null, name: 'Aurelia', fields: {
      description: "Un monde baigné d'une lumière dorée presque permanente, où la magie coule dans les fleuves autant que dans les veines des vivants.",
      taille: 'Comparable à la Terre', forme: 'Sphérique', continents: 'Sylvarande, et au moins deux continents inexplorés',
      oceans: "L'Océan Céruléen borde toute la côte ouest de Sylvarande", equateur: 'Traverse le sud de Sylvarande, climat tropical humide',
      poles: 'Glaces éternelles, inhabitées, légendes de géants de givre', climat: 'Tempéré à tropical selon la latitude',
      surnaturel: 'La magie est plus forte près des points de résonance, dont la Baie des Marées', astres: 'Une lune unique, Nyx, dont les phases influencent le Chant des Marées',
      plans: 'Un Plan des Échos, accessible uniquement par la magie sonore', connaissance: 'La majorité des peuples ne connaît que leur propre continent',
    }, links: [], createdAt: Date.now() },
    { id: continentId, category: 'monde', geoLevel: 'continent', parentId: mondeId, name: 'Sylvarande', fields: {
      description: 'Terre de forêts anciennes et de côtes découpées, berceau des premières cités-marchandes.', taille: '≈ 3 millions de km²',
      position: "Hémisphère sud, bordant l'Océan Céruléen", climat: "Tempéré humide sur la côte, aride à l'intérieur",
      relief_general: 'Côtes escarpées, plaines centrales, chaîne montagneuse au nord', biomes: 'Forêt tempérée, littoral, plaines',
      population: "≈ 2 millions d'habitants", civilisations: 'Cités-marchandes humaines, clans elfiques des forêts intérieures',
      factions: 'Conseil des Marées, Clans de la Canopée', histoire: "Colonisé par vagues successives de marins venus du nord après l'effondrement du premier empire.",
      ressources: 'Bois précieux, cristal, poisson', menaces: 'Dracaines des brumes, pirates de la Passe Grise',
    }, links: [], createdAt: Date.now() },
    { id: regionId, category: 'monde', geoLevel: 'region', parentId: continentId, name: 'Côte de Sylenor', fields: {
      type: 'Région côtière', climat: 'Tempéré, brumes fréquentes', biome: 'Littoral et falaises', relief: 'Falaises de calcaire dominant une baie profonde',
      faune: 'Dracaines des brumes, oiseaux marins', flore: 'Bruyère côtière, pins tordus par le vent', ressources: 'Pêche, sel, cristal',
      population: '≈ 45 000 habitants', villes: 'Cité de Sylenor', lieux_remarquables: 'Falaises de Calcaire, Baie des Marées',
      dangers: 'Éboulements, dracaines, tensions politiques', factions_presentes: 'Conseil des Marées',
    }, links: [], createdAt: Date.now() },
    { id: reliefId, category: 'monde', geoLevel: 'relief', parentId: regionId, name: 'Falaises de Calcaire', fields: {
      type: 'Falaises', emplacement: 'Bordant la Baie des Marées, au nord de la Cité de Sylenor', description: 'Parois blanches où nichent les dracaines des brumes.',
      ressources: 'Calcaire, nids de dracaines (plumes recherchées)', dangers: 'Éboulements, prédateurs ailés',
    }, links: [dracaine], createdAt: Date.now() },
    { id: eauId, category: 'monde', geoLevel: 'eau', parentId: regionId, name: 'Baie des Marées', fields: {
      type: 'Baies', emplacement: 'Au pied des Falaises de Calcaire', description: 'Eaux profondes propices au commerce maritime, réputées pour leur résonance acoustique inhabituelle.',
      ressources: 'Pêche, sel, perles', dangers: 'Courants imprévisibles lors des grandes marées',
    }, links: [chant], createdAt: Date.now() },
    { id: lieuId, category: 'monde', geoLevel: 'lieu', parentId: regionId, name: 'Cité de Sylenor', fields: {
      type: 'Capitale', emplacement: 'Au pied des Falaises de Calcaire, sur la Baie des Marées', description: 'Bâtie sur des falaises de calcaire, célèbre pour ses tours-phares à cristal.',
      population: '≈ 40 000 habitants', faction: 'Conseil des Marées', histoire: "Fondée par des marins-marchands, ravagée par le Grand Incendie il y a 12 ans.",
      ressources: 'Commerce maritime, cristal', dangers: 'Dracaines des brumes, tensions politiques',
    }, links: [kaela, conseil, incendie, dracaine, reliefId, eauId], createdAt: Date.now() },
    { id: kaela, category: 'personnages', name: 'Kaela Vantorin', fields: {
      surnom: 'La Lame de Brume', age: '34', date_naissance: '-46', sexe: 'Femme', race: 'Humaine', origine: 'Sylenor', statut: 'Vivant',
      taille_app: '1m78', corpulence: 'Athlétique', couleur_yeux: 'Gris tempête', couleur_cheveux: 'Noir, tressé court',
      cicatrices: 'Une longue cicatrice au bras gauche, souvenir du Grand Incendie', personnalite: 'Loyale, stratège, méfiante envers le Conseil',
      qualites: 'Courage, sens du devoir', defauts: 'Rigide, peine à déléguer', peurs: "Revivre un incendie qu'elle ne peut arrêter",
      resume: "Monte dans les rangs après l'incendie du port, qu'elle a combattu en première ligne.", mentor: 'Amara Fenn',
      accomplissements: 'A réorganisé la Garde de Sylenor après le Grand Incendie', classe_profession: 'Capitaine de la garde',
      competences: "Tactique urbaine, combat à l'épée, gestion de crise", allies_perso: 'Conseil des Marées (tendu)',
      faction_appartenance: 'Garde de Sylenor', fonction: 'Capitaine de la garde',
    }, timeline: [
      { id: uid(), date: '-46', title: 'Naissance à Sylenor', description: '' },
      { id: uid(), date: '-24', title: 'Recrutée dans la Garde de Sylenor', description: 'Repérée par Amara Fenn pour son sang-froid' },
      { id: uid(), date: '-12', title: 'Le Grand Incendie', description: "Combat le feu en première ligne, hérite du commandement après la mort d'Amara Fenn" },
    ], links: [lieuId, conseil], createdAt: Date.now() },
    { id: conseil, category: 'politique', name: 'Conseil des Marées', fields: {
      type: 'Cité-État', ideologie: 'Prospérité par le commerce, méfiance envers la magie non régulée', objectifs: 'Maintenir le monopole commercial sur la Baie des Marées',
      dirigeant: 'Les Neuf Voix', membres: '9 conseillers élus parmi les guildes marchandes', territoire: 'Sylenor et ses comptoirs côtiers', capitale_qg: 'Palais des Vagues',
      ressources: 'Cristal, sel, taxes portuaires', armee: 'Garde de Sylenor (≈ 800 soldats)', economie: 'Commerce maritime, pêche, cristal',
      religion: 'Culte discret de la mer', technologie: 'Tours-phares à cristal', magie: 'Chant des Marées (toléré en secret)',
      allies: 'Kaela Vantorin et la Garde de Sylenor', ennemis: 'Guilde des Contrebandiers', relations_diplomatiques: 'Tensions croissantes depuis le Grand Incendie',
      gouvernement: 'Oligarchie marchande élective', lois: 'Le commerce prime ; la pratique de la magie non déclarée est bannie', classes_sociales: 'Marchands, artisans, pêcheurs, serviteurs',
      droits: 'Vote réservé aux guildes reconnues', crimes: 'Contrebande, magie non déclarée, piraterie', punitions: 'Amendes, bannissement, rarement exécution',
      succession: 'Élection tous les 6 ans par les guildes', elections: 'Un conseiller désigné par chaque grande guilde marchande', corruption: 'Pots-de-vin fréquents pour les licences portuaires',
      revoltes: "Aucune récente, tensions montantes depuis l'incendie", conflits_internes: 'Rivalité entre guildes du sel et du cristal',
    }, relations: [{ id: uid(), targetId: contrebandiers, type: 'Rivalité', value: -55 }], links: [lieuId, kaela, chant], createdAt: Date.now() },
    { id: contrebandiers, category: 'politique', name: 'Guilde des Contrebandiers', fields: {
      type: 'Organisation criminelle', ideologie: 'Liberté de commerce, rejet des taxes du Conseil', objectifs: 'Contourner le monopole du Conseil des Marées',
      dirigeant: 'Un capitaine anonyme surnommé « le Cormoran »', membres: '≈ 150 contrebandiers et informateurs', territoire: 'Passe Grise et criques isolées',
      capitale_qg: 'Repaire flottant mobile', ressources: 'Cristal de contrebande, armes', armee: 'Petite flotte de navires rapides', economie: 'Marché noir du cristal et du sel',
      technologie: 'Navires légers modifiés', ennemis: 'Conseil des Marées', relations_diplomatiques: 'Aucune reconnue officiellement',
      gouvernement: 'Hiérarchie informelle fondée sur la réputation', lois: "Code d'honneur non écrit entre contrebandiers",
      crimes: 'Toute leur activité est illégale aux yeux du Conseil', punitions: 'Justice interne expéditive',
      corruption: 'Achètent le silence de certains gardes du port', conflits_internes: 'Factions rivales pour le contrôle des routes de contrebande',
    }, relations: [{ id: uid(), targetId: conseil, type: 'Rivalité', value: -55 }], links: [], createdAt: Date.now() },
    { id: epoqueFondations, category: 'chronologie', geoLevel: 'epoque', parentId: null, name: 'Ère des Fondations', fields: {
      date_debut: '-120', date_fin: '-12', description: 'Colonisation de la côte de Sylenor et fondation des premiers comptoirs marchands.',
      evenements_majeurs: 'Fondation de Sylenor', civilisations: 'Marins-colons venus du nord', technologies: 'Navigation côtière, premiers phares à huile',
      magie: 'Chant des Marées, encore rudimentaire', factions: 'Premiers conseils marchands, ancêtres du Conseil des Marées',
    }, links: [], createdAt: Date.now() },
    { id: fondationSylenor, category: 'chronologie', geoLevel: 'evenement', parentId: epoqueFondations, name: 'Fondation de Sylenor', fields: {
      date: '-120', type: 'Fondation', lieu: 'Baie des Marées', participants: 'Marins-colons venus du nord',
      cause: "Recherche d'un port abrité pour l'hivernage des flottes marchandes", deroulement: 'Installation progressive de comptoirs autour de la baie, puis fortification des falaises environnantes',
      consequences: 'Naissance de la cité-état de Sylenor',
    }, links: [lieuId], createdAt: Date.now() },
    { id: epoqueCendres, category: 'chronologie', geoLevel: 'epoque', parentId: null, name: 'Ère des Cendres', fields: {
      date_debut: '-12', date_fin: 'Présent', description: 'Marquée par le Grand Incendie et la montée des tensions entre le Conseil et la Garde.',
      evenements_majeurs: 'Le Grand Incendie', civilisations: 'Cité-État de Sylenor', technologies: 'Tours-phares à cristal (endommagées puis reconstruites)',
      magie: 'Chant des Marées toléré en secret', factions: 'Conseil des Marées, Guilde des Contrebandiers',
    }, links: [], createdAt: Date.now() },
    { id: incendie, category: 'chronologie', geoLevel: 'evenement', parentId: epoqueCendres, name: 'Le Grand Incendie', fields: {
      date: '-12', type: 'Catastrophe', lieu: 'Quartier du port, Cité de Sylenor', participants: 'Garde de Sylenor, habitants du port',
      cause: 'Défaillance des tours-phares à cristal pendant une tempête nocturne',
      deroulement: "Le feu se propage rapidement dans le quartier du port avant que l'alerte ne soit donnée ; Amara Fenn organise l'évacuation",
      consequences: 'Reconstruction du port, méfiance durable envers le Conseil, essor de la Garde de Sylenor',
      personnages_impliques: 'Kaela Vantorin, Amara Fenn', factions_impliquees: 'Conseil des Marées',
    }, links: [lieuId, kaela], createdAt: Date.now() },
    { id: amaraFenn, category: 'chronologie', geoLevel: 'personnage_historique', parentId: epoqueCendres, name: 'Amara Fenn', fields: {
      naissance: '-45', mort: '-12', faction: 'Garde de Sylenor', fonction: 'Capitaine de la Garde, prédécesseure de Kaela Vantorin',
      actions: "Organisa l'évacuation du quartier du port pendant le Grand Incendie, au prix de sa vie", relations: 'Mentor de Kaela Vantorin',
      evenements_associes: 'Le Grand Incendie', heritage: 'Son nom est donné chaque année à la garde la plus méritante de Sylenor',
    }, links: [kaela], createdAt: Date.now() },
    { id: dracaine, category: 'bestiaire', geoLevel: 'creature', parentId: null, name: 'Dracaine des Brumes', fields: {
      espece: 'Dracaine', sous_espece: 'Dracaine côtière', classification: 'Reptile ailé, sang chaud', taille: "4 m d'envergure, 2,5 m au garrot", poids: '180 à 240 kg',
      apparence: 'Écailles gris-bleu se confondant avec la brume, longues serres, cri strident bien reconnaissable',
      habitat: 'Falaises côtières et grottes marines autour de Sylenor', regime_alimentaire: 'Carnivore : poissons, oiseaux marins, parfois bétail',
      comportement: "Territoriale, chasse à l'aube dans le brouillard, vit en petits clans familiaux",
      intelligence: 'Comparable à un grand rapace, capable de stratégies de chasse coordonnées',
      cycle_de_vie: 'Œuf → juvénile (3 ans) → adulte (dès 6 ans)', reproduction: 'Ponte annuelle de 1 à 2 œufs dans des nids de falaise',
      esperance_de_vie: '80 à 100 ans', predateurs: "Aucun à l'âge adulte, hormis les chasseurs", proies: "Bancs de poissons, colonies d'oiseaux marins",
      relations_peuples: "Crainte et respect ; les marins de Sylenor y voient un mauvais présage si elle survole un navire",
      capacites_physiques: 'Vol rapide en piqué, vision perçante dans le brouillard, serres capables de percer une coque légère',
      capacites_magiques: 'Résonance faible avec le Chant des Marées, sensibilité accrue aux sons sous-marins',
      resistances: 'Froid, embruns, petites blessures qui cicatrisent vite', faiblesses: 'Vulnérable en plein soleil (dépend du brouillard pour chasser)',
      attaques: 'Piqué-serres, cri assourdissant qui désoriente', defenses: 'Camouflage dans la brume, fuite en altitude',
      capacites_passives: 'Détecte les perturbations sonores à plusieurs kilomètres', territoire: 'Falaises de Calcaire et alentours',
      chaine_alimentaire: 'Prédateur apical local', migration: 'Sédentaire, ne migre pas', activite: "Crépusculaire / matinale (chasse dans le brouillard de l'aube)",
      relations_especes: 'Évite les zones fréquentées par les grands cétacés', impact_environnement: "Régule les populations d'oiseaux marins et de gros poissons côtiers",
      legendes: 'Associée aux « sirènes de calcaire », dont le cri annoncerait les tempêtes', symbolisme: 'Symbole de vigilance et de danger caché dans la brume',
      utilisation_peuples: "Plumes et griffes recherchées pour l'artisanat rituel", domestication: 'Jamais réussie',
      chasse: 'Interdite près de Sylenor par le Conseil des Marées, tolérée au large', culte: 'Vénérée par une confrérie marginale de marins',
      peur_superstition: 'Très forte chez les pêcheurs', importance_economique: 'Faible directement, mais ses proies sont économiquement importantes pour la pêche',
    }, links: [lieuId, reliefId], createdAt: Date.now() },
    { id: dracaineAlpha, category: 'bestiaire', geoLevel: 'variante', parentId: dracaine, name: 'Dracaine Alpha des Falaises', fields: {
      type: 'Alpha', description: "Meneuse du clan des Falaises de Calcaire, reconnaissable à ses écailles plus sombres et à une cicatrice sur l'aile gauche. Nettement plus grande et agressive que le reste du clan.", image: '',
    }, links: [reliefId], createdAt: Date.now() },
    { id: chant, category: 'magie', geoLevel: 'systeme', parentId: null, name: 'Chant des Marées', fields: {
      origine: 'Pratique ancienne des marins de Sylenor, transmise oralement de génération en génération', source: "Résonance avec l'océan",
      nature_energie: "Vibrations sonores amplifiées par l'eau salée", lois: "Ne fonctionne qu'à proximité immédiate de l'eau salée et exige la voix du praticien",
      limites: "Inefficace loin de l'eau salée ; épuise la voix des praticiens", cout: 'Fatigue vocale, parfois perte de voix temporaire',
      risques: 'Dommages durables aux cordes vocales en cas de sur-utilisation',
      consequences: 'Peut désorienter ou apaiser une foule entière si maîtrisé ; pratiqué en secret pour influencer les négociations du Conseil',
    }, links: [conseil, eauId], createdAt: Date.now() },
    { id: ecoleId, category: 'magie', geoLevel: 'ecole', parentId: chant, name: 'Résonance Vocale', fields: {
      domaine: 'Naturelle', principes: 'Utiliser la voix pour entrer en résonance avec les courants et les marées',
      sorts: "Apaisement des Flots, Chant d'Appel", utilisateurs: 'Chaman', difficulte: "Élevée : exige des années d'entraînement vocal",
      limites: "Ne fonctionne pas hors de portée de l'eau salée", contre_magies: 'Bruits assourdissants, magie du silence',
    }, links: [], createdAt: Date.now() },
    { id: sortId, category: 'magie', geoLevel: 'sort', parentId: ecoleId, name: 'Apaisement des Flots', fields: {
      niveau: 'Intermédiaire', cout: 'Fatigue vocale importante', temps_incantation: 'Une minute de chant continu', portee: '200 mètres autour du praticien', duree: '10 minutes',
      effet: 'Calme les eaux agitées et apaise les émotions des personnes à portée', conditions: "Doit être à proximité immédiate de l'eau salée",
      risques: 'Perte de voix temporaire en cas de sur-utilisation', composants: 'Aucun, voix seule uniquement', contre_sort: 'Cri de guerre ou fracas assourdissant', utilisateurs: 'Chaman',
    }, links: [conseil], createdAt: Date.now() },
  ];
}

/* ---------------- Firestore (synchronisation temps réel, cross-appareils) ---------------- */
/* Nécessite shared/firebase-init.js chargé avant ce fichier (variable globale `db`) */

function entitiesRef() { return db.collection('entities'); }

const Store = {
  entities: [],
  ready: false,
  _onChange: null,
  _seeding: false,

  // onChange est appelé à chaque mise à jour (locale ou distante, via onSnapshot)
  init(onChange) {
    this._onChange = onChange;
    entitiesRef().onSnapshot(
      async (snap) => {
        if (snap.empty && !this.ready && !this._seeding) {
          this._seeding = true;
          const seed = seedEntities();
          const batch = db.batch();
          seed.forEach((e) => {
            const { id, ...data } = e;
            batch.set(entitiesRef().doc(id), data);
          });
          await batch.commit();
          this._seeding = false;
          return; // le commit déclenchera un nouveau onSnapshot avec les données
        }
        this.ready = true;
        this.entities = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        if (this._onChange) this._onChange();
      },
      (err) => {
        console.error('Erreur Firestore :', err);
        const el = document.getElementById('content') || document.body;
        el.innerHTML = '<div class="p-6 text-sm text-rose-700">Impossible de se connecter à Firestore. Vérifie la config (shared/firebase-init.js) et les règles de sécurité.</div>';
      }
    );
  },

  createEntity(categoryKey) {
    const cat = catOf(categoryKey);
    const fields = {};
    cat.fields.forEach((f) => (fields[f.key] = ''));
    const id = uid();
    const entity = { id, category: categoryKey, name: 'Nouvelle entrée', fields, links: [], createdAt: Date.now() };
    const { id: _drop, ...data } = entity;
    entitiesRef().doc(id).set(data);
    return entity;
  },
  createGeoNode(category, geoLevel, parentId) {
    const fields = {};
    GEO_LEVELS[geoLevel].fields.forEach((f) => (fields[f.key] = ''));
    const id = uid();
    const node = { id, category, geoLevel, parentId: parentId || null, name: GEO_DEFAULT_NAME[geoLevel] || 'Nouvelle entrée', fields, links: [], createdAt: Date.now() };
    const { id: _drop, ...data } = node;
    entitiesRef().doc(id).set(data);
    return node;
  },
  updateEntity(id, patch) {
    entitiesRef().doc(id).update(patch);
  },
  updateField(id, key, value) {
    entitiesRef().doc(id).update({ [`fields.${key}`]: value });
  },
  deleteEntity(id) {
    const batch = db.batch();
    batch.delete(entitiesRef().doc(id));
    this.entities.forEach((e) => {
      if (e.id === id) return;
      if (e.links && e.links.includes(id)) batch.update(entitiesRef().doc(e.id), { links: e.links.filter((l) => l !== id) });
      if (e.relations && e.relations.some((r) => r.targetId === id)) batch.update(entitiesRef().doc(e.id), { relations: e.relations.filter((r) => r.targetId !== id) });
    });
    batch.commit();
  },
  deleteGeoNode(id) {
    const toDelete = new Set();
    const collect = (nid) => {
      toDelete.add(nid);
      this.entities.filter((e) => e.parentId === nid).forEach((child) => collect(child.id));
    };
    collect(id);
    const batch = db.batch();
    toDelete.forEach((did) => batch.delete(entitiesRef().doc(did)));
    this.entities.forEach((e) => {
      if (toDelete.has(e.id)) return;
      if (e.links && e.links.some((l) => toDelete.has(l))) batch.update(entitiesRef().doc(e.id), { links: e.links.filter((l) => !toDelete.has(l)) });
    });
    batch.commit();
  },
  deleteAny(id) {
    const ent = this.entities.find((e) => e.id === id);
    if (ent && ent.geoLevel) this.deleteGeoNode(id); else this.deleteEntity(id);
  },
  toggleLink(idA, idB) {
    const a = this.entities.find((e) => e.id === idA);
    const b = this.entities.find((e) => e.id === idB);
    if (!a || !b) return;
    const batch = db.batch();
    const hasA = a.links.includes(idB);
    batch.update(entitiesRef().doc(idA), { links: hasA ? a.links.filter((l) => l !== idB) : [...a.links, idB] });
    const hasB = b.links.includes(idA);
    batch.update(entitiesRef().doc(idB), { links: hasB ? b.links.filter((l) => l !== idA) : [...b.links, idA] });
    batch.commit();
  },
  addRelation(entityId, targetId) {
    const batch = db.batch();
    const a = this.entities.find((e) => e.id === entityId);
    const b = this.entities.find((e) => e.id === targetId);
    batch.update(entitiesRef().doc(entityId), { relations: [...((a && a.relations) || []), { id: uid(), targetId, type: 'Neutralité', value: 0 }] });
    batch.update(entitiesRef().doc(targetId), { relations: [...((b && b.relations) || []), { id: uid(), targetId: entityId, type: 'Neutralité', value: 0 }] });
    batch.commit();
  },
  updateRelation(entityId, relationId, patch) {
    const entity = this.entities.find((e) => e.id === entityId);
    const rel = entity && (entity.relations || []).find((r) => r.id === relationId);
    if (!rel) return;
    const otherId = rel.targetId;
    const other = this.entities.find((e) => e.id === otherId);
    const batch = db.batch();
    batch.update(entitiesRef().doc(entityId), { relations: entity.relations.map((r) => (r.id === relationId ? { ...r, ...patch } : r)) });
    if (other) batch.update(entitiesRef().doc(otherId), { relations: (other.relations || []).map((r) => (r.targetId === entityId ? { ...r, ...patch } : r)) });
    batch.commit();
  },
  removeRelation(entityId, relationId) {
    const entity = this.entities.find((e) => e.id === entityId);
    const rel = entity && (entity.relations || []).find((r) => r.id === relationId);
    if (!rel) return;
    const otherId = rel.targetId;
    const other = this.entities.find((e) => e.id === otherId);
    const batch = db.batch();
    batch.update(entitiesRef().doc(entityId), { relations: entity.relations.filter((r) => r.id !== relationId) });
    if (other) batch.update(entitiesRef().doc(otherId), { relations: (other.relations || []).filter((r) => r.targetId !== entityId) });
    batch.commit();
  },
  addTimelineEntry(entityId) {
    const entity = this.entities.find((e) => e.id === entityId);
    const timeline = [...((entity && entity.timeline) || []), { id: uid(), date: '', title: '', description: '' }];
    entitiesRef().doc(entityId).update({ timeline });
  },
  updateTimelineEntry(entityId, entryId, patch) {
    const entity = this.entities.find((e) => e.id === entityId);
    if (!entity) return;
    const timeline = (entity.timeline || []).map((t) => (t.id === entryId ? { ...t, ...patch } : t));
    entitiesRef().doc(entityId).update({ timeline });
  },
  removeTimelineEntry(entityId, entryId) {
    const entity = this.entities.find((e) => e.id === entityId);
    if (!entity) return;
    const timeline = (entity.timeline || []).filter((t) => t.id !== entryId);
    entitiesRef().doc(entityId).update({ timeline });
  },
  exportJSON() {
    const blob = new Blob([JSON.stringify(this.entities, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'codex-export.json'; a.click();
    URL.revokeObjectURL(url);
  },
};

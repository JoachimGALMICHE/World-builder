/* ============================================================
   CODEX — passerelle d'authentification (email / mot de passe)
   Doit être chargé après firebase-auth-compat.js et shared/firebase-init.js
   ============================================================ */

function initAuthGate(onSignedIn) {
  const gate = document.getElementById('auth-gate');
  const appRoot = document.getElementById('app-root');
  const form = document.getElementById('auth-form');
  const errorEl = document.getElementById('auth-error');
  let started = false;

  // On attache le formulaire EN PREMIER : même si Firebase plante plus bas,
  // le bouton "Se connecter" ne doit jamais se comporter comme un vrai submit HTML
  // (qui recharge la page et donne l'impression que "ça efface tout, ça ne fait rien").
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    errorEl.textContent = '';
    if (typeof firebase === 'undefined' || !firebase.apps || !firebase.apps.length) {
      errorEl.textContent = "Erreur technique : Firebase ne s'est pas chargé (vérifie shared/firebase-init.js et ta connexion). Ouvre la console du navigateur (F12) pour le détail.";
      return;
    }
    const email = document.getElementById('auth-email').value;
    const password = document.getElementById('auth-password').value;
    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    firebase.auth().signInWithEmailAndPassword(email, password)
      .catch((err) => { errorEl.textContent = 'Connexion impossible : ' + (err && err.message ? err.message : 'email ou mot de passe incorrect.'); })
      .finally(() => { submitBtn.disabled = false; });
  });

  document.querySelectorAll('[data-sign-out]').forEach((btn) => {
    btn.addEventListener('click', () => firebase.auth().signOut().then(() => location.reload()));
  });

  try {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        gate.classList.add('hidden');
        appRoot.classList.remove('hidden');
        if (!started) { started = true; onSignedIn(user); }
      } else {
        gate.classList.remove('hidden');
        appRoot.classList.add('hidden');
      }
    });
  } catch (err) {
    errorEl.textContent = "Erreur technique au chargement de Firebase Auth : " + err.message + ". Vérifie que firebase-auth-compat.js est bien chargé avant shared/auth.js.";
    console.error(err);
  }
}

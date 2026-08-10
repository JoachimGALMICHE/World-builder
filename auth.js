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

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    errorEl.textContent = '';
    const email = document.getElementById('auth-email').value;
    const password = document.getElementById('auth-password').value;
    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    firebase.auth().signInWithEmailAndPassword(email, password)
      .catch(() => { errorEl.textContent = 'Connexion impossible : email ou mot de passe incorrect.'; })
      .finally(() => { submitBtn.disabled = false; });
  });

  document.querySelectorAll('[data-sign-out]').forEach((btn) => {
    btn.addEventListener('click', () => firebase.auth().signOut().then(() => location.reload()));
  });
}

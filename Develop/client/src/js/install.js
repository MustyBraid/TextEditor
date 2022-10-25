const butInstall = document.getElementById("buttonInstall");

// Logic for installing the PWA
window.addEventListener("beforeinstallprompt", (event) => {
  window.deferredPrompt = event;

  butInstall.classList.toggle("hidden", false);
});

butInstall.addEventListener("click", async () => {
  const promptEvent = window.deferredPrompt;

  if (!promptEvent) {
    return;
  }

  //show prompt
  promptEvent.prompt();

  // Reset the deferred prompt variable, it can only be used once.
  window.deferredPrompt = null;

  butInstall.classList.toggle("hidden", true);
});

window.addEventListener("appinstalled", (event) => {
  //clearprompt (again)
  window.deferredPrompt = null;
});

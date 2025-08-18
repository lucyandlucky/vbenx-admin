async function initApplication() {
  const { bootstrap } = await import('./bootstrap')
  await bootstrap()
}

initApplication()
